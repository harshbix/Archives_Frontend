import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import QueryClientProvider from './providers/QueryClientProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
