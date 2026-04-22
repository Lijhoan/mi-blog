export const jsonResponse = <T>(status: number, body: T) => {
  return Response.json(body, {
    status,
    headers: {
      'Cache-Control': 'no-store',
    },
  })
}

export const badRequest = (message: string, details?: unknown) =>
  jsonResponse(400, {
    ok: false,
    error: 'bad_request',
    message,
    details,
  })

export const serverError = (message: string, details?: unknown) =>
  jsonResponse(500, {
    ok: false,
    error: 'server_error',
    message,
    details,
  })
