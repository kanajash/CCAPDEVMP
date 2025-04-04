import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import axios from 'axios'
import { ToastContainer } from "react-toastify"
import { Tabs } from "antd";
import Bookings from '../components/Bookings'
import Profile from '../components/Profile'

function ProfileScreen() {
    const user = localStorage.getItem("currentUser")
    const parsedUser = JSON.parse(user)
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
   
   


    const userBookings = bookings.map(booking => booking?.currentbookings?.userid === user._id ? booking : [])
    console.log(userBookings)
    useEffect(() => {
        const getBookings = async () => {
            try {
                setLoading(true)
                const res = await axios.get("https://backend-k86c.onrender.com/api/bookings/");
                setBookings(res.data)
                setLoading(false)

            } catch (error) {
                setError(error)
                setLoading(false)
            }

        }
        getBookings()


    }, [user._id])


    

    const onChange = (key) => {
        console.log(key);
      };

      const items = [
        {
          key: '1',
          label: 'Profile',
          children: <Profile parsedUser={parsedUser}/>
        },
        {
          key: '2',
          label: 'Bookings',
          children: <Bookings userBookings={userBookings} loading={loading} error={error}/>,
        },
      ];

    return (
        <Container >
            <ToastContainer />
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} className='my-2 text-dark hover:text-dark'/>
        </Container>
    )
}

export default ProfileScreen
