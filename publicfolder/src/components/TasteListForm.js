import React, { useState } from 'react'
import firebase from '../firebase'


const AddTimeEntryForm = () => {
    const [title, setTitle] = useState('')
    const [time, setTime] = useState('')
    function onSubmit(e) {
        e.preventDefault()
        firebase
            .firestore()
            .collection('menu')
            .add({
                title,
                time_seconds: parseInt(time)
            })
            .then(() => {
                setTime('')
                setTitle('')
            })
    }

    return (
        <form onSubmit={onSubmit}>
            <div>
                <label> Title </label>
                <input type='text' value={title} onChange={e => setTitle(e.currentTarget.value)} />
            </div>
            <div>
                <label> Timespent </label>
                <input type='number' value={time} onChange={e => setTime(e.currentTarget.value)} />
            </div>
            <button> add Entry </button>
        </form>


    )

}

export default AddTimeEntryForm;