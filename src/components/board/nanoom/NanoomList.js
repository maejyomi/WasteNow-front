import axios from "axios";
import { useEffect, useRef, useState } from "react";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom"
import './react-paginate.css';

const NanoomList = () => {

    const name = localStorage.getItem("username");

    // 게시글 리스트
    const [data, setData] = useState([]);
    const [list, setList] = useState();
    const [page, setPage] = useState(1);
    const [totalNum, setTotalNum] = useState(0);

    const searchKeyword = useRef();

    // 검색
    const listSearch = () => {
        // 키워드 없이 검색했을 경우 1페이지
        if (searchKeyword.current.value === "") {
            const url = "http://10.125.121.214:8080/api/user/nowList?pageNo=1";

            axios.get(url, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
                .then(resp => {
                    setTotalNum(resp.data.totalElements)
                    setData(resp.data.content);
                })
                .catch(err => {
                    console.log(err);
                })
            return;
        }

        const keyword = searchKeyword.current.value;

        const url = `http://10.125.121.214:8080/api/user/nowListSearch?keyword=${keyword}`;

        axios.get(url, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(resp => {
                setData(resp.data);
            })
            .catch(err => {
                console.log(err);
            });

    }

    // 페이지 변경
    const handlePageChange = (page) => {
        setPage(page);
    }

    // 페이지 변경 했을 때
    useEffect(() => {
        const url = `http://10.125.121.214:8080/api/user/nowList?pageNo=${page}`;

        axios.get(url, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(resp => {
                setData(resp.data.content);
            })

    }, [page])

    // 처음 게시물 리스트 받아오기
    useEffect(() => {
        const url = "http://10.125.121.214:8080/api/user/nowList?pageNo=1";

        axios.get(url, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(resp => {
                setTotalNum(resp.data.totalElements)
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
                    {
                        page > 1
                            ? <td className="pl-5 py-1">{idx + (15 * (page - 1)) + 1}</td>
                            : <td className="pl-5 py-1">{idx + 1}</td>
                    }
                    {
                        item.tag === "나눔중"
                            ? <td className="text-[#52be9e] font-bold">{item.tag}</td>
                            : <td className="text-[#c5c5c5] font-bold">{item.tag}</td>
                    }

                    <td className="hover:underline w-[300px]">
                        <Link to={`/nanoomdetail/${item.postId}`}>
                            <span className="text-gray-500">[{item.bigTrash.sido}]</span>
                            &nbsp;&nbsp;{item.title}
                        </Link>
                    </td>
                    <td>{item.member.username}</td>
                    <td>{item.createDate.slice(0, 10)}</td>
                    <td>{item.count}</td>
                </tr>
            );
        }))

    }, [data])

    const enterKeyDown = (e) => {
        if (e.key == "Enter") {
            listSearch(e);
        }
    }

    return (
        <div className="grow flex flex-col bg-[url('./images/board_bg_img.jpg')] bg-center bg-cover">
            <div className='h-full backdrop-blur-sm'>
                <h1 className="mt-[1rem] text-center text-lg text-white tracking-wide"><span className="text-[#F9F871]">{name}</span>님 환영합니다.</h1>
                <div className="flex w-[800px] m-auto flex-col h-[720px] mt-[1rem] bg-white shadow-lg rounded-lg px-[3rem] py-[2rem]">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className='text-center font-bold text-2xl'>나눔 게시판</h1>
                        </div>
                        <div className="flex items-center h-full">
                            <input type="text"
                                ref={searchKeyword}
                                placeholder="키워드를 입력해주세요"
                                onKeyDown={enterKeyDown}
                                className="w-[20rem] border-none bg-[#ededed] rounded-lg" />
                            <button onClick={listSearch} className="w-[4rem] mx-3 bg-now-blue hover:bg-[#2969fd] hover:transition-all  h-full rounded-lg text-white ">검색</button>
                            <div className="flex  justify-center w-[4rem] items-center text-white bg-now-blue hover:transition-all hover:bg-[#2969fd] h-full rounded-lg"><Link to='/nanoompost'>글쓰기</Link></div>

                        </div>

                    </div>
                    <div className="mt-[2rem] h-full">
                        <table className="table-auto w-full">
                            <thead className="border-b-4 text-lg text-left">
                                <tr>
                                    <th className="p-2 w-[68px]">번호</th>
                                    <th className="w-[80px]">상태</th>
                                    <th className="w-[275px]">제목</th>
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
                    <div>
                        <Pagination
                            activePage={page}
                            itemsCountPerPage={15}
                            totalItemsCount={totalNum}
                            pageRangeDisplayed={5}
                            onChange={handlePageChange}
                        >
                        </Pagination>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default NanoomList
