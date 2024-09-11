import { forwardRef, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

import SnackbarContext from './context';
import { AlertColor } from './types';

import { ErrorEventBus } from 'src/utils/eventBus';

interface AlertState {
  message: string;
  severity: AlertColor;
}

// eslint-disable-next-line prefer-arrow-callback
export const AlertWrapper = forwardRef(function AlertWrapper(
  props: AlertProps,
  ref: AlertProps['ref']
) {
  return <MuiAlert ref={ref} elevation={6} variant="filled" {...props} />;
});

function SnackbarProvider({ children }: PropsWithChildren<unknown>) {
  const [open, setOpen] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertState>({
    message: '',
    severity: 'success',
  });

  const showMessage = useCallback((message: string, severity: AlertColor = 'error') => {
    if (message) {
      setAlert({
        message,
        severity,
      });

      setOpen(true);
    }
  }, []);

  const errorListener = useCallback(
    ({ detail }: CustomEvent<string>) => {
      showMessage(detail, 'error');
    },
    [showMessage]
  );

  useEffect(() => {
    ErrorEventBus.on('responseError', errorListener);

    return () => {
      ErrorEventBus.off('responseError', errorListener);
    };
  }, [errorListener, showMessage]);

  const handleCloseAlert = useCallback(() => {
    setOpen(false);
  }, []);

  const handleClose = useCallback<NonNullable<SnackbarProps['onClose']>>((_event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }, []);

  return (
    <div>
      <SnackbarContext.Provider value={showMessage}>{children}</SnackbarContext.Provider>
      <Snackbar
        anchorOrigin={{
          horizontal: 'center',
          vertical: 'top',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <AlertWrapper onClose={handleCloseAlert} severity={alert.severity}>
          {alert.message}
        </AlertWrapper>
      </Snackbar>
    </div>
  );
}

export default SnackbarProvider;
