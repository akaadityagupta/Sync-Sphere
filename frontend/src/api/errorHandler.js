const GLOBAL_ERROR_STATUSES = new Set([403, 404, 500, 503])

export const shouldRedirectToGlobalErrorPage = (error) => {
  const status = error?.response?.status
  return !error?.response || GLOBAL_ERROR_STATUSES.has(status)
}

export const getApiErrorMessage = (error, fallback = "Something went wrong") => {
  if (!error) return fallback
  return error.response?.data?.message || error.response?.data?.error || fallback
}

export const handleApiError = (error) => {
  const status = error.response?.status

  switch (status) {
    case 401:
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      if (!window.location.pathname.startsWith("/login")) {
        window.location.href = "/login"
      }
      break

    case 403:
    case 404:
    case 500:
    case 503:
      window.location.href = `/error?code=${status}`
      break

    default:
      if (!error.response) {
        window.location.href = "/error?code=network"
      }
  }

  return Promise.reject(error)
}