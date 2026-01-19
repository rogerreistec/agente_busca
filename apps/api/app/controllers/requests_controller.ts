import type { HttpContext } from '@adonisjs/core/http'
import prisma from '#services/prisma'
import { ok, fail } from '#services/http_response'

export default class RequestsController {
  /**
   * POST /requests
   * Cria um pedido (cliente logado)
   */
  async store({ request, response }: HttpContext) {
    const user = (request as any).user
    if (!user) {
      return fail(response, { status: 401, message: 'Não autenticado', errors: null })
    }

    const title = String(request.input('title', '')).trim()
    const description = String(request.input('description', '')).trim()
    const categoryId = String(request.input('categoryId', '')).trim()

    const errors: Record<string, string[]> = {}
    if (!title) errors.title = ['title é obrigatório']
    if (!description) errors.description = ['description é obrigatório']
    if (!categoryId) errors.categoryId = ['categoryId é obrigatório']

    if (Object.keys(errors).length) {
      return fail(response, { status: 400, message: 'Validação falhou', errors })
    }

    // Verifica se a categoria existe (evita FK error feio)
    const category = await prisma.category.findUnique({
      where: { id: categoryId },
      select: { id: true, name: true, slug: true },
    })

    if (!category) {
      return fail(response, {
        status: 404,
        message: 'Categoria não encontrada',
        errors: { categoryId: ['categoryId inválido'] },
      })
    }

    const created = await prisma.request.create({
      data: {
        userId: user.id,
        categoryId,
        title,
        description,
        // status default: requested
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        createdAt: true,
        category: { select: { id: true, name: true, slug: true } },
      },
    })

    return ok(response, { status: 201, message: 'Pedido criado com sucesso', data: created })
  }

  /**
   * GET /requests/my
   * Lista pedidos do usuário logado
   */
  async my({ request, response }: HttpContext) {
    const user = (request as any).user
    if (!user) {
      return fail(response, { status: 401, message: 'Não autenticado', errors: null })
    }

    const status = String(request.input('status', '')).trim() // opcional

    const where: any = { userId: user.id }
    if (status) where.status = status

    const list = await prisma.request.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
        category: { select: { id: true, name: true, slug: true } },
      },
    })

    return ok(response, { message: 'Meus pedidos', data: list })
  }

  /**
   * GET /requests/:id
   * Detalhe do pedido (somente dono)
   */
  async show({ request, response, params }: HttpContext) {
    const user = (request as any).user
    if (!user) {
      return fail(response, { status: 401, message: 'Não autenticado', errors: null })
    }

    const id = String(params.id || '').trim()
    if (!id) {
      return fail(response, { status: 400, message: 'id inválido', errors: null })
    }

    const item = await prisma.request.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        userId: true,
        category: { select: { id: true, name: true, slug: true } },
      },
    })

    if (!item) {
      return fail(response, { status: 404, message: 'Pedido não encontrado', errors: null })
    }

    // Segurança: só o dono pode ver
    if (item.userId !== user.id) {
      return fail(response, { status: 403, message: 'Acesso negado', errors: null })
    }

    return ok(response, { message: 'Detalhe do pedido', data: item })
  }
}
