import './footer.scss'

const Footer = () => {
    return(
        <footer>
            <div className="containerFooter">
                <div className="mainFooter">
                    <div className="hc">
                    <h>Contact</h>
                    </div>
                    <div className="contact">
                        <div className="leftblock">
                            <div className="styleleft">
                                <p>Phone</p>
                                <h1>+7 (499) 350-66-04</h1>
                            </div>
                        </div>
                        <div className="rightblock">
                            <p>Socials</p>
                            <div className="footerImg">
                                <img src="./img/ic-instagram.png" alt="#" />
                                <img src="./img/ic-whatsapp.png" alt="#" />
                            </div>
                        </div>
                    </div>
                    <div className="adress">
                        <div className="leftblock">
                            <p>Adress</p> 
                            <h1>Dubininskaya Ulitsa, 96, Moscow, Russia, 115093</h1>
                        </div>
                        <div className="rightblock">
                            <p>Working Hours</p>
                            <h1>24 hours a day</h1>
                        </div>      
                    </div>
                    <div className="map">
                        <map name="map">
                        <iframe src="https://yandex.ru/map-widget/v1/?um=constructor%3A0078e14aa4c6f945da2fea0649ad05c0e97b7fd588f396b606215fb067788848&amp;source=constructor" width="1360" height="350" frameborder="0"></iframe>
                        </map>
                    </div>
                </div> 
            </div>
        </footer>
    )
}

export default Footer