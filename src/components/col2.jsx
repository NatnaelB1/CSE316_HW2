import React, { Component } from 'react';


function MainArea ({notes, onDeleteNote, activeNote, setActiveNote, onEditNote, get_Date }){
    
    const onUpdateNotes = (value) => {
        onEditNote({
            ... activeNote,
            body: value,
            lastModified: get_Date(),
        });


    }


    return (
        <div className='col2'>
            <div className="note-bar">
                <button className="material-button" id="arrow-back"><span className="material-icons">arrow_back</span></button>
                <button className="material-button"><span className="material-icons">notification_add</span></button>
                <button className="material-button"><span className="material-icons">person_add_alt</span></button>
                <button className="material-button" id="delete-icon" onClick={() => onDeleteNote(activeNote.id)}><span className="material-icons">delete_outline</span></button> 
            </div>

            <div>
                <textarea className="paragraph_text" value = {activeNote.body} onChange={(e) => onUpdateNotes(e.target.value) }> 
                  
                </textarea>
            </div>
            
            

        </div>
    );
    
}
 
export default MainArea;