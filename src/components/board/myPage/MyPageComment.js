import { Link } from "react-router-dom"

const MyPageComment = ({ data }) => {
    return (
        <div className=" h-full">
            <table className="table-auto w-full">
                <thead className="border-b-4 text-md text-left">
                    <tr>
                        <th className="p-2 w-[68px]">번호</th>
                        <th className="w-[275px]">제목</th>
                        <th>작성 댓글</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item, idx) => {
                            return (
                                <tr className="" key={idx}>
                                    <td className="pl-5">{idx + 1}</td>
                                    <td className="hover:underline"><Link to={`/nanoomdetail/${item.board.postId}`}>{item.board.title}</Link></td>
                                    <td>{item.commContent}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MyPageComment
