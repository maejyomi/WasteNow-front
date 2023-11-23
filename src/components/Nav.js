import { useEffect } from "react";
import { Link } from "react-router-dom"
import { useRecoilState } from "recoil";
import { LoginStateAtom } from "./member/LoginStateAtom";

const Nav = () => {

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginStateAtom);

  const logoutBtn = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false)
  }

  useEffect(()=>{
    const token = localStorage.getItem("token");
    if(!token){
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }

  },[])

  return (
    <div className="max-w-full flex justify-between items-center p-5 px-[5rem] font-sans">
      <div>
        <h1 className="text-now-blue text-3xl font-bold"><Link to='/'>WasteNOW</Link></h1>
      </div>
      <ul className="flex gap-7 text-lg text-black">
        <li className="hover:text-[#83a8ff] hover:font-extrabold hover:text-xl transition-all"><Link to='/'>Home</Link></li>
        <li>About</li>
        <li>마이페이지</li>
        {
          isLoggedIn
          ?<li className="hover:text-[#83a8ff] hover:font-extrabold hover:text-xl transition-all" onClick={logoutBtn}><Link to='/'>로그아웃</Link></li> 
          : <li className="hover:text-[#83a8ff] hover:font-extrabold hover:text-xl transition-all"><Link to='/login'>로그인</Link></li>
        }

      </ul>
    </div>
  )
}

export default Nav
