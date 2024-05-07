import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const CadastroVenda = () => {
  const [cliente, setCliente] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [quantidades, setQuantidades] = useState([]);
  const [produtosDisponiveis, setProdutosDisponiveis] = useState([]);
  const [valoresUnitarios, setValoresUnitarios] = useState([]);
  const [valorTotal, setValorTotal] = useState(0);

  useEffect(() => {
    const fetchProdutosDisponiveis = async () => {
      try {
        const response = await axios.get('http://localhost:8080/produtos');
        setProdutosDisponiveis(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProdutosDisponiveis();
  }, []);

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < quantidades.length; i++) {
      total += quantidades[i] * valoresUnitarios[i];
    }
    setValorTotal(total);
  }, [quantidades, valoresUnitarios]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novaVenda = {
      cliente: cliente,
      produtos: produtos,
      quantidades: quantidades,
      valorTotal: valorTotal
    };

    try {
      const response = await axios.post('http://localhost:8080/vendas', novaVenda);
      console.log('Venda cadastrada:', response.data);
      setCliente('');
      setProdutos([]);
      setQuantidades([]);
      setValorTotal(0);
    } catch (error) {
      console.error('Erro ao cadastrar venda:', error);
    }
  };

  const addProduto = () => {
    setProdutos([...produtos, '']);
    setQuantidades([...quantidades, 1]);
    setValoresUnitarios([...valoresUnitarios, 0]);
  };

  const handleProdutoChange = (index, produtoId) => {
    const newProdutos = [...produtos];
    newProdutos[index] = produtoId;
    setProdutos(newProdutos);

    const produtoSelecionado = produtosDisponiveis.find(p => p.id === parseInt(produtoId));
    if (produtoSelecionado) {
      const newValoresUnitarios = [...valoresUnitarios];
      newValoresUnitarios[index] = produtoSelecionado.valorUnitario;
      setValoresUnitarios(newValoresUnitarios);

      let total = 0;
      for (let i = 0; i < quantidades.length; i++) {
        total += quantidades[i] * newValoresUnitarios[i];
      }
      setValorTotal(total);
    }
  };

  const handleQuantidadeChange = (index, quantidade) => {
    if (quantidade < 1) {
      quantidade = 1;
    }
    const newQuantidades = [...quantidades];
    newQuantidades[index] = quantidade;
    setQuantidades(newQuantidades);

    let total = 0;
    for (let i = 0; i < newQuantidades.length; i++) {
      total += newQuantidades[i] * valoresUnitarios[i];
    }
    setValorTotal(total);
  };

  const removeProduto = (index) => {
    const newProdutos = [...produtos];
    newProdutos.splice(index, 1);
    setProdutos(newProdutos);

    const newQuantidades = [...quantidades];
    newQuantidades.splice(index, 1);
    setQuantidades(newQuantidades);

    const newValoresUnitarios = [...valoresUnitarios];
    newValoresUnitarios.splice(index, 1);
    setValoresUnitarios(newValoresUnitarios);

    let total = 0;
    for (let i = 0; i < newQuantidades.length; i++) {
      total += newQuantidades[i] * newValoresUnitarios[i];
    }
    setValorTotal(total);
  };

  return (
    <div className="cadastro-venda-container">
      <h1>Cadastro de Venda</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Cliente:
          <input type="text" value={cliente} onChange={(e) => setCliente(e.target.value)} />
        </label>
        <br />
        {produtos.map((produtoId, index) => (
          <div key={index}>
            <label>
              Produto:
              <select value={produtoId} onChange={(e) => handleProdutoChange(index, e.target.value)}>
                <option value="">Selecione um produto</option>
                {produtosDisponiveis.map((produto) => (
                  <option key={produto.id} value={produto.id}>{produto.nome}</option>
                ))}
              </select>
            </label>
            <label>
              Quantidade:
              <input type="number" value={quantidades[index]} onChange={(e) => handleQuantidadeChange(index, parseInt(e.target.value))} min="1" />
            </label>
            <button type="button" className="btn-remover-produto" onClick={() => removeProduto(index)}>Remover</button>
          </div>
        ))}
        <button type="button" className="btn-adicionar-produto" onClick={addProduto}>Adicionar Produto</button>
        <br />
        <p>Valor Total: R$ {valorTotal.toFixed(2)}</p>
        <button type="submit" className="btn-cadastrar-venda">Cadastrar Venda</button>
      </form>
      <button className="btn-voltar" onClick={() => window.location.href = '/vendas'}>
        Voltar para Vendas
      </button>
    </div>
  );
};

export default CadastroVenda;
