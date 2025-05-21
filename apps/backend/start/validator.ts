import { JsonApiErrorReporter } from '#core/exceptions/json_api_error_reporter'
import vine from '@vinejs/vine'

vine.errorReporter = () => new JsonApiErrorReporter()
