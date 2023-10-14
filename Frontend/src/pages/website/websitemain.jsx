import Showcase from "./bgVideo";
import WebNavbar from "./webNav";
import Heading from "./heading.jsx";
import ItemsSection from "./itemsection";
import FaqSection from "./faq/faq";

import Banner from "./banner/banner";

const Website = () => {
  return (
    <>
      <WebNavbar />
      <Showcase />
      <Heading heading="OUR ITEMS" />
      <ItemsSection />
      <Heading heading="FAQs" />
      <FaqSection />
      {/* <Banner/> */}
    </>
  );
};
export default Website;
