import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../Actions/Actions';
import { Button, Table } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa'; // Using react-icons for the Edit icon
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
    const Orders = useSelector(state => state.reducer.Orders);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // useNavigate hook for programmatic navigation

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    // const handleEditClick = (order) => {
    //     // Navigate to /updateClientStatus and pass data as state
    //     navigate('/updateClientStatus', { state: { clientName: order.clientName, currentStatus: order.status } });
    // };

    if (!Array.isArray(Orders)) {
        return <div>Loading...</div>; // Or return an appropriate fallback UI
    }

    const handleEditClick = (order) => {
        navigate('/updateClientStatus', {
            state: {
                clientName: order.clientName,
                currentStatus: order.status,
                orderId: order.id
            }
        });
    };
    

    return (
        <div className="container mt-5">
            {/* Heading */}
            <h4 className="text-center mb-4">
                Welcome to Order Record Dashboard
            </h4>

            {/* Table */}
            <div className="table-responsive">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Client</th>
                            <th>Date of Order</th>
                            <th>Status</th>
                            <th>Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Orders && Orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.clientName}</td>
                                <td>{order.orderDate}</td>
                                <td>{order.status}</td>
                                <td>
                                    <Button variant="outline-primary" 
                                    // onClick={() => handleEditClick(order)}
                                    >
                                        <Link to={`/updateClientStatus/${order.id}`}>
                                        <FaEdit />
                                        </Link>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Dashboard;