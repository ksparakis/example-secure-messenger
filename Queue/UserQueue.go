package Queue

import (
	"github.com/streadway/amqp"
	"secure-messenger/Config"
)

func CreateUsersQueue(username string) error{
	_, err := Config.Mq.Ch.QueueDeclare(
		username, // name
		false,   // durable
		false,   // delete when unused
		false,   // exclusive
		false,   // no-wait
		nil,     // arguments
	)

	return err
}

func AddMessageToUserQueue(username string, message string) error{

	err := Config.Mq.Ch.Publish(
		"",     // exchange
		username, // routing key
		false,  // mandatory
		false,  // immediate
		amqp.Publishing {
			ContentType: "text/plain",
			Body:        []byte(message),
		})
	return err
}
