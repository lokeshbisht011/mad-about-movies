import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrettyCode from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

const computedFields = {
    slug: {
        type: 'string',
        resolve: (doc) => doc._raw.flattenedPath
            .replace(/^.+?(\/)/, '')
            .toLowerCase()
            .replace(/\s+/g, '-')
    },
}

export const Blog = defineDocumentType(() => ({
    name: 'Blog',
    filePathPattern: 'blogs/*.mdx',
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        date: { type: 'date', required: true },
        tags: { type: 'list', of: { type: 'string' }, default: [] },
        summary: { type: 'string' },
        images: { type: 'json' },
    },
    computedFields
}))

export const Movie = defineDocumentType(() => ({
    name: 'Movie',
    filePathPattern: 'movies/*.mdx',
    contentType: 'mdx',
    fields: {
        title: { type: 'string', required: true },
        date: { type: 'date', required: true },
        tags: { type: 'list', of: { type: 'string' }, default: [] },
        summary: { type: 'string' },
        images: { type: 'json' },
    },
    computedFields
}))

export default makeSource({
    contentDirPath: 'src/content',
    documentTypes: [Blog, Movie],
    mdx: {
        remarkPlugins: [
             remarkGfm,
        ],
        rehypePlugins: [
            rehypeSlug,
            [
                rehypePrettyCode,
                {
                    theme: 'github-dark',
                    onVisitLine(node) {
                        if (node.children.length === 0) {
                            node.children = [{ type: 'text', value: ' ' }]
                        }
                    },
                    onVisitHighlightedLine(node) {
                        node.properties.className.push('line--highlighted')
                    },
                    onVisitHighlightedWord(node) {
                        node.properties.className.push('word--highlighted')
                    },
                }
            ],
            [
                rehypeAutolinkHeadings,
                {
                    properties: {
                        className: ['subheading-anchor'],
                        ariaLabel: 'Link to section',
                    }
                },
            ],
        ],
    },
})
