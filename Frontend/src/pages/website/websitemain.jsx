import Showcase from './bgVideo'
import { Link } from 'react-router-dom';
import {Helmet} from "react-helmet";
import {fetchWebsiteProducts} from '../../functions/website'
import WebNavbar from './webNav'
import Heading from './heading.jsx'
import ItemsSection from './itemsection'
import FaqSection from './faq/faq'
import {useQuery} from "@tanstack/react-query";
import ItemCard from './itemCard/itemCard.jsx'
import Banner from './banner/banner'
import ContactUs from './contactUs/contactUs'
import SimpleSlider from './reviewCard/simpleSlider'
import ReviewCard from './reviewCard/reviewCard'
import Map from './map/map'
import Footer from './footer/footer'
import MyCircularProgress from './circleCount/progress'
import LoaderLayout from '../../components/loaders/loaderLayout'
import GeneralLoader from '../../components/loaders/generalLoader'
import avatar1 from "../../../assets/avatar1.png"
import avatar2 from "../../../assets/avatar2.jpg"
import avatar3 from "../../../assets/avatar3.png"
import avatar4 from "../../../assets/avatar4.jpg"
import avatar5 from "../../../assets/avatar5.jpg"
import avatar6 from "../../../assets/avatar6.jpg"
import avatar7 from "../../../assets/avatar7.avif"
import avatar8 from "../../../assets/avatar8.jpg"
import avatar9 from "../../../assets/avatar9.jpg"
import Button from './button/button'


const reviews = [
    {
        name: 'Ahmed Ali',
        reviewBody:
            "I can't thank MS Enterprise enough for transforming my home. Their exquisite ceramics added a touch of elegance that I never thought was possible. ",
        starCount: 5,
        imgSrc: avatar1
    },
    {
        name: 'Muhammad Sufiyan',
        reviewBody:
            "My house feels like a work of art thanks to MS Enterprise's incredible range of ceramics. I highly recommend them! ",
        starCount: 5,
        imgSrc: avatar2
    },
    {
        name: 'Usman ',
        reviewBody:
            "MS Enterprise has truly elevated the aesthetics of my home with their ceramics and sanitary items.",
        starCount: 5,
        imgSrc: avatar3
    },
    {
        name: 'Zainab Fatima',
        reviewBody:
            "My family and I are amazed at the impact MS Enterprise's ceramics and sanitary items have had on our home. ",
        starCount: 5,
        imgSrc: avatar4
    }
    ,
    {
        name: 'Laiba Asif',
        reviewBody:
            "My home renovation wouldn't have been the same without MS Enterprise's ceramics and sanitary items.",
        starCount: 5,
        imgSrc: avatar5
    },
    {
        name: 'Uzair Waqar',
        reviewBody:
            "Their sanitary items are not only beautiful but also high-performing. I'm beyond satisfied!",
        starCount: 5,
        imgSrc: avatar6
    },
    {
        name: 'Shahzaib Khan',
        reviewBody:
            "I was skeptical about renovating my kitchen, but MS Enterprise's ceramics breathed new life into the space. ",
        starCount: 5,
        imgSrc: avatar7
    },
    {
        name: 'Hamna Imran',
        reviewBody:
            "Thanks to MS Enterprise, my home now feels like a dream. The ceramics and sanitary items have made a world of difference.",
        starCount: 5,
        imgSrc: avatar8
    },
    {
        name: 'Khaula ',
        reviewBody:
            "I owe my beautiful home to MS Enterprise. I've received countless compliments from friends and family",
        starCount: 5,
        imgSrc: avatar9
    }
]

const Website = () => {
    const products = useQuery(['fetchWebsiteProducts'], fetchWebsiteProducts)
    if (products?.isLoading) {
        return (
            <LoaderLayout>
                <GeneralLoader />
            </LoaderLayout>
        );
    }
    const dataarr = products?.data?.data?.data ?? []
    const currData = dataarr?.slice(0, 8)
    const whatsappNumber = "+923358782828"
    const openWhatsappChat = () => {
        if (whatsappNumber) {
            const whatsappLink = `https://wa.me/${whatsappNumber}`;
            window.open(whatsappLink, '_blank');
        }
    };
    return (
        <div style={{backgroundColor: ""}}>

            <Helmet>
                <meta charSet="utf-8" />
                <title>MS Enterprise</title>
                <link rel="icon" type="image/png" href="../../../assets/logo1.png" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            </Helmet>
            <WebNavbar />
            <Showcase />
            <Heading style="  color:'rgba(52, 32, 1, 0.795)' " heading='OUR ITEMS' />
            <div className='container'>

                <div className="row">
                    {currData.map((item, index) => (
                        <ItemCard item={item} key={index} openWhatsappChat={openWhatsappChat} />
                    ))}
                </div>
        <Link to={'item'}>

                <Button text="Explore Now" />
        </Link>
            </div>


            <div id="aboutus" className='container my-4'>
                <Heading
                    style="  color:'rgba(52, 32, 1, 0.795)' "
                    heading='Our Progress'
                />
                <div className='container d-flex justify-content-center '><p style={{width:"90%", fontWeight:"bold",color:"rgba(52, 32, 1, 0.795)"}} className='text-center mb-4 fs-5'>Every step in our journey with MS Enterprise has been a testament to progress and growth. We're committed to reaching new heights and delivering excellence with every project!</p></div>
                <div className="row my-2">
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "1rem"}} className="col-md-4  ">
                        <MyCircularProgress totalCount={500} />
                        <h3 style={{fontSize: "1.75rem", fontWeight: "bolder", fontFamily: "initial"}}>Happy clients</h3>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "1rem"}} className="col-md-4 ">
                        <MyCircularProgress totalCount={300} />
                        <h3 style={{fontSize: "1.75rem", fontWeight: "bolder", fontFamily: "initial"}}>Product</h3>
                    </div>
                    <div style={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "1rem"}} className="col-md-4 ">
                        <MyCircularProgress totalCount={150} />
                        <h3 style={{fontSize: "1.75rem", fontWeight: "bolder", fontFamily: "initial"}}>Categories</h3>
                    </div>

                </div>
            </div>
            <Heading
        id={"reviews"}
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
            <Heading id={"faqs"} style="color:'white'" heading='FAQs' />
            <FaqSection />
            <Heading id={"location"} heading="Where you can find us?" />
            <Map />
            <Footer />

        </div>
    )
}
export default Website
