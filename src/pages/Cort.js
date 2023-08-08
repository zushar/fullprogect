import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "../api/axios";
const LOGIN_URL = "clients"

const Cort = (props) => {
    const [itemsList, setItemsList] = useState([])
    const [items, setItems] = useState({})
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${LOGIN_URL}/${props.user.id}`);
            setItemsList((prev)=>([
                ...prev,
                response.products
            ]));
        } catch (error) {
            console.error(error);
        }
        itemsList.map(async (id, index) => {
            try {
                const response = await axios.get(`https://dummyjson.com/products/${id}`);
                setItems((prev) =>({
                    ...prev,
                    "id": index,
                    "title": response.data[0].title,
                    "description": response.data[0].description,
                    "img": response.data[0].thumbnail
                }));
                console.log(items)
            } catch (error) {
                console.error(error);
            }
        })
    };

        // if(props.user.products.length===0){
        //     return <h1><Link to={'/'}>Add items to cort</Link></h1>
        // }
    return(
        <h1>cort</h1>
    );
}
export default Cort;