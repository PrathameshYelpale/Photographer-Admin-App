import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../Actions/Actions';
import { Button, Table } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
    const Orders = useSelector(state => state.reducer.Orders);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch]);

    const uniqueStatuses = [...new Set(Orders.map(order => order.status))];

    const filteredOrders = Orders.filter(order => {
        const searchTermLowerCase = searchTerm.toString().toLowerCase();
        const fieldsToSearch = ['clientName', 'orderDate'];
        const combinedText = fieldsToSearch.map(field => order[field]).join(' ').toString().toLowerCase();
        const isSearchTermMatch = combinedText.includes(searchTermLowerCase);
        const isStatusMatch = selectedStatus ? order.status === selectedStatus : true;
        return isSearchTermMatch && isStatusMatch;
    });

    console.log('Filtered orders:', filteredOrders);

    if (!Array.isArray(Orders)) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mt-5">
            {/* Heading */}
            <h4 className="text-center mb-4">
                Welcome to Order Record Dashboard
            </h4>

            <div className="row mb-3 d-flex justify-content-between">
                <div className="col-md-3">
                    <label htmlFor="searchField" className="form-label">Search by Name or Date</label>
                    <input
                        type="text"
                        name="searchField"
                        id="searchField"
                        placeholder="Enter Name or Date"
                        className="form-control"
                        value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="col-md-3">
                    <label htmlFor="status" className="form-label">Sort by status</label>
                    <select
                        name="sortByStatus"
                        className="form-select"
                        value={selectedStatus}
                        onChange={e => setSelectedStatus(e.target.value)}
                    >
                        <option value="">All Orders</option>
                        {uniqueStatuses.map((status, index) => (
                            <option key={index} value={status}>
                                {status}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

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
                        {filteredOrders && filteredOrders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.clientName}</td>
                                <td>{order.orderDate}</td>
                                <td>{order.status}</td>
                                <td>
                                    <Button variant="outline-primary"
                                    >
                                        <Link to={`/updateClientStatus/${order._id}`}>
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