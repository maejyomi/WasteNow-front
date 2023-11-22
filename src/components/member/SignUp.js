import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const id = useRef();
    const pwd = useRef();
    const pwdCheck = useRef();

    const navigate = useNavigate();

    const handleSignUp = () => {
        if(id.current.value==="" || pwd.current.value === "" || pwdCheck.current.value === ""){
            alert("모든 항목을 입력해주세요");
            return;
        }
        if(pwd.current.value != pwdCheck.current.value){
            alert("비밀번호를 확인하세요");
            pwdCheck.current.focus();
            return;
        }

        const signUpData = {
            username : id.current.value,
            password : pwd.current.value
        };
        
        axios.post("http://10.125.121.214:8080/api/signup",signUpData)
                .then((resp)=>{

                    alert("회원가입이 완료되었습니다.\n로그인 페이지로 돌아갑니다.");
                    navigate("/login");
                })
                .catch((err) =>{
                    console.log(err);
                    alert("이미 존재하는 아이디입니다");
                    id.current.focus();
                });

    }

    return (
        <div className="grow bg-gradient-to-b from-[#97b4fd] to-[#f4e8ff] flex flex-col">
            <div className="flex flex-col bg-white w-[30rem] m-auto h-[35rem] rounded-3xl shadow-lg p-5">

                <p className="px-8 text-left text-xl font-bold mt-4 text-now-blue">회원가입을 위해</p>
                <p className="px-8 text-left text-xl font-bold text-now-blue">정보를 입력해 주세요</p>
                <div className="flex flex-col mt-[2rem] px-8 ">
                    <label htmlFor='signUpId'>아이디</label>
                    <input type="text" ref={id} id="signUpId" placeholder="아이디를 입력하세요"
                        className="border-solid border-gray-400 rounded-lg focus:border-[#5586f8] focus:ring-[#5586f8]" />
                </div>
                <div className="flex flex-col my-8 px-8 ">
                    <label htmlFor='signUpPwd'>비밀번호</label>
                    <input type="password" ref={pwd} id="signUpPwd" placeholder="비밀번호를 입력하세요"
                        className="border-solid border-gray-400 rounded-lg focus:border-[#5586f8] focus:ring-[#5586f8]" />
                </div>
                <div className="flex flex-col mb-8 px-8 ">
                    <label htmlFor='signUpPwdCheck'>비밀번호 확인</label>
                    <input type="password" ref={pwdCheck} id="signUpPwdCheck" placeholder="비밀번호를 입력하세요"
                        className="border-solid border-gray-400 rounded-lg focus:border-[#5586f8] focus:ring-[#5586f8]" />
                </div>
                <div className="mt-4 px-8 ">
                    <button
                        onClick={handleSignUp}
                        className="flex h-[40px] items-center justify-center font-bold bg-[#5586f8] text-white text-lg w-full rounded-lg hover:bg-[#3672ff]">
                        가입하기
                    </button>
                </div>

            </div>
        </div>
    )
}

export default SignUp
