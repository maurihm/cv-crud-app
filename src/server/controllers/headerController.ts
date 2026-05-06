import { Request, Response } from 'express';
import Header from '../models/Header';

export const getAllHeaders = async (req: Request, res: Response) => {
  try {
    const headers = await Header.findAll();
    res.json(headers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching headers' });
  }
};

export const getHeaderById = async (req: Request, res: Response) => {
  try {
    const header = await Header.findByPk(req.params.id);
    if (!header) {
      return res.status(404).json({ error: 'Header not found' });
    }
    res.json(header);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching header' });
  }
};

export const createHeader = async (req: Request, res: Response) => {
  try {
    const header = await Header.create(req.body);
    res.status(201).json(header);
  } catch (error) {
    res.status(400).json({ error: 'Error creating header' });
  }
};

export const updateHeader = async (req: Request, res: Response) => {
  try {
    const header = await Header.findByPk(req.params.id);
    if (!header) {
      return res.status(404).json({ error: 'Header not found' });
    }
    await header.update(req.body);
    res.json(header);
  } catch (error) {
    res.status(400).json({ error: 'Error updating header' });
  }
};

export const deleteHeader = async (req: Request, res: Response) => {
  try {
    const header = await Header.findByPk(req.params.id);
    if (!header) {
      return res.status(404).json({ error: 'Header not found' });
    }
    await header.destroy();
    res.json({ message: 'Header deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting header' });
  }
};
