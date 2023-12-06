import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"
import Comment from "./Comment.js";
import { MdDelete } from "react-icons/md";
import { HiMiniPencilSquare } from "react-icons/hi2";

const NanoomDetail = () => {
    const postId = useParams().postId;
    const username = localStorage.getItem("username");

    const navigate = useNavigate();

    // console.log(username);
    // console.log(postId);

    const [detailData, setDetailData] = useState([]);

    const [detailTag, setDetailTag] = useState();

    // 게시글 삭제
    const handleDelete = () => {
        // console.log(postId); // 아이디 확인
        if (window.confirm("삭제된 글은 복구할 수 없습니다.\n삭제하시겠습니까?")) {
            const url = `http://10.125.121.214:8080/api/user/delBoard?postId=${postId}`;
            axios.delete(url, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
                .then(resp => {
                    alert("삭제되었습니다.");
                    navigate("/nanoomlist");
                })
                .catch(err => console.log(err));

        }
    }

    // 제일 처음 데이터를 받아오는 부분
    useEffect(() => {
        const url = `http://10.125.121.214:8080/api/user/nowBoard?postId=${postId}`;

        axios.get(url, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(resp => {
                console.log("게시글 상세내용:", resp.data);
                setDetailData(resp.data);
            })
            .catch(err => {
                console.log(err);
            })

    }, [])

    useEffect(() => {
        // console.log(detailData);
        setDetailTag(detailData.map((item) => {
            // console.log(detailData[0]["username"]);
            return (
                <div className='grow' key={item.postId}>
                    <div className="flex justify-between border-b-2 items-center">
                        <h1 className="font-bold text-xl mb-2">{item.title}</h1>
                        {
                            username === detailData[0]["member"].username
                                ?
                                <div>
                                    <div className="flex items-center gap-1 mt-2">
                                        <div>
                                            <Link to={`/nanoomEdit/${item.postId}`}>
                                                <button>
                                                    <HiMiniPencilSquare className="text-2xl text-gray-400 hover:text-green-600" />
                                                </button>
                                            </Link>
                                        </div>
                                        <div>
                                            <button onClick={handleDelete}>
                                                <MdDelete className="text-2xl text-gray-400 hover:text-red-500" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                : ""
                        }
                    </div>
                    <div className="flex h-[80%] gap-4">
                        <div className="grow w-[50%] mt-2">
                            <img src={item.image} className="h-[100%] w-[100%] object-cover" />
                        </div>

                        <div className="grow flex flex-col w-[70%]">
                            <div className="flex justify-between text-sm my-2">
                                <p>{item.member.username}</p>
                                <p>{item.createDate.slice(0, 10)}</p>
                            </div>
                            <div className="w-full h-full">
                                <textarea value={item.content}
                                    readOnly
                                    className="w-[100%] h-[100%] resize-none border-none focus:ring-0">
                                </textarea>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-end my-2 text-sm text-black">
                        <div className="flex gap-2">
                            <p className="border-4 border-[#baffb5] rounded-full p-1 px-2 font-bold">#{item.bigTrash.name}</p>
                            <p className="border-4 border-[#fafa98] rounded-full p-1 px-2 font-bold">#{item.bigTrash.size}</p>
                            {
                                item.tag === "나눔중"
                                    ? <p className="border-4 border-[#bbf9ff] rounded-full p-1 px-2 font-bold">#{item.tag}</p>
                                    : <p className="border-4 border-[#d6d6d6] bg-[#d6d6d6] rounded-full p-1 px-2 font-bold">#{item.tag}</p>
                            }
                        </div>
                    </div>

                </div>
            )
        }))
    }, [detailData])

    return (
        <div className="grow flex flex-col bg-[url('./images/board_bg_img.jpg')] bg-center bg-cover">
            <div className='h-full backdrop-blur-sm'>
                <div className="flex flex-col h-[50%] w-full max-w-[800px] m-auto mt-[4rem] bg-white shadow-lg rounded-t-lg px-[3rem] py-[2rem]">
                    {detailTag}
                </div>
                <Comment postId={postId} />
                <div className="flex m-auto max-w-[800px] justify-center my-[1rem] hover:underline">
                    <Link to='/nanoomlist'><p>목록으로</p></Link>
                </div>
            </div>
        </div>
    )
}

export default NanoomDetail
