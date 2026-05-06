import { Request, Response } from 'express';
import Skill from '../models/Skill';

export const getAllSkills = async (req: Request, res: Response) => {
  try {
    const skills = await Skill.findAll();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching skills' });
  }
};

export const getSkillById = async (req: Request, res: Response) => {
  try {
    const skill = await Skill.findByPk(req.params.id as string);
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    res.json(skill);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching skill' });
  }
};

export const createSkill = async (req: Request, res: Response) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    res.status(400).json({ error: 'Error creating skill' });
  }
};

export const updateSkill = async (req: Request, res: Response) => {
  try {
    const skill = await Skill.findByPk(req.params.id as string);
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    await skill.update(req.body);
    res.json(skill);
  } catch (error) {
    res.status(400).json({ error: 'Error updating skill' });
  }
};

export const deleteSkill = async (req: Request, res: Response) => {
  try {
    const skill = await Skill.findByPk(req.params.id as string);
    if (!skill) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    await skill.destroy();
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting skill' });
  }
};
