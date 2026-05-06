import { Request, Response } from 'express';
import Education from '../models/Education';

export const getAllEducation = async (req: Request, res: Response) => {
  try {
    const education = await Education.findAll();
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching education' });
  }
};

export const getEducationById = async (req: Request, res: Response) => {
  try {
    const education = await Education.findByPk(req.params.id as string);
    if (!education) {
      return res.status(404).json({ error: 'Education not found' });
    }
    res.json(education);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching education' });
  }
};

export const createEducation = async (req: Request, res: Response) => {
  try {
    const education = await Education.create(req.body);
    res.status(201).json(education);
  } catch (error) {
    res.status(400).json({ error: 'Error creating education' });
  }
};

export const updateEducation = async (req: Request, res: Response) => {
  try {
    const education = await Education.findByPk(req.params.id as string);
    if (!education) {
      return res.status(404).json({ error: 'Education not found' });
    }
    await education.update(req.body);
    res.json(education);
  } catch (error) {
    res.status(400).json({ error: 'Error updating education' });
  }
};

export const deleteEducation = async (req: Request, res: Response) => {
  try {
    const education = await Education.findByPk(req.params.id as string);
    if (!education) {
      return res.status(404).json({ error: 'Education not found' });
    }
    await education.destroy();
    res.json({ message: 'Education deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting education' });
  }
};
