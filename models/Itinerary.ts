import { getPool } from '../lib/db';
import { v4 as uuidv4 } from 'uuid';

export interface Itinerary {
  id: string;
  title: string;
  description: string | null;
  startDate: Date;
  endDate: Date;
  locations: Location[];  
}
