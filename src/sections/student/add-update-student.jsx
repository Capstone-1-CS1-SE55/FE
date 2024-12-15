import React, {useEffect, useState} from 'react';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Textarea,
    Typography,
    Select,
    Option,
} from '@material-tailwind/react';
import {addNewStudentFromClassroom} from "@/service/teacher/Classroom.jsx";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

export function AddUpdateStudentDialog({open, handleClose, classroomStudent}) {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        classroomStudent = {
            ...classroomStudent,
            "student": {
                "email": email
            }
        }
    }, [email]);
    const handleCreate = async () => {
        const isSuccess = await addNewStudentFromClassroom(classroomStudent);

        handleClose();

        if (isSuccess) {
            setTimeout(() => {
                Swal.fire({
                    icon: "success",
                    title: "Created Successfully",
                }).then(() => {
                    navigate(0);
                });
            }, 1000);
        } else {
            setTimeout(() => {
                Swal.fire({
                    icon: "error",
                    title: "Created failed",
                    text: "Something went wrong!",
                });
            }, 1000)
        }
    }

    return (
        <Dialog open={open} size="xs" handler={handleClose}>
            <div className="flex items-center justify-between">
                <DialogHeader className="flex flex-col items-start">
                    <Typography className="mb-1" variant="h4">
                        Add student!
                    </Typography>
                </DialogHeader>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-3 h-5 w-5"
                    onClick={handleClose}
                >
                    <path
                        fillRule="evenodd"
                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </div>
            <DialogBody>
                <Typography className="mb-8 -mt-7 " color="gray" variant="lead">
                    Enter student email to add to this class.
                </Typography>
                <div className="grid gap-6">
                    <div>
                        <Typography color="blue-gray" className="mb-2 font-medium">
                            Student email
                        </Typography>
                        <Input label="email" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                </div>
            </DialogBody>
            <DialogFooter className="space-x-2">
                <Button variant="text" color="gray" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="gradient" color="gray" onClick={handleCreate}>
                    Add student
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
