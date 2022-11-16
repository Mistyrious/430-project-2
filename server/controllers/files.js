const File = require('../models/filestore.js');

const uploadFile = async (req, res) => {
  if(!req.files || Object.keys(req.files).length == 0){ //no files to parse
    return res.status(400).json({error: 'No files were uploaded'});
  }

  const {sampleFile} = req.files;
  
  try{
    const newnFile = new File(sampleFile);
    const doc = await newFile.save();
    return res.status(201).json({
      message: 'File stored successfully',
      fileID: doc._id,
    })
  } catch(err){
    console.log(err);
    return res.status(400).json({error: 'Error uploading file'});
  }
};

const retrieveFile = async(req, res) => {
  if(!req.query._id){
    return res.status(400).json({error: 'Missing file id!'});
  }

  let doc;
  try{
    doc = await File.findById(req.query._id).exec();
  } catch(err){
    console.log(err);
    return res.status(400).json({error: 'Something went wrong retrieving the file'});
  }

  if(!doc){
    return res.status(404).json({error: 'No file found'});
  }

  res.set({
    'Content-Type': doc.mimetype,
    'Content-Length': doc.size,
    'Content-Disposition': `filename="${doc.name}"` 
    //can set to download instead of open in disposition w/ `attachment; filename="${doc.name}"`
  });

  return res.send(doc.data);
};

module.exports = {
  uploadFile,
  retrieveFile
}