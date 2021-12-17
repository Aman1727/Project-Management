import { Link  } from 'react-router-dom'
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

// styles & images
import './Navbar.css'
import temple from '../assets/temple_new.png'


export default function Navbar() {
    const {logout, isPending} = useLogout()
    const {user} = useAuthContext()
    return (
        <div className='navbar'>
            <ul>
                <li className="logo">
                    <img src={temple} alt="logo" />
                    <span>project management</span>
                </li>
                {!user && <li><Link to="/login">login</Link></li>}
                {!user && <li><Link to="/signup">signUp</Link></li>}
                {user && <li>
                    {!isPending && <button className="btn" onClick={logout}>logout</button>}
                    {isPending && <button className="btn" disabled>logging out...</button>}
                </li>}
            </ul>
        </div>
    )
}
