import { Router } from "express";
import { MongoClient } from "../../db/mongo";

const deleteProfile = Router();

export const deleteProfileRoute = () =>
  deleteProfile.delete("/profile/:cpf", async (req, res) => {
    const cpf = req.params.cpf;
    const profile = await MongoClient.db.collection("profile");
    const existingProfile = await profile.findOne({ cpf: cpf });

    if(!existingProfile) {
      res.status(400).json({ error: 'Paciente não encontrado.' });
      return;
    }
    await profile.deleteOne({cpf: cpf});

    res.status(200).json({ message: "Paciente excluido com sucesso!" });
  });