
const CustomSelect = ({ id, optionItem, handleChange }) => {
    const options = optionItem.map((item, idx)=>{
        return <option key={idx} value={item} className="bg-white">{item}</option>
    })
    return (
        <select onChange={handleChange} className="w-[100%] h-[2.5rem] border-none bg-[#EDEDED] rounded-lg focus:border-[#5586f8] focus:ring-[#5586f8] ">
            <option value='' className="bg-white">선택</option>
            {options}
        </select>
    )
}

export default CustomSelect
