import { Toaster } from 'react-hot-toast';

import { AppRouting } from './routes/AppRouting';


export function App() {
  
  return (
    <main>
      <AppRouting />

      <Toaster position='bottom-center' />
    </main>
  );
}
