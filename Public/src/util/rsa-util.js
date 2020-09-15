const NodeRSA = require('node-rsa');

module.exports = {
    create_key_pair:
        function (){
            return new NodeRSA({b: 512});
        },

    encrypt_msg:
        function(message, public_key) {
            // // Encrypt the data with the public key.
            key = new NodeRSA({b: 512});
            key.importKey(public_key);
            //enc_msg = atob(message);
            return  key.encrypt(message, 'base64');
        },

    decrypt_msg:
        function(msg, privateKey) {
            key = new NodeRSA({b: 512});
            key.importKey(privateKey);
            return  key.decrypt(msg, 'base64');
    }
};
