import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const Register = () => {
    const [email,setEmail] = useState("");
    const [pass,setPass] = useState("");
    const [name, setName] = useState("");
    let navigate = useNavigate()
    let jsonData ={

            "id": "",
            "userName": name,
            "userEmail": email,
            "passWord": pass,
            "wishlist": [],
            "products": []

        }
        //nid to do vledion;
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:3001/clients", {
            method: 'Post',
            headers:{'content-type':'application/json'},
            body: JSON.stringify(jsonData)
        })
            .then(res => {
                toast.success('Registered successfully.')
                navigate("/Login")
            })
            .catch(err=>{
                toast.error('failed :'+err.message);
            })
    }



    return (
        <div className={"auth-form-container"}>
            <h1>Register</h1>
            <form className="register-form" onSubmit={handleSubmit}>
                <label htmlFor={"name"}>name</label>
                <input
                    value={name}
                    onChange={(e)=> setName(e.target.value)}
                    type={"text"}
                    placeholder={"your full name"}
                    id={"name"}
                    name={"name"}
                    required={true}
                    autoComplete={'off'}
                />
                <label htmlFor={"email"}>email</label>
                <input
                    value={email}
                    onChange={(e)=> setEmail(e.target.value)}
                    type={"email"}
                    placeholder={"youremail@gmail.com"}
                    id={"email"}
                    name={"emil"}
                    required={true}
                    autoComplete={'off'}
                />
                <label htmlFor={"password"}>password</label>
                <input
                    value={pass}
                    onChange={(e)=> setPass(e.target.value)}
                    type={"password"}
                    id={"password"}
                    name={"password"}
                    autoComplete={'off'}
                />
                <button type={"submit"}>Register</button>
            </form>
            <p>
                Already have an account?<br/>
                <span className="link-btn" >
                    <Link to={"/Login"}>Login here.</Link>
                </span>
            </p>
        </div>
    );
}

export default Register;