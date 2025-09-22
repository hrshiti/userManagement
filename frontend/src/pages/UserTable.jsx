import React, { useEffect, useState } from "react";

const BASE_URL = "http://localhost:5000"; // backend base URL

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Replace with your auth context or token logic
  const isAdmin = true; // show actions only for admin
  const token = localStorage.getItem("token"); // JWT token

  useEffect(() => {
    fetchUsers();
  }, []);

  // ✅ Fetch users from GET /registerdata
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/registerdata`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // required if route protected
        },
      });
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data.msg);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete user via DELETE /deleteUser
// ✅ Delete user
const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;

  try {
    const res = await fetch(`${BASE_URL}/deleteUser/${id}`, { // send id in URL
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // send JWT
      },
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to delete user");

    alert(data.msg); // "User deleted successfully"
    fetchUsers(); // refresh table
  } catch (err) {
    alert(err.message);
  }
};

// ✅ Update user
const handleUpdate = async (id) => {
  const newName = prompt("Enter new name:");
  const newEmail = prompt("Enter new email:");
  if (!newName || !newEmail) return;

  try {
    const res = await fetch(`${BASE_URL}/updateUser/${id}`, { 
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        username: newName,
        email: newEmail,
      }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Failed to update user");

    alert(data.msg); 
    fetchUsers();
  } catch (err) {
    alert(err.message);
  }
};


  if (loading) return <p>Loading users...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="overflow-x-auto mt-8 p-4 w-screen">
      <h2 className="text-2xl font-semibold mb-4 text-center">User Information</h2>

      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Name</th>
            <th className="py-3 px-4 text-left">Email</th>
            <th className="py-3 px-4 text-left">Contact</th>
            <th className="py-3 px-4 text-left">Password</th>
            {isAdmin && <th className="py-3 px-4 text-left">Actions</th>}
          </tr>
        </thead>

        <tbody className="text-black">
          {users.map((user) => (
            <tr
              key={user._id}
              className="border-b border-gray-200 hover:bg-gray-100 transition duration-300"
            >
              <td className="py-3 px-4">{user.username}</td>
              <td className="py-3 px-4">{user.email}</td>
              <td className="py-3 px-4">{user.number}</td>
              <td className="py-3 px-4">{user.password}</td>
              {isAdmin && (
                <td className="py-3 px-4 flex gap-2">
                  <button
                    onClick={() => handleUpdate(user._id)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
