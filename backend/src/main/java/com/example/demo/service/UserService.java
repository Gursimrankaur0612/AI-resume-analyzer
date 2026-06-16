package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository repo;

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public User saveUser(User user) {
        return repo.save(user);
    }

    public List<User> getAllUsers() {
        return repo.findAll();
    }
    public User getUserById(Long id) {
        return repo.findById(id).orElse(null);
    }
    public void deleteUser(Long id) {
        repo.deleteById(id);
    }
    public User updateUser(Long id, User updatedUser) {

    User existingUser = repo.findById(id).orElse(null);

    if (existingUser != null) {
        existingUser.setName(updatedUser.getName());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPassword(updatedUser.getPassword());

        return repo.save(existingUser);
    }

    return null;
}
}