import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {useState, useEffect} from 'react'
import {toast} from 'react-toastify'
import {useSelector, useDispatch} from 'react-redux'
import {updateUser, reset} from '../features/auth/authSlice'

import Header from '../partials/Header';
import Banner from '../partials/Banner';

function UserProfile() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  const {name, email, password} = formData

  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

  useEffect(() => {
    if (isSuccess) {
      toast.success(message);
      navigate('/');
    }
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }
  }, [isSuccess, isError, message, dispatch, navigate]);


  const onChange = (e) => {
    setFormData((prevState ) => ({
      ...prevState,
      [e.target.name] : e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData = {
      name,
      email,
      password,
    }

    dispatch(updateUser(userData))

    }
  return <div className="flex flex-col min-h-screen overflow-hidden">

  {/*  Site header */}
  <Header />

  {/* Page Content */}
  <main className="flex-grow">

    <section className="bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="pt-32 pb-12 md:pt-40 md:pb-20">

        <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
        <h1 className="h2">Let's review and update your details</h1>
        </div>

        {/* Form */}
        <div className="max-w-sm mx-auto">
        <form onSubmit={onSubmit}>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full px-3">
              <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">Name: <strong>{user.name}</strong></label>
              <input id="name" type="text" className="form-input w-full text-gray-800" name= 'name' value= {name} onChange= {onChange} placeholder="Edit your name" />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full px-3">
              <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">email: <strong>{user.email}</strong></label>
              <input id="email" type="email" className="form-input w-full text-gray-800" name= 'email' value= {email} onChange= {onChange} placeholder="Edit your email" />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-4">
            <div className="w-full px-3">
              <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="name">Password</label>
              <input id="password" type="password" className="form-input w-full text-gray-800" name= 'password' value= {password} onChange= {onChange} placeholder="New Password" />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mt-6">
            <div className="w-full px-3">
              <button type ="submit" className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Confirm Changes</button>
            </div>
          </div>
        </form>
        </div>

        </div>
      </div>
    </section>
  </main>

  </div>
 
}
export default UserProfile;