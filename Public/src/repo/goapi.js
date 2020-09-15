const axios = require('axios').default;
/**
 * @return {string}
 */
function Get_API_Url(){
    return "http://localhost:8080/"
}

let config={headers:{
        "Access-Control-Allow-Origin": "*",
    }};

module.exports = {
    Get_Users: function (state, draw){
        let url = Get_API_Url() + "users";
        axios.get(url, config)
            .then(resp => {
                //console.log(resp.data);
                state.parse_new_contacts(resp.data);
                draw(state);
            })
            .catch(err => {
                // Handle Error Here
                alert("Error: Login failed restart app");
                console.error(err);
            });
    },

    // POST to /user
    Login_User: function (username, pubkey, run_on_success){

        pubkey = btoa(pubkey.toString());
        const json = JSON.stringify({Username: username, Pubkey: pubkey });
        console.log(json);
        let url = Get_API_Url() + "user";
        console.log(url);
        axios.post(url, json, config)
            .then(resp => {
                console.log(resp.data);
                alert("LOGIN SUCCESSS");
                run_on_success();
            })
            .catch(err => {
                // Handle Error Here
                alert("Error: Login failed");
                console.error(err);
            });
    },

    Send_Message: function (sender, recipient, message, unencMsg, state, draw){
        console.log("Sending message to: "+ recipient);
        const json = JSON.stringify({sender: sender, recipient: recipient, message: message });
        let url = Get_API_Url() + "message";
        axios.post(url, json)
            .then(resp => {
                console.log(resp.data);
                state.add_new_message({sender: sender, recipient: recipient, message: unencMsg}, recipient);
                draw(state)
            })
            .catch(err => {
                // Handle Error Here
                alert("Error: Sending message failed");
                console.error(err);
        });

    },

    Get_Messages: function (state, draw){
        let url = Get_API_Url() + "user/"+state.Username;
        console.log("URL TO HEAVEN "+url)
        axios.get(url, config)
            .then(resp => {
                console.log(resp.data);
                if(resp.data.length > 0){

                    state.parse_new_messages(resp.data);
                    draw(state);
                }
            })
            .catch(err => {
                // Handle Error Here
                //console.error("No new messages");
            });
    },
};

