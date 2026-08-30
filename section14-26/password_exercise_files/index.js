import express from "express";
import bodyParser from "body-parser";
import {dirname} from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express()
const port = 3000;
const key = 'Admin123'
var IsAuth= false;

app.use(bodyParser.urlencoded({extended: true}));

function CheckPassword(req,res,next) {
    const password = req.body['password'];
    if (password === key){
        IsAuth = true;
    }
    else{
        IsAuth = false;
    }
    next();
}

app.use(CheckPassword);

app.get("/", (req,res) =>{
    res.sendFile(__dirname + "/public/index.html");
});

app.post("/check", (req, res) => {
  if (IsAuth) {
    res.sendFile(__dirname + "/public/secret.html");
  } else {
    res.sendFile(__dirname + "/public/index.html");
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
