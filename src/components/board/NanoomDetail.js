import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import Comment from "./Comment.js";


const NanoomDetail = () => {
    const postId = useParams().postId;
    const username = localStorage.getItem("username");

    // console.log(username);
    // console.log(postId);

    const [detailData, setDetailData] = useState([]);

    const [detailTag, setDetailTag] = useState();

    // 테스트용 데이터
    const testData = [
        {
            postId: 1,
            name: "소파",
            cate: "가구류",
            username: "maejyomi",
            content: "1년 사용한 소파 무료나눔 합니다! 영도구 ## 아파트 앞에서 가져가시면 됩니다!",
            title: "소파 무료나눔 합니다",
            image: "이미지",
            count: 0,
            tag: "나눔중",
            createDate: "2023-11-24T06:46:09.898+00:00"
        }
    ]



    // 제일 처음 데이터를 받아오는 부분
    useEffect(() => {
        const url = `http://10.125.121.214:8080/api/user/nowBoard?postId=${postId}`;


        axios.get(url)
            .then(resp => {
                //console.log(resp.data.board);
                setDetailData(resp.data.board);
            })
            .catch(err => {
                console.log(err);
            })



        // 테스트용
        //setDetailData(testData);
    }, [])

    useEffect(() => {
        // console.log(detailData);
        setDetailTag(detailData.map((item) => {
            console.log(detailData[0]["username"]);
            return (
                <div className='grow' key={item.postId}>
                    <div className="flex justify-between border-b-2 items-center">
                        <h1 className="font-bold text-xl mb-2">{item.title}</h1>
                        <div className="flex gap-4 mb-2 text-black">
                            <p className="border-4 border-[#baffb5] rounded-full p-1 px-2 font-bold">#{item.cate}</p>
                            <p className="border-4 border-[#fafa98] rounded-full p-1 px-2 font-bold">#{item.name}</p>
                            {
                                item.tag === "나눔중"
                                    ? <p className="border-4 border-[#bbf9ff] rounded-full p-1 px-2 font-bold">#{item.tag}</p>
                                    : <p className="border-4 border-[#bbf9ff] bg-[#bbf9ff] rounded-full p-1 px-2 font-bold">#{item.tag}</p>
                            }
                        </div>
                    </div>
                    <div className="flex h-[80%] gap-4">
                        <div className="grow w-[30%]">
                            <img src={item.image} className="max-h-[240px] w-[100%] object-cover" />
                        </div>

                        <div className="grow flex flex-col w-[70%]">
                            <div className="flex justify-between text-sm my-2">
                                <p>{item.username}</p>
                                <p>{item.createDate.slice(0, 10)}</p>
                            </div>
                            <div className="">
                                <p>{item.content}</p>
                            </div>
                        </div>
                    </div>
                    {
                        username === detailData[0]["username"]
                            ?
                            <div className="flex justify-end border-t-2 mt-2">
                                <div className="mt-2">
                                    수정 삭제
                                </div>
                            </div>
                            : ""
                    }
                </div>
            )
        }))
    }, [detailData])

    return (
        <div className="grow px-[8rem] bg-gradient-to-b from-[#83a8ff] to-[#ffffff]">
            <div className="flex flex-col h-[50%] w-full max-w-[800px] m-auto mt-[4rem] bg-white shadow-lg rounded-lg px-[3rem] py-[2rem]">
                {detailTag}
            </div>
            <Comment postId={postId} />
            <div className="flex m-auto max-w-[800px] justify-center my-[1rem]">
                <Link to='/nanoomlist'><p>목록으로</p></Link>
            </div>
        </div>
    )
}

export default NanoomDetail
