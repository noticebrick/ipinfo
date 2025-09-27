import { Hono } from 'hono'
import { UAParser } from 'ua-parser-js'

import ipinfo from './ipinfo'

import { Page } from './page'

const app = new Hono<{ Bindings: CloudflareBindings }>()

app.get('/', async c => {
  const ip = c.req.header('cf-connecting-ip')
  const city = c.req.header('cf-ipcity')
  const country = c.req.header('cf-ipcountry')
  const ua = UAParser(c.req.header('user-agent'))

  const IP_INFO = ip ? await ipinfo(ip) : undefined

  return c.html(<Page ip={ip} city={city} country={country} ua={ua} ipinfo={IP_INFO} />)
})

export default app
