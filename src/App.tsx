import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

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
