// ============================================
// FILE: app/controllers/requests_controller.ts
// ============================================
import type { HttpContext } from '@adonisjs/core/http'
import prisma from '#services/prisma'
import { ok, fail } from '#services/http_response'

const ALLOWED_STATUS = [
  'requested',
  'matched',
  'scheduled',
  'in_progress',
  'delivered',
  'completed',
  'canceled',
] as const

type AllowedStatus = (typeof ALLOWED_STATUS)[number]

function isAllowedStatus(value: unknown): value is AllowedStatus {
  return typeof value === 'string' && (ALLOWED_STATUS as readonly string[]).includes(value)
}

export default class RequestsController {
  /**
   * POST /requests
   * Cria um pedido (sempre para o usuário autenticado)
   */
  async store({ request, response }: HttpContext) {
    const user = (request as any).user
    if (!user) {
      return fail(response, { status: 401, message: 'Usuário não autenticado' })
    }

    const title = String(request.input('title', '')).trim()
    const description = String(request.input('description', '')).trim()
    const categoryId = String(request.input('categoryId', '')).trim()

    if (!title || title.length < 3) {
      return fail(response, { status: 400, message: 'Título é obrigatório (min 3 caracteres)' })
    }
    if (!description || description.length < 10) {
      return fail(response, { status: 400, message: 'Descrição é obrigatória (min 10 caracteres)' })
    }
    if (!categoryId) {
      return fail(response, { status: 400, message: 'categoryId é obrigatório' })
    }

    const category = await prisma.category.findUnique({ where: { id: categoryId } })
    if (!category) {
      return fail(response, { status: 404, message: 'Categoria não encontrada' })
    }

    const created = await prisma.request.create({
      data: {
        userId: user.id,
        categoryId,
        title,
        description,
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
   * Lista pedidos do usuário logado com filtros:
   * - status=requested|matched|...
   * - category=slug (ex: eletronicos)
   * - categoryId=cuid
   * - order=desc|asc (default desc)
   * - page=1..n, perPage=1..100
   */
  async my({ request, response }: HttpContext) {
    const user = (request as any).user
    if (!user) {
      return fail(response, { status: 401, message: 'Usuário não autenticado' })
    }

    const statusQuery = request.input('status')
    const categorySlug = String(request.input('category', '')).trim()
    const categoryIdQuery = String(request.input('categoryId', '')).trim()

    const order = String(request.input('order', 'desc')).toLowerCase()
    const page = Math.max(1, Number(request.input('page', 1)) || 1)
    const perPageRaw = Number(request.input('perPage', 20)) || 20
    const perPage = Math.min(100, Math.max(1, perPageRaw))

    // monta filtro base (sempre do usuário)
    const where: any = { userId: user.id }

    // filtro status (opcional)
    if (statusQuery !== undefined && statusQuery !== null && statusQuery !== '') {
      if (!isAllowedStatus(statusQuery)) {
        return fail(response, {
          status: 400,
          message: `Status inválido. Use: ${ALLOWED_STATUS.join(', ')}`,
        })
      }
      where.status = statusQuery
    }

    // filtro categoria por id (opcional)
    if (categoryIdQuery) {
      where.categoryId = categoryIdQuery
    }

    // filtro categoria por slug (opcional)
    if (categorySlug) {
      const category = await prisma.category.findUnique({ where: { slug: categorySlug } })
      if (!category) {
        return fail(response, { status: 404, message: 'Categoria (slug) não encontrada' })
      }
      where.categoryId = category.id
    }

    const orderBy = { createdAt: order === 'asc' ? 'asc' : 'desc' }

    const [total, items] = await Promise.all([
      prisma.request.count({ where }),
      prisma.request.findMany({
        where,
        orderBy,
        skip: (page - 1) * perPage,
        take: perPage,
        select: {
          id: true,
          title: true,
          status: true,
          createdAt: true,
          category: { select: { id: true, name: true, slug: true } },
        },
      }),
    ])

    const lastPage = Math.ceil(total / perPage)

    return ok(response, {
      message: 'Pedidos listados com sucesso',
      data: items,
      meta: { page, perPage, total, lastPage },
    })
  }

  /**
   * GET /requests/:id
   * Mostra um pedido por id (apenas se for do usuário logado)
   */
  async show({ request, response, params }: HttpContext) {
    const user = (request as any).user
    if (!user) {
      return fail(response, { status: 401, message: 'Usuário não autenticado' })
    }

    const id = String(params.id || '').trim()
    if (!id) {
      return fail(response, { status: 400, message: 'ID inválido' })
    }

    const found = await prisma.request.findUnique({
      where: { id },
      include: { category: { select: { id: true, name: true, slug: true } } },
    })

    if (!found) {
      return fail(response, { status: 404, message: 'Pedido não encontrado' })
    }

    // Segurança: só dono vê
    if (found.userId !== user.id) {
      return fail(response, { status: 403, message: 'Você não tem acesso a este pedido' })
    }

    return ok(response, { message: 'Pedido encontrado', data: found })
  }

  /**
   * PATCH /requests/:id/status
   * Atualiza apenas o status (somente dono)
   */
  async updateStatus({ request, response, params }: HttpContext) {
    const user = (request as any).user
    if (!user) {
      return fail(response, { status: 401, message: 'Usuário não autenticado' })
    }

    const id = String(params.id || '').trim()
    const status = request.input('status')

    if (!id) {
      return fail(response, { status: 400, message: 'ID inválido' })
    }
    if (!isAllowedStatus(status)) {
      return fail(response, {
        status: 400,
        message: `Status inválido. Use: ${ALLOWED_STATUS.join(', ')}`,
      })
    }

    const found = await prisma.request.findUnique({ where: { id } })
    if (!found) {
      return fail(response, { status: 404, message: 'Pedido não encontrado' })
    }

    if (found.userId !== user.id) {
      return fail(response, { status: 403, message: 'Você não pode atualizar este pedido' })
    }

    const updated = await prisma.request.update({
      where: { id },
      data: { status },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
        updatedAt: true,
        category: { select: { id: true, name: true, slug: true } },
      },
    })

    return ok(response, { message: 'Status atualizado com sucesso', data: updated })
  }
}


