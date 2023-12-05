import { Link } from "react-router-dom"
const MainBtn = ({link, imgSrc, imgAlt, title, handleClick}) => {
    return (
        <div>
            <div onClick={handleClick}
                className="max-w-[20rem] rounded-full shadow-lg hover:border-4 hover:border-now-blue hover:transition-all">
                <Link to={link}>
                    <img className="object-fit rounded-full" src={imgSrc} alt={imgAlt}/>
                </Link>
            </div>
            <h3 className="mt-5 font-bold text-white text-2xl">{title}</h3>
        </div>
    )
}

export default MainBtn
