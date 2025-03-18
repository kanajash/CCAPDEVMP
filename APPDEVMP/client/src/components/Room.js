import React, { useState } from 'react';
import { Modal, Button, Carousel } from "react-bootstrap";
import {Link} from "react-router-dom"

function Room({ room,fromDate,toDate }) {

    // States for Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div className='room-box'>
            <div className='row bs'>
                <div className='col-md-4'>

                    <img src={room.imageurls[0]} className='smallimg' alt='thumbnail' />

                </div>
                <div className='col-md-7 text-left'>
                    <h1>{room.name}</h1>
                    
                        <p>Max Count: {room.maxcount}</p>
                        <p>Phone Number: {room.phonenumber}</p>
                        <p>Type: {room.type}</p>
                    
                    <div style={{ float: "right" }}>

                         {(fromDate && toDate) &&   <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
                        <button className='btn btn-dark m-2 '>Book Now</button>
                        </Link>}
                        
                        {/* Path Defined for Room and Dates */}
                      
                        <button className='btn btn-dark ' onClick={handleShow}>View Details</button>
                    </div>
                </div>




                <Modal show={show} onHide={handleClose} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>{room.name}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Carousel>
                            {
                                room.imageurls.map(url => {


                                    return <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src={url}
                                            style={{borderRadius:"5px",height:"400px"}}
                                            alt='url'
                                        />
                                    </Carousel.Item>

                                })
                            }


                        </Carousel>



                        <p>{room.description}</p>







                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>



            </div>
        </div>
    )
}

export default Room