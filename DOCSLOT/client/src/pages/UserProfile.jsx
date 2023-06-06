import React from "react";
import Layout from "../components/Layout";
import axios from "axios";
import { useParams} from "react-router-dom";
import { Col, Form, Input, Row, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";

function UserProfile() {

    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const params = useParams();

    const handleuserchange= async(values)=>{
         if(values.password===undefined)
              values.password='nulls'
       
        try {
            dispatch(showLoading());
            const res = await axios.post(
              "/api/v1/user/user-profile",
              {
                userId: params.userId,
                name:values.name,
                email:values.email,
                password:values.password,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            dispatch(hideLoading());
            if (res.data.success) {
              message.success("Profile Updated Successfully");
              window.location.reload();
            } else {
              message.error(res.data.success);
            }
          } catch (error) {
            dispatch(hideLoading());
            console.log(error);
            message.error("Somthing Went Wrrong ");
          }

    }
    
  return (
   <>
      {user &&<Layout>
      <h1 className="text-center">Manage  Your Profile</h1>
        <Form
          layout="vertical"
          className="m-3"
          onFinish={handleuserchange}
          initialValues={user}
        >
          <h4 className="">Update Your Details : </h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Name"
                name="name"
              >
                <Input type="text" placeholder="yourname"/>
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
              >
                <Input type="text" placeholder="youremail"/>
              </Form.Item>
            </Col>
            
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Password"
                name="password"
              >
                <Input type="text" placeholder="Enter your new password" />
              </Form.Item>
            </Col>
          </Row>
          <button className="btn btn-primary form-btn" type="submit" >
                Update
         </button>
        </Form>
    </Layout>}
   
   
   </>
  )
}

export default UserProfile