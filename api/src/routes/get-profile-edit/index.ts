import { Router } from "express";
import { MongoClient } from "../../db/mongo";

const getProfile = Router();

export const getProfileEditRoute = () =>
  getProfile.get("/profile-edit/:cpf", async (req, res) => {
    const cpf = req.params.cpf;

    try {
      const profileCollection = MongoClient.db.collection("profile");
      const existingProfile = await profileCollection.findOne({ cpf: cpf });

      if (!existingProfile) {
        return res.status(404).json({ error: 'Paciente não encontrado.' });
      }

      const formattedProfile = {
        patient: existingProfile.patient, 
        surname: existingProfile.surname, 
        nationality: existingProfile.nationality, 
        birth: existingProfile.birth,
        cpf: existingProfile.cpf, 
        rg: existingProfile.rg, 
        gender: existingProfile.gender, 
        civilStates: existingProfile.civilStates,
        email: existingProfile.email,
        comments: existingProfile.comments, 
        cep: existingProfile.cep, 
        city: existingProfile.city, 
        uf: existingProfile.uf, 
        address: existingProfile.address, 
        number: existingProfile.number, 
        neighborhood: existingProfile.neighborhood, 
        complement: existingProfile.complement
      };

      return res.status(200).json(formattedProfile);
    } catch (error) {
      console.error('Erro ao obter paciente:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });