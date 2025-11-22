interface Game {
    id : string,
    whitePlayerName : string,
    blackPlayerName : string,
    moves : string[]
}

// You could have also created separate functions addMove, addGame, log() are exported them
// But defining global variable inside class and defining methods inside it is a better approach.

// export class RedisGameManager implements GameManagerInterface {

// }

// export class PostgresGameManager implements GameManagerInterface {

// }

// This is a blueprint
//  ( All GameManager class that implements GameManagerInterface must have these methods )

// An abstract class cannot be instantiated.
// It only has abstract methods ( methods with no implementation just definition )

// In case u want to write methods that updates in memory store to redis.
// You can implement GameManagerInterface and write methods that updates to redis 
// Similarly for Postgres

export abstract class GameManagerInterface {
    abstract addMove(gameId : string, move : string):void
    abstract addGame(gameId : string): void
    abstract log():void
}



export class GameManager implements GameManagerInterface {
    games : Game [] = [];
    private static instance : GameManager;

    private constructor () {
        this.games = [];
    }

    static getInstance(){
        if(GameManager.instance){
            return GameManager.instance
        }

        GameManager.instance = new GameManager();
        return GameManager.instance;
    }
   

    // Define methods
    addMove(gameId : string, move : string){
        console.log(`Adding move ${move} to game ${gameId}`);
        const game = this.games.find(game => game.id === gameId);
        game?.moves.push(move);
    }

    addGame(gameId : string){
        const game = {
            id : gameId,
            whitePlayerName : "Alice",
            blackPlayerName : "Bob",
            moves : []
        }

        this.games.push(game);
    }

    log(){
        console.log(this.games);
    }
}

