import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';

import { NotesAppBar } from './NotesAppBar';
import { activeNote, startDeletingNote } from '../../actions/notes';

export const NoteScreen = () => {

    const dispatch = useDispatch();

    const { active:note } = useSelector( state => state.notes );
    const [ formValues, handleInputChange, reset ] = useForm(note);
    const { body, title, id } = formValues;

    const activeId = useRef(note.id);

    useEffect ( () => {
        if ( note.id !== activeId.current ) {
            reset(note);
            activeId.current = note.id;
        }
    }, [note, reset]);

    useEffect( () => {
        dispatch( activeNote( formValues.id, {...formValues} ));
    }, [ formValues, dispatch ]);

    const handleDelete = () => {
        dispatch( startDeletingNote(id) );
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar />
            <div className="notes__content">
                <input className="notes__title-input" type="text" name="title" value={title} onChange={handleInputChange} placeholder="Some awesome title" autoComplete="off"></input>
                <textarea className="notes__textarea" name="body" value={body} onChange={handleInputChange} placeholder="What happened today"></textarea>
                {
                    ( note.url ) &&
                    <div className="notes__image">
                        <img src={ note.url } alt="imagen"></img>
                    </div>
                }
                
            </div>

            <button className="btn btn-danger" onClick={handleDelete}>Borrar</button>

        </div>
    )
}