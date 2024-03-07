package main

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
)

func TestCreateStudent(t *testing.T) {
    // Create a new router
    r := gin.Default()

    // Define a route for creating a student
    r.POST("/api/students", func(c *gin.Context) {
        // Write a dummy response
        c.JSON(http.StatusCreated, gin.H{"message": "Student created successfully"})
    })

    // Create a new HTTP request with JSON data
    req, err := http.NewRequest("POST", "/api/students", nil)
    assert.NoError(t, err)

    // Create a new mock response recorder
    w := httptest.NewRecorder()

    // Perform the request
    r.ServeHTTP(w, req)

    // Check the response status code
    assert.Equal(t, http.StatusCreated, w.Code)
}

func TestGetStudents(t *testing.T) {
    // Create a new router
    r := gin.Default()

    // Define a route for getting students
    r.GET("/api/students", func(c *gin.Context) {
        // Write a dummy response
        c.JSON(http.StatusOK, gin.H{"message": "List of students"})
    })

    // Create a new HTTP request for getting students
    req, err := http.NewRequest("GET", "/api/students", nil)
    assert.NoError(t, err)

    // Create a new mock response recorder
    w := httptest.NewRecorder()

    // Perform the request
    r.ServeHTTP(w, req)

    // Check the response status code
    assert.Equal(t, http.StatusOK, w.Code)
}
