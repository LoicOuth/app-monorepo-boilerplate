import { errors } from '@vinejs/vine'
import { FieldContext, ErrorReporterContract } from '@vinejs/vine/types'

type JsonApiError = {
  message: string
  rule: string
  index?: number
  meta?: Record<string, any>
}

export class JsonApiErrorReporter implements ErrorReporterContract {
  /**
   * A flag to know if one or more errors have been
   * reported
   */
  hasErrors: boolean = false

  /**
   * A collection of errors. Feel free to give accurate types
   * to this property
   */
  errors: Record<string, JsonApiError> = {}

  /**
   * VineJS call the report method
   */
  report(message: string, rule: string, field: FieldContext, meta?: any) {
    const error: JsonApiError = {
      message,
      rule,
    }

    if (meta) {
      error.meta = meta
    }
    if (field.isArrayMember) {
      error.index = field.name as number
    }

    this.hasErrors = true
    this.errors[field.getFieldPath()] = error
  }

  /**
   * Creates and returns an instance of the
   * ValidationError class
   */
  createError() {
    return new errors.E_VALIDATION_ERROR(this.errors)
  }
}
