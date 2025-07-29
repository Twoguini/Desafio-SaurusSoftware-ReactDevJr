import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import '../style/login.css'

import GetAplicacoes from '../services/getAplicacoes'
import PostUserAuth from '../services/authUser'

import type { Aplicacao } from '../types/api_Responses'

function formatReferenceName(name: string):string  {
  return name.slice(5);
}

function Login() {
  const [aplicacoes, setAplicacoes] = useState<Aplicacao[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  const navigate = useNavigate();

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

  useEffect(() => {
    if(erro != null) {
      const timeout = setTimeout(() => {
        setErro(null);
      }, 25000)

      return () => clearTimeout(timeout);
    }
  }, [erro])

  const loginFormSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const form = event.currentTarget;
    const formData = new FormData(form);

    const applicationId = String(formData.get('select_aplication')?? '').trim();
    const username = String(formData.get('user-id')?? '').trim();
    const password = String(formData.get('password')?? '').trim();

    const res = await PostUserAuth(applicationId, username, password);

    if(res.status_ok) {
      // Login Bem sucedido.
      // Em uma aplicação real, após o login ser bem-sucedido, o servidor geralmente gera um token de sessão (JWT).
      // Esse token é enviado de volta para o cliente, que o armazena (por exemplo, no localStorage ou cookie).
      // A cada requisição futura, o cliente envia esse token como cabeçalho Authorization.
      // O backend verifica o token e, se for inválido ou expirado, o usuário é redirecionado para o login novamente.

      navigate('/orders');
    } else {
      const erroFormatado = (res.data as Error).message;
      setErro(erroFormatado);
    }
  };

  return(
    <div className="login-background">
      {erro && <p className='erro-message' >{erro}</p>}
      <form className='login-form' onSubmit={loginFormSubmitHandler}>
        
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
          <input type="password" id="password" name="password" placeholder="password" />
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