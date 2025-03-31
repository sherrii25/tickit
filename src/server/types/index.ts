export interface Ticket {
  id: number;
  name: string;
  email: string;
  phone: string;
  image_url?: string;
  status: 'pending' | 'in_review' | 'quoted' | 'accepted' | 'rejected';
  created_at: Date;
  updated_at: Date;
}

export interface Invoice {
  id: number;
  ticket_id: number;
  amount: number;
  description?: string;
  status: string;
  created_at: Date;
  updated_at: Date;
} 