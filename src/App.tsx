import './App.css';
import { AppRoutes } from './routes/AppRoutes';
import './configure-amplify';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './react-query.client';
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  );
}

export default App;
