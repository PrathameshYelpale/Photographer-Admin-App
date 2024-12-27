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
    }, [dispatch]);

    useEffect(() => {
        if (Packages.length > 0) {
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
                        setSelectedPrice('');
                    }
                }
            }
        }
    }, [Packages, selectedPackageType, selectedPackageDetails, selectedDescription]);

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
                        return matchingDescription.description;
                    }
                }
            }
        }
        return '';
    }

    useEffect(() => {
        getSelectedDescription();
    }, [selectedDescription]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Get the orderDate from the form input (it will be in YYYY-MM-DD format)
        const orderDate = event.target.orderDate.value;

        // Format the date to "DD MMMM YYYY"
        const formattedDate = formatDate(orderDate);

        // Prepare the client data to be sent
        const clientData = {
            clientName: event.target.clientName.value,
            address: event.target.address.value,
            mobileNo: event.target.mobileNo.value,
            email: event.target.email.value,
            orderDate: formattedDate, // Pass the formatted date here
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
            alert('Client added successfully');
        } catch (error) {
            console.error('Error adding client:', error);
        }
    }

    // Function to format the date in "DD MMMM YYYY" format
    const formatDate = (date) => {
        const d = new Date(date); // Create a Date object from the input date
        const day = d.getDate();
        const month = d.toLocaleString('default', { month: 'long' }); // Get the full month name
        const year = d.getFullYear();

        // Return the formatted date in "DD MMMM YYYY" format
        return `${day} ${month} ${year}`;
    }

    return (
        <div className="container mt-4">
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="clientName" className="form-label">Client Name:</label>
                        <input
                            type="text"
                            name="clientName"
                            id="clientName"
                            placeholder="Enter Name"
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="address" className="form-label">Address:</label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Enter address"
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="mobileNo" className="form-label">Mobile No:</label>
                        <input
                            type="number"
                            name="mobileNo"
                            id="mobileNo"
                            placeholder="Enter Mobile Number"
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label">Email ID:</label>
                        <input
                            type="text"
                            name="email"
                            placeholder="Enter emailId"
                            className="form-control"
                        />
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="orderDate" className="form-label">Order Date:</label>
                        <input
                            type="date"
                            name="orderDate"
                            className="form-control"
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="orderType" className="form-label">Requirement:</label>
                        <select
                            name="orderType"
                            value={selectedPackageType}
                            onChange={handlePackageTypeChange}
                            className="form-select"
                        >
                            <option value="" disabled>Select Requirement</option>
                            {Packages &&
                                Packages.map((p, index) => (
                                    <option key={index} value={p.type}>
                                        {p.type}
                                    </option>
                                ))}
                        </select>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="orderPackage" className="form-label">Package Name:</label>
                        <select
                            name="orderPackage"
                            value={selectedPackageDetails}
                            onChange={handlePackageDetailsChange}
                            className="form-select"
                        >
                            <option value="" disabled>Select an option</option>
                            {packageDetailsOptions.map((option, index) => (
                                <option key={index} value={option.type}>
                                    {option.type}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="orderDescription" className="form-label">Select Description:</label>
                        <select
                            name="orderDescription"
                            value={selectedDescription}
                            onChange={(e) => setSelectedDescription(e.target.value)}
                            className="form-select"
                        >
                            <option value="" disabled>Select an option</option>
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
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="price" className="form-label">Price:</label>
                        <input
                            type="text"
                            name="price"
                            value={selectedPrice}
                            onChange={handlePriceChange}
                            className="form-control"
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="status" className="form-label">Status:</label>
                        <select name="status" className="form-select">
                            <option value="">Select Status</option>
                            <option value="Order Booked">Order Booked</option>
                            <option value="Shoot Done">Shoot Done</option>
                            <option value="Photos Selection Pending">Photos Selection Pending</option>
                            <option value="Photos Selection Done">Photos Selection Done</option>
                            <option value="Design in Progress">Design in Progress</option>
                            <option value="Design Done">Design Done</option>
                            <option value="Printing Done">Printing Done</option>
                            <option value="Album Delivered">Album Delivered</option>
                        </select>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="remarks" className="form-label">Additional Remarks:</label>
                        <textarea
                            name="remarks"
                            placeholder="Enter Remarks"
                            className="form-control"
                        ></textarea>
                    </div>

                    <div className="col-md-6 d-flex align-items-end">
                        <button type="submit" className="btn btn-primary w-100">Submit</button>
                    </div>
                </div>


            </form>

            <div className="mt-4">
                <div className="d-flex align-items-center">
                    <h4 className="mb-0 me-3">Selected Package Details:</h4>
                    <b>{getSelectedDescription()}</b>
                </div>
                <div className="d-flex align-items-center mt-2">
                    <h4 className="mb-0 me-3">Price:</h4>
                    <b>{selectedPrice}</b>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    Packages: state.reducer.Packages,
    loading: state.reducer.loading,
    error: state.reducer.error,
});

const mapDispatchtoProps = {
    fetchPackages
};

export default connect(mapStateToProps, mapDispatchtoProps)(AddClient);