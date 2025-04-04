import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import Loader from '../components/Loader'
import Error from '../components/Error'
import moment from "moment"
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2'

function Bookingscreen() {

    const [room, setroom] = useState()
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()
    const { roomid, fromDate, toDate } = useParams()   //Params are used to replace match.params.roomid which was used in react-router-dom older versions
    // Setting up Dates Formats
    const todate = moment(toDate, "DD-MM-YYYY")
    const fromdate = moment(fromDate, "DD-MM-YYYY")
    // Getting Number of Days Left
    const totaldays = todate.diff(fromdate, "days") + 1
    // Getting Total Amount
    const [totalamount, setTotalAmount] = useState()


    // Function to fetch a Single Room from MongoDB
    useEffect(() => {
        const myFunction = async () => {
            try {
                setloading(true);
                const data = (await axios.post("https://backend-k86c.onrender.com/api/rooms/getroombyid", { roomid })).data;
                setroom(data)
                setTotalAmount(data.rentperday * totaldays)
                setloading(false)
            } catch (error) {
                setloading(false)
                seterror(true)
            }

        }

        myFunction()

    }, [roomid,totaldays]);

    
    const user = JSON.parse(localStorage.getItem("currentUser"))


    const onToken =async (token) => {
        console.log(token)
        // Getting Details
        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem("currentUser"))._id,
            fromdate,
            todate,
            totaldays,
            totalamount,
            token
        }
        // Posting data to bookroom routes to fetch and post
        try {
            // const result = await axios.post('/api/bookings/bookroom',bookingDetails)
            setloading(true)
            await axios.post("https://backend-k86c.onrender.com/api/bookings/bookroom", bookingDetails);
            setloading(false)
            Swal.fire("Congratulations", "Your Room is Booked Successfully!","success").then(()=>{
                window.location.href = "/bookings"
            })
            
        } catch (error) {
            setloading(false)
            console.error(error)
            Swal.fire("Error", "Room Booking Failed","error")
        }

    }

    return (
        <div className='mx-5'>

            {loading ? (<Loader />) : error ? (<Error />) : (<div className='container-fluid'>



                <div className='row justify-content-center mt-5 bs'>
                    <div className='col-md-6'>
                        <h4>{room.name}</h4>
                        <img className='bigimg' alt='booking' src={room.imageurls[0]} style={{ height: "360px", width: "auto", border: "1px solid transparent", borderRadius: "5px" }} />
                    </div>
                    <div className='col-md-6'>
                        <div style={{ textAlign: "right" }}>
                            <h4>Booking Details</h4>
                            <hr />
                            <b>
                                <p>Name:{user.name}</p>
                                <p>From Date:{fromDate}</p>
                                <p>To Date:{toDate}</p>
                                <p>Max Count:{room.maxcount}</p>
                            </b>
                        </div>

                        <div style={{ textAlign: "right" }}>
                            <h4>Amount</h4>
                            <hr />

                            <b>
                                <p>Total Days:{totaldays}</p>
                                <p>Rent Per Day:{room.rentperday}</p>
                                <p>Total Amount:{totalamount}</p>
                            </b>

                        </div>


                        <div>
                            <StripeCheckout
                                ComponentClass="div"
                                name='Checkout'
                                currency='PHP'
                                amount={totalamount*100}
                                token={onToken}
                                stripeKey="pk_test_51P2Aq0IaFe5goczal8jGVHYnaMHI5EsMOt2KkgndUjxYkWecXALgJIe5b29TgntHrOG0npAM0KZkV9mCBGGYHWT700eq85lFeG"
                            >
                                <button className='btn btn-dark' style={{ float: "right" }}>
                                    Pay Now
                                </button>
                            </StripeCheckout>
                        </div>


                    </div>
                </div>








            </div>)}















        </div>
    )
}

export default Bookingscreen
