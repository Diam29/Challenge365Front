import './App.css'
import Home from './Components/Home/Home.jsx'
import Landing from './Components/Landing/Landing.jsx'
import { Route, Routes } from 'react-router-dom'
import PaymentCreate from './Components/FormsPayments/PaymentCreate'
import { Toaster } from 'react-hot-toast'
import { HelmetProvider } from 'react-helmet-async'
function App() {

  return (
    <>
    <HelmetProvider>
          <Toaster position='bottom-right'
        toastOptions={{
          style: {
            background: 'linear-gradient(#944E6380, #B47B8480)'
          }
        }}
        />
    <Routes>

      <Route path='/' element={<Landing/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/payment' element={<PaymentCreate/>}/>

    </Routes>

    </HelmetProvider>

    </>
  )
}

export default App
