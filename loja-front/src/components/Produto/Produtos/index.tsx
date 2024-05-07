import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { Link } from 'react-router-dom'; 
import EditarProduto from '../EditarProduto';
import ConfirmacaoExclusao from '../ConfirmacaoExclusao';

interface Produto {
    id: number;
    nome: string;
    descricao: string;
    quantidadeDisponivel: number;
    valorUnitario: number;
}

const Produtos = () => {
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [modalEditarAberto, setModalEditarAberto] = useState(false);
    const [modalExclusaoAberto, setModalExclusaoAberto] = useState(false);
    const [produtoEditarId, setProdutoEditarId] = useState<number | null>(null);
    const [produtoExcluirId, setProdutoExcluirId] = useState<number | null>(null);

    useEffect(() => {
        fetchProdutos();
    }, []);

    const fetchProdutos = async () => {
        try {
            const response = await axios.get<Produto[]>('http://localhost:8080/produtos');
            setProdutos(response.data);
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    const handleEditar = (id: number) => {
        setProdutoEditarId(id);
        setModalEditarAberto(true);
    };

    const handleExcluir = (id: number) => {
        setProdutoExcluirId(id);
        setModalExclusaoAberto(true);
    };

    const handleConfirmarExclusao = async () => {
        try {
            await axios.delete(`http://localhost:8080/produtos/${produtoExcluirId}`);
            fetchProdutos();
            setModalExclusaoAberto(false);
            alert('Produto excluído com sucesso!');
        } catch (error) {
            console.error('Erro ao excluir produto:', error);
            alert('Erro ao excluir produto. Verifique o console para mais detalhes.');
        }
    };

    const handleCancelarExclusao = () => {
        setProdutoExcluirId(null);
        setModalExclusaoAberto(false);
    };

    return (
        <div className="produto-list-container">
            <h2>Lista de Produtos</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Quantidade Disponível</th>
                        <th>Valor Unitário</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map(produto => (
                        <tr key={produto.id}>
                            <td>{produto.id}</td>
                            <td>{produto.nome}</td>
                            <td>{produto.descricao}</td>
                            <td className='center'>{produto.quantidadeDisponivel}</td>
                            <td className='center'>R$ {produto.valorUnitario.toFixed(2)}</td>
                            <td className='center'>
                                <Link to={`/produtos/${produto.id}/editar`} className="btn-editar" onClick={() => handleEditar(produto.id)}>
                                    Editar
                                </Link>
                                <button className="btn-excluir" onClick={() => handleExcluir(produto.id)}>Excluir</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="buttons-container">
                <button className="btn-direcionar" onClick={() => window.location.href = '/produtos/cadastro'}>
                    Cadastro de produtos
                </button>
                <button className="btn-voltar" onClick={() => window.location.href = '/'}>
                    Voltar para página inicial
                </button>
            </div>

            {modalExclusaoAberto && (
                <ConfirmacaoExclusao
                    onConfirm={handleConfirmarExclusao}
                    onCancel={handleCancelarExclusao}
                />
            )}
        </div>
    );
};

export default Produtos;
