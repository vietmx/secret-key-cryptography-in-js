const crypto = require('crypto');

const alg = `aes-192-cbc`;
const pass_key = `david_viktoria`;
const salt = 'salt';
const keylen = 24;
const shared_key = crypto.scryptSync(pass_key,salt,keylen)
const one_time_code = crypto.randomBytes(16);

const cipher = crypto.createCipheriv(alg,shared_key,one_time_code);
const decipher = crypto.createDecipheriv(alg,shared_key,one_time_code);

let cipher_text;

function davidEncrypting(){
    const davids_message = "Hello there";

    cipher.on('readable',() => {
        let _cipher_text = cipher.read()
        if(_cipher_text){

            cipher_text = _cipher_text.toString('hex');

        }
    });

    cipher.write(davids_message);

    cipher.end();
   
};

function viktoriaDecrypting(){

    decipher.on('readable',() => {

        let _plain_text = decipher.read();

        if(_plain_text){

            console.log(_plain_text.toString('utf8'));
            
        };


    });

    decipher.write(cipher_text,'hex');

    decipher.end();

}

davidEncrypting();
viktoriaDecrypting();