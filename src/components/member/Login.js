import axios from "axios";
import { useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useRecoilState } from "recoil";
import { LoginStateAtom } from "./LoginStateAtom";

const Login = () => {

    const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginStateAtom);

    const loginId = useRef();
    const loginPwd = useRef();

    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (loginId.current.value === "" || loginPwd.current.value === "") {
            alert("아이디/비밀번호를 입력해주세요");
            return;
        }
        const loginData = {
            username: loginId.current.value,
            password: loginPwd.current.value
        };

        console.log(loginData);

        axios.post("http://10.125.121.214:8080/login", loginData)
            .then(function (resp) {
                console.log(resp.headers.get("Authorization"));
                localStorage.setItem("token", resp.headers.get("Authorization"));
                localStorage.setItem("username", loginId.current.value);
                console.log("성공")
                setIsLoggedIn(true);
                navigate("/nanoomlist");
            })
            .catch(function (err) {
                console.log(err);
                alert("아이디/비밀번호를 확인해주세요");
            })
    }

    const enterKeyDown = (e) =>{
        if(e.key == "Enter"){
            handleLogin(e);
        }
    }
    
    return (
        <div className="grow bg-gradient-to-b from-[#97b4fd] to-[#f4e8ff] flex flex-col">
            <div className="flex flex-col bg-white w-[30rem] m-auto h-[35rem] rounded-3xl shadow-lg p-5">
                <p className="text-center text-2xl font-bold mt-4">로그인</p>
                <div className="flex flex-col mt-[2rem] px-8">
                    <label htmlFor='loginId'>아이디</label>
                    <input type="text" ref={loginId} id="loginId" placeholder="아이디를 입력하세요"
                        onKeyDown={enterKeyDown}
                        className="border-solid border-gray-400 rounded-lg focus:border-[#5586f8] focus:ring-[#5586f8]" />
                </div>
                <div className="flex flex-col px-8 my-8">
                    <label htmlFor='loginPwd'>비밀번호</label>
                    <input type="password" ref={loginPwd} id="loginPwd" placeholder="비밀번호를 입력하세요"
                        onKeyDown={enterKeyDown}
                        className="border-solid border-gray-400 rounded-lg focus:border-[#5586f8] focus:ring-[#5586f8]" />
                </div>
                <div className="px-8 my-4">
                    <button
                        onClick={handleLogin}
                        className="flex h-[40px] items-center justify-center font-bold bg-[#5586f8] text-white text-lg w-full rounded-lg hover:bg-[#3672ff]">
                        로그인
                    </button>
                </div>
                
                <p className="m-auto text-[#5586f8] "><Link to='/signup'>회원이 아니신가요?</Link></p>
            </div>
        </div>
    )
}

export default Login