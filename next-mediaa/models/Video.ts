import mongoose, { Schema ,model,models} from "mongoose";

export const VideoDimension = {
    width:1080,
    height:1920,
} as const
export interface Ivideo{
title:string;
description:string;
id?:mongoose.Types.ObjectId;
videourl:string;
thumbnailurl:string;
controls:boolean;
transformation?:{
    height:number,
    width:number,
    quality?:number
} ;
createdAt?:Date;
updatedAt?:Date



}

const videoSchema = new Schema<Ivideo>(
    {
        title:{type:String, required:true },
        description:{type:String},
        videourl:{type:String,required:true},
        thumbnailurl:{type:String},
        controls:{type:Boolean,default:true},
        transformation:{
            height:{type:Number,default:VideoDimension.height},
            width:{type:Number,default:VideoDimension.width},
            quality:{type:Number,min:1,max:100}

        }


    },
    {timestamps:true}
)


const Video= model<Ivideo>("video",videoSchema)

export default Video