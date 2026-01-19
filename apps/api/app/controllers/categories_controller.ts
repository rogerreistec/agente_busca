// apps/api/app/controllers/categories_controller.ts
import type { HttpContext } from '@adonisjs/core/http'
import prisma from '#services/prisma'
import { ok, fail } from '#services/http_response'

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .normalize('NFD') // separa acentos
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/[^a-z0-9]+/g, '-') // troca espaços/símbolos por -
    .replace(/^-+|-+$/g, '') // remove - do começo/fim
}

export default class CategoriesController {
  async index({ request, response }: HttpContext) {
    const page = Number(request.input('page', 1))
    const perPage = Number(request.input('perPage', 20))

    const [data, total] = await Promise.all([
      prisma.category.findMany({
        orderBy: { createdAt: 'desc' },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      prisma.category.count(),
    ])

    const lastPage = Math.ceil(total / perPage)

    return ok(response, {
      message: 'Categorias listadas com sucesso',
      data,
      meta: { page, perPage, total, lastPage },
    })
  }

  async store({ request, response }: HttpContext) {
    const name = String(request.input('name', '')).trim()
    const rawSlug = request.input('slug')
    const slug = String(rawSlug ?? '').trim() || slugify(name)

    if (!name) {
      return fail(response, {
        status: 400,
        message: 'Nome é obrigatório',
        errors: { name: ['Informe o nome da categoria'] },
      })
    }

    if (!slug) {
      return fail(response, {
        status: 400,
        message: 'Slug inválido',
        errors: { slug: ['Não foi possível gerar o slug'] },
      })
    }

    // Checagem simples de duplicidade
    const exists = await prisma.category.findFirst({
      where: { OR: [{ name }, { slug }] },
      select: { id: true },
    })

    if (exists) {
      return fail(response, {
        status: 409,
        message: 'Categoria já existe',
        errors: { name: ['Categoria já cadastrada'], slug: ['Slug já cadastrado'] },
      })
    }

    try {
      const category = await prisma.category.create({
        data: { name, slug },
        select: { id: true, name: true, slug: true, createdAt: true },
      })

      return ok(response, {
        status: 201,
        message: 'Categoria criada com sucesso',
        data: category,
      })
    } catch (error: any) {
      return fail(response, {
        status: 500,
        message: 'Erro ao criar categoria',
        errors: { prisma: [error?.message ?? 'unknown error'] },
      })
    }
  }
}
