//  write vitest test for MarkdownEditor component
import { type VueWrapper, mount } from '@vue/test-utils'

import MarkdownProvider from '../MarkdownProvider.vue'

export const withProvider = (child: VueWrapper) =>
  mount(MarkdownProvider, {
    children: [child],
  })
