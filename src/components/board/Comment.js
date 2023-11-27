import axios from "axios";
import { useEffect, useRef, useState } from "react";

const Comment = ({ postId }) => {
  const username = localStorage.getItem("username");
  const comm = useRef();
  const [commData, setCommData] = useState();
  const [commTag, setCommTag] = useState();

  useEffect(() => {
    const url = `http://10.125.121.214:8080/api/user/nowBoard?postId=${postId}`;

    axios.get(url)
      .then(resp => {
        setCommData(resp.data.comment);
      })
      .catch(err => {
        console.log(err);
      })


  }, [])

  useEffect(() => {
    if (!commData) return;

    console.log(commData);
    setCommTag(commData.map((item) => {
      return (
        <div className="flex justify-between" key={item.commentId}>
          <div className="flex gap-2">
            <p>[ {item.username} ]</p>
            <p>{item.commContent}</p>
          </div>
          {
            username === item.username
            ? <div>
                수정 삭제
              </div>
            : ""
          }
        </div>
      )
    }))

  }, [commData])


  // 댓글 작성 등록
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
      .post(url, commPostData)
      .then((resp) => {
        console.log("성공");
        setCommData([...commData, commPostData]);
        comm.current.value = "";

      })
      .catch((err) => {
        console.log("댓글 등록 실패");
      });


  };

  return (
    <div className="flex flex-col w-full max-w-[800px] m-auto  mt-[1rem] bg-white shadow-lg rounded-lg px-[3rem] py-[2rem]">
      <div className="grow flex flex-col">
        <div className="w-full mb-2">
          <h3 className="font-bold">{username}</h3>
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
          {
            commTag
          }
        </div>
      </div>
    </div>
  );
};

export default Comment;
