import { IoIosCloseCircleOutline } from "react-icons/io";

const Modal = ({ setModalOpen, totalPay, setTotalPay, selectItem, setSelectItem, deleteSelItem }) => {
    console.log(selectItem);

    const modalClose = () => {
        setModalOpen(false);
    }

    // 아이템 삭제
    const deleteItem = (id, price) =>{
        console.log("삭제: ", id);
        deleteSelItem(id);
        setTotalPay(totalPay-price)
        
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30  flex justify-center items-center">
            <div className="bg-white drop-shadow-lg rounded-lg w-[450px] h-3/5 p-5">
                <div className="flex justify-between mb-3 items-center">
                    <h1 className="text-xl font-bold">선택 확인</h1>
                    <div onClick={modalClose}><IoIosCloseCircleOutline className="text-3xl" /></div>
                </div>
                <div className="flex flex-col h-[95%] justify-between">
                    <div>
                        {
                            selectItem && selectItem.map((item) => {
                                return (
                                    <div key={item.id} className="flex gap-2 my-2 border-b-2 pb-2">
                                        <h1 className="w-[90%]">{item.name} : {item.size} ( {item.price}원 )</h1>
                                        <button onClick={() => deleteItem(item.id, item.price)} className="text-red-500">삭제</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="mb-[1.5rem] flex justify-end">
                        <p className="bg-[#f9eb71] px-1">총 수수료: {totalPay}원</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
