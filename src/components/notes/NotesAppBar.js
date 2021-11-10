import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startUploading } from "../../actions/notes";

export const NotesAppBar = () => {

    const dispatch = useDispatch();
    const { active:note } = useSelector( state => state.notes );

    const handleSave = () => {
        dispatch( startSaveNote(note) );
    }

    const handleUpload = () => {
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) dispatch( startUploading(file) );
    }


    return (
        <div className="notes__appbar">
            <span>28 de agosto de 2020</span>
            <input id="fileSelector" type="file" name="file" onChange={handleFileChange} style={ {display: "none"} } />
            <div>
                <button className="btn" onClick={handleUpload}>Subir Foto</button>
                <button className="btn" onClick={handleSave}>Guardar</button>
            </div>
        </div>
    )
}