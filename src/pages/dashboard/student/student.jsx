import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  IconButton,
  Typography,
} from '@material-tailwind/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const memberTableData = [
  {
    img: '/img/team-2.jpeg',
    name: 'John Michael',
    email: 'john@creative-tim.com',
    role: 'member',
    gender: 'Male',
    studentCode: '123456',
    phone: '1234567890',
    date: '23/04/18',
    address: '1234 Street Name, City Name',
    status: 'joined',
  },
  {
    img: '/img/team-1.jpeg',
    name: 'Alexa Liras',
    email: 'alexa@creative-tim.com',
    role: 'class monitor',
    gender: 'Female',
    studentCode: '123456',
    phone: '1234567890',
    date: '11/01/19',
    address: '1234 Street Name, City Name',
    status: 'unjoined',
  },
  {
    img: '/img/team-4.jpeg',
    name: 'Laurent Perrier',
    email: 'laurent@creative-tim.com',
    role: 'member',
    gender: 'Male',
    studentCode: '123456',
    phone: '1234567890',
    date: '19/09/17',
    address: '1234 Street Name, City Name',
    status: 'joined',
  },
  {
    img: '/img/team-3.jpeg',
    name: 'Michael Levi',
    email: 'michael@creative-tim.com',
    role: 'treasurer',
    gender: 'Female',
    studentCode: '123456',
    phone: '1234567890',
    date: '24/12/08',
    address: '1234 Street Name, City Name',
    status: 'unjoined',
  },
  {
    img: '/img/bruce-mars.jpeg',
    name: 'Bruce Mars',
    email: 'bruce@creative-tim.com',
    role: 'deputy class',
    gender: 'Male',
    studentCode: '123456',
    phone: '1234567890',
    date: '04/10/21',
    address: '1234 Street Name, City Name',
    status: 'joined',
  },
  {
    img: '/img/team-2.jpeg',
    name: 'Alexander',
    email: 'alexander@creative-tim.com',
    role: 'member',
    gender: 'Female',
    studentCode: '123456',
    phone: '1234567890',
    date: '14/09/20',
    address: '1234 Street Name, City Name',
    status: 'unjoined',
  },
];

const practiceTableData = [
  {
    className: 'Class 1',
    practiceName: 'Practice 1',
    status: 'ended',
    submittionTime: '12/12/2021 - 10:00 AM',
    startDate: '12/12/2021 - 9:00 AM',
    endDate: '12/12/2021 - 10:00 AM',
    participants: 30,
    numberOfQuestions: 10,
    score: '9/10',
  },
  {
    className: 'Class 2',
    practiceName: 'Practice 2',
    status: 'progress',
    submittionTime: '12/12/2021 - 8:45 PM',
    startDate: '12/12/2021 - 8:00 PM',
    endDate: '12/12/2021 - 9:00 PM',
    participants: 30,
    numberOfQuestions: 10,
    score: '_/10',
  },
  {
    className: 'Class 3',
    practiceName: 'Practice 3',
    status: 'progress',
    submittionTime: '12/12/2021 - 7:50 AM',
    startDate: '12/12/2021 - 7:15 AM',
    endDate: '12/12/2021 - 8:00 AM',
    participants: 30,
    numberOfQuestions: 10,
    score: '_/10',
  },
  {
    className: 'Class 4',
    practiceName: 'Practice 4',
    status: 'progress',
    submittionTime: '12/12/2021 - 4:50 PM',
    startDate: '12/12/2021 - 3:15 PM',
    endDate: '12/12/2021 - 5:00 PM',
    participants: 30,
    numberOfQuestions: 10,
    score: '_/10',
  },
  {
    className: 'Class 5',
    practiceName: 'Practice 5',
    status: 'progress',
    submittionTime: '12/12/2021 - 10:00 AM',
    startDate: '12/12/2021 - 9:00 AM',
    endDate: '12/12/2021 - 11:00 AM',
    participants: 30,
    numberOfQuestions: 10,
    score: '_/10',
  },
];

