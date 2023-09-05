export interface ErrorResponse {
  success: false
  error:
    | {
        field: string
        message: string
      }[]
    | string
}
