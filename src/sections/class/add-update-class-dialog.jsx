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
import SelectScheduleDialog from './select-schedule-dialog';

export function AddUpdateClassDialog({ open, handleClose }) {
  const [show, setShow] = React.useState(false);

  return (
    <Dialog size="md" open={open} handler={handleClose} className="p-4 overflow-hidden">
      <DialogHeader className="relative m-0 block">
        <Typography variant="h4" color="blue-gray">
          Create your class
        </Typography>
        <Typography className="mt-1 font-normal text-gray-600">
          Fill in the information below to create a new class.
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
            Class Name
          </Typography>
          <Input
            color="gray"
            size="lg"
            placeholder="Enter your class name"
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

        <div className="flex gap-4">
          <div className="w-full">
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Start Date
            </Typography>
            <Input
              color="gray"
              size="lg"
              type="date"
              placeholder="Enter the start date"
              name="startDate"
              className="placeholder:opacity-100 focus:!border-t-gray-900 !border-t-gray-400"
              containerProps={{
                className: '!min-w-full',
              }}
              labelProps={{
                className: 'hidden',
              }}
            />
          </div>
          <div className="w-full">
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              End Date
            </Typography>
            <Input
              color="gray"
              size="lg"
              type="date"
              placeholder="Enter the end date"
              name="endDate"
              className="placeholder:opacity-100 focus:!border-t-gray-900 !border-t-gray-400"
              containerProps={{
                className: '!min-w-full ',
              }}
              labelProps={{
                className: 'hidden',
              }}
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

      <SelectScheduleDialog show={show} setShow={setShow} />

      <DialogFooter>
        <Button variant="outlined" className="ml-auto" onClick={() => setShow(true)}>
          Set schedule
        </Button>
        <Button className="ml-2" onClick={handleClose}>
          Add class
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
