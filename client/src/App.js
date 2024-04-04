import './styles/App.css';
import Home from './Home';
import Mens from './Mens';
import Womens from './Women';
import Login from './Login';
import Cart from './Cart';
import Signup from './Signup';
import Profile from './Profile';
import Wishlist from './Wishlist';
import Product from './Product';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route  path="/signup" element={<Signup />} />
          <Route path='home' element={<Home/>} />
          <Route path="/mens" element={<Mens />} />
          <Route path="/womens" element={<Womens />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          {/* <Route path='product' element={<Product />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;


