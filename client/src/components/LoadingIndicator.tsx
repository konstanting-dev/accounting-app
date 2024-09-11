import { CircularProgress, CircularProgressProps } from '@mui/material';

const CircularIndeterminate: React.FC<CircularProgressProps> = (props) => (
  <CircularProgress color="secondary" {...props} />
);

export const LoadingIndicator = () => (
  <div
    style={{
      position: 'absolute',
      zIndex: 110,
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'rgba(255,255,255,0.8)',
    }}
  >
    <CircularIndeterminate size={24} />
  </div>
);
