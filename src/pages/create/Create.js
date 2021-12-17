import { useEffect, useState } from 'react'
import { useCollection } from '../../hooks/useCollection'
import Select from 'react-select'
import { timestamp } from '../../firebase/config'
import {useAuthContext} from '../../hooks/useAuthContext'
import {useFirestore} from '../../hooks/useFirestore'
import {useNavigate} from 'react-router-dom'
// styles
import './Create.css'

const categories = [
    {value:'development', label: 'development'},
    {value:'design', label: 'design'},
    {value:'sales', label: 'sales'},
    {value:'marketing', label: 'marketing'},
]

export default function Create() {

    const {user} = useAuthContext()
    const {addDocument, response} = useFirestore('projects')

    const {documents} = useCollection('users')
    const [users, setUsers] = useState([])

    //form field values
    const [name, setName] = useState('')
    const [details, setDetails] = useState('')
    const [dueDate, setDueDate] = useState('')
    const [category, setCategory] = useState('')
    const [assignedUsers, setAssignedUsers] = useState([])
    const [formError, setFormError] = useState(null)
    const history = useNavigate()


    useEffect(() => {
        if(documents){
            const options = documents.map((user)=>{
                return {value: user,label: user.displayName}
            })
            setUsers(options)
        }
    }, [documents])

    const handleSubmit = async (e)=>{
        e.preventDefault()
        setFormError(null)

        if(!category){
            setFormError('please select a project category')
            return
        }

        if(assignedUsers.length === 0){
            setFormError('please assign the project to the user/s')
            return
        }

        const createdBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }

        const assignedUsersList = assignedUsers.map((u) => {
            return {
                displayName: u.value.displayName,
                photoURL: u.value.photoURL,
                id: u.value.id
            }
        })

        const project = {
            name,
            details,
            category: category.value,
            dueDate:timestamp.fromDate(new Date(dueDate)),
            comments: [],
            createdBy,
            assignedUsersList
        }
       await addDocument(project)
       if(!response.error){
            history('/')
       }
    }

    return (
        <div className='create-form'>
            <h2 className="page-title">Create a new project</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    <span>project name:</span>
                    <input type="text" required onChange = {(e)=> {setName(e.target.value)}} 
                    value={name}
                    />
                </label>
                <label>
                    <span>project details:</span>
                    <textarea type="text" required onChange = {(e)=> {setDetails(e.target.value)}} 
                    value={details}
                    />
                </label>
                <label>
                    <span>set due date:</span>
                    <input type="date" required onChange = {(e)=> {setDueDate(e.target.value)}} 
                    value={dueDate}
                    />
                </label>
                <label>
                    <span>project category:</span>
                    <Select 
                        onChange={(option) => {setCategory(option)}}
                        options = {categories}
                    />
                </label>
                <label>
                    <span>assign to:</span>
                    <Select
                        onChange={(option) => {setAssignedUsers(option)}}
                        options = {users}
                        isMulti
                    />
                </label>
                <button className="btn">add project</button>
                {formError && <p className='error'>{formError}</p>}
            </form>
        </div>
    )
}
