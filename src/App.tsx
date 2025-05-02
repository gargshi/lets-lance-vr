import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import About from './pages/About';
function App() {
  return (
    <div className="bg-white min-h-screen text-gray-900 darkm">      
      <Navbar
        className="bg-white text-gray-900 darkm"
        title="Lets Lance"
        links={[
          { text: 'Home', href: '/' },
          { text: 'Contact Us', href: '/contact' },
          { text: 'About Us', href: '/about' },
        ]}
      />
      <div className="container mx-auto mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login className="darkm" />} />
          <Route path="/register" element={<Register className="darkm" />} />
        </Routes>
      </div>
    </div>
  );
}

function Home() {
  return (
    <>
      <h1 className="text-3xl font-bold">Welcome to Lets Lance</h1>
      <p className="mt-2">The only place where you can freelance with ease and incentives.</p>
    </>
  );
}

export default App;