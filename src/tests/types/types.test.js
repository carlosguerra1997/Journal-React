import { types } from '../../types/types';

describe('Pruebas con types', () => {
    test('Debe de tener estos tipos', () => {
        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',
            uiSetError: '[UI] Set Error',
            uiUnsetError: '[UI] Unset Error',
            uiStartLoading: '[UI] Start Loading',
            uiFinishLoading: '[UI] Finish Loading',
            addNewNote: '[Notes] New Note',
            activeNote: '[Notes] Set Active Note',
            loadNotes: '[Notes] Load Notes',
            updateNotes: '[Notes] Updated Note',
            fileUrlNote: '[Notes] Updated Image URL',
            deleteNote: '[Notes] Note Deleted',
            logoutCleaningNotes: '[Notes] Logout Cleaning'
        })
    })
})