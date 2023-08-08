import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { AiOutlineShoppingCart} from "react-icons/ai";
import {Link} from "react-router-dom";

const Hedar = (props) => {
    return(
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand><Link to={"/"}>Zusha Soup</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavDropdown title="Categories" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Men</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Women
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Checkout
                            </NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link href="#home">Home</Nav.Link>
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
                        Signed in as:{props.user.userName}
                    </Navbar.Text>}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}
export default Hedar;