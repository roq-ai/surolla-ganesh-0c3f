import * as yup from 'yup';

export const qualityCheckValidationSchema = yup.object().shape({
  batch_number: yup.string().required(),
  approval_status: yup.string().required(),
  quality_control_officer_id: yup.string().nullable(),
});
