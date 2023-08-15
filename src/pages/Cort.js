import React, { useEffect, useState } from "react";
import axios from "../api/axios";
const LOGIN_URL = "clients";

const Cort = (props) => {
    const [itemElements, setItemElements] = useState([]); // State to hold the item elements

    useEffect(() => {
        fetchData().then(r => console.log(r));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${LOGIN_URL}/${JSON.parse(localStorage.getItem("user")).id}`);
            localStorage.setItem("products", JSON.stringify(response.data.products));
            await fetchItems(); // Call fetchItems after fetching data
        } catch (error) {
            console.error(error);
        }
    };

    const fetchItems = async () => {
        const itemsList = JSON.parse(localStorage.getItem("products"));
        const itemElements = await Promise.all(
            itemsList.map(async (id) => {
                try {
                    let response = await axios.get(`https://dummyjson.com/products/${id}`);
                    return (
                        <div key={response.data.id} className="col-lg-4 mb-4">
                            <div style={{ height: "100%" }}>
                                <div className="card h-100">
                                    <div className="card-body">
                                        <h2 className="card-title">{response.data.title}</h2>
                                        <p className="card-text">{response.data.description}</p>
                                        <p className="card-text">Price: ${response.data.price}</p>
                                        <p className="card-text">Rating: {response.data.rating}</p>
                                        <button type="button" className="btn btn-outline-primary">
                                            bay naw
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary"
                                            onClick={() => removeProduct(id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                    <img
                                        src={String(response.data.images[0])}
                                        alt={`Product ${response.data.id}`}
                                        className="card-img-top img-thumbnail img-fluid"
                                        style={{ height: "300px" }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                } catch (error) {
                    console.error(error);
                    return null; // Handle the error gracefully, return null for this item
                }
            })
        );

        setItemElements(itemElements); // Set the item elements to state
    };

    const removeProduct = async (productId) => {
        const itemsList = JSON.parse(localStorage.getItem("products"));
        const updatedItems = itemsList.filter((id) => id !== productId);
        localStorage.setItem("products", JSON.stringify(updatedItems));
        await fetchItems(); // Update the list after removing the product
        const updateUser = {
            'id': props.user.id,
            'userName': props.user.userName,
            "userEmail": props.user.userEmail,
            "passWord": props.user.passWord,
            'wishlist': props.user.wishlist,
            'products': JSON.parse(localStorage.getItem("products"))
        };
        await axios.put(`http://localhost:3001/clients/${props.user.id}`, updateUser)
        props.setUser(updateUser)
    };



    return (
        <div className="container">
            <div className="row">{itemElements}</div>
        </div>
    );
};

export default Cort;
