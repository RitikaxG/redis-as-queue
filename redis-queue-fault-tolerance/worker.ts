import client from "./utils/redisClient";

const worker = async () => {
    while(true){ // Infinitely pick job from queue

         // Step 1 : Pick job from submissions queue and push it to processing queue infinitely
         // This way it will not be processed immediately
        const job = await client.brPopLPush("submissions","processing",0);
        
        if(!job){
            continue
        }

        try{
            // docker orchestration
            // pub-sub logic

            // Simulating work
            await new Promise((resolve) => setTimeout(resolve,1000));

            // Step 2 : Once job is processed ( docker orchestration , pub-sub connection is done)
            // Remove 1 occurrence of job from processing queue
            await client.lRem("processing",1,job);
            console.log("Processed job",job);
        }
        catch(err){
            console.log(`Error processing job`,err);
            // Step 3 : In case job is not processed
            // Push job to submissions queue again 
            await client.lPush("submissions",job);
            // Remove job from processing queue since it is resend to submssions queue waiting to be picked again
            await client.lRem("processing",1,job);
        }
       
    }
   
}

worker();