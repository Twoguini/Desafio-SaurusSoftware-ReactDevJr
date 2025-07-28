import { useEffect, useState } from 'react';

import '../style/login.css'

import GetAplicacoes from '../services/getAplicacoes'
import type { Aplicacao } from '../types/api_Responses';

function formatReferenceName(name: string):string  {
  return name.slice(5);
}

function Login() {
  const [aplicacoes, setAplicacoes] = useState<Aplicacao[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Login";
  }, [])

  useEffect(() => {
    async function fetchApplications() {
      const res = await GetAplicacoes();

      if(res.status_ok) {
        setAplicacoes(res.data as Aplicacao[]);
      } else {
        const erroFormatado = (res.data as Error).message;
        setErro(erroFormatado);
      }
    }

    fetchApplications();
  }, [])

  return(
    <div className="login-background">
      {erro && <p className='erro-message' >{erro}</p>}
      <form className='login-form'>
        
        <label className='aplication-select'>
          <label htmlFor="select_aplication" className='application-SelectionLabel'>Aplicação</label>
          <select name="select_aplication" id="select_aplication">
            {aplicacoes.map((app) => (
              <option key={app.id} value={app.id}>{formatReferenceName(app.nomeReferencia)}</option>
            ))}
          </select>
          <label htmlFor="select_aplication" className="select-arrow">▾</label>
        </label>

        <label className='aplication-select'>
          <label htmlFor="user-id" className='application-SelectionLabel'>Id Usuário</label>
          <input type="text" id="user-id" name="user-id" />
        </label>

        <label className='aplication-select'>
          <input type="text" id="cpf-cnpj" name="cpf-cnpj" placeholder="CNPJ / CPF" />
        </label>

        <div className="checkbox-container">
          <input type="checkbox" id="ambiente" />
          <label htmlFor="ambiente">Ambiente de Produção</label>
        </div>

        <button type="submit">Acessar</button>
      </form>
    </div>
  )
}

export default Login