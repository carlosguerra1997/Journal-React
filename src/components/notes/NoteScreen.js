import React from "react";

import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
    return (
        <div className="notes__main-content">
            <NotesAppBar />
            <div className="notes__content">
                <input className="notes__title-input" type="text" placeholder="Some awesome title" autoComplete="off"></input>
                <textarea className="notes__textarea" placeholder="What happened today"></textarea>
                <div className="notes__image">
                    <img src="https://thelandscapephotoguy.com/wp-content/uploads/2019/01/landscape%20new%20zealand%20S-shape.jpg" alt="imagen"></img>
                </div>
            </div>
        </div>
    )
}