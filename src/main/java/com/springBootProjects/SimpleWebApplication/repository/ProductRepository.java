package com.springBootProjects.SimpleWebApplication.repository;

import com.springBootProjects.SimpleWebApplication.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
}
