class State{
    constructor() {
        this.Messages = {};
        this.Username = "";
        this.Public_key;
        this.Private_key;
        this.Contacts = {};
        this.Current = ""
    }

    set_current(cur){
        this.Current = cur
    }

    get_current(){
        return this.Current
    }

    set_username(newName){
        this.Username = newName;
    }

    get_username(){
        return this.Username;
    }

    set_messages(newMsgs){
        this.Messages = newMsgs;
    }

    get_messages(){
        return this.Messages;
    }

    set_public_key(key){
        this.Public_key = key;
    }

    get_public_key(){
        return this.Public_key
    }

    set_private_key(key){
        this.Private_key = key;
    }
    get_private_key(){
        return this.Private_key
    }


    set_contacts(con){
        this.Contacts = con;
    }

    get_contacts(){
        return this.Contacts
    }

    parse_new_contacts(new_contacts){
        // console.log("PARSE THIS");
        // console.log(new_contacts)
        let cons = {};
        for(let i=0; i< new_contacts.length;i++){
            //console.log("Running through each contact " + i.toString());
            let key = new_contacts[i].Pubkey;
            key = atob(key);
            cons[new_contacts[i].Username] = key
        }
        // console.log("res of parsing");
        // console.log(cons);
        this.Contacts = cons;
       // console.log("NEW CONTACTS PARSED");
        //console.log(this.Contacts);
    }

    add_new_message(message_obj, user){
        if (user in this.Messages){
            console.log("user exists");
            this.Messages[user].push(message_obj)
        }else{
            console.log("add a new message and new user");
            this.Messages[user] = [message_obj];
        }
    }

    parse_new_messages(new_msgs){
        console.log("PARSING NEW MSGS");
        for(let i=0; i< new_msgs.length;i++){
            if (new_msgs[i].sender in this.Messages){
                console.log("user exists");
                this.Messages[new_msgs[i].sender].push(new_msgs[i])
            }else{
                console.log("add a new message and new user");
                this.Messages[new_msgs[i].sender] = [new_msgs[i]];
            }
        }
    }

}

module.exports = State;
