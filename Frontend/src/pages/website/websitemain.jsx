import Showcase from "./bgVideo";
import WebNavbar from "./webNav";
import Heading from "./heading.jsx";
import ItemsSection from "./itemsection";


const Website=()=>{
    return(
        <>
        <WebNavbar/>
        <Showcase/>
        <Heading heading="OUR ITEMS"/>
        <ItemsSection/>
        </>
    )
}
export default Website; 