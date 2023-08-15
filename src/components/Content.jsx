import React, { useState, useEffect } from 'react';
import axios from "../api/axios";

const Content = ({aut, setUser, user, category}) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        async function fetchData(){
            const response = await axios.get(`https://dummyjson.com/products/category/${category}`);
            setProducts(response.data.products);
        }
        fetchData().then(r => console.log(r));
    }, [category]);

        const handleAdToCort = async (product) => {
            const items = [...user.products, product.id];
            console.log(items)
            const updateUser = {
                'id': user.id,
                'userName': user.userName,
                "userEmail": user.userEmail,
                "passWord": user.passWord,
                'wishlist': user.wishlist,
                'products': items
            };
            await axios.put(`http://localhost:3001/clients/${user.id}`, updateUser)
            setUser(updateUser)
            alert(`product ${product.title} as ban add do cort`)
        }


    const handleOpenModal = (product) => {
        setSelectedProduct(product);
    };

    const handleCloseModal = () => {
        setSelectedProduct(null);
    };

    const renderMoreImagesModal = () => {
        if (!selectedProduct) return null;

        return (
            <div className="modal" tabIndex="-1" role="dialog" style={{ display: selectedProduct ? "block" : "none" }}>
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{selectedProduct.title} - More Photos</h5>
                            <button type="button" className="close" aria-label="Close" onClick={handleCloseModal}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                {selectedProduct.images.map((img, index) => (
                                    <div key={index} className="col-md-4 mb-3">
                                        <img src={img} alt={`product ${index}`} className="img-thumbnail img-fluid" style={{ height: "200px" }} />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="container">
            <div className="row">
                {products.map(product => (
                    <div key={product.id} className="col-lg-4 mb-4">
                        <div style={{ height: "100%" }}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h2 className="card-title">{product.title}</h2>
                                    <p className="card-text">{product.description}</p>
                                    <p className="card-text">Price: ${product.price}</p>
                                    <p className="card-text">Rating: {product.rating}</p>
                                    <button type="button" className="btn btn-outline-primary" onClick={() => handleOpenModal(product)}>
                                        View More Photos
                                    </button>
                                    {aut && <button type={"button"} className={"btn btn-outline-primary"}
                                                    onClick={() => handleAdToCort(product)}>ad to cort</button>}
                                </div>
                                <img src={String(product.images[0])} alt={`Product ${product.id}`} className="card-img-top img-thumbnail img-fluid" style={{ height: "300px" }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {renderMoreImagesModal()}
        </div>
    );
};

export default Content;
