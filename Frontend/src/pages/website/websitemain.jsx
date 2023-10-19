import Showcase from './bgVideo'
import WebNavbar from './webNav'
import Heading from './heading.jsx'
import ItemsSection from './itemsection'
import FaqSection from './faq/faq'

import Banner from './banner/banner'
import ContactUs from './contactUs/contactUs'
import SimpleSlider from './reviewCard/simpleSlider'
import ReviewCard from './reviewCard/reviewCard'
import Map from './map/map'
import Footer from './footer/footer'
import MyCircularProgress from './circleCount/progress'

const reviews = [
  {
    name: 'John Doe',
    reviewBody:
    "I can't thank MS Enterprise enough for transforming my home. Their exquisite ceramics added a touch of elegance that I never thought was possible. ",
    starCount: 5,
    imgSrc: 'https://wallpaperaccess.com/full/1128282.jpg'
  },
  {
    name: 'John Doe',
    reviewBody:
      "My house feels like a work of art thanks to MS Enterprise's incredible range of ceramics. I highly recommend them! ",
    starCount: 5,
    imgSrc: 'https://wallpaperaccess.com/full/1128282.jpg'
  },
  {
    name: 'John Doe',
    reviewBody:
    "MS Enterprise has truly elevated the aesthetics of my home with their ceramics and sanitary items.",
    starCount: 5,
    imgSrc: 'https://wallpaperaccess.com/full/1128282.jpg'
  },
  {
    name: 'John Doe',
    reviewBody:
    "My family and I are amazed at the impact MS Enterprise's ceramics and sanitary items have had on our home. ",
    starCount: 5,
    imgSrc: 'https://wallpaperaccess.com/full/1128282.jpg'
  }
  ,
  {
    name: 'John Doe',
    reviewBody:
    "My home renovation wouldn't have been the same without MS Enterprise's ceramics and sanitary items.",
    starCount: 5,
    imgSrc: 'https://wallpaperaccess.com/full/1128282.jpg'
  },
  {
    name: 'John Doe',
    reviewBody:
    "Their sanitary items are not only beautiful but also high-performing. I'm beyond satisfied!",
    starCount: 5,
    imgSrc: 'https://wallpaperaccess.com/full/1128282.jpg'
  },
  {
    name: 'John Doe',
    reviewBody:
    "I was skeptical about renovating my kitchen, but MS Enterprise's ceramics breathed new life into the space. ",
    starCount: 5,
    imgSrc: 'https://wallpaperaccess.com/full/1128282.jpg'
  },
  {
    name: 'John Doe',
    reviewBody:
    "Thanks to MS Enterprise, my home now feels like a dream. The ceramics and sanitary items have made a world of difference.",
    starCount: 5,
    imgSrc: 'https://wallpaperaccess.com/full/1128282.jpg'
  },
  {
    name: 'John Doe',
    reviewBody:
    "I owe my beautiful home to MS Enterprise. I've received countless compliments from friends and family",
    starCount: 5,
    imgSrc: 'https://wallpaperaccess.com/full/1128282.jpg'
  }
]

const Website = () => {
  return (
    <div style={{backgroundColor:""}}>
     
      <WebNavbar />
      <Showcase />
      <Heading style="  color:'rgba(52, 32, 1, 0.795)' " heading='OUR ITEMS' />
      
      <div className='container my-4'>
      <Heading
        style="  color:'rgba(52, 32, 1, 0.795)' "
        heading='Our Progress'
      />
        <div className="row my-2">
          <div style={{display:"flex", justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"1rem"}}  className="col-md-4  ">
            <MyCircularProgress totalCount={500}/>
            <h3 style={{fontSize:"1.75rem",fontWeight:"bolder",fontFamily:"initial"}}>Happy clients</h3>
          </div>
          <div style={{display:"flex", justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"1rem"}}  className="col-md-4 ">
          <MyCircularProgress totalCount={300}/>
            <h3 style={{fontSize:"1.75rem",fontWeight:"bolder",fontFamily:"initial"}}>Product</h3>
            </div>
            <div style={{display:"flex", justifyContent:"center",alignItems:"center",flexDirection:"column",gap:"1rem"}}  className="col-md-4 ">
          <MyCircularProgress totalCount={150}/>
            <h3 style={{fontSize:"1.75rem",fontWeight:"bolder",fontFamily:"initial"}}>Categories</h3>
            </div>
        
        </div>
      </div>
      <Heading
        style="  color:'rgba(52, 32, 1, 0.795)' "
        heading='Client Reviews'
      />
      <SimpleSlider>
        {reviews.map(review => {
          return (
            <ReviewCard
              key={review?.feedbackid ?? ''}
              reviewBody={review?.reviewBody ?? ''}
              name={review?.name ?? ''}
              starCount={review?.starCount ?? ''}
              imgSrc={review.imgSrc ?? ''}
            />
          )
        })}
      </SimpleSlider>
      {/* <Banner/> */}
      <ContactUs />
      <Heading style="color:'white'" heading='FAQs' />
      <FaqSection />
      <Heading heading="Where you can find us?"/>
      <Map />
      <Footer/>
  
    </div>
  )
}
export default Website
