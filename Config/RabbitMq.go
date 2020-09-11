package Config

import "github.com/streadway/amqp"

type MQ struct {
	Conn *amqp.Connection
	Ch *amqp.Channel
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
	conn, err := amqp.Dial("amqp://guest:guest@localhost:5672/")
	Mq.Conn = conn
	defer conn.Close()
	return  err
}

func CreateChannel() error{
	ch, err := Mq.Conn.Channel()
	Mq.Ch = ch
	defer ch.Close()
	return err
}
