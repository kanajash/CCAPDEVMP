import React, { useEffect, useState } from 'react'
import { Form, FormControl, Button, Container } from "react-bootstrap"
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import Loader from '../../components/Loader'
import Error from '../../components/Error'
import { useParams } from 'react-router-dom'
function AdminUser() {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const params = useParams()
    const { id } = params

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = (await axios.get(`http://localhost:5000/api/users/${id}`)).data
                setUsername(res.name)
                setEmail(res.email)
                setIsAdmin(res.isAdmin)
            } catch (error) {
                toast.error(error)
            }
        }
        getUser()
    }, [id])





    const updateHandler = async (e) => {
        e.preventDefault()
        if (password !== cPassword) {
            return toast.error("Passwords do not match!")
        }
        try {
            setLoading(true)
            await axios.put(`http://localhost:5000/api/users/${id}`, { name: username, email, password,isAdmin })
            toast.success("Updated User!")
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
            <ToastContainer/>
            <h2 className='my-2 text-center'>Edit User</h2>
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
                <Form.Label id='username' className='my-1'>Admin</Form.Label>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label= {isAdmin ? "isAdmin": "notIsAdmin"}
                    checked={isAdmin}
                    onChange={e=>setIsAdmin(e.target.checked)}
                />
              

                <Button type="submit" variant='dark' className='my-3'>Update</Button>
            </Form>

        </Container>
    )
}

export default AdminUser