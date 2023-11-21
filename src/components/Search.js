import { useEffect, useRef, useState } from "react";
import MySelect from "../comm/MySelect";


const Search = () => {
    const selSido = ["강서구", "금정구", "남구", "동래구", "부산진구", "북구", "사상구", "서구", "수영구", "연제구", "영도구", "해운대구"];
    const selCate = ["전체", "가구류", "가전제품류", "기타", "생활용품류"];

    const [sido, setSido] = useState();
    const [cate, setCate] = useState();
    const keyword = useRef();
    const [searchData, setSearchData] = useState();
    const [tags, setTags] = useState();


    const testData = [// 테스트용 데이터
        {
            cate: "가구류",
            id: 1557,
            manager: "부산광역시 강서구청",
            name: "책상",
            pay: "유료",
            price: 8000,
            sido: "강서구",
            size: "양수(120cm 이상)"
        },
    ];

    const sidoChange = (e) => {
        setSido(e.target.value);
    }

    const cateChange = (e) => {
        setCate(e.target.value);
    }

    const submitBtn = (e) => {
        if (!sido || !cate || keyword.current.value === '') {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        let url = `http://10.125.121.214:8080/api/search?sido=${sido}&cate=${cate}&keyword=${keyword.current.value}`;
        
        fetch(url)
            .then(resp => resp.json())
            .then(data => setSearchData(data))
            .catch(err => console.log(err));
        

        // setSearchData(testData); // 테스트 코드

    }

    useEffect(() => {
        console.log(searchData);
        if(!searchData) return;

        // 데이터 없을 때 처리 (나중에 수정)
        if(searchData.length == 0){
            setTags(
                <div>
                    <p className="">데이터가 없습니다.</p>
                </div>
            
            )
            return;
        }

        setTags(searchData.map((item, idx) => {
            return (
                <div
                    key={idx}
                    className="border-2 border-[#5586f8] rounded-lg shadow-lg h-[15rem] md:h-[18rem] lg:h-[15rem] p-5">
                    <h1 className="text-center text-xl font-bold mb-[1rem]">
                        {item.name}
                    </h1>
                    <hr />
                    <p className="mt-[1rem] mb-1 ">규격 : {item.size}</p>
                    <p className="mb-1">유무료 : {item.pay}</p>
                    <p className="mb-1">수수료 : {item.price}</p>
                    <p>관리기관 : {item.manager}</p>
                </div>
            )
        }))

    }, [searchData])


    return (
        <div className="grow mt-[5rem] px-[8rem]">
            <div className="grid grid-cols-5 gap-4">
                <div>
                    <MySelect optionItem={selSido} handleChange={sidoChange} />
                </div>
                <div>
                    <MySelect optionItem={selCate} handleChange={cateChange} />
                </div>
                <div className="col-span-2">
                    <input type="text"
                        ref={keyword}
                        placeholder="키워드를 입력해주세요"
                        className="w-full h-[3rem] px-4 rounded-lg border-none focus:border-[#5586f8] focus:ring-[#5586f8] bg-[#EDEDED] " />
                </div>
                <div>
                    <button
                        onClick={submitBtn}
                        className="flex  items-center justify-center font-bold bg-[#5586f8] text-white text-xl w-full h-full rounded-lg hover:bg-[#3672ff]">
                        검색
                    </button>
                </div>
            </div>
            <div className="mt-[4rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-10">
                {tags}
            </div>

        </div>
    )
}

export default Search
