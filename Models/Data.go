package Models

import (
	"secure-messenger/Config"
	"github.com/satori/go.uuid"
)

type User struct {
	Username string `json:"Username";gorm:"unique;primaryKey"`
	UUID4 uuid.UUID `json:"UUID4";gorm:"unique";sql:"type:uuid;default:uuid_generate_v4()"`
	Pubkey []byte `json:"Public_Key"`
}

func (d *User) TableName() string{
	return "Users"
}

//GetUsers, get all users and their pub keys
func GetAllUsers(users *[]User) {
 	Config.DB.Find(&users);
}

//CreateUser ... Insert New data
func CreateUser(user *User) (err error) {
	if err = Config.DB.Create(user).Error; err != nil {
		return err
	}
	return nil
}

