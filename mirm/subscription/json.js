import {JSONCodec, StringCodec} from "nats";

const jc = JSONCodec();
const sc = StringCodec();

export const jsonAPI =  async (sub)=>{
    console.log("json api");
    for await (const m of sub) {
        try {
            const msg = await jc.decode(m.data);
            m.respond(sc.encode("mirm received: " + msg.content)) ? console.log("handled") : console.log("not handled");
        }catch (e){
            console.log(e.message)
        }
    }
};
