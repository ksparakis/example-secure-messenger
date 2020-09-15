package Queue

import (
	"encoding/json"
	"fmt"
	"github.com/streadway/amqp"
	"secure-messenger/Config"
	"time"
)

type Msg_body struct {
	Recipient string `json:"recipient"`
	Sender string	 `json:"sender"`
	Message string	 `json:"message"`
}

func CreateUsersQueue(username string) error{
	fmt.Printf("USER QUEUE BEING CREATED %v\n\n\n\n", username)
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

func ConsumeUserQueue(username string) ([]Msg_body, error){
	msgs, err := Config.Mq.Ch.Consume(
		username, // queue
		"",     // consumer
		true,   // auto-ack
		false,  // exclusive
		false,  // no-local
		false,  // no-wait
		nil,    // args
	)
	if err!= nil{
		return nil, err
	}

	msgCount :=0
	rec := []Msg_body{}
	go func() {
		for d := range msgs {
			msgCount++
			fmt.Printf("\nMessage Count: %v, Message Body: %v\n",msgCount, d.Body)
			var rec_msg Msg_body
			err := json.Unmarshal(d.Body, &rec_msg)
			if err != nil{
				fmt.Printf("ERROR PARSING: %v", err)
			}
			rec = append(rec, rec_msg)
		}

	}()

	select {

	case <-time.After(time.Millisecond * 100):

		fmt.Printf("Total Messages Fetched: %d\n",msgCount)

		fmt.Println("No more messages in queue. Timing out...")

	}

	return rec, nil
}

func AddMessageToUserQueue(msg Msg_body) error{
	msg_json, err  := json.Marshal(msg)
	if err != nil{
		fmt.Printf("FAILED HERE: %v", err)
		return err
	}
	fmt.Printf("rec: %v, send:%v\n\n", msg.Recipient, msg.Sender)
	fmt.Printf("JSON: %v\n\n\n", msg_json)


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
