package Controllers

import (
	"secure-messenger/Models"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)
//GetUsers ... Get all users
func GetAllUsers(c *gin.Context) {
	var users []Models.User
	Models.GetAllUsers(&users)
	c.JSON(http.StatusOK, users)
}

//CreateUser ... Create User
func CreateUser(c *gin.Context) {
	username := c.Params.ByName("username")
	pubkey := c.Params.ByName("pubkey")

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
		c.JSON(http.StatusOK, user)
	}
}
