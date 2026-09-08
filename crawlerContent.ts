import { readFileSync } from 'node:fs'
import type { Plugin } from 'vite'
import type contentShape from './src/content.json'

const escape = (text: string) => text.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]!)
const plain = (text: string) => text.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()

export function crawlerContent(): Plugin {
  function generate() {
    const data = JSON.parse(readFileSync(new URL('./src/content.json', import.meta.url), 'utf8')) as typeof contentShape
    const origin = `https://${readFileSync(new URL('./public/CNAME', import.meta.url), 'utf8').trim()}`
    const md: string[] = ['# Bharat Gupta', '', ...data.introduction.map(plain), '', '## Work experience', '']
    const html: string[] = ['<h1>Bharat Gupta</h1>', ...data.introduction.map(text => `<p>${escape(plain(text))}</p>`), '<h2>Work experience</h2>']
    for (const job of data.experience) {
      md.push(`### ${job.company}`, '', job.role, '', job.description, '', ...(job.url ? [`[Company website](${job.url})`, ''] : []))
      html.push(`<section><h3>${escape(job.company)}</h3><p>${escape(job.role)}</p><p>${escape(job.description)}</p>${job.url ? `<a href="${escape(job.url)}">Company website</a>` : ''}</section>`)
    }
    md.push('## Projects', '')
    html.push('<h2>Projects</h2>')
    for (const project of data.projects) {
      md.push(`### ${project.title}`, '', project.description, '', project.url ? `[View project](${project.url})` : 'Beta soon', '')
      html.push(`<section><h3>${escape(project.title)}</h3><p>${escape(project.description)}</p>${project.url ? `<a href="${escape(project.url)}">View project</a>` : '<p>Beta soon</p>'}</section>`)
    }
    for (const [heading, links] of [['More projects', [data.moreProjects]], ['Open source contributions', data.contributions], ['Connect', data.socials]] as const) {
      md.push(`## ${heading}`, '', ...links.map(link => `- [${link.label}](${link.url})`), '')
      html.push(`<h2>${heading}</h2><ul>${links.map(link => `<li><a href="${escape(link.url)}">${escape(link.label)}</a></li>`).join('')}</ul>`)
    }
    return {
      'llms.txt': `# Bharat Gupta\n\n> Personal portfolio of Bharat Gupta: introduction, work experience, projects, and contact links.\n\n## Portfolio\n\n- [Complete portfolio in Markdown](${origin}/llms-full.txt): All published descriptions and links; no JavaScript or interaction required.\n- [Readable HTML profile](${origin}/profile.html): The same content in plain HTML.\n- [Interactive portfolio](${origin}/): Visual scrolling experience.\n`,
      'llms-full.txt': md.join('\n') + '\n',
      'profile.html': `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Bharat Gupta — Text profile</title><link rel="alternate" type="text/plain" href="/llms-full.txt" title="Markdown portfolio"><style>body{max-width:800px;margin:48px auto;padding:0 24px;font:17px/1.7 system-ui;color:#282822;background:#f4f1e9}a{color:#994024}section{margin-bottom:32px}</style></head><body><nav><a href="/">Interactive portfolio</a> · <a href="/llms-full.txt">Markdown</a></nav><main>${html.join('\n')}</main></body></html>`,
      'robots.txt': `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
      'sitemap.xml': `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url><url><loc>${origin}/profile.html</loc></url></urlset>\n`,
    }
  }
  return {
    name: 'portfolio-crawler-content',
    configureServer(server) {
      server.middlewares.use((request, response, next) => {
        const path = (request.url ?? '').split('?')[0].slice(1)
        if (!['llms.txt', 'llms-full.txt', 'profile.html', 'robots.txt', 'sitemap.xml'].includes(path)) return next()
        const files = generate()
        response.setHeader('Content-Type', path.endsWith('.html') ? 'text/html; charset=utf-8' : path.endsWith('.xml') ? 'application/xml; charset=utf-8' : 'text/plain; charset=utf-8')
        response.end(files[path as keyof typeof files])
      })
    },
    generateBundle() {
      for (const [fileName, source] of Object.entries(generate())) this.emitFile({ type: 'asset', fileName, source })
    },
  }
}
