import { Router } from "express";
import { MongoClient } from "../../db/mongo";
import multer from "multer";

const saveImage = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const saveImageProfileRoute = () =>
  saveImage.post("/image-profile", upload.single("croppedImage"), async (req, res) => {
    const profile = await MongoClient.db.collection("profile");
    console.log("cheguei")
    // const file = req.file;
    // if (!file) {
    //   return res.status(400).send("Nenhuma imagem foi enviada.");
    // }

    // if(!existingUserInProfile){
    //     await profile.insertOne({ user_id: userId, image: file.buffer });
    // }
    // else{
    //     await profile.updateOne({ user_id: userId },{$set: {image: file.buffer}});
    // }
    // res.status(200).json({message: "Dados salvos!"});
  });
