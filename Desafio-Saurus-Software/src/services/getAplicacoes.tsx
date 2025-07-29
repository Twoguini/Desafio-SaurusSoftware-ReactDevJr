import type { Aplicacao, Api_Response } from '../types/api_Responses'
import { HttpError } from '../types/api_Responses'

export default async function GetAplicacoes(): Promise<Api_Response> {
  try{
    const response = await fetch('https://api-pedido-erp-gateway-prod.saurus.net.br/api/v2/aplicacoes', {
      method: "GET",
      headers: {
        "Content-type": "application/json", 
      },
    });
    const data = await response.json();
    
    if(!response.ok) throw new HttpError(`Erro ao buscar aplicações: ${response.statusText}`, response.status);

    return {status_ok: true, status: response.status,  data: data as Aplicacao[]}; 
  
  } catch (e) {
    const message = e instanceof HttpError ? e.message : 'Internal Server Error';
    const status = e instanceof HttpError ? e.status : 500;

    return {status_ok: false, status: status, data: new HttpError(message, status)};
  };
}