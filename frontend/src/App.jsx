import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
;
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import Products from './pages/Products/Products';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/products" element={<Products/>}></Route>
          <Route path="/contact" element={<Contact/>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
