import React, {useEffect, useState} from 'react';
import {
    Input,
    Option,
    Select,
    Button,
    Dialog,
    Textarea,
    IconButton,
    Typography,
    DialogBody,
    DialogHeader,
    DialogFooter,
} from '@material-tailwind/react';
import {XMarkIcon} from '@heroicons/react/24/outline';
import SelectScheduleDialog from './select-schedule-dialog';
import {pageClassroomsByTeacherId, updateClassroom} from "@/service/teacher/Classroom.jsx";
import Swal from "sweetalert2";
import Class from "@/pages/dashboard/teacher/class.jsx";
import {useNavigate} from "react-router-dom";

export function AddUpdateClassDialog({open, handleClose, classroom, pageClassrooms}) {
    const [show, setShow] = React.useState(false);

    const [className, setClassName] = useState('');
    const [createdDate, setCreatedDate] = useState('');

    useEffect(() => {
        if (classroom) {
            setClassName(classroom.classroomName || '');
            setCreatedDate(classroom.createdDate || '');
        }
    }, [classroom]);

    const navigate = useNavigate();
    const handleUpdate = async () => {

        const updatedClassroom = {
            ...classroom,
            classroomName: className,
            createdDate: createdDate,
        };

        const isSuccess = await updateClassroom(updatedClassroom);

        handleClose();

        if (isSuccess) {
                Swal.fire({
                    icon: "success",
                    title: "Updated Successfully",
                }).then(() => {
                    pageClassrooms()
                });
        } else {
                await Swal.fire({
                    icon: "error",
                    title: "Update failed",
                    text: "Something went wrong!",
                });
        }
    };

    return (
        <Dialog size="md" open={open} handler={handleClose} className="p-4 overflow-hidden">
            <DialogHeader className="relative m-0 block">
                <Typography variant="h4" color="blue-gray">
                    Update your class
                </Typography>
                <Typography className="mt-1 font-normal text-gray-600">
                    Update the information below
                </Typography>
                <IconButton
                    size="sm"
                    variant="text"
                    className="!absolute right-3.5 top-3.5"
                    onClick={handleClose}
                >
                    <XMarkIcon className="h-4 w-4 stroke-2"/>
                </IconButton>
            </DialogHeader>
            <DialogBody className="space-y-4 pb-6">
                <div>
                    <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                        Class Name
                    </Typography>
                    <Input
                        color="gray"
                        size="lg"
                        placeholder="Enter your class name"
                        name="name"
                        className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900"
                        value={className}
                        containerProps={{
                            className: '!min-w-full',
                        }}
                        labelProps={{
                            className: 'hidden',
                        }}
                        onChange={(e) => setClassName(e.target.value)}
                    />
                </div>

                <div className="flex gap-4">
                    <div className="w-full">
                        <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                            Created Date
                        </Typography>
                        <Input
                            color="gray"
                            size="lg"
                            type="date"
                            placeholder="Enter the start date"
                            name="startDate"
                            className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900"
                            value={createdDate}
                            containerProps={{
                                className: '!min-w-full',
                            }}
                            labelProps={{
                                className: 'hidden',
                            }}
                            onChange={(e) => setCreatedDate(e.target.value)}
                        />
                    </div>
                </div>

                <div>
                    <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                        Description (Optional)
                    </Typography>
                    <Textarea
                        rows={7}
                        name="description"
                        placeholder="eg. This class is for the students who want to learn about the basics of computer science."
                        className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                        labelProps={{
                            className: 'hidden',
                        }}
                    />
                </div>
            </DialogBody>

            <SelectScheduleDialog show={show} setShow={setShow}/>

            <DialogFooter>
                <Button variant="outlined" className="ml-auto" onClick={handleUpdate}>
                    Update Class
                </Button>
                <Button className="ml-2" onClick={handleClose}>
                    Close
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
