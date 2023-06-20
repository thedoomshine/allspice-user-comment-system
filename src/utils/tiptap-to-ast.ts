import { kebabCase } from 'scule'

const createNodeWithType =
  (type) =>
  (node, { attrs }) => {
    return {
      type,
      children: [node],
      ...attrs,
    }
  }

const marks = {
  italic: createNodeWithType('emphasis'),
  strike: createNodeWithType('delete'),
  bold: createNodeWithType('strong'),
  link: createNodeWithType('link'),
  // code: createNodeWithType('code'),
}

const handlers = {
  doc: (node) => ({
    type: 'root',
    children: node.content ? node.content.map((node) => visit(node)) : [],
    props: {},
  }),
  horizontalRule: () => ({
    type: 'horizontalRule',
    props: {},
    children: [],
  }),
  text: (node) => {
    let _node = {
      type: 'text',
      value: node.text,
    }
    if (node.marks) {
      _node = node.marks.reduce((_node, { type, attrs }) => {
        return marks[type](_node, { attrs })
      }, _node)
    }
    return _node
  },
  paragraph: (node) => ({
    type: 'paragraph',
    children: node.content ? node.content.map((node) => visit(node)) : [],
    props: {},
  }),
  orderedList: (node) => ({
    type: 'list',
    ordered: true,
    props: {},
    children: node.content.map(visit),
  }),
  bulletList: (node) => ({
    type: 'list',
    ordered: false,
    props: { ...node.attrs },
    children: node.content.map(visit),
  }),
  listItem: (node) => ({
    type: 'listItem',
    props: { ...node.attrs },
    children: node.content.map(visit),
  }),
  heading: (node) => {
    node.content = node.content || []
    const id = kebabCase(node.content.map((n) => n.text))
    const children = node.content.map(visit)

    return {
      type: 'heading',
      depth: node.attrs.level,
      props: {
        id,
      },
      id,
      children,
    }
  },
  codeBlock: (node) => {
    return {
      type: 'codeBlock',
      depth: node.attrs.level,
      props: { ...node.attrs },
    }
  },
  image: (node) => {
    return {
      type: 'image',
      depth: node.attrs.level,

      props: { ...node.attrs },
    }
  },
}
function visit(node) {
  if (handlers[node.type]) {
    node = handlers[node.type](node)
  }
  return node
}

export function tiptapToAST(tree) {
  return visit(tree)
}
