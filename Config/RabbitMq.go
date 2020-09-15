package Config

import (
	"fmt"
	"github.com/streadway/amqp"
	"os"
)

type MQ struct {
	Conn amqp.Connection
	Ch amqp.Channel
}

var Mq MQ

func BuildMQ()(error){
		err := CreateConnection()
		if err != nil{
			return err
		}
		err = CreateChannel()
		if err != nil{
			return err
		}
		return nil

}

func CreateConnection() error{
	ip_address := os.Getenv("RABBIT_IP")
	if (ip_address == ""){
		ip_address = "127.0.0.1"
	}
	url := fmt.Sprintf("amqp://guest:guest@%s:5672/", ip_address)

	conn, err := amqp.Dial(url)
	fmt.Printf("CONN %v\n\n", conn)
	fmt.Printf("err %v", err)
	if err != nil{
		return err
	}
	Mq.Conn = *conn
	//defer  func() {
	//	err = Mq.Conn.Close()
	//}()

	return  err
}

func CreateChannel() error{
	ch, err := Mq.Conn.Channel()
	if err != nil{
		return err
	}
	Mq.Ch = *ch
	//defer  func() {
	//	err = Mq.Ch.Close()
	//}()
	return err
}
