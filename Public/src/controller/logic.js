var crypto = require("../util/rsa-util");
var api = require("../repo/goapi");
var State = require("../repo/state");
module.exports = {
    SendMessage: function(state, msg, draw){
        enc_msg = crypto.encrypt_msg(msg, state.get_contacts()[state.get_current()]);
        api.Send_Message(state.get_username(), state.get_current(), enc_msg, msg, state, draw)
    },

    Logout: function(state){
        // Delete all data
        state = new State()
        // load back login screen
    },

    PollUsersList: function (state, callback){
        function refresh() {
            if (state.Username) {
                api.Get_Users(state, callback);
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
            setTimeout(refresh, 10000);
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
        api.Login_User(state.Username, state.Public_key, callback);

    },

};

