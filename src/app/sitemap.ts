import { url } from "inspector"

export default async function sitemap() {
    const baseUrl = "https://messit.vinnovateit.com"
    return[
        {
            url: baseUrl,
            lastModified: new Date(),
        }
    ]
}