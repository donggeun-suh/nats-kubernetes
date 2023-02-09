import express from 'express';
import {stringRouter} from "./routes/string.js";
import {jsonRouter} from "./routes/json.js";

const app = express();
app.set("trust proxy", true);
app.use(express.json())
app.use(stringRouter);
app.use(jsonRouter);

app.listen(3000,()=>{
    console.log("listening 3000")
});





