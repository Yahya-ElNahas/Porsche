import Control_Panel from "../components/control-panel-contact";
import './styles/contact.css';

function Contact() {
    return (
        <div className="contact-body">
            <header>
                <Control_Panel />
                <div className="headcontact">
                    <h2>Contact us</h2>
                    <form id="form" className="contactform">
                        <div className="formkolo">
                            <label htmlFor="name">Name:</label>
                            <input id="name" name="name" required placeholder="Your name" className="contact-input" />
                            
                            <label htmlFor="email">Email:</label>
                            <input id="email" name="email" required placeholder="Example@gmail.com" className="contact-input" />
                            
                            <label htmlFor="subject">Subject:</label>
                            <select id="subject" name="subject" className="contact-select">
                                <option value="Customer support">Customer support</option>
                                <option value="Car issues">Car issues</option>
                            </select>
                            
                            <label htmlFor="message">Message:</label>
                            <textarea id="message" name="message" required placeholder="Your message..." className="contact-input"></textarea>
                            
                            <button type="submit" className="contact-button">Send message</button>
                        </div>
                        <div className="ids">
                            <div className="info">
                                <p>Thank you for your feedback!</p>
                                <p>We will get back to you soon. In the meantime feel free to contact us:</p>
                                <p>Mobile Number: 01007513685</p>
                                <p>Email: porsche@gmail.com</p>
                            </div>
                        </div>
                    </form>
                </div>
            </header>
        </div>
    );
}

export default Contact;
