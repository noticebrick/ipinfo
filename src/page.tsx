import type { FC } from 'hono/jsx'
import { UAParser } from 'ua-parser-js'

import type { IPInfoResponse } from './ipinfo'

interface PageProps {
  ip: string | undefined
  city: string | undefined
  country: string | undefined
  ua: ReturnType<typeof UAParser> | undefined
  ipinfo: IPInfoResponse | undefined
}

export const Page: FC<PageProps> = ({ ip, city, country, ua, ipinfo }) => {
  const cityPart = city
  const countryPart = ipinfo?.country || country
  let locationLine: string | undefined
  if (cityPart && countryPart && cityPart !== countryPart) locationLine = `You are located in ${cityPart}, ${countryPart}.`
  else if (cityPart || countryPart) locationLine = `You are located in ${cityPart || countryPart}.`

  const asn = ipinfo?.asn
  const asNameRaw = ipinfo?.as_name
  const asName = asNameRaw ? asNameRaw.replace(/\.+$/, '') : undefined
  const providerLine = asn || asName ? `Your internet provider is ${[asn, asName].filter(Boolean).join(' ')}.` : undefined

  const browserName = ua?.browser?.name
  const browserVersion = ua?.browser?.version
  const osName = ua?.os?.name
  const osVersion = ua?.os?.version

  const browserFull = browserName ? [browserName, browserVersion].filter(Boolean).join(' ') : undefined
  const osFull = osName ? [osName, osVersion].filter(Boolean).join(' ') : undefined

  let uaLine: string | undefined
  if (browserFull && osFull) uaLine = `You are using ${browserFull} on ${osFull}`
  else if (browserFull) uaLine = `You are using ${browserFull}`
  else if (osFull) uaLine = `You are on ${osFull}`

  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>IP Info</title>
        <meta property="og:title" content="IP Info" />
        <meta property="og:description" content="Check your IP address and related information." />
        <meta property="og:type" content="website" />
        <link rel="stylesheet" href="/style.css" />
      </head>
      <body>
        <div className="wrapper">
          <h1>{`Hello${ip ? ' ' + ip : ''},`}</h1>
          {locationLine && <h2>{locationLine}</h2>}
          {providerLine && <h2>{providerLine}</h2>}
          {uaLine && <h2>{uaLine}</h2>}
        </div>
      </body>
    </html>
  )
}
