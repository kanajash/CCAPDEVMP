import React, { useState } from 'react'
import { Form, FormControl, Button, Container } from "react-bootstrap"
import axios from 'axios'
import { toast } from 'react-toastify'
import Loader from './Loader'
import Error from './Error'
function Profile({ parsedUser }) {
  const [username, setUsername] = useState(parsedUser.name)
  const [email, setEmail] = useState(parsedUser.email)
  const [password, setPassword] = useState("")
  const [cPassword, setCPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const id = parsedUser._id
  
  const updateHandler = async (e) => {
    e.preventDefault()
    if (password !== cPassword) {
      return toast.error("Passwords do not match!")
    }
    try {
      setLoading(true)
      const res = await axios.put(`http://localhost:5000/api/users/${id}`, { name: username, email, password })
      localStorage.setItem("currentUser", JSON.stringify(res.data))
      toast.success("Updated")
      setLoading(false)
      window.location.reload()
    } catch (error) {
      setLoading(false)
      toast.error(error)
      setError(true)
    }


  }

  return (


    <Container>
      <h2 className='my-2 text-center'>My Profile</h2>
      {loading && <Loader />}
      {error && <Error />}
      <Form className='w-50 mx-auto' onSubmit={updateHandler}>
        <Form.Label id='username' className='my-1'>Username</Form.Label>
        <FormControl type="text" name='username' placeholder='Username...' value={username} onChange={e => setUsername(e.target.value)}>
        </FormControl>
        <Form.Label id='email' className='my-1'>Email</Form.Label>
        <FormControl type="text" name='email' placeholder='Email...' value={email} onChange={e => setEmail(e.target.value)}>
        </FormControl>
        <Form.Label id='password' className='my-1'>Password</Form.Label>
        <FormControl type="password" name='password' placeholder='Password...' onChange={e => setPassword(e.target.value)}>
        </FormControl>
        <Form.Label id='cpassword' className='my-1'>Confirm Password</Form.Label>
        <FormControl type="password" name='cpassword' placeholder='Confirm Password...' onChange={e => setCPassword(e.target.value)}>
        </FormControl>
        <Button type="submit" variant='dark' className='my-3'>Update</Button>
      </Form>

    </Container>
  )
}

export default Profile