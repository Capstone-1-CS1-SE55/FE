import React from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';
import {deleteClassroom} from "@/service/teacher/Classroom.jsx";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

export function DeletePracticeDialog({ open, handleClose, assignment, handleClickDelete }) {
    return (
        <Dialog open={open} handler={handleClose}>
            <DialogHeader>Delete this question!</DialogHeader>
            <DialogBody>Are you sure you want to delete question {assignment ? assignment.questionText : 'question'}?</DialogBody>
            <DialogFooter>
                <Button size="sm" variant="outlined" onClick={handleClose} className="mr-2">
                    <span>Cancel</span>
                </Button>
                <Button size="sm" variant="gradient" color="red" onClick={handleClickDelete}>
                    <span>Delete</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
