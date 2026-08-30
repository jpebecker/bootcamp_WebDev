import express from "express";
const app = express();
const port = 3000;

app.get("/", (req,res) => {
    const today = new Date();
    const day = today.getDay(); //dia de 0 a 6
    console.log(day);
    let day_week = "";
    let adv = "";

    if(day === 0 || day === 6){
        day_week = "a weekend";
        adv = "It's time to have fun!";
    }
    else{
        day_week = "a weekday";
        adv = "It's time to work hard!";
    }
    res.render("index.ejs", {dayType: day_week, advice: adv});
})

app.listen(port, () =>{
    console.log(`Server running on Port ${port}.`)
})