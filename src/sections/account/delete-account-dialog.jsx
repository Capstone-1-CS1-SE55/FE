import {useNavigate} from "react-router-dom";
import {deleteClassroom} from "@/service/teacher/Classroom.jsx";
import Swal from "sweetalert2";
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader} from "@material-tailwind/react";
import React from "react";
import {deleteAccount} from "@/service/admin/Account.jsx";

export function DeleteAccountDialog({ open, handleClose, username, userId, pageAccounts}) {
    const navigate = useNavigate();
    const handleDelete = async () => {

        const isSuccess = await deleteAccount(userId);

        handleClose();

        if (isSuccess) {
            setTimeout(() => {
                Swal.fire({
                    icon: "success",
                    title: "Deleted Successfully",
                }).then(() => {
                    pageAccounts()
                });
            }, 500);
        } else {
            setTimeout(() => {
                Swal.fire({
                    icon: "error",
                    title: "Delete failed",
                    text: "Something went wrong!",
                });
            },500)
        }
    }

    return (
        <Dialog open={open} handler={handleClose}>
            <DialogHeader>Delete this class!</DialogHeader>
            <DialogBody>Are you sure you want to delete this username: {username}?</DialogBody>
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