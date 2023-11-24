import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './components/main/Main';
import Nav from './components/Nav';
import Search from './components/Search';
import Login from './components/member/Login';
import SignUp from './components/member/SignUp';
import NanoomList from './components/board/NanoomList';
import NanoomPost from './components/board/NanoomPost';
import { RecoilRoot } from 'recoil';
import NanoomDetail from './components/board/NanoomDetail';

function App() {
  return (
    <BrowserRouter>
      <main className='flex flex-col h-screen'>
        <RecoilRoot>
          <Nav />
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path='/search' element={<Search />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<SignUp />}></Route>
            <Route path='/nanoomlist' element={<NanoomList />}></Route>
            <Route path='/nanoompost' element={<NanoomPost />}></Route>
            <Route path='/nanoomdetail/:postId' element={<NanoomDetail />}></Route>
          </Routes>
        </RecoilRoot>
      </main>
    </BrowserRouter>
  );
}

export default App;