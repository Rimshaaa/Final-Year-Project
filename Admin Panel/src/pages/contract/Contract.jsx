import "./contract.css";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { useGetContractsQuery } from "../../redux/api";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CustomModal from "../../components/ui/Modal";

export default function Contract() {
  const { data, isLoading } = useGetContractsQuery();
  const [value, setValue] = useState(0);
  const [contracts, setContracts] = useState([]);
  const [openContract, setOpenContract] = useState(false);
  const [contractData, setContractData] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (value === 0) {
      const contracts = data?.filter((cont) => cont.status === "accepted");
      setContracts(contracts);
    } else if (value === 1) {
      const contracts = data?.filter((cont) => cont.status === "pending");
      setContracts(contracts);
    } else {
      const contracts = data?.filter((cont) => cont.status === "rejected");
      setContracts(contracts);
    }
  }, [data, value]);

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "sender",
      headerName: "Sender",
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
                src={params.row.sender.image}
                alt="image"
              />
            </div>
            <div>
              <p style={{ textTransform: "capitalize" }}>
                {params.row.sender.name}
              </p>
              <small>{params.row.sender.email}</small>
            </div>
          </div>
        );
      },
    },
    {
      field: "receiver",
      headerName: "Receiver",
      width: 250,
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
                src={params.row.receiver.image}
                alt="image"
              />
            </div>
            <div>
              <p style={{ textTransform: "capitalize" }}>
                {params.row.receiver.name}
              </p>
              <small>{params.row.receiver.email}</small>
            </div>
          </div>
        );
      },
    },
    {
      field: "startDate",
      headerName: "Start Date",
      sortable: false,
      width: 90,
    },
    {
      field: "endDate",
      headerName: "End Date",
      sortable: false,
      width: 90,
    },
    {
      field: "action",
      headerName: "Contract",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <div>
              <button
                className="view-btn"
                onClick={() => {
                  setContractData(params.row);
                  setOpenContract(true);
                }}
              >
                View Contract
              </button>
            </div>
            <CustomModal
              open={openContract}
              setOpen={setOpenContract}
              width={600}
            >
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, textAlign: "center", fontWeight: 800, mb: 1 }}
              >
                Contract Between {contractData?.sender?.name} &{" "}
                {contractData?.receiver?.name}
              </Typography>
              <Box>
                <Typography sx={{ fontSize: 13 }}>
                  Start Date: {contractData?.startDate}
                </Typography>
                <Typography sx={{ fontSize: 13, mb: 1 }}>
                  End Date: {contractData?.endDate}
                </Typography>
                <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                  Contract Details:
                </Typography>
                <Typography sx={{ fontSize: 13 }}>
                  {contractData?.details}
                </Typography>
                <Typography sx={{ fontSize: 15, fontWeight: 700 }}>
                  Terms & Conditions:
                </Typography>
                <Typography sx={{ fontSize: 13 }}>
                  {contractData?.terms}
                </Typography>
              </Box>
              <Box
                style={{
                  display: "flex",
                  justifyContent: "end",
                  marginTop: 20,
                }}
              >
                <Button onClick={() => setOpenContract(false)}>Close</Button>
              </Box>
            </CustomModal>
          </>
        );
      },
    },
  ];

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
        <h2>Contracts List</h2>
        {isLoading && <CircularProgress size={20} />}
      </div>
      <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Accepted" />
          <Tab label="Pending" />
          <Tab label="Rejected" />
        </Tabs>
      </Box>
      <DataGrid
        style={{ marginTop: 30 }}
        rows={contracts || []}
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
        rowHeight={80}
        // slots={{ toolbar: GridToolbar }}
        // slotProps={{
        //   toolbar: {
        //     showQuickFilter: true,
        //     quickFilterProps: { debounceMs: 500 },
        //   },
        // }}
      />
    </div>
  );
}
