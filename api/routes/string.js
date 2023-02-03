import express from 'express'
import {connect, StringCodec, JSONCodec, Empty} from "nats";

const router = express.Router();

router.get('/api/string',async (req, res)=>{
    const game = req.get('game');
    const sc = StringCodec();
    const nc = await connect({servers: 'nats-srv:4222'});
    const data = sc.encode("ping");

    await nc.request(
        `${game}:string`,
        data,
        {timeout: 5000}
    ).then((m)=>{
        res.send(sc.decode(m.data))
    }).catch((err)=>{
        res.send(err.message)
    })
})

export {router as stringRouter};
