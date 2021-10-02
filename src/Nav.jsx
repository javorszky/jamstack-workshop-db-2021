import { Link } from "react-router-dom";
import Signup from "./Signup";
import { useAuth } from './use-auth'


function Nav() {
    const auth = useAuth()

    const handleSignout = async () => {
        const { error } = await supabase.auth.signOut()
        if (error) {
            console.error(error)
        }
        setUser({})
    }

    const LogOut = () => {
        return (
            <a className="button is-light" onClick={(e) => { auth.signOut() }}>
                Log out
            </a>
        )
    }

    const LogIn = () => {
        return (
            <Link className="button is-primary" to="/login">
                <strong>Log in</strong>
            </Link>
        )
    }

    const SignUp = () => {
        return (
            <Link className="button is-primary" to="/signup">
                <strong>Sign up</strong>
            </Link>
        )
    }

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item" href="https://bulma.io">
                    <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
                </a>

                <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <Link className="navbar-item" to="/">
                        Home
                    </Link>

                    {/* <a className="navbar-item">
                        Documentation
                    </a>

                    <div className="navbar-item has-dropdown is-hoverable">
                        <a className="navbar-link">
                            More
                        </a>

                        <div className="navbar-dropdown">
                            <a className="navbar-item">
                                About
                            </a>
                            <a className="navbar-item">
                                Jobs
                            </a>
                            <a className="navbar-item">
                                Contact
                            </a>
                            <hr className="navbar-divider">
                            <a class ="navbar-item">
                            Report an issue
                            </a>
                        </div>
                    </div> */}
                </div>

                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {auth.session ? (
                                <LogOut />
                            ) : (
                                <>
                                    <LogIn />
                                    <Signup />
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav