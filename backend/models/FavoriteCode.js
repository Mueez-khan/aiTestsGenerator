import mongoose from "mongoose";


const FavoriteCodeSchema = new mongoose.Schema({

     owner : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
     },
    generatedFavoriteCode : {
        type : mongoose.Schema.ObjectId,
        ref : "codeSchema"
    },

})


export default  mongoose.model("favoriteCode" , FavoriteCodeSchema);