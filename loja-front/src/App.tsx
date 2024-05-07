import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Minha Loja de Celulares</h1>
        <nav>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/produtos">Produtos</a></li>
            <li><a href="/vendas">Vendas</a></li>
          </ul>
        </nav>
      </header>
      <main>
        <h2>Bem-vindo à Minha Loja de Celulares!</h2>
        <p>Gerencie suas vendas e estoque de forma eficiente.</p>
      </main>
      <footer>
        <p>&copy; 2024 Minha Loja de Celulares</p>
      </footer>
    </div>
  );
}

export default App;
