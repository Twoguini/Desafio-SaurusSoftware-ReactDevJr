export type Aplicacao = {
  id: string
  erp: string
  nomeReferencia: string
  consultaPadrao: string
  consultaPadraoLabel: string
  consultaInicial: boolean
  sincronizacaoBackground: boolean
}

export type UserAuthRes = {
  credenciais: {
    username: string
    aplicacaoid: string
  }[]
}

export type ListofFatura = {
  list: Fatura[]
}

export type Fatura = {
  numeroFatura: string
  historico: string
  valorFatura: number
  pagamentoParcial: boolean
  pessoa: {
    cpfCnpj: string
    codigo: number
    nome: string
  }
  pagamento: {
    nome: string
    tipoPagamento: number
    numeroParcelas: number
  }[]
  origem: 
    {
      origem: string
      numero: string
      infAdic: string
    }[]
}

export type Api_Response = {
  status_ok: boolean
  status: number
  data: Aplicacao[] | HttpError | UserAuthRes | Error | ListofFatura
}

export class HttpError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}