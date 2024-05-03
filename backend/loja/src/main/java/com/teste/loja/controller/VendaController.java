package com.teste.loja.controller;

import com.teste.loja.models.Produto;
import com.teste.loja.models.Venda;
import com.teste.loja.models.VendaProduto;
import com.teste.loja.service.LojaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@RequestMapping("/vendas")
@CrossOrigin(origins = "http://localhost:3000") 
public class VendaController {

    @Autowired
    private LojaService lojaService;

    @GetMapping
    public ResponseEntity<List<Venda>> getAllVendas() {
        List<Venda> vendas = lojaService.findAllVendas();
        return new ResponseEntity<>(vendas, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Venda> getVendaById(@PathVariable Integer id) {
        Venda venda = lojaService.findVendaById(id);
        return new ResponseEntity<>(venda, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Void> saveVenda(@RequestBody Venda venda) {
        lojaService.saveVenda(venda);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateVenda(@PathVariable Integer id, @RequestBody Venda venda) {
        venda.setId(id);
        lojaService.updateVenda(venda);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVenda(@PathVariable Integer id) {
        lojaService.deleteVenda(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/{idVenda}/produtos/{idProduto}/quantidade/{quantidade}")
    public ResponseEntity<Void> addProdutoAVenda(@PathVariable Integer idVenda, @PathVariable Integer idProduto, @PathVariable Integer quantidade) {
        Produto produto = lojaService.findProdutoById(idProduto);
        Venda venda = lojaService.findVendaById(idVenda);
        lojaService.addProdutoAVenda(venda, produto, quantidade);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{idVenda}/produtos/{idProduto}")
    public ResponseEntity<Void> removeProdutoDaVenda(@PathVariable Integer idVenda, @PathVariable Integer idProduto) {
        Produto produto = lojaService.findProdutoById(idProduto);
        Venda venda = lojaService.findVendaById(idVenda);
        lojaService.removeProdutoDaVenda(venda, produto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{idVenda}/produtos")
    public ResponseEntity<List<VendaProduto>> getProdutosDaVenda(@PathVariable Integer idVenda) {
        Venda venda = lojaService.findVendaById(idVenda);
        List<VendaProduto> produtosDaVenda = lojaService.getProdutosDaVenda(venda);
        return new ResponseEntity<>(produtosDaVenda, HttpStatus.OK);
    }
}
