import { serveFile } from "jsr:@std/http/file-server";

// Deno.serve((req: Request) => {
//     return serveFile(req, "./index.html");
// });

Deno.serve((req: Request) => {
    const { pathname, search } = new URL(req.url)
  const url = new URL('.' + pathname, 'https://facebook.com')
  url.search = search

  const headers = new Headers(req.headers)
  headers.set('Host', url.hostname)
  // headers.set('Authorization', Deno.env.get('PROXY_AUTHORIZATION'))

  return fetch(url, {
    method: req.method,
    headers,
    body: req.body,
    redirect: 'manual',
  })
});
