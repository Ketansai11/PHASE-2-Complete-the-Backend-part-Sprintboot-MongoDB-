package com.example.demo;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "todos") // MongoDB Collection name
public class ToDo {

    @Id
    private String id; // Unique identifier for each ToDo
    private String title; // Title or name of the ToDo
    private boolean completed; // Completion status of the ToDo

    // Default constructor
    public ToDo() {}

    // Parameterized constructor
    public ToDo(String title) {
        this.title = title;
        this.completed = false; // Default status is not completed
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    // Overriding toString for debugging/logging
    @Override
    public String toString() {
        return "ToDo{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", completed=" + completed +
                '}';
    }
}
