import client from "./utils/redisClient";

const STALE_TIME_MS = 30000  // 30s 
const RECHECK_INTERVAL_MS = 10000

const isStale = (job: string) => {
    try{
        const parsedJob = JSON.parse(job);
        if(!parsedJob.timestamp){
            return;
        }
        return Date.now() - parsedJob.timestamp > STALE_TIME_MS
    }
    catch(err){
        return true; // Invalid JSON treated as stale
    }
}

const requeueStaleJobs = async () => {
    // Returns all jobs in processing list
    const jobs = await client.lRange("processing",0,-1);
    for(const job in jobs){
        if(isStale(job)){
            await client.lPush("submissions",job);
            await client.lRem("processing",1,job);
        } 
    }
}

const checkingStaleJobs = async () => {
    console.log("Monitoring stale jobs..");
    while(true){
        await requeueStaleJobs();
        await new Promise((resolve) => setTimeout(resolve,RECHECK_INTERVAL_MS));
    }
}

checkingStaleJobs();