import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Col, Container, ListGroup, Row } from 'react-bootstrap';
import Loader from '../../components/Loader';
import Error from '../../components/Error';

function AdminBookingDetails() {
    const [booking, setBooking] = useState({}); // 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        const getBooking = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`http://localhost:5000/api/bookings/${id}`);
                console.log("Fetched Booking Data:", res.data); // Debugging log
                setBooking(res.data); // Ensure it's an object
                setLoading(false);
            } catch (error) {
                console.error("Error fetching booking:", error);
                setLoading(false);
                setError(true);
            }
        };
        getBooking();
    }, [id]);

    return (
        <Container>
            {loading ? (
                <Loader />
            ) : error ? (
                <Error />
            ) : (
                <Row className="my-3">
                    {/* Left Column - Booking Details */}
                    <Col xs={12} md={8}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item className="py-3">
                                    <strong>Booking ID:</strong> {booking?._id || 'N/A'}
                                </ListGroup.Item>
                                <ListGroup.Item className="py-3">
                                    <strong>Booking Date:</strong> {booking?.createdAt ? new Date(booking.createdAt).toLocaleString() : 'N/A'}
                                </ListGroup.Item>
                                <ListGroup.Item className="py-3">
                                    <strong>Room ID:</strong> {booking?.roomid || 'N/A'}
                                </ListGroup.Item>
                                <ListGroup.Item className="py-3">
                                    <strong>Room:</strong> {booking?.room || 'N/A'}
                                </ListGroup.Item>
                                <ListGroup.Item className="py-3">
                                    <strong>From Date:</strong> {booking?.fromdate || 'N/A'}
                                </ListGroup.Item>
                                <ListGroup.Item className="py-3">
                                    <strong>To Date:</strong> {booking?.todate || 'N/A'}
                                </ListGroup.Item>
                                <ListGroup.Item className="py-3">
                                    <strong>Total Days:</strong> {booking?.totaldays || 'N/A'}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>

                    {/* Right Column - Payment Details */}
                    <Col xs={12} md={4}>
                        <Card>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <strong>Status:</strong> {booking?.status?.toUpperCase() || 'N/A'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Transaction ID:</strong> {booking?.transactionid || 'N/A'}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Total Amount:</strong> PHP {booking?.totalamount || '0'}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </Container>
    );
}

export default AdminBookingDetails;
