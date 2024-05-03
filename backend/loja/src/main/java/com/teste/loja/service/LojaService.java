package com.teste.loja.service;

import com.teste.loja.models.Produto;
import com.teste.loja.models.Venda;
import com.teste.loja.models.VendaProduto;
import com.teste.loja.repository.ProdutoRepository;
import com.teste.loja.repository.VendaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LojaService {

    private final ProdutoRepository produtoRepository;
    private final VendaRepository vendaRepository;

    public LojaService(ProdutoRepository produtoRepository, VendaRepository vendaRepository) {
        this.produtoRepository = produtoRepository;
        this.vendaRepository = vendaRepository;
    }


    public List<Produto> findAllProdutos() {
        return produtoRepository.findAll();
    }

    public Produto findProdutoById(Integer id) {
        return produtoRepository.findById(id);
    }

    public void saveProduto(Produto produto) {
        produtoRepository.save(produto);
    }

    public void updateProduto(Produto produto) {
        produtoRepository.update(produto);
    }

    public void deleteProduto(Integer id) {
        produtoRepository.delete(id);
    }


    public List<Venda> findAllVendas() {
        return vendaRepository.findAll();
    }

    public Venda findVendaById(Integer id) {
        return vendaRepository.findById(id);
    }

    public void saveVenda(Venda venda) {
        vendaRepository.save(venda);
    }

    public void updateVenda(Venda venda) {
        vendaRepository.update(venda);
    }

    public void deleteVenda(Integer id) {
        vendaRepository.delete(id);
    }

    public void addProdutoAVenda(Venda venda, Produto produto, Integer quantidade) {
        vendaRepository.addProduto(venda, produto, quantidade);
    }

    public void removeProdutoDaVenda(Venda venda, Produto produto) {
        vendaRepository.removeProduto(venda, produto);
    }

    public List<VendaProduto> getProdutosDaVenda(Venda venda) {
        return vendaRepository.getProdutosByVenda(venda);
    }
    

}
