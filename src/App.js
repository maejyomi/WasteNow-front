import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Main from './components/Main';
import Nav from './components/Nav';
import Search from './components/Search';

function App() {
  return (
    <BrowserRouter>
      <main className='flex flex-col h-screen'>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />}></Route>
          <Route path='/search' element={<Search />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
