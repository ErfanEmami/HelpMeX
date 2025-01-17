const basePath = import.meta.env.VITE_API_URL

export const AUTH_STATUS_ENDPOINT = `${basePath}/auth/user`
export const LOGIN_ENDPOINT = `${basePath}/auth/twitter`
export const LOGOUT_ENDPOINT = `${basePath}/auth/logout`
export const BOOKMARKS_ENDPOINT = `${basePath}/bookmarks/`
export const BOOKMARKS_SUMMARY_ENDPOINT = `${basePath}/bookmarks/analyze-bookmarks`
