import Heading from '../heading'
import './contactUs.css'
import { GrLocation } from 'react-icons/gr'
import { BsFillTelephoneFill } from 'react-icons/bs'
import { AiOutlineMail } from 'react-icons/ai'
import { BsFillSendFill } from 'react-icons/bs';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const ContactUs = () => {
  return (
    <>
      <div id="contactus" className='container-fluid contactus'>
        <div className='laycontactUs'></div>
        <div className='d-flex flex-column container  '>
          <h1
            className='d-flex justify-content-center my-3'
            style={{ fontSize: '3.5rem' ,color:"white"}}
          >
            Contact Us
          </h1>
          <p style={{color:'white'}} className='d-flex justify-content-center fs-6'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ad, ex?
            Tempore eaque molestiae atque ab laudantium magnam fugit corporis
            amet.
          </p>
        </div>

        <div className='container'>
          <div className='row'>
            <div
              className='col-md-6 d-flex'
              style={{
                alignItems: 'center',
                height:'30rem'
              }}
            >
              <div className='d-flex flex-column  slideup-animation'>
                <div className='d-flex gap-3 my-2  border-bottom border-3'>
                  <div
                    style={{
                      height: '3rem',
                      width: '3rem',
                      borderRadius: '3rem',
                      backgroundColor: 'white',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <GrLocation
                      style={{ color: 'black', fontSize: '1.5rem' }}
                    />
                  </div>
                  <div className='d-flex flex-column g-1 '>
                    <h4 style={{color:"rgb(2, 150, 179)",fontWeight:"bolder"}}>Address</h4>
                    <p style={{color:"white",fontWeight:"bolder"}}>123, Main Road, New City, My Country </p>
                  </div>
                </div>

                <div className='d-flex gap-3 my-2  border-bottom border-3'>
                  <div
                    style={{
                      height: '3rem',
                      width: '3rem',
                      borderRadius: '3rem',
                      backgroundColor: 'white',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <BsFillTelephoneFill
                      style={{ color: 'black', fontSize: '1.5rem' }}
                    />
                  </div>
                  <div className='d-flex flex-column g-1'>
                    <h4 style={{color:"rgb(2, 150, 179)",fontWeight:"bolder"}}>Phone</h4>
                    <p style={{color:"white",fontWeight:"bolder"}}>12345678</p>
                  </div>
                </div>
                <div className='d-flex gap-3 my-2  border-bottom border-3'>
                  <div
                    style={{
                      height: '3rem',
                      width: '3rem',
                      borderRadius: '3rem',
                      backgroundColor: 'white',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <AiOutlineMail
                      style={{ color: 'black', fontSize: '1.5rem' }}
                    />
                  </div>
                  <div className='d-flex flex-column g-1'>
                    <h4 style={{color:"rgb(2, 150, 179)",fontWeight:"bolder"}}>Email</h4>
                    <p style={{color:"white",fontWeight:"bolder"}}>rajja@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
            <div  className='col-md-6 '>


                        <form>

                <div style={{
                    height:'29rem',
                    backgroundColor:'white'
                }} className='d-flex  flex-column my-5 p-5 shadow-lg slideup-animation'>
                    <h2 style={{color:"rgb(2, 150, 179)"}} className='py-2'>Send Message</h2>
                    <div className='d-flex flex-column gap-4'>
                    <TextField fullWidth label=" Full Name" id="fullWidth" />
                    <TextField fullWidth label=" Email" id="fullWidth" />
                    <TextField fullWidth label="Message" id="fullWidth" />
                    <button className='submitCon'> <BsFillSendFill className='mx-1'/>Submit</button> 
                    </div>
                   



                </div>
                        </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ContactUs