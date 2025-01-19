import React, { useState } from "react";
import { addPackages } from "../Actions/Actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddPackages() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [requirement, setRequirement] = useState("");
    const [packages, setPackages] = useState({
        type: "",
        detailsOfPackage: []
    });

    const handleSetType = (value) => {
        setRequirement(value);
        if (value.length >= 3) {
            setPackages((prev) => ({ ...prev, type: value }));
        }
    };

    const handleAddPackage = () => {
        setPackages((prev) => ({
            ...prev,
            detailsOfPackage: [
                ...prev.detailsOfPackage,
                {
                    type: "",
                    details: [{ description: "", price: "" }]
                }
            ]
        }));
    };

    const handleAddSubDetail = (packageIndex) => {
        setPackages((prev) => {
            const updatedPackages = [...prev.detailsOfPackage];
            updatedPackages[packageIndex].details.push({
                description: "",
                price: ""
            });
            return { ...prev, detailsOfPackage: updatedPackages };
        });
    };

    const handlePackageTypeChange = (index, value) => {
        setPackages((prev) => {
            const updatedPackages = [...prev.detailsOfPackage];
            updatedPackages[index].type = value;
            return { ...prev, detailsOfPackage: updatedPackages };
        });
    };

    const handleSubDetailChange = (packageIndex, subIndex, field, value) => {
        setPackages((prev) => {
            const updatedPackages = [...prev.detailsOfPackage];
            updatedPackages[packageIndex].details[subIndex][field] = value;
            return { ...prev, detailsOfPackage: updatedPackages };
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate form fields
        if (!requirement || packages.detailsOfPackage.length === 0) {
            alert("Please fill in all required fields!");
            return;
        }

        try {
            // Dispatch the action with the `packages` data
            await dispatch(addPackages(packages));
            alert("Package added successfully!");
            // Reset the form after submission
            setRequirement("");
            setPackages({
                type: "",
                detailsOfPackage: []
            });
            // Navigate to the desired route (e.g., home or package list)
            setTimeout(() => {
                navigate("/");
            }, 2000);
        } catch (error) {
            console.error("Error adding package:", error);
        }
    };

    return (
        <div className="container mt-5">
            {/* Requirement Input */}
            <div className="mb-4">
                <label className="form-label">Requirement:</label>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Requirement"
                    value={requirement}
                    onChange={(e) => handleSetType(e.target.value)}
                />
            </div>

            {/* Packages Section */}
            {requirement.length >= 3 && (
                <div className="packageDetails">
                    {packages.detailsOfPackage.map((pkg, pkgIndex) => (
                        <div key={pkgIndex} className="card mb-4">
                            <div className="card-body">
                                {/* Package Type */}
                                <div className="mb-3">
                                    <label className="form-label">Package Type:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter Package Type (e.g., Silver, Gold)"
                                        value={pkg.type}
                                        onChange={(e) =>
                                            handlePackageTypeChange(pkgIndex, e.target.value)
                                        }
                                    />
                                </div>

                                {/* Package Sub-Details */}
                                <div className="packageSubDetails">
                                    {pkg.details.map((detail, detailIndex) => (
                                        <div
                                            key={detailIndex}
                                            className="border p-3 mb-3 rounded"
                                        >
                                            <div className="mb-3">
                                                <label className="form-label">
                                                    Package Description:
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter Package Description"
                                                    value={detail.description}
                                                    onChange={(e) =>
                                                        handleSubDetailChange(
                                                            pkgIndex,
                                                            detailIndex,
                                                            "description",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div>
                                                <label className="form-label">Package Price:</label>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Enter Package Price"
                                                    value={detail.price}
                                                    onChange={(e) =>
                                                        handleSubDetailChange(
                                                            pkgIndex,
                                                            detailIndex,
                                                            "price",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    ))}

                                    {/* Add More Sub-Details */}
                                    <div className="text-end">
                                        <button
                                            className="btn btn-outline-primary btn-sm"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                handleAddSubDetail(pkgIndex);
                                            }}
                                        >
                                            + Add Description
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add More Packages */}
                    <div className="text-center">
                        <button
                            className="btn btn-primary"
                            onClick={(e) => {
                                e.preventDefault();
                                handleAddPackage();
                            }}
                        >
                            + Add Package
                        </button>
                    </div>
                </div>
            )}

            {/* Submit Button */}
            <div className="text-center mt-4">
                <button
                    type="submit"
                    className="btn btn-success w-100"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
            </div>
        </div>
    );
}

export default AddPackages;