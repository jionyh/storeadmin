export interface ErrorMessages {
  tenantNotFound: string
  idNotSent: string
  costNotFound: string
  createCostError: string
  userNotFound: string
  invalidHeader: string
  invalidToken: string
  notAllowed: string
  saleNotfound: string
  createSaleError: string
  categoryNotFound: string
  createCategoryError: string
}

export interface SuccessMessages {
  createCost: string
  deleteCost: string
}


export const errorMessages: ErrorMessages = {
  /* Generic */
  idNotSent: 'id não enviado',
  tenantNotFound: 'Tenant não localizado',
  /* CostController */
  costNotFound: 'Despesa não localizada!',
  createCostError: 'Erro ao criar despesas',
  /* SaleController */
  saleNotfound: 'Venda não localizada!',
  createSaleError: 'Erro ao criar vendas',
  /* CategoryController */
  categoryNotFound: "Categoria não localizada",
  createCategoryError: "Erro ao criar categoria",
  /* AuthController */
  userNotFound: 'Usuário ou senha incorreto',
  invalidHeader: 'Cabeçalho de autorização inválido',
  invalidToken: 'Token inválido',
  notAllowed: 'Não autorizado'
};

export const successMessages: SuccessMessages = {
  createCost: 'Despesas criadas!',
  deleteCost: 'Despesa deletada com sucesso!',
};