import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { HiMiniPencilSquare } from "react-icons/hi2";

const Comment = ({ postId }) => {
  const username = localStorage.getItem("username");
  const comm = useRef();
  const [commData, setCommData] = useState();
  const [commTag, setCommTag] = useState();

  // 댓글 수정버튼 눌렀는지 확인하는 변수
  const [edit, setEdit] = useState(false);
  const [check, setCheck] = useState(false);

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
        console.log(resp.data);

        // response로 받기
        setCommData(resp.data);
        comm.current.value = "";

      })
      .catch((err) => {
        console.log("댓글 등록 실패");
      });


  };

  // 댓글 수정
  const editClick = () => {
    setEdit(true);
  }

  // 댓글 삭제
  const handleCommDelete = (commentId) => {
    // console.log(commentId);
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      const url = `http://10.125.121.214:8080/api/user/delComment?commentId=${commentId}&postId=${postId}`;
      axios.delete(url, {
        headers: {
          Authorization: localStorage.getItem("token")
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
    const url = `http://10.125.121.214:8080/api/user/nowComment?postId=${postId}`;

    axios.get(url, {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    })
      .then(resp => {
        console.log("댓글 데이터 : ", resp.data)
        setCommData(resp.data);
      })
      .catch(err => {
        console.log(err);
      })


  }, [])

  useEffect(() => {
    if (!commData) return;

    setCommTag(commData.map((item, idx) => {
      // console.log(item.commentId);
      return (
        <div className="flex justify-between" key={item.commentId}>
          <div className="flex flex-col mt-2 ">
            <p className="font-bold">{idx+1}. {item.member} <span className="text-[0.7rem] text-gray-300">{item.commDate.slice(0,10)}</span></p>
            <p className="ml-4 mt-1">{item.commContent}</p>
          </div>
          {
            username === item.member
              ? <div className="flex items-center gap-1 mt-2">
                <div>
                  <button onClick={editClick}>
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
          <div className="w-full">
            <div className="overflow-hidden rounded-md border border-gray-300 shadow-sm focus:ring-now-blue focus:border-now-blue">
              <textarea ref={comm} className="block w-[100%] h-[50px] resize-none border-0 focus:border-none focus:ring-0" rows="3" placeholder="댓글을 남겨보세요"></textarea>
              <div className="flex w-full items-center justify-between bg-white p-2">
                <div className="flex ml-2">
                  <h3 className="font-bold">{username}</h3>
                </div>
                <button
                  onClick={commSubmit}
                  className="text-white bg-now-blue hover:bg-[#2969fd] rounded-lg h-[30px] w-[10%]"
                >
                  등록
                </button>
              </div>
            </div>
          </div>
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
