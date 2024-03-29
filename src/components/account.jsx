import React, { Component } from 'react';

function NewAccount({loginpop , setLoginPop, handleSignin, onChangeName,  onChangeEmail, userName, userEmail, userPassword,
                      onChangePassword, errorMessage, setErrorMessage  }){
    return (loginpop) ? (

        <div id='login_popup'>
            
       
            <div className='newAccount_input'>
            
                <form >
                <div>
                    
                    <div id='signup_top'>
                        <div><h3>Sign Up</h3></div>
                        <div id='x_button' onClick={() => setLoginPop(false)}> X </div>
                    </div>
                    
                    <label htmlFor="text"><b>Name</b></label>
                    <input type="text" name="name" required=""  onChange = {onChangeName} />
                    
                    <label htmlFor="email"><b>Email</b></label>
                    <input className='emailbox'  type="text" name="email" required=""  onChange = {onChangeEmail} />

                    <label htmlFor="text"><b>Password</b></label>
                    <input type="password" name="password" required="" onChange = {onChangePassword}/>
                
                    {errorMessage && <div style={{color: 'red', padding: "5px"}}>Error: Invalid email and/or password</div>}
                    <div id='signbtn_div'>
                    <button className='dlt_btn' type="submit" onClick={handleSignin}>Sign Up</button>    
                    </div>
                
                </div>
                </form>

            </div>
        </div>

    ): "";
}

export default NewAccount;