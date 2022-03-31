import React, { Component } from 'react';




function SideBar({notes, setTrigger, onAddNote, activeNote, setActiveNote, sidebarV, setSideBarV, mainAreaV, setMainAreaV})  {
    
    function multiple_onclick(n){
        setActiveNote(n);
        console.log(mainAreaV);
        setMainAreaV(true); 
    }

    return (sidebarV) ? (
        <div className="col1">
            

            <div className="profile-bar">
            
                <button type="button" className="image-button" onClick={() => setTrigger(true)}> <img className="profile-image" src="assets/pro.webp" alt="Profile-image" /> </button>
                <span className="title-notes">My Notes</span>
                <button className="material-button" id="material-button-noteadd" onClick={onAddNote} ><span className="material-icons">note_add</span></button>
            </div>

            <div className="search">
                <div><span className="material-icons" id="material-icon-search">search</span></div>
                <input className="search2" type="search" placeholder="Search all notes" /> 
            </div>

            
            {notes.map((note) => (
            
                <div className= {`note-display  ${note.id === activeNote && "active" }`}  key = {`${note.id}`}    id = {`${note.id}`}
                    onClick={ () => {
                        multiple_onclick(note.id)                        
                    }}>
                    <p> 
                        {note.body === "" ? "Add a Note" : note.body.substr(0,20) + "..."} 
                       
                    </p>
                    <small> {note.lastModified} </small>
                        
                </div>

            ))}
    



        </div>
    ) : "" ;

}
 
export default SideBar;