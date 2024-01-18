import { Router } from "express";
import { MongoClient } from "../../db/mongo";

const getSearch = Router();

export const getSearchRoute = () =>
  getSearch.get("/search", async (req, res) => {
    try {
      const searchTerm = req.query.term;

      if (typeof searchTerm !== 'string') {
        return res.status(400).json({ error: 'O parâmetro term deve ser uma string.' });
      }

      const profile = await MongoClient.db.collection("profile");

      const results = await profile
        .find({
          $or: [
            { patient: { $regex: new RegExp(searchTerm, 'i') } },
            { cpf: { $regex: new RegExp(searchTerm, 'i') } },
            { birth: { $regex: new RegExp(searchTerm, 'i') } },
            { email: { $regex: new RegExp(searchTerm, 'i') } },
            { city: { $regex: new RegExp(searchTerm, 'i') } },
          ],
        })
        .toArray();

        const formattedSearchProfiles = results.map(profile => ({
        patient: profile.patient,
        cpf: profile.cpf,
        birth: profile.birth,
        email: profile.email,
        city: profile.city,
      }));
      res.json(formattedSearchProfiles);
    } catch (error) {
      console.error('Erro ao realizar pesquisa', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
);
