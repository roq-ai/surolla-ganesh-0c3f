import * as yup from 'yup';

export const exportOrderValidationSchema = yup.object().shape({
  status: yup.string().required(),
  sales_representative_id: yup.string().nullable(),
  export_manager_id: yup.string().nullable(),
});
