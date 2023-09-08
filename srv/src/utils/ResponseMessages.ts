export enum ErrorMessages {
  tenantNotFound = "Tenant não localizado",
  idNotSent = "id não enviado",
  costNotFound = "Despesa não localizada!",
  createCostError = "Erro ao criar despesas",
  userNotFound = "Usuário ou senha incorreto",
  invalidHeader = "Cabeçalho de autorização inválido",
  invalidToken = "Token inválido",
  notAllowed = "Não autorizado",
  saleNotfound = "Venda não localizada!",
  createSaleError = "Erro ao criar vendas",
  categoryNotFound = "Categoria não localizada",
  createCategoryError = "Erro ao criar categoria",
  categoryAlreadyExist = "Categoria já existente",
  unitNotFound = "Unidade não localizada",
  paymentNotFound = "Método de pagamento não localizado",
  createUnitError = "Erro ao criar unidade",
  unitAlreadyExist = "Unidade já existente",
  productNotFound = "Produto não localizado",
  createProductError = "Erro ao criar produto",
  productAlreadyExist = "Produto já existente",
  purchaseNotfound = "Compra não localizada!",
  createPurchaseError = "Erro ao criar compras",
}

export interface SuccessMessages {
  createCost: string;
  deleteCost: string;
}

export const successMessages: SuccessMessages = {
  createCost: "Despesas criadas!",
  deleteCost: "Despesa deletada com sucesso!",
};
