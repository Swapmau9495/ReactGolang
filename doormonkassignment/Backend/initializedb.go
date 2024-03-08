package main

import (
	"log"

	"github.com/jmoiron/sqlx"
	_ "github.com/mattn/go-sqlite3"
)

func initializeDB() {
	var err error
	db, err = sqlx.Open("sqlite3", "./database/sqlite/sqlite.db")
	if err != nil {
		log.Fatalln("Failed to connect to database:", err)
	}

	createStudentsTable()
}

func createStudentsTable() {
	// Create students table if not exists
	_, err := db.Exec(`
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            first_name TEXT,
            last_name TEXT,
            email TEXT,
            phone_number TEXT,
            educational_background TEXT
        );
    `)
	if err != nil {
		log.Fatalln("Failed to create students table:", err)
	}
}
