// Attempted to use Rabbit MQ for direct connection to learn its not possible
// YOu need to use STOMP and a websocket, but after many hours of attempting to get this to work
// It seems cors might be blocking the full communication so I moved over to consuming this on server side.
//
//
// const Stomp = require('stompjs');
// /**
//  * @return {string}
//  */
//
//
// function Get_Rabbit_MQ_URL()
// {
//     return "ws://127.0.0.1:61613/ws"
// }
//
// module.exports = {
//
//     SetupMq: function (state, on_message) {
//
//         const con = new WebSocket(Get_Rabbit_MQ_URL());
//         client = Stomp.over(con);
//
//         client.heartbeat.outgoing = 0;
//         client.heartbeat.incoming = 0;
//         client.debug = function(e){
//             console.log(e);
//         };
//         console.log("ATTEMPTING CONNCET");
//
//         console.log("MAGICC")
//         client.connect("guest", "guest",
//             function () {
//                 alert("conneted");
//                 client.subscribe('/amq/queue/'+state.Username, function(m){
//                     console.log(m)
//                 });
//                 state.set_mq_client(client);
//             },
//             function(e){
//                 console.log(e);
//                 alert("Connection to Rabbit MQ Failed restart application")
//             }, "vhost");
//         console.log(client);
//     }
//
//
//
//
//
//
// };
