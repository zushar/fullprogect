
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Hedar from "./components/Hedar";
import Cort from "./pages/Cort"
import "./App.css"
import {useEffect, useState} from "react";
import Content from "./components/Content";
const App = () => {
    const [user, setUser] =useState({})
    const [aut, setAut] = useState(false)

    useEffect(() => {
        if(localStorage.getItem("user")!== null){
            setUser(JSON.parse(localStorage.getItem("user")))
            setAut(true)
        }else{
            setUser({})
            setAut(false)
        }
    }, []);


    return (
        <Router>
            <div className="App">
                <Hedar setUser={setUser} user={user} setAut={setAut
                } aut={aut}/>
                <div className="content">
                    <Routes>
                        <Route exat path={"/"} element={<HomePage user={user} setUser={setUser} aut={aut} category="womens-dresses"/>}/>
                        <Route path={"/Login"} element={<Login setUser={setUser} user={user} setAut={setAut
                        }/>}/>
                        <Route path={"/Register"} element={<Register/>}/>
                        <Route path={"/cort"} element={<Cort user={user} setUser={setUser}/>}/>
                        <Route path={"/men"} element={ <Content user={user} setUser={setUser} aut={aut} category="mens-shoes"/>}/>
                        <Route path={"/Women"} element={ <Content user={user} setUser={setUser} aut={aut} category="womens-shoes"/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );

}
export default App ;


