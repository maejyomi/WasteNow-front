import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom"

const NanoomDetail = () => {
    const postId = useParams().postId;
    const username = localStorage.getItem("username");

    // console.log(postId);

    const comm = useRef();

    const [detailData, setDetailData] = useState([]);
    const [detailTag, setDetailTag] = useState();
    // 테스트용 데이터
    const testData = [
        {
            postId: 1,
            name: "소파",
            cate: "가구류",
            username: "maejyomi",
            title: "소파 무료나눔 합니다",
            image: "이미지",
            count: 0,
            tag: "나눔중",
            createDate: "2023-11-24T06:46:09.898+00:00"
        }
    ]

    const commSubmit = () => {
        if (comm.current.value === "") {
            alert("내용을 입력해주세요");
            comm.current.focus();
            return;
        }
        // console.log(comm.current.value);

        const commPostData = {
            postId: postId,
            username: username,
            commContent: comm.current.value
        }

        const url = "http://10.125.121.214:8080/api/user/commWrite";

        axios.post(url, commPostData)
            .then(resp => {
                console.log("성공");
            })
            .catch(err => {
                console.log("댓글 등록 실패");
            })
    }

    // 제일 처음 데이터를 받아오는 부분
    useEffect(() => {
        const url = `http://10.125.121.214:8080/api/user/nowBoard?postId=${postId}`;

        axios.get(url)
            .then(resp => {
                console.log(resp.data);
                setDetailData(resp.data);
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
            console.log(detailData[0]["username"])
            return (
                <div className='grow' key={item.postId}>
                    <h1 className="text-center font-bold text-xl mb-2 border-b-2 py-[1rem]">{item.title}</h1>
                    <div className="flex h-[90%] gap-4">
                        <div className="grow w-[30%]">
                            <img src={item.image} className="max-h-[240px] w-[100%] object-cover" />
                        </div>

                        <div className="grow w-[70%]">
                            <p>{item.content}</p>
                            <p>{item.cate}</p>
                            <p>{item.name}</p>
                            <p>{item.tag}</p>
                            <p>{item.username}</p>
                            <p>{item.createDate}</p>
                        </div>
                    </div>
                </div>
            )
        }))
    }, [detailData])

    return (
        <div className="grow px-[8rem] bg-gradient-to-b from-[#83a8ff] to-[#ffffff]">
            <div className="flex flex-col h-[50%] w-full mt-[4rem] bg-white shadow-lg rounded-lg px-[3rem] pb-[2rem]">
                {detailTag}
            </div>
            <div className="flex flex-col w-full h-[35%] mt-[1rem] bg-white shadow-lg rounded-lg px-[3rem] py-[2rem]">
                <div className='grow flex flex-col'>
                    <div className="grow">
                        댓글
                    </div>
                    <div className="items-end">
                        <input type="text" ref={comm} placeholder="댓글" className="border-none bg-[#ededed] rounded-lg w-[80%] mr-2" />
                        <button onClick={commSubmit} className="text-white bg-now-blue h-full rounded-lg w-[5rem]">등록</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NanoomDetail
