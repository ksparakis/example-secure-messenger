var crypto = require("../util/rsa-util");
var api = require("../repo/goapi");
var State = require("../repo/state");
module.exports = {
    SendMessage: function(state, msg){
        enc_msg = crypto.encrypt_msg(msg, state.Contacts[state.Current]);
        api.Send_Message(state.Username, state.Current, enc_msg)
    },

    Logout: function(state){
        // Delete all data
        state = new State()
        // load back login screen
    },

    PollUsersList: function (state, callback){
        function refresh() {
            if (state.Username) {
                api.Get_Users(callback);
                setTimeout(refresh, 5000);
            }
            // ...
        }
        // initial call, or just call refresh directly
        setTimeout(refresh, 5000);
    },

    ListenForMessages: function(state, callback) {
            // listen to rabbit mq
            function refresh() {
                if (state.Username){
                    api.Get_Messages(state, callback);
                    setTimeout(refresh, 5000);
                }
            }
            // initial call, or just call refresh directly
            setTimeout(refresh, 5000);
     },

    on_message: function (message) {
        console.log(message);
        api.Send_Message();
    },

    Login: function (state, username, callback) {
        // Set username
        state.set_username(username);
        console.log("user " + state.Username);

        // create Key pair
        keys = crypto.create_key_pair();
        state.set_private_key(keys.exportKey('private'));
        state.set_public_key(keys.exportKey('public'));
        console.log(state.Private_key);
        console.log(state.Public_key);


        // api call to login

        //api.Login_User(state.Username, state.Public_key, callback);

    },

};

