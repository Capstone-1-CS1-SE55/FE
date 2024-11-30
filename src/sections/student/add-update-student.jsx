import React from 'react';
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

export function AddUpdateStudentDialog({ open, handleClose }) {
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
            <Textarea label="Email" />
          </div>

          <div className="w-full">
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Student role
            </Typography>
            <Select
              name="role"
              placeholder="Select the credit of the subject"
              labelProps={{
                className: 'hidden',
              }}
              className="!border-t-gray-400 focus:!border-t-gray-900"
              defaultValue="member"
            >
              <Option value="class-monitor">Class monitor</Option>
              <Option value="deputy-class">Deputy class</Option>
              <Option value="treasurer">Treasurer</Option>
              <Option value="member">Member</Option>
            </Select>
          </div>
        </div>
      </DialogBody>
      <DialogFooter className="space-x-2">
        <Button variant="text" color="gray" onClick={handleClose}>
          Check student info
        </Button>
        <Button variant="gradient" color="gray" onClick={handleClose}>
          Add student
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
