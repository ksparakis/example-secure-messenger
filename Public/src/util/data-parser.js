
module.exports = {
    parse_new_msgs:
        function (new_msgs, state){
            for(let i=0; i< new_msgs.length;i++){
                if (new_msgs[i]["sender"] in state.Message){
                }else{
                    state.Messages[new_msgs[i]["sender"]] = [new_msgs[i]];
                }
            }
        },

    parse_new_contacts:
        function(contacts, state) {
            cons = {}
            for(let i=0; i< contacts.length;i++){
                let key = contacts[i]["PubKey"];
                key = atob(key);
                cons[contacts[i]["Username"]] = key
            }
            state.set_contacts(cons);
        },

};
