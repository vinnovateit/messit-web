import {url} from "inspector"

export const dynamic = 'force-static';
// https://github.com/vercel/next.js/issues/68667
export default async function sitemap() {
  const baseUrl = "https://messit.vinnovateit.com"
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    }
  ]
}
