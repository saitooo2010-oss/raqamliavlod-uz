import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import { cn } from '@/lib/utils'

const katexAllow = {
  tagNames: [
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'b',
    'ol',
    'ul',
    'li',
    'span',
    'math',
    'mi',
    'mo',
    'mfrac',
    'msup',
    'msub',
    'msqrt',
    'mrow',
    'annotation',
    'annotation-xml',
    'table',
    'tr',
    'td',
    'tbody',
    'br',
    'hr',
    'sup',
    'sub',
  ],
  attributes: {
    '*': ['className', 'style', 'id'],
    'annotation-xml': ['encoding'],
  },
}
const sanitizeSchemaExtension = katexAllow

export default function MarkdownDisplay({
  children,
  className = undefined,
}: {
  children: string
  className?: string
}) {
  return (
    <>
      <div className={cn('max-w-full prose', className)}>
        <Markdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[
            rehypeRaw,
            rehypeKatex,
            [rehypeSanitize, sanitizeSchemaExtension],
          ]}
        >
          {children}
        </Markdown>
      </div>
    </>
  )
}
