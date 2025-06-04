import codeSchema from "../models/GenerateCodeSchema.js";





export const fetchAllGeneratedStories = async (req , res) =>{


    try{
        const userId = req.user.id;
        const allGeneratedStories = await  codeSchema.find({owner : userId});


        return res.status(200).json({
            success : true,
            message : "All Codes are fetched",
            data : allGeneratedStories
        })
    }
    catch(err){

        console.log("Error while fetching   Codes " ,err)
        return res.status(500).json({
            success : false,
            message : "Error while fetching  codes"
        })

    }

}