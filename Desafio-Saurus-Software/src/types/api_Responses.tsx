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
  credenciais: [{
    username: string
    aplicacaoid: string
  }]
}

export type Api_Response = {
  status_ok: boolean
  status: number
  data: Aplicacao[] | HttpError | UserAuthRes | Error
}

export class HttpError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}