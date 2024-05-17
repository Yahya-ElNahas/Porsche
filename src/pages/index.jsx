import { useRef, useState } from 'react';
import porsche_video from '../assets/video_background.mp4';
import Control_Panel from '../components/control-panel-index';
import './styles/index.css';

function Index() {
    const ref = useRef();
    const [playing, setPlaying] = useState(true);

    const vidclick = () => {
        if (playing) {
            ref.current.pause();
        } else {
            ref.current.play();
        }
        setPlaying(!playing);
    };

    const setvolume = () => {
        if (ref.current) {
            ref.current.volume = 0.2;
        }
    };

    return (
        <div className='index'>
            <link rel="stylesheet" href="https://fonts.cdnfonts.com/css/911-porscha"/>
            <header>
                <Control_Panel />
                <div className='vid' onClick={vidclick}>
                    <video src={porsche_video} ref={ref} autoPlay loop onLoadStart={setvolume}></video>
                </div>
                <div className='sec2'>
                    <h1>Latest Vehicles</h1>
                    <div className='latest'>
                        <div className='sel'>
                            <h3>Porsche 718</h3>
                            <img src="https://images.pistonheads.com/nimg/47515/blobid0.jpg" alt="Porsche 718" />
                            <p>Mid-engined roadsters that unite the sporting spirit of the legendary Porsche 718 with the sports car of tomorrow.</p>
                            <a href="/" className='readmore'>Read more</a>
                        </div>
                        <div className='sel'>
                            <h3>Porsche 911</h3>
                            <img src="https://cdn.motor1.com/images/mgl/kvjPR/s1/2022-porsche-911-carrera-gts-front-3-4.webp" alt="Porsche 911" />
                            <p>Fewer kilograms equals more agility and contact with the road is more important than ever.</p>
                            <a href="/" className='readmore'>Read more</a>
                        </div>
                        <div className='sel'>
                            <h3>Porsche Taycan</h3>
                            <img src="https://cdn-images.fleetnews.co.uk/thumbs/1200x900/web-clean/1/electric-car-galleries/electric-car-vans/galleries/porsche-taycan/porsche-taycan-gts-012x.jpg" alt="Porsche Taycan" />
                            <p>The overwhelming feeling of sitting in an amazing electric sports car: the new Taycan makes electricity even more electrifying.</p>
                            <a href="/" className='readmore'>Read more</a>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Index;
