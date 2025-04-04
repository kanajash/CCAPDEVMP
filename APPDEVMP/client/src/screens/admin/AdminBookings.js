import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container,Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import Error from '../../components/Error'
function AdminBookings() {

  const [bookings, setBookings] = useState([])
  const [loading,setLoading] = useState(false)
  const [error,setError] = useState(false)

  useEffect(() => {
    const getBookings = async () => {
    try {
      setLoading(true)
      const res = await axios.get("https://backend-k86c.onrender.com/api/bookings/")
      setBookings(res.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      setError(true)
    }
    }
    getBookings()
  }, [])

  return (
    <Container>
      <h2 className='my-3'>All Bookings</h2>
     {loading ? <Loader/> : error ? <Error/> :
     <Table striped responsive hover className='table-sm' >
      
      <thead>
        <tr>
          <th>BOOKING ID</th>
          <th>ROOM</th>
          <th>TOTAL DAYS</th>
          <th>DATE BOOKED</th>
          <th>TOTAL AMOUNT</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {bookings.map((booking)=>{
         return <tr key={booking._id}>
            <td>{booking._id}</td>
            <td>{booking.totaldays}</td>
            <td>{booking.room.substring(0,30)}</td>
            <td>{booking.createdAt.substring(0,10)}</td>
            <td>{booking.totalamount}</td>
            <td><Link to={`/admin/booking/details/${booking._id}`} className=' btn btn-dark'>Details</Link></td>
          </tr>
        })}
      </tbody>
      
      
      </Table>}
    </Container>
  )
}

export default AdminBookings
