import {useEffect, useRef, useState,} from "react";
import {Link, useNavigate}    from "react-router-dom";
import axios from "../api/axios";
const LOGIN_URL = "clients"

const Login = (props) => {

    const errRef = useRef();
    const navigate = useNavigate();

    const [email,setEmail]=useState("");
    const [pass,setPass]=useState("");
    const [errMsg,setErrMsg]=useState("");


    useEffect(()=>{
        setErrMsg('');
    },[email,pass])

    const handleSubmit = async (e) => {
      e.preventDefault();

      try {
          const response = await axios.get(`${LOGIN_URL}?userEmail=${email}&passWord${pass}`)
          if(response.data.length===0){
              throw new Error("not a user");
          }
          if(response.data[0].passWord !== pass){
              throw new Error("nut the password.")
          }
          console.log(response.data[0])
          props.setUser((prov)=>({
              ...prov,
              'id': response.data[0].id,
              'userName': response.data[0].userName,
              "userEmail": response.data[0].userEmail,
              "passWord": response.data[0].passWord,
              'wishlist': [],
              'products': response.data[0].products

          }));
          props.setAut(true);
          setEmail("");
          setPass("");
          navigate("/")
      }catch (err) {
        setErrMsg("try agan")
      }
      console.log(props.user.id);
    }

    return (
        <>
            <div className={"auth-form-container"}>
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
                <h1>Sign in</h1>
                <form className="login-form" onSubmit={handleSubmit}>
                    <label htmlFor={"email"}>Email:</label>
                    <input
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        type={"email"}
                        id={"email"}
                        required={true}
                        autoComplete={'off'}
                    />
                    <label htmlFor={"password"}>Password:</label>
                    <input
                        value={pass}
                        onChange={(e)=> setPass(e.target.value)}
                        type={"password"}
                        id={"password"}
                        required={true}
                    />
                    <button type={"submit"}>Log In</button>
                </form>
                <p>
                    Con`t have an account?<br/>
                    <span className="link-btn" >
                        <Link to={"/Register"}>Register here.</Link>
                    </span>
                </p>
            </div>
            </>
    )
}

export default Login;