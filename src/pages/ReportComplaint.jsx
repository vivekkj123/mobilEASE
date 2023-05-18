import React, { useState } from "react";
import Navbar from "../components/Navbar";
import DashboardLinkButton from "../components/DashboardLinkButton";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import MuiTextField from "@mui/material/TextField";
import styled from "@emotion/styled";
import { LocationSearching } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonBase,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { identifyLocation } from "../utils/MiscFunctions";
import ReactImageUploading from "react-images-uploading";
const TextField = styled(MuiTextField)((props) => ({
  width: "80%",
  // marginLeft: "auto",
  [`& fieldset`]: {
    borderRadius: "15px",
  },
}));
const ReportComplaint = () => {
  const [Image, setImage] = useState();
  const [FormData, setFormData] = useState({
    location: {
      name: "",
      lat: "",
      lng: "",
    },
    mediaPath: "",
    reason: "",
    additionalInfo: "",
  });

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <h2 className=" lg:mt-10 leading-normal font-bold text-center text-xl lg:text-[2rem] my-6 lg:text-left lg:mx-20">
        Report a Complaint
      </h2>

      <ReactImageUploading
        value={Image}
        maxNumber={1}
        dataURLKey="data_url"
        onChange={(img) => {
          setImage(img);
        }}
      >
        {({ onImageUpload, onImageUpdate }) => (
          <>
            <DashboardLinkButton
              className={`${Image ? "hidden" : "block"}`}
              icon={faCamera}
              name={"Upload a picture/video of incident"}
              subtitle={"Make sure that everything is clear"}
              onClick={onImageUpload}
            />
            <div
              className={`flex flex-col justify-center items-center mx-8 lg:mx-20 py-6 ${
                Image ? "block" : "hidden"
              }`}
            >
              <img
                src={Image && Image[0].data_url}
                alt=""
                className="max-w-full w-auto my-6 h-96 object-scale-down"
              />
              <Button
                onClick={() => onImageUpdate(0)}
                hidden={Image ? false : true}
                variant="outlined"
              >
                Change Image
              </Button>
            </div>
          </>
        )}
      </ReactImageUploading>
      <form>
        <Box marginLeft={10}>
          <TextField
            variant="outlined"
            label="Location"
            value={FormData.location.name}
            required
            contentEditable={false}
            InputProps={{
              endAdornment: (
                <ButtonBase
                  onClick={async () => {
                    let locationRes = await identifyLocation();
                    setFormData({ ...FormData, location: locationRes });
                  }}
                >
                  <LocationSearching />
                </ButtonBase>
              ),
            }}
          />
          <p className="mt-6">Reason:</p>
          <RadioGroup
            onChange={(e) => {
              setFormData({ ...FormData, reason: e.target.value });
            }}
            value={FormData.reason}
          >
            <FormControlLabel
              value="Speeding/Racing"
              control={<Radio />}
              label="Speeding/Racing"
            />
            <FormControlLabel
              value="Overloading of Passengers"
              control={<Radio />}
              label="Overloading of Passengers"
            />
            <FormControlLabel
              value="Driving without seat belt/Helmet"
              control={<Radio />}
              label="Driving without seat belt/Helmet"
            />
            <FormControlLabel
              value="Illegal Overtaking"
              control={<Radio />}
              label="Illegal Overtaking"
            />
            <FormControlLabel
              value="Potholes in Roads"
              control={<Radio />}
              label="Potholes in Roads"
            />
            <FormControlLabel
              value="Pavement Defects"
              control={<Radio />}
              label="Pavement Defects"
            />
            <FormControlLabel
              value="Others"
              control={<Radio />}
              label="Others"
            />
          </RadioGroup>
          <p className="my-2">More Information</p>
          <TextField
            required
            multiline
            value={FormData.additionalInfo}
            onChange={(e) => {
              setFormData({ ...FormData, additionalInfo: e.target.value });
            }}
            rows={5}
            placeholder="Provide more information about the incident"
          />
          <FormControlLabel
            required
            value="terms-accepted"
            control={<Checkbox />}
            label="By clicking this checkbox, I understood that reporting fake complaints against anyone will lead to legal actions against me."
          />
        </Box>
        <div className="flex justify-center my-8 px-40 lg:px-96">
          <Button variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReportComplaint;
