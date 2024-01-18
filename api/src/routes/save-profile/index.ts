import { Router } from "express";
import { MongoClient } from "../../db/mongo";

const saveProfile = Router();

export const saveProfileRoute = () =>
  saveProfile.post("/profile", async (req, res) => {
    const { patient, surname, nationality, birth, cpf, rg, gender, civilStates, email, comments, cep, city, uf, address, number, neighborhood, complement } = req.body;

    const profile = await MongoClient.db.collection("profile");
    const existingUser = await profile.findOne({ cpf: cpf });

    const newProfile = {
      patient, 
      surname, 
      nationality, 
      birth, 
      cpf, 
      rg, 
      gender, 
      civilStates,
      email,
      comments, 
      cep, 
      city, 
      uf, 
      address, 
      number, 
      neighborhood, 
      complement
    };

    if(!existingUser){
      await profile.insertOne(newProfile);
    }
    else{
      await profile.updateOne({ cpf: cpf },{$set: newProfile});
    }
    res.status(200).json({message: "Dados salvos!"});
  });