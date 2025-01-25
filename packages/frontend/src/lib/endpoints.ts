const basePath = import.meta.env.VITE_API_URL

// auth
export const AUTH_STATUS_ENDPOINT = `${basePath}/auth/user`
export const LOGIN_ENDPOINT = `${basePath}/auth/twitter`
export const LOGOUT_ENDPOINT = `${basePath}/auth/logout`

// bookmarks
export const BOOKMARKS_ENDPOINT = `${basePath}/bookmarks/`
export const BOOKMARKS_SUMMARY_ENDPOINT = `${basePath}/bookmarks/analyze-bookmarks`

// xer
export const ASSISTANTS_ENDPOINT = `${basePath}/xer`
export const getCreateAssistantEP = (author: string) => 
  `${basePath}/xer/create/${author}`
export const generatePostEP = (author: string) => 
  `${basePath}/xer/${author}/generate-post`
export const saveGeneratedPostEP = (author: string) => 
  `${basePath}/xer/${author}/generate-post/save`
export const generatedPostsEP = (author: string) => 
  `${basePath}/xer/${author}/generate-post/all`