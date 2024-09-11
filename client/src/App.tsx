import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { SnackbarProvider } from 'src/providers/snackbar';
import { AccountsListPage } from '@/views/Accounts';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

const theme = createTheme();

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <QueryClientProvider client={queryClient}>
      <SnackbarProvider>
        <AccountsListPage />
      </SnackbarProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
