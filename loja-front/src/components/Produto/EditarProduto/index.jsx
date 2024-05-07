import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';
import { useParams } from 'react-router-dom';

const EditarProduto = () => {
    const { id } = useParams();  
    const [produto, setProduto] = useState({
        nome: '',
        descricao: '',
        quantidadeDisponivel: 0,
        valorUnitario: 0,
    });

    useEffect(() => {
        fetchProduto();
    }, [id]); 

    const fetchProduto = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/produtos/${id}`);
            const produtoData = response.data;
            setProduto(produtoData);
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
        }
    };

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
            await axios.put(`http://localhost:8080/produtos/${id}`, produto);
            alert('Produto atualizado com sucesso!');
        } catch (error) {
            console.error('Erro ao atualizar produto:', error);
            alert('Erro ao atualizar produto. Verifique o console para mais detalhes.');
        }
    };

    return (
        <div className="editar-produto-container">
            <h1>Editar Produto</h1>
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
                    <input type="number" id="quantidadeDisponivel" name="quantidadeDisponivel" value={produto.quantidadeDisponivel.toString()} onChange={handleChange} required />
                </div>
                <div>
                    <label htmlFor="valorUnitario">Valor Unitário:</label>
                    <input type="number" id="valorUnitario" name="valorUnitario" value={produto.valorUnitario.toString()} onChange={handleChange} required />
                </div>
                <button type="submit">Atualizar</button>
            </form>
            <button className="btn-voltar" onClick={() => window.location.href = '/produtos'}>
                Voltar para produtos
            </button>
        </div>
    );
};

export default EditarProduto;
