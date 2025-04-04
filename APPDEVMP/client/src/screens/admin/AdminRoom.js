import React, { useEffect, useState } from 'react'
import { Form, FormControl, Button, Container } from "react-bootstrap"
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify'
import Loader from '../../components/Loader'
import Error from '../../components/Error'
import { useParams } from 'react-router-dom'
function AdminRoom() {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [type, setType] = useState("")
    const [rentperday, setRentPerDay] = useState(0)
    const [phonenumber, setPhoneNumber] = useState(0)
    const [maxcount, setMaxCount] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const params = useParams()
    const { id } = params

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = (await axios.get(`https://backend-k86c.onrender.com/api/rooms/${id}`)).data;
                setName(res.name)
                setDescription(res.description)
                setType(res.type)
                setRentPerDay(res.rentperday)
                setPhoneNumber(res.phonenumber)
                setMaxCount(res.maxcount)
            } catch (error) {
                toast.error(error)
            }
        }
        getUser()
    }, [id])





    const updateHandler = async (e) => {
        e.preventDefault()
        
        try {
            setLoading(true)
                await axios.put(`https://backend-k86c.onrender.com/api/rooms/${id}`, 
                name,description,type,rentperday,phonenumber,maxcount
            })
            toast.success("Updated Room!")
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
            <h2 className='my-2 text-center'>Edit Room</h2>
            {loading && <Loader />}
            {error && <Error />}
            <Form className='w-50 mx-auto' onSubmit={updateHandler}>
                <Form.Label id='name' className='my-1'>Title</Form.Label>
                <FormControl type="text" name='name' placeholder='Name...' value={name} onChange={e => setName(e.target.value)}>
                </FormControl>
                <Form.Label id='description' className='my-1'>Description</Form.Label>
                <FormControl type="text" name='description' placeholder='Description...' value={description} onChange={e => setDescription(e.target.value)}>
                </FormControl>
                <Form.Label id='type' className='my-1'>Type</Form.Label>
                <FormControl as={"select"} name='type'  value={type} onChange={e => setType(e.target.value)}>
                    <option selected value={""}>Select...</option>
                    <option value={"Desk"}>Desk</option>
                    <option value={"Office"}>Office</option>
                    <option value={"MeetingRoom"}>Meeting Room</option>

                </FormControl>
                <Form.Label id='rent' className='my-1'>Rent (Per Day)</Form.Label>
                <FormControl type="text" name='rent' placeholder='Rent...' value={rentperday} onChange={e => setRentPerDay(e.target.value)}>
                </FormControl>
                <Form.Label id='phone' className='my-1'>Phone No</Form.Label>
                <FormControl type="number" name='phone' placeholder='Phone...' value={phonenumber} onChange={e => setPhoneNumber(e.target.value)}>
                </FormControl>
                <Form.Label id='count' className='my-1'>Max Count</Form.Label>
                <FormControl type="number" name='count' placeholder='Count...' value={maxcount} onChange={e => setMaxCount(e.target.value)}>
                </FormControl>
                

                <Button type="submit" variant='dark' className='my-3'>Update</Button>
            </Form>

        </Container>
    )
}

export default AdminRoom
