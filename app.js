// import express from "express";
const express = require("express");
// import cors from "cors";
const cors = require("cors");
const dotenv = require("dotenv");

const webpush = require("web-push");
dotenv.config();

const apiKeys = {
    publicKey: process.env.VAPID_PUBLIC_KEY,
    privateKey: process.env.VAPID_PRIVATE_KEY
}

webpush.setVapidDetails(
    'mailto:balliendewh@gmail.com',
    apiKeys.publicKey,
    apiKeys.privateKey

)

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server para mandar notificaciones")
})

const subData = [];

app.post("/save-subs", (req, res) => {
    subData.push(req.body);
    res.json({status:"Success!"});
    console.log(subData[0]);
})

app.get("/send-notification", (req, res) =>{
    const payload = JSON.stringify({
        title: "Recordatorio",
        body: "Acuérdate de modificar tus imágenes antes de publicarlas",
        icon: "/192x192.png", 
        badge: "/192x192.png"
      });
    webpush.sendNotification(subData[0], payload);    
    res.json({status:"Success!"})
})

app.listen(port, () => {
    console.log("server running on port 3000")
})