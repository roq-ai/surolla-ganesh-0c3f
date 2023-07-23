import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createQualityCheck } from 'apiSdk/quality-checks';
import { qualityCheckValidationSchema } from 'validationSchema/quality-checks';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { QualityCheckInterface } from 'interfaces/quality-check';

function QualityCheckCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: QualityCheckInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createQualityCheck(values);
      resetForm();
      router.push('/quality-checks');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<QualityCheckInterface>({
    initialValues: {
      batch_number: '',
      approval_status: '',
      quality_control_officer_id: (router.query.quality_control_officer_id as string) ?? null,
    },
    validationSchema: qualityCheckValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Quality Checks',
              link: '/quality-checks',
            },
            {
              label: 'Create Quality Check',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Quality Check
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.batch_number}
            label={'Batch Number'}
            props={{
              name: 'batch_number',
              placeholder: 'Batch Number',
              value: formik.values?.batch_number,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.approval_status}
            label={'Approval Status'}
            props={{
              name: 'approval_status',
              placeholder: 'Approval Status',
              value: formik.values?.approval_status,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'quality_control_officer_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/quality-checks')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'quality_check',
    operation: AccessOperationEnum.CREATE,
  }),
)(QualityCheckCreatePage);
