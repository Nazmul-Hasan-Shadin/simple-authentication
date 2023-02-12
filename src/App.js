
import './App.css';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider ,signOut} from "firebase/auth";
import firebaseConfig from './firebase.config';
import { useState } from 'react';

initializeApp(firebaseConfig);


function App() {
  const[ user, setUser]=useState({
    isSignedIn:false,
    name:'',
    email:'',
    photo:''
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
    console.log(e.target.name,e.target.value);

  }
 const handleSubmit=()=>{

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
      <input type="text" name='name' onBlur={handleChange} required  placeholder='Write yOur email address'/>
      <input type="password" onBlur={handleChange} required name="password" placeholder="password" />
      <br />
      <input type="submit" value="submit" />

      </form>
     
    </div>
  );
}

export default App;
