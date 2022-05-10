import React, { Component } from 'react';
import NewAccount from './account';
import LoginWindow from './login';

function LoginPage({setLoginPop, loginpop, handleSignin, onChangeName, onChangeEmail, onChangeColor, onChangePassword, userEmail,
                    userPassword , userName, handlelogin, authorized, setAuthorized, errorMessage, setErrorMessage, notedisplay, setNoteDisplay,
                     logindisplay, setLoginDisplay}){
    return (logindisplay) ? (
        <div>
            <LoginWindow
                loginpop = {loginpop}
                setLoginPop = {setLoginPop}

                onChangeEmail = {onChangeEmail}
                onChangePassword = {onChangePassword}
                handlelogin = {handlelogin}
                authorized = {authorized}
                setAuthorized = {setAuthorized}
                errorMessage = {errorMessage}
                setErrorMessage = {setErrorMessage}

            />
            <NewAccount 
                loginpop = {loginpop}
                setLoginPop = {setLoginPop}
                handleSignin = {handleSignin}

                onChangeName = {onChangeName}
                onChangeEmail = {onChangeEmail}
                onChangeColor = {onChangeColor}
                onChangePassword = {onChangePassword}

                userName = {userName}
                userEmail = {userEmail}
                userPassword = {userPassword}

                errorMessage = {errorMessage}
                setErrorMessage = {setErrorMessage}
            />
        </div>
        
    ) : "";
}
export default LoginPage;