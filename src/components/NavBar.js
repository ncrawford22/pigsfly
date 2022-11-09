import { Link } from "react-router-dom";

function Navbar({ owner, setOwner }) {

    const logout = () => {
        setOwner({})
        localStorage.removeItem("token")
    }

    if (owner) {
        return (
            <ul>
                <li>
                    <Link to="/">
                        <img src="./favicon.ico" alt="React Icon" id="icon"/>
                    </Link>
                </li>
                <li>
                    Welcome {owner}!
                </li>
                <li>
                    <Link to="/team">Team Page</Link>
                </li>
                <li>
                    <Link to="/smackboard">Smack Board</Link>
                </li>
                <li onClick={logout}>
                    <Link>Logout</Link>
                </li>
            </ul>
        )
    } else {
        return (
            <ul>
                <li>
                    <Link to="/">
                        <img src="./favicon.ico" alt="React Icon" id="icon"/>
                    </Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
            </ul>
        )
    }
}

export default Navbar;