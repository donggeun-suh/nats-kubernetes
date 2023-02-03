import {JSONCodec, StringCodec} from "nats";

const jc = JSONCodec();
const sc = StringCodec();

export const jsonAPI =  async (sub)=>{
        console.log("ping api");
        for await (const m of sub) {
            const msg = jc.decode(m.data);
            console.log(msg.email);
            if(m.respond(sc.encode("pong"))){
                console.log("handled");
            } else {
                console.log("not handled");
            }
        }
    };
