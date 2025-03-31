import express, { Request, Response } from 'express';
import pool from '../db';
import { Router } from 'express';
import { Ticket } from '../types';

const router = Router();

// Create a new ticket
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, image_url } = req.body;
    const result = await pool.query<Ticket>(
      'INSERT INTO tickets (name, email, phone, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, email, phone, image_url]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creating ticket' });
  }
});

// Get all tickets
router.get('/', async (req: Request, res: Response) => {
  try {
    const result = await pool.query<Ticket>('SELECT * FROM tickets ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching tickets' });
  }
});

// Get ticket by ID
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = await pool.query<Ticket & { amount: number; invoice_status: string }>(
      `SELECT t.*, i.amount, i.status as invoice_status 
       FROM tickets t 
       LEFT JOIN invoices i ON t.id = i.ticket_id 
       WHERE t.id = $1`,
      [id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error fetching ticket' });
  }
});

// Update ticket status
router.patch('/:id/status', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    const result = await pool.query<Ticket>(
      'UPDATE tickets SET status = $1 WHERE id = $2 RETURNING *',
      [status, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Ticket not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error updating ticket status' });
  }
});

export default router; 