import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useGetOrdersQuery } from "../../redux/api";
import { CircularProgress } from "@mui/material";
import moment from "moment";

export default function OrdersList() {
  const { data, isLoading } = useGetOrdersQuery();

  const columns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "sender",
      headerName: "Sender",
      width: 230,
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
                src={params?.row?.sender?.image}
                alt="image"
              />
            </div>
            <div>
              <p style={{ textTransform: "capitalize" }}>
                {params?.row?.sender?.name}
              </p>
              <small>{params?.row?.sender?.email}</small>
            </div>
          </div>
        );
      },
    },
    {
      field: "receiver",
      headerName: "Receiver",
      width: 210,
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
                src={params?.row?.receiver?.image}
                alt="image"
              />
            </div>
            <div>
              <p style={{ textTransform: "capitalize" }}>
                {params?.row?.receiver?.name}
              </p>
              <small>{params?.row?.receiver?.email}</small>
            </div>
          </div>
        );
      },
    },
    {
      field: "item_name",
      headerName: "Item Name",
      sortable: false,
      width: 90,
    },
    {
      field: "price",
      headerName: "Unit Price",
      sortable: false,
      width: 40,
    },
    {
      field: "qty",
      headerName: "Qty",
      sortable: false,
      width: 10,
    },
    {
      field: "total",
      headerName: "Total",
      sortable: false,
      width: 60,
      valueGetter: (params) => {
        return parseInt(params.row.qty) * parseInt(params.row.price);
      },
    },
    {
      field: "createdAt",
      headerName: "Order Date",
      sortable: false,
      width: 120,
      valueGetter: (params) => {
        return moment(params.value).format("Do MMM YYYY");
      },
    },
    {
      field: "status",
      headerName: "Status",
      sortable: false,
      width: 90,
      renderCell: (params) => {
        return (
          <p
            style={{
              backgroundColor: getOrderStatusColor(params.row.status),
              padding: "5px 10px",
              borderRadius: 10,
            }}
          >
            {params.row.status}
          </p>
        );
      },
    },
  ];

  const getOrderStatusColor = (orderStatus) => {
    console.log(orderStatus);
    switch (orderStatus) {
      case "pending":
        return "#fef3c7";
      case "dispatched":
        return "#bbf7d0";
      case "received":
        return "#bae6fd";
      case "rejected":
        return "#fecdd3";
      default:
        return {};
    }
  };

  return (
    <div className="restaurantList">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 5,
          marginBottom: 10,
        }}
      >
        <h2>Orders List</h2>
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
        getRowId={(data) => data._id}
        pageSize={5}
        rowsPerPageOptions={[5]}
        autoHeight
        density="comfortable"
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        slots={{ toolbar: GridToolbar }}
        localeText={{ toolbarQuickFilterPlaceholder: "Search Order ID" }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
      />
    </div>
  );
}
