import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout'
import {useNavigate, Link} from 'react-router-dom'
import Input from '../../components/Inputs/Input'
import { validateEmail } from '../../utils/helper'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { UserContext } from '../../context/userContext'
function Login() {
  const [email, setEmail ] = useState(""); 
  const [password, setPassword] = useState(""); 
  const[error, setError] = useState(null); 

  const {updateUser} = useContext(UserContext); // get updateUser function from context
  const navigate = useNavigate(); 

  // Handle form submit 
  const handleLogin = async (e) => {
    e.preventDefault(); 
    if(!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return;
    }
    if(!password){
      setError("Please enter the password."); 
      return;
    }

    setError("");

    // login api call

    try{
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email, 
        password
      });
      const {token, user} = response.data;
      if(token) {
        localStorage.setItem("token", token); // save token to local storage
        
        updateUser(user); // update user in context

        navigate("/dashboard"); // redirect to dashboard page
      }
    }
    catch(err) {
      if(err.response && err.response.data.message) {
        setError(err.response.data.message); // set error message from server response
      }
      else {
        setError("Something went wrong. Please try again later.")
      }
    }
  }

  return (
    <AuthLayout >
      <div className=' lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'> 
        <h3 className=' text-xl font-semibold text-black'>Welcome Back </h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Please enter your details to login
        </p>

        <form onSubmit={handleLogin}> 
          <Input
            value = {email}
            onChange = {({target}) => setEmail(target.value)}
            label = "Email Address" 
            placeholder = "john@example.com"
            type = "text"
          />
           <Input
            value = {password}
            onChange = {({target}) => setPassword(target.value)}
            label = "Password" 
            placeholder = "Min. 8 characters"
            type = "password"
          />

          {
            error && <p className='text-red-500 text-xs pb-3'>{error}</p>
          }

          <button type = "submit" className='btn-primary'>
            LOGIN
          </button>

          <p className='text-[13px] text-slate-800 mt-3'>
          Don't have account? {" "}
          </p>
          <Link className = "font-medium text-primary underline " to = "/signup">
          SignUp
          </Link>
        </form>
        
      </div>
    </AuthLayout>
  )
}

export default Login
