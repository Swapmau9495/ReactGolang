package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

func createStudent(c *gin.Context) {
	var student Student
	if err := c.BindJSON(&student); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	eduBackgroundJSON, err := json.Marshal(student.EducationalBackground)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	_, err = db.Exec("INSERT INTO students (first_name, last_name, email, phone_number, educational_background) VALUES (?, ?, ?, ?, ?)",
		student.FirstName, student.LastName, student.Email, student.PhoneNumber, string(eduBackgroundJSON))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusCreated)
}

func getStudents(c *gin.Context) {
	var students []Student

	rows, err := db.Query("SELECT id, first_name, last_name, email, phone_number, educational_background FROM students")
	if err != nil {
		log.Println("Failed to retrieve students:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve students"})
		return
	}
	defer rows.Close()

	for rows.Next() {
		var student Student

		var eduBackgroundJSON string
		err := rows.Scan(&student.ID, &student.FirstName, &student.LastName, &student.Email, &student.PhoneNumber, &eduBackgroundJSON)
		if err != nil {
			log.Println("Failed to scan student row:", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve students"})
			return
		}

		var eduBackground []EducationalBackground
		if err := json.Unmarshal([]byte(eduBackgroundJSON), &eduBackground); err != nil {
			log.Println("Failed to unmarshal educational background:", err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve students"})
			return
		}

		student.EducationalBackground = eduBackground
		students = append(students, student)
	}

	if err := rows.Err(); err != nil {
		log.Println("Error iterating over student rows:", err)
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve students"})
		return
	}

	c.JSON(http.StatusOK, students)
}
