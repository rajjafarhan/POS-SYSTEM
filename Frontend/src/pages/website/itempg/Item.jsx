import React, { useState } from 'react'
import SearchBar from '../../../components/searchBar/searchBar'
import MySelect from '../../../components/select/select'
import ItemsSection from '../itemsection'
import WebNavbar from '../webNav'
import Heading from '../heading'

const Item = () => {
  const [item, setItem] = useState('')
  const [category, setCategory] = useState('')
  return (
    <>
      <WebNavbar />
      <div className='bgpic'>
        <div className='container item-bg '>
          <div className='container px-5 '>
            <Heading heading={'OUR ITEMS'} />
            <div className='row '>
              <div className='col-md-6 my-2'>
                <SearchBar value={item} setValue={setItem} width={'w-2rem'} />
              </div>
              <div className='col-md-6 my-2'>
                <MySelect
                  name='Search by'
                  setter={setCategory}
                  values={[
                    'washbasin',
                    'tap',
                    'shower',
                    'toilet',
                    'tiles',
                    'mirror',
                    'bath'
                  ]}
                  curr={category}
                />
              </div>
            </div>
          </div>
          <ItemsSection />
        </div>
      </div>
    </>
  )
}

export default Item
