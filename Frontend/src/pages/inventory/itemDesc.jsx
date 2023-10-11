import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {uploadImageAndGetURL} from "../../firebase/utils.js";
import {updateInventory} from "../../functions/inventory.js";
import {useMutation} from "@tanstack/react-query";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import ImageInput from "../../components/imageInput/imgInput.jsx";
import {useState} from "react";
import Checkbox from "@mui/material/Checkbox";
import LoaderLayout from "../../components/loaders/loaderLayout.jsx";
import GeneralLoader from "../../components/loaders/generalLoader.jsx";
import { toast } from "react-toastify";

const ItemAttribute = ({handleItemChange, product, isEditable}) => {
    return (
        <>
            <div className="mt-3  d-flex justify-content-between align-items-center">
                <h3 className="text-dgreen w-35">Name</h3>
                {!isEditable ? (
                    <p className="fs-5 text-wrap w-65">{product?.label}</p>
                ) : (
                    <input
                        name="label"
                        onChange={(e) => {
                            handleItemChange(e);
                        }}
                        className="w-65 border-1 fs-5 p-2"
                        type="text"
                        value={product?.label}
                    />
                )}
            </div>
            <div className="mt-3  d-flex justify-content-between align-items-center">
                <h3 className="text-dgreen w-35">Category</h3>
                {!isEditable ? (
                    <p className="fs-5 text-wrap w-65">{product?.category}</p>
                ) : (
                    <input
                        className="w-65 border-1 fs-5 p-2"
                        type="text"
                        name="category"
                        onChange={(e) => {
                            handleItemChange(e);
                        }}
                        value={product?.category}
                    />
                )}
            </div>
            <div className="mt-3  d-flex justify-content-between align-items-center">
                <h3 className="text-dgreen w-35">Qty</h3>
                {!isEditable ? (
                    <p className="fs-5 text-wrap w-65">{product?.qty}</p>
                ) : (
                    <input
                        name="qty"
                        onChange={(e) => {
                            handleItemChange(e);
                        }}
                        className="w-65 border-1 fs-5 p-2"
                        type="text"
                        value={product?.qty}
                    />
                )}
            </div>
            <div className="mt-3  d-flex justify-content-between align-items-center">
                <h3 className="text-dgreen w-35">Cost Price</h3>
                {!isEditable ? (
                    <p className="fs-5 text-wrap w-65">{product?.costPrice}</p>
                ) : (
                    <input
                        name="costPrice"
                        onChange={(e) => {
                            handleItemChange(e);
                        }}
                        className="w-65 border-1 fs-5 p-2"
                        type="text"
                        value={product?.costPrice}
                    />
                )}
            </div>
            <div className="mt-3  d-flex justify-content-between align-items-center">
                <h3 className="text-dgreen w-35">Selling Price</h3>
                {!isEditable ? (
                    <p className="fs-5 text-wrap w-65">{product?.sellingPrice}</p>
                ) : (
                    <input
                        name="sellingPrice"
                        onChange={(e) => {
                            handleItemChange(e);
                        }}
                        className="w-65 border-1 fs-5 p-2"
                        type="text"
                        value={product?.sellingPrice}
                    />
                )}
            </div>
            <div className="mt-3  d-flex justify-content-between align-items-center">
                <h3 className="text-dgreen w-35">Total</h3>
                {!isEditable ? (
                    <p className="fs-5 text-wrap w-65">{product?.qty * product?.costPrice}</p>
                ) : (
                    <input
                        className="w-65 border-1 fs-5 p-2"
                        type="text"
                        readOnly
                        value={product?.qty * product?.costPrice}
                    />
                )}
            </div>
            <div className="d-flex justify-content-between mt-2  align-items-center">
                <h3 className="text-dgreen w-6">Display on Website</h3>
                <Checkbox
                    name="addToWebsite"
                    checked={product.addToWebsite}
                    onChange={(e) => {
                        handleItemChange(e);
                    }}
                    inputProps={{"aria-label": "controlled"}}
                    disabled={!isEditable}
                />
            </div>
        </>
    );
};

const ItemDescription = ({refetch, setShowItemModal, product}) => {
    console.log(product)
    const mutation = useMutation({
        mutationFn: updateInventory,
    onSuccess: () => {
        toast.success("Product updated successfully! ")
        refetch()
    },
    onError:()=>{
        toast.error("Ops error! Product could not be Updated")
    }
    });

    const [isEditable, setIsEditable] = useState(false);
    const [item, setitem] = useState(product);
    const [img, setImg] = useState();

    if (mutation.isLoading) {
        return (
            <LoaderLayout>
                <GeneralLoader />
            </LoaderLayout>
        )
    }
    const handleItemChange = (e) => {
        if (e.target.name === "addToWebsite") {
            const {name, checked} = e.target;
            setitem({...item, [name]: checked});
        } else {
            const {name, value} = e.target;
            setitem({...item, [name]: value});
        }
    };

    return (
        <section className="bg-white rounded p-5 modal_bg">
            <div>
                <div className="d-flex justify-content-between align-items-center">
                    <h1 className="text-dgreen">Product Details 🧾</h1>
                    <button
                        onClick={() => {
                            setIsEditable(true);
                        }}
                        className="bg-none ms-5 border-0 bg-white text-grey"
                    >
                        <FontAwesomeIcon className="fs-3" icon={faPenToSquare} />
                    </button>
                    <button
                        onClick={() => setShowItemModal(false)}
                        className="text-dark btn-close ms-2 border-0 bg-white fs-4"
                        type="button"
                        aria-label="Close"
                    ></button>
                </div>
                <hr />
                <div className="d-flex flex-column ">
                    <ItemAttribute
                        handleItemChange={handleItemChange}
                        product={item}
                        isEditable={isEditable}
                    />
                </div>
                <div className="d-flex flex-column align-items-start">
                    <h3 className="text-dgreen w-50 mb-4 mt-2">Product Image:</h3>

                    <ImageInput
                        setcardImage={setImg}
                        img={<img src={item?.imgUrl} alt="" />}
                        setIsEditable={setIsEditable}
                    />
                </div>
                <div className="d-flex justify-content-center mt-5">
                    <button
                        onClick={async (e) => {
                            e.preventDefault();
                            setIsEditable(false);
                            let image;
                            if (img) {
                                let a = new Date();
                                const num = Math.round(
                                    Math.random() * 10000 + a.getMilliseconds()
                                );
                                image = await uploadImageAndGetURL(`/shop/${num}`, img);
                            }
                            mutation.mutate({...item, imgUrl: image ?? item.imgUrl});
                        }}
                        className="btn bg-dgreen text-white px-4 py-2"
                        disabled={!isEditable}
                    >
                        Save
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ItemDescription;
