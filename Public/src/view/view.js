const $ = require( "jquery" );
const logic = require("../controller/messaging");
const util = require("../util/rsa-util");
const $loginPage = $("#login_page");
const $window = $(window);
const $usernameInput = $("#in2"); // Input for username
const $inputMessage = $('.inputMessage'); // Input message input box

module.exports = {
    DrawMessage: function(sender, msg, state) {
        if(sender === state.Username){
            $(".msg_history").append("<div class='outgoing_msg'> <div class='sent_msg'> <p>"+ msg+"</p> </div> </div>);")
        } else {
            let clean_msg = util.decrypt_msg(msg, state);
            $(".msg_history").append("<div class='incoming_msg'> <div class='received_msg'> <div class='received_withd_msg'> <p>"+clean_msg+"</p></div> </div> </div>");
        }

    },

    DrawChat:function ( state){
        let msgs = state.Messages[state.Current];

        for(var i=0; i<msgs.length();i++){
          module.exports.DrawMessage(msgs[i].sender, msgs[i].message, state)
        }
    },

    ClearChat: function (){
        $(".msg_history").empty();
    },

    FocusUserChat: function(sel,state) {
    //Highlight selected chat
    $(sel).addClass("active_chat");
    $("#"+state.Current).removeClass(active_chat);
    state.set_current($(sel).attr('id'));
    module.exports.ClearChat();

    // DrawChat
        module.exports.DrawChat(state)
    },

    DrawFriendsList: function(state){
        $('inbox_chat').empty();
        for(let i=0; i<state.Contacts.length;i++){
            let name = "";
            if(name === state.Current){
                $(".inbox_chat").append("<div class='chat_list active_chat' id='"+name+"'> <div class='chat_people'> <div class='chat_ib'> <h5>"+ name +"</h5> </div> </div> </div>");
            }else {
                $(".inbox_chat").append("<div class='chat_list' id='"+name+"'> <div class='chat_people'> <div class='chat_ib'> <h5>"+ name +"</h5> </div> </div> </div>");

            }
        }
    },

    SendMessageBtnClicked: function(state) {
        let msg = $(".write_msg").val();
        $(".write_msg").val("");
        let recipient = state.Current;
        logic.SendMessage(recipient, msg);
        module.exports.DrawChat(state)
    },

    DrawDashboard: function (state){

        $("#login_page").fadeOut();
        $("#chat_page").show();
        $("#login_page").off('click');

        //Get all users
        //TODO
        //logic.ListenForMessages(state,)
        logic.PollUsersList(state, module.exports.DrawFriendsList())
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
                $(".write_msg").click(function () {
                    module.exports.SendMessageBtnClicked(state)
                });

                $(".chat_list").click(function () {
                    if(!$(this).hasClass("active_chat")){
                        alert("lol");
                        module.exports.FocusUserChat(this, state)
                    }
                    alert("hi");
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
                                module.exports.DrawDashboard(state)
                                logic.Login(state, username, function(){module.exports.DrawDashboard(state)});
                            }
                    }
                });
                });
        },


};


