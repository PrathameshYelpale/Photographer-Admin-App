// import { Container, FormControl, MenuItem, Select, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { fetchPackages, addClient } from '../Actions/Actions'

function AddClient() {
    const Packages = useSelector(state => state.reducer.Packages);
    const dispatch = useDispatch();
    const [selectedPackageType, setSelectedPackageType] = useState('')
    const [selectedPackageDetails, setSelectedPackageDetails] = useState("")
    const [packageDetailsOptions, setPackageDetailsOptions] = useState([])
    const [selectedDescription, setSelectedDescription] = useState('');
    const [selectedPrice, setSelectedPrice] = useState('');

    useEffect(() => {
        dispatch(fetchPackages());
    }, [dispatch])

    useEffect(() => {
        if (Packages.length > 0) {
            console.log(Packages);
            const filteredPackage = Packages.find((pack) => pack.type === selectedPackageType);

            if (filteredPackage) {
                setPackageDetailsOptions(filteredPackage.detailsOfPackage);
                const selectedDetails = filteredPackage.detailsOfPackage.find(
                    (details) => details.type === selectedPackageDetails
                );

                if (selectedDetails) {
                    const matchingDescription = selectedDetails.details.find(
                        (detail) => detail.description === selectedDescription
                    );

                    if (matchingDescription) {
                        setSelectedPrice(matchingDescription.price);
                    } else {
                        setSelectedPrice('')
                    }
                }
            }
            console.log('1');
        }
    }, [Packages, selectedPackageType, selectedPackageDetails, selectedDescription])

    const handlePackageTypeChange = (event) => {
        setSelectedPackageType(event.target.value);
        setSelectedPackageDetails('');
        setSelectedDescription('');
        setSelectedPrice('');
    }

    const handlePackageDetailsChange = (event) => {
        setSelectedPackageDetails(event.target.value);
        setSelectedDescription('');
        setSelectedPrice('');
    }

    const handlePriceChange = (event) => {
        setSelectedPrice(event.target.value);
    }

    //This method for displaying the current information of the selected package details
    const getSelectedDescription = () => {
        if (selectedPackageType && selectedPackageDetails && selectedDescription) {
            const filteredPackage = Packages.find(
                (pack) => pack.type === selectedPackageType
            );

            if (filteredPackage) {
                const selectedDetails = filteredPackage.detailsOfPackage.find(
                    (details) => details.type === selectedPackageDetails
                );

                if (selectedDetails) {
                    const matchingDescription = selectedDetails.details.find(
                        (detail) => detail.description === selectedDescription
                    );

                    if (matchingDescription) {
                        return matchingDescription.description; // Return the selected description
                    }
                }
            }
        }

        return ''; // Return an empty string if no description is selected
    }
    //This useEffect for mounting the real time values
    useEffect(() => {
        getSelectedDescription();
    }, [selectedDescription])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const clientData = {
            clientName: event.target.clientName.value,
            address: event.target.address.value,
            mobileNo: event.target.mobileNo.value,
            email: event.target.email.value,
            orderDate: event.target.orderDate.value,
            Package: [{
                orderType: selectedPackageType,
                orderPackage: selectedPackageDetails,
                orderDescription: selectedDescription,
                price: selectedPrice
            }],
            remarks: event.target.remarks.value,
            status: event.target.status.value,
        };
        try {
            await dispatch(addClient(clientData));
            console.log('Client added successfully');
            alert('Client added successfully');
        } catch (error) {
            console.error('Error adding client:', error);
        }
    }

    return (
        <>
            {/* <Container>
            <FormControl>
                <TextField
                    variant='outlined'
                    label='Client Name'
                    type='text'
                    placeholder='Enter Client Name'
                >
                </TextField>

                <TextField
                    autofocus
                    variant='outlined'
                    type='date'
                >
                </TextField>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <TextField>

                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value=''
                    label="Age"
                >
                    {
                        Packages && Packages.map((p) => (
                            <MenuItem >{p.type}</MenuItem>
                        ))
                    }
                </Select>
                </TextField>
                

            </FormControl>
        </Container> */}

            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Client Name:</label>
                        <input type='text' name='clientName' id='clientName' placeholder='Enter Name' />
                    </div>

                    <div>
                        <label>Address:</label>
                        <input type='text' name='address' id='address' placeholder='Enter address' />
                    </div>

                    <div>
                        <label>Mobile No:</label>
                        <input type='number' name='mobileNo' id='mobileNo' placeholder='Enter Mobile Number' />
                    </div>

                    <div>
                        <label>Email ID:</label>
                        <input type='text' name='email' placeholder='Enter emailId' />
                    </div>

                    <div>
                        <label>Order Date:</label>
                        <input type='date' name='orderDate' />
                    </div>

                    <div>
                        <label>Requirement:</label>
                        <select name='orderType' value={selectedPackageType} onChange={handlePackageTypeChange}>
                            <option value='' disabled>Select Requirement</option>
                            {Packages &&
                                Packages.map((p, index) => (
                                    <option key={index} value={p.type}>
                                        {p.type}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div>
                        <label>Package Name:</label>
                        <select
                            name='orderPackage'
                            value={selectedPackageDetails}
                            onChange={handlePackageDetailsChange}
                        >
                            <option value='' disabled>Select a option</option>
                            {packageDetailsOptions.map((option, index) => (
                                <option key={index} value={option.type}>
                                    {option.type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Select Description:</label>
                        <select name='orderDescription' value={selectedDescription} onChange={(e) => setSelectedDescription(e.target.value)}>
                            <option value='' disabled>Select a option</option>
                            {selectedPackageDetails &&
                                Packages.find((pack) => pack.type === selectedPackageType)
                                    ?.detailsOfPackage.find((details) => details.type === selectedPackageDetails)
                                    ?.details.map((detail, index) => (
                                        <option key={index} value={detail.description}>
                                            {detail.description}
                                        </option>
                                    ))}
                        </select>
                    </div>

                    <div>
                        <label>Price:</label>
                        <input type='text' name='price' value={selectedPrice} onChange={handlePriceChange} />
                    </div>

                    <div>
                        <label>Additional Remarks:</label>
                        <textarea name='remarks' placeholder='Enter Remarks'></textarea>
                    </div>

                    <div>
                        <label>Status:</label>
                        <select name='status'>
                            <option value=''>Select Status</option>
                            <option value='Order Booked'>Order Booked</option>
                            <option value='Shoot Done'>Shoot Done</option>
                            <option value='Photos Selection Pending'>Photos Selection Pending</option>
                            <option value='Photos Selection Done'>Photos Selection Done</option>
                            <option value='Design in Progress'>Design in Progress</option>
                            <option value='Design Done'>Design Done</option>
                            <option value='Printing Done'>Printing Done</option>
                            <option value='Album Delivered'>Album Delivered</option>
                        </select>
                    </div>

                    <div>
                        <button type='submit'>Submit</button>
                    </div>

                </form>
                <div>
                    <h2>Selected Package Details:</h2>
                    {/* <ul>{getSelectedPackageDetails()}</ul> */}
                    <ul>{getSelectedDescription()}</ul>
                    <h2>Price:</h2>
                    <ul>{selectedPrice}</ul>
                </div>
            </div>
        </>
    )
}
const mapStateToProps = (state) => ({
    Packages: state.reducer.Packages,
    loading: state.reducer.loading,
    error: state.reducer.error,
});

const mapDispatchtoProps = {
    fetchPackages
};

export default connect(mapStateToProps, mapDispatchtoProps)(AddClient)