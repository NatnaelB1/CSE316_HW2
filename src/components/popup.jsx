import React, { Component } from 'react';


function PopupWindow(props) {
    
    return (props.trigger) ? (
        <div className="background-window">
            <div className="pop-up">
        
                <form action="action_page.php">
                <div className="container">
                   
                    <div className="edit">
                        <div id="edit-profile-span">Edit profile</div>
                        <div id="edit-profile-cancel"> <button className="popup-button" id="close-popup" onClick={() => props.setTrigger(false)}> X </button> </div>
                
                    </div>
                    
                    
                    <div id="edit2">
                    <img className="profile-image" src="assets/pro.webp" alt="Profile-image" />
                    <span><div className="popup-button" >Add new image </div></span>
                    <span><div className="popup-button">remove image </div></span>
                    </div>
                    
                
                
                
                    <label htmlFor="text"><b>Name</b></label>
                    <input type="text" placeholder="Enter name" name="name" required="" />
                    
                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter Email" name="email" required="" />
                
                    
                    
                    <h4 htmlFor="color-select">Color Scheme</h4>
                    <select name="color-select" id="color-select">
                        <option value="Light">Light</option>
                        <option value="Dark">Dark</option>
                    </select>
                    
                    
                
                    <div className="clearfix">
                    <button type="submit" className="signupbtn">Save</button>
                    <button type="button" className="cancelbtn">Log out</button>
                    
                    </div>
                
                </div>
                </form>

            </div>
        </div>
    ) : "";
    
}
 
export default PopupWindow;