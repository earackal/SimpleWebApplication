package com.springBootProjects.SimpleWebApplication.service;

import com.springBootProjects.SimpleWebApplication.exception.UserNotLoggedInException;
import com.springBootProjects.SimpleWebApplication.model.Product;
import com.springBootProjects.SimpleWebApplication.model.User;
import com.springBootProjects.SimpleWebApplication.repository.ProductRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.AccessDeniedException;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private UserService userService;

    public List<Product> getProducts(){
        return productRepository.findAll();
    }

    public Product getProductById(int id) {
        return productRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Produkt wurde nicht gefunden"));
    }


    public Product addProduct(Product product) {
        User currentUser = userService.getAuthenticatedUser();
        product.setUser(currentUser);
        return productRepository.save(product);
    }


    public Product updateProduct(int id, Product product) {
        Product existingProduct = getProductById(id);

        // check if user posted the product in the first place
        User currentUser = userService.getAuthenticatedUser();

        if(existingProduct.getUser().getId() != currentUser.getId()){
            throw new UserNotLoggedInException("Sie sind nicht der Besitzer dieses Produkts");
        }
        return productRepository.save(product);
    }

    public Product deleteProduct(int id) {
        Product existingProduct = getProductById(id);
        // check if user posted the product in the first place
        User currentUser = userService.getAuthenticatedUser();
        if(existingProduct.getUser().getId() != currentUser.getId()){
            throw new UserNotLoggedInException("Sie sind nicht der Besitzer dieses Produkts");
        }
        productRepository.deleteById(id);
        return existingProduct;
    }

}
