import React, { Component } from 'react';
import SideBar from './col1';
import MainArea from './col2';
import PopupWindow from './popup';

function MainPage({buttonPopup, setButtonPopup, notes, setNotes, onAddNote, activeNote, setActiveNote, handleDelete, handleAddition,
                   handleDrag, handleTagClick, onClearAll, tags, setTags, sidebarV, setSideBarV, mainAreaV, setMainAreaV, handlesearch,
                   searchQuery, onDeleteNote, getActiveNote, onEditNote, get_Date, handleBack, onChangeName, onChangeEmail, onChangeColor,
                   userName, userEmail, userColor, handleProfileSubmit, notedisplay, setNoteDisplay, logindisplay, setLoginDisplay,
                   handleLogout, onEditName, onEditEmail, enabletags, setEnableTags, handleImageSelected ,userPicture, handleDeleteImage,
                   relatedNotes  }){
    return (notedisplay) ? (
        <div className="wrapper">
        
            <SideBar trigger={buttonPopup} 
                    setTrigger = {setButtonPopup} 
                    notes = {notes.filter((note) => note.notebody.toLowerCase().includes(searchQuery.toLowerCase()))} 
                    setNotes = {setNotes}
                    onAddNote = {onAddNote}
                    activeNote = {activeNote}
                    setActiveNote = {setActiveNote}
                    
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    handleTagClick={handleTagClick}
                    onClearAll = {onClearAll}
                    tags ={tags}
                    setTags = {setTags}

                    sidebarV = {sidebarV} 
                    setSideBarV = {setSideBarV}
                    mainAreaV = {mainAreaV}
                    setMainAreaV = {setMainAreaV}

                    handlesearch = {handlesearch}
                    searchQuery = {searchQuery}
                    enabletags = {enabletags}
                    setEnableTags = {setEnableTags}
                   
                    handleImageSelected = {handleImageSelected}
                    userPicture={userPicture}
                    relatedNotes = {relatedNotes}
                    
        
            />

            <MainArea onDeleteNote = {onDeleteNote}  
                    activeNote = {getActiveNote()}
                    onEditNote = {onEditNote}
                    get_Date = {get_Date}
                    handleBack = {handleBack}

                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    handleDrag={handleDrag}
                    handleTagClick={handleTagClick}
                    onClearAll = {onClearAll}
                    tags ={tags}
                    setTags = {setTags}

                    mainAreaV = {mainAreaV}
                    setMainAreaV = {setMainAreaV}
                    getActiveNote = {getActiveNote}
                    enabletags = {enabletags}
                    setEnableTags = {setEnableTags}
                    
                    
            />
            
            <PopupWindow trigger={buttonPopup} 
                        setTrigger = {setButtonPopup}
                        onChangeName = {onChangeName}
                        onChangeEmail = {onChangeEmail}
                        onChangeColor = {onChangeColor}
                        userName = {userName}
                        userEmail = {userEmail}
                        userColor = {userColor}
                        handleProfileSubmit = {handleProfileSubmit}

                        notedisplay = {notedisplay} 
                        setNoteDisplay = {setNoteDisplay}
                        logindisplay = {logindisplay} 
                        setLoginDisplay = {setLoginDisplay}
                        handleLogout = {handleLogout}
                        onEditName = {onEditName} 
                        onEditEmail = {onEditEmail}

                        handleImageSelected = {handleImageSelected}
                        userPicture={userPicture}
                        handleDeleteImage = {handleDeleteImage}
            
            >
                
            </PopupWindow>

      
      </div>

        
    ) : "";
}
export default MainPage;