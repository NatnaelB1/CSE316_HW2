

import MainPage from './components/mainpage';
import SideBar from './components/col1';
import MainArea from './components/col2';
import PopupWindow from './components/popup';
import SmallPopupWindow from './components/popup-small';
import useWindowDimensions from './components/winsize';
import LoginPage from './components/loginpage';
import SmallLoginWindow from './components/login-small';
import SmallAccountWindow from './components/account-small';

// import NewAccount from './components/account';
// import LoginWindow from './components/login';
import axios, { Axios } from 'axios';

import { useState, useLayoutEffect, useEffect, Fragment } from 'react';
import { WithContext as ReactTags } from 'react-tag-input'

function App() {
  const [buttonPopup, setButtonPopup] = useState(false);
  
  const [loginpop, setLoginPop] = useState(false);
  
  const [sidebarV, setSideBarV] = useState(true);
  const [mainAreaV, setMainAreaV] = useState(true);

  const [userName, setUsername] = useState ('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userColor, setUserColor] = useState('');

  const [authorized, setAuthorized] = useState(null);
  const [errorMessage, setErrorMessage] = useState(false);

  const [notedisplay, setNoteDisplay] = useState(false);
  const [logindisplay, setLoginDisplay] = useState(true);
  const [enabletags, setEnableTags] = useState(false);
  
  const [userPicture, setUserPicture] = useState("");

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////USERS////////////////////////////////////////////////////////////////// 
  
  //sets the value of username based on keyboard input
  const onChangeName = e => {
    setUsername(e.target.value);
    
  }
  
 //sets the value of useremail based on keyboard input
  const onChangeEmail = e => {
    setUserEmail(e.target.value);
    
  }
   //sets the value of usercolorScheme based on keyboard input
  const onChangeColor = e => {
    setUserColor(e.target.value);
    
  }
  const onEditName = e => {
    setUsername(e.target.value);
  }
  const onEditEmail = e => {
    setUserEmail(e.target.value);
  }
  

  const onChangePassword = e => {
    setUserPassword(e.target.value);
    
  }
  const user = {
    username: userName, 
    useremail: userEmail,
    userpassword: userPassword,
    usercolor: userColor,
    userpicture: userPicture
    
  };
  //saves user to the database
  const handleProfileSubmit = e => {
    e.preventDefault();
    setButtonPopup(false);
    console.log(user);
    axios.put('/edit', user)
      .then(res => console.log(res.data)); 

  }

  const handleSignin = (e) => {
    e.preventDefault();
    axios.post('/register', user)
      .then(function (res){  
        console.log(res.data);
        setErrorMessage(false);
        setLoginPop(false);
        console.log("Successful signin");
      
      }).catch((err)=>{
        console.log("signin error Message");
        setErrorMessage(true);
      });
  }
  
  const handlelogin = (e) => {
    e.preventDefault();
    axios.post('/login', user)
      .then(function (res){
        console.log("Successful login");

        setErrorMessage(false);
        setNoteDisplay(true);
        setLoginDisplay(false);  
        setButtonPopup(false);
        axios.get('/notes').then(res => {
          setNotes(res.data)
        }  
        );   
  
      }) 
      .catch((err)=> {
        console.log("login error Message");
        setErrorMessage(true);
      });
  }

  const handleLogout = () => {

    axios.post('/logout', user)
      .then(function (res){
        console.log("Successful logout");
        setLoginDisplay(true);
        setNoteDisplay(false);
      })
      .catch((err) =>{
        console.log("Unsuccessful logout");
      });
    
    
}
 //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////DATE//////////////////////////////////////////////////////////////////   
  //recieves the date and puts it in the specified format
  const get_Date = () => {

    var today = new Date();
    let day = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();
    let hour = today.getHours()% 12 || 12;
    let min = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
    let sec = today.getSeconds() < 10 ? '0' + today.getSeconds() : today.getSeconds();
    let ampm = today.getHours() >= 12 ? 'pm' : 'am';
    var final_date = month +"/"+ day +"/"+year+", " +hour+':'+min+':'+ sec + " "+ ampm;
    return final_date;
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////NOTES////////////////////////////////////////////////////////////////// 

const [notes, setNotes] = useState([{id: 0, forsort: Date.now(), notebody: "This is a note with a long line of text. This note is a static(placeholder)", lastModified: get_Date(), note_tag: [{id:"cse" ,text:"cse"}]}]);

// //gets notes from the database
// useEffect(()=>{
//   axios.get('/notes').then(res => {
//     //let n = notes.concat(res.data);
//     setNotes(res.data)
//   }  
//   )
  
// },[])

//adding a new note
const onAddNote = () => {
  
  const newNote = {
    id: Date.now(),
    forsort: Date.now(), 
    notebody: "",
    lastModified: get_Date(),
    note_tag: [{id:"cse" ,text:"cse"}]
  };
    

  setNotes([newNote , ... notes]);

  axios.post('/notes', newNote)
      .then(res => console.log(res.data));

} 
 
  const [activeNote, setActiveNote] = useState(notes.length>0 && notes[0].id || null);
  
  //gets active note
  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  }
  //Finding the activenote for tags
  useEffect(() => {
    enabletags && setTags(getActiveNote().note_tag);
  }, [activeNote]); 
  
  
  const [tags, setTags] = useState([{id : "cse", text: "cse"}]);
  
  //note delete
  const onDeleteNote = (DelTarget_note) => {
    
  
    axios.delete('/notes/' + getActiveNote().id)
      .then(res => console.log(res.data));

     
    if (DelTarget_note !== notes[0].id){
      setNotes(notes.filter((note) => note.id !== DelTarget_note ));
      return setActiveNote(notes[0].id); 
    }
    setNotes(notes.filter((note) => note.id !== DelTarget_note ));
      return setActiveNote(notes[1].id);  
    
  }
  
  //Note edit
  const onEditNote = (updatedNote) => {
    const updatedNotesList = notes.map((note) => {
      if(note.id === activeNote){
        return updatedNote;
      }
      return note;
    });
    setNotes(updatedNotesList);
    
    axios.put('/notes/' + getActiveNote().id, updatedNote)
      .then(res => console.log(res.data));
    

  }
  const [searchQuery, setSearchQuery] = useState("");

  //for search functionality
  const handlesearch = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);
  }
  

   //////////////////////////////////////////////////////////////////////////////////////////////////////////////
   ///////////////////////////////////////TAGS///////////////////////////////////////////////////////////////////
   //for deleting tags
   const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
    getActiveNote().note_tag = tags.filter((tag, index) => index !== i);
    axios.put('/notes/' + getActiveNote().id, getActiveNote())
      .then(res => console.log(res.data));
  };
  //for adding tags
  const handleAddition = tag => {
    setTags([...tags, tag]);
    getActiveNote().note_tag = [... tags, tag];
    axios.put('/notes/' + getActiveNote().id, getActiveNote())
      .then(res => console.log(res.data));
  
  };
  //handling response of tag draging 
  const handleDrag = (tag, currPos, newPos) => {
    const newTags = tags.slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    // re-render
    getActiveNote().note_tag = newTags;
    setTags(newTags);
    axios.put('/notes/' + getActiveNote().id, getActiveNote())
      .then(res => console.log(res.data));
  };
  // function for when a tag is clicked(doesn't have any functionality)
  const handleTagClick = index => {
    console.log('The tag at index ' + index + ' was clicked');
  };
  //to clear all the tags(not added as a functionality) 
  const onClearAll = () => {
    setTags([]);
  };
  
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////////////////////////////RENDERS < 500px//////////////////////////////////////////////////////// 
  
  //for back arrow, sets the main note area to false 
  const handleBack = () => {
    setMainAreaV(false);
    
  } 
  
  const { height, width } = useWindowDimensions();  //gets the dimensions of our screen
  
  //handles view based on screen size
 
  useEffect(() => {
    if(width > 500){
      
      setMainAreaV(true)
    }
     
   }, [width]);
                
  
  if (width <= 500){
    if(logindisplay === true && notedisplay === false){
      if(loginpop === false){
        return(
          <SmallLoginWindow
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
        );

      }else{
        return(
          <SmallAccountWindow
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
        );
      }
    }else if(logindisplay === false && notedisplay === true){
      if(buttonPopup === true){
      
        return (
          <SmallPopupWindow 
  
              trigger={buttonPopup} 
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
          />
        ); 
      }
      
      if(sidebarV === true && mainAreaV == false && buttonPopup === false){
        return(
          <SideBar 
              trigger={buttonPopup} 
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

          />
        );
      }
      if(sidebarV === true && mainAreaV === true){
        return(
          <MainArea 
              onDeleteNote = {onDeleteNote}  
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
        );
      }

    }
        
  } 
  
 
  
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////RENDERS > 500px//////////////////////////////////////////////////////// 


  return (

        <div>
                    
           <LoginPage loginpop = {loginpop}
                      setLoginPop = {setLoginPop}
                      handleSignin = {handleSignin}

                      onChangeName = {onChangeName}
                      onChangeEmail = {onChangeEmail}
                      onChangeColor = {onChangeColor}
                      onChangePassword = {onChangePassword}
                      userPassword = {userPassword}
                      userName = {userName}
                      userEmail = {userEmail}

                      handlelogin = {handlelogin}
                      authorized = {authorized}
                      setAuthorized = {setAuthorized}
                      errorMessage = {errorMessage}
                      setErrorMessage = {setErrorMessage}
                      notedisplay = {notedisplay} 
                      setNoteDisplay = {setNoteDisplay}
                      logindisplay = {logindisplay} 
                      setLoginDisplay = {setLoginDisplay}
          />
          
                    
          <MainPage  buttonPopup={buttonPopup} 
                      setButtonPopup = {setButtonPopup} 
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
      
                      onDeleteNote = {onDeleteNote}  
                      
                      onEditNote = {onEditNote}
                      get_Date = {get_Date}
                      handleBack = {handleBack}
      
                      getActiveNote = {getActiveNote}
                      
                      
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
                      enabletags = {enabletags}
                      setEnableTags = {setEnableTags}
            
          
          />
        </div>
         
  );
}

export default App;
