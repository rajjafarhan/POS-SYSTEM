import logo1 from "../../../../assets/MSimg1.avif";


const ItemCard = ({item, openWhatsappChat}) => {
    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };
    return (

        <div className='col-md-3 my-3' >
            <div className='mx-2'>

                <div className='card  img-zoom boxshadow ' style={{cursor: "pointer"}} onClick={openWhatsappChat} >
                    <img width={"180px"} height={"150px"} src={item?.imgUrl === "" ? logo1 : item?.imgUrl} className='card-img-top pb-1 ' alt='no pic' />
                    <div className='card-body ' style={{padding: 0, cursor: "pointer"}}>
                        <div
                            className="px-2 mt-2"
                            style={{display: "flex", justifyContent: "space-between"}}
                        >
                            <h5
                                className="card-title  "
                                style={{
                                    textTransform: "uppercase",
                                    fontWeight: "bolder",
                                    fontFamily: " 'Playfair Display', sans-serif;",
                                    height:"40px",
                                    fontSize:"15px"
                                }}
                            >
                                {item?.label}
                            </h5>
                            <h5 className="card-title ">{item?.sellingPrice}rs</h5>
                        </div>
                        <p
                            className="card-text px-2  "
                            style={{textTransform: "uppercase",fontSize:"14px",fontWeight:"bold"}}
                        >
                            {" "}
                            {item?.category}
                        </p>
                        <div
                            style={{
                                width: "100",
                                backgroundColor: getRandomColor(),
                                color: "white",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                height: "2rem",
                                borderRadius: "3px",
                            }}
                        >
                            <p >Buy Now</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ItemCard;

