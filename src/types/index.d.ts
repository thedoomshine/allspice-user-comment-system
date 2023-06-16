export type CommentProps = {
  attachment?: {
    url: string
    title: string
    size: string
  }
  markdown?: string
  posted_at?: string
  role?: string
} & { user: UserProps }

export type UserProps = {
  profile_image: string
  display_name: string
  first_name: string
  last_name: string
  profile_url: string
}
