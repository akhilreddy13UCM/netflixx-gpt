import React,{useEffect} from 'react';
import { signOut } from 'firebase/auth';
import { auth } from "../utils/firebase";
import {  useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch }  from 'react-redux';
import { addUser,removeUser } from '../utils/userSlice';
import { LOGO, SMILE } from '../utils/constants';
const Header = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleSignOut=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      navigate("/error");
      // An error happened.
    });
  };
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/auth.user
          const {uid, email, displayName} = user;
          dispatch(addUser({uid:uid, email:email, displayName:displayName}));
           navigate("/browse");
          // ...
        } else {
          // User is signed out
          dispatch(removeUser());
          navigate("/");
        }
      });
      return ()=> unsubscribe();
},[]);
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
   <img className="w-44"
   src={LOGO}
   alt="logo"/>
   <div className='flex'>
        <img 
        className='w-12 h-12 '
        src={SMILE} 
        alt="l"/>
        <button onClick={handleSignOut} className='fon-bold text-white'>(sign out)</button>
    </div>
   
   
   </div>
  );
}

export default Header;