import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"


const NanoomList = () => {
    const name = localStorage.getItem("username");

    // 게시글 리스트
    const [data, setData] = useState([]);
    const [list, setList] = useState();

    const testData = [
        {
            post_id: 1,
            tag: "나눔중",
            name: "소파",
            cate: "가구류",
            username: "maejyomi",
            title: "test",
            content: "test",
            count: 0,
            create_date: "2023-11-23"
        }
    ]

    // 게시물 리스트 받아오기
    useEffect(() => {
        const url = "http://10.125.121.214:8080/api/user/nowList";
       
        axios.get(url, {
            headers:{
              Authorization : localStorage.getItem("token")
            }
          })
            .then(resp => {
                console.log("게시글 리스트: ",resp.data.content);
                setData(resp.data.content);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

  

    useEffect(() => {
        //console.log(data);
        
        setList(data.map((item, idx) => {
            return (
                <tr className="" key={item.postId}>
                    <td className="pl-5">{idx+1}</td>
                    <td>{item.tag}</td>
                    <td><Link to={`/nanoomdetail/${item.postId}`}>{item.title}</Link></td>
                    <td>{item.member}</td>
                    <td>{item.createDate.slice(0,10)}</td>
                    <td>{item.count}</td>
                </tr>
            );
        }))

    }, [data])

    return (
        <div className="grow px-[8rem] bg-gradient-to-b from-[#83a8ff] to-[#ffffff]">
            <h1 className="flex justify-end mt-[1rem] text-lg text-white font-bold tracking-wide"><span className="font-bold text-[#F9F871]">{name}</span>님 환영합니다.</h1>
            <div className="flex flex-col h-[85%] mt-[1rem]  bg-white shadow-lg rounded-lg px-[3rem] py-[2rem]">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className='text-center font-bold text-2xl'>나눔 게시판</h1>
                    </div>
                    <div className="flex items-center h-full">
                        <input type="text"
                            placeholder="키워드를 입력해주세요"
                            className="w-[15rem] border-none bg-[#ededed] rounded-lg" />
                        <button className="w-[4rem] ml-4 bg-now-blue hover:bg-[#2969fd] h-full rounded-lg text-white ">검색</button>
                    </div>
                </div>
                <div className="mt-[2rem] h-full">
                    <table className="table-auto w-full">
                        <thead className="border-b-4 text-lg text-left">
                            <tr>
                                <th className="p-2">번호</th>
                                <th>상태</th>
                                <th>제목</th>
                                <th>작성자</th>
                                <th>날짜</th>
                                <th>조회</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list}
                        </tbody>
                    </table>
                </div>
                <hr className="border-2" />
                <div className="flex justify-end ">
                    <div className=""><Link to='/nanoompost'>글쓰기</Link></div>
                </div>
            </div>
        </div>
    )
}

export default NanoomList
