
const MySelect = ({ id, optionItem, handleChange }) => {
    const options = optionItem.map((item, idx)=>{
        return <option key={idx} value={item} className="bg-white">{item}</option>
    })
    return (
        <select onChange={handleChange} className="w-[100%] h-[3rem] border-none bg-[#EDEDED] rounded-lg px-5 focus:border-[#5586f8]">
            <option value='' className="bg-white">선택</option>
            {options}
        </select>
    )
}

export default MySelect
