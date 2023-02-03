import {StringCodec} from "nats";

const sc = StringCodec();

export const stringAPI = async (sub)=>{
        console.log("ping api");
        for await (const m of sub) {
            const msg = sc.decode(m.data);
            if(m.respond(sc.encode(msg + " pong"))){
                console.log("handled");
            } else {
                console.log("not handled");
            }
        }
};


