import React, { useEffect, useRef, useState } from 'react'
import CustomSelect from '../CustomSelect';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const NanoomPost = () => {

  const name = localStorage.getItem("username");

  const selCate = ["가구류", "가전제품류", "기타", "생활용품류"];
  const selNanoom = ["나눔중", "나눔완료"]

  const navigate = useNavigate();

  const [nanoom, setNanoom] = useState();
  const [cate, setCate] = useState();
  const [wasteName, setWasteName] = useState([]);
  const [selName, setSelName] = useState();

  const title = useRef();
  const content = useRef();

  const nanoomChange = (e) => {
    if (e.target.value === "") { 
      setNanoom(undefined);
      return;
    }
    setNanoom(e.target.value);
  }

  // 카테고리 선택
  const cateChange = (e) => {
    if (e.target.value === "") {
      setWasteName([]);
    }
    setCate(e.target.value);

  }

  const wasteNameChange = (e) => {
    if(e.target.value === "") {
      setSelName(undefined);
      return;
    }
    setSelName(e.target.value);
  }

  // 카테고리가 바뀌면 해당 폐기물 종류 이름 가져오기
  useEffect(() => {
    //console.log(cate);
    if (!cate) return;

    let url = `http://10.125.121.214:8080/api/wastename?cate=${cate}`;

    fetch(url)
      .then(resp => resp.json())
      .then(data => setWasteName(data))
      .catch(err => console.log(err));
  }, [cate])

  useEffect(() => {
    // console.log(wasteName);
  }, [wasteName])

  // 이미지 업로드
  const [imgUrl, setImgUrl] = useState();

  const handleImage = (e) => {
    const file = e.target.files[0]
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setImgUrl(e.target.result);
    }
    reader.readAsDataURL(file);
  }

  useEffect(()=>{
    // console.log(imgUrl);
  },[imgUrl])


  // 게시글 등록
  const postClick = () => {

    if (title.current.value === "" || content.current.value === "" || !nanoom ||
      !cate || !selName) {
        alert("모든 항목을 입력해주세요");
        return;
    }

    if(!imgUrl){
      alert("사진을 선택해주세요");
      return;
    }

    // 댓글 관련 정보
    const postData = {
      name: selName,
      cate: cate,
      username: name,
      title: title.current.value,
      content: content.current.value,
      image: imgUrl,
      tag: nanoom,
      count: 0,
    }

    // console.log(postData);

    // 모든 항목이 있을 때 fetch하기
    axios.post("http://10.125.121.214:8080/api/user/nowWrite",postData)
                .then((resp)=>{
                    navigate("/nanoomlist");
                })
                .catch((err) =>{
                    console.log(err);
                    alert("게시글 등록 실패");
                });

  }

  return (
    <div className="grow px-[8rem] bg-gradient-to-b from-[#83a8ff] to-[#ffffff]">
      <div className="max-w-[800px] m-auto flex flex-col h-[85%] w-full mt-[4rem]  bg-white shadow-lg rounded-lg px-[3rem] py-[2rem]">
        <h1 className='text-center font-bold text-2xl'>글쓰기</h1>

        <div className='grid grid-cols-3 lg:grid-cols-6 gap-2 mt-[1.5rem]'>
          <CustomSelect optionItem={selNanoom} handleChange={nanoomChange} />
          <CustomSelect optionItem={selCate} handleChange={cateChange} />
          <CustomSelect optionItem={wasteName} handleChange={wasteNameChange}/>
          <div className='flex items-center col-span-2 lg:col-span-5 h-[3rem] mt-[0.5rem]'>
            <input type='text' ref={title} placeholder='제목을 입력해주세요'
              className='w-full h-full border-none bg-[#ededed] rounded-lg' />
          </div>
          <div className='col-span-1 h-[3rem] mt-[0.5rem]'>
            <button onClick={postClick} className='bg-now-blue hover:bg-[#2969fd] rounded-lg w-full h-full text-white'>등록</button>
          </div>

        </div>
        <div className='flex flex-col justify-between h-full mt-[1rem] gap-5'>
          <div className='grow'>
            <textarea id="content" ref={content} rows="4" className="block p-2.5 w-[100%] text-sm resize-none h-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="내용을 자유롭게 작성해보세요"></textarea>
          </div>
          <div className='flex justify-between'>
            <input type='file' onChange={handleImage} id='img'/>
            <p>작성자: {name}</p>
          </div>
        </div>
      </div>
      <button className='flex m-auto mt-[1rem]'><Link to='/nanoomlist'>목록으로</Link></button>
    </div>
  )
}

export default NanoomPost
