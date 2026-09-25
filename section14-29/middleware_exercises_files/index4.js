import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

var teamName= "";

app.use(bodyParser.urlencoded({extended:true}));

function teamNameGenerator(req,res,next) {
  console.log(req.body);
  teamName = req.body['street'] + req.body['pet'];
  next();
}

app.use(teamNameGenerator)

app.get("/", (req,res) => {
  res.sendFile(__dirname + "/public/index.html")
})

app.post("/submit", (req,res) => {
  res.send(`<h1>Your band name will be:</h1><h2> ${ teamName }</h2>`)
})
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
