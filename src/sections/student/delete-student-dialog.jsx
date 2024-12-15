import React from 'react';
import {Button, Dialog, DialogHeader, DialogBody, DialogFooter, Typography} from '@material-tailwind/react';
import {useNavigate} from "react-router-dom";
import {deleteClassroom, deleteStudentFromClassroom} from "@/service/teacher/Classroom.jsx";
import Swal from "sweetalert2";

export function DeleteStudentDialog({ open, handleClose, student }) {

    if (!student) {
        return (
            <Dialog size="sm" open={open} handler={handleClose} className="p-4">
                <DialogHeader className="relative m-0 block">
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                        Loading...
                    </Typography>
                </DialogHeader>
                <DialogBody className="space-y-4 pb-6">
                    <Typography variant="small" className="text-center text-blue-gray-600">
                        Please wait while the student data is being loaded.
                    </Typography>
                </DialogBody>
            </Dialog>
        );
    }

    const navigate = useNavigate();
    const handleDelete = async () => {

        const isSuccess = await deleteStudentFromClassroom(student.studentId, student.classroomId);

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
      <DialogHeader>Delete this student!</DialogHeader>
        <DialogBody>
            Are you sure you want to delete {student ? (
            <>
                student <strong className="font-bold">{student.studentName}</strong>
            </>
        ) : (
            "this student"
        )}?
        </DialogBody>
      <DialogFooter>
        <Button size="small" variant="outlined" onClick={handleClose} className="mr-2">
          <span>Cancel</span>
        </Button>
        <Button size="small" variant="gradient" color="red" onClick={handleDelete}>
          <span>Delete</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
