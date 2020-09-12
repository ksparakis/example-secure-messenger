package Controllers

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"secure-messenger/Models"
	"secure-messenger/Queue"
)
//GetUsers ... Get all users
func GetAllUsers(c *gin.Context) {
	var users []Models.User
	Models.GetAllUsers(&users)
	c.JSON(http.StatusOK, users)
}

//CreateUser ... Create User
func CreateUser(c *gin.Context) {
	username := c.Params.ByName("Username")
	pubkey := c.Params.ByName("Public_key")

	var user Models.User
	user.Pubkey = []byte(pubkey)
	user.Username = username

	err := c.BindJSON(&user)

	if err != nil{
		fmt.Println(err)
		c.AbortWithStatus(http.StatusInternalServerError)
	}
	err = Models.CreateUser(&user)
	if err != nil {
		fmt.Println(err)
		c.AbortWithStatus(http.StatusNotFound)
	} else {
		err = Queue.CreateUsersQueue(user.Username)
		if err != nil{
			fmt.Println(err)
			c.AbortWithStatus(http.StatusInternalServerError)
		} else{
			c.JSON(http.StatusOK, user)
		}

	}
}
