import SideBar from './components/col1';
import MainArea from './components/col2';
import PopupWindow from './components/popup';
import SmallPopupWindow from './components/popup-small';

import { useState, useLayoutEffect } from 'react';

function App() {
  const [buttonPopup, setButtonPopup] = useState(false);

 

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

  const [notes, setNotes] = useState([{id: 0,  body: "This is a note with a long line of text.", lastModified: get_Date()} ,
                                      {id: 1,  body: "Another wrapping line example", lastModified: get_Date()}, 
                                      {id: 2,  body: "CSE 316", lastModified: get_Date()} ]);


 
  const onAddNote = () => {
    
    const newNote = {
      id: Date.now(), 
      body: "",
      lastModified: get_Date(),
    };
     

    setNotes([newNote , ... notes]);


  } 
   
  const [activeNote, setActiveNote] = useState(notes[0].id);
 
  const getActiveNote = () => {
    return notes.find((note) => note.id === activeNote);
  }

  

  const onDeleteNote = (DelTarget_note) => {
    
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

  }


  function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
      function updateSize() {
        setSize([window.innerWidth, window.innerHeight]);
      }
      window.addEventListener('resize', updateSize);
      updateSize();
      return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
  }
  
  if (useWindowSize()[0] < 500 && buttonPopup === true){
      return (
        <SmallPopupWindow />
      );     
  } 
  


  return (

      <div className="wrapper">
        
        <SideBar trigger={buttonPopup} 
                 setTrigger = {setButtonPopup} 
                 notes = {notes} 
                 setNotes = {setNotes}
                 onAddNote = {onAddNote}
                 activeNote = {activeNote}
                 setActiveNote = {setActiveNote}

                
        />
        <MainArea onDeleteNote = {onDeleteNote}  
                  activeNote = {getActiveNote()}
                  onEditNote = {onEditNote}
                  get_Date = {get_Date}
                  
        />
        
        <PopupWindow trigger={buttonPopup} setTrigger = {setButtonPopup}>
            
        </PopupWindow>

      
      </div>



  );
}

export default App;