export default function Student() {
  const [invite, setInvite] = React.useState(false);
  const [dele, setDele] = React.useState(false);
  const [view, setView] = React.useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="mt-12 flex items-center justify-between ">
        <Button variant="outlined" className="flex items-center gap-3" onClick={() => navigate(-1)}>
          <ArrowLeftIcon className="w-5 h-5" />
          Back
        </Button>
        <div className="flex gap-x-4 sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-500 rounded-lg w-80 h-10 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for member"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-12 px-4 sm:grid-cols-1  lg:grid-cols-[2fr_minmax(660px,1fr)]">
        <Card className="mt-12">
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              List of member
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <tr>
                  {['stt', 'member name', 'role', 'gender'].map((el) => (
                    <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {memberTableData.map(
                  ({ img, name, email, gender, studentCode, phone, role, address }, key) => {
                    const className = `py-3 px-5 ${
                      key === memberTableData.length - 1 ? '' : 'border-b border-blue-gray-50'
                    }`;

                    return (
                      <tr key={name} className="hover:opacity-70 cursor-pointer">
                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600 pl-[6px]">
                            {key + 1}
                          </Typography>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Avatar src={img} alt={name} size="sm" variant="rounded" />
                            <div>
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-semibold"
                              >
                                {name}
                              </Typography>
                              <Typography className="text-xs font-normal text-blue-gray-500">
                                {email}
                              </Typography>
                            </div>
                          </div>
                        </td>

                        <td className={className}>
                          <Chip
                            size="sm"
                            variant="ghost"
                            value={role}
                            color={role === 'member' ? 'amber' : 'green'}
                            className="py-0.5 px-2 text-[11px] font-medium w-fit capitalize"
                          />
                        </td>

                        <td className={className}>
                          <Typography className="text-xs font-semibold text-blue-gray-600">
                            {gender}
                          </Typography>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-end border-t border-blue-gray-50 p-4 gap-x-2">
            <IconButton variant="outlined" size="sm">
              <ArrowLeftIcon className="w-full h-full" />
            </IconButton>
            <div className="flex items-center gap-2">
              <IconButton variant="outlined" size="sm">
                1
              </IconButton>
              <IconButton variant="text" size="sm">
                2
              </IconButton>
              <IconButton variant="text" size="sm">
                3
              </IconButton>
              <IconButton variant="text" size="sm">
                ...
              </IconButton>
              <IconButton variant="text" size="sm">
                8
              </IconButton>
              <IconButton variant="text" size="sm">
                9
              </IconButton>
              <IconButton variant="text" size="sm">
                10
              </IconButton>
            </div>
            <IconButton variant="outlined" size="sm">
              <ArrowRightIcon className="w-full h-full" />
            </IconButton>
          </CardFooter>
        </Card>

        <Card className="mt-12">
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              List of practice
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 h-full">
            <table className="w-full min-w-[640px] table-auto">
              <thead className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <tr>
                  {['stt', 'practice name', 'start date', 'end date'].map((el) => (
                    <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {practiceTableData.map(({ practiceName, startDate, endDate }, key) => {
                  const className = `py-3 px-5 ${
                    key === memberTableData.length - 1 ? '' : 'border-b border-blue-gray-50'
                  }`;

                  return (
                    <tr
                      key={key}
                      className="hover:opacity-70 cursor-pointer"
                      onClick={() => navigate('/dashboard/practices/Practice 2013')}
                    >
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600 pl-[6px]">
                          {key + 1}
                        </Typography>
                      </td>

                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600 pl-[6px]">
                          {practiceName}
                        </Typography>
                      </td>

                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600 pl-[6px]">
                          {startDate}
                        </Typography>
                      </td>

                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600 pl-[6px]">
                          {endDate}
                        </Typography>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
          <CardFooter className="flex items-center justify-end border-t border-blue-gray-50 p-4 gap-x-2">
            <IconButton variant="outlined" size="sm">
              <ArrowLeftIcon className="w-full h-full" />
            </IconButton>
            <div className="flex items-center gap-2">
              <IconButton variant="outlined" size="sm">
                1
              </IconButton>
              <IconButton variant="text" size="sm">
                2
              </IconButton>
              <IconButton variant="text" size="sm">
                3
              </IconButton>
              <IconButton variant="text" size="sm">
                ...
              </IconButton>
              <IconButton variant="text" size="sm">
                8
              </IconButton>
              <IconButton variant="text" size="sm">
                9
              </IconButton>
              <IconButton variant="text" size="sm">
                10
              </IconButton>
            </div>
            <IconButton variant="outlined" size="sm">
              <ArrowRightIcon className="w-full h-full" />
            </IconButton>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
