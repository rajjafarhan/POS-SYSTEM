import ItemsSection from '../itemsection'
import WebNavbar from '../webNav'
import Heading from '../heading'

const Item = () => {
  return (
    <>
      <WebNavbar />
      <div className='bgpic'>
        <div className='container item-bg '>
          <div className='container px-5 '>
            <Heading heading={'OUR ITEMS'} />
          </div>
          <ItemsSection />
        </div>
      </div>
    </>
  )
}

export default Item
