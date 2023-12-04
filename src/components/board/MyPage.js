import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'

const MyPage = () => {
    const username = useParams().username;
    const [userData, setUserData] = useState([]);
    const [myList, setMyList] = useState();

    useEffect(()=>{
        setMyList(userData.map((item,idx)=>{
            return (
                <tr className="" key={item.postId}>
                    <td className="pl-5">{idx+1}</td>
                    <td>{item.tag}</td>
                    <td className="hover:underline"><Link to={`/nanoomdetail/${item.postId}`}>{item.title}</Link></td>
                    <td>{item.createDate.slice(0,10)}</td>
                    <td>{item.count}</td>
                </tr>
            )
        }))
    }, [userData])

    useEffect(() => {
        const url = `http://10.125.121.214:8080/api/user/mypage?username=${username}`;

        axios.get(url, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(resp => {
                console.log("마이페이지: ", resp.data);
                setUserData(resp.data);

            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div className="grow px-[8rem] bg-gradient-to-b from-[#83a8ff] to-[#ffffff]">
            <div className="flex max-w-[800px] m-auto flex-col h-[85%] mt-[4rem]  bg-white shadow-lg rounded-lg px-[3rem] py-[2rem]">
                <div className='flex items-center justify-between'>
                    <h1 className='text-start font-bold text-2xl'>{username}</h1>
                    <div>
                        작성글 
                    </div>
                </div>
                <div className="mt-[2rem] h-full">
                    <table className="table-auto w-full">
                        <thead className="border-b-4 text-lg text-left">
                            <tr>
                                <th className="p-2">번호</th>
                                <th>상태</th>
                                <th>제목</th>
                                <th>날짜</th>
                                <th>조회</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myList}
                        </tbody>
                    </table>
                </div>
            </div>
            <button className='flex m-auto mt-[1rem] hover:underline'><Link to='/nanoomlist'>목록으로</Link></button>
        </div>
    )
}

export default MyPage
