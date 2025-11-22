import { PubSubManager } from "./PubSubManager";

setInterval(()=>{
    PubSubManager.getInstance().subscribeUser("123","APPL");
},2000)