import { Link } from 'react-router-dom'
import { useState } from 'react'

function Navbar() {
    const [isActive, setIsActive] = useState(false)
    const toggleMenu = () => setIsActive(prev => !prev)
    const closeMenu = () => setIsActive(false)
    return (
        <nav className="navbar is-fixed-top" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <button
                    type="button"
                    className={`navbar-burger ${isActive ? 'is-active' : ''}`}
                    aria-label="menu"
                    aria-expanded={isActive}
                    aria-controls="navbarBasicExample"
                    onClick={toggleMenu}
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </button>
            </div>

            <div id="navbarBasicExample" className={`navbar-menu ${isActive ? 'is-active' : ''}`}>
                <div className="navbar-start">
                    <Link className="navbar-item" to="/" onClick={closeMenu}>
                        Home
                    </Link>

                    <Link className="navbar-item" to="/point" onClick={closeMenu}>
                        Rule
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
