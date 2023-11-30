import React from 'react'
import axios from "axios";
import { useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { IoSend } from "react-icons/io5";

const CommentItem = ({ comm, idx, username, postId, setCommData }) => {
    // console.log(comm);

    const updateCommText = useRef();
    const [edit, setEdit] = useState(false);

    // 댓글 수정
    const editClick = () => {
        setEdit(true);
    }

    const editCommSubmit = (commentId) => {
        console.log(updateCommText.current.value);
        if(updateCommText.current.value === ""){
            alert("댓글 내용을 입력해주세요");
            return;
        }

        const updateCommData = {
            postId: postId,
            commentId: commentId,
            commContent: updateCommText.current.value
        }

        if(window.confirm("수정하시겠습니까?")){
            axios.put("http://10.125.121.214:8080/api/user/updateComment",updateCommData, {
              headers:{
                Authorization : localStorage.getItem("token")
              }
            })
                      .then((resp)=>{
                            console.log(resp.data);
                            setCommData(resp.data);
                            setEdit(false);
                      })
                      .catch((err) =>{
                          console.log(err);
                          alert("댓글 수정 실패");
                      });
          }

        
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

    return (
        <div className="flex justify-between" key={comm.commentId}>

            {
                edit
                    ?
                    <div className="flex flex-col mt-2 w-[90%]">
                        <p className="font-bold">{idx + 1}. {comm.member.username} <span className="text-[0.7rem] text-gray-300">{comm.commDate.slice(0, 10)}</span></p>
                        <input type='text' ref={updateCommText} defaultValue={comm.commContent} className='rounded-md border border-gray-300' />
                    </div>
                    : 
                    <div className="flex flex-col mt-2 ">
                        <p className="font-bold">{idx + 1}. {comm.member.username} <span className="text-[0.7rem] text-gray-300">{comm.commDate.slice(0, 10)}</span></p>
                        <p className="ml-4 mt-1">{comm.commContent}</p>
                    </div>
            }

            {
                username === comm.member.username
                    ? edit
                        ? 
                        <div className='flex items-end mb-2 mr-2'>
                            <button onClick={() => editCommSubmit(comm.commentId)}><IoSend className='text-2xl text-now-blue hover:text-[#2969fd]'/></button>    
                        </div>
                        : <div className="flex items-end gap-1 mt-2">
                            <div>
                                <button onClick={editClick}>
                                    <HiMiniPencilSquare className="text-2xl text-gray-400 hover:text-green-600" />
                                </button>
                            </div>
                            <div>
                                <button onClick={() => handleCommDelete(comm.commentId)}>
                                    <MdDelete className="text-2xl text-gray-400 hover:text-red-500" />
                                </button>
                            </div>
                        </div>
                    : ""
            }
        </div>
    )
}

export default CommentItem
