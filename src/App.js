import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import Nav from './components/Nav';
import Search from './components/Search';
import Login from './components/Login';
import SignUp from './components/SignUp';
import NanoomList from './components/NanoomList';

function App() {
  return (
    <BrowserRouter>
      <main className='flex flex-col h-screen'>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path='/search' element={<Search />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/nanoomlist' element={<NanoomList />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
