package Routes

import (
	"github.com/gin-gonic/gin"
	"secure-messenger/Controllers"
)

//SetupRouter ... Configure routes
func SetupRouter() *gin.Engine {
	router := gin.Default()


	router.POST("/user", Controllers.CreateUser)
	router.GET("/users", Controllers.GetAllUsers)
	router.POST("/message", Controllers.SendMessage)

	return router
}