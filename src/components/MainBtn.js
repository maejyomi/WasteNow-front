import { Link } from "react-router-dom"
const MainBtn = ({link, imgSrc, imgAlt, title}) => {
    return (
        <div>
            <div className="max-w-sm rounded-full shadow-lg hover:border-dotted hover:border-4 hover:border-now-blue hover:transition-all">
                <Link to={link}>
                    <img className="object-fit rounded-full" src={imgSrc} alt={imgAlt}/>
                </Link>
            </div>
            <h3 className="mt-5 font-bold text-slate-600 text-xl">{title}</h3>
        </div>
    )
}

export default MainBtn
