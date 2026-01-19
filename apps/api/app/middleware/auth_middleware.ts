import type { HttpContext } from '@adonisjs/core/http'
import prisma from '#services/prisma'
import { fail } from '#services/http_response'
import { createHash } from 'node:crypto'

function tokenHash(token: string) {
  return createHash('sha256').update(token).digest('hex')
}

export default class AuthMiddleware {
  async handle({ request, response }: HttpContext, next: () => Promise<void>) {
    const authHeader = request.header('authorization') || ''
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7).trim() : ''

    if (!token) {
      return fail(response, { status: 401, message: 'Não autenticado', errors: null })
    }

    const hashed = tokenHash(token)

    const tokenRow = await prisma.userToken.findFirst({
      where: { hash: hashed, type: 'auth' },
      include: { user: true },
    })

    if (!tokenRow) {
      return fail(response, { status: 401, message: 'Token inválido', errors: null })
    }

    if (tokenRow.expiresAt && tokenRow.expiresAt < new Date()) {
      return fail(response, { status: 401, message: 'Token expirado', errors: null })
    }

    ;(request as any).user = tokenRow.user

    await next()
  }
}
