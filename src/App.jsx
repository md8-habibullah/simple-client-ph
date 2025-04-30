import { useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]); // State to store the list of users

  // Function to handle adding a new user
  const handleAddUser = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    const form = event.target;
    const name = form.name.value; // Get the name input value
    const email = form.email.value; // Get the email input value
    const user = { name, email }; // Create a user object
    console.log(user);

    try {
      const response = await fetch('http://localhost:7000/user', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(user), // Send user data as JSON
      });
      const data = await response.json();
      console.log(data);

      if (data.acknowledged) {
        alert('User added successfully');
        // Add the new user to the state and reset the form
        setUsers((prevUsers) => [{ ...user, _id: data.insertedId }, ...prevUsers]);
        form.reset();
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to add user');
    }
  };

  // Function to fetch and display all users
  const handleShowAllUsers = async () => {
    try {
      const response = await fetch('http://localhost:7000/users');
      const data = await response.json();
      console.log(data);
      setUsers(data.reverse()); // Reverse the order to show the latest users first
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to fetch users');
    }
  };

  // Function to delete a user by ID
  const handleDeleteUser = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return; // Exit if the user cancels the confirmation

    try {
      const response = await fetch(`http://localhost:7000/user/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      console.log(data);

      if (data.deletedCount > 0) {
        alert('User deleted successfully');
        // Remove the deleted user from the state
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to delete user');
    }
  };

  return (
    <>
      <h1
        style={{
          textAlign: 'center',
          color: '#2E8B57',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        Simple Client
      </h1>

      {/* Form to add a new user */}
      <form
        onSubmit={handleAddUser}
        style={{
          maxWidth: '400px',
          margin: '0 auto',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#F0FFF0',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <label
          htmlFor="name"
          style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
        >
          Name:
        </label>
        <input
          type="text"
          name="name"
          id="name"
          required // Ensure the input is required
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxSizing: 'border-box',
          }}
        />
        <br />
        <label
          htmlFor="email"
          style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}
        >
          Email:
        </label>
        <input
          type="email"
          name="email"
          id="email"
          required // Ensure the input is required
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ccc',
            borderRadius: '5px',
            boxSizing: 'border-box',
          }}
        />
        <br />
        <input
          type="submit"
          value="Add User"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#2E8B57',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        />
      </form>

      {/* Section to display the user list */}
      <div
        style={{
          maxWidth: '600px',
          margin: '20px auto',
          padding: '20px',
          border: '1px solid #ccc',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#F0FFF0',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <h2 style={{ textAlign: 'center', color: '#2E8B57' }}>User List</h2>
        <button
          onClick={handleShowAllUsers}
          style={{
            display: 'block',
            margin: '0 auto 20px',
            padding: '10px 20px',
            backgroundColor: '#006400',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          Show All Users
        </button>
        <p style={{ textAlign: 'center', fontWeight: 'bold', color: '#555' }}></p>
          Total Users: {users.length}
        <ul>
          <ul style={{ listStyleType: 'none', padding: 0 }}></ul>
          {users.map((user) => (
            <li
              key={user._id}
              style={{
                padding: '10px',
                borderBottom: '1px solid #ccc',
                marginBottom: '10px',
              }}
            >
              <strong>Name:</strong> {user.name} <br />
              <strong>Email:</strong> {user.email} <br />
              <strong>ID:</strong> {user._id} <br />
              <button
                onClick={() => handleDeleteUser(user._id)}
                style={{
                  marginTop: '10px',
                  padding: '5px 10px',
                  backgroundColor: '#FF6347', // Tomato red
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
