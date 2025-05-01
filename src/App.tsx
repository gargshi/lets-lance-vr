import Navbar from './components/Navbar';
function App() {
  return (
    <div className="bg-white min-h-screen text-gray-900 darkm">      
      <Navbar
        className="bg-white text-gray-900 darkm"
        title="Lets Lance"
        links={[
          { text: 'Home', href: '/' },
          { text: 'About', href: '/about' },
          { text: 'Services', href: '/services' },
          { text: 'Contact', href: '/contact' },
        ]}
      />
      
      <div className="container mx-auto mt-4">
        <h1 className="text-3xl font-bold">Welcome to Lets Lance</h1>
        <p className="mt-2">
          The only place where you can freelance with ease and incentives
        </p>
      </div>
    </div>
  );
}

export default App;