import React, { useState } from 'react';
import API_BASE from '../components/config';

interface LoginProps {
  className?: string;
}

const Login: React.FC<LoginProps>= ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginStatus,setLoginStatus] = useState('');
  const [statusClr,setStatusClr] = useState('gray-500');
  

  const dark_mode_init = () => {
      const darkMode = localStorage.getItem('dark-mode') === 'true';
      if (darkMode) {
        document.querySelectorAll('.darkm').forEach((el) => {
          el.classList.add('dark:bg-gray-900');
          el.classList.add('dark:text-white');
        });
        document.querySelectorAll('.transparent-btn').forEach((el) => {
          el.classList.add('dark:bg-transparent');
          el.classList.add('dark:text-white');
        });
      } else {
        document.querySelectorAll('.darkm').forEach((el) => {
          el.classList.remove('dark:bg-gray-900');
          el.classList.remove('dark:text-white');
        });
        document.querySelectorAll('.transparent-btn').forEach((el) => {
          el.classList.remove('dark:bg-transparent');
          el.classList.remove('dark:text-white');
        });
      }
    };
    // Initialize dark mode on component mount
    React.useEffect(() => {
      dark_mode_init();
    }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setLoginStatus('Please enter your email and password');
      setStatusClr('red-500');
      return;
    }
    
    console.log('Logging in:', email, password);
    setLoginStatus('Logging in...');
    setStatusClr('blue-500');
    fetch(`${API_BASE}/json_login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Login successful:', data);
      if (data.token) {
        localStorage.setItem('access_token', data.token);
        setLoginStatus('Logged in successfully.');
        setStatusClr('green-500');        
        window.location.href = '/dashboard'; // Redirect to dashboard or another page 
      } else {
        // alert(data.message || 'Login failed.');
        setLoginStatus('Login failed. '+ data.message);
        setStatusClr('red-500');
      }
      // Handle successful login (e.g., redirect or show a success message)
    })
    .catch((error) => {
      setLoginStatus('Login failed. '+ error.message);
      setStatusClr('red-500');
    });
  };

  return (
    <div className={ className + " max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow border border-gray-500"}>
      <h2 className="text-xl font-semibold  mb-4">Login</h2>      
      <div className={`w-full px-4 py-2 rounded`}>
          Please enter your email and password
      </div>
      <div className={`w-full ${!email || !password ? 'hidden' : ''} bg-${statusClr} text-white px-4 py-2 rounded`}>
          {loginStatus}
      </div>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className={ className  + " w-full mb-4 p-2 border border-gray-500 rounded" }
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={className + " w-full mb-4 p-2 border border-gray-500 rounded"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className={`w-full bg-blue-500 text-white py-2 rounded ${!email || !password ? 'opacity-50 cursor-not-allowed' : ''}`} disabled={!email || !password}>
          Login
        </button>
      </form>      
      <div className={`w-full px-4 mt-4 py-2 darkm rounded`}>
        <p className="text-center">
          Don't have an account?{' '}
          <a href="/register" className="text-blue-400 hover:underline">
            Register
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

