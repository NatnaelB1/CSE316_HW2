import React, { Component } from 'react';
import { WithContext as ReactTags } from 'react-tag-input'


function MainArea ({notes, onDeleteNote, activeNote, setActiveNote, onEditNote, get_Date, handleDelete, handleAddition, handleDrag,
                    handleTagClick, onTagUpdate, tags , handleBack , mainAreaV, setMainAreaV, getActiveNote, enabletags, setEnableTags }){
    
    const onUpdateNotes = (value) => {
        onEditNote({
            ... activeNote,
            forsort: Date.now(), 
            notebody: value,
            lastModified: get_Date(),
            note_tag: getActiveNote().note_tag
        });


    }




    return (mainAreaV) ? (
        <div className='col2'>
            <div className="note-bar">
                <button className="material-button" onClick = {handleBack} id="arrow-back"><span className="material-icons">arrow_back</span></button>
                <button className="material-button"><span className="material-icons">notification_add</span></button>
                <button className="material-button"><span className="material-icons">person_add_alt</span></button>
                <button className="material-button" id="delete-icon" onClick={() => onDeleteNote(activeNote.id)}><span className="material-icons">delete_outline</span></button> 
            </div>

            <div className='mainn'>

                <div className='mainn2'>
                  { !activeNote && <textarea className="paragraph_text" > </textarea>}  
                  { activeNote && <textarea className="paragraph_text" value = {activeNote.notebody} onChange={(e) => onUpdateNotes(e.target.value) }> 
                    
                    </textarea>}
                </div>
                
                <div className='Tag-area'>
                { activeNote &&
                    <ReactTags
                    
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    handleTagClick={handleTagClick}
                    placeholder="Enter a Tag ..."
                    minQueryLength={2}
                    maxLength={35}
                    autofocus={false}
                    allowDeleteFromEmptyInput={true}
                    autocomplete={true}
                    readOnly={false}
                    allowUnique={true}
                    allowDragDrop={true}
                    inline={true}
                    allowAdditionFromPaste={true}
                    editable={true}
                    clearAll={false}
                    tags={tags}
                />
                }
                    
                </div>

            </div>
            
            
            

        </div>
    ) : "";
    
}
 
export default MainArea;