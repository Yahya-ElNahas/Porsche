import {Helmet} from 'react-helmet'
import { Link } from 'react-router-dom'
import porsche_logo from '../assets/Porsche-Logo.svg'
import Cookies from 'js-cookie'
import './styles/control-panel-style.css'

function Control_Panel_Admin() {

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
                        <Link to="/admin_home">
                            <span class="icon"><ion-icon name="car-sport-outline"></ion-icon></span>
                            <span class="txt">Products</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/manage_customers">
                            <span class="icon"><ion-icon name="people-circle-outline"></ion-icon></span>
                            <span class="txt">Customers</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/add_product">
                            <span class="icon"><ion-icon name="car-sport-outline"></ion-icon></span>
                            <span class="txt">Add Product</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/alter_product">
                            <span class="icon"><ion-icon name="car-sport-outline"></ion-icon></span>
                            <span class="txt">Edit Product</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/delete_product">
                            <span class="icon"><ion-icon name="car-sport-outline"></ion-icon></span>
                            <span class="txt" style={{'fontSize':'13px'}}>Delete Product</span>
                        </Link>
                    </li>
                    <div class="reload">
                        <li>
                            <Link to="/porsche" onClick={clearCookies}>
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

export default Control_Panel_Admin