package com.teste.loja.repository;

import com.teste.loja.models.Produto;
import com.teste.loja.models.Venda;
import com.teste.loja.models.VendaProduto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class VendaRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Venda> findAll() {
        String sql = "SELECT * FROM vendas";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Venda.class));
    }

    public Venda findById(Integer id) {
        String sql = "SELECT * FROM vendas WHERE id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, new BeanPropertyRowMapper<>(Venda.class));
    }

    public void save(Venda venda) {
        String sql = "INSERT INTO vendas (cliente, valor_total) VALUES (?, ?)";
        jdbcTemplate.update(sql, venda.getCliente(), venda.getValorTotal());
    }

    public void update(Venda venda) {
        String sql = "UPDATE vendas SET cliente = ?, valor_total = ? WHERE id = ?";
        jdbcTemplate.update(sql, venda.getCliente(), venda.getValorTotal(), venda.getId());
    }

    public void delete(Integer id) {
        String sql = "DELETE FROM vendas WHERE id = ?";
        jdbcTemplate.update(sql, id);
    }

    public void addProduto(Venda venda, Produto produto, Integer quantidade) {
        String sql = "INSERT INTO venda_produto (venda_id, produto_id, quantidade) VALUES (?, ?, ?)";
        jdbcTemplate.update(sql, venda.getId(), produto.getId(), quantidade);
    }

    public void removeProduto(Venda venda, Produto produto) {
        String sql = "DELETE FROM venda_produto WHERE venda_id = ? AND produto_id = ?";
        jdbcTemplate.update(sql, venda.getId(), produto.getId());
    }

    public List<VendaProduto> getProdutosByVenda(Venda venda) {
        String sql = "SELECT * FROM venda_produto WHERE venda_id = ?";
        return jdbcTemplate.query(sql, new Object[]{venda.getId()}, new BeanPropertyRowMapper<>(VendaProduto.class));
    }
}
