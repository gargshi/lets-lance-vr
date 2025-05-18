import React, { useState } from 'react';
import API_BASE from '../components/config';

interface RegisterProps {
  className?: string;
}



const Register: React.FC<RegisterProps> = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('normal'); // Default role is 'user'
  const [registerStatus, setRegisterStatus] = useState({
    email: { status: '', color: '' },
    password: { status: '', color: '' },
  });
  // const [statusClr, setStatusClr] = useState('gray-500');
  const [canRegister, setCanRegister] = useState(false);
  
  // Function to initialize dark mode
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

  
  const checkEmailFormat = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setRegisterStatus(prev => ({
        ...prev,
        email: { status: 'Email is required', color: 'red-500' },
      }));
    } else if (!emailRegex.test(email)) {
      setRegisterStatus(prev => ({
        ...prev,
        email: { status: 'Email format is invalid', color: 'red-500' },
      }));      
    } else {
      setRegisterStatus(prev => ({
        ...prev,
        email: { status: 'Email is valid', color: 'green-500' },
      }));      
    }
  }
  const checkPasswordMatch = () => {
    if (!password && !repassword) {
      setRegisterStatus(prev => ({
        ...prev,
        password: { status: 'Password is required', color: 'red-500' },
      }));      
    } else if (password === repassword) {
      setRegisterStatus(prev => ({
        ...prev,
        password: { status: 'Passwords match', color: 'green-500' },
      }));      
    } else {
      setRegisterStatus(prev => ({
        ...prev,
        password: { status: 'Passwords do not match', color: 'red-500' },
      }));      
    }
  };

  React.useEffect(() => { 
    checkEmailFormat();
  }, [email]);

  React.useEffect(() => { 
    checkPasswordMatch();
  }, [password, repassword]);

  React.useEffect(() => {
    setCanRegister(registerStatus.email.status === 'Email is valid' && registerStatus.password.status === 'Passwords match');
  }, [registerStatus]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRole('normal'); // Set default role to 'user' on form submission
    console.log('Registering:', name, email, password);
    if (!email || !password) {
      setRegisterStatus(prev => ({
        ...prev,
        password: { status: 'Password is required', color: 'red-500' },
        email: { status: 'Email is required', color: 'red-500' },
      }));
      return;
    }
    if (password !== repassword) {      
      setRegisterStatus(prev => ({
        ...prev,
        password: { status: 'Passwords do not match', color: 'red-500' },
      }))
      return;
    }    
    
    // Add API call here
    fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password, role }),
    })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data);
      // Handle success (e.g., redirect or show a success message)        
      window.location.href = '/login'; // Redirect to login page on success
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
    });
  };

  return (
    <div className={className + " max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow border border-gray-500"}>
      <h2 className={className + " text-xl font-bold mb-4"}>Register</h2>      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className={className + " w-full mb-2 p-2 border border-gray-500 rounded"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className={className + " w-full mb-2 p-2 border border-gray-500 rounded"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div className={`bg-${registerStatus.email.color} transition-all duration-300 mb-2 px-2 ease-in-out `}>{registerStatus.email.status}</div>
        <input
          type="password"
          placeholder="Password"
          className={className + " w-full mb-2 p-2 border border-gray-500 rounded"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />        
        <input
          type="password"
          placeholder="Retype Password"
          className={className + " w-full mb-2 p-2 border border-gray-500 rounded"}
          value={repassword}
          onChange={(e) => setRePassword(e.target.value)}
        />
        <div className={`bg-${registerStatus.password.color} transition-all duration-300 mb-2 px-2 ease-in-out`}>{registerStatus.password.status}</div>
        <button type="submit" className={`w-full ${canRegister ? 'bg-blue-900 hover:bg-green-500 cursor-pointer' : ' bg-gray-500 opacity-50 cursor-not-allowed'} text-white py-2 rounded transition duration-300`} disabled={!canRegister}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
