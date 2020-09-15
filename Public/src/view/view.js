const $ = require( "jquery" );
const logic = require("../controller/logic");
const util = require("../util/rsa-util");
const $loginPage = $("#login_page");
const $window = $(window);
const $usernameInput = $("#in2"); // Input for username
const $inputMessage = $('.inputMessage'); // Input message input box

module.exports = {
    DrawMessage: function(sender, msg, state) {

        if(sender === state.get_username()){
            $(".msg_history").append("<div class='outgoing_msg'> <div class='sent_msg'> <p>"+ msg+"</p> </div> </div>")
        } else {
            let clean_msg = util.decrypt_msg(msg, state);
            $(".msg_history").append("<div class='incoming_msg'> <div class='received_msg'> <div class='received_withd_msg'> <p>"+clean_msg+"</p></div> </div> </div>");
        }

    },

    DrawChat:function (state){
        try{
            let msgs = state.get_messages()[state.get_current()];
            if(msgs ===0 || msgs === undefined){
                console.log("empty chat")
            }else{
                $('.msg_history').empty();
                console.log("we got these msgs")
                console.log(msgs)
                for(var i=0; i<msgs.length;i++){
                    module.exports.DrawMessage(msgs[i].sender, msgs[i].message, state)
                }
            }

        }catch (e) {
            console.log("SOMETHIN FAILED")
            console.log(e)
        }

    },

    ClearChat: function (){
        $(".msg_history").empty();
    },

    FocusUserChat: function(sel,state) {
    //Highlight selected chat
    $(sel).addClass("active_chat");
    try{
        $("#"+state.get_current()).removeClass("active_chat");
    }catch (e) {

    }
    state.set_current($(sel).attr('id'));
    module.exports.ClearChat();

    // DrawCha
        module.exports.DrawChat(state)
    },

    DrawFriendsList: function(state){
        //console.log("state is");
       // console.log(state);
        //console.log("drawing friend list");
        $('.inbox_chat').empty();
        //console.log(state.get_contacts());
        for(const contact in state.get_contacts()){
            if(contact === state.get_current()){
                $(".inbox_chat").append("<div class='chat_list active_chat' id='"+contact+"'> <div class='chat_people'> <div class='chat_ib'> <h5>"+ contact +"</h5> </div> </div> </div>");
            }else {
                $(".inbox_chat").append("<div class='chat_list' id='"+contact+"'> <div class='chat_people'> <div class='chat_ib'> <h5>"+ contact +"</h5> </div> </div> </div>");
                $(".inbox_chat #"+contact).click(function () {
                    console.log("FOCUSING ON SOMETHIN");
                    module.exports.FocusUserChat(this,state)
                })
            }
        }
    },

    SendMessageBtnClicked: function(state) {
        let msg = $(".write_msg").val();
        $(".write_msg").val("");
        logic.SendMessage(state, msg, module.exports.DrawChat);

    },

    DrawDashboard: function (state){

        $("#login_page").fadeOut();
        $("#chat_page").show();
        $("#login_page").off('click');

        //Get all users
        //TODO
        logic.PollUsersList(state, module.exports.DrawFriendsList);
        logic.ListenForMessages(state, module.exports.DrawChat);

    },

    DrawWelcomeScreen: function(){
        $("#in").hide();
        $("#in2").hide();
        $("#second").hide();

        $("#in").css("color","#000");
        $("#in2").css("border-bottom","2px solid #000");
        $("#second").css("color","#000");


        $( "#first" ).delay( 800 ).fadeOut( 400 );
        $( "#second" ).delay(1200).fadeIn( 400 );
        $( "#second" ).delay(1300).fadeOut( 200 );
        $( "#in" ).delay(3100).fadeIn( 800 );
        $( "#in2" ).delay(3100).fadeIn( 800 );
        $("#in2").focus();
    },

        // Click events
    SetLoginPageListeners: function (state){
            $(function() {
                $(".msg_send_btn").click(function () {
                    module.exports.SendMessageBtnClicked(state)
                });

                $(".chat_list").click(function () {
                    if($(this).hasClass("active_chat")){

                    }
                    else{
                        console.log("FOCUSING ON A CHAT");
                        module.exports.FocusUserChat(this, state)
                    }
                });
                // Focus input when clicking anywhere on login page
                $loginPage.click(function () {
                    $usernameInput.focus();
                });

                // Focus input when clicking on the message input's border
                $inputMessage.click(function () {
                    $usernameInput.focus();
                });

                // Keyboard events
                $window.keydown(function (event) {
                    // Auto-focus the current input when a key is typed
                    if (!(event.ctrlKey || event.metaKey || event.altKey)) {
                        $usernameInput.focus();
                    }
                    // When the client hits ENTER on their keyboard

                    if (event.which === 13) {
                        let username = $("#in2").val();
                        console.log("USER: "+username);

                        // If the username is valid
                            if (username) {
                                $("#in").delay(0).fadeOut(800);
                                $("#in2").delay(0).fadeOut(800);
                                module.exports.DrawDashboard(state);
                                logic.Login(state, username, function(){module.exports.DrawDashboard(state)});
                            }
                    }
                });
                });
        },


};


