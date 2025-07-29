import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../style/login.css'

import LoginForm from '../components/LoginForm'
import ErrorMessage from '../components/ErroMessage';

import GetAplicacoes from '../services/getAplicacoes'
import PostUserAuth from '../services/authUser'

import type { Aplicacao, UserAuthRes } from '../types/api_Responses'

import  *  as logInUtils from '../utils/LoginUtils'
import { setCookie } from '../utils/CookieHandling'

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

      // setar um cookie usando a aplicationId para uso posterior.
      setCookie("applicationId", (res.data as UserAuthRes).credenciais[0].aplicacaoid.toString(), 1)
      setCookie("username", (res.data as UserAuthRes).credenciais[0].username.toString(), 1)

      navigate('/orders');
    } else {
      const erroFormatado = (res.data as Error).message;
      setErro(erroFormatado);
    }
  };

  return(
    <div className="login-background">
      {erro && <ErrorMessage message={erro} />}
      <LoginForm 
        aplicacoes={aplicacoes}
        formatReferenceName={logInUtils.formatReferenceName}
        onSubmit={loginFormSubmitHandler}
      />
    </div>
  )
}

export default Login