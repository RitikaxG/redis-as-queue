import { gameManager } from "."
export const gameLogger = () => {
    setInterval(()=>{
        gameManager.log();
    },2000)
}