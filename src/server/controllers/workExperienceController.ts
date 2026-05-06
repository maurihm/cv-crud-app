import { Request, Response } from 'express';
import WorkExperience from '../models/WorkExperience';

export const getAllWorkExperience = async (req: Request, res: Response) => {
  try {
    const workExperience = await WorkExperience.findAll();
    res.json(workExperience);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching work experience' });
  }
};

export const getWorkExperienceById = async (req: Request, res: Response) => {
  try {
    const workExperience = await WorkExperience.findByPk(req.params.id as string);
    if (!workExperience) {
      return res.status(404).json({ error: 'Work experience not found' });
    }
    res.json(workExperience);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching work experience' });
  }
};

export const createWorkExperience = async (req: Request, res: Response) => {
  try {
    const workExperience = await WorkExperience.create(req.body);
    res.status(201).json(workExperience);
  } catch (error) {
    res.status(400).json({ error: 'Error creating work experience' });
  }
};

export const updateWorkExperience = async (req: Request, res: Response) => {
  try {
    const workExperience = await WorkExperience.findByPk(req.params.id as string);
    if (!workExperience) {
      return res.status(404).json({ error: 'Work experience not found' });
    }
    await workExperience.update(req.body);
    res.json(workExperience);
  } catch (error) {
    res.status(400).json({ error: 'Error updating work experience' });
  }
};

export const deleteWorkExperience = async (req: Request, res: Response) => {
  try {
    const workExperience = await WorkExperience.findByPk(req.params.id as string);
    if (!workExperience) {
      return res.status(404).json({ error: 'Work experience not found' });
    }
    await workExperience.destroy();
    res.json({ message: 'Work experience deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting work experience' });
  }
};
