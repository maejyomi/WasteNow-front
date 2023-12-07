import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const NanoomEdit = () => {
    const postId = useParams().postId;
    const [detailData, setDetailData] = useState('');
    const [defaultSelect, setDefaultSelect] = useState([]);
    const updateContent = useRef();
    const updateTitle = useRef();
    const [updateTag, setUpdateTag] = useState();
    const navigate = useNavigate();

    const handleTagChange = (e) => {
        // console.log(e.target.value);
        setUpdateTag(e.target.value);
    }

    const handleUpdate = () => {
        console.log("업데이트 제목: ", updateTitle.current.value);
        console.log("업데이트 내용: ", updateContent.current.value);
        console.log("업데이트 태그: ", updateTag);
        if (updateTitle.current.value === "" || updateContent.current.value === "") {
            alert("모든 항목을 입력해주세요");
            return;
        }

        const updateData = {
            bigId: detailData.bigTrash.bigId,
            postId: postId,
            title: updateTitle.current.value,
            content: updateContent.current.value,
            tag: updateTag
        }

        if (window.confirm("수정하시겠습니까?")) {
            axios.put("http://10.125.121.214:8080/api/user/updateNow", updateData, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            })
                .then((resp) => {
                    navigate(`/nanoomdetail/${postId}`);
                })
                .catch((err) => {
                    console.log(err);
                    alert("게시글 수정 실패");
                });
        }
    }

    useEffect(() => {
        if (!detailData) return;

        const defaultValues = [detailData.bigTrash.sido, detailData.bigTrash.cate, detailData.bigTrash.name, detailData.bigTrash.size];
        console.log(detailData);

        setDefaultSelect(defaultValues.map((item, idx) => {
            return (
                <select key={idx} className="w-[100%] h-[2.5rem] border-none bg-[#EDEDED] rounded-lg focus:border-[#5586f8] focus:ring-[#5586f8] ">
                    <option disabled selected className="bg-white">{item}</option>
                </select>
            )
        }))

    }, [detailData])

    useEffect(() => {
        // console.log(postId);
        const url = `http://10.125.121.214:8080/api/user/nowBoard?postId=${postId}`;

        axios.get(url, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
            .then(resp => {
                setDetailData(resp.data[0]);
                setUpdateTag(resp.data[0].tag);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])


    return (
        <div className="grow flex flex-col bg-[url('./images/board_bg_img.jpg')] bg-center bg-cover">
            <div className='h-full backdrop-blur-sm'>
                <div className="max-w-[800px] m-auto flex flex-col h-[85%] w-full mt-[4rem]  bg-white shadow-lg rounded-lg px-[3rem] py-[2rem]">
                    <h1 className='text-center font-bold text-2xl'>수정하기</h1>

                    <div className='grid grid-cols-4 gap-2 mt-[1.5rem]'>

                        {defaultSelect}
                        <div className='col-span-1 mt-[0.5rem]'>
                            <select onChange={handleTagChange} className="w-[100%] h-[2.5rem] border-none bg-[#EDEDED] rounded-lg focus:border-[#5586f8] focus:ring-[#5586f8] ">
                                <option selected className="bg-white">{detailData.tag}</option>
                                <option className="bg-white">
                                    {
                                        detailData.tag === "나눔중"
                                            ? "나눔완료"
                                            : "나눔중"
                                    }
                                </option>
                            </select>
                        </div>
                        <div className='flex items-center col-span-3  mt-[0.5rem] h-[2.5rem]'>
                            <input type='text'
                                ref={updateTitle}
                                defaultValue={detailData.title}
                                className='w-full h-full border-none bg-[#ededed] rounded-lg' />
                        </div>
                    </div>
                    <div className='flex flex-col justify-between h-full mt-[1rem] gap-5'>
                        <div className='grow'>
                            <textarea id="content" ref={updateContent} defaultValue={detailData.content} rows="4" className="block p-2.5 w-[100%] text-sm resize-none h-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="내용을 자유롭게 작성해보세요"></textarea>
                        </div>
                        <div className='flex justify-end gap-2'>
                            <button onClick={handleUpdate} className='bg-now-blue hover:bg-[#2969fd] rounded-lg w-[4rem] h-[2.5rem] text-white'>등록</button>
                        </div>
                    </div>
                </div>
                <button className='flex m-auto mt-[1rem] text-white'><Link to='/nanoomlist'>목록으로</Link></button>
            </div>
        </div>
    )
}

export default NanoomEdit
