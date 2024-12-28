import { Card, CardBody, Avatar, Typography, Tooltip, Input } from '@material-tailwind/react';
import {
  PencilIcon,
  BellIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  LockOpenIcon,
  BanknotesIcon,
} from '@heroicons/react/24/solid';
import { ProfileInfoCard } from '@/widgets/cards';
import React from 'react';

const scheduleData = [
  {
    icon: BellIcon,
    color: 'text-blue-gray-300',
    title: '$2400, Design changes',
    description: '22 DEC 7:20 PM',
  },
  {
    icon: PlusCircleIcon,
    color: 'text-blue-gray-300',
    title: 'New order #1832412',
    description: '21 DEC 11 PM',
  },
  {
    icon: ShoppingCartIcon,
    color: 'text-blue-gray-300',
    title: 'Server payments for April',
    description: '21 DEC 9:34 PM',
  },
  {
    icon: CreditCardIcon,
    color: 'text-blue-gray-300',
    title: 'New card added for order #4395133',
    description: '20 DEC 2:20 AM',
  },
  {
    icon: LockOpenIcon,
    color: 'text-blue-gray-300',
    title: 'Unlock packages for development',
    description: '18 DEC 4:54 AM',
  },
  {
    icon: BanknotesIcon,
    color: 'text-blue-gray-300',
    title: 'New order #9583120',
    description: '17 DEC',
  },
];

export function AccountSetting() {
  return (
    <>
      <div className="relative mt-8 h-12 overflow-hidden rounded-xl bg-cover	bg-center"></div>
      <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
        <CardBody className="p-4">
          <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
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
                  Admin / admin@gmail.com
                </Typography>
              </div>
            </div>
          </div>

          <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-2">
            <div>
              <Typography variant="h6" color="blue-gray" className="mb-3">
                Edit profile
              </Typography>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2 items-center">
                  <div className="w-full h-[1px] bg-blue-gray-200" />
                  <Typography className="block text-xs font-semibold uppercase text-blue-gray-500">
                    Account
                  </Typography>
                </div>
                <div>
                  <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                    Your email
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="name@mail.com"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: 'before:content-none after:content-none',
                    }}
                  />
                </div>
                <div>
                  <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                    Password
                  </Typography>
                  <Input
                    type="password"
                    size="lg"
                    placeholder="********"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: 'before:content-none after:content-none',
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <div className="flex gap-2 items-center">
                  <div className="w-full h-[1px] bg-blue-gray-200" />
                  <Typography className="block text-xs font-semibold uppercase text-blue-gray-500 whitespace-nowrap">
                    About me
                  </Typography>
                </div>
                <div>
                  <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                    Fullname
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="Alec M. Thompson"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: 'before:content-none after:content-none',
                    }}
                  />
                </div>
                <div>
                  <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                    Date of Birth
                  </Typography>
                  <Input
                    type="date"
                    size="lg"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: 'before:content-none after:content-none',
                    }}
                  />
                </div>
              </div>
            </div>
            <ProfileInfoCard
              title="Profile Overview"
              description="Hi, I'm Alec Thompson, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
              details={{
                'first name': 'Alec M. Thompson',
                mobile: '(44) 123 1234 123',
                email: 'alecthompson@mail.com',
                location: 'USA',
                social: (
                  <div className="flex items-center gap-4">
                    <i className="fa-brands fa-facebook text-blue-700" />
                    <i className="fa-brands fa-twitter text-blue-400" />
                    <i className="fa-brands fa-instagram text-purple-500" />
                  </div>
                ),
              }}
              action={
                <Tooltip content="Edit Profile">
                  <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                </Tooltip>
              }
            />
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default AccountSetting;
