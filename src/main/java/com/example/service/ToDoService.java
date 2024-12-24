package com.example.service;
import com.example.demo.ToDo;
import com.example.repository.ToDoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ToDoService {

    @Autowired
    private ToDoRepository repository;

    public List<ToDo> getAllTodos() {
        return repository.findAll();
    }

    public ToDo addTodo(ToDo todo) {
        return repository.save(todo);
    }

    public ToDo updateTodo(String id, boolean completed) {
        ToDo todo = repository.findById(id).orElseThrow(() -> new RuntimeException("Todo not found"));
        todo.setCompleted(completed);
        return repository.save(todo);
    }

    public void deleteTodo(String id) {
        repository.deleteById(id);
    }
}
