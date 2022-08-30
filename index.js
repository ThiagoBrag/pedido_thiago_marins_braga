const express = require('express');
const router = require("./router");

const porta = 8080;

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Home")
})

app.use("/api", router);

app.listen(porta, ()=>{
    console.log('App rodando em http://localhost:'+porta);
});