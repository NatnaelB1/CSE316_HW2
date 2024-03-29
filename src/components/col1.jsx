import React, { Component } from 'react';



function SideBar({notes, setTrigger, onAddNote, activeNote, setActiveNote, sidebarV, setSideBarV, mainAreaV, setMainAreaV, handlesearch, searchQuery,
                 enabletags, setEnableTags,handleImageSelected ,userPicture, relatedNotes })  {
    
    function multiple_onclick(n){
        setActiveNote(n);
        setMainAreaV(true); 
    }
    const sortedNotes = notes.sort((a,b) => b.forsort - a.forsort)

    if(notes.length > 0 && searchQuery !== ""){
        setActiveNote(notes[0].id);
    }
    
    return (sidebarV) ? (
        <div className="col1">
            

            <div className="profile-bar">
            
                <button type="button" className="image-button" onClick={() => setTrigger(true)}> <img className="profile-image" src={userPicture } alt="Profile-image" /> </button>
                <span className="title-notes">My Notes</span>
                <button className="material-button" id="material-button-noteadd" onClick={onAddNote} ><span className="material-icons">note_add</span></button>
            </div>

            <div className="search">
                <div><span className="material-icons" id="material-icon-search">search</span></div>
                <input className="search2" type="search" onChange={(e) => handlesearch(e.target.value)} placeholder="Search all notes" /> 
            </div>

            
            {sortedNotes.map((note) => (
            
                <div className= {`note-display  ${note.id === activeNote && "active" || relatedNotes.includes(note.id) && "similar" }`}  key = {`${note.id}`}    id = {`${note.id}`}
                    onClick={ () => {
                        multiple_onclick(note.id)                        
                    }}>
                    <div className='side-title'>
                        {note.notebody === "" ? "Add a Note" : note.notebody}
                    </ div>
                    <div id='footer_div'>
                        <small className='footer'> {note.lastModified} </small>
                        {relatedNotes.includes(note.id) && (note.id !== activeNote ) && <small className='footer'>similar</small>}
                    </div>
                    
                        
                </div>

            ))}
    



        </div>
    ) : "" ;

}
 
export default SideBar;