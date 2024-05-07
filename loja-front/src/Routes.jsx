import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CadastroProduto from './components/Produto/CadastroProduto';
import CadastroVenda from './components/Venda/CadastroVenda';
import Vendas from './components/Venda/Vendas';
import App from './App';
import Produtos from './components/Produto/Produtos';
import EditarProduto from './components/Produto/EditarProduto';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/produtos" element={<Produtos />} />
        <Route path="/produtos/cadastro" element={<CadastroProduto />} />
        <Route path="/vendas" element={<Vendas />} />
        <Route path="/vendas/cadastro" element={<CadastroVenda />} />
        <Route path="/produtos/:id/editar" element={<EditarProduto />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
