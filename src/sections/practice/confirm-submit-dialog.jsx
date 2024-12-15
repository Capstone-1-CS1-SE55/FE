import React from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';

export function ConfirmSubmitDialog({ open, handleClose, handleConfirm }) {
    return (
        <Dialog open={open} handler={handleClose}>
            <DialogHeader>Submit your practice</DialogHeader>
            <DialogBody>Are you sure you want to submit your practice?</DialogBody>
            <DialogFooter>
                <Button size="small" variant="outlined" onClick={handleClose} className="mr-2">
                    <span>Cancel</span>
                </Button>
                <Button size="small" variant="gradient" color="green" onClick={handleConfirm}>
                    <span>Confirm</span>
                </Button>
            </DialogFooter>
        </Dialog>
    );
}