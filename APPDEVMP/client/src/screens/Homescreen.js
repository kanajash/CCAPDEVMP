import React, { useState, useEffect } from 'react';
import axios from "axios";
import Room from "../components/Room"
import Loader from '../components/Loader';
import Error from '../components/Error';
import { DatePicker, Space } from 'antd';
import { Form } from 'react-bootstrap';
import moment from 'moment';
const { RangePicker } = DatePicker;

function Homescreen() {
    // States for Rooms
    const [rooms, setrooms] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()

    // two Hooks for Date Handling 
    const [fromDate, setFromDate] = useState()
    const [toDate, setToDate] = useState()
    const [duplicateRooms, setDuplicateRooms] = useState([])
    const [searchKey, setSearchKey] = useState("")
    const [selectedValue, setSelectedValue] = useState("all")

    useEffect(() => {
        const myFunction = async () => {
            try {
                setloading(true);
                const data = (await axios.get("https://backend-k86c.onrender.com/api/rooms/getallrooms")).data;
                setrooms(data)
                setDuplicateRooms(data)
                setloading(false)
            } catch (error) {
                setloading(false)
                seterror(true)

            }

        }

        myFunction()

    }, []);

    // Function for setting dates fetched from date frontend
    const filterByDate = (dates) => {
        // Format the selected dates
        const formattedFromDate = dates[0].format("DD-MM-YYYY");
        const formattedToDate = dates[1].format("DD-MM-YYYY");

        setFromDate(formattedFromDate);
        setToDate(formattedToDate);

        // Filter the rooms
        const tempRooms = duplicateRooms.filter((room) => {
            // If no bookings exist, include the room
            if (!room.currentbookings || room.currentbookings.length === 0) {
                return true;
            }

            // Check for overlaps in current bookings
            const isAvailable = room.currentbookings.every(({ fromdate, todate }) => {
                const bookingStart = moment(fromdate, "DD-MM-YYYY");
                const bookingEnd = moment(todate, "DD-MM-YYYY");

                // Return true if there is NO overlap
                return (
                    moment(formattedFromDate).isAfter(bookingEnd) || // Selected range starts after this booking ends
                    moment(formattedToDate).isBefore(bookingStart)   // Selected range ends before this booking starts
                );
            });

            // Include the room only if it's available
            return isAvailable;
        });

        setrooms(tempRooms); // Update the state with the filtered rooms
    };





    const filterBySearch = () => {
    const tempRooms = duplicateRooms.filter((room)=>room.name.toLowerCase().includes(searchKey.toLowerCase()))
    setrooms(tempRooms)
    }


    const filterByType = ()=>{
    const tempRooms = duplicateRooms.filter((room)=>{
    if(selectedValue === "all"){
        return true
    }
    else if( selectedValue === "Desk" && room.type === selectedValue){
        return true
    }
    else if(selectedValue === "Office" && room.type === selectedValue){
        return true
    }
    else if(selectedValue === "Meeting" && room.type === selectedValue){
        return true
    }
    })
    setrooms(tempRooms)
    }


    return (
        <div className='container p-4'>
            <div className='row d-flex align-items-center justify-content-around border rounded py-2'>
                <div className='col-md-3'>
                    {/* Setting up date picker and its format  */}
                    <RangePicker format={"DD-MM-YYYY"} onChange={filterByDate} className='p-2' />
                </div>
                <div className='col-md-3'>
                    <Form.Control type='text' className='p-1 my-auto' placeholder='Search...' onChange={e => setSearchKey(e.target.value)} onKeyUp={filterBySearch}>
                    </Form.Control>


                </div>
                <div className='col-md-3'>
                    <Form.Control as='select' className='p-1 my-auto' placeholder='Select'  onChange={e => setSelectedValue(e.target.value)} onClick={filterByType}>
                        <option selected value={"all"}>All</option>
                        <option value={"Desk"}>Desk</option>
                        <option value={"Office"}>Office</option>
                        <option value={"Meeting"}>Meeting</option>

                    </Form.Control>
                </div>



            </div>





            <div className='row justify-content-center mt-5'>
                {loading ? (<Loader />) : error ? (<Error />) : (rooms?.map(room => {
                    return <div className='col-md-12 mt-2'>

                        <Room room={room} fromDate={fromDate} toDate={toDate} />


                    </div>
                }))}
            </div>

        </div>
    )
}

export default Homescreen;
