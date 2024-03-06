

package main

import (
	"log"
	"net/http"
	"github.com/gin-gonic/gin"
	"github.com/jmoiron/sqlx"
	"github.com/gorilla/handlers"
	_ "github.com/mattn/go-sqlite3"
)

var db *sqlx.DB


func main() {
	
	var err error
	db, err = sqlx.Open("sqlite3", "./database/sqlite/sqlite.db")
	if err != nil {
		log.Fatalln("Failed to connect to database:", err)
	}

	// Create the students table if it doesn't exist
    _, err = db.Exec(`
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT,
            last_name TEXT,
            email TEXT,
            phone_number TEXT
        );
    `)
    if err != nil {
        log.Fatalln("Failed to create students table:", err)
    }

	router := gin.Default()
	router.POST("/api/students", createStudent)
	router.GET("/api/students", getStudents)
	http.ListenAndServe(":8080",
		handlers.CORS(
			handlers.AllowedOrigins([]string{"*"}),
			handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
			handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
		)(router))
	router.Use(loggerMiddleware)
	router.Run("http://localhost:8080")
	err = router.Run(":8080")
	if err != nil {
		log.Fatalln("Failed to start server:", err)
	}

}

type Student struct {
	ID          int    `json:"id" db:"id"`
	FirstName   string `json:"firstName" db:"first_name"`
	LastName    string `json:"lastName" db:"last_name"`
	Email       string `json:"email" db:"email"`
	PhoneNumber string `json:"phoneNumber" db:"phone_number"`
}


func createStudent(c *gin.Context) {
	var student Student
	if err := c.BindJSON(&student); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	

	_, err := db.Exec("INSERT INTO students (first_name, last_name, email, phone_number) VALUES (?, ?, ?, ?)",
		student.FirstName, student.LastName, student.Email, student.PhoneNumber)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.Status(http.StatusCreated)
}

func getStudents(c *gin.Context) {
	var students []Student
	err := db.Select(&students, "SELECT * FROM students")
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, students)
}

func loggerMiddleware(c *gin.Context) {
	
	// Log request
	log.Println("Request:", c.Request.Method, c.Request.URL.Path)
	c.Next()
	// Log response
	log.Println("Response:", c.Writer.Status())
}

// func corsMiddleware() gin.HandlerFunc {
//     return func(c *gin.Context) {
//         c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
//         c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
//         c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

//         if c.Request.Method == "OPTIONS" {
//             c.AbortWithStatus(204)
//             return
//         }

//         c.Next()
//     }
// }