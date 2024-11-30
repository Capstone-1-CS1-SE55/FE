import React from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';

export function LeaveClassDialog({ open, handleClose }) {
  return (
    <Dialog open={open} handler={handleClose}>
      <DialogHeader>Leave this class!</DialogHeader>
      <DialogBody>Are you sure you want to leave this class?</DialogBody>
      <DialogFooter>
        <Button size="small" variant="outlined" onClick={handleClose} className="mr-2">
          <span>Cancel</span>
        </Button>
        <Button size="small" variant="gradient" color="red" onClick={handleClose}>
          <span>Leave</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
