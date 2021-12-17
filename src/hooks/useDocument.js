import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/config"

export const useDocument = (collection , id) => {
    const [document, setDocument] = useState(null)
    const [error, setError] = useState(null)
    
    //realtime data for the document
    useEffect(() => {
        const ref = projectFirestore.collection(collection).doc(id)
        const unsubscribe = ref.onSnapshot((snapshot)=>{
            if (snapshot.data()){
                setDocument({...snapshot.data(), id:snapshot.id})
                setError(null)
            }else {
                setError('no such document exists')
            }
        }, (error)=>{
            console.log(error.message)
            setError('failed to get document')
        })

        //cleanup function to fire whenever the component using this hook unmounts
        return ()=>unsubscribe()
    }, [collection,id])

    return {document, error}
}