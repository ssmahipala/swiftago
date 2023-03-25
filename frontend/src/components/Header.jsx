// import {faSignInAlt, FaSignOutAlt, FaUser} from 'react-icons'
import {Link} from 'react-router-dom'

function Header() {
  return (
    <Header classname='header'>
        <div className="logo">
            <Link to='/'>Swiftago</Link>
        </div>
    </Header>
  )
}

export default Header