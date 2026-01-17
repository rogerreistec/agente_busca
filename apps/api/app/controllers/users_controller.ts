import type { HttpContext } from '@adonisjs/core/http'
import prisma from '#services/prisma'
import hash from '@adonisjs/core/services/hash'
import { ok, fail } from '#services/http_response'

export default class UsersController {
  async store({ request, response }: HttpContext) {
    const name = String(request.input('name', '')).trim()
    const email = String(request.input('email', '')).trim().toLowerCase()
    const password = String(request.input('password', ''))

    const errors: Record<string, string[]> = {}
    if (!name) errors.name = ['name é obrigatório']
    if (!email) errors.email = ['email é obrigatório']
    if (!password || password.length < 6) errors.password = ['password mínimo 6 caracteres']

    if (Object.keys(errors).length) {
      return fail(response, { status: 400, message: 'Validação falhou', errors })
    }

    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) {
      return fail(response, {
        status: 409,
        message: 'Email já cadastrado',
        errors: { email: ['Já existe um usuário com esse email'] },
      })
    }

    const passwordHash = await hash.make(password)

    const user = await prisma.user.create({
      data: { name, email, passwordHash },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
    })

    return ok(response, { status: 201, message: 'Usuário criado com sucesso', data: user })
  }
}
