import { IoMdAddCircle } from "react-icons/io";

const SearchItem = ({ idx, name, size, pay, price, manager, setTotalPay, totalPay, selectItem, setSelectItem, selItemID, setSelItemID }) => {

  const handleAdd = () => {
    const selectData = {
      id: selItemID,
      name: name,
      size: size,
      price: price
    };

    setSelItemID(selItemID + 1);
    setTotalPay(totalPay + price);
    setSelectItem([...selectItem, selectData])

  }

  return (
    <div
      key={`sp2${idx}`}
      className="border-2 border-[#5586f8] rounded-lg shadow-lg h-[15rem] md:h-[18rem] lg:h-[15rem] p-5">
      <h1 className="text-center text-xl font-bold mb-[1rem]">
        {name}
      </h1>
      <hr />
      <p className="mt-[1rem] mb-1 ">규격 : {size}</p>
      <p className="mb-1">유무료 : {pay}</p>
      <p className="mb-1">수수료 : {price}</p>
      <p>관리기관 : {manager}</p>
      <div className="flex justify-end">
        <button onClick={handleAdd}><IoMdAddCircle className="text-3xl text-now-blue hover:text-[#0044A9] transition-all" /></button>
      </div>
    </div>
  )
}

export default SearchItem
