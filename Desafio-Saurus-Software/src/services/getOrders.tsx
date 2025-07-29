import type { ListofFatura, Api_Response } from '../types/api_Responses'
import { HttpError } from '../types/api_Responses'

import { getCookie } from '../utils/CookieHandling'

export default async function GetOrders(): Promise<Api_Response> {

  const aplicacaoid = getCookie("applicationId");
  const username = getCookie("username");

  try{
    const response = await fetch('https://api-pedido-erp-gateway-prod.saurus.net.br/api/v2/financeiro/faturas', {
      method: "GET",
      headers: {
        "Content-type": "application/json", 
        "aplicacaoid": aplicacaoid || '',
        "username": username || '',
      },
    });
    const data = await response.json();
    
    if(!response.ok) throw new HttpError(`Erro ao buscar faturas: ${response.statusText}`, response.status);

    return {status_ok: true, status: response.status,  data: data as ListofFatura};
  
  } catch (e) {
    const message = e instanceof HttpError ? e.message : 'Internal Server Error';
    const status = e instanceof HttpError ? e.status : 500;

    return {status_ok: false, status: status, data: new HttpError(message, status)};
  };
}