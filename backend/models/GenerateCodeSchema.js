import mongoose from "mongoose";


const GenerateCodeSchema = new mongoose.Schema({

    owner : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
        
    },
    generatedCode : {
        type : String
    }

})



export default mongoose.model("codeSchema" , GenerateCodeSchema);