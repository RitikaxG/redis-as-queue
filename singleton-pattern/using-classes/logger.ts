import { GameManager } from "./store";
export const gameLogger = () => {
    setInterval(()=>{
        GameManager.getInstance().log();
    },2000)
}