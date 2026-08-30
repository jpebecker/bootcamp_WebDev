import express from "express";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1><h2>Welcome</h2>");
});

app.post("/register", (req, res) => {
  //do something with the data received
  res.sendStatus(201);
});

app.put("/user/joao", (req, res) => {
  //resend all values registered
  res.sendStatus(200);
});

app.patch("/user/joao", (req, res) => {
  //change one value registered
  res.sendStatus(200);
});

app.delete("/user/joao", (req, res) => {
  //Deleting the data
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
