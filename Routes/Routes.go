package Routes

import (
	"secure-messenger/Controllers"
	"github.com/gin-gonic/gin"
)

//SetupRouter ... Configure routes
func SetupRouter() *gin.Engine {
	router := gin.Default()


	router.POST("/user", Controllers.CreateUser)
	router.GET("/users", Controllers.GetAllUsers)
	router.POST("/message", Controllers.SendMessage)

	return router
}