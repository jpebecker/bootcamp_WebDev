const fs = require("fs");

console.log("creating a txt file with a customized message...");

fs.writeFile("message.txt", "Hi from Node and JavaScript!", (err) =>{
    if (err) throw err;
    console.log("File saved!\n");
});

message = fs.readFile("./message.txt", "utf-8", (err,data) => {
    if (err) throw err;
    console.log("reading the message...\n")
    console.log(data);
});