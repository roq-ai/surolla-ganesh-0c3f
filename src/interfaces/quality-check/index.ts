import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface QualityCheckInterface {
  id?: string;
  batch_number: string;
  approval_status: string;
  quality_control_officer_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface QualityCheckGetQueryInterface extends GetQueryInterface {
  id?: string;
  batch_number?: string;
  approval_status?: string;
  quality_control_officer_id?: string;
}
