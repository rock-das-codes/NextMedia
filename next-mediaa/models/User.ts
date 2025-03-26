import mongoose, { Schema ,model,models} from "mongoose";
import bcrypt from "bcryptjs"

export interface Iuser{
email:string;
password:string;
id?:mongoose.Types.ObjectId;
createdAt?:Date;
updatedAt?:Date


}

const userScehema = new Schema<Iuser>(
    {
        email:{type:String, required:true , unique:true},
        password:{type:String,required:true}


    },
    {timestamps:true}
)

userScehema.pre("save",async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash("this.password",10)
    }
    next()
})

const Users= models?.Users || model<Iuser>("users",userScehema)

export default Users