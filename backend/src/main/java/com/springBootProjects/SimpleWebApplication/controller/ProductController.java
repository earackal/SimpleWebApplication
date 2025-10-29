package com.springBootProjects.SimpleWebApplication.controller;

import com.springBootProjects.SimpleWebApplication.model.Product;
import com.springBootProjects.SimpleWebApplication.model.User;
import com.springBootProjects.SimpleWebApplication.repository.UserRepository;
import com.springBootProjects.SimpleWebApplication.service.ProductService;
import com.springBootProjects.SimpleWebApplication.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProducts() {
        return new ResponseEntity<>(productService.getProducts(), HttpStatus.OK);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<?> getProductById(@PathVariable int id){
        System.out.println(id);
        Product product = productService.getProductById(id);
        System.out.println(product.getId());
        return new ResponseEntity<> (product, HttpStatus.OK);
    }

    @PostMapping("/product")
    public ResponseEntity<?> addProduct(@RequestBody Product product){
        Product addedProduct = productService.addProduct(product);
        return new ResponseEntity<>(addedProduct, HttpStatus.OK);
    }

    @PutMapping("/product/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable int id, @RequestBody Product product) {
        Product updatedProduct = productService.updateProduct(id, product);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable int id){
        Product product = productService.deleteProduct(id);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }
}