import React, {useEffect, useState} from "react";
import {fetchWebsiteProducts} from '../../functions/website'
import {search} from "../../helpers/search.js";
import SearchBar from '../../components/searchBar/searchBar.jsx'
import MySelect from '../../components/select/select'
import Pagination from '@mui/material/Pagination';
import ItemCard from './itemCard/itemCard.jsx'
import {useQuery} from "@tanstack/react-query";


const ItemsSection = () => {
    const products = useQuery(['fetchWebsiteProducts'], fetchWebsiteProducts)
    const dataarr = products?.data?.data?.data ?? []
    const categories = products?.data?.data?.categories ?? []

    const [query, setQuery] = useState('')
    const [category, setCategory] = useState('All')
    const [whatsappNumber, setWhatsappNumber] = useState('03363453451');
    const openWhatsappChat = () => {
        if (whatsappNumber) {
            const whatsappLink = `https://wa.me/${whatsappNumber}`;
            window.open(whatsappLink, '_blank');
        }
    };
    let filteredData = dataarr;

    if (category !== "All") {
        const d = dataarr.filter((prod) => {
            return prod?.category === category
        })
        filteredData = d

    }
    const data = search(filteredData, query) ?? [];
    let pages = Math.ceil(dataarr?.length / 16);
    let [curr, setcurr] = useState(1);
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
