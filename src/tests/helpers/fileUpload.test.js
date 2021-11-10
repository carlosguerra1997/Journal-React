import { fileUpload } from '../../helpers/fileUpload';

describe('Pruebsa en fileUpload', () => {
    /* test('Debe de cargar un archivo y retornar el URL', async () => {
        const resp = await fetch('https://neliosoftware.com/es/wp-content/uploads/sites/3/2018/07/aziz-acharki-549137-unsplash-1200x775.jpg');
        const blob = await resp.blob();

        const file = new File([blob], 'foto.jpg');
        const url = await fileUpload( file );

        expect(typeof url).toBe('string');
    })
 */

    test('Debe de retornar un error', async () => {
        const file = new File([], 'foto.jpg');
        const url = await fileUpload( file );

        expect(url).toBe(null);
    })
})