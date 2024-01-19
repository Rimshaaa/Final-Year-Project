import "./dispute.css";
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
import * as React from "react";
import { useGetDisputesQuery } from "../../redux/api";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CustomModal from "../../components/ui/Modal";
import moment from "moment";

export default function Dispute() {
  const { data, isLoading } = useGetDisputesQuery();
  const [openDispute, setOpenDispute] = useState(false);
  const [disputeData, setDisputeData] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        <h2>Disputes List</h2>
        {isLoading && <CircularProgress size={20} />}
      </div>
      <div style={{ marginLeft: 50, marginRight: 50 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>File Dispute Against</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>No. Of Disputes</TableCell>
                <TableCell>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data?.map((row, index) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{row.supplier_name}</TableCell>
                  <TableCell>{row._id}</TableCell>
                  <TableCell>{row.disputes.length}</TableCell>
                  <TableCell>
                    <>
                      <button
                        className="view-btn"
                        onClick={() => {
                          setDisputeData(row.disputes);
                          setOpenDispute(true);
                        }}
                      >
                        View
                      </button>
                      <CustomModal
                        open={openDispute}
                        setOpen={setOpenDispute}
                        width={1000}
                      >
                        <Typography
                          id="modal-modal-description"
                          sx={{
                            mt: 2,
                            textAlign: "center",
                            fontWeight: 800,
                            mb: 1,
                          }}
                        >
                          File Disputes Details
                        </Typography>
                        <TableContainer component={Paper}>
                          <Table
                            sx={{ minWidth: 650 }}
                            aria-label="simple table"
                          >
                            <TableHead>
                              <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>File Dispute By</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Attachments</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {disputeData?.map((row, index) => (
                                <TableRow
                                  key={row._id}
                                  sx={{
                                    "&:last-child td, &:last-child th": {
                                      border: 0,
                                    },
                                  }}
                                >
                                  <TableCell>{index + 1}</TableCell>
                                  <TableCell>{row.restaurant_name}</TableCell>
                                  <TableCell>{row.restaurant_email}</TableCell>
                                  <TableCell>{row.description}</TableCell>
                                  <TableCell>
                                    {moment(row.createdAt).format("lll")}
                                  </TableCell>
                                  <TableCell>
                                    <div style={{ display: "flex", gap: 5 }}>
                                      {row?.files?.map((file) => (
                                        <a
                                          href={file}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <img
                                            src={file}
                                            style={{
                                              width: 100,
                                              height: 100,
                                              borderRadius: 10,
                                            }}
                                          />
                                        </a>
                                      ))}
                                    </div>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                        <Box
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            marginTop: 20,
                          }}
                        >
                          <Button onClick={() => setOpenDispute(false)}>
                            Close
                          </Button>
                        </Box>
                      </CustomModal>
                    </>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
