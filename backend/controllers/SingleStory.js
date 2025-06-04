
import  story from "../models/GenerateCodeSchema.js";

export const singleStory = async  (req , res) =>{

    try{

        const userid = req.user.id;
        const    storyId  = req.params.storyId;
        console.log("StoryId" , storyId)

        const storyExists = await story.findOne({owner : userid , _id : storyId});
        console.log("StoryExists"  , storyExists)
        if(!storyExists){
            
        return res.status(404).json({
            success : false,
            message : "Story not found"
        })
        }

        
;

        return res.status(200).json({
            success : true,
            message : "Single story fetched",
            data : storyExists
        })




    }
    catch(err){
        console.log("Error while fetching single  Story" ,err)
        return res.status(500).json({
            success : false,
            message : "Error while fetching single Story"
        })
    }

}