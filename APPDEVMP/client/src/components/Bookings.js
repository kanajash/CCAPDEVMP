import React, { useState } from 'react'
import { Row, Col, ListGroup, Card, Button } from "react-bootstrap"
import Error from './Error'
import Loader from './Loader'
import axios from "axios"
import { toast } from 'react-toastify'
function Bookings({ userBookings, loading, error }) {


    const cancelBooking = async (id) => {
        try {
            const confirm = window.confirm("Are you sure you want to cancel?")
            if (confirm) {
                await axios.delete(`http://localhost:5000/api/bookings/${id}`)
                toast.success("Booking Cancelled Successfully!")
                window.location.reload()
            }


        } catch (error) {
            toast.error(error)
        }
    }
    return (
        <>
            {
                loading ? <Loader /> : error ? <Error /> : <Row>
                    <h2 className='my-2'>Bookings</h2>
                    {
                        userBookings.map((booking) => (


                            <Col md={6}>
                                <Card>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item>
                                            {booking.room.substring(0, 40)}..
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Booking ID:  {booking._id}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Transaction ID:  {booking.transactionid}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Check In:  {booking.fromdate}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Check Out:  {booking.todate}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Amount:  {booking.totalamount}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            Status:  {booking.status}
                                        </ListGroup.Item>
                                        <ListGroup.Item className='d-flex justify-content-end'>
                                            <Button variant='dark' onClick={() => cancelBooking(booking._id)}>
                                                Cancel Booking
                                            </Button>
                                        </ListGroup.Item>

                                    </ListGroup>
                                </Card>
                            </Col>


                        ))
                    }



                </Row>
            }
        </>
    )
}

export default Bookings