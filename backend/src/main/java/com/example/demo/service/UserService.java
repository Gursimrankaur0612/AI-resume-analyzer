package com.example.demo.service;

import java.util.List;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.LoginRequest;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository repo;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UserRepository repo, BCryptPasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
    }

    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
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
        existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));

        return repo.save(existingUser);
    }

    return null;
}
public String login(LoginRequest request) {

    User user = repo.findByEmail(request.getEmail());

    if (user == null) {
        return "User not found";
    }

    if (passwordEncoder.matches(
            request.getPassword(),
            user.getPassword())) {

        return "Login Successful";
    }

    return "Invalid Password";
}
}