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

export function StudentInfoDialog({ open, handleClose }) {
  const [country, setCountry] = React.useState(0);

  return (
    <Dialog size="sm" open={open} handler={handleClose} className="p-4">
      <DialogHeader className="relative m-0 block">
        <div className="flex items-center gap-6">
          <Avatar
            src="/img/bruce-mars.jpeg"
            alt="bruce-mars"
            size="xl"
            variant="rounded"
            className="rounded-lg shadow-lg shadow-blue-gray-500/40"
          />
          <div>
            <Typography variant="h5" color="blue-gray" className="mb-1">
              Richard Davis
            </Typography>
            <Typography variant="small" className="font-normal text-blue-gray-600">
              Teacher / richarddavis@gmail.com
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
        <div className="flex gap-x-4">
          <div className="w-full">
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Name
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="Student name"
              name="name"
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              containerProps={{
                className: '!min-w-full',
              }}
              labelProps={{
                className: 'hidden',
              }}
              readOnly
            />
          </div>
          <div className="w-full">
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Email
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="Student email"
              name="name"
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              containerProps={{
                className: '!min-w-full',
              }}
              labelProps={{
                className: 'hidden',
              }}
              readOnly
            />
          </div>
        </div>
        <div>
          <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
            Role
          </Typography>
          <Input
            name="role"
            labelProps={{
              className: 'hidden',
            }}
            className="!border-t-gray-400 focus:!border-t-gray-900"
            value="Student"
            readOnly
          />
        </div>

        <div className="w-full">
          <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
            Address
          </Typography>
          <Input
            color="gray"
            size="lg"
            placeholder="eg. 1234 Main St, New York, NY 10030"
            name="weight"
            className="placeholder:opacity-100 focus:!border-t-gray-900"
            containerProps={{
              className: '!min-w-full',
            }}
            labelProps={{
              className: 'hidden',
            }}
            readOnly
          />
        </div>

        <div className="flex gap-x-4">
          <div className="w-full">
            <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
              Phone Number
            </Typography>
            <div className="relative flex w-full">
              <Menu placement="bottom-start">
                <MenuHandler>
                  <Button
                    ripple={false}
                    variant="text"
                    color="blue-gray"
                    className="h-10 w-14 shrink-0 rounded-r-none border border-r-0 border-blue-gray-200 bg-transparent px-3"
                  >
                    {CODES[country]}
                  </Button>
                </MenuHandler>
                <MenuList className="max-h-[20rem] max-w-[18rem]">
                  {COUNTRIES.map((country, index) => {
                    return (
                      <MenuItem key={country} value={country} onClick={() => setCountry(index)}>
                        {country}
                      </MenuItem>
                    );
                  })}
                </MenuList>
              </Menu>
              <Input
                type="tel"
                pattern="[0-9]*"
                inputMode="numeric"
                maxLength={12}
                placeholder="324-456-2323"
                className="appearance-none rounded-l-none !border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                labelProps={{
                  className: 'before:content-none after:content-none',
                }}
                containerProps={{
                  className: 'min-w-0',
                }}
                readOnly
              />
            </div>
          </div>
          <div className="w-full">
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Gender
            </Typography>
            <div className="flex gap-10">
              <Radio name="gender" label="Male" defaultChecked readOnly />
              <Radio name="gender" label="Female" readOnly />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-full">
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Student code
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="eg. <8.8oz | 250g"
              name="code"
              className="placeholder:opacity-100 focus:!border-t-gray-900"
              containerProps={{
                className: '!min-w-full',
              }}
              labelProps={{
                className: 'hidden',
              }}
              readOnly
            />
          </div>
          <div className="w-full">
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              School year
            </Typography>
            <Input
              color="gray"
              size="lg"
              type="date"
              className="placeholder:opacity-100 focus:!border-t-gray-900 border-t-gray-400"
              containerProps={{
                className: '!min-w-full',
              }}
              labelProps={{
                className: 'hidden',
              }}
              readOnly
            />
          </div>
        </div>
      </DialogBody>
    </Dialog>
  );
}
