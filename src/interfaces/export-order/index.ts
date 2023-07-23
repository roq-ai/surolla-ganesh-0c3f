import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ExportOrderInterface {
  id?: string;
  status: string;
  sales_representative_id?: string;
  export_manager_id?: string;
  created_at?: any;
  updated_at?: any;

  user_export_order_sales_representative_idTouser?: UserInterface;
  user_export_order_export_manager_idTouser?: UserInterface;
  _count?: {};
}

export interface ExportOrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  sales_representative_id?: string;
  export_manager_id?: string;
}
