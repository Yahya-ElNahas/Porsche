import {Helmet} from 'react-helmet'
import { Link } from 'react-router-dom'
import porsche_logo from '../assets/Porsche-Logo.svg'
import './styles/control-panel-contact.css'

function Control_Panel_Customer() {
    return (
        <>
            <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/911-porscha"/>
            <Helmet>
                <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
                <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
            </Helmet>
            <header>
            <div class="control-panel-custom">
                <ul>
                    <div class="logo-custom">
                        <li>
                        <a>
                            <span class="icon-custom"><img class="img-custom" src={porsche_logo}/></span> 
                            <span class="txt-custom">Porsche</span>
                        </a>
                        </li>
                    </div>
                    <li>
                        <Link to="/cart">
                            <span class="icon-custom"><ion-icon name="cart-outline"></ion-icon></span>
                            <span class="txt-custom">Cart</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/about">
                            <span class="icon-custom"><ion-icon name="home-outline"></ion-icon></span>
                            <span class="txt-custom">About us</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact">
                            <span class="icon-custom"><ion-icon name="mail-outline"></ion-icon></span>
                            <span class="txt-custom">Contact us</span>
                        </Link>
                    </li>
                    <div class="reload-custom">
                        <li>
                            <Link to="/profile">
                                <span class="icon-custom"><ion-icon name="person-circle-outline"></ion-icon></span>
                                <span class="txt-custom">Account</span>
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