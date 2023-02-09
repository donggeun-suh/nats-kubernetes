import express from 'express'
import {connect, StringCodec, JSONCodec, Empty} from "nats";

const router = express.Router();

router.get('/api/json',async (req, res)=>{
    const game = req.get('game');
    const jc = JSONCodec();
    const sc = StringCodec();
    const nc = await connect({servers: 'nats-srv:4222'});
    const data = jc.encode(req.body);

    try {
        const m = await nc.request(
            `${game}:json`,
            data,
            {timeout: 5000}
        )
        await res.send(sc.decode(m.data));

    } catch (err){
        res.send(err.message);
    }
})

export {router as jsonRouter};
