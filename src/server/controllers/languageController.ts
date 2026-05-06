import { Request, Response } from 'express';
import Language from '../models/Language';

export const getAllLanguages = async (req: Request, res: Response) => {
  try {
    const languages = await Language.findAll();
    res.json(languages);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching languages' });
  }
};

export const getLanguageById = async (req: Request, res: Response) => {
  try {
    const language = await Language.findByPk(req.params.id);
    if (!language) {
      return res.status(404).json({ error: 'Language not found' });
    }
    res.json(language);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching language' });
  }
};

export const createLanguage = async (req: Request, res: Response) => {
  try {
    const language = await Language.create(req.body);
    res.status(201).json(language);
  } catch (error) {
    res.status(400).json({ error: 'Error creating language' });
  }
};

export const updateLanguage = async (req: Request, res: Response) => {
  try {
    const language = await Language.findByPk(req.params.id);
    if (!language) {
      return res.status(404).json({ error: 'Language not found' });
    }
    await language.update(req.body);
    res.json(language);
  } catch (error) {
    res.status(400).json({ error: 'Error updating language' });
  }
};

export const deleteLanguage = async (req: Request, res: Response) => {
  try {
    const language = await Language.findByPk(req.params.id);
    if (!language) {
      return res.status(404).json({ error: 'Language not found' });
    }
    await language.destroy();
    res.json({ message: 'Language deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting language' });
  }
};
