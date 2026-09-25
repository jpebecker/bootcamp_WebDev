import express from "express";
const app = express();
const port = 3000;
//home
app.get("/", (req,res) =>{
    res.send("<h1>Hello World from Node and Expressjs!</h1>");
});
//about page
app.get("/about", (req,res) =>{
    res.send("<h1>About me:</h1><h3>I'm from Brazil</h3>");
});
//contact page
app.get("/contact", (req,res) =>{
    res.send("<h1>Contact me:</h1><h3>e-mail:jpebecker@gmail.com</h3>");
});

app.listen(port, () => {
console.log(`Server running on port ${port}.`);
});