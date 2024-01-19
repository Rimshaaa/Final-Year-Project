import React from "react";
import "./supplierList.css";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useToast from "../../components/ui/Toast";
import {
  useDeleteAccountMutation,
  useGetSuppliersQuery,
  useUserUpdateMutation,
} from "../../redux/api";
import CustomModal from "../../components/ui/Modal";
import { CircularProgress, MenuItem, Select } from "@mui/material";
import moment from "moment";

export default function SupplierList() {
  const { showSnackbar, SnackbarComponent } = useToast();

  const { data, isLoading } = useGetSuppliersQuery();
  const [update, { isLoading: updateLoading }] = useUserUpdateMutation();
  const [deleteAccount, { isLoading: deleteLoading }] =
    useDeleteAccountMutation();
  const [openModal, setOpenModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  function confirmDelete() {
    deleteAccount(deleteId);
    setOpenModal(false);
  }

  function handleStatusUpdate(value, id) {
    update({ id, data: { is_active: value } }).then((res) => {
      if (res?.data?.message) {
        showSnackbar("Account Status Updated", "success");
      }
    });
  }

  const navigate = useNavigate();
  function handleEdit(data) {
    navigate("/userDetails", { state: { data } });
  }

  const columns = [
    { field: "_id", headerName: "ID", width: 160 },
    {
      field: "restaurant",
      headerName: "Restaurant",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="flex-center">
            <div
              style={{
                width: "40px",
                height: "40px",
                marginRight: 3,
                overflow: "hidden",
              }}
            >
              <img
                className="RestaurantListImg"
                src={params.row.image}
                alt=""
              />
            </div>

            <p> {params.row.name}</p>
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 120 },
    {
      field: "is_active",
      headerName: updateLoading ? <CircularProgress size={20} /> : "Status",
      width: 110,
      renderCell: (params) => {
        return (
          <Select
            sx={{
              width: 80,
              height: 30,
              fontSize: 10,
              border: "none",
              outline: "none",
            }}
            value={params.row.is_active}
            onChange={(e) => handleStatusUpdate(e.target.value, params.row._id)}
          >
            <MenuItem value={true}>Active</MenuItem>
            <MenuItem value={false}>Disabled</MenuItem>
          </Select>
        );
      },
    },
    {
      field: "phone",
      headerName: "Contact",
      sortable: false,
      width: 100,
    },
    {
      field: "address",
      headerName: "Address",
      width: 130,
    },
    {
      field: "createdAt",
      headerName: "CreatedAt",
      sortable: false,
      width: 90,
      renderCell: (params) => {
        return (
          <p>{moment(params.row.createdAt).subtract(10, "days").calendar()}</p>
        );
      },
    },
    {
      field: "action",
      headerName: deleteLoading ? <CircularProgress size={20} /> : "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <div>
              <button
                className="restaurantListEdit"
                onClick={() => handleEdit(params.row)}
              >
                Edit
              </button>
            </div>
            <DeleteOutline
              className="restaurantListDelete"
              onClick={() => {
                setOpenModal(true);
                setDeleteId(params.row._id);
              }}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="supplierList">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          marginBottom: 10,
        }}
      >
        <h2>Suppliers List</h2>
        {isLoading && <CircularProgress size={20} />}
      </div>
      <DataGrid
        rows={data || []}
        disableSelectionOnClick
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        density="comfortable"
        pageSizeOptions={[8]}
        getRowId={(data) => data._id}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        autoHeight
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 200 },
          },
        }}
      />
      {SnackbarComponent}
      <CustomModal open={openModal} setOpen={setOpenModal}>
        <Typography
          id="modal-modal-description"
          sx={{ mt: 2, textAlign: "center" }}
        >
          Are you sure want to delete ?
        </Typography>
        <Box style={{ display: "flex", justifyContent: "end", marginTop: 20 }}>
          <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          <Button onClick={() => confirmDelete()}>Confirm</Button>
        </Box>
      </CustomModal>
    </div>
  );
}
