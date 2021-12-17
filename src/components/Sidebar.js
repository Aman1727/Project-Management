import {useAuthContext} from '../hooks/useAuthContext'
import { NavLink } from 'react-router-dom'
import { Link } from 'react-router-dom'

//styles & images
import './Sidebar.css'
import DashboardIcon from '../assets/dashboard_icon.svg'
import AddIcon from '../assets/add_icon.svg'
import Avatar from './Avatar'

export default function Sidebar() {
    const {user} = useAuthContext()
    return (
        <div className='sidebar'>
            <div className="sidebar-content">
                    <div className="user">
                        <Link to = '/'>
                            <Avatar src = {user.photoURL}/>
                        </Link>
                        <p>hey {user.displayName.toLowerCase()}!</p>
                    </div>
                <nav className="links">
                    <ul>
                        <li>
                            <NavLink exact to= "/">
                                <img src={DashboardIcon} alt="dashboard icon" />
                                <span>dashboard</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to= "/create">
                                <img src={AddIcon} alt="Add icon" />
                                <span>new project</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
