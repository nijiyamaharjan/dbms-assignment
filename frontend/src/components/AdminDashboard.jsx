import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]); 
  const [error, setError] = useState(null); // To handle any error during fetch
  const [loading, setLoading] = useState(true); // To show loading state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/`);
        const json = await response.json();

        if (response.ok) {
          setUsers(json); // Set fetched user data to state
        } else {
          setError(json.error || "Something went wrong"); // Handle error
        }
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false); // Turn off loading state
      }
    };

      fetchUsers(); // Fetch profile only if ID is available
  }, []); // Add id as a dependency to refetch when the ID changes

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error if there's any
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mt-10">
    <h2 className="text-3xl font-semibold text-gray-700 mb-6">Admin Dashboard</h2>
    <h3 className="text-2xl font-medium text-gray-600 mb-4">Users List</h3>

    {users.length > 0 ? (
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 text-left font-medium text-gray-600 border-b">First Name</th>
            <th className="py-2 px-4 text-left font-medium text-gray-600 border-b">Last Name</th>
            <th className="py-2 px-4 text-left font-medium text-gray-600 border-b">Email</th>
            <th className="py-2 px-4 text-left font-medium text-gray-600 border-b">Date of Birth</th>
            <th className="py-2 px-4 text-left font-medium text-gray-600 border-b">Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userID} className="border-b hover:bg-gray-50">
              <td className="py-2 px-4 text-gray-700">{user.firstName}</td>
              <td className="py-2 px-4 text-gray-700">{user.lastName}</td>
              <td className="py-2 px-4 text-gray-700">{user.email}</td>
              <td className="py-2 px-4 text-gray-700">{new Date(user.dob).toISOString().split('T')[0]}</td>
              <td className="py-2 px-4 text-gray-700">{user.isAdmin ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p className="text-lg text-gray-600">No users found.</p>
    )}
  </div>
  );
};

export default AdminDashboard;
