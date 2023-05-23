import { faClockFour } from "@fortawesome/free-regular-svg-icons";
import {
  faClock,
  faClose,
  faMapMarkerAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import { Statuses, statusColors } from "../utils/enums";

const ComplaintDetailModal = ({ setDialogOpen, complaint }) => {
  let TimeStamp = new Date(complaint.timestamp);
  let date = TimeStamp.toLocaleDateString();
  let time = TimeStamp.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  let StatusColorEnum = Object.keys(Statuses).find(
    (key) => Statuses[key] === complaint.status
  );
  return (
    <div className="">
      <DialogTitle className="flex justify-between">
        Complaint Details
        <DialogActions>
          <FontAwesomeIcon
            onClick={() => {
              setDialogOpen((prevState) => !prevState);
            }}
            className="cursor-pointer"
            icon={faClose}
          />
        </DialogActions>
      </DialogTitle>
      <DialogContent>
        <div className="">
          <div className="flex justify-between">
            <div className="flex gap-4 items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
              <p>{complaint.location.name}</p>
            </div>
            <span className="w-30 text-center bg-green-800 rounded-xl font-bold text-white h-6 px-4"
            style={{
              backgroundColor: statusColors[StatusColorEnum],
            }}
            >
              {complaint.status}
            </span>
          </div>
          <div className="flex gap-3 items-center">
            <FontAwesomeIcon icon={faClockFour} />
            <p>{date + " , " + time}</p>
          </div>
          <h2 className="text-lg font-bold my-4">{complaint.reason}</h2>
          <p>{complaint.additionalInfo}</p>
          {complaint.mediaType === "image" ? (
            <img
              className="max-w-full w-auto h-96 object-scale-down"
              src={complaint.mediaPath}
            />
          ) : (
            <video
              controls
              className="max-w-full w-auto h-96 object-scale-down"
              src={complaint.mediaPath}
            />
          )}
          <h2 className="text-lg font-bold my-4">Comments</h2>
          <div>
            <div className="flex justify-between w-full">
              <div className="h-10 w-10 flex justify-center items-center bg-red-500 rounded-full">
                <FontAwesomeIcon icon={faUser} color="#fff" size="1x" />
              </div>
              <div className="font-semibold flex px-4 items-center w-full justify-between">
                <p>John Doe</p>
                <p>12 Jan 2023, 06:30 PM</p>
              </div>
              
            </div>
            <p className="ml-12">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
              itaque consequuntur incidunt quas facilis recusandae, impedit
              obcaecati consectetur nemo quaerat doloribus laudantium facere
              velit quibusdam corrupti nostrum numquam vel ipsam!
            </p>
          </div>
        </div>
      </DialogContent>
    </div>
  );
};

export default ComplaintDetailModal;
