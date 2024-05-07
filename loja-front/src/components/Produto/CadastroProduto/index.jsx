import React, { useState } from 'react';
import axios from 'axios';
import './style.css'; 

const CadastroProduto = () => {
  const [produto, setProduto] = useState({
    nome: '',
    descricao: '',
    quantidadeDisponivel: '',
    valorUnitario: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduto({ ...produto, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (produto.quantidadeDisponivel <= 0) {
        alert('A quantidade disponível deve ser maior que zero.');
        return;
      }
      const produtoEnviar = Object.fromEntries(
        Object.entries(produto).filter(([_, value]) => value !== '')
      );

      await axios.post('http://localhost:8080/produtos', produtoEnviar);
      alert('Produto cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao cadastrar produto:', error);
      alert('Erro ao cadastrar produto. Verifique o console para mais detalhes.');
    }
  };

  return (
    <div className="cadastro-produto-container">
      <h1>Cadastro de Produto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" name="nome" value={produto.nome} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="descricao">Descrição:</label>
          <textarea id="descricao" name="descricao" value={produto.descricao} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="quantidadeDisponivel">Quantidade Disponível:</label>
          <input type="number" id="quantidadeDisponivel" name="quantidadeDisponivel" value={produto.quantidadeDisponivel} onChange={handleChange} required />
        </div>
        <div>
          <label htmlFor="valorUnitario">Valor Unitário:</label>
          <input type="number" id="valorUnitario" name="valorUnitario" value={produto.valorUnitario} onChange={handleChange} required />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <button className="btn-direcionar" onClick={() => window.location.href = '/produtos'}>
        Ir para produtos
      </button>
    </div>
  );
};

export default CadastroProduto;
