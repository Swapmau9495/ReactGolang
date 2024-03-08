package main

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/gorilla/handlers"
	"github.com/jmoiron/sqlx"
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
	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS students (
			id INTEGER PRIMARY KEY AUTOINCREMENT,
			first_name TEXT,
			last_name TEXT,
			email TEXT,
			phone_number TEXT,
			educational_background TEXT
		);`)
	if err != nil {
		log.Fatalln("Failed to create students table:", err)
	}

	router := setupRouter()
	http.ListenAndServe(":8080",
		handlers.CORS(
			handlers.AllowedOrigins([]string{"*"}),
			handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
			handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
		)(router))
}

func setupRouter() *gin.Engine {
	router := gin.Default()
	router.POST("/api/students", createStudent)
	router.GET("/api/students", getStudents)
	router.Use(loggerMiddleware)
	return router
}


// non-modulraized code backup

// package main

// import (
// 	"encoding/json"
// 	"log"
// 	"net/http"

// 	"github.com/gin-gonic/gin"
// 	"github.com/gorilla/handlers"
// 	"github.com/jmoiron/sqlx"
// 	_ "github.com/mattn/go-sqlite3"
// )

// var db *sqlx.DB

// func main() {

// 	var err error
// 	db, err = sqlx.Open("sqlite3", "./database/sqlite/sqlite.db")
// 	if err != nil {
// 		log.Fatalln("Failed to connect to database:", err)
// 	}

// 	// Create the students table if it doesn't exist
// 	_, err = db.Exec(`
//         CREATE TABLE IF NOT EXISTS students (
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             first_name TEXT,
//             last_name TEXT,
//             email TEXT,
//             phone_number TEXT,
//             educational_background TEXT
//         );
//     `)
// 	if err != nil {
// 		log.Fatalln("Failed to create students table:", err)
// 	}

// 	router := gin.Default()
// 	router.POST("/api/students", createStudent)
// 	router.GET("/api/students", getStudents)
// 	http.ListenAndServe(":8080",
// 		handlers.CORS(
// 			handlers.AllowedOrigins([]string{"*"}),
// 			handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
// 			handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
// 		)(router))
// 	router.Use(loggerMiddleware)
// 	err = router.Run(":8080")
// 	if err != nil {
// 		log.Fatalln("Failed to start server:", err)
// 	}

// }

// type Student struct {
// 	ID                    int                    `json:"id" db:"id"`
// 	FirstName             string                 `json:"firstName" db:"first_name"`
// 	LastName              string                 `json:"lastName" db:"last_name"`
// 	Email                 string                 `json:"email" db:"email"`
// 	PhoneNumber           string                 `json:"phoneNumber" db:"phone_number"`
// 	EducationalBackground []EducationalBackground `json:"educationalBackground" db:"educational_background"`
// }

// type EducationalBackground struct {
// 	InstitutionName string `json:"institutionName" db:"institution_name"`
// 	PassOutYear     int    `json:"passOutYear" db:"passOutYear"`
// 	CgpiScore       float64 `json:"cgpiScore" db:"cgpi_score"`
// }

// func createStudent(c *gin.Context) {
//     var student Student
//     if err := c.BindJSON(&student); err != nil {
//         c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
//         return
//     }

//     // Convert EducationalBackground slice to JSON string
//     eduBackgroundJSON, err := json.Marshal(student.EducationalBackground)
//     if err != nil {
//         c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
//         return
//     }

//     // Insert data into the database
//     _, err = db.Exec("INSERT INTO students (first_name, last_name, email, phone_number, educational_background) VALUES (?, ?, ?, ?, ?)",
//         student.FirstName, student.LastName, student.Email, student.PhoneNumber, string(eduBackgroundJSON))
//     if err != nil {
//         c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
//         return
//     }

//     c.Status(http.StatusCreated)
// }


// func getStudents(c *gin.Context) {
// 	var students []Student

// 	// Query the database to retrieve student records
// 	rows, err := db.Query("SELECT id, first_name, last_name, email, phone_number, educational_background FROM students")
// 	if err != nil {
// 		log.Println("Failed to retrieve students:", err)
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve students"})
// 		return
// 	}
// 	defer rows.Close()

// 	// Iterate over each row returned by the query
// 	for rows.Next() {
// 		var student Student

// 		// Scan the values from the row into the Student struct
// 		var eduBackgroundJSON string
// 		err := rows.Scan(&student.ID, &student.FirstName, &student.LastName, &student.Email, &student.PhoneNumber, &eduBackgroundJSON)
// 		if err != nil {
// 			log.Println("Failed to scan student row:", err)
// 			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve students"})
// 			return
// 		}

		
// 		var eduBackground []EducationalBackground
// 		if err := json.Unmarshal([]byte(eduBackgroundJSON), &eduBackground); err != nil {
// 			log.Println("Failed to unmarshal educational background:", err)
// 			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve students"})
// 			return
// 		}

		
// 		student.EducationalBackground = eduBackground

// 		// Append the student to the slice of students
// 		students = append(students, student)
// 	}

// 	// Check for any errors encountered while iterating over the rows
// 	if err := rows.Err(); err != nil {
// 		log.Println("Error iterating over student rows:", err)
// 		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to retrieve students"})
// 		return
// 	}


// 	c.JSON(http.StatusOK, students)
// }



// func loggerMiddleware(c *gin.Context) {
// 	// Log request
// 	log.Println("Request:", c.Request.Method, c.Request.URL.Path)
// 	c.Next()
// 	// Log response
// 	log.Println("Response:", c.Writer.Status())
// }


