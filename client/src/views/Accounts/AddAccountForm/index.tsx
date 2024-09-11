import { useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  MenuItem,
  Modal,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { AccountData } from 'src/types/accounts';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     position: 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     outline: 'none',
//     boxShadow: theme.shadows[20],
//     width: 700,
//     maxHeight: '100%',
//     overflowY: 'auto',
//     maxWidth: '100%',
//   },
//   container: {
//     marginTop: theme.spacing(3),
//     height: 200,
//   },
// }));

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AccountData) => void;
  className?: string;
  loading: boolean;
}

const ACCOUNT_TYPES = [
  {
    value: 'SENDING',
    label: 'Sending',
  },
  {
    value: 'RECEIVING',
    label: 'Receiving',
  },
];

const AddAccountModalSchema = yup.object().shape({
  number: yup.string().required(),
  name: yup.string().required(),
  iban: yup.string().required(),
  address: yup.string(),
  amount: yup.number(),
  type: yup.string().oneOf(['SENDING', 'RECEIVING']).required(),
});

const defaultValues: AccountData = {
  number: '',
  name: '',
  iban: '',
  address: '',
  amount: 0,
  type: 'SENDING',
};

export function AddAccountModal({
  open,
  onClose,
  className,
  onSubmit,
  loading,
  ...rest
}: BaseModalProps) {
  const resolver = yupResolver(AddAccountModalSchema);
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<AccountData>({
    defaultValues,
    resolver,
  });

  const handleClick = useCallback(
    (data: AccountData) => {
      onSubmit(data);
    },
    [onSubmit]
  );

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  if (!open) {
    return null;
  }

  return (
    <Modal onClose={onClose} open={open} disableEnforceFocus>
      <Card {...rest}>
        <CardHeader title="Add account" />
        <Divider />
        <CardContent>
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                label="Account number"
                margin="normal"
                variant="outlined"
                size="small"
                fullWidth
                error={Boolean(errors?.number)}
                helperText={errors?.number?.message}
              />
            )}
            name="number"
            control={control}
          />
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                label="Account name"
                margin="normal"
                variant="outlined"
                size="small"
                multiline
                rows={3}
                fullWidth
                error={Boolean(errors?.name)}
                helperText={errors?.name?.message}
              />
            )}
            name="name"
            control={control}
          />
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                label="IBAN"
                margin="normal"
                variant="outlined"
                size="small"
                multiline
                rows={3}
                fullWidth
                error={Boolean(errors?.iban)}
                helperText={errors?.iban?.message}
              />
            )}
            name="iban"
            control={control}
          />
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                label="Address"
                margin="normal"
                variant="outlined"
                size="small"
                multiline
                rows={3}
                fullWidth
                error={Boolean(errors?.address)}
                helperText={errors?.address?.message}
              />
            )}
            name="address"
            control={control}
          />
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                label="Amount"
                margin="normal"
                variant="outlined"
                size="small"
                multiline
                rows={3}
                fullWidth
                error={Boolean(errors?.amount)}
                helperText={errors?.amount?.message}
              />
            )}
            name="amount"
            control={control}
          />
          <Controller
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Type"
                margin="normal"
                variant="outlined"
                size="small"
                multiline
                rows={3}
                fullWidth
                error={Boolean(errors?.type)}
                helperText={errors?.type?.message}
              >
                {ACCOUNT_TYPES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
            name="type"
            control={control}
          />
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button onClick={onClose}>Cancel</Button>
          <LoadingButton
            loading={loading}
            color="primary"
            onClick={handleSubmit(handleClick)}
            variant="contained"
          >
            Add
          </LoadingButton>
        </CardActions>
      </Card>
    </Modal>
  );
}
