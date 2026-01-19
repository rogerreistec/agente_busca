import type { HttpContext } from '@adonisjs/core/http'
import prisma from '#services/prisma'
import { ok, fail } from '#services/http_response'
import hash from '@adonisjs/core/services/hash'
import { randomBytes, createHash } from 'node:crypto'

function tokenHash(token: string) {
  return createHash('sha256').update(token).digest('hex')
}

export default class AuthController {
  // POST /auth/register
  async register({ request, response }: HttpContext) {
    const name = String(request.input('name', 'Usuário Teste')).trim()
    const email = String(request.input('email', '')).trim().toLowerCase()
    const password = String(request.input('password', ''))

    if (!email || password.length < 6) {
      return fail(response, {
        status: 400,
        message: 'Email é obrigatório e senha deve ter 6+ caracteres',
        errors: null,
      })
    }

    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) {
      return fail(response, {
        status: 409,
        message: 'Email já cadastrado',
        errors: null,
      })
    }

    const passwordHash = await hash.make(password)

    const user = await prisma.user.create({
      data: { name, email, passwordHash },
      select: { id: true, name: true, email: true, createdAt: true },
    })

    return ok(response, { status: 201, message: 'Conta criada!', data: user })
  }

  // POST /auth/login
  async login({ request, response }: HttpContext) {
    const email = String(request.input('email', '')).trim().toLowerCase()
    const password = String(request.input('password', ''))

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return fail(response, { status: 401, message: 'E-mail ou senha incorretos', errors: null })
    }

    const valid = await hash.verify(user.passwordHash, password)
    if (!valid) {
      return fail(response, { status: 401, message: 'E-mail ou senha incorretos', errors: null })
    }

    const token = randomBytes(32).toString('hex')
    const hashed = tokenHash(token)

    await prisma.userToken.create({
      data: { userId: user.id, type: 'auth', hash: hashed },
    })

    return ok(response, { message: 'Login OK', data: { token } })
  }

  // POST /auth/logout
  async logout({ request, response }: HttpContext) {
    const authHeader = request.header('authorization') || ''
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : ''

    if (!token) {
      return fail(response, { status: 401, message: 'Não autenticado', errors: null })
    }

    const hashed = tokenHash(token)
    await prisma.userToken.deleteMany({ where: { hash: hashed, type: 'auth' } })

    return ok(response, { message: 'Sessão encerrada com sucesso' })
  }

  // GET /auth/me
  async me({ request, response }: HttpContext) {
    const user = (request as any).user

    if (!user) {
      return fail(response, { status: 401, message: 'Usuário não autenticado', errors: null })
    }

    return ok(response, {
      message: 'Usuário autenticado',
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
      },
    })
  }
}
