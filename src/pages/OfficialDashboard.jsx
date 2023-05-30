import React, { useEffect, useState } from "react";
import { auth } from "../utils/Firebase";
import Navbar from "../components/Navbar";
import { Navigate, useNavigate } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import { fetchComplaints, isOfficial } from "../utils/FirebaseFunctions";
import { Statuses, statusColors } from "../utils/enums";
import clsx from "clsx";
import { Dialog } from "@mui/material";
import ComplaintDetailModal from "../components/ComplaintDetailModal";

const OfficialDashboard = () => {
  const [Complaints, setComplaints] = useState([]);
  const [ModalOpen, setModalOpen] = useState(false);
  const [complaint, setComplaint] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/official-login");
      } else {
        isOfficial(user.uid).then((res) => {
          if (!res) {
            auth.signOut()
            navigate("/citizen-login");
          }
        });
      }
    });
    const unsubscribe = fetchComplaints(handleComplaintsUpdate);

    return () => {
      // Clean up the listener when the component unmounts
      unsubscribe();
    };
  }, []);
  const handleComplaintsUpdate = (updatedComplaints) => {
    setComplaints(updatedComplaints);
  };
  let columns = [
    {
      field: "reason",
      headerName: "Complaint Reason",
      width: 300,
      headerClassName: "",
    },
    {
      field: "author",
      headerName: "Reported By",
      width: 150,
    },
    {
      field: "location",
      headerName: "Reported Location",
      width: 200,

      valueGetter: (params) => `${params.row.location.name}`,
    },
    {
      field: "timestamp",
      headerName: "Reported Date & Time",
      width: 200,

      valueGetter: (params) => {
        let d = new Date(params.row.timestamp);
        let date = d.toLocaleDateString();
        let time = d.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        });
        return date + " , " + time;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      headerClassName: "",
      headerAlign: "center",
      align: "center",
      cellClassName: (params) => {
        if (params.value == null) {
          return "";
        }

        return clsx("StatusCol", {
          inProgress: params.value === Statuses.inProgress,
          Rejected: params.value === Statuses.rejected,
          Solved: params.value === Statuses.solved,
        });
      },
    },
  ];
  return (
    <>
      <Navbar />
      <div className="px-20 ">
        <h2 className=" lg:mt-10 leading-normal font-bold text-center text-xl lg:text-[2rem] my-8 lg:text-left">
          Official Dashboard
        </h2>
        <Dialog
          open={ModalOpen}
          children={
            <ComplaintDetailModal
              setDialogOpen={setModalOpen}
              complaint={complaint}
            />
          }
        />
        <DataGrid
          rows={Complaints}
          columns={columns}
          onRowClick={(params) => {
            setComplaint(params.row);
            setModalOpen(true);
          }}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20, 30]}
          sx={{
            ".MuiDataGrid-columnHeaderTitle": {
              fontWeight: "bold !important",
              overflow: "visible !important",
            },
            "& .StatusCol": {
              color: "#fff",
              fontWeight: 900,
              marginY: 1.5,
              minHeight: "30px !important",
              marginLeft: "auto !important",
              borderRadius: 500,
            },
            "& .StatusCol.inProgress": {
              backgroundColor: statusColors.inProgress,
            },
            "& .StatusCol.Rejected": {
              backgroundColor: statusColors.rejected,
            },
            "& .StatusCol.Solved": {
              backgroundColor: statusColors.solved,
            },
          }}
          // checkboxSelection
        ></DataGrid>
      </div>
    </>
  );
};

export default OfficialDashboard;
