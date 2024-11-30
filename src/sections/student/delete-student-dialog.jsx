import React from 'react';
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from '@material-tailwind/react';

export function DeleteStudentDialog({ open, handleClose }) {
  return (
    <Dialog open={open} handler={handleClose}>
      <DialogHeader>Delete this student!</DialogHeader>
      <DialogBody>Are you sure you want to delete this student?</DialogBody>
      <DialogFooter>
        <Button size="small" variant="outlined" onClick={handleClose} className="mr-2">
          <span>Cancel</span>
        </Button>
        <Button size="small" variant="gradient" color="red" onClick={handleClose}>
          <span>Delete</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
