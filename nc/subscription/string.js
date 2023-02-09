import {StringCodec} from "nats";

const sc = StringCodec();

export const stringAPI = async (sub)=>{
        console.log("string api");
        for await (const m of sub) {
            try{
                const msg = sc.decode(m.data);
                m.respond(sc.encode("nc received " + sc.decode(msg))) ? console.log("handled") : console.log("not handled");
            } catch (e){
                console.log(e.message);
            }
        }
};


