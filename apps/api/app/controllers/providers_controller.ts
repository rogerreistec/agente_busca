import type { HttpContext } from '@adonisjs/core/http'
import prisma from '#services/prisma'
import { ok, fail } from '#services/http_response'

export default class ProvidersController {
  /**
   * POST /providers
   * Cria ou atualiza o perfil de prestador
   */
  async store({ request, response }: HttpContext) {
    const user = (request as any).user
    if (!user) {
      return fail(response, { status: 401, message: 'Usuário não autenticado' })
    }

    const description = String(request.input('description', '')).trim()
    const isActive = request.input('isActive')

    const active = typeof isActive === 'boolean' ? isActive : true

    const exists = await prisma.provider.findUnique({
      where: { userId: user.id },
    })

    if (exists) {
      const updated = await prisma.provider.update({
        where: { userId: user.id },
        data: {
          description: description || exists.description,
          isActive: active,
        },
      })

      return ok(response, {
        message: 'Prestador atualizado com sucesso',
        data: updated,
      })
    }

    const created = await prisma.provider.create({
      data: {
        userId: user.id,
        description,
        isActive: active,
      },
    })

    return ok(response, {
      status: 201,
      message: 'Prestador criado com sucesso',
      data: created,
    })
  }

  /**
   * GET /providers/me
   */
  async me({ request, response }: HttpContext) {
    const user = (request as any).user
    if (!user) {
      return fail(response, { status: 401, message: 'Usuário não autenticado' })
    }

    const provider = await prisma.provider.findUnique({
      where: { userId: user.id },
    })

    if (!provider) {
      return fail(response, { status: 404, message: 'Prestador não encontrado' })
    }

    return ok(response, {
      message: 'Prestador encontrado',
      data: provider,
    })
  }
}
