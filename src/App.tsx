import { Toaster } from 'react-hot-toast';

import { AuthProvider } from './providers';
import { AppRouting } from './routes/AppRouting';

export function App() {
  return (
    <AuthProvider>
      <main>
        <AppRouting />

        <Toaster position='bottom-center' />
      </main>
    </AuthProvider>
  );
}
