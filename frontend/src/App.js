
import Index from './pages';
import Contacts from './pages/contacts';
import './styles/style.css'
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Register from './pages/register';
import Login from './pages/login';
import About from './pages/about';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <div className="App">
      
    
      <Router>
        <Navigation/>
      <Routes>
      <Route path = "/" element={<Index/>}/>
        <Route path = "/contacts" element={<Contacts/>}/>
        <Route path = "/register" element={<Register/>}/>
        <Route path = "/login" element={<Login/>}/>
        <Route path = "/about" element={<About/>}/>
      </Routes>
      <Footer/>
      </Router>
    </div>
  );
}

export default App;
