import express, { Request, Response } from 'express';
import pool from '../db';
import { Router } from 'express';
import { Invoice } from '../types';

const router = Router();

// Create a new invoice
router.post('/', async (req: Request, res: Response) => {
  try {
    const { ticket_id, amount, description } = req.body;
    const result = await pool.query<Invoice>(
      'INSERT INTO invoices (ticket_id, amount, description) VALUES ($1, $2, $3) RETURNING *',
      [ticket_id, amount, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating invoice' });
  }
});

// Get invoice by ticket ID
router.get('/ticket/:ticketId', async (req: Request, res: Response) => {
  try {
    const { ticketId } = req.params;
    const result = await pool.query<Invoice>(
      'SELECT * FROM invoices WHERE ticket_id = $1',
      [ticketId]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching invoice' });
  }
});

// Update invoice status
router.patch('/:id/status', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const result = await pool.query<Invoice>(
      'UPDATE invoices SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating invoice status' });
  }
});

export default router; 