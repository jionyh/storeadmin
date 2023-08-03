export type UnitType = {
  name: string
  abbreviation: string
  tenant_id: number
}

export type UnitResponse = {
    id: number
    name: string
    abbreviation: string
    tenant_id: number
    is_deleted: boolean
  }