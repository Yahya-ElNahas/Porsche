import Control_Panel from '../components/control-panel-about';
import './styles/about.css';

function About() {
    return (
        <div className="about-body">
            <link href="https://fonts.cdnfonts.com/css/neueral" rel="stylesheet" />
            <Control_Panel/>
            <header>
                <div className='about'>
                <div className="row">
                    <div className="imgWrapper">
                        <img src="https://qph.cf2.quoracdn.net/main-qimg-93aeaadcd886cde742288bdaa842a05f-pjlq" alt="Mission" /> 
                    </div>
                    <div className="contentWrapper"> 
                        <div className="content">
                            <h2 className="text1"><span>Mission</span></h2>
                            <p>Porsche, the German automotive manufacturer, has a mission centered around engineering excellence, innovation, and performance. While it does not have an explicitly stated mission statement, the essence of Porsche's mission revolves around several key principles.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="imgWrapper">
                        <img src="https://porschecarshistory.com/wp-content/old/allin2/14/02.jpg" alt="Achievements" /> 
                    </div>
                    <div className="contentWrapper">
                        <div className="content">
                            <h2 className="text2"><span>Achievements</span></h2>
                            <p>Porsche does not only have a history in Formula 1; it also made a name for itself in various other motorsport categories. Its greatest success was undoubtedly in the 24 Hours of Le Mans. Porsche is still the record holder with eighteen victories. The brand's first victory came with the Porsche 917 in 1970, after which a very successful decade began. Porsche's cars continued to dominate the sport in the 1970s, with a string of victories to their name. It was a prelude to a successful future.</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="imgWrapper">
                        <img src="https://i.pinimg.com/736x/36/6b/3b/366b3b1982e4280da6485893cbe654a6.jpg" alt="History" /> 
                    </div>
                    <div className="contentWrapper"> 
                        <div className="content">
                            <h2 className="text3"><span>History</span></h2>
                            <p>Probably the best track car that you can drive on the street. The engine is in the very back and it’s a flat 6. It’s the nutty Porsche 911 GT2 RS. This crazy cool Porsche has a 3.8 liter twin-turbocharged flat 6 that puts out a mind-blowing 700 horsepower and 553 feet of torque! For a gearbox, it has an automatic 7-speed dual-clutch.</p>
                        </div>
                    </div>
                </div>
                </div>
            </header>
        </div>
    );
}

export default About;
