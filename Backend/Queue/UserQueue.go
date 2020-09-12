package Queue

import (
	"encoding/json"
	"fmt"
	"github.com/streadway/amqp"
	"secure-messenger/Config"
)

type Msg_body struct {
	Recipient string `json:"recipient"`
	Sender string	 `json:"sender"`
	Message string	 `json:"message"`
}

func CreateUsersQueue(username string) error{
	_, err := Config.Mq.Ch.QueueDeclare(
		username, // name
		true,   // durable
		false,   // delete when unused
		false,   // exclusive
		false,   // no-wait
		nil,     // arguments
	)

	return err
}

func AddMessageToUserQueue(msg Msg_body) error{
	msg_json, err  := json.Marshal(msg)
	if err != nil{
		return err
	}
	fmt.Printf("rec: %v, send:%v", msg.Recipient, msg.Sender)
	fmt.Printf("JSON: %v\n\n\n", msg_json)

	var verify = make(chan amqp.Return)

	Config.Mq.Ch.NotifyReturn(verify)

	err = Config.Mq.Ch.Publish(
		"",     // exchange
		msg.Recipient, // routing key
		false,  // mandatory
		false,  // immediate
		amqp.Publishing {
			ContentType: "application/json",
			Body:  msg_json,
		})


	//select {
	//	case returnNotification := <-verify:
	//		if returnNotification.ReplyCode == amqp.NoRoute {
	//			return fmt.Errorf("no amqp route for %s", recipent)
	//		}
	//}
	return err
}
