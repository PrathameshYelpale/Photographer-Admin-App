import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchOrders } from '../Actions/Actions'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function Dashboard() {
    const Orders = useSelector(state => state.reducer.Orders);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchOrders());
    }, [dispatch])
    console.log(Orders);
    return (
        <>
            <div>
                <Typography
                    variant='h4'
                    component='div'
                    align='center'
                    mx={1} pt={3}
                >
                    Welcome to Order Record Dashboard
                </Typography>
                <br/>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Client</b></TableCell>
                                <TableCell><b>Date of Order</b></TableCell>
                                <TableCell><b>Status</b></TableCell>
                                <TableCell><b>Update Status</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                Orders && Orders.map((order) => (
                                    <TableRow key={order.id}>
                                        <TableCell>{order.clientName}</TableCell>
                                        <TableCell>{order.orderDate}</TableCell>
                                        <TableCell>{order.status}</TableCell>
                                        <TableCell><EditIcon /></TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}

export default Dashboard