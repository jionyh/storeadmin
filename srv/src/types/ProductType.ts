export type ProductType = {
  name: string
  category_id: number
  tenant_id: number
}

export type ProductResponse = {
    id: number
    name: string
    category_id: number
    tenant_id: number
    is_deleted: boolean
    cat:{
      name: string
    }
  }