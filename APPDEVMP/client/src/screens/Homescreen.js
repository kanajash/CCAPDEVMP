import React, { useState, useEffect } from 'react';
import axios from "axios";
import Room from "../components/Room";
import Loader from '../components/Loader';
import Error from '../components/Error';
import { DatePicker } from 'antd';
import { Form } from 'react-bootstrap';
import moment from 'moment';

const { RangePicker } = DatePicker;

function Homescreen() {
  const [rooms, setrooms] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState();
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [selectedValue, setSelectedValue] = useState("all");

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setloading(true);
        const data = (await axios.get("https://backend-k86c.onrender.com/api/rooms/getallrooms")).data;
        setrooms(data);
        setDuplicateRooms(data);
        setloading(false);
      } catch (error) {
        setloading(false);
        seterror(true);
      }
    };

    fetchRooms();
  }, []);

  const filterByDate = (dates) => {
    const selectedFromDate = moment(dates[0]).startOf("day");
    const selectedToDate = moment(dates[1]).endOf("day");

    setFromDate(selectedFromDate.format("DD-MM-YYYY"));
    setToDate(selectedToDate.format("DD-MM-YYYY"));

    const tempRooms = duplicateRooms.filter((room) => {
      if (!room.currentbookings || room.currentbookings.length === 0) {
        return true;
      }

      const isAvailable = room.currentbookings.every((booking) => {
        const bookingFrom = moment(booking.fromdate, "DD-MM-YYYY").startOf("day");
        const bookingTo = moment(booking.todate, "DD-MM-YYYY").endOf("day");

        return (
          selectedToDate.isBefore(bookingFrom) ||
          selectedFromDate.isAfter(bookingTo)
        );
      });

      return isAvailable;
    });

    setrooms(tempRooms);
  };

  const filterBySearch = () => {
    const tempRooms = duplicateRooms.filter((room) =>
      room.name.toLowerCase().includes(searchKey.toLowerCase())
    );
    setrooms(tempRooms);
  };

  const filterByType = () => {
    const tempRooms = duplicateRooms.filter((room) => {
      if (selectedValue === "all") {
        return true;
      } else {
        return room.type === selectedValue;
      }
    });
    setrooms(tempRooms);
  };

  return (
    <div className='container p-4'>
      <div className='row d-flex align-items-center justify-content-around border rounded py-2'>
        <div className='col-md-3'>
          <RangePicker format={"DD-MM-YYYY"} onChange={filterByDate} className='p-2' />
        </div>
        <div className='col-md-3'>
          <Form.Control
            type='text'
            className='p-1 my-auto'
            placeholder='Search...'
            onChange={e => setSearchKey(e.target.value)}
            onKeyUp={filterBySearch}
          />
        </div>
        <div className='col-md-3'>
          <Form.Control
            as='select'
            className='p-1 my-auto'
            onChange={e => setSelectedValue(e.target.value)}
            onClick={filterByType}
          >
            <option value={"all"} selected>All</option>
            <option value={"Desk"}>Desk</option>
            <option value={"Office"}>Office</option>
            <option value={"Meeting"}>Meeting</option>
          </Form.Control>
        </div>
      </div>

      <div className='row justify-content-center mt-5'>
        {loading ? (
          <Loader />
        ) : error ? (
          <Error />
        ) : (
          rooms?.map((room) => (
            <div className='col-md-12 mt-2' key={room._id}>
              <Room room={room} fromDate={fromDate} toDate={toDate} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Homescreen;
