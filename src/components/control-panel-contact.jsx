import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import porsche_logo from '../assets/Porsche-Logo.svg';
import './styles/control-panel-contact.css';

function ControlPanel() {
    return (
        <>
            <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/911-porscha" />
            <Helmet>
                <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
                <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
            </Helmet>
            <header>
                <div className="control-panel-custom">
                    <ul>
                        <div className="logo-custom">
                            <li>
                                <a>
                                    <span className="icon-custom">
                                        <img className="img-custom" src={porsche_logo} alt="Porsche Logo" />
                                    </span>
                                    <span className="txt-custom">Porsche</span>
                                </a>
                            </li>
                        </div>
                        <li>
                            <Link to="/login">
                                <span className="icon-custom"><ion-icon name="log-in-outline"></ion-icon></span>
                                <span className="txt-custom">Login</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/register">
                                <span className="icon-custom"><ion-icon name="person-add-outline"></ion-icon></span>
                                <span className="txt-custom">Register</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="/about">
                                <span className="icon-custom"><ion-icon name="home-outline"></ion-icon></span>
                                <span className="txt-custom">About us</span>
                            </Link>
                        </li>
                        <div className="reload-custom">
                            <li>
                                <Link to="/porsche">
                                    <span className="icon-custom"><ion-icon name="reload-circle-outline"></ion-icon></span>
                                    <span className="txt-custom">Return Home</span>
                                </Link>
                            </li>
                        </div>
                    </ul>
                </div>
            </header>
        </>
    );
}

export default ControlPanel;
