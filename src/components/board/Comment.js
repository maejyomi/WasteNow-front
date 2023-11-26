import axios from "axios";
import { useRef } from "react";

const Comment = ({ postId }) => {
  // console.log(postId);
  const username = localStorage.getItem("username");

  // test
  localStorage.setItem("username","user4");

  const comm = useRef();
  const commSubmit = () => {
    if (comm.current.value === "") {
      alert("내용을 입력해주세요");
      comm.current.focus();
      return;
    }
    // console.log(comm.current.value);

    const commPostData = {
      postId: postId,
      username: username,
      commContent: comm.current.value,
    };

    const url = "http://10.125.121.214:8080/api/user/commWrite";

    axios
      .post(url, commPostData)
      .then((resp) => {
        console.log("성공");
      })
      .catch((err) => {
        console.log("댓글 등록 실패");
      });
  };

  return (
    <div className="flex flex-col w-full max-w-[800px] m-auto  mt-[1rem] bg-white shadow-lg rounded-lg px-[3rem] py-[2rem]">
      <div className="grow flex flex-col">
        <div className="w-full">
          <h3>{username}</h3>
          <input
            type="text"
            ref={comm}
            placeholder="댓글"
            className="border-none bg-[#ededed] rounded-l-lg w-[85%]"
          />
          <button
            onClick={commSubmit}
            className="text-white bg-now-blue rounded-r-lg h-[40px] w-[15%]"
          >
            등록
          </button>
        </div>
          <div className="">
            <p>test</p>
            <p>test</p>
            <p>test</p>
            
          </div>
      </div>
    </div>
  );
};

export default Comment;
