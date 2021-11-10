import { finishLoading, setError, startLoading, unsetError } from "../../actions/ui"
import { types } from "../../types/types";

describe('Pruebas en ui-actions', () => {
    test('Todas las acciones deben de funcionar', () => {
        const setErrorAction = setError('Error');
        expect(setErrorAction).toEqual({
            type: types.uiSetError,
            payload: 'Error'
        });

        const unsetErrorAction = unsetError();
        expect(unsetErrorAction).toEqual({
            type: types.uiUnsetError
        });

        const startLoadingAction = startLoading();
        expect(startLoadingAction).toEqual({
            type: types.uiStartLoading
        });

        const finishLoadingAction = finishLoading();
        expect(finishLoadingAction).toEqual({
            type: types.uiFinishLoading
        });
        
    })
})