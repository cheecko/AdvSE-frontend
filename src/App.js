import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter>
      <Route path='/' component={Home} exact />
    </BrowserRouter>
  );
}

export default App;
