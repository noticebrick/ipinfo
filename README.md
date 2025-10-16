# IP Info

A simple, fast IP information service built with [Hono](https://hono.dev/) and deployed on Cloudflare Workers.

🌐 **Live at:** [ip.owob.dev](https://ip.owob.dev)

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/noticebrick/ipinfo)

## Features

- **IP Address Detection** - Automatically detects visitor's IP address
- **Geolocation** - Shows city and country information
- **ISP Information** - Displays ASN and provider details via IPInfo API
- **User Agent Parsing** - Detects browser and OS information
- **Multiple Output Formats**:
  - Web interface with clean, responsive design
  - Plain text endpoint (`/ip`)
  - JSON API endpoint (`/json`)

## Endpoints

### `GET /`

Returns a beautiful web interface displaying:

- Your IP address
- Location (city and country)
- Internet provider (ASN and name)
- Browser and operating system details

### `GET /ip`

Returns your IP address as plain text.

**Example:**

```bash
curl https://ip.owob.dev/ip
```

### `GET /json`

Returns comprehensive information in JSON format.

**Example:**

```bash
curl https://ip.owob.dev/json
```

**Response:**

```json
{
  "ip": "123.45.67.89",
  "region": "California",
  "city": "San Francisco",
  "country": "US",
  "timezone": "America/Los_Angeles"
}
```

## Tech Stack

- **[Hono](https://hono.dev/)** - Ultrafast web framework for Cloudflare Workers
- **[Cloudflare Workers](https://workers.cloudflare.com/)** - Edge computing platform
- **[IPInfo API](https://ipinfo.io/)** - Enhanced IP geolocation and ASN data
- **[UA Parser JS](https://github.com/faisalman/ua-parser-js)** - User agent string parsing
- **[Bun](https://bun.sh/)** - Fast JavaScript runtime and package manager

## Development

### Prerequisites

- [Bun](https://bun.sh/) installed
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)
- Cloudflare account (for deployment)
- IPInfo API token (optional, for enhanced geolocation)

### Setup

Clone the repository:

```bash
git clone https://github.com/yourusername/ip.owob.dev.git
cd ip.owob.dev
```

Install dependencies:

```bash
bun install
```

Configure your IPInfo token in `wrangler.jsonc`:

```jsonc
{
  "vars": { "IPINFO_TOKEN": "your_token_here" }
}
```

### Local Development

Start the development server:

```bash
bun run dev
```

The service will be available at `http://localhost:8787`

### Deployment

Deploy to Cloudflare Workers:

```bash
bun run deploy
```

### Code Formatting

Format code with Prettier:

```bash
bun run prettier
```

## Project Structure

```plaintext
.
├── src/
│   ├── index.tsx      # Main application and routes
│   ├── ipinfo.ts      # IPInfo API integration
│   └── page.tsx       # Web UI component
├── package.json       # Dependencies and scripts
├── wrangler.jsonc     # Cloudflare Workers configuration
└── tsconfig.json      # TypeScript configuration
```

## Environment Variables

- `IPINFO_TOKEN` - IPInfo API token for enhanced geolocation data (optional)

## Cloudflare Features Used

This project leverages several Cloudflare-specific headers:

- `cf-connecting-ip` - Visitor's IP address
- `cf-ipcity` - Visitor's city
- `cf-ipcountry` - Visitor's country code
- `cf-region` - Visitor's region/state
- `cf-timezone` - Visitor's timezone

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Hono](https://hono.dev/)
- Powered by [Cloudflare Workers](https://workers.cloudflare.com/)
- Geolocation data from [IPInfo](https://ipinfo.io/)
- User agent parsing by [UA Parser JS](https://github.com/faisalman/ua-parser-js)
