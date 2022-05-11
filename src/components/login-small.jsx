import React, { Component } from 'react';

function SmallLoginWindow({loginpop , setLoginPop, onChangeEmail, onChangePassword, handlelogin, authorized, setAuthorized,
    errorMessage, setErrorMessage}) {
    
    return(
        <div id='small_login'> 
            <div className='login_header'>
                <h1 id='login_h1'>Notes</h1>
                <h3 className='login_h3'>Organize all your thoughts in one place.</h3>
            </div> 
            <div className='login_input2' >
        
                <form>
                <div className="login_container">
                    
                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" name="email" required="" onChange = {onChangeEmail}/>  

                    <label htmlFor='text'><b>Password</b></label>
                    <input type="password" name="name" required="" onChange = {onChangePassword} />              

                    {errorMessage && <div style={{color: 'red', padding: "5px"}}>Error: Invalid email and/or password</div>}

                    <div>
                        <button type="submit" id='login_button' onClick={handlelogin}>Log In</button>
                    </div>
                    
                    <hr />
    
                    <div id='dlt_div'>
                        <button type="button" className='dlt_btn' onClick={() => setLoginPop(true)}>Create New Account</button>
                    </div>
                  
                </div>
                </form>

            </div>  
        </div>
    );
}
export default SmallLoginWindow;