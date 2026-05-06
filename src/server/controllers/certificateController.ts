import { Request, Response } from 'express';
import Certificate from '../models/Certificate';

export const getAllCertificates = async (req: Request, res: Response) => {
  try {
    const certificates = await Certificate.findAll();
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching certificates' });
  }
};

export const getCertificateById = async (req: Request, res: Response) => {
  try {
    const certificate = await Certificate.findByPk(req.params.id as string);
    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }
    res.json(certificate);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching certificate' });
  }
};

export const createCertificate = async (req: Request, res: Response) => {
  try {
    const certificate = await Certificate.create(req.body);
    res.status(201).json(certificate);
  } catch (error) {
    res.status(400).json({ error: 'Error creating certificate' });
  }
};

export const updateCertificate = async (req: Request, res: Response) => {
  try {
    const certificate = await Certificate.findByPk(req.params.id as string);
    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }
    await certificate.update(req.body);
    res.json(certificate);
  } catch (error) {
    res.status(400).json({ error: 'Error updating certificate' });
  }
};

export const deleteCertificate = async (req: Request, res: Response) => {
  try {
    const certificate = await Certificate.findByPk(req.params.id as string);
    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }
    await certificate.destroy();
    res.json({ message: 'Certificate deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting certificate' });
  }
};
