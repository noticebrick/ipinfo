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
      </head>
      <body>
        <div className="wrapper">
          <h1>{`Hello${ip ? ' ' + ip : ''},`}</h1>
          {locationLine && <h2>{locationLine}</h2>}
          {providerLine && <h2>{providerLine}</h2>}
          {uaLine && <h2>{uaLine}</h2>}
        </div>
        <style jsx global>{`
          body {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            min-height: 100dvh;
            margin: 0;
            padding: 2rem;
            font-family: system-ui, Arial, sans-serif;
            background-color: #111;
            color: #fff;
            line-height: 1.4;
            text-align: center;
            box-sizing: border-box;
          }

          .wrapper {
            max-width: 1000px;
            width: 100%;
          }

          h1,
          h2 {
            margin: 0.4rem 0;
            font-weight: 500;
          }

          h1 {
            font-size: clamp(2rem, 3.5vw + 0.5rem, 3.2rem);
          }

          h2 {
            font-size: clamp(1.1rem, 1.2vw + 0.8rem, 1.7rem);
            opacity: 0.9;
            font-weight: 400;
          }

          @media (min-width: 1200px) {
            h1 {
              font-weight: 600;
            }
          }

          @media (max-width: 600px) {
            h1 {
              font-size: 1.75rem;
            }
            h2 {
              font-size: 1rem;
            }
          }
        `}</style>
      </body>
    </html>
  )
}
