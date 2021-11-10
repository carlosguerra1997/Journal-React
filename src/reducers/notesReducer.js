import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
}

export const notesReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.activeNote:
            return {
                ...state,
                active: { ...action.payload }
            }
        case types.addNewNote:
            return {
                ...state,
                notes: [ action.payload, ...state.notes ]
            }
        case types.loadNotes:
            return {
                ...state, 
                notes: [ ...action.payload ]
            }
        case types.updateNotes:
            return {
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id ? action.payload.note : note
                )
            }
        case types.deleteNote:
            return {
                ...state,
                active: null,
                notes: state.notes.filter( note => note.id !== action.payload )
            }
        case types.logoutCleaningNotes:
            return {
                ...state,
                active: null,
                notes: []
            }
        default:
            return state;
    }
}