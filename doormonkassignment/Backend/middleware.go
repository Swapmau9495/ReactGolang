package main

import (
	"log"

	"github.com/gin-gonic/gin"
)

func loggerMiddleware(c *gin.Context) {
	log.Println("Request:", c.Request.Method, c.Request.URL.Path)
	c.Next()
	log.Println("Response:", c.Writer.Status())
}
