import { useEffect, useRef, useState } from "react";
import CustomSelect from "../CustomSelect";
import axios from "axios";
import SearchItem from "./SearchItem";
import Modal from "./Modal";
import { FaBasketShopping } from "react-icons/fa6";



const Search = () => {
    const selSido = ["강서구", "금정구", "남구", "동래구", "부산진구", "북구", "사상구", "서구", "수영구", "연제구", "영도구", "해운대구"];
    const selCate = ["전체", "가구류", "가전제품류", "기타", "생활용품류"];

    const [sido, setSido] = useState();
    const [cate, setCate] = useState();
    const keyword = useRef();
    const [searchData, setSearchData] = useState();
    const [optionTags, setOptionTags] = useState([]);

    // 모달
    const [modalOpen, setModalOpen] = useState(false);

    // 가격 총합 
    const [totalPay, setTotalPay] = useState(0);
    const [selectItem, setSelectItem] = useState([]);
    const [selItemID, setSelItemID] = useState(0);

    const sidoChange = (e) => {
        setSido(e.target.value);
        keyword.current.value = "";
    }

    const cateChange = (e) => {
        setCate(e.target.value);
        keyword.current.value = "";

    }

    const submitBtn = () => {
        if (!sido || !cate || keyword.current.value === '') {
            alert("모든 항목을 입력해주세요.");
            return;
        }

        setSearchData('');

        let url = `http://10.125.121.214:8080/api/search?sido=${sido}&cate=${cate}&keyword=${keyword.current.value}`;

        fetch(url)
            .then(resp => resp.json())
            .then(data => setSearchData(data))
            .catch(err => console.log(err));


        // setSearchData(testData); // 테스트 코드

    }

    // 엔터키 입력 처리
    const enterKeyDown = (e) => {
        if (e.key == "Enter") {
            submitBtn(e);
        }
    }

    // 수수료 부분 클릭
    const handleClick = () => {
        setModalOpen(true);
    }

    // 총 수수료 아이템 삭제
    const deleteSelItem = (targetId) => {
        // console.log("선택한 아이디:", targetId);
        setSelectItem(selectItem.filter((item) => item.id != targetId));
    }

    // 키워드 입력창 클릭했을 때 내용 지우기
    const keywordClick = () => {
        keyword.current.value = "";
    }

    useEffect(() => {
        if (!selectItem) return;

        // console.log("선택한 항목: ",selectItem);
    }, [selectItem])

    useEffect(() => {
        if (!sido || !cate) return;

        if(sido === "서구" && cate === "기타"){
            setOptionTags([]);
            return;
        }

        axios.get(`http://10.125.121.214:8080/api/wastename?sido=${sido}&cate=${cate}`)
            .then(resp => {
                // console.log("폐기물명: ", resp.data);
                setOptionTags(resp.data.map((item) => {
                    return (
                        <option key={item}>{item}</option>
                    )
                }))

            })
            .catch(err => console.log(err));

    }, [sido, cate])

    useEffect(() => {

        if (!searchData) return;

        // console.log("searchData", searchData)
        // 데이터 없을 때 처리 (나중에 수정)
        if (searchData.length == 0) {

        }

    }, [searchData])


    return (
        <>
            <div className="grow mt-[2rem] px-[8rem]">
                <div className="grid grid-cols-5 gap-4">
                    <div>
                        <CustomSelect optionItem={selSido} handleChange={sidoChange} />
                    </div>
                    <div>
                        <CustomSelect optionItem={selCate} handleChange={cateChange} />
                    </div>
                    <div className="col-span-2">
                        <input type="text"
                            ref={keyword}
                            list="list"
                            placeholder="키워드를 입력해주세요"
                            onClick={keywordClick}
                            onKeyDown={enterKeyDown}
                            className="w-full h-[2.5rem] px-4 rounded-lg border-none focus:border-[#5586f8] focus:ring-[#5586f8] bg-[#EDEDED] " />
                        <datalist id="list">
                            {optionTags}
                        </datalist>
                    </div>
                    <div>
                        <button
                            onClick={submitBtn}
                            className="flex  items-center justify-center font-bold bg-[#5586f8] text-white text-xl w-full h-full rounded-lg hover:bg-[#2969fd] transition-all">
                            검색
                        </button>
                    </div>
                </div>
                <div className="mt-[4rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-10">
                    {
                        searchData && searchData.map((item, idx) => <SearchItem key={`sp${idx}`} idx={idx}
                            name={item.name}
                            size={item.size}
                            pay={item.pay}
                            price={item.price}
                            manager={item.manager}
                            setTotalPay={setTotalPay}
                            totalPay={totalPay}
                            selectItem={selectItem}
                            setSelectItem={setSelectItem}
                            selItemID={selItemID}
                            setSelItemID={setSelItemID} />)
                    }
                </div>
            </div>
            <div className="fixed bottom-0 right-0 px-[8rem] mb-4">
                <div className="z-10 flex justify-end">
                    <div className="relative top-[15px] left-[10px] w-7 h-7 text-center  items-center rounded-full drop-shadow-lg bg-white border-2 border-[#ffe02f]">{selectItem.length}</div>
                </div>

                <div
                    onClick={handleClick}
                    className="w-full flex justify-between bg-now-blue hover:bg-[#2969fd] transition-all rounded-lg p-4 hover:cursor-pointer">
                    <div className="flex items-center gap-2">
                        <FaBasketShopping  className="text-xl text-white"/>
                        <p className="text-xl text-white">{totalPay.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")}원</p>
                    </div>
                </div>
            </div>
            {
                modalOpen
                    ? <Modal setModalOpen={setModalOpen} totalPay={totalPay} setTotalPay={setTotalPay} selectItem={selectItem} setSelectItem={setSelectItem} deleteSelItem={deleteSelItem} />
                    : ""
            }
        </>
    )
}

export default Search
