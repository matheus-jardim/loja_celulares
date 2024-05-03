    package com.teste.loja.models;

    import java.math.BigDecimal;
    
    public class Produto {

        private Integer id;
        private String nome;
        private String descricao;
        private Integer quantidadeDisponivel;
        private BigDecimal valorUnitario;

        public Produto() {
        }

        public Produto(Integer id, String nome, String descricao, Integer quantidadeDisponivel, BigDecimal valorUnitario) {
            this.id = id;
            this.nome = nome;
            this.descricao = descricao;
            this.quantidadeDisponivel = quantidadeDisponivel;
            this.valorUnitario = valorUnitario;
        }
    
        public Integer getId() {
            return id;
        }

        public void setId(Integer id) {
            this.id = id;
        }

        public String getNome() {
            return nome;
        }

        public void setNome(String nome) {
            this.nome = nome;
        }

        public String getDescricao() {
            return descricao;
        }

        public void setDescricao(String descricao) {
            this.descricao = descricao;
        }

        public Integer getQuantidadeDisponivel() {
            return quantidadeDisponivel;
        }

        public void setQuantidadeDisponivel(Integer quantidadeDisponivel) {
            this.quantidadeDisponivel = quantidadeDisponivel;
        }

        public BigDecimal getValorUnitario() {
            return valorUnitario;
        }

        public void setValorUnitario(BigDecimal valorUnitario) {
            this.valorUnitario = valorUnitario;
        }

    }
    