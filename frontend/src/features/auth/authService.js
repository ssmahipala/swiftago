import axios from 'axios'

const API_URL = '/api/users'

//Register user
const signUp =async(userData) => {
    const response = await axios.post(API_URL, userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify
        (response.data))
    }
    return response.data
}

//Login user
const signIn =async(userData) => {
    const response = await axios.post(API_URL + '/login', userData)

    if(response.data) {
        localStorage.setItem('user', JSON.stringify
        (response.data))
    }
    return response.data
}

// Update user
const updateUser = async (userData) => {
    const user = JSON.parse(localStorage.getItem('user'))
  
    if (!user) {
      throw new Error('User not authenticated')
    }
  
    const { token } = user
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    }
  
    const response = await axios.patch(API_URL + '/update', userData, {
      headers,
    })
  
    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
  }
//Logout user
const signOut = () => localStorage.removeItem('user')

const authService = {
    signUp,
    signOut,
    signIn,
    updateUser,
}

export default authService