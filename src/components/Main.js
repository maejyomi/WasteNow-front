import { useState } from 'react';
import search from '../images/search.jpg';
import share from '../images/share.jpg';
import MainBtn from './MainBtn';
import { useNavigate } from 'react-router-dom';

const Main = () => {
  const navigate = useNavigate();
  const checkLogin = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");

    } else {
      navigate("/nanoomlist");
    }
  }

  return (
    <div className="grow bg-gradient-to-b from-[#83a8ff] to-[#ffffff] flex flex-col">
      <div className="text-now-blue my-16 ml-[10rem] lg:ml-[20rem]">
        <h1 className="text-6xl font-bold text-white drop-shadow-md ">WasteNOW</h1>
        <p className="text-[2rem] mt-[1rem] ml-[5rem] font-bold tracking-wide text-[#f4f8fd] drop-shadow-lg">
          지금, 대형 폐기물의 수수료를 책임지다
        </p>
      </div>
      <div className="flex gap-40 items-center justify-center text-center">
        <MainBtn link='/search' imgSrc={search} imgAlt='검색 이미지' title='검색' />
        <MainBtn handleClick={checkLogin} imgSrc={share} imgAlt='나눔 이미지' title='나눔' />
      </div>
    </div>
  )
}

export default Main
