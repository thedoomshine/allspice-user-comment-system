import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'

import MarkdownEditor from '../MarkdownEditor.vue'
import { withProvider } from './withProvider'

const editor = mount(MarkdownEditor, {
  propsData: {
    editable: true,
    id: 'test',
    markdown: '# Test',
    onChange: () => {},
  },
})

test('renders markdown as html', () => {
  expect(withProvider(editor).html()).toContain('<h1>Test</h1>')
})
