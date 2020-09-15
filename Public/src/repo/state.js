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

    set_username(newName){
        this.Username = newName;
    }

    set_messages(newMsgs){
        this.Messages = newMsgs;
    }

    set_public_key(key){
        this.Public_key = key;
    }

    set_private_key(key){
        this.Private_key = key;
    }

    set_contacts(con){
        this.Contacts = con;
    }
}

module.exports = State;
