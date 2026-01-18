import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
import { DataProvider } from './context/Data';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
    <DataProvider>
      <App />
    </DataProvider>
);
