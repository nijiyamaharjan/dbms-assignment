import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AdminDashboard from "./AdminDashboard";

const Profile = () => {
  const { id } = useParams(); // Get user ID from the URL parameters
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    isAdmin: "",
  });
  const [error, setError] = useState(null); // To handle any error during fetch
  const [loading, setLoading] = useState(true); // To show loading state

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${id}`);
        const json = await response.json();

        if (response.ok) {
          setUserData(json); // Set fetched user data to state
        } else {
          setError(json.error || "Something went wrong"); // Handle error
        }
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false); // Turn off loading state
      }
    };

    if (id) {
      fetchProfile(); // Fetch profile only if ID is available
    }
  }, [id]); // Add id as a dependency to refetch when the ID changes

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error if there's any
  }

  return (
    <div className="bg-gray-50 min-h-screen">
        <div className="bg-white p-8 rounded-lg max-w-2xl mx-auto mt-10">
        <div className="mb-6 flex justify-between items-center">
          <button className="bg-indigo-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200">
            <Link to='/'>User Registration</Link>
          </button>
          <button className="bg-indigo-600 text-white py-2 px-6 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200">
            <Link to='/login'>User Login</Link>
          </button>
        </div>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">User Profile</h2>
        <div className="space-y-6">
          <p className="text-lg text-gray-700">
            <strong className="font-semibold">First Name:</strong> {userData.firstName}
          </p>
          <p className="text-lg text-gray-700">
            <strong className="font-semibold">Last Name:</strong> {userData.lastName}
          </p>
          <p className="text-lg text-gray-700">
            <strong className="font-semibold">Email:</strong> {userData.email}
          </p>
          <p className="text-lg text-gray-700">
            <strong className="font-semibold">Date of Birth:</strong> {new Date(userData.dob).toISOString().split('T')[0]}
          </p>
          <p className="text-lg text-gray-700">
            <strong className="font-semibold">Admin:</strong> {userData.isAdmin ? "Yes" : "No"}
          </p>
        </div>

        {userData.isAdmin ?  (
          <div className="">
            <AdminDashboard />
          </div>
        ) : ""}
      </div>
    </div>
    
  );
};

export default Profile;
