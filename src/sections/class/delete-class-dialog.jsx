import React from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import {deleteClassroom} from "@/service/teacher/Classroom.jsx";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

export function DeleteClassDialog({ open, handleClose, classroom }) {
    const navigate = useNavigate();
    const handleDelete = async () => {

        const isSuccess = await deleteClassroom(classroom.classroomId);

        handleClose();

        if (isSuccess) {
            setTimeout(() => {
                Swal.fire({
                    icon: "success",
                    title: "Deleted Successfully",
                }).then(() => {
                    navigate(0);
                });
            }, 1000);
        } else {
            setTimeout(() => {
                Swal.fire({
                    icon: "error",
                    title: "Delete failed",
                    text: "Something went wrong!",
                });
            },1000)
        }
    }
  return (
    <Dialog open={open} handler={handleClose}>
      <DialogHeader>Delete this class!</DialogHeader>
      <DialogBody>Are you sure you want to delete {classroom ? 'class ' + classroom.classroomName : 'this class'}?</DialogBody>
      <DialogFooter>
        <Button size="sm" variant="outlined" onClick={handleClose} className="mr-2">
          <span>Cancel</span>
        </Button>
        <Button size="sm" variant="gradient" color="red" onClick={handleDelete}>
          <span>Delete</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
