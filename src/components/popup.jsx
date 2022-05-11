import React, { Component } from 'react';


function PopupWindow({trigger, setTrigger, onEditName, onEditEmail, onChangeColor, userName, userEmail, userColor, handleProfileSubmit,
                      logindisplay, setLoginDisplay, notedisplay, setNoteDisplay, handleLogout, handleImageSelected,userPicture,
                      handleDeleteImage}) {

    const handlex = (e) => {
        setTrigger(false);
        e.preventDefault();
    };
    
    return (trigger) ? (
        <div className="background-window">
            <div className="pop-up">
        
                <form>
                <div className="container">
                   
                    <div className="edit">
                        <div id="edit-profile-span">Edit profile</div>
                        <div id="edit-profile-cancel"> <button className="popup-button" id="close-popup" onClick={handlex}> X </button> </div>
                
                    </div>
                    
                    
                    <div id="edit2">
                    <label htmlFor="file-upload" className="custom-file-upload"> <img className="profile-image" src={userPicture} alt="Profile-image" /></label><input id="file-upload" type="file" onChange={handleImageSelected}/>
                    
                    
                    <span><div className="popup-button"><label htmlFor="file-upload" className="custom-file-upload"> Add new image</label><input id="file-upload" type="file" onChange={handleImageSelected}/></div></span>
                    <span><div className="popup-button" onClick={handleDeleteImage}>remove image </div></span>
                    </div>
                    
                
                
                
                    <label htmlFor="text"><b>Name</b></label>
                    <input type="text" value = {userName} onChange = {onEditName} placeholder="Enter name" name="name" required="" />
                    
                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" value= {userEmail} onChange = {onEditEmail} placeholder="Enter Email" name="email" required="" />
                
                    
                    
                    <h4 htmlFor="color-select">Color Scheme</h4>
                    <select name="color-select" value={userColor} onChange = {onChangeColor} id="color-select">
                        <option value="Light">Light</option>
                        <option value="Dark">Dark</option>
                    </select>
                    
                    
                
                    <div className="clearfix">
                    <button type="submit" onClick={handleProfileSubmit} className="signupbtn">Save</button>
                    <button type="button" className="cancelbtn" onClick={handleLogout}>Log out</button>
                    
                    </div>
                
                </div>
                </form>

            </div>
        </div>
    ) : "";
    
}
 
export default PopupWindow;