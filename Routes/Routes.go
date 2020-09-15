package Routes

import (
	"github.com/gin-gonic/gin"
	"secure-messenger/Controllers"
	"github.com/gin-contrib/static"
)

//SetupRouter ... Configure routes
func SetupRouter() *gin.Engine {
	router := gin.Default()

	router.Use(static.Serve("/", static.LocalFile("./Public", false)))
	router.POST("/user", Controllers.CreateUser)
	router.GET("/user/:username", Controllers.GetMsgs)
	router.GET("/users", Controllers.GetAllUsers)
	router.POST("/message", Controllers.SendMessage)

	return router
}