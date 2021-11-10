import Swal from 'sweetalert2';
import { db } from '../firebase/firebase-config';
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from '../helpers/loadNotes';
import { types } from '../types/types';

export const startNewNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }
        const doc = await db.collection(`${uid}/journal/notes`).add(newNote);
        dispatch(activeNote(doc.id, newNote));
        dispatch( addNewNote(doc.id, newNote) );
    }
}

export const activeNote = (id, note) => ({
    type: types.activeNote,
    payload: { id, ...note }
});

export const addNewNote = (id, note) => ({
    type: types.addNewNote,
    payload: {
        id, 
        ...note
    }
})

export const startLoadingNotes = (uid) => {
    return async (dispatch) => {
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const setNotes = (notes) => ({
    type: types.loadNotes,
    payload: notes
});

export const startSaveNote = ( note ) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;

        if ( !note.url ) delete note.url;

        // Creamos una copia del objeto note y borramos la propiedad Id para no actualizarla.
        const noteToFirestore = { ...note };
        delete noteToFirestore.id;

        await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);
        dispatch( refreshNote(note.id, noteToFirestore) );

        // Lanzamos un mensaje para el usuario
        Swal.fire('Nota guardada', 'con éxito', 'success')
    }
}

export const refreshNote = ( id, note ) => ({
    type: types.updateNotes,
    payload: {
        id,
        note: {
            id,
            ...note
        }
    }
});

export const startUploading = (file) => {
    return async (dispatch, getState) => {
        const { active:activeNote } = getState().notes;

        // Mostramos un mensaje de loading.
        Swal.fire({
            title: 'Subiendo imagen',
            text: 'Por favor, espere...',
            allowOutsideClick: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        })

        const fileUrl = await fileUpload(file);
        activeNote.url = fileUrl;

        dispatch( startSaveNote(activeNote) );

        // Cerramos el mensaje de Loading al terminar de subir la imagen.
        Swal.close();
    }
}

export const startDeletingNote = (id) => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        await db.doc(`${uid}/journal/notes/${id}`).delete();
        dispatch( deleteNote(id) );
        Swal.fire('Nota borrada', 'con éxito', 'success');
    }
}

export const deleteNote = (id) => ({
    type: types.deleteNote,
    payload: id
})

export const noteLogout = () => ({
    type: types.logoutCleaningNotes
})