import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Porsche-Logo.svg'
import './styles/load.css'

function Load() {

    const loadingRef = useRef()

    const navigate = useNavigate()

    useEffect(() => {
        const fadeOut = setTimeout(() => {
            if (loadingRef.current) {
                loadingRef.current.style.opacity = 0;
            }
        }, 2000);

        const removeAndRedirect = setTimeout(() => {
            if (loadingRef.current) {
                loadingRef.current.remove();
            }
            navigate('/porsche');
        }, 3000);

        return () => {
            clearTimeout(fadeOut);
            clearTimeout(removeAndRedirect);
        };
    }, []);

    return (
        <div className="load">
            <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/911-porscha"/>
            <header>
                <div class="loading" id="loading_div" ref={loadingRef}>
                    <img class="logo_load" src={logo} alt="#"/>
                    <div class="start-div"><p>Porsche</p></div>
                </div>
            </header>
        </div>
    )
}

export default Load