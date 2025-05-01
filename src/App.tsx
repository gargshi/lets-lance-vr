import './App.css'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <div>
        <Navbar title="My App" links={[
            { text: 'Home', href: '/' },
            { text: 'About', href: '/about' },
            { text: 'Services', href: '/services' },
            { text: 'Contact', href: '/contact' },
          ]} />        
      </div>
    </>
  )
}

export default App
