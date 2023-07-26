export interface ErrorMessages {
  tenantNotFound: string
  idNotSent: string
  costNotFound: string
  createCostError: string
  userNotFound: string
  invalidHeader: string
  invalidToken: string
  notAllowed: string
}

export interface SuccessMessages {
  createCost: string
  deleteCost: string
}

export const errorMessages: ErrorMessages = {
  idNotSent: 'id não enviado',
  tenantNotFound: 'Tenant não localizado',
  costNotFound: 'Despesa não localizada!',
  createCostError: 'Erro ao criar despesas',
  userNotFound: 'Usuário ou senha incorreto',
  invalidHeader: 'Cabeçalho de autorização inválido',
  invalidToken: 'Token inválido',
  notAllowed: 'Não autorizado'
};

export const successMessages: SuccessMessages = {
  createCost: 'Despesas criadas!',
  deleteCost: 'Despesa deletada com sucesso!',
};