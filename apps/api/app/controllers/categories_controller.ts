import type { HttpContext } from '@adonisjs/core/http'
import prisma from '#services/prisma'

export default class CategoriesController {
  async index({ request }: HttpContext) {
    const page = Number(request.input('page', 1))
    const perPage = Number(request.input('perPage', 20))

    const [items, total] = await Promise.all([
      prisma.category.findMany({
        orderBy: { name: 'asc' },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      prisma.category.count(),
    ])

    return {
      data: items,
      meta: { page, perPage, total, lastPage: Math.ceil(total / perPage) },
    }
  }

  async store({ request, response }: HttpContext) {
    const name = String(request.input('name', '')).trim()

    if (!name) {
      return response.badRequest({ message: 'name é obrigatório' })
    }

    const exists = await prisma.category.findUnique({ where: { name } })
    if (exists) {
      return response.conflict({ message: 'Categoria já existe' })
    }

    const category = await prisma.category.create({
      data: { name },
    })

    return response.created(category)
  }
}
