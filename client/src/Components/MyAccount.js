import React, { useState } from "react";

function MyAccountDashboard() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "9876543210",
    address: "123 Street, City, Country",
    profileImage: "https://via.placeholder.com/150"
  });

  const [editMode, setEditMode] = useState(false);
  const [tempProfile, setTempProfile] = useState({ ...profile });

  const handleChange = (e) => {
    setTempProfile({ ...tempProfile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setProfile(tempProfile);
    setEditMode(false);
  };

  const handleCancel = () => {
    setTempProfile(profile);
    setEditMode(false);
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <div className="text-center">
          <img
            src={profile.profileImage}
            alt="Profile"
            className="rounded-circle border"
            width="150"
            height="150"
          />
        </div>
        <h2 className="text-center mt-3">{profile.name}</h2>
        <p className="text-center text-muted">{profile.email}</p>
        <div className="mt-4">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={editMode ? tempProfile.phone : profile.phone}
            onChange={handleChange}
            disabled={!editMode}
          />
          <label className="form-label mt-3">Address</label>
          <input
            type="text"
            className="form-control"
            name="address"
            value={editMode ? tempProfile.address : profile.address}
            onChange={handleChange}
            disabled={!editMode}
          />
        </div>
        <div className="text-center mt-4">
          {editMode ? (
            <>
              <button className="btn btn-success me-2" onClick={handleSave}>Save</button>
              <button className="btn btn-secondary" onClick={handleCancel}>Cancel</button>
            </>
          ) : (
            <button className="btn btn-primary" onClick={() => setEditMode(true)}>Edit Profile</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyAccountDashboard;