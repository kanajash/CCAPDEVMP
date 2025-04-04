import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import Error from '../../components/Error';
import { FaPenToSquare, FaTrash } from 'react-icons/fa6';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      try {
        setLoading(true);
        const res = await axios.get("https://backend-k86c.onrender.com/api/users/");
        setUsers(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setError(true);
      }
    };
    getUsers();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (confirm) {
        await axios.delete(`https://backend-k86c.onrender.com/api/users/${id}`);
        toast.success("User deleted successfully!");
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete user");
    }
  };

  return (
    <Container>
      <ToastContainer />
      <h2 className='my-3'>All Users</h2>

      {loading ? <Loader /> : error ? <Error /> : (
        <Table striped responsive hover className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? <FaCheck className='text-success' /> : <FaTimes className='text-danger' />}</td>
                <td>
                  <Link to={`/admin/users/edit/${user._id}`} className='btn btn-dark mx-2'>
                    <FaPenToSquare />
                  </Link>
                  <Button variant='danger' onClick={() => deleteHandler(user._id)}>
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default AdminUsers;
