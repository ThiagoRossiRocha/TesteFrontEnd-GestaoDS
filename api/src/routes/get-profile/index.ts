import { Router } from "express";
import { MongoClient } from "../../db/mongo";

const getProfiles = Router();

export const getProfilesRoute = () =>
  getProfiles.get("/profile", async (req, res) => {
    try {
      const profileCollection = MongoClient.db.collection("profile");

      const allProfilesCursor = await profileCollection.find();
      const allProfiles = await allProfilesCursor.toArray();

      const formattedProfiles = allProfiles.map(profile => ({
        patient: profile.patient,
        cpf: profile.cpf,
        birth: profile.birth,
        email: profile.email,
        city: profile.city,
      }));

      res.status(200).json(formattedProfiles);
    } catch (error) {
      console.error('Erro ao obter perfis:', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });