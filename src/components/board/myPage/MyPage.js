import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'
import MyPageBoard from './MyPageBoard';
import MyPageComment from './MyPageComment';

const MyPage = () => {
    const username = useParams().username;
    const [myBoardList, setMyBoardList] = useState([]);
    const [myCommentList, setMyCommentList] = useState([]);
    const [boardClick, setBoardClick] = useState(true);
    const [commentClick, setCommentClick] = useState(false);

    // 게시글 보기
    const showBoard = () => {
        setBoardClick(true);
        setCommentClick(false);
    }

    // 댓글 보기
    const showComm = () => {
        setBoardClick(false);
        setCommentClick(true);

    }

    useEffect(() => {
        const url = `http://10.125.121.214:8080/api/user/mypage?username=${username}`;

        axios.get(url, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(resp => {
                setMyBoardList(resp.data.boardList);
                setMyCommentList(resp.data.commentList)
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div className="grow flex flex-col bg-[url('./images/mypage_bg_img.png')] bg-center bg-cover">
            <div className='h-full backdrop-blur-sm'>
                <div className="flex max-w-[800px] m-auto flex-col h-[85%] mt-[4rem]  bg-white shadow-lg rounded-lg px-[3rem] py-[2rem]">
                    <div className='flex flex-col gap-2 '>
                        <p className='text-center text-xl'>My Page</p>
                        <div className='flex gap-4'>
                            {
                                boardClick
                                    ? <button className='text-now-blue font-bold'>작성글</button>
                                    : <button onClick={showBoard} className='hover:underline'>작성글</button>
                            }
                            {
                                commentClick
                                    ? <button className='text-now-blue font-bold'>작성 댓글</button>
                                    : <button onClick={showComm} className='hover:underline'>작성 댓글</button>
                            }
                        </div>
                    </div>
                    <hr className='my-[1rem]' />
                    <div className='flex items-center mb-1'>
                        <h1 className='text-start font-bold text-xl'>{username}</h1>
                        <p>님의 <span className='text-now-blue'>{
                            boardClick ? "작성글" : "작성 댓글"
                        }</span> 목록입니다.</p>

                    </div>
                    {
                        boardClick
                            ? <MyPageBoard data={myBoardList} />
                            : <MyPageComment data={myCommentList} />
                    }
                </div>
                <button className='flex m-auto mt-[1rem] text-white hover:underline'><Link to='/nanoomlist'>목록으로</Link></button>
            </div>
        </div>
    )
}

export default MyPage
