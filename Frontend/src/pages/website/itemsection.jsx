import React, {useEffect, useState} from "react";
import {fetchWebsiteProducts} from '../../functions/website'
import {search} from "../../helpers/search.js";
import SearchBar from '../../components/searchBar/searchBar.jsx'
import MySelect from '../../components/select/select'
import Pagination from '@mui/material/Pagination';
import ItemCard from './itemCard/itemCard.jsx'
import {useQuery} from "@tanstack/react-query";
import LoaderLayout from "../../components/loaders/loaderLayout";
import GeneralLoader from "../../components/loaders/generalLoader";

const getUniqueItems = (arr) => {
    let uniqueItems = []
    arr.forEach((elem)=> {
        if (!uniqueItems.includes(elem.toLowerCase())){
            uniqueItems.push(elem.toLowerCase())
        }
    })
    console.log("uniquee",uniqueItems)

    return uniqueItems;
}

const ItemsSection = () => {
    const products = useQuery(['fetchWebsiteProducts'], fetchWebsiteProducts)
    const [query, setQuery] = useState('')
    const [category, setCategory] = useState('All')
    let [curr, setcurr] = useState(1);
  if (products?.isLoading) {
    return (
      <LoaderLayout>
        <GeneralLoader />
      </LoaderLayout>
    );
  }
    const dataarr = products?.data?.data?.data ?? []
    
    const rawCategories = products?.data?.data?.categories ?? []
    const categories = getUniqueItems(rawCategories)

    const whatsappNumber='03358782828';
    const openWhatsappChat = () => {
        if (whatsappNumber) {
            const whatsappLink = `https://wa.me/${whatsappNumber}`;
            window.open(whatsappLink, '_blank');
        }
    };
    let filteredData = dataarr;

    if (category !== "All") {
        const d = dataarr.filter((prod) => {
            return prod?.category.toLowerCase() === category.toLowerCase()
        })
        filteredData = d

    }
    const data = search(filteredData, query) ?? [];
    let pages = Math.ceil(dataarr?.length / 16);
    const currData = data?.slice((curr - 1) * 16, curr * 16);

    return (
        <>
            <div className="container px-5">
                <div className='row '>
                    <div className='col-md-9 my-2'>
                        <SearchBar value={query} setValue={setQuery} width={'w-2rem'} />
                    </div>
                    <div className='col-md-3 my-2'>
                        <MySelect
                            name='Category'
                            setter={setCategory}
                            values={["All", ...categories]}
                            curr={category}
                        />
                    </div>
                </div>
                <div className="row">
                    {currData.map((item, index) => (
                        <ItemCard item={item} key={index} openWhatsappChat={openWhatsappChat} />
                    ))}
                </div>
                <div className="d-flex justify-content-end my-4">
                    <Pagination onChange={(e, val) => {
                        setcurr(val)
                    }} color="primary" count={pages} />

                </div>
            </div>

        </>
    );
};

export default ItemsSection;
