package main

import (
	"fmt"
	"secure-messenger/Config"
	"secure-messenger/Models"
	"secure-messenger/Routes"
)
var err error

func main() {

	//Builds the database
	err := Config.BuildDB()
	if err != nil {
		fmt.Println("Status:", err)
	}

	//Builds an instance of Rabbit MQ
	err = Config.BuildMQ()
	if err != nil {
		fmt.Println("Status:", err)
	}

	err = Config.DB.AutoMigrate(&Models.User{})
	if err != nil {
		fmt.Println("Status:", err)
	}

	r := Routes.SetupRouter()
	//running
	err = r.Run()

	if err != nil {
		fmt.Println("Status:", err)
	}
}