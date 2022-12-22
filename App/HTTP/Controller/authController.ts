import * as queryString from 'query-string';

import axios from 'axios';      

//const queryString = require("query-string")
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../../../config';

class AuthController {
    static login(req, res) {
        const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=119543196416-uus39o2uula3hc9uvtu39ikf9628f00d.apps.googleusercontent.com&redirect_uri=http://localhost:3000/auth/test&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile&response_type=code&access_type=offline&prompt=consent`;
        const test = new URL(googleLoginUrl)
        
        return res.status(200).send(test)
    }

    static test(req, res){
        console.log("req 😶‍🌫️😶‍🌫️😶‍🌫️😶‍🌫️", req)
        return res.status(200).send("done 😶‍🌫️😶‍🌫️😶‍🌫️😶‍🌫️")
    }
    
    static async getAccessTokenFromCode(req,res){
        const code="4/0AWgavddb39INQM_oTepQNAOK1FnO7yqgmBVEjlIf189bW7KYa-OJmUkbFHi_ojKjpvZKeA" // always getting new code from url
        const { data } = await axios({
            url: `https://oauth2.googleapis.com/token`,
            method: 'post',
            data: {
              client_id: "119543196416-uus39o2uula3hc9uvtu39ikf9628f00d.apps.googleusercontent.com" ,
              client_secret: "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",
              redirect_uri: 'http://localhost:3000/auth/test',
              grant_type: 'authorization_code',
              code,
            },
          });

          console.log(data); // { access_token, expires_in, token_type, refresh_token }
         return res.status(200).send(data.access_token)
 
  

    }

}

export default AuthController