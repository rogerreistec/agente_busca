import type { HttpContext } from '@adonisjs/core/http'
import prisma from '#services/prisma'

export default class UsersController {
  async index() {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    })

    return { data: users }
  }

  async show({ params, response }: HttpContext) {
    const id = Number(params.id)
    if (!id) return response.badRequest({ message: 'id inválido' })

    const user = await prisma.user.findUnique({
      where: { id },
      select: { id: true, name: true, email: true, createdAt: true },
    })

    if (!user) return response.notFound({ message: 'Usuário não encontrado' })

    return user
  }
}
