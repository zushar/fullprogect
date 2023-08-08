
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Hedar from "./components/Hedar";
import Cort from "./pages/Cort"
import "./App.css"
import {useState} from "react";
const App = () => {
    const [user, setUser] =useState({})
    const [aut, setAut] = useState(false)
    return (
        <Router>
            <div className="App">
                <Hedar user={user} aut={aut}/>
                <div className="content">
                    <Routes>
                        <Route exat path={"/"} element={<HomePage user={user} setUser={setUser} aut={aut}/>}/>
                        <Route path={"/Login"} element={<Login setUser={setUser} user={user} setAut={setAut
                        }/>}/>
                        <Route path={"/Register"} element={<Register/>}/>
                        <Route path={"/cort"} element={<Cort user={user}/>}/>
                    </Routes>
                </div>
            </div>
        </Router>
    );

}
export default App ;


