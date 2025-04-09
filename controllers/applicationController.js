const Application = require('../models/Application.model.js');

exports.getall = async(req, res) => {
    const all= await Application.find({user:req.user._id});
    if(all.length>0) {
        res.status(200).json(all);
    }
    else {
        res.status(404).json({ message: 'No applications found' });
    }
 
}

exports.getsingle = async(req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
   
    const application = await Application.findOne( {_id: id, user: userId });
    if(application) {
        res.status(200).json(application);
    }
    else {
        res.status(404).json({ message: 'Application not found' });
    }
}

exports.add=async(req,res)=>{
    const {company, role, status, link}=req.body;
    const userId= req.user._id;
   

    if(!company || !role || !userId)
         {
        return res.status(400).json({ message: 'company & role are required' });
    }

   

    const application=new Application({ company, role, status, link, user: userId });
    await application.save()
    return res.status(201).json({ message: 'Application created successfully', application });
}





exports.update=async(req,res)=>{  
    const { id } = req.params;
   
    //user can only update status and link
    const {  status, link } = req.body;
    const userId = req.user._id;
    
    //find the application first
    const application = await Application.findOne( {_id:id, user: userId });
    

    if (application) {
        const newapplication = await Application.findByIdAndUpdate(id, { status, link }, { new: true });
        return res.status(200).json({ message: 'Application updated successfully', newapplication });
    } else {
        res.status(404).json({ message: 'Application not found || user is not the owner' });
    }
}


exports.deleteApplication=async(req,res)=>{
    const { id } = req.params;
    const userId = req.user._id;
    
    //find the application first
    const application = await Application.findOne( {_id:id, user: userId });
    
    //if application found and the owner is the user
    //delete the application
    if (application) {
        await Application.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Application deleted successfully' });
    } else {
        res.status(404).json({ message: 'Application not found || user is not the owner' });
    }
}