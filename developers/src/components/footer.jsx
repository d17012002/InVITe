import "../styles/style.css";

function Footer() {
    return (
        <div className="foot">
            <center>
                <p className="foot-text">
                    Copyright {new Date().getFullYear()} | InVITe
                </p>
            </center>
        </div>
    );
}

export default Footer;
