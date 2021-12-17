import ProjectList from '../../components/ProjectList'
import { useCollection } from '../../hooks/useCollection'
import ProjectFilter from './ProjectFilter'
import { useState } from 'react'
import {useAuthContext} from '../../hooks/useAuthContext'

// styles
import './Dashboard.css'


export default function Dashboard() {
    const { documents , error} =  useCollection('projects')
    const [currentFilter, setCurrentFilter] = useState('all')
    const {user} = useAuthContext()
    const changeFilter = (newFilter) => {
        setCurrentFilter(newFilter)
    }
    
    const projects = documents ? documents.filter((project)=>{
        switch (currentFilter){
            case 'all':
                return true
            case 'mine':
                const include =  project.assignedUsersList.filter((u)=>{
                    return u.id === user.uid
                })
                if (include.length){
                    return true
                }
                return false
            case 'development':
                return project.category === 'development'
            case 'design':
                return project.category === 'design'
            case 'sales':
                return project.category === 'sales'
            case 'marketing':
                return project.category === 'marketing'
            default: 
                return true
        }
    }): null

    return (
        <div>
            <h2 className="page-title">Dashboard</h2>
            {error && <p className='error'>{error}</p>}
            {documents && <ProjectFilter currentFilter = {currentFilter} changeFilter = {changeFilter}/>}
            {projects && <ProjectList projects = {projects}/>}
        </div>
    )
}
