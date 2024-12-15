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
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Radio,
  Avatar,
} from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

const COUNTRIES = ['Vietnamese'];
const CODES = ['+84'];

export function AddProductDialog({ open, handleClose, student }) {

  if (!student) {
    return (
        <Dialog size="sm" open={open} handler={handleClose} className="p-4">
          <DialogHeader className="relative m-0 block">
            <Typography variant="h5" color="blue-gray" className="mb-1">
              Loading...
            </Typography>
          </DialogHeader>
          <DialogBody className="space-y-4 pb-6">
            <Typography variant="small" className="text-center text-blue-gray-600">
              Please wait while the student data is being loaded.
            </Typography>
          </DialogBody>
        </Dialog>
    );
  }

  return (
    <Dialog size="sm" open={open} handler={handleClose} className="p-4">
      <DialogHeader className="relative m-0 block">
        <div className="flex items-center gap-6">
          <div>
            <Typography variant="h5" color="blue-gray" className="mb-1">
              {student.studentName}
            </Typography>
            <Typography variant="small" className="font-normal text-blue-gray-600">
              Student / {student.email}
            </Typography>
          </div>
        </div>
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
        <div className="space-y-4">
          <div className="w-full">
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Name
            </Typography>
            <Input
                color="gray"
                size="lg"
                value = {student.studentName}
                readOnly
                name="name"
                className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900"
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
              Email
            </Typography>
            <Input
                color="gray"
                size="lg"
                value={student.email}
                readOnly
                name="email"
                className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: '!min-w-full',
                }}
                labelProps={{
                  className: 'hidden',
                }}
            />
          </div>
        </div>
        {/*<div className="w-full">*/}
        {/*  <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">*/}
        {/*    Address*/}
        {/*  </Typography>*/}
        {/*  <Input*/}
        {/*    color="gray"*/}
        {/*    size="lg"*/}
        {/*    placeholder="eg. 1234 Main St, New York, NY 10030"*/}
        {/*    name="weight"*/}
        {/*    className="placeholder:opacity-100 focus:!border-t-gray-900"*/}
        {/*    containerProps={{*/}
        {/*      className: '!min-w-full',*/}
        {/*    }}*/}
        {/*    labelProps={{*/}
        {/*      className: 'hidden',*/}
        {/*    }}*/}
        {/*  />*/}
        {/*</div>*/}

        <div className="flex gap-x-4">
          <div className="w-full">
            <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
              Phone Number
            </Typography>
            <Input
                type="tel"
                value={student.phoneNumber}
                readOnly
                className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900"
                labelProps={{
                  className: 'hidden',
                }}
                containerProps={{
                  className: 'min-w-full',
                }}
            />
          </div>
          <div className="w-full">
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Gender
            </Typography>
            <div className="flex gap-10">
              <Radio
                  name="gender"
                  label="Nam"
                  checked={student.gender === 'Nam'}
                  readOnly
                  disabled
              />
              <Radio
                  name="gender"
                  label="Nữ"
                  checked={student.gender === 'Nữ'}
                  readOnly
                  disabled
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-full">
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Birthday
            </Typography>
            <Input
                color="gray"
                size="lg"
                type="date"
                value={student.birthday}
                readOnly
                className="appearance-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900"
                containerProps={{
                  className: '!min-w-full',
                }}
                labelProps={{
                  className: 'hidden',
                }}
            />
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}
