package com.springBootProjects.SimpleWebApplication.service;

import com.springBootProjects.SimpleWebApplication.model.Product;
import com.springBootProjects.SimpleWebApplication.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getProducts(){
        return productRepository.findAll();
    }

    public Product getProductById(int id){
        return productRepository.findById(id).orElse(null);
    }



    public Product addProduct(Product product, MultipartFile imageFile) throws IOException {
        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        product.setImageData(imageFile.getBytes());

        return productRepository.save(product);
    }

    public Product updateProduct(int id, Product product, MultipartFile imageFile) throws IOException {
        // 1. Check whether id is correct
        // 2. Check whether an entry with the provided id exists
        // If not, don't insert it.
        Product p = this.getProductById(id);
        if (product.getId() != id || p == null) {
            return null;
        }

        product.setImageName(imageFile.getOriginalFilename());
        product.setImageType(imageFile.getContentType());
        product.setImageData(imageFile.getBytes());

        return productRepository.save(product);
    }

    public Product deleteProduct(int id) {
        Product p = this.getProductById(id);
        productRepository.deleteById(id);
        return p;
    }

}
