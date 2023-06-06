import React, { useEffect, useState } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { Table,message } from "antd";
const Users = () => {
  const [users, setUsers] = useState([]);

  //getUsers
  const getUsers = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleblock=async(e)=>{
      const id=e.target.value
      try{
      const res= await axios.post("/api/v1/user/deleteuser",
      { userdelId: id },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        
         message.success("user removed successfully")
         window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  // antD table col
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Doctor",
      dataIndex: "isDoctor",
      render: (text, record) => <span>{record.isDoctor ? "Yes" : "No"}</span>,
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          <button className="btn btn-danger" value={record._id} onClick={handleblock}>Remove</button>
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-2">Users List</h1>
      <Table columns={columns} dataSource={users}  />
    </Layout>
  );
};

export default Users;
