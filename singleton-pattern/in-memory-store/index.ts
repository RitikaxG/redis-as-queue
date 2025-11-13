// Simulate updating the state
import { startLogger } from "./logger";
import { games } from "./store";
startLogger();
setInterval(()=>{
    games.push({
        id : Math.random().toString(),
        whitePlayerName : "Alice",
        blackPlayerName : "Bob",
        moves : []
    })
},1000);