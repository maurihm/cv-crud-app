import { Request, Response } from 'express';
import Interest from '../models/Interest';

export const getAllInterests = async (req: Request, res: Response) => {
  try {
    const interests = await Interest.findAll();
    res.json(interests);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching interests' });
  }
};

export const getInterestById = async (req: Request, res: Response) => {
  try {
    const interest = await Interest.findByPk(req.params.id as string);
    if (!interest) {
      return res.status(404).json({ error: 'Interest not found' });
    }
    res.json(interest);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching interest' });
  }
};

export const createInterest = async (req: Request, res: Response) => {
  try {
    const interest = await Interest.create(req.body);
    res.status(201).json(interest);
  } catch (error) {
    res.status(400).json({ error: 'Error creating interest' });
  }
};

export const updateInterest = async (req: Request, res: Response) => {
  try {
    const interest = await Interest.findByPk(req.params.id as string);
    if (!interest) {
      return res.status(404).json({ error: 'Interest not found' });
    }
    await interest.update(req.body);
    res.json(interest);
  } catch (error) {
    res.status(400).json({ error: 'Error updating interest' });
  }
};

export const deleteInterest = async (req: Request, res: Response) => {
  try {
    const interest = await Interest.findByPk(req.params.id as string);
    if (!interest) {
      return res.status(404).json({ error: 'Interest not found' });
    }
    await interest.destroy();
    res.json({ message: 'Interest deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting interest' });
  }
};
