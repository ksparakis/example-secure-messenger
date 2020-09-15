package Models

import (
	"gorm.io/gorm"
	"secure-messenger/Config"
)

type User struct {
	Username string `json:"Username";gorm:"unique;primaryKey"`
	Pubkey []byte `json:"Pubkey"`
}

func (d *User) TableName() string{
	return "Users"
}

//GetUsers, get all users and their pub keys
func GetAllUsers(users *[]User) {
 	Config.DB.Find(&users);
}

//CreateUser ... Insert New data or update for simplicity sake
func CreateUser(user *User) (err error) {
	// Update public key or create the user
	if err := Config.DB.Model(&user).Where(
		"Username = ?", user.Username).Update(
		"PubKey", user.Pubkey).Error; err != nil {
		// always handle error like this, cause errors maybe happened when connection failed or something.
		// record not found...
		if err == gorm.ErrRecordNotFound{
			Config.DB.Create(&user) // create new record from newUser
		}
	}
	if err = Config.DB.Create(user).Error; err != nil {
		return err
	}
	return nil
}

