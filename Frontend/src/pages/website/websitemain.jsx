import Showcase from './bgVideo'
import WebNavbar from './webNav'
import Heading from './heading.jsx'
import ItemsSection from './itemsection'
import FaqSection from './faq/faq'

import Banner from './banner/banner'
import ContactUs from './contactUs/contactUs'
import SimpleSlider from './reviewCard/simpleSlider'
import ReviewCard from './reviewCard/reviewCard'

const reviews = [
  {
    name: 'John Doe',
    reviewBody:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    starCount: 5,
    imgSrc: 'https://wallpaperaccess.com/full/1128282.jpg'
  },
  {
    name: 'John Doe',
    reviewBody:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    starCount: 5,
    imgSrc: 'https://wallpaperaccess.com/full/1128282.jpg'
  },
  {
    name: 'John Doe',
    reviewBody:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    starCount: 5,
    imgSrc: 'https://wallpaperaccess.com/full/1128282.jpg'
  },
  {
    name: 'John Doe',
    reviewBody:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
    starCount: 5,
    imgSrc: 'https://wallpaperaccess.com/full/1128282.jpg'
  }
]

const Website = () => {
  return (
    <div style={{backgroundColor:""}}>
      {' '}
      <WebNavbar />
      <Showcase />
      <Heading style="  color:'rgba(52, 32, 1, 0.795)' " heading='OUR ITEMS' />
      <ItemsSection />
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
      <Heading style="color:'white'" heading='FAQs' />
      <FaqSection />
      {/* <Banner/> */}
      <ContactUs />
    </div>
  )
}
export default Website
