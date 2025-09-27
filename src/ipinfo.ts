import { env } from 'cloudflare:workers'

export interface IPInfoResponse {
  ip: string
  asn: string
  as_name: string
  as_domain: string
  country_code: string
  country: string
  continent_code: string
  continent: string
}

export default async function ipinfo(ip: string): Promise<IPInfoResponse | undefined> {
  try {
    const res = await fetch(`https://api.ipinfo.io/lite/${ip}`, {
      headers: {
        Authorization: `Bearer ${env.IPINFO_TOKEN}`
      }
    })
    if (!res.ok) return undefined
    return await res.json()
  } catch {
    return undefined
  }
}
