export const ok = (body: any) => ({
  statusCode: 200,
  body,
})

export const created = (body: any) => ({
  statusCode: 201,
  body,
})

export const badRequest = (message: string) => ({
  statusCode: 400,
  body: message,
})

export const unauthorized = (message: string) => ({
  statusCode: 401,
  body: message,
})

export const forbidden = (message: string) => ({
  statusCode: 403,
  body: message,
})

export const notFound = (message: string) => ({
  statusCode: 404,
  body: message,
})

export const serverError = () => ({
  statusCode: 500,
  body: 'Internal server error',
})
