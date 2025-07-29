import Header from "../components/Header"
import { useState, useEffect } from "react"

import '../style/Orders.css'

import type { ListofFatura } from '../types/api_Responses'

import GetOrders from '../services/getOrders'

export default function Orders() {
  const [faturas, setFaturas] = useState<ListofFatura | null>(null);
    const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {document.title="Pedidos"}, [])

  useEffect(() => {
    async function fetchFaturas() {
      const res = await GetOrders();

      if(res.status_ok) {
        setFaturas(res.data as ListofFatura);
        } else {
          const erroFormatado = (res.data as Error).message;
          setErro(erroFormatado);
        }
    }

    fetchFaturas();
  }, [])

  return(
    <div>
      <Header pageTitle="Pedidos" />
      
      <div className="table-container">
        <table className="orders-table">
          <thead>
            <tr>
              <th><input type="checkbox" name="orderSelection" id="orderSelection" /></th>
              <th> Pedidos </th>
              <th> Preço R$ </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input type="checkbox" name="orderSelection" id="orderSelection" /></td>
              <td>Todos</td>
              <td>Total</td>
            </tr>
            {faturas?.list.map((fatura, index) => (
              <tr key={index}>
                <td><input type="checkbox" /></td>
                <td>{fatura.numeroFatura} - {fatura.historico}</td>
                <td>R${fatura.valorFatura.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}