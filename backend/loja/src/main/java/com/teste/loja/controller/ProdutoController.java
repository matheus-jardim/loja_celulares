package com.teste.loja.controller;

import com.teste.loja.models.Produto;
import com.teste.loja.service.LojaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@RestController
@RequestMapping("/produtos")
@CrossOrigin(origins = "http://localhost:3000") 
public class ProdutoController {

    @Autowired
    private LojaService lojaService;

    @GetMapping
    public ResponseEntity<List<Produto>> getAllProdutos() {
        List<Produto> produtos = lojaService.findAllProdutos();
        return new ResponseEntity<>(produtos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Produto> getProdutoById(@PathVariable Integer id) {
        Produto produto = lojaService.findProdutoById(id);
        return new ResponseEntity<>(produto, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Void> saveProduto(@RequestBody Produto produto) {
        lojaService.saveProduto(produto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateProduto(@PathVariable Integer id, @RequestBody Produto produto) {
        produto.setId(id);
        lojaService.updateProduto(produto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduto(@PathVariable Integer id) {
        lojaService.deleteProduto(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
