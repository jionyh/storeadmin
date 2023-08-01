export type CategoryType = {
  name: string
  tenant_id: number
}

export type CategoryResponse = {
    id: number
    name: string
    tenant_id: number
    is_deleted: boolean
  }