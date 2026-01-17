import type { HttpContext } from '@adonisjs/core/http'
import prisma from '#services/prisma'
import { ok, fail } from '#services/http_response'
import hash from '@adonisjs/core/services/hash'
import { randomBytes, createHash } from 'node:crypto'

function tokenHash(token: string) {
  return createHash('sha256').update(token).digest('hex')
}

export default class AuthController {
  async register({ request, response }: HttpContext) {
    // Pegando os dados e tratando para não dar erro se faltar o 'name'
    const name = request.input('name') || 'Usuário Teste' 
    const email = String(request.input('email', '')).trim().toLowerCase()
    const password = String(request.input('password', ''))

    if (!email || password.length < 6) {
      return fail(response, { status: 400, message: 'Email é obrigatório e senha deve ter 6+ caracteres' })
    }

    const passwordHash = await hash.make(password)
    const user = await prisma.user.create({
      data: { name, email, passwordHash },
      select: { id: true, email: true }
    })

    return ok(response, { status: 201, message: 'Conta criada!', data: user })
  }

  async login({ request, response }: HttpContext) {
    const email = String(request.input('email', '')).trim().toLowerCase()
    const password = String(request.input('password', ''))

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user || !(await hash.verify(user.passwordHash, password))) {
      return fail(response, { status: 401, message: 'E-mail ou senha incorretos' })
    }

    const token = randomBytes(32).toString('hex')
    const hashed = tokenHash(token)

    await prisma.userToken.create({
      data: { userId: user.id, type: 'auth', hash: hashed }
    })

    return ok(response, { message: 'Login OK', data: { token } })
  }

  async logout({ request, response }: HttpContext) {
    const authHeader = request.header('authorization') || ''
    const token = authHeader.replace('Bearer ', '').trim()
    const hashed = tokenHash(token)

    await prisma.userToken.deleteMany({ where: { hash: hashed } })
    return ok(response, { message: 'Sessão encerrada com sucesso' })
  }
}