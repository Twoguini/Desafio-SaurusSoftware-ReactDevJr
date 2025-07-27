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
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <div>
        <form className='login-form'>
          <div className='aplication-select'>
            <label htmlFor="select_aplication">Aplicação</label>
            <select name="select_aplication" id="select_aplication">
              {aplicacoes.map((app) => (
                <option key={app.id} value={app.id}>{formatReferenceName(app.nomeReferencia)}</option>
              ))}
            </select>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login