import { authReducer } from '../../reducers/authReducer';
import { types } from '../../types/types';

describe('Pruebas en authReducer', () => {
    test('Debe de realizar el login', () => {
        const initState = {};
        const action = {
            type: types.login,
            payload: {
                uid: 'abc',
                displayName: 'Carlos'
            }
        }

        const state = authReducer(initState, action);
        expect(state).toEqual({
            uid: 'abc',
            name: 'Carlos'
        });
    })

    test('Debe de realizar el logout', () => {
        const initState = {};
        const action = {
            type: types.logout,
        }

        const state = authReducer(initState, action);
        expect(state).toEqual( {} );
    })

    test('No debe hacer cambios en el state', () => {
        const initState = {};
        const action = {
            type: 'no_existe'
        }

        const state = authReducer(initState, action);
        expect(state).toEqual(initState);
    })

})