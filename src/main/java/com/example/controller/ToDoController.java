package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.example.service.ToDoService;
import com.example.demo.ToDo;


import java.util.List;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class ToDoController {

    @Autowired
    private ToDoService service;

    @GetMapping
    public List<ToDo> getAllTodos() {
        return service.getAllTodos();
    }

    @PostMapping
    public ToDo addTodo(@RequestBody ToDo todo) {
        return service.addTodo(todo);
    }

    @PutMapping("/{id}")
    public ToDo updateTodo(@PathVariable String id, @RequestParam boolean completed) {
        return service.updateTodo(id, completed);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable String id) {
        service.deleteTodo(id);
    }
}
