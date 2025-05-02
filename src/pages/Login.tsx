import React, { useState } from 'react';
import API_BASE from '../components/config';

interface LoginProps {
  className?: string;
}

const Login: React.FC<LoginProps>= ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    console.log('Logging in:', email, password);
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
        location.href = '/dashboard'; // Redirect to dashboard or another page 

      } else {
        alert(data.message || 'Login failed.');
      }
      // Handle successful login (e.g., redirect or show a success message)
    })
    .catch((error) => {
      console.error('Error logging in:', error);
      // Handle error (e.g., show an error message)
    });
  };

  return (
    <div className={ className + " max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow border"}>
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          className={ className  + " w-full mb-2 p-2 border rounded" }
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={className + " w-full mb-2 p-2 border rounded"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
