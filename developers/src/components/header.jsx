import "../styles/style.css";

function Header() {
    return (
        <div className="head">
            <h1>Generate Admin Credential- InVITe</h1>
            <center>
                <p>
                    Product owners can set admins access here. Currently in test
                    mode so all the new admin assigned will be deleted after 24
                    hours. You can set yourself as admin or can use the test
                    admin credentials provided for testing purpose.
                </p>
            </center>
        </div>
    );
}

export default Header;
