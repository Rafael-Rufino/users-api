import { HttpStatusCode } from './protocols'

export const ok = (body: any) => ({
  statusCode: HttpStatusCode.Ok,
  body,
})

export const created = (body: any) => ({
  statusCode: HttpStatusCode.CREATED,
  body,
})

export const badRequest = (message: string) => ({
  statusCode: HttpStatusCode.BAD_REQUEST,
  body: message,
})

export const unauthorized = (message: string) => ({
  statusCode: HttpStatusCode.UNAUTHORIZED,
  body: message,
})

export const forbidden = (message: string) => ({
  statusCode: HttpStatusCode.FORBIDDEN,
  body: message,
})

export const notFound = (message: string) => ({
  statusCode: HttpStatusCode.NOT_FOUND,
  body: message,
})

export const serverError = () => ({
  statusCode: HttpStatusCode.SERVER_ERROR,
  body: 'Internal server error',
})
