import {Helmet} from 'react-helmet'
import { Link } from 'react-router-dom'
import porsche_logo from '../assets/Porsche-Logo.svg'
import Cookies from 'js-cookie'
import './styles/control-panel-style.css'

function Control_Panel_Customer() {

    const clearCookies = () => {
        for(const c in Cookies.get()) {
            Cookies.remove(c)
        }
    }

    return (
        <>
            <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/911-porscha"/>
            <Helmet>
                <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
                <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
            </Helmet>
            <header>
            <div class="control-panel">
                <ul>
                    <div class="logo">
                        <li>
                        <a>
                            <span class="icon"><img class="img" src={porsche_logo}/></span> 
                            <span class="txt">Porsche</span>
                        </a>
                        </li>
                    </div>
                    <li>
                        <Link to="/home">
                            <span class="icon"><ion-icon name="car-sport-outline"></ion-icon></span>
                            <span class="txt">Products</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart">
                            <span class="icon"><ion-icon name="cart-outline"></ion-icon></span>
                            <span class="txt">Cart</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/about">
                            <span class="icon"><ion-icon name="home-outline"></ion-icon></span>
                            <span class="txt">About us</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact">
                            <span class="icon"><ion-icon name="mail-outline"></ion-icon></span>
                            <span class="txt">Contact us</span>
                        </Link>
                    </li>
                    <div class="reload">
                        <li onClick={clearCookies}>
                            <Link to="/porsche">
                                <span class="icon"><ion-icon name="log-out-outline"></ion-icon></span>
                                <span class="txt">Log Out</span>
                            </Link>
                        </li>
                    </div>
                </ul>
            </div>
            </header>
        </>
    )
}

export default Control_Panel_Customer