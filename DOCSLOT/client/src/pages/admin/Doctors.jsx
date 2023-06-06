import React, { useState, useEffect } from "react";
import Layout from "./../../components/Layout";
import axios from "axios";
import { message, Table } from "antd";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  //getUsers
  const getDoctors = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllDoctors", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
        doctors && console.log(doctors)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlereject= async(record,status)=>{
    const id=record._id
    const user_id=record.userId
    
     console.log(status)
    try{
    const res= await axios.post("/api/v1/admin/deleteDoctor",
    { doctordelId: id ,userremId:user_id,status},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (res.data.success) {
      message.success("removed doctor successfully")
      window.location.reload();
    }
  } catch (error) {
    console.log(error);
  }
  }

  // handle account
  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeAccountStatus",
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };
  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName} {record.lastName}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "email",
      dataIndex: "email",
    },
    {
      title: "specialisation",
      dataIndex: "specialization",
    },
    {
      title: "address",
      dataIndex: "address",
    },
    {
      title: "phone",
      dataIndex: "phone",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <>
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
            <p>&nbsp;</p>
            <button
            className="btn btn-danger"
            onClick={() => handleAccountStatus(record, "rejected")}
            >
            Reject
            </button>
          </>
          ) : (
            (record.status==='approved') ?
            (
            <button 
            className="btn btn-danger" 
            onClick={()=>handlereject(record,"reject")}>Reject
            </button>
            ):(
            <button
             className="btn btn-warning" 
              onClick={()=>handlereject(record,"remove")}> Remove
              </button>
             )
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h1 className="text-center m-3">All Doctors</h1>
      <Table columns={columns} dataSource={doctors} />
    </Layout>
  );
};

export default Doctors;
