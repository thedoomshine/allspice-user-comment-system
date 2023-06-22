import { expectDomTypeError } from '@milkdown/exception';
import { InputRule } from '@milkdown/prose/inputrules';
import { $inputRule, $node } from '@milkdown/utils';
import { $remark } from '@milkdown/utils';
import directive from 'remark-directive';


/// HTML attributes for thumbnail node.
const INPUT_REGEX =
  /::thumbnail\[(?<alt>.*)\]\((?<title>.*)\)\{\scommit="(?<commit>[^"]+)"\sview-coords="(?<viewCoords>[^"]+)"\shref="(?<href>[^"]*)*"\saspect-ratio="(?<aspectRatio>[\d.]*)"}/

type MarkdownNodeProps = {
  alt?: string
  ['aspect-ratio']?: string
  commit?: string
  ['view-coords']?: string
  href?: string
  title?: string
}

const remarkDirective = $remark(() => directive)
export const thumbnailNode = $node('thumbnail', () => ({
  group: 'block',
  atom: true,
  isolating: true,
  marks: '',
  attrs: {
    alt: { default: '' },
    ['aspect-ratio']: { default: '' },
    commit: { default: '' },
    ['view-coords']: { default: '' },
    ['data-type']: { default: 'thumbnail' },
    href: { default: '' },
    src: { default: '' },
    title: { default: '' },
  },
  parseDOM: [
    {
      tag: 'a[data-type="thumbnail"]',
      getAttrs: (dom) => {
        if (!(dom instanceof HTMLElement)) throw expectDomTypeError(dom)

        return {
          ['data-type']: 'thumbnail',
          href: dom.getAttribute('href') || '',
        }
      },
    },
    {
      tag: 'a[data-type="thumbnail"] div.thumbnail-wrapper',
      getAttrs: (dom) => {
        if (!(dom instanceof HTMLElement)) throw expectDomTypeError(dom)
        return {
          ['aspect-ratio']: dom.dataset['aspect-ratio'] || '',
          commit: dom.dataset.commit || '',
          ['view-coords']: dom.dataset['view-coords'] || '',
        }
      },
    },
    {
      tag: 'a[data-type="thumbnail"] div.thumbnail-wrapper img',
      getAttrs: (dom) => {
        if (!(dom instanceof HTMLElement)) throw expectDomTypeError(dom)
        return {
          src: dom.getAttribute('src') || '',
          alt: dom.getAttribute('alt') || '',
          title: dom.getAttribute('title') || '',
        }
      },
    },
  ],
  toDOM: (node) => {
    return [
      'a',
      { href: node.attrs.href, ['data-type']: 'thumbnail' },
      [
        'div',
        {
          class: 'thumbnail-wrapper',
          ['data-aspect-ratio']: node.attrs['aspect-ratio'],
          ['data-view-coords']: node.attrs['view-coords'],
          ['data-commit']: node.attrs.commit,
        },
        [
          'img',
          {
            alt: node.attrs.alt,
            src: node.attrs.src,
            title: node.attrs.title,
          },
        ],
      ],
    ]
  },
  parseMarkdown: {
    match: (node) => {
      return node.type === 'leafDirective' && node.name === 'thumbnail'
    },
    runner: (state, node, type) => {
      const attributes = node.attributes as MarkdownNodeProps

      state.addNode(type, {
        alt: attributes.alt,
        ['aspect-ratio']: attributes['aspect-ratio'],
        commit: attributes.commit,
        ['view-coords']: attributes['view-coords'],
        href: attributes.href,
        src: attributes.href?.replace('src', 'preview'),
        title: attributes.title,
      })
    },
  },
  toMarkdown: {
    match: (node) => {
      return node.type.name === 'thumbnail'
    },
    runner: (state, node) => {
      state.addNode('leafDirective', undefined, undefined, {
        name: 'thumbnail',
        attributes: {
          alt: node.attrs.alt,
          ['aspect-ratio']: node.attrs['aspect-ratio'],
          commit: node.attrs.commit,
          ['view-coords']: node.attrs['view-coords'],
          href: node.attrs.href,
          src: node.attrs.src,
          title: node.attrs.title,
          url: node.attrs.src,
        },
      })
    },
  },
}))

/// This input rule will insert a thumbnail node.
/// You can input `::thumbnail[alt]{ commit view-coords href aspectRatio }` to insert a thumbnail node.
export const thumbnailInputRule = $inputRule(
  () =>
    new InputRule(INPUT_REGEX, (state, match, start, end) => {
      const [
        matched,
        alt = '',
        title = '',
        commit = '',
        viewCoords = '',
        href = '',
        aspectRatio = '',
      ] = match
      const { tr } = state
      if (matched) {
        tr.replaceWith(
          start - 1,
          end,
          thumbnailNode.type().create({
            href,
            alt,
            title,
            commit,
            'view-coords': viewCoords,
            'aspect-ratio': aspectRatio,
          })
        )
      }
      return tr
    })
)

export default [remarkDirective, thumbnailNode, thumbnailInputRule]
