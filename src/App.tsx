import Navbar from './components/Navbar';
// import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Contact from './pages/Contact';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Logout from './pages/Logout';
import { dark_mode_init } from './utils_tsx/darkmode';
import React from 'react';
function App() {
  React.useEffect(() => {
    dark_mode_init();    
  })
  return (
    <div className="min-h-screen darkm">      
      <Navbar
        className="bg-white text-gray-900  darkm"
        title="Lets Lance"
        links={[
          { text: 'Home', href: '/' },
          { text: 'Contact Us', href: '/contact' },
          { text: 'About Us', href: '/about' },
        ]}
      />
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login className="darkm" />} />
          <Route path="/register" element={<Register className="darkm" />} />
          <Route path="/dashboard" element={<Dashboard className="darkm" />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </>
    </div>
  );
}

function Home() {
  

  
  return (
    <>
      <div className="min-h-screen">
        {/* Hero Section */}
          <section className="shadow-md">
            <div className={`max-w-7xl mx-auto px-6 py-20 text-center bg-white text-gray-800 darkm `}>
              <h1 className="text-5xl font-bold mb-4">Welcome to Let's Lance</h1>
              <p className="text-xl mb-6">Connect with top freelancers or land your dream gigs — all in one place.</p>
              <div className="flex justify-center space-x-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-full" onClick={() => window.location.href = '/register'}>
                  Get Started
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-6 py-3 rounded-full" onClick={() => window.location.href = '/about'}>
                  Learn More
                </button> 
              </div>
            </div>
          </section>

        {/* About Section */}
        <section className="py-16 bg-white text-gray-800 darkm ">          
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">Why Let's Lance?</h2>
            <p className="text-lg text-white-600">
              We're building a community where freelancers thrive and clients succeed — without platform chaos or high fees.
            </p>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-white darkm">          
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
            <div className="border border-gray-500 px-4 py-8">
              <h3 className="text-xl font-semibold mb-2">1. Sign Up</h3>
              <p>Create your profile as a freelancer or client in minutes.</p>
            </div>
            <div className="border border-gray-500 px-4 py-8">
              <h3 className="text-xl font-semibold mb-2">2. Connect</h3>
              <p>Post jobs or send proposals to projects you love.</p>
            </div>
            <div className="border border-gray-500 px-4 py-8">
              <h3 className="text-xl font-semibold mb-2">3. Get Paid</h3>
              <p>Work securely and earn through our trusted system.</p>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50 text:gray-800 darkm">          
          <div className="max-w-6xl mx-auto px-6 darkm">
            <h2 className="text-3xl font-bold text-center mb-10">Popular Categories</h2>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              {["Web Development", "Design", "Marketing", "Writing"].map((cat) => (
                <div key={cat} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-101 transition-all duration-300 darkm border border-gray-500 group">
                  <p className="text-lg font-semibold group-hover:cursor-pointer group-hover:translate-x-1 transition-all duration-300">{cat}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white darkm">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">What Users Say</h2>
            <div className="space-y-6">
              <blockquote className="italic">"Let's Lance helped me land gigs that paid better than my full-time job!" – Alex, Freelancer</blockquote>
              <blockquote className="italic">"We found amazing talent in just hours, not days." – Priya, Startup Founder</blockquote>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        {
          (localStorage.getItem('access_token')) ? <>
             <section className="py-16 bg-blue-600 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">View Your Dashboard</h2>              
              <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100" onClick={() => window.location.replace("/dashboard")}>
                View Dashboard
              </button>
            </section>           
          </> : <>
            <section className="py-16 bg-blue-600 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Join the Future of Freelancing</h2>
              <p className="mb-6">Start hiring or freelancing today. No middlemen. No fuss.</p>
              <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full hover:bg-gray-100" onClick={() => window.location.replace("/register")}>
                Create Your Account
              </button>
            </section>
          </>
        }
        

        {/* Footer */}
        <footer className="bg-gray-800 text-gray-300 py-8">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2025 Let's Lance. All rights reserved.</p>
            <div className="space-x-4 mt-4 md:mt-0">
              <a href="#" className="hover:underline">Privacy</a>
              <a href="#" className="hover:underline">Terms</a>
              <a href="#" className="hover:underline">Contact</a>
            </div>
          </div>
        </footer>
    </div>
    </>
  );
}

export default App;