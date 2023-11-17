import { Link } from "react-router-dom"

const Nav = () => {
  return (
    <div className="max-w-full flex justify-between items-center p-5 px-[5rem] font-sans">
        <div>
            <h1 className="text-now-blue text-3xl font-bold"><Link to='/'>WasteNOW</Link></h1>
        </div>
        <ul className="flex gap-7 text-lg text-black">
            <li className="hover:text-[#83a8ff] hover:font-extrabold hover:text-xl hover:drop-shadow-md transition-all"><Link to='/'>Home</Link></li>
            <li>About</li>
            <li>마이페이지</li>
            <li>로그인</li>
        </ul>
    </div>
  )
}

export default Nav
