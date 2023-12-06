import { Link } from "react-router-dom"


const MyPageBoard = ({ data }) => {
    return (
        <div className=" h-full">
            <table className="table-auto w-full">
                <thead className="border-b-4 text-md text-left">
                    <tr>
                        <th className="p-2 w-[68px]">번호</th>
                        <th className="w-[80px]">상태</th>
                        <th className="">제목</th>
                        <th className="w-[120px]" >날짜</th>
                        <th className="w-[50px]">조회</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, idx) => {
                            return (
                                <tr key={item.postId}>
                                    <td className="pl-5">{idx + 1}</td>
                                    {
                                        item.tag === "나눔중"
                                            ? <td className="text-[#52be9e] font-bold">{item.tag}</td>
                                            : <td className="text-[#c5c5c5] font-bold">{item.tag}</td>
                                    }
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
