import { AlertProps } from '@mui/lab';

export type SnackbarContextType = (message: string, color?: AlertColor) => void;

export type AlertColor = AlertProps['severity'];
