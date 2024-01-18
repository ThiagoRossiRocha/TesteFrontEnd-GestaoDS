import { Router } from "express";
import { MongoClient } from "../../db/mongo";
import { Binary } from "mongodb";

const getImage = Router();

export const getImageProfileRoute = () =>
  getImage.get("/image-profile", async (req, res) => {

    const profile = await MongoClient.db.collection("profile");
    console.log("cheguei");

    // const existingUser = await users.findOne({ token: tokenUser });
    // const existingProfile = await profile.findOne({ user_id: existingUser?._id.toHexString() });

    // if (!existingProfile?.image) {
    //     return res.status(400).json({ message: "Imagem não encontrada." });
    // }

    // const binaryData = existingProfile.image as Binary;
    // const imageBuffer = binaryData.buffer;
    // res.writeHead(200, {
    //   'Content-Type': 'image/jpeg',
    //   'Content-Length': imageBuffer.length,
    // });

    // res.end(imageBuffer);
  });
