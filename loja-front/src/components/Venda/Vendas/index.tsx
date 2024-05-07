import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import './style.css';

const Vendas: React.FC = () => {
  const [vendas, setVendas] = useState<any[]>([]);

  useEffect(() => {
    const fetchVendas = async () => {
      try {
        const response = await axios.get('http://localhost:8080/vendas');
        setVendas(response.data);
      } catch (error) {
        console.error('Erro ao buscar vendas:', error);
      }
    };

    fetchVendas();
  }, []);

  return (
    <div className="vendas-container">
      <h2>Vendas</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>Valor Total</th>
          </tr>
        </thead>
        <tbody>
          {vendas.map((venda) => (
            <tr key={venda.id}>
              <td>{venda.id}</td>
              <td>{venda.cliente}</td>
              <td>R$ {venda.valorTotal.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="buttons-container">
        <Link to="/vendas/cadastro" className="btn-cadastrar-venda">
          Cadastrar Nova Venda
        </Link>
        <Link to="/" className="btn-voltar">
          Voltar para Página Inicial
        </Link>
      </div>
    </div>
  );
}

export default Vendas;
