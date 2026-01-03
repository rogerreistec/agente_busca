// apps/api/app/services/http_response.ts
import type { Response } from '@adonisjs/core/http'

type SuccessPayload<T> = {
  message?: string
  data?: T
  meta?: unknown
  status?: number
}

type ErrorPayload = {
  message: string
  status?: number
  errors?: unknown
}

export function ok<T>(response: Response, payload: SuccessPayload<T> = {}) {
  const {
    message = 'OK',
    data = null as unknown as T,
    meta = null,
    status = 200,
  } = payload

  return response.status(status).json({
    success: true,
    message,
    data,
    meta,
  })
}

export function fail(response: Response, payload: ErrorPayload) {
  const { message, status = 400, errors = null } = payload

  return response.status(status).json({
    success: false,
    message,
    errors,
  })
}
