import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header';
import Dashboard from './Components/Dashboard';
import AddClient from './Components/AddClient';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/' Component={Dashboard} />
          <Route exact path='/addClient' Component={AddClient} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
