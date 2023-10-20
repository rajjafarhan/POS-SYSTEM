import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  
    faArrowRight 
  } from "@fortawesome/free-solid-svg-icons";
import "./button.css"
const Button =({text})=>{
    return(
        <>

        <div className="d-flex justify-content-center my-5 ">

        <button className="myexplorebutton mytextstyle">{text} <FontAwesomeIcon icon={faArrowRight} /></button>
        </div>

        </>
    )
}
export default Button;
