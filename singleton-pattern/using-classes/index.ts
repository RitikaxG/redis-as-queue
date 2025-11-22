import { gameLogger } from "./logger";
import { GameManager } from "./store";
// Create an instance of GameManager class
// This instance needs to be created only once and exported
// If a developer creates a new instance everytime new games [] will be available


gameLogger();
setInterval(()=>{
    GameManager.getInstance().addGame(Math.random().toString());
},2000)