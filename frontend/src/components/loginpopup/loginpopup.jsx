import React, {  useContext, useState } from 'react'
import './loginpopup.css'
import { assets } from '../../assets/assets.js'
import { StoreContext } from '../../context/storecontext.jsx'
import axios from "axios"

const Loginpopup = ({setshowlogin}) => {

  const {url,settoken} = useContext(StoreContext)
  
  const [currstate,setcurrstate] = useState("Sign Up")
  const[data,setdata] = useState({
    name: "",
    email:"",
    password: ""
  })

  const onchangehandler = (event)=> {
    const name = event.target.name;
    const value = event.target.value;
    setdata(data => ({...data,[name]:value}))
  }

  const onlogin = async (event) => {
      event.preventDefault()
      let newurl = url;
      if (currstate === "Login") {
        newurl+= "/api/user/login"
      }
      else{
        newurl += "/api/user/register"
      }

      const response = await axios.post(newurl,data);

      if (response.data.success) {
        settoken(response.data.token);
        localStorage.setItem("token",response.data.token)
        setshowlogin(false)
      }
      else{
        alert(response.data.message)
      }
  }
  
    return (
    <div className='login-popup'>
        <form  onSubmit={onlogin} className='login-popup-container'>
            <div className='login-popup-title'>
                <h2>{currstate}</h2>
                <img onClick={()=>setshowlogin(false)} src={assets.cross_icon} alt=''/>
            </div>
            <div className='login-popup-inputs'>
                    {currstate==="Login" ?<></>:<input name='name' onChange={onchangehandler} value={data.name} type='text' placeholder='Your name' required></input>}
                     <input name = "email" onChange={onchangehandler} value={data.email} type='email' placeholder='Your email' required></input>
                    <input name="password" onChange={onchangehandler} value = {data.password} type='password' placeholder='Password' required></input>
            </div>
            <button type='submit'>{currstate==="Sign Up"? "Create Account":"Login"}</button>
            <div className='login-popup-condition'>
                <input type='checkbox' required></input>
                <p>By continuing, i agree to the terms of use and privacy policy</p>
            </div>
            {currstate==="Login"
            ?<p>Create a new account? <span onClick={()=>setcurrstate("Sign Up")}>Click here</span></p>
            :<p>Already have an account? <span onClick={()=>setcurrstate("Login")}>Login here</span></p>
            }
            
            
        </form>
    </div>
  )
}

export default Loginpopup