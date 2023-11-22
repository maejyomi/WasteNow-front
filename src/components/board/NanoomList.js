import { Link } from "react-router-dom"

const NanoomList = () => {
    const name = localStorage.getItem("username");

    return (
        <div className="grow px-[8rem] bg-gradient-to-b from-[#83a8ff] to-[#ffffff]">
            <h1 className="flex justify-end mt-[1rem] text-lg text-white font-bold tracking-wide"><span className="font-bold text-[#F9F871]">{name}</span>님 환영합니다.</h1>
            <div className="flex flex-col h-[85%] w-full mt-[1rem]  bg-white shadow-lg rounded-lg px-[3rem] py-[2rem]">
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
                        <thead className="border-b-4 text-lg">
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
                            <tr className="text-center">
                                <td>1</td>
                                <td>나눔중</td>
                                <td><Link to='/nanoomdetail'>책상 무료 나눔합니다</Link></td>
                                <td>maejyomi</td>
                                <td>2023.11.21</td>
                                <td>10</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <hr className="border-2"/>
                <div className="flex justify-end ">
                    <div className=""><Link to='/nanoompost'>새 글 작성</Link></div>
                </div>
            </div>
        </div>
    )
}

export default NanoomList
