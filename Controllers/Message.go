package Controllers

import (
	"github.com/gin-gonic/gin"
	"net/http"
	"secure-messenger/Queue"
)

func SendMessage(c *gin.Context){
	username := c.Params.ByName("username")
	message := c.Params.ByName("message")
	err := Queue.AddMessageToUserQueue(username, message)
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
	} else {
		c.JSON(http.StatusOK, username)
	}
}
