const basePath = import.meta.env.VITE_API_URL

// auth
export const AUTH_STATUS_ENDPOINT = `${basePath}/auth/user`
export const LOGIN_ENDPOINT = `${basePath}/auth/twitter`
export const LOGOUT_ENDPOINT = `${basePath}/auth/logout`

// bookmarks
export const BOOKMARKS_ENDPOINT = `${basePath}/bookmarks/`
export const BOOKMARKS_SUMMARY_ENDPOINT = `${basePath}/bookmarks/analyze-bookmarks`
export const SAVE_BOOKMARKS_SUMMARY_ENDPOINT = `${basePath}/bookmarks/save`
export const SUMMARIES_ENDPOINT = `${basePath}/bookmarks/summaries`

// content-assistant
export const ASSISTANTS_ENDPOINT = `${basePath}/content-assistant`
export const getCreateAssistantEP = (author: string) => 
  `${basePath}/content-assistant/create/${author}`
export const generatePostEP = (author: string) => 
  `${basePath}/content-assistant/${author}/generate-post`
export const saveGeneratedPostEP = (author: string) => 
  `${basePath}/content-assistant/${author}/generate-post/save`
export const generatedPostsEP = (author: string) => 
  `${basePath}/content-assistant/${author}/generate-post/all`

export const generateThreadEP = (author: string) => 
  `${basePath}/content-assistant/${author}/generate-thread`
export const saveGeneratedThreadEP = (author: string) => 
  `${basePath}/content-assistant/${author}/generate-thread/save`
export const generatedThreadsEP = (author: string) => 
  `${basePath}/content-assistant/${author}/generate-thread/all`

// schedule posts
export const GET_SCHEDULED_POSTS = `${basePath}/schedule-posts`
export const SCHEDULE_POST = `${basePath}/schedule-posts/new`
export const GET_SCHEDULABLE_POSTS = `${basePath}/schedule-posts/schedulable`

// schedule threads
export const GET_SCHEDULED_THREADS = `${basePath}/schedule-threads`
export const SCHEDULE_THREAD = `${basePath}/schedule-threads/new`
export const GET_SCHEDULABLE_THREADS = `${basePath}/schedule-threads/schedulable`

// manual content
export const CREATE_MANUAL_POST = `${basePath}/manual-content/create/post`
