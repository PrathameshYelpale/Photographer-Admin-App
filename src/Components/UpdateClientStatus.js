import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import { Button, Form } from 'react-bootstrap';
import { fetchOrdersById, updateOrderStatus } from '../Actions/Actions';

function UpdateClientStatus() {
    const navigate = useNavigate();
    const orders = useSelector((state) => state.reducer.Orders);
    console.log('All orders :', orders);

    const [ordersData, setOrdersData] = useState({
        clientName: '',
        status: ''
    });

    const { id } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        if (id) {
            dispatch(fetchOrdersById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (orders && orders.clientName) {
            setOrdersData({
                clientName: orders.clientName,
                status: orders.status
            });
        }
    }, [orders]); // This effect runs when the orders are fetched and updated in the Redux store

    const handleChange = (e) => {
        const { name, value } = e.target;
        setOrdersData({
            ...ordersData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (id && ordersData.status) {
            const updatedOrderData = {
                ...orders,
                status: ordersData.status
            };

            console.log('Updating order with ID:', id, 'New data:', updatedOrderData);

            dispatch(updateOrderStatus(id, updatedOrderData));
            alert('Data updated successfully');
            setTimeout(() => {
                navigate('/');
            }, 1000);
        } else {
            console.error('Missing ID or status');
        }
    };

    return (
        <>
            <div className="container mt-5">
                <h4 className="text-center mb-4">Update Status for {ordersData.clientName}</h4>

                <Form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <Form.Label htmlFor="clientName">Client Name</Form.Label>
                        <Form.Control
                            type="text"
                            id="clientName"
                            name="clientName"
                            value={ordersData.clientName}
                            readOnly
                        />
                    </div>

                    <div className="mb-3">
                        <Form.Label htmlFor="status">Current Status</Form.Label>
                        <Form.Select
                            id="status"
                            name="status"
                            value={ordersData.status}
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
        </>
    );
}

export default UpdateClientStatus;

// const mapDispatchToProps = (dispatch) => ({
//     updateDataValue: (orders) => dispatch(updateOrderStatus(orders)), // Dispatch the action to update the order
// });

// export default connect(null, mapDispatchToProps)(UpdateClientStatus);
