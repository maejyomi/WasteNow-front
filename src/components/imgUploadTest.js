import { useEffect, useState } from "react";


const NanoomList = () => {
    const [imgurl, setImgurl] = useState();

    const handleChange = () => {
        const file = document.querySelector("#img_id").files[0];

        const reader = new FileReader();
        reader.onload = (e) => {
            setImgurl(e.target.result)

        } 
        reader.readAsDataURL(file);
        
    }

    useEffect(()=>{
        console.log(imgurl);
    },[imgurl])

    return (
        <div className="grow mt-[5rem] px-[8rem]">
            <div className="grid grid-cols-8 gap-4 h-[3rem]">
                <div className="col-span-6 bg-blue-300 w-full">
                    test
                </div>
                <div className="col-span-2 bg-red-300 w-full">
                    test
                </div>
            </div>

            <div className="h-full w-full mt-[2rem] border-black border-2">
                <label htmlFor="img_id">test</label>
                <input type="file" className="hidden" id='img_id' onChange={handleChange}/>
                {imgurl
                &&
                <img src={imgurl}></img>
                }
            </div>
        </div>
    )
}

export default NanoomList
