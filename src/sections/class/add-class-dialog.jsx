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
import {addNewClass, pageClassroomsByTeacherId, updateClassroom} from "@/service/teacher/Classroom.jsx";
import Swal from "sweetalert2";
import Class from "@/pages/dashboard/teacher/class.jsx";
import {useNavigate} from "react-router-dom";
import {getUsernameFromToken} from "@/service/Token.jsx";

export function AddClassDialog({open, handleClose, pageClassrooms}) {
    const [show, setShow] = React.useState(false);
    const [className, setClassName] = useState('');
    const [email, setEmail] = useState([]);
    const [currentEmail, setCurrentEmail] = useState('');
    const navigate = useNavigate();

    const [errors, setErrors] = useState({className: '', currentEmail: ''});

    const handleInputChange = (e, field) => {
        const {value} = e.target;

        if (field === 'className') {
            setClassName(value);
            if (value.trim()) {
                setErrors(prev => ({...prev, className: ''}));
            }
        } else if (field === 'currentEmail') {
            setCurrentEmail(value);
            if (value.trim()) {
                setErrors(prev => ({...prev, currentEmail: ''}));
            }
        }
    };

    const handleAddClass = async () => {

        let isValid = true;
        const newErrors = {className: '', currentEmail: ''};

        if (!className.trim()) {
            newErrors.className = 'Class name is required';
            isValid = false;
        }
        if (!currentEmail.trim()) {
            newErrors.currentEmail = 'Student email is required';
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {

            const newEmails = currentEmail.split(/[\n\s]+/).map(email => email.trim());
            console.log(newEmails)
            const updatedEmails = [...new Set([...email, ...newEmails])];
            setEmail(updatedEmails);
            console.log("email: ",email)
            const emailString = updatedEmails.join(',');
            console.log(emailString)
            const isSuccess = await addNewClass(className, encodeURIComponent(emailString))

            handleClose();

            if (isSuccess) {
                setCurrentEmail('');
                setClassName('');
                setEmail([])
                setTimeout(() => {
                    Swal.fire({
                        icon: "success",
                        title: "Created Successfully",
                    }).then(() => {
                        pageClassrooms()
                    });
                }, 500);
            } else {
                setTimeout(() => {
                    Swal.fire({
                        icon: "error",
                        title: "Create failed",
                        text: "Something went wrong!",
                    });
                }, 500)
            }
        }
    }

    const customHandleClose = () => {
        setCurrentEmail('');
        setClassName('');
        setEmail([])

        if (handleClose) {
            handleClose();
        }
    };

    return (
        <Dialog size="md" open={open} handler={handleClose} className="p-4 overflow-hidden">
            <DialogHeader className="relative m-0 block">
                <Typography variant="h4" color="blue-gray">
                    Add new class
                </Typography>
                <IconButton
                    size="sm"
                    variant="text"
                    className="!absolute right-3.5 top-3.5"
                    onClick={customHandleClose}
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
                        value={className}
                        className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900"
                        containerProps={{
                            className: '!min-w-full',
                        }}
                        labelProps={{
                            className: 'hidden',
                        }}
                        onChange={(e) => handleInputChange(e, 'className')}
                    />
                    {errors.className && <Typography color="red" className="mt-1">{errors.className}</Typography>}
                </div>

                <div>
                    <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                        Student email
                    </Typography>
                    {/*<Input*/}
                    {/*    color="gray"*/}
                    {/*    size="lg"*/}
                    {/*    placeholder="Enter student email"*/}
                    {/*    name="email"*/}
                    {/*    value={currentEmail}*/}
                    {/*    className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900"*/}
                    {/*    containerProps={{*/}
                    {/*        className: '!min-w-full',*/}
                    {/*    }}*/}
                    {/*    labelProps={{*/}
                    {/*        className: 'hidden',*/}
                    {/*    }}*/}
                    {/*    onChange={(e) => handleInputChange(e, 'currentEmail')}*/}
                    {/*/>*/}
                    <Textarea
                        rows={7}
                        name="email"
                        value={currentEmail}
                        placeholder="Enter student email"
                        className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"
                        labelProps={{
                            className: 'hidden',
                        }}
                        onChange={(e) => handleInputChange(e, 'currentEmail')}
                    />
                    {errors.currentEmail && <Typography color="red" className="mt-1">{errors.currentEmail}</Typography>}
                </div>

                {/*<div>*/}
                {/*    <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">*/}
                {/*        Description (Optional)*/}
                {/*    </Typography>*/}
                {/*    <Textarea*/}
                {/*        rows={6}*/}
                {/*        name="description"*/}
                {/*        placeholder="eg. This class is for the students who want to learn about the basics of computer science."*/}
                {/*        className="!w-full !border-[1.5px] !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-600 ring-4 ring-transparent focus:!border-primary focus:!border-t-blue-gray-900 group-hover:!border-primary"*/}
                {/*        labelProps={{*/}
                {/*            className: 'hidden',*/}
                {/*        }}*/}
                {/*    />*/}
                {/*</div>*/}
            </DialogBody>

            <SelectScheduleDialog show={show} setShow={setShow}/>

            <DialogFooter>
                <Button variant="outlined" className="ml-auto" onClick={customHandleClose}>
                    Close
                </Button>
                <Button className="ml-2" onClick={handleAddClass}>
                    Create Class
                </Button>
            </DialogFooter>
        </Dialog>
    );
}
