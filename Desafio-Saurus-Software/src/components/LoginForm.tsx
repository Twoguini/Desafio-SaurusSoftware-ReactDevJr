import type { Aplicacao } from "../types/api_Responses";

interface LoginFormProps {
  aplicacoes: Aplicacao[];
  formatReferenceName: (name: string) => string;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void; 
}

export default function LoginForm({ aplicacoes, formatReferenceName, onSubmit }: LoginFormProps) {
  return(
    <form className='login-form' onSubmit={onSubmit}>
        
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
  )
}