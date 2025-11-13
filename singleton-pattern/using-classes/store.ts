interface Game {
    id : string,
    whitePlayerName : string,
    blackPlayerName : string,
    moves : string[]
}

// You could have also created separate functions addMove, addGame, log() are exported them
// But defining global variable inside class and defining methods inside it is a better approach.

export class GameManager {
    games : Game [] = [];

    constructor () {
        this.games = [];
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