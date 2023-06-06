import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { message, TimePicker,DatePicker } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import moment from 'moment'

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState();
  
  const dispatch = useDispatch();
  // login user data
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/doctor/getDoctorById",
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleBooking = async () => {

    try {
      
      if(time<doctors.timings[0] || time>doctors.timings[1])
      {
        return alert("Please book within the timings")
      }

      if (!date && !time) {
        return alert("Date & Time Required");
      }
      console.log(time);
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo:doctors,
          userInfo: user,
          doctorName:doctors?.firstName + doctors?.lastName,
          userName: user.name,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Your Appointment request is sent");
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };


  function disabledDate(current) {
    return current && current < moment().endOf('day');
  }

  useEffect(() => {
    getUserData();
    //eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h2 className="text-center">Booking Details:</h2>
      <Link to="#"  className="text-center" style={{textDecoration:"none"}}>
        <h5>*Note:- Please visit to the doctor during the mention timings only</h5></Link>
      <br/>
      <div className="container m-2">
        {doctors && (
          <div>
            <h4>
             Doctor Name: Dr.{doctors.firstName} {doctors.lastName}
            </h4>
            <h4>Fees : {doctors.feesPerCunsaltation}</h4>
            <h4>
              Timings : {doctors.timings && doctors.timings[0]} -{" "}
              {doctors.timings && doctors.timings[1]}{" "}
            </h4>
            <div className="d-flex flex-column w-50">
             

              <DatePicker format="DD-MM-YYYY" 
                disabledDate={disabledDate}
               aria-required={"true"}
               className="mt-3"
               onChange={
                (value)=>setDate(value?.format("DD-MM-YYYY")
                )}/>

              
              <TimePicker
                aria-required={"true"}
                minuteStep={15}
                // disabledHours={ () => arr }
                className="mt-3"
                format={"HH:mm A"}
                onChange={(value) => {
                  setTime(value?.format("HH:mm A"));
                }}
              />

              <button className="btn btn-success mt-2" onClick={handleBooking}>
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
