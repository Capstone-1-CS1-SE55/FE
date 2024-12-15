import React from 'react';
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
import { XMarkIcon } from '@heroicons/react/24/outline';

export function JoinClassDialog({ open, handleClose }) {
    return (
        <Dialog size="md" open={open} handler={handleClose} className="p-4 overflow-hidden">
            <DialogHeader className="relative m-0 block">
                <Typography variant="h4" color="blue-gray">
                    Join a class
                </Typography>
                <Typography className="mt-1 font-normal text-gray-600">
                    Please enter the class code to join a class.
                </Typography>
                <IconButton
                    size="sm"
                    variant="text"
                    className="!absolute right-3.5 top-3.5"
                    onClick={handleClose}
                >
                    <XMarkIcon className="h-4 w-4 stroke-2" />
                </IconButton>
            </DialogHeader>
            <DialogBody className="space-y-4 pb-6">
                <div>
                    <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                        Class code
                    </Typography>
                    <Input
                        color="gray"
                        size="lg"
                        placeholder="Enter class code"
                        name="name"
                        className="placeholder:opacity-100 focus:!border-t-gray-900"
                        containerProps={{
                            className: '!min-w-full',
                        }}
                        labelProps={{
                            className: 'hidden',
                        }}
                    />
                </div>
            </DialogBody>

            <DialogFooter>
                <Button variant="outlined" className="ml-auto" onClick={handleClose}>
                    Cancel
                </Button>
                <Button className="ml-2" onClick={handleClose}>
                    Join class
                </Button>
            </DialogFooter>
        </Dialog>
    );
}