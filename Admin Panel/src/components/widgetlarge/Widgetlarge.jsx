import React, { useState } from "react";
import "./widgetlarge.css";
import {
  useGetApprovalUsersQuery,
  useUserUpdateMutation,
} from "../../redux/api";
import useToast from "../ui/Toast";
import CircularProgress from "@mui/material/CircularProgress";
import moment from "moment";

export default function Widgetlarge() {
  const { showSnackbar, SnackbarComponent } = useToast();
  const [selectedId, setSelectedId] = useState("");
  const [status, setStatus] = useState("");

  const { data, isLoading } = useGetApprovalUsersQuery();
  const [update, { isLoading: updateLoading }] = useUserUpdateMutation();

  function handleApprove(id) {
    update({ id, data: { is_approved: true } })
      .then((res) => {
        if (res.error) {
          showSnackbar(res.error.data.error, "error");
        } else if (res.data.message) {
          showSnackbar("User Approved", "success");
        }
      })
      .catch((err) => showSnackbar(err.message, "error"));
  }

  function handleReject(id) {
    update({ id, data: { is_rejected: true } })
      .then((res) => {
        if (res.error) {
          showSnackbar(res.error.data.error, "error");
        } else if (res.data.message) {
          showSnackbar("User Rejected", "success");
        }
      })
      .catch((err) => showSnackbar(err.message, "error"));
  }
  return (
    <div className="Widgetlarge">
      {SnackbarComponent}
      <h3 className="Widgetlargetitle">Waiting For Approvels</h3>
      {data && data?.length > 0 ? (
        <table className="Widgetlargetable">
          <tr className="Widgetlargetr">
            <th className="Widgetlargeth">ID</th>
            <th className="Widgetlargeth">Name</th>
            <th className="Widgetlargeth">Email</th>
            <th className="Widgetlargeth">Role</th>
            <th className="Widgetlargeth">Address</th>
            <th className="Widgetlargeth">Time</th>
            <th className="Widgetlargeth">Action</th>
          </tr>
          <tbody>
            {data?.map((user) => (
              <tr key={user._id} className="widgetLargeTr">
                <td className="widgetLargeUniqueID">
                  {user?._id.slice(0, 16)}
                </td>
                <td className="WidgetLargeUser">
                  <img
                    src={user?.image}
                    alt="avatar"
                    className="WidgetLargeimage"
                    style={{ marginRight: 10 }}
                  />
                  <span className="widgetLargeName" style={{ width: 70 }}>
                    {user?.name}
                  </span>
                </td>
                <td className="widgetLargeUsertype">{user.email}</td>
                <td
                  className="widgetLargeUsertype"
                  style={{ textTransform: "capitalize" }}
                >
                  {user.role}
                </td>
                <td className="widgetLargeUsertype">{user.address}</td>
                <td className="widgetLargeUsertype">
                  {moment(user.createdAt).fromNow()}
                </td>
                <td className="widgetLargegStatus">
                  <div style={{ display: "flex", gap: 10 }}>
                    <button
                      className={"widgetLargeButton " + "Online"}
                      style={{ width: 80, cursor: "pointer" }}
                      onClick={() => {
                        setSelectedId(user._id);
                        handleApprove(user._id);
                        setStatus("approve");
                      }}
                    >
                      {updateLoading &&
                      user._id === selectedId &&
                      status === "approve" ? (
                        <CircularProgress size={20} />
                      ) : (
                        "Approve"
                      )}
                    </button>

                    <button
                      className={"widgetLargeButton"}
                      style={{
                        backgroundColor: "#fecdd3",
                        width: 80,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedId(user._id);
                        handleReject(user._id);
                        setStatus("reject");
                      }}
                    >
                      {updateLoading &&
                      user._id === selectedId &&
                      status === "reject" ? (
                        <CircularProgress size={20} />
                      ) : (
                        "Reject"
                      )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ textAlign: "center", marginTop: 10 }}>
          <p style={{ fontSize: 20 }}>Empty</p>
        </div>
      )}
    </div>
  );
}
