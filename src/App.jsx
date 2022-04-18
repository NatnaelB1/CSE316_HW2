import SideBar from './components/col1';
import MainArea from './components/col2';
import PopupWindow from './components/popup';
import SmallPopupWindow from './components/popup-small';
import useWindowDimensions from './components/winsize';
import axios, { Axios } from 'axios';

import { useState, useLayoutEffect, useEffect } from 'react';
import { WithContext as ReactTags } from 'react-tag-input'

function App() {
  const [buttonPopup, setButtonPopup] = useState(false);

  const [sidebarV, setSideBarV] = useState(true);
  const [mainAreaV, setMainAreaV] = useState(true);

  const [userName, setUsername] = useState ('');
  const [userEmail, setUserEmail] = useState('');
  const [userColor, setUserColor] = useState('');

  useEffect(()=>{
    axios.get('/users').then(res => {
      let un = userName.concat(res.data.username);
      setUsername(un)
    }  
    )
    
  },[])
  useEffect(()=>{
    axios.get('/users').then(res => {
      let ue = userEmail.concat(res.data.useremail);
      setUserEmail(ue)
    }  
    )
    
  },[])
  useEffect(()=>{
    axios.get('/users').then(res => {
      let uc = userColor.concat(res.data.usercolor);
      setUserColor(uc)
    }  
    )
    
  },[])

  const onChangeName = e => {
    setUsername(e.target.value);
    
  }

  const onChangeEmail = e => {
    setUserEmail(e.target.value);
    
  }

  const onChangeColor = e => {
    setUserColor(e.target.value);
    
  }

  const user = {
    username: userName, 
    useremail: userEmail,
    usercolor: userColor
    
  };
  
  const handleProfileSubmit = e => {
    e.preventDefault();
    setButtonPopup(false);
    console.log(user);
    axios.post('/users/add', user)
      .then(res => console.log(res.data)); 

  }
   
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

  

  const [notes, setNotes] = useState([{id: 0,  notebody: "This is a note with a long line of text.", lastModified: get_Date(), note_tag: [{id:"cse" ,text:"cse"}]}]);

useEffect(()=>{
  axios.get('/notes').then(res => {
    let n = notes.concat(res.data);
    setNotes(n)
  }  
  )
  
},[])
                                                                 
const onAddNote = () => {
  
  const newNote = {
    id: Date.now(), 
    notebody: "",
    lastModified: get_Date(),
    note_tag: [{id:"cse" ,text:"cse"}]
  };
    

  setNotes([newNote , ... notes]);

  axios.post('/notes', newNote)
      .then(res => console.log(res.data));

  window.location.reload();

} 

   
  const [activeNote, setActiveNote] = useState(notes[0].id);
 
  
  
  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  }

  useEffect(() => {
    setTags(getActiveNote().note_tag);
  }, [activeNote]); 
  
  
  const [tags, setTags] = useState(getActiveNote().note_tag);
  

  const onDeleteNote = (DelTarget_note) => {
    if (notes.length === 1){
      return "";
    }
  
    axios.delete('/notes/' + getActiveNote().id)
      .then(res => console.log(res.data));

    if (DelTarget_note !== notes[0].id){
      setNotes(notes.filter((note) => note.id !== DelTarget_note ));
      return setActiveNote(notes[0].id); 
    }
    setNotes(notes.filter((note) => note.id !== DelTarget_note ));
      return setActiveNote(notes[1].id);  
    
  }
  

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

  const handlesearch = (newSearchQuery) => {
    setSearchQuery(newSearchQuery);
  }
  

   //////////////////////////////////////////////////////////////////////////////////////////////////////////////
   const handleDelete = i => {
    setTags(tags.filter((tag, index) => index !== i));
    getActiveNote().note_tag = tags.filter((tag, index) => index !== i);
    axios.put('/notes/' + getActiveNote().id, getActiveNote())
      .then(res => console.log(res.data));
  };

  const handleAddition = tag => {
    setTags([...tags, tag]);
    getActiveNote().note_tag = [... tags, tag];
    axios.put('/notes/' + getActiveNote().id, getActiveNote())
      .then(res => console.log(res.data));
  
  };

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

  const handleTagClick = index => {
    console.log('The tag at index ' + index + ' was clicked');
  };
  
  const onClearAll = () => {
    setTags([]);
  };
  
  
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////


  const handleBack = () => {
    setMainAreaV(false);
    
  } 
  
  const { height, width } = useWindowDimensions(); 
  

  useEffect(() => {
    if(width > 500){
      
      setMainAreaV(true)
    }
     
   }, [width]);
                
  
  if (width <= 500){
    if(buttonPopup === true){
      return (
        <SmallPopupWindow 

                     onChangeName = {onChangeName}
                     onChangeEmail = {onChangeEmail}
                     onChangeColor = {onChangeColor}
                     userName = {userName}
                     userEmail = {userEmail}
                     userColor = {userColor}
                     handleProfileSubmit = {handleProfileSubmit}
        
        
        />
      ); 

    }
    
    if(sidebarV === true && mainAreaV == false && buttonPopup === false){
      return(
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
                 
                 
       
        />

      );
    }
    if(sidebarV === true && mainAreaV === true){
      return(
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
                 
                  
        />

      );
    }
     
    
        
  } 
  
  



  return (

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
        
        >
            
        </PopupWindow>

      
      </div>



  );
}

export default App;
