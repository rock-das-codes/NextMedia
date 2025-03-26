import mongoose from "mongoose"


const MONGOBD_URL = process.env.MONGODB_URI!

if(!MONGOBD_URL){
    throw new Error("are bahl")
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn:null,promise:null};
}
export async function connectToDB() {
    if(cached.conn){
        return cached.conn
    }
    if(!cached.promise){
        const opt = {
            bufferCommands:true,
            maxPoolSize:10

        }

    
    cached.promise= mongoose.connect(
        MONGOBD_URL, opt
    ).then(()=>mongoose.connection)
}

 try {
    cached.conn= await cached.promise
 } catch (error) {
    cached.promise = null
    throw Error("here")
 }
return cached.conn
}