import React, { useState } from "react";
import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  Avatar,
  Dialog,
  DialogActions,
  DialogTitle,
  Button,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

import {
  accordion_container,
  avatar_style,
  avatar_name,
  personalDetails,
  personalDetail_heading,
  personalDetail_answer,
  personalDeatils_Description,
  personalDetails_about,
  personalDetail_updation,
  personalDetails_edit_delete,
  delete_btn,
  edit_btn,
  inputFields,
  detailInputFields,
  inputDescription,
  closeIconInput,
  doneIconInput,
} from "./accordionComponentStyling";

const AccordionComponent = ({
  num,
  name,
  gender,
  country,
  picture,
  description,
  age,
  active,
  activeFn,
  handleDelete,
  handleEditDone,
}) => {
  const [expanded, setExpanded] = useState(false);
  const [edit, setEdit] = useState(false);
  const [userForm, setUserForm] = useState({
    id: num,
    name: name,
    dob: age,
    gender: gender,
    country: country,
    description: description,
    picture: picture,
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
    activeFn(panel);
  };

  const handleEdit = () => {
    setEdit(true);
  };

  return (
    <>
      <div id={num}>
        <Accordion
          expanded={expanded === `panel${num}`}
          onChange={handleChange(`panel${num}`)}
          style={accordion_container}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel${num}bh-content`}
            id={`panel${num}bh-content`}
          >
            <Avatar alt="Remy Sharp" src={picture} style={avatar_style} />
            {edit ? (
              <input
                type="text"
                value={userForm.name}
                onChange={(e) =>
                  setUserForm({
                    ...userForm,
                    name: e.target.value,
                  })
                }
                style={inputFields}
              ></input>
            ) : (
              <Typography style={avatar_name}>{name}</Typography>
            )}
          </AccordionSummary>

          {active === `panel${num}` && (
            <AccordionDetails>
              <div style={personalDetails}>
                <div>
                  <p style={personalDetail_heading}>Age</p>
                  {edit ? (
                    <input
                      type="text"
                      value={`${userForm.dob} years`}
                      onChange={(e) =>
                        setUserForm({
                          ...userForm,
                          dob: e.target.value,
                        })
                      }
                      style={detailInputFields}
                    ></input>
                  ) : (
                    <p style={personalDetail_answer}>{`${age}`} years</p>
                  )}
                </div>
                <div>
                  <p style={personalDetail_heading}>Gender</p>
                  {edit ? (
                    <input
                      type="text"
                      value={userForm.gender}
                      onChange={(e) =>
                        setUserForm({
                          ...userForm,
                          gender: e.target.value,
                        })
                      }
                      style={detailInputFields}
                    ></input>
                  ) : (
                    <p style={personalDetail_answer}>{gender}</p>
                  )}
                </div>
                <div>
                  <p style={personalDetail_heading}>Country</p>
                  {edit ? (
                    <input
                      type="text"
                      value={userForm.country}
                      onChange={(e) =>
                        setUserForm({
                          ...userForm,
                          country: e.target.value,
                        })
                      }
                      style={detailInputFields}
                    ></input>
                  ) : (
                    <p style={personalDetail_answer}>{country}</p>
                  )}
                </div>
              </div>
              <div>
                <small style={personalDeatils_Description}>Description</small>
                {edit ? (
                  <textarea
                    rows="10"
                    cols="50"
                    value={userForm.description}
                    onChange={(e) =>
                      setUserForm({
                        ...userForm,
                        description: e.target.value,
                      })
                    }
                    style={inputDescription}
                  ></textarea>
                ) : (
                  <Typography style={personalDetails_about}>
                    {description}
                  </Typography>
                )}
              </div>
              <div style={personalDetail_updation}>
                <div style={personalDetails_edit_delete}>
                  {edit ? (
                    <>
                      <CloseIcon
                        onClick={() => setEdit(false)}
                        style={closeIconInput}
                      />
                      <DoneIcon
                        onClick={() => {
                          handleEditDone(num, userForm);
                          setEdit(false);
                        }}
                        style={doneIconInput}
                      />
                    </>
                  ) : (
                    <>
                      {/* <DeleteOutlineIcon
                        style={delete_btn}
                        onClick={(e) => handleDelete(e, num)}
                      /> */}
                      <DeleteOutlineIcon
                        style={delete_btn}
                        onClick={handleClickOpen}
                      />
                      <EditOutlinedIcon style={edit_btn} onClick={handleEdit} />
                    </>
                  )}
                </div>
              </div>
            </AccordionDetails>
          )}
        </Accordion>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Are you sure you want to delete?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: "black" }}>
              Cancel
            </Button>
            <Button
              onClick={(e) => handleDelete(e, num)}
              autoFocus
              sx={{ color: "red" }}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default AccordionComponent;
