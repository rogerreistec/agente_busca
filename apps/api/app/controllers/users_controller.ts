import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'
import prisma from '#services/prisma'

export default class UsersController {
  async store({ request, response }: HttpContext) {
    const name = String(request.input('name', '')).trim()
    const email = String(request.input('email', '')).trim().toLowerCase()
    const password = String(request.input('password', '')).trim()

    if (!name) return response.badRequest({ message: 'name é obrigatório' })
    if (!email) return response.badRequest({ message: 'email é obrigatório' })
    if (!password) return response.badRequest({ message: 'password é obrigatório' })

    const exists = await prisma.user.findUnique({ where: { email } })
    if (exists) return response.conflict({ message: 'Email já existe' })

    const passwordHash = await hash.make(password)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash, // ✅ agora bate com o schema
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    return response.created(user)
  }

  async index({ request }: HttpContext) {
    const page = Number(request.input('page', 1))
    const perPage = Number(request.input('perPage', 20))

    const [items, total] = await Promise.all([
      prisma.user.findMany({
        orderBy: { name: 'asc' },
        skip: (page - 1) * perPage,
        take: perPage,
        select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
      }),
      prisma.user.count(),
    ])

    return {
      success: true,
      message: 'Usuários listados com sucesso',
      data: items,
      meta: { page, perPage, total, lastPage: Math.ceil(total / perPage) },
    }
  }

  async show({ params, response }: HttpContext) {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
    })

    if (!user) return response.notFound({ message: 'Usuário não encontrado' })

    return {
      success: true,
      message: 'Usuário encontrado com sucesso',
      data: user,
    }
  }
}
