
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import CoinPage from './pages/CoinPage'

function App() {

  return (
    <BrowserRouter>
        <div className='flex flex-col h-screen'>
        <Header />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/coin/:id' element={<CoinPage />} />
        </Routes>
        </div>
    </BrowserRouter>
  )
}

export default App
