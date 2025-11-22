import { createClient, type RedisClientType } from "redis";


export  class PubSubManager {
    private static instance : PubSubManager;

    private redisCient : RedisClientType;
    // key ( stock name ) : [ value ] (list of users that's subscribed to this stock )
    private subscriptions : Map<string,string[]>;

    private constructor() {
        this.redisCient = createClient();
        this.redisCient.connect();

        this.subscriptions = new Map();
    }

    static getInstance(){
        if(PubSubManager.instance){
            return PubSubManager.instance;
        }
        else{
            PubSubManager.instance = new PubSubManager();
            return PubSubManager.instance;
        }
    }

    public subscribeUser(userId : string, stock : string){
        // If stock ( key ) is not present create it
        if(!this.subscriptions.has(stock)){
            this.subscriptions.set(stock,[]);
        }

        // Add user to that stock
        this.subscriptions.get(stock)?.push(userId);

        // If this is the 1st user for this stock subscribe to this stock
        if(this.subscriptions.get(stock)?.length === 1){
            // After subscribing call a callback fn that sends msg subscribed to tis stock
            this.redisCient.subscribe(stock,(message) => {
                this.handleMessage(stock,message)
            })
        }  
        console.log(`Subscribed to Redis Channel ${stock}`); 
    }

    public unSubscribeUser(userId : string, stock: string){
        // If only that user is present , set stock to empty array
        this.subscriptions.set(stock,this.subscriptions.get(stock)?.filter((user) =>  user !== userId) || []);

        // If no user interested in this stock unsubscribe
        if(this.subscriptions.get(stock)?.length === 0){
            this.redisCient.unsubscribe(stock);
            console.log(`Unsubscribed to Redis Channel ${stock}`);
        }
    }

    private handleMessage(stock : string, message : string){
        console.log(`Message ${message} received on channel ${stock}`);
        // Send msg to all users whi are interested in this stock
        this.subscriptions.get(stock)?.forEach(user => {
            console.log(`Sending message to user ${user}`)
        })
    }

    // Cleanup Logic
    public async disconnect(){
        this.redisCient.quit();
    }

}

