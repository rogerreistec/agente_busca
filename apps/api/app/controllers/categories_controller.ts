import type { HttpContext } from '@adonisjs/core/http'
import prisma from '#services/prisma'
import { ok, fail } from '#services/http_response'

export default class CategoriesController {
  async index({ request, response }: HttpContext) {
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

    const lastPage = total === 0 ? 0 : Math.ceil(total / perPage)

    return ok(response, {
      message: 'Categorias listadas com sucesso',
      data: items,
      meta: { page, perPage, total, lastPage },
    })
  }

  async store({ request, response }: HttpContext) {
    const name = String(request.input('name', '')).trim()

    if (!name) {
      return fail(response, {
        status: 400,
        message: 'Validação falhou',
        errors: { name: ['name é obrigatório'] },
      })
    }

    const exists = await prisma.category.findUnique({ where: { name } })
    if (exists) {
      return fail(response, {
        status: 409,
        message: 'Categoria já existe',
        errors: { name: ['Categoria já cadastrada'] },
      })
    }

    const category = await prisma.category.create({
      data: { name },
    })

    return ok(response, {
      status: 201,
      message: 'Categoria criada com sucesso',
      data: category,
    })
  }
}
