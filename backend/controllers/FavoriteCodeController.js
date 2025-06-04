import  favoriteCode  from "../models/FavoriteCode.js";
import  codeSchema from "../models/GenerateCodeSchema.js";




export const saveFavoriteCode = async  (req , res) =>{

    try{

        const userid = req.user.id; 
        const  codeId  = req.body;
        console.log("CodeID" , codeId.id)
        console.log("userId" , userid)

        const codeExists = await codeSchema.find(codeId);


        console.log("CodeExists" , codeExists)

        if(!codeExists){
            
        return res.status(404).json({
            success : false,
            message : "Code not found"
        })
        }

        const idOfStory = codeId.id;

        console.log("idOfStory" , idOfStory)
        const response = await favoriteCode.create({
            owner : userid,
            generatedFavoriteCode : idOfStory

        })

         

        return res.status(200).json({
            success : true,
            message : "Code added to favorite"
        })




    }
    catch(err){
        console.log("Error while saving  Code" ,err)
        return res.status(500).json({
            success : false,
            message : "Error while saving Code"
        })
    }

}



export const deleteSaveFavoriteCode = async  (req , res) =>{

    try{

        const userid = req.user.id;
        const   codeId  = req.body;
        console.log("Delete save code (codeID) " , codeId.id)
        const codeExists = await favoriteCode.findOne({owner : userid , generatedFavoriteCode : codeId.id});
        console.log("codeId" , codeId.id)
        console.log("codeExists" , codeExists)
        if(!codeExists){
            
        return res.status(404).json({
            success : false,
            message : "code not found"
        })
        }

        const objectIdOfImage = codeExists._id;
        const idOfCode = objectIdOfImage.toString();


        const response = await favoriteCode.findByIdAndDelete(idOfCode)
;

        return res.status(200).json({
            success : true,
            message : "Code removed from  favorite"
        })




    }
    catch(err){
        console.log("Error while deleting  Code" ,err)
        return res.status(500).json({
            success : false,
            message : "Error while deleting Code"
        })
    }

}



export const allFavoriteCode = async (req , res) =>{


    try{

        const userId = req.user.id;

        const allFavoriteCode = await  favoriteCode.find({owner : userId}).populate("generatedFavoriteCode").lean();


        return res.status(200).json({
            success : true,
            message : "All Code fetched",
            data : allFavoriteCode
        })
    }
    catch(err){

        console.log("Error while fetching favorite  Code" ,err)
        return res.status(500).json({
            success : false,
            message : "Error while fetching favorite Code"
        })

    }

}





export const isCodeSaved = async  (req , res)  =>{

    try{

        const userId = req.user.id;
        const {codeId }= req.params;


        if(!codeId || !userId){

        return res.status(403).json({

            success : false,
            message : "code Id and user Id both are required"

        })

        }

        const isSaved = await favoriteCode.findOne({
            owner : userId,
            generatedFavoriteCode :  codeId, 
        })


        if(!isSaved){
          
            return res.status(200).json({
                success: false,
                message: "Code not saved",
            });

        }


        return res.status(200).json({

            success : true,
            message : "Code saved"

        })

    }
    catch(err){
        console.log("Error while checking save Story"  ,  err);

        return res.status(500).json({

            success : false,
            message : "Error while  checking save Story "

        })
    }

}