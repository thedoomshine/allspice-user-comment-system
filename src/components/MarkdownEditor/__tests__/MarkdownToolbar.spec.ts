import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'

import MarkdownToolbar from '../MarkdownToolbar.vue'
import { withProvider } from './withProvider'

const toolbar = mount(MarkdownToolbar, {
  propsData: {
    markdown: '# Test',
  },
})

test('renders markdown as html', () => {
  expect(withProvider(toolbar).html()).toContain('<h1>Test</h1>')
})
