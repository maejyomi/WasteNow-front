import { Link } from "react-router-dom"


const MyPageBoard = ({data}) => {
    return (
        <div className=" h-full">
            <table className="table-auto w-full">
                <thead className="border-b-4 text-md text-left">
                    <tr>
                        <th className="p-2 w-[68px]">번호</th>
                        <th className="w-[80px]">상태</th>
                        <th className="w-[275px]">제목</th>
                        <th>날짜</th>
                        <th>조회</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, idx) => {
                            return (
                                <tr key={item.postId}>
                                    <td className="pl-5">{idx + 1}</td>
                                    <td>{item.tag}</td>
                                    <td className="hover:underline"><Link to={`/nanoomdetail/${item.postId}`}>{item.title}</Link></td>
                                    <td>{item.createDate.slice(0, 10)}</td>
                                    <td>{item.count}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MyPageBoard
