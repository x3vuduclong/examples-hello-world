import { serveFile } from "jsr:@std/http/file-server";

// Deno.serve((req: Request) => {
//     return serveFile(req, "./index.html");
// });

Deno.serve({ port: 80 }, async (request) => {
  const { pathname, search } = new URL(request.url)
  const url = new URL('.' + pathname, 'https://facebook.com')
  url.search = search

  const headers = new Headers(request.headers)
  headers.set('Host', url.hostname)
  // headers.set('Authorization', Deno.env.get('PROXY_AUTHORIZATION'))

  return fetch(url, {
    method: request.method,
    headers,
    body: request.body,
    redirect: 'manual',
  })
})
