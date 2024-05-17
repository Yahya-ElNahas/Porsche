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
                        <Link to="/admin_home">
                            <span class="icon"><ion-icon name="car-sport-outline"></ion-icon></span>
                            <span class="txt">Products</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/delete_customer">
                            <span class="icon"><ion-icon name="close-circle-outline"></ion-icon></span>
                            <span class="txt" style={{'fontSize':'13px'}}>Delete Customer</span>
                        </Link>
                    </li>
                    <div class="reload">
                        <li>
                            <Link to="/account">
                                <span class="icon"><ion-icon name="person-circle-outline"></ion-icon></span>
                                <span class="txt">Account</span>
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