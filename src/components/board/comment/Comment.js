import axios from "axios";
import { useEffect, useRef, useState } from "react";
import CommentItem from "./CommentItem";
import { IoSend } from "react-icons/io5";

const Comment = ({ postId }) => {
  const username = localStorage.getItem("username");
  const comm = useRef();
  const [commData, setCommData] = useState();

  // 댓글 작성
  const commSubmit = () => {
    if (comm.current.value === "") {
      alert("내용을 입력해주세요");
      comm.current.focus();
      return;
    }

    const commPostData = {
      postId: postId,
      username: username,
      commContent: comm.current.value,
    };

    const url = "http://10.125.121.214:8080/api/user/commWrite";

    axios
      .post(url, commPostData, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
      .then((resp) => {
        // response로 받기
        setCommData(resp.data);
        comm.current.value = "";

      })
      .catch((err) => {
        console.log("댓글 등록 실패", err);
      });


  };

  
  useEffect(() => {
    const url = `http://10.125.121.214:8080/api/user/nowComment?postId=${postId}`;

    axios.get(url, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(resp => {
        setCommData(resp.data);
      })
      .catch(err => {
        console.log(err);
      })


  }, [])

  useEffect(() => {
    if (!commData) return;

  }, [commData])


  return (
    <div className="max-h-[400px] flex flex-col w-full max-w-[800px] m-auto bg-white shadow-lg rounded-b-lg px-[3rem] py-[2rem]">
      <div className="grow flex flex-col">
        <div className="w-full mb-2">
          <div className="w-full">
            <div className="overflow-hidden rounded-md border border-gray-300 shadow-sm focus:ring-now-blue focus:border-now-blue">
              <textarea ref={comm} className="block w-[100%] h-[50px] resize-none border-0 focus:border-none focus:ring-0" rows="3" placeholder="댓글을 남겨보세요"></textarea>
              <div className="flex w-full items-center justify-between bg-white p-2">
                <div className="flex ml-2">
                  <h3 className="font-bold">{username}</h3>
                </div>
                
                <button
                  onClick={commSubmit}
                >
                  <IoSend className='text-2xl text-now-blue hover:text-[#2969fd]'/>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="max-h-[180px] overflow-auto ">
          {
            commData && commData.map((item, idx)=><CommentItem comm={item} key={idx} idx={idx} username={username} postId={postId} setCommData={setCommData}/>)
          }
        </div>
      </div>
    </div>
  );
};

export default Comment;
