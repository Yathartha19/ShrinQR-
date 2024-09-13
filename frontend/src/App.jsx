import Url from './components/Url'
import './main.css'
import logo from './assets/logo.png'

function App() {

  return (
    <>
      <img src={logo} className='absolute h-20 top-5 left-1/2 transform -translate-x-1/2'/>
      <Url />
    </>
  )
}

export default App
