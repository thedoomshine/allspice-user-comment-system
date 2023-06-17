import type { UserProps } from '~/types'

export const users = {
  kyle: {
    id: '987654321',
    profile_image: 'https://hub.allspice.io/avatars/d7798257f63530c5d2bb466596137af1?size=84',
    display_name: 'kyle',
    first_name: 'kyle',
    last_name: 'dumont',
    profile_url: '',
  },
  morgan: {
    id: '123456789',
    profile_image: 'https://avatars.githubusercontent.com/u/22797790?v=4',
    display_name: 'morgan',
    first_name: 'morgan',
    last_name: 'ashly',
    profile_url: '#',
  },
} as Record<string, UserProps>

export const currentUser = { ...users.morgan } as UserProps
