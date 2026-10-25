export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: 'active' | 'inactive' | 'lead';
  avatar?: string;
  createdAt: string;
}

export interface Deal {
  id: string;
  title: string;
  value: number;
  contactId: string;
  contactName: string;
  stage: 'new' | 'negotiation' | 'proposal' | 'closed_won' | 'closed_lost';
  createdAt: string;
  expectedClose: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  dueDate: string;
  assignee: string;
  relatedTo?: string;
}

export type Page = 'dashboard' | 'contacts' | 'deals' | 'tasks';
