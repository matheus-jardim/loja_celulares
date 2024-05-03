package com.teste.loja.models;


import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class Venda {

    private Integer id;
    private String cliente;
    private BigDecimal valorTotal;
    private List<VendaProduto> itens = new ArrayList<>();

    public Venda() {
    }

    public Venda(Integer id, String cliente, BigDecimal valorTotal) {
        this.id = id;
        this.cliente = cliente;
        this.valorTotal = valorTotal;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCliente() {
        return cliente;
    }

    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public BigDecimal getValorTotal() {
        return valorTotal;
    }

    public void setValorTotal(BigDecimal valorTotal) {
        this.valorTotal = valorTotal;
    }

    public List<VendaProduto> getItens() {
        return itens;
    }

    public void setItens(List<VendaProduto> itens) {
        this.itens = itens;
    }
}
