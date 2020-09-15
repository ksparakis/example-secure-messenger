package Controllers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"secure-messenger/Queue"
)

func SendMessage(c *gin.Context){
	fmt.Println("IS IT HERE?")
	fmt.Printf("PARAMS: %v", c.Params)
	var msg = Queue.Msg_body{}
	sender := c.Params.ByName("sender")
	recipient := c.Params.ByName("recipient")
	message := c.Params.ByName("message")
	fmt.Printf("s: %s, r: %s, m:%s\n\n",sender,recipient,message)
	err := c.BindJSON(&msg)
	fmt.Printf("MSG:%v ", &msg)
	err = Queue.AddMessageToUserQueue(msg)
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
	} else {
		c.JSON(http.StatusOK, "Succesfully sent message")
	}
}

func GetMsgs(c * gin.Context) {
	user := c.Params.ByName("username")
	fmt.Printf("user in %v", user)
	msgs, err := Queue.ConsumeUserQueue(user)

	fmt.Printf("\n\nMSGS %v\n\n", msgs)
	if err != nil {
		c.AbortWithStatus(http.StatusBadRequest)
	} else {
		c.JSON(http.StatusOK, msgs)
	}
}
