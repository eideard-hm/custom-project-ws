import { Toaster } from 'react-hot-toast';

import { AuthProvider, DashboardProvider } from './providers';
import { AppRouting } from './routes/AppRouting';

export function App() {
  return (
    <AuthProvider>
      <DashboardProvider>
          <AppRouting />

          <Toaster position='bottom-center' />
      </DashboardProvider>
    </AuthProvider>
  );
}
