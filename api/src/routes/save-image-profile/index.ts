import { Router } from "express";
import { MongoClient } from "../../db/mongo";
import multer from "multer";

const saveImage = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export const saveImageProfileRoute = () =>
  saveImage.post("/image-profile", upload.single("croppedImage"), async (req, res) => {
    const { cpf, image } = req.body;

    const profile = await MongoClient.db.collection("profile");
    const existingUser = await profile.findOne({ cpf: cpf });

    if(!existingUser) return;
    
    await profile.updateOne({ cpf: cpf },{$set: {image: image.buffer}});
    res.status(200).json({message: "Dados salvos!"});
  });
