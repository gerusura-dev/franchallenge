import './App.css'
import 'bulma/css/bulma.css'
import Navbar from './components/template/navbar.tsx'
import Home from './components/Home'
import PointTable from './components/PointTable'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/point" element={<PointTable/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App
