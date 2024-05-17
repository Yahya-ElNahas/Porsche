import {Helmet} from 'react-helmet'
import { Link } from 'react-router-dom'
import porsche_logo from '../assets/Porsche-Logo.svg'
import './styles/control-panel-style.css'

function Control_Panel() {
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
                        <Link to="/login">
                            <span class="icon"><ion-icon name="log-in-outline"></ion-icon></span> 
                            <span class="txt">Login</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/register">
                            <span class="icon"><ion-icon name="person-add-outline"></ion-icon></span>
                            <span class="txt">Register</span>
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
                        <li>
                            <Link to="/">
                                <span class="icon"><ion-icon name="reload-circle-outline"></ion-icon></span>
                                <span class="txt">Reload Page</span>
                            </Link>
                        </li>
                    </div>
                </ul>
            </div>
            </header>
        </>
    )
}

export default Control_Panel