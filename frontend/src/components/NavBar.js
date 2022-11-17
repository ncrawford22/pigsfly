import { Container, Nav } from "react-bootstrap";
import Navbar from 'react-bootstrap/Navbar';

function NavBar({ owner, setOwner }) {

    const logout = () => {
        setOwner({})
        localStorage.removeItem("token")
    }

    if (owner) {
        if (owner === "Let Me See Your TDs") {
            return (
                <Navbar style={{backgroundColor: 'rgba(0, 0, 255, 0.123)', boxShadow: '0 1px 3px blue'}} expand="sm">
                    <Container>
                        <Navbar.Brand href="/">
                            <img src="./favicon.ico" alt="React Icon" id="icon"/>
                        </Navbar.Brand>
                        <Navbar.Text style={{color: 'whitesmoke'}}>
                            Welcome, {owner}!
                        </Navbar.Text>
                        <Nav.Link href="/admin">Admin Controls</Nav.Link>
                        <Nav.Link href="/team">Team</Nav.Link>
                        <Nav.Link href="/smackboard">Smack Board</Nav.Link>
                        <Nav.Link onClick={logout} style={{color: 'whitesmoke'}}>Logout</Nav.Link>
                    </Container>
                </Navbar>
            )
            
        } else if (owner !== "Let Me See Your TDs") {
            return (
                <Navbar style={{backgroundColor: 'rgba(0, 0, 255, 0.123)', boxShadow: '0 1px 3px blue'}} expand="sm">
                    <Container>
                        <Navbar.Brand href="/">
                            <img src="./favicon.ico" alt="React Icon" id="icon"/>
                        </Navbar.Brand>
                        <Navbar.Text style={{color: 'white'}}>
                            Welcome, {owner}!
                        </Navbar.Text>
                        <Nav.Link href="/team">Team</Nav.Link>
                        <Nav.Link href="/smackboard">Smack Board</Nav.Link>
                        <Nav.Link onClick={logout} style={{color: 'whitesmoke'}}>Logout</Nav.Link>
                    </Container>
                </Navbar>
            )
        }

    } else {
        return (
            <Navbar style={{backgroundColor: 'rgba(0, 0, 255, 0.123)', boxShadow: '0 1px 3px blue'}} expand="sm">
                <Container>
                    <Navbar.Brand href="/">
                        <img src="./favicon.ico" alt="React Icon" id="icon"/>
                        </Navbar.Brand>
                        <Nav.Link href="/login">Login</Nav.Link>
                        <Nav.Link href="/register">Register</Nav.Link>
                </Container>
            </Navbar>
        )
    }
}

export default NavBar;