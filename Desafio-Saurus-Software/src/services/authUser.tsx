import type { UserAuthRes, Api_Response } from '../types/api_Responses'
import { HttpError } from '../types/api_Responses'

export default async function PostUserAuth(applicationId: string, user: string, pass: string): Promise<Api_Response> {
  if( applicationId === null || applicationId === '' || user === null || user === '' || pass === null || pass === '' ) { 
    const FomatingErr = new Error("Verifique os campos");
    return {status_ok: false, status: 400, data: FomatingErr}
  }
  
  // Aplicar máscara para verificação
  
  const userData = {
    aplicacaoId: applicationId,
    usuario: user,
    senha: pass
  }

  try {
    const response = await fetch('https://api-pedido-erp-gateway-prod.saurus.net.br/api/v2/auth', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }, 
      body: JSON.stringify(userData)
    })

    const data = await response.json();

    if(!response.ok) throw new HttpError(`Erro na Autenticação: ${data.title}`, response.status);

    return {status_ok: true, status: response.status, data: data as UserAuthRes}

  } catch(e) {
    console.log(e instanceof HttpError? e.message : 'Internal Server Error');
    const message = e instanceof HttpError? e.message : 'Internal Server Error';
    const status = e instanceof HttpError? e.status : 500;

    return {status_ok: false, status: status, data: new HttpError(message, status)}
  }
}