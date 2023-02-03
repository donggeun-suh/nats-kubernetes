import {connect, JSONCodec, StringCodec} from "nats";
import {stringAPI} from "./subscription/string.js";
import {jsonAPI} from "./subscription/json.js";
import mongoose from "mongoose";
import express from "express";



const start = async () => {
    const app = express();
    const nc = await connect({servers: "nats-srv:4222"});

    const stringSub = nc.subscribe("nc:string");
    const jsonSub = nc.subscribe("nc:json");

    stringAPI(stringSub);
    jsonAPI(jsonSub);

    try {
        await mongoose.connect("mongodb://nc-mongo-srv:27017");
        console.log("connected");
    } catch (err){
        console.error(err);
    }
    app.listen(3001,()=>{
        console.log("listening 3001")
    });
}

start();





