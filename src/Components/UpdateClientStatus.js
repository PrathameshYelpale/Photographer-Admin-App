import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { fetchOrdersById, updateOrderStatus } from '../Actions/Actions';

function UpdateClientStatus(props) {  // Accept props here
    const location = useLocation();
    const navigate = useNavigate(); // useNavigate hook for navigation
    const dispatch = useDispatch(); // useDispatch hook for Redux dispatch

    const orders = useSelector((state) => state.reducer.Orders);
    console.log(orders);

    const [ordersData, setOrdersData] = useState({
        clientName: orders.clientName, // Assuming you meant 'clientName' instead of 'className'
        status: orders.status
    });

    let params = useParams();
    useEffect(() => {
        const orderId = params.id;
        console.log(orderId);

        setTimeout(() => {
            dispatch(fetchOrdersById(orderId));
        }, []);
    }, [dispatch, params.id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrdersData({ ...ordersData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (orders.clientName !== '' || orders.status !== '') {
            alert("Updated successfully!");
            setTimeout(() => {
                // Use props.updateDataValue instead of directly calling updateDataValue
                props.updateDataValue(orders);  // This will now work properly

                navigate(-1); // Navigate back to the previous page
            }, 1000);
        }
    };

    return (
        <div className="container mt-5">
            {/* Heading */}
            <h4 className="text-center mb-4">Update Status for {orders.clientName}</h4>

            {/* Form */}
            <Form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <Form.Label htmlFor="clientName">Client Name</Form.Label>
                    <Form.Control
                        type="text"
                        id="clientName"
                        value={orders.clientName}
                        readOnly
                    />
                </div>

                <div className="mb-3">
                    <Form.Label htmlFor="status">Current Status</Form.Label>
                    <Form.Select
                        id="status"
                        value={orders.status}
                        onChange={handleChange}
                    >
                        <option value="Order Booked">Order Booked</option>
                        <option value="Shoot Done">Shoot Done</option>
                        <option value="Photos Selection Pending">Photos Selection Pending</option>
                        <option value="Photos Selection Done">Photos Selection Done</option>
                        <option value="Design in Progress">Design in Progress</option>
                        <option value="Design Done">Design Done</option>
                        <option value="Printing Done">Printing Done</option>
                        <option value="Album Delivered">Album Delivered</option>
                    </Form.Select>
                </div>

                <Button variant="primary" type="submit" className="w-100">
                    Update Status
                </Button>
            </Form>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    updateDataValue: (orders) => dispatch(updateOrderStatus(orders)), // Mapping dispatch to props
});

export default connect(null, mapDispatchToProps)(UpdateClientStatus); // Connect the component to Redux
