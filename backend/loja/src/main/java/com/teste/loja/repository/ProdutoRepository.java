package com.teste.loja.repository;

import com.teste.loja.models.Produto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProdutoRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Produto> findAll() {
        String sql = "SELECT * FROM produtos";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Produto.class));
    }

    public Produto findById(Integer id) {
        String sql = "SELECT * FROM produtos WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, new BeanPropertyRowMapper<>(Produto.class));
    }

    public void save(Produto produto) {
        String sql = "INSERT INTO produtos (nome, descricao, quantidade_disponivel, valor_unitario) VALUES (?, ?, ?, ?)";
        jdbcTemplate.update(sql, produto.getNome(), produto.getDescricao(), produto.getQuantidadeDisponivel(), produto.getValorUnitario());
    }

    public void update(Produto produto) {
        String sql = "UPDATE produtos SET nome = ?, descricao = ?, quantidade_disponivel = ?, valor_unitario = ? WHERE id = ?";
        jdbcTemplate.update(sql, produto.getNome(), produto.getDescricao(), produto.getQuantidadeDisponivel(), produto.getValorUnitario(), produto.getId());
    }

    public void delete(Integer id) {
        String sql = "DELETE FROM produtos WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }
}
