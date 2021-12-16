import './index.css'
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Navbar from './components/Navbar/Navbar';

import { BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';

function App() {
  const { authIsReady, user } = useAuthContext()
  return (
    <div className="App">
      {
        authIsReady && <BrowserRouter>
          <Navbar />
          <Routes>
            {
              user && <Route path="/" element={<Home />} />
            }
            {
              !user && <Route path="/" element={<Navigate replace to="/login" />}/>
            }
            {
              !user && <Route path="/login" element={<Login />} />
            }
            {
              user && <Route path="/login" element={<Navigate replace to = "/" />} />
            }
            {
              !user && <Route path="/signup" element={<Signup />} />
            }
            {
              user && <Route path="/signup" element={<Navigate replace to = "/" />} />
            }
            {/* <Route path="/signup" element={<Signup />} /> */}
          </Routes>
        </BrowserRouter>
      }
    </div>
  );
}

export default App
