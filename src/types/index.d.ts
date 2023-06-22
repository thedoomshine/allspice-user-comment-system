export type CommentProps = {
  attachment?: AttachmentProps
  id: string
  markdown: string
  posted_at: string
  edited_at?: string
} & { user: UserProps }

export type UserProps = {
  id: string
  profile_image: string
  display_name: string
  first_name: string
  last_name: string
  profile_url: string
  role: string
}

export type AttachmentProps = {
  url: string
  title: string
  size: string
}
