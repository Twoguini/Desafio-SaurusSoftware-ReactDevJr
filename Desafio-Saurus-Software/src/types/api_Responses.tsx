export type Aplicacao = {
  id: string
  erp: string
  nomeReferencia: string
  consultaPadrao: string
  consultaPadraoLabel: string
  consultaInicial: boolean
  sincronizacaoBackground: boolean
}

export type Api_Response = {
  status_ok: boolean
  status: number
  data: Aplicacao[] | HttpError_GET
}

export class HttpError_GET extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message);
    this.name = "HttpError_GET";
    this.status = status;
  }
}