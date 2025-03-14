import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, Container,Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import Error from '../../components/Error'
import { FaPenToSquare, FaTrash } from 'react-icons/fa6'
import { toast, ToastContainer } from 'react-toastify'
function AdminRooms() {

  const [rooms, setRooms] = useState([])
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(false)


  useEffect(() => {
    const getRooms = async () => {
    try {
      setLoading(true)
      const res = await axios.get("http://localhost:5000/api/rooms/getallrooms")
      setRooms(res.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(true)
    }
    }
    getRooms()
  }, [])


  const deleteHandler = async (id)=>{
    try {
        const confirm = window.confirm("Are you sure you want to delete room?")
        if(confirm){
            await axios.delete(`http://localhost:5000/api/rooms/${id}`)
            toast.success("Room Deleted!")
            window.location.reload()
        }
       
    } catch (error) {
       toast.error(error) 
    }
  }

  const createRoom = async ()=>{
    try {
        await axios.post("http://localhost:5000/api/rooms/create")
        toast.success("Created Successfully!")
        window.location.reload()
    } catch (error) {
        toast.error(error)
    }
  }

  return (
    <Container>
        <ToastContainer/>
    <div className="d-flex justify-content-between align-items-center">
    <h2 className='my-3'>All Rooms</h2>
    <Button variant='dark' onClick={createRoom}>Create Room</Button>
    </div>
    
     {loading ? <Loader/> : error ? <Error/> :
     <Table striped responsive hover className='table-sm' >
      
      <thead>
        <tr>
          <th>ID</th>
          <th>ROOM</th>
          <th>TYPE</th>
          <th>RENT PER DAY</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {rooms.map((room)=>{
         return <tr key={room._id}>
            <td>{room._id}</td>
            <td>{room.name.substring(0,30)}</td>
            <td>{room.type}</td>
            <td>{room.rentperday}</td>
            {/* <td>{booking.totalamount}</td> */}
            <td><Link to={`/admin/rooms/edit/${room._id}`} className='btn btn-dark mx-2'><FaPenToSquare/></Link><Button variant='danger' onClick={()=>deleteHandler(room._id)}><FaTrash/></Button></td>
          </tr>
        })}
      </tbody>
      
      
      </Table>}
    </Container>
  )
}

export default AdminRooms