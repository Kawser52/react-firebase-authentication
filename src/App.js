import {createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup} from 'firebase/auth'
import { useState } from 'react';
import './App.css';
import initializaAuthentication from './Firebase/firebase.init';

initializaAuthentication();

const googleProvider = new GoogleAuthProvider();
const auth = getAuth();
function App() {
  const [useremail, setUseremail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleGoogleSignIn=()=>{
      signInWithPopup(auth, googleProvider)
      .then(result=>{
        const user = result.user;
        console.log(user);
      })
  }
  const toggoleSignIn= e =>{
    setIsLoggedIn(e.target.checked);
  }
  const handleEmailCheck = e =>{
    setUseremail(e.target.value);
  }
  const handlePasswordCheck = e =>{
    setPassword(e.target.value);
  }
  const handleFormSubmit = e =>{
    e.preventDefault();
    console.log(useremail, password);
    const isNonWhiteSpace = /^\S*$/;
    if(password.length<6){
      setError('Password must be 6 carecter');
      return;
    }
    if (!isNonWhiteSpace.test(password)) {
      setError("Password must not contain Whitespaces.");
      return;
    }
    isLoggedIn ? processLogin(useremail, password) : createNewUser(useremail, password)
    
  } 
  const processLogin = (useremail, password)=>{
      signInWithEmailAndPassword(auth, useremail, password)
      .then(result=>{
        const signIn = result.user;
        console.log(signIn);
        setError('')

      })
      .catch(error=>{
          setError(error.message);
      })
  }
    const createNewUser = (useremail, password)=>{
      createUserWithEmailAndPassword(auth, useremail, password)
      .then(result=>{
        const loggedInuser = result.user;
        console.log(loggedInuser);
        setError('');
        emailVerify();
      })
      .catch (error=>{
        setError(error.message)
      })
    }

  const emailVerify = ()=>{
    sendEmailVerification(auth.currentUser)
    .then (result=>{

    })
  }
  const passwordReset = () =>{
    sendPasswordResetEmail(auth,useremail)
    .then(result=>{
      
    })
  }
  return (
    <div className="App">
      <br /><br /><br />
     <div className="container">
       <h1 className='text-primary'>Please {isLoggedIn?'Login' : 'Register'}</h1>
     <form className="row g-3" onSubmit={handleFormSubmit}>
            <div className="col-md-12">
              <label htmlFor="inputEmail4" className="form-label">Email</label>
              <input type="email" onBlur={handleEmailCheck} className="form-control" id="inputEmail4"/>
            </div>
            <br/>
            <div className="col-md-12">
              <label htmlFor="inputPassword4" className="form-label">Password</label>
              <input type="password" onBlur={handlePasswordCheck} className="form-control" id="inputPassword4"/>
            </div>
            <div className="form-check">
              <input className="form-check-input" onChange={toggoleSignIn} type="checkbox" value="" id="flexCheckDefault"/>
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Already Registerd
              </label>
            </div>
              <div className='row ml-5 text-danger'>{error}</div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary mr-5">{isLoggedIn? 'Sign In': 'Sign Up'}</button>
              <button className=' btn btn-primary' onClick={passwordReset}>Reset Passoord</button>
            </div>
            
          </form>
     </div>
      <br /><br /><br /><br /><br /><br /><br /><br />
      <div>------------------------------------------</div>
      <button onClick = {handleGoogleSignIn}>Google Sign In</button>
    </div>
  );
}

export default App;
