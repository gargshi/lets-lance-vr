import React, { useState } from 'react';

interface RegisterProps {
  className?: string;
}

const Register: React.FC<RegisterProps> = ({ className = '' }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Registering:', name, email, password);
    // Add API call here
  };

  return (
    <div className={className + " max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow border"}>
      <h2 className={className + " text-xl font-bold mb-4"}>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          className={className + " w-full mb-2 p-2 border rounded"}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className={className + " w-full mb-2 p-2 border rounded"}
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
        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
