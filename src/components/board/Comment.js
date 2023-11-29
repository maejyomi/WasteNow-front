import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { HiMiniPencilSquare } from "react-icons/hi2";

const Comment = ({ postId }) => {
  const username = localStorage.getItem("username");
  const comm = useRef();
  const [commData, setCommData] = useState();
  const [commTag, setCommTag] = useState();

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
        headers:{
          Authorization : localStorage.getItem("token")
        }
      })
      .then((resp) => {
        console.log(resp.data);

        // response로 받기
        setCommData(resp.data);
        comm.current.value = "";

      })
      .catch((err) => {
        console.log("댓글 등록 실패");
      });


  };

  // 댓글 삭제
  const handleCommDelete = (commentId) => {
    // console.log(commentId);
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      const url = `http://10.125.121.214:8080/api/user/delComment?commentId=${commentId}&postId=${postId}`;
      axios.delete(url, {
        headers:{
          Authorization : localStorage.getItem("token")
        }
      })
        .then(resp => {
          alert("삭제되었습니다");
          // console.log(resp.data);
          setCommData(resp.data);
        })
        .catch((err) => console.log(err))

    } 
  }

  useEffect(() => {
    // const url = `http://10.125.121.214:8080/api/user/nowBoard?postId=${postId}`;
    const url = `http://10.125.121.214:8080/api/user/nowComment?postId=${postId}`;

    axios.get(url, {
      headers:{
        Authorization : localStorage.getItem("token")
      }
    })
      .then(resp => {
        console.log("댓글 데이터 : ",resp.data)
        setCommData(resp.data);
      })
      .catch(err => {
        console.log(err);
      })


  }, [])

  useEffect(() => {
    if (!commData) return;

    setCommTag(commData.map((item) => {
      // console.log(item.commentId);
      return (
        <div className="flex justify-between" key={item.commentId}>
          <div className="flex gap-2">
            <p>[ {item.member} ]</p>
            <p>{item.commContent}</p>
          </div>
          {
            username === item.member
              ? <div className="flex gap-1">
                <div>
                  <button>
                    <HiMiniPencilSquare className="text-xl text-gray-400 hover:text-green-600" />
                  </button>
                </div>
                <div>
                  <button onClick={() => handleCommDelete(item.commentId)}>
                    <MdDelete className="text-xl text-gray-400 hover:text-red-500" />
                  </button>
                </div>
              </div>
              : ""
          }
        </div>
      )
    }))

  }, [commData])


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
            className="text-white bg-now-blue hover:bg-[#2969fd] rounded-r-lg h-[40px] w-[15%]"
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
