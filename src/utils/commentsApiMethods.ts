import commentsData from '~/data/comments'
import { currentUser } from '~/data/users'
import type { CommentProps } from '~/types'
import { sanitizeMarkdown } from '~/utils/sanitizeMarkdown'

export const fetchComments = (): CommentProps[] => {
  const sessionStorage = window.sessionStorage
  const comments = sessionStorage.getItem('comments')
  if (!comments) {
    sessionStorage.setItem('comments', JSON.stringify(commentsData))
    return commentsData
  }

  return JSON.parse(comments)
}

const saveComment = (comments: CommentProps[]) => {
  window.sessionStorage.setItem('comments', JSON.stringify(comments))
}

export const updateComment = async (id: string, newMarkdown: string) => {
  const commentsData = fetchComments()
  const cleanMarkdown = await sanitizeMarkdown(newMarkdown)

  const updatedComments = commentsData.reduce(
    (arr: CommentProps[], currentComment: CommentProps) => {
      if (currentComment.id === id) {
        currentComment.markdown = cleanMarkdown
        currentComment.edited_at = new Date().toISOString()
      }
      return [...arr, { ...currentComment }]
    },
    []
  )

  saveComment(updatedComments)
}

export const postComment = async (markdown: string) => {
  const commentsData = fetchComments()
  const id = crypto.randomUUID()
  const cleanMarkdown = await sanitizeMarkdown(markdown)
  commentsData.push({
    markdown: cleanMarkdown,
    id,
    posted_at: new Date().toISOString(),
    user: { ...currentUser },
  })
  saveComment(commentsData)
}
