import './App.css'
import { Routes, Route, useLocation} from 'react-router-dom';
import LandingPage from "./Views/LandingPage/LandingPage";
import Home from "./Views/Home/Home"
import Detail from './Views/Detail/Detail';
import Form from './Views/Form/Form';
import Nav from './components/Nav/Nav';

function App() {
  const {pathname} = useLocation();

  return (
    <div className='App'>
       {pathname !== '/' && <Nav/>}
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/:id' element={<Detail/>}/>
        <Route path='/form' element={<Form/>}/>
      </Routes>
    </div>
  )
}

export default App
