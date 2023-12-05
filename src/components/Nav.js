import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil";
import { LoginStateAtom } from "./member/LoginStateAtom";

const Nav = () => {

  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginStateAtom);
  const navigate = useNavigate();
  const name = localStorage.getItem("username");

  const logoutBtn = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    navigate("/");
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
    <div className="max-w-full flex justify-between items-center p-4 px-[5rem] font-sans">
      <div>
        <h1 className="text-now-blue text-3xl font-bold font-Jua"><Link to='/'>WasteNOW</Link></h1>
      </div>
      <ul className="flex gap-7 text-lg text-black">
        <li className="hover:text-[#83a8ff] hover:font-extrabold hover:text-xl transition-all"><Link to='/'>Home</Link></li>
        <li>About</li>
        {
          isLoggedIn
          ?<li className="hover:text-[#83a8ff] hover:font-extrabold hover:text-xl transition-all"><Link to={`/myPage/${name}`}>MyPage</Link></li>
          :<li className="hover:text-[#83a8ff] hover:font-extrabold hover:text-xl transition-all"><Link to='/login'>MyPage</Link></li>
        }
        {
          isLoggedIn
          ?<li className="hover:text-[#83a8ff] hover:font-extrabold hover:text-xl transition-all" onClick={logoutBtn}><Link to='/'>LogOut</Link></li> 
          : <li className="hover:text-[#83a8ff] hover:font-extrabold hover:text-xl transition-all"><Link to='/login'>LogIn</Link></li>
        }

      </ul>
    </div>
  )
}

export default Nav
