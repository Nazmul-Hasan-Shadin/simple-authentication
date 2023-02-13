
import './App.css';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider ,signOut,createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

initializeApp(firebaseConfig);


function App() {
  const [newUser,setNewUser]=useState(false);
  const[ user, setUser]=useState({
    isSignedIn:false,
    name:'',
   
    email:'',
    photo:'',
    password:'',
    error:'',
    success:false
    });


  const provider = new GoogleAuthProvider();
  const auth=getAuth();


  const handleSignIn=()=>{
    signInWithPopup(auth,provider)
    .then(res=>{
      console.log(res);
       const {displayName,photoURL,email}=res.user;
        const signedInUser={
          isSignedIn:true,
          name:displayName,
          email:email,
          photo:photoURL
        }
       setUser(signedInUser);
      console.log(signedInUser);
    })


  }


  const handleSignOut=()=>{
    signOut(auth).then(() => {
      const signedOutUser={
        isSignedIn:false,
        name:'',
        email:'',
        photo:''
      }
      setUser(signedOutUser);
    }).catch((error) => {
      // An error happened.
    });
    
    
  }

  const handleChange=(e)=>{
    let isFieldVaild=true;
   
    if(e.target.name==="email"){
     
      isFieldVaild= /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e.target.value);
      
    
      
    }
    if(e.target.name==='password'){
       const isPasswordValid=e.target.value.length>6;
       console.log(isPasswordValid);

       isFieldVaild= isPasswordValid;

    }
    if (isFieldVaild) {  
      const newUserInfo={ ...user};
      newUserInfo[e.target.name]=e.target.value;
       setUser(newUserInfo);
    }




  }
 const handleSubmit=(e)=>{
  console.log(user.email,user.password );
   if (newUser && user.name && user.password) {
      

    createUserWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      // Signed in 
      const newUserInfo={...user};
      newUserInfo.error='';
      newUserInfo.success=true;
      setUser(newUserInfo);
    
      // ...
    })
    .catch((error) => {

     const newUserInfo= { ...user};
     newUserInfo.error= error.message;
     newUserInfo.success=false;
      setUser(newUserInfo);
      

      // ..
    });
  


   }
   if (!newUser && user.email && user.password) {

    signInWithEmailAndPassword(auth, user.email, user.password)
    .then((userCredential) => {
      // Signed in 
      const newUserInfo={...user};
      newUserInfo.error='';
      newUserInfo.success=true;
      setUser(newUserInfo);
    
      
   
      // ...
    })
    .catch((error) => {
      const newUserInfo= { ...user};
      newUserInfo.error= error.message;
      newUserInfo.success=false;
       setUser(newUserInfo);
    });



    
   }
 e.preventDefault();
 }

  return (
    <div className="App">

     {
     
     
     user.isSignedIn?  <button onClick={handleSignOut}> Sign Out</button>:  <button onClick={handleSignIn}> Sign In</button>
     
     
     
     
     }



      {
        user.isSignedIn===true &&  <div>
          
          <p>welcome, {user.name}</p>
          <p>your {user.email}</p>
          <img src={user.photo} alt="" />
          
          
          
          </div>
      }

      <h1>Our Own Authentication</h1>
    
      <form onSubmit={handleSubmit}>
        <input type="checkbox" onChange={()=>setNewUser(!newUser)} name='newUser' />
        <label htmlFor="newUser">SignUp</label><br />

      { newUser && <input type="text" name ='name'placeholder='enter your name'onBlur={handleChange}/> }<br /> 


      <input type="text" name='email' onBlur={handleChange} required  placeholder='Write yOur email address'/><br />
      <input type="password" onBlur={handleChange} required name="password" placeholder="password" />
       <br />
      <input type="submit" value="submit" />

      </form>
      <p>{user.error}</p>
      {user.success && <p style={{color:'green'}}> user {newUser ?'created': 'Logged in succesful'} Succesful</p>}
     
    </div>
  );
}

export default App;
