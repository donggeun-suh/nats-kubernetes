import {connect, JSONCodec, StringCodec} from "nats";
import {stringAPI} from "./subscription/string.js";
import {jsonAPI} from "./subscription/json.js";
import express from "express";



const start = async () => {
    const app = express();
    const nc = await connect({servers: "nats-srv:4222"});

    const stringSub = nc.subscribe("nc:string");
    const jsonSub = nc.subscribe("nc:json");

    stringAPI(stringSub);
    jsonAPI(jsonSub);

    app.listen(3001,()=>{
        console.log("nc listening 3001")
    });
}

start();





