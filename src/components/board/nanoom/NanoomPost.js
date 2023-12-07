import React, { useEffect, useRef, useState } from 'react'
import CustomSelect from '../../CustomSelect';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import HasRefSelect from '../../HasRefSelect';

const NanoomPost = () => {

  const name = localStorage.getItem("username");

  const selSido = ["강서구", "금정구", "남구", "동래구", "부산진구", "북구", "사상구", "서구", "수영구", "연제구", "영도구", "해운대구"];
  const selCate = ["가구류", "가전제품류", "기타", "생활용품류"];

  const navigate = useNavigate();

  const [sido, setSido] = useState();
  const [cate, setCate] = useState();
  const [wasteName, setWasteName] = useState([]);
  const [selName, setSelName] = useState();
  const [wasteSize, setWasetSize] = useState([]);
  const [selSize, setSelSize] = useState();

  const title = useRef();
  const content = useRef();
  const cateRef = useRef();

  // 카테고리 선택
  const sidoChange = (e) => {
    setWasteName([]);
    setWasetSize([]);
    cateRef.current.value = '';
    setSido(e.target.value);
  }

  const cateChange = (e) => {
    if (e.target.value === "") {
      setWasteName([]);
      setWasetSize([]);
    }
    setCate(e.target.value);

  }

  const wasteNameChange = (e) => {
    if (e.target.value === "") {
      setSelName(undefined);
      setWasetSize([])
      return;
    }
    setSelName(e.target.value);
  }

  const wasteSizeChange = (e) => {
    setSelSize(e.target.value);
    console.log(e.target.value);

  }

  // 카테고리가 바뀌면 해당 폐기물 종류 이름 가져오기
  useEffect(() => {
    //console.log(cate);
    console.log(sido, cate);
    if (!cate || !sido) return;
    let url = `http://10.125.121.214:8080/api/wastename?sido=${sido}&cate=${cate}`;
    console.log(url);

    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        setWasteName(data);
      })
      .catch(err => console.log(err));
  }, [sido, cate])

  // 폐기물 이름이 선택되면 해당 폐기물 이름의 사이즈 가져오기
  useEffect(() => {
    if (!cate || !sido || !selName) return;

    let url = `http://10.125.121.214:8080/api/wastesize?sido=${sido}&cate=${cate}&name=${selName}`;
    console.log(url);

    fetch(url)
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        setWasetSize(data);
      })
      .catch(err => console.log(err));

  }, [selName]);

  // 이미지 업로드
  const [imgUrl, setImgUrl] = useState();

  const handleImage = (e) => {
    const file = e.target.files[0]
    // console.log(e.target.files[0]);
    // setImgUrl(e.target.files[0]);

    const reader = new FileReader();
    reader.onload = (e) => {
      setImgUrl(e.target.result);
    }
    reader.readAsDataURL(file);
  }

  useEffect(() => {
    // console.log(imgUrl);
  }, [imgUrl])



  // 게시글 등록
  const postClick = () => {
    if (title.current.value === "" || content.current.value === "" || !sido ||
      cateRef.current.value == "" || !selName || !selSize) {
      alert("모든 항목을 입력해주세요");
      return;
    }

    if (!imgUrl) {
      alert("사진을 선택해주세요");
      return;
    }

    // 댓글 관련 정보
    const postData = {
      sido: sido,
      cate: cate,
      name: selName,
      size: selSize,
      username: name,
      title: title.current.value,
      content: content.current.value,
      image: imgUrl,
      tag: "나눔중",
    }

    console.log(postData);

    // 모든 항목이 있을 때 fetch하기
    if (window.confirm("카테고리와 이미지는 수정할 수 없습니다.\n게시글을 등록하시겠습니까?")) {
      axios.post("http://10.125.121.214:8080/api/user/nowWrite", postData, {
        headers: {
          Authorization: localStorage.getItem("token")
        }
      })
        .then((resp) => {
          navigate("/nanoomlist");
        })
        .catch((err) => {
          console.log(err);
          alert("게시글 등록 실패");
        });
    }

  }

  return (
    <div className="grow flex flex-col bg-[url('./images/board_bg_img.jpg')] bg-center bg-cover">
      <div className='h-full backdrop-blur-sm'>
        <div className="max-w-[800px] m-auto flex flex-col h-[85%] w-full mt-[4rem]  bg-white shadow-lg rounded-lg px-[3rem] py-[2rem]">
          <h1 className='text-center font-bold text-2xl'>글쓰기</h1>

          <div className='grid grid-cols-4 gap-2 mt-[1.5rem]'>
            <CustomSelect optionItem={selSido} handleChange={sidoChange} />
            <HasRefSelect optionItem={selCate} refs={cateRef} handleChange={cateChange} />
            <CustomSelect optionItem={wasteName} handleChange={wasteNameChange} />
            <CustomSelect optionItem={wasteSize} handleChange={wasteSizeChange} />
            <div className='flex items-center col-span-3 h-[3rem] mt-[0.5rem]'>
              <input type='text' ref={title} placeholder='제목을 입력해주세요'
                className='w-full h-full border-none bg-[#ededed] rounded-lg' />
            </div>
            <div className='col-span-1 h-[3rem] mt-[0.5rem]'>
              <button onClick={postClick} className='bg-now-blue hover:bg-[#2969fd] rounded-lg w-full h-full text-white'>등록</button>
            </div>

          </div>
          <div className='flex flex-col justify-between h-full mt-[1rem] gap-5'>
            <div className='grow'>
              <textarea id="content" ref={content} rows="4" className="block p-2.5 w-[100%] text-lg resize-none h-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="내용을 자유롭게 작성해보세요"></textarea>
            </div>
            <div className='flex justify-between'>
              <input type='file' onChange={handleImage} id='img' />
              <p>작성자: {name}</p>
            </div>
          </div>
        </div>
        <button className='flex m-auto mt-[1rem] text-white hover:underline'><Link to='/nanoomlist'>목록으로</Link></button>
      </div>
    </div>
  )
}

export default NanoomPost
