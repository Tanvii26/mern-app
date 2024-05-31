import { useContext, useState } from "react";
import "./Navbar.scss"
import { ArrowDropDown, Notifications, Search } from '@mui/icons-material'
import { Link } from "react-router-dom";
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";
const Navbar = () => {

    const [isScrolled, setIsScrolled] = useState(false);
    const {dispatch} = useContext(AuthContext)
    window.onscroll = () => {
        setIsScrolled(window.pageYOffset === 0 ? false : true)
        return () => (window.onscroll = null) //cleanup func = removes event handler
    }
    // console.log(isScrolled)

    return (
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
            <div className="container">
                <div className="left">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png" alt="" />
                    <Link to="/" className="link">
                        <span>Home</span>
                    </Link>
                    <Link to="/series" className="link">
                        <span>Series</span>
                    </Link>
                    <Link to="/movies" className="link">
                    <span>Movies</span>
                    </Link>
                    <span>New</span>
                    <span>My List</span>

                </div>

                <div className="right">
                    <Search className="icon"></Search>
                    <span>KID</span>
                    <Notifications className="icon"></Notifications>
                    <img src="https://images.pexels.com/photos/6899260/pexels-photo-6899260.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500" alt="" />

                    <div className="profile">
                        <ArrowDropDown className="icon"> </ArrowDropDown>
                        <div className="options">
                            <span>Settings</span>
                            <span onClick={()=> dispatch(logout())}>Logout</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar