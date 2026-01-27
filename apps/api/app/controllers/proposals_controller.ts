import type { HttpContext } from '@adonisjs/core/http'
import prisma from '#services/prisma'
import { ok, fail } from '#services/http_response'

const ACCEPTABLE_REQUEST_STATUS = ['requested', 'matched'] as const

export default class ProposalsController {
  // POST /requests/:id/proposals
  async store({ request, response, params }: HttpContext) {
    const user = (request as any).user
    if (!user) return fail(response, { status: 401, message: 'Usuário não autenticado' })

    const requestId = String(params.id || '').trim()
    if (!requestId) return fail(response, { status: 400, message: 'ID do pedido inválido' })

    const provider = await prisma.provider.findUnique({ where: { userId: user.id } })
    if (!provider) return fail(response, { status: 403, message: 'Apenas prestadores podem enviar propostas' })
    if (!provider.isActive) return fail(response, { status: 403, message: 'Prestador inativo' })

    const priceCents = Number(request.input('priceCents'))
    const message = String(request.input('message', '')).trim()

    if (!Number.isInteger(priceCents) || priceCents <= 0) {
      return fail(response, { status: 400, message: 'priceCents é obrigatório e deve ser inteiro > 0' })
    }

    const foundRequest = await prisma.request.findUnique({
      where: { id: requestId },
      select: { id: true, userId: true, status: true, acceptedProposalId: true },
    })
    if (!foundRequest) return fail(response, { status: 404, message: 'Pedido não encontrado' })

    if (foundRequest.userId === user.id) {
      return fail(response, { status: 403, message: 'Você não pode enviar proposta para seu próprio pedido' })
    }

    if (!ACCEPTABLE_REQUEST_STATUS.includes(foundRequest.status as any)) {
      return fail(response, { status: 400, message: `Pedido não aceita propostas no status: ${foundRequest.status}` })
    }

    if (foundRequest.acceptedProposalId) {
      return fail(response, { status: 400, message: 'Este pedido já possui uma proposta aceita' })
    }

    try {
      const created = await prisma.proposal.create({
        data: {
          requestId,
          providerId: provider.id,
          priceCents,
          message,
        },
        include: {
          provider: { select: { id: true, description: true, isActive: true } },
        },
      })

      return ok(response, { status: 201, message: 'Proposta enviada com sucesso', data: created })
    } catch {
      return fail(response, { status: 409, message: 'Você já enviou proposta para este pedido' })
    }
  }

  // GET /requests/:id/proposals
  async listByRequest({ request, response, params }: HttpContext) {
    const user = (request as any).user
    if (!user) return fail(response, { status: 401, message: 'Usuário não autenticado' })

    const requestId = String(params.id || '').trim()
    if (!requestId) return fail(response, { status: 400, message: 'ID do pedido inválido' })

    const foundRequest = await prisma.request.findUnique({
      where: { id: requestId },
      select: { id: true, userId: true },
    })
    if (!foundRequest) return fail(response, { status: 404, message: 'Pedido não encontrado' })

    const provider = await prisma.provider.findUnique({ where: { userId: user.id } })

    const isOwner = foundRequest.userId === user.id
    const isProvider = !!provider

    if (!isOwner && !isProvider) {
      return fail(response, { status: 403, message: 'Sem permissão para ver propostas deste pedido' })
    }

    const where: any = { requestId }
    if (!isOwner && provider) where.providerId = provider.id

    const items = await prisma.proposal.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        provider: {
          select: {
            id: true,
            description: true,
            isActive: true,
            user: { select: { id: true, name: true } },
          },
        },
      },
    })

    return ok(response, { message: 'Propostas listadas com sucesso', data: items })
  }

  // compatibilidade com seu routes se estiver usando indexByRequest
  async indexByRequest(ctx: HttpContext) {
    return this.listByRequest(ctx)
  }

  // PATCH /proposals/:id/status
  async updateStatus({ request, response, params }: HttpContext) {
    const user = (request as any).user
    if (!user) return fail(response, { status: 401, message: 'Usuário não autenticado' })

    const proposalId = String(params.id || '').trim()
    const status = String(request.input('status', '')).trim()

    if (!proposalId) return fail(response, { status: 400, message: 'ID da proposta inválido' })
    if (!['accepted', 'rejected', 'canceled'].includes(status)) {
      return fail(response, { status: 400, message: 'status deve ser: accepted | rejected | canceled' })
    }

    const proposal = await prisma.proposal.findUnique({
      where: { id: proposalId },
      include: {
        request: { select: { id: true, userId: true, acceptedProposalId: true } },
        provider: { select: { id: true, userId: true } },
      },
    })
    if (!proposal) return fail(response, { status: 404, message: 'Proposta não encontrada' })

    const isOwner = proposal.request.userId === user.id
    const isProviderOwner = proposal.provider.userId === user.id

    if (status === 'canceled') {
      if (!isProviderOwner) return fail(response, { status: 403, message: 'Apenas o prestador pode cancelar a proposta' })
    } else {
      if (!isOwner) return fail(response, { status: 403, message: 'Apenas o dono do pedido pode aceitar/rejeitar' })
    }

    if (proposal.status !== 'pending') {
      return fail(response, { status: 400, message: `Proposta já está em: ${proposal.status}` })
    }

    if (status === 'accepted') {
      if (proposal.request.acceptedProposalId) {
        return fail(response, { status: 400, message: 'Este pedido já possui uma proposta aceita' })
      }

      const result = await prisma.$transaction(async (tx) => {
        const accepted = await tx.proposal.update({
          where: { id: proposal.id },
          data: { status: 'accepted' },
        })

        await tx.proposal.updateMany({
          where: { requestId: proposal.requestId, id: { not: proposal.id }, status: 'pending' },
          data: { status: 'rejected' },
        })

        const updatedRequest = await tx.request.update({
          where: { id: proposal.requestId },
          data: {
            status: 'matched',
            providerId: proposal.providerId,
            acceptedProposalId: proposal.id,
          },
          select: { id: true, status: true, providerId: true, acceptedProposalId: true },
        })

        return { accepted, updatedRequest }
      })

      return ok(response, { message: 'Proposta aceita com sucesso', data: result })
    }

    const updated = await prisma.proposal.update({
      where: { id: proposal.id },
      data: { status: status as any },
    })

    return ok(response, { message: 'Status da proposta atualizado', data: updated })
  }
}
