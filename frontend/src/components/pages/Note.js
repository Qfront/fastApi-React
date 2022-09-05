import React, {useState, useEffect} from 'react';
import {useParams, Link, useNavigate} from 'react-router-dom';


const Note = () => {
    let navigate = useNavigate()
    let params = useParams()
    let noteId = params.id

    let [note, setNote] = useState(null)

    // Loading a Note
    useEffect(() => {if (noteId !== 'add') getNote()}, [noteId])
    let getNote = async () => {
        let response = await fetch(`/notes/${noteId}`)
        let data = await response.json()
        setNote(data)
    }
    // Submit a Note
    let sumbitData = async (e) => {
        e.preventDefault()

        let url = "/notes"
        let method = "POST"
        if (noteId !== "add") {
            url = `/notes/${noteId}`
            method = "PUT"
        }

        await fetch(url, {
            method: method,
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({"body": note.body})
        })
        navigate("/")
    }
    // Delete a Note
    let deleteNote = async (e) => {
        e.preventDefault()
        await fetch(`/notes/${noteId}`,{method: "DELETE"})
        navigate("/")
    }

    return (
        <div>
            <Link to={'/'}>Go back</Link>
            <textarea
                onChange={ (e) => {setNote({...note, "body": e.target.value})} }
                value={note?.body}
                placeholder="Enter note...">
            </textarea>

            <button onClick={sumbitData}>Save</button>
            {noteId !== "add" && <button onClick={deleteNote}>Delete</button>}
        </div>
    );
}

export default Note;