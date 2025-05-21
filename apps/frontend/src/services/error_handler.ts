import { HttpStatusCode, LogLevel, type HttpToastError } from '@/models/error_model'
import i18n from '@/plugins/i18n'
import router from '@/router'
import { TuyauHTTPError } from '@tuyau/client'

const { t } = i18n.global

const queryHandleError = (
  failureCount: number,
  error: Error | TuyauHTTPError,
  logLevel = LogLevel.Error,
): boolean => {
  if (error instanceof TuyauHTTPError && error.status === HttpStatusCode.UnprocessableEntity) {
    return false
  }

  if (error instanceof TuyauHTTPError && error.status === HttpStatusCode.Unauthorized) {
    router.push({ name: 'login' })
    return false
  }

  if (error instanceof TuyauHTTPError && error.status === HttpStatusCode.Forbidden) {
    //TODO: redirect to 403 page
    return false
  }

  if (failureCount > 2) {
    handleError(error, logLevel)
    return false
  }

  return true
}

const handleError = (error: Error | TuyauHTTPError, logLevel = LogLevel.Error) => {
  logToConsole(error.message, logLevel)

  if (logLevel > LogLevel.Info) {
    buildToastFromError(error)
  }

  // TODO: redirect user to a error page because of fatal error
  // if (logLevel === LogLevel.Fatal) {
  // }
}

const logToConsole = (message: string, level: LogLevel) => {
  switch (level) {
    case LogLevel.Info:
      console.info('ErrorHandler INFO', message)
      break
    case LogLevel.Warn:
      console.warn('ErrorHandler WARNING', message)
      break
    case LogLevel.Error:
      console.error('ErrorHandler ERROR', message)
      break
    default:
      console.info('ErrorHandler', message)
  }
}

const buildToastFromError = (error: Error | TuyauHTTPError) => {
  const content: HttpToastError = {
    summary: t('errorMessages.defaultTitle'),
    detail: t('errorMessages.defaultDescription'),
  }

  if (error) {
    if (error instanceof TuyauHTTPError) {
      content.detail = error.message

      switch (error.status) {
        case HttpStatusCode.QuotaExceeded:
          content.summary = t('errorMessages.httpQuotaExceed')
          break
        case HttpStatusCode.NotFound:
          content.summary = t('errorMessages.httpNotFound')
          break
        case HttpStatusCode.Conflict:
          content.summary = t('errorMessages.httpConflict.default')
          break
        case HttpStatusCode.InternalServerError:
          content.summary = t('errorMessages.httpInternalServerError')
          break
        case HttpStatusCode.BadGateway:
          content.summary = t('errorMessages.httpBadGateway')
          break
        default:
          content.summary = t('errorMessages.httpDefault')
      }
    } else if (error.message) {
      content.summary = t('errorMessages.errorTitle')
      content.detail = error.message
    }

    httpErrorToast.value.push(content)
  }
}

export default {
  queryHandleError,
  handleError,
  logToConsole,
}
