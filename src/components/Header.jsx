import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { AiOutlineShoppingCart} from "react-icons/ai";
import {Link} from "react-router-dom";

const Header = (props) => {

    const handheldLogout = () => {
        localStorage.clear()
        props.setAut(false)
        props.setUser({})
    }
    return(
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand><Link to={"/"}>Zusha Soup</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Categories" id="basic-nav-dropdown">
                            <Link to={"/men"}>Men</Link>
                            <br/>
                            <Link to={"/women"}>Women</Link>
                        </NavDropdown>
                        {props.aut && <Navbar.Text>
                            <Link to={"cort"}><AiOutlineShoppingCart /></Link>
                        </Navbar.Text>}
                    </Nav>
                    {!props.aut&& <Navbar.Text>
                        <Link to={"Login"}>login/</Link>
                    </Navbar.Text>}
                    {!props.aut && <Navbar.Text>
                            <Link to={"Register"}>Register</Link>
                    </Navbar.Text>}
                    {props.aut && <Navbar.Text>
                        Signed in as: <h1>{props.user.userName}</h1>
                        <Button onClick={handheldLogout}>log out</Button>
                    </Navbar.Text>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Header;