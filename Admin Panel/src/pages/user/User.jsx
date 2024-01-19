import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PhoneAndroid,
} from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import "./user.css";
import moment from "moment";
import { useState } from "react";
import { useUserUpdateMutation } from "../../redux/api";
import useToast from "../../components/ui/Toast";
import { CircularProgress } from "@mui/material";

export default function User() {
  const { showSnackbar, SnackbarComponent } = useToast();

  const [updateUser, updateResp] = useUserUpdateMutation();
  const { state } = useLocation();
  const [data, setdata] = useState({
    name: state.data.name,
    email: state.data.email,
    phone: state.data.phone,
    address: state.data.address,
    image: state.data.image,
  });

  function handleUpdate(e) {
    e.preventDefault();
    updateUser({
      id: state.data._id,
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: data.address,
      },
    }).then((res) => {
      if (res?.data?.message) {
        showSnackbar("Account Updated", "success");
      }
    });
  }
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img src={data.image} alt="" className="userShowImg" />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{data.name}</span>
              {/* <span className="userShowUserTitle">Restaurant Manager</span> */}
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            {/* <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">Basha Istanbul</span>
            </div> */}
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">
                Created: {moment(state.data.createdAt).fromNow()}
              </span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{data.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{data.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{data.address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={handleUpdate}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Restaurant Name</label>
                <input
                  type="text"
                  placeholder={data.name}
                  className="userUpdateInput"
                  value={data.name}
                  onChange={(e) =>
                    setdata((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </div>

              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={data.email}
                  className="userUpdateInput"
                  value={data.email}
                  onChange={(e) =>
                    setdata((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  placeholder={data.phone}
                  className="userUpdateInput"
                  value={data.phone}
                  onChange={(e) =>
                    setdata((prev) => ({ ...prev, phone: e.target.value }))
                  }
                />
              </div>
              <div className="userUpdateItem" style={{ marginBottom: 10 }}>
                <label>Address</label>
                <input
                  type="text"
                  placeholder={data.address}
                  className="userUpdateInput"
                  value={data.address}
                  onChange={(e) =>
                    setdata((prev) => ({ ...prev, address: e.target.value }))
                  }
                />
              </div>
              <button type="submit" className="userUpdateButton">
                {updateResp.isLoading ? (
                  <CircularProgress style={{ color: "white" }} size={15} />
                ) : (
                  "Update"
                )}
              </button>
            </div>
            {/* <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="pfaImg"
                  src="https://qzeenhomemade.com/wp-content/uploads/2022/05/Qzeen-PFA-Certificate-2022-2023.jpg"
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} />
              </div>
              <button className="userUpdateButton">Update</button>
            </div> */}
          </form>
        </div>
      </div>
      {SnackbarComponent}
    </div>
  );
}
