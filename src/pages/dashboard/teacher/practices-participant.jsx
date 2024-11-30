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

const practiceTableData = [
  {
    img: '/img/team-2.jpeg',
    name: 'John Michael',
    email: 'john@creative-tim.com',
    job: ['Manager', 'Organization'],
    online: 'submitted',
    gender: 'Male',
    studentCode: '123456',
    phone: '1234567890',
    date: '23/04/18',
    score: '90/100',
  },
  {
    img: '/img/team-1.jpeg',
    name: 'Alexa Liras',
    email: 'alexa@creative-tim.com',
    job: ['Programator', 'Developer'],
    online: 'submitted',
    gender: 'Female',
    studentCode: '123456',
    phone: '1234567890',
    date: '11/01/19',
    score: '80/100',
  },
  {
    img: '/img/team-4.jpeg',
    name: 'Laurent Perrier',
    email: 'laurent@creative-tim.com',
    job: ['Executive', 'Projects'],
    online: 'late',
    gender: 'Male',
    studentCode: '123456',
    phone: '1234567890',
    date: '19/09/17',
    score: '70/100',
  },
  {
    img: '/img/team-3.jpeg',
    name: 'Michael Levi',
    email: 'michael@creative-tim.com',
    job: ['Programator', 'Developer'],
    online: 'submitted',
    gender: 'Female',
    studentCode: '123456',
    phone: '1234567890',
    date: '24/12/08',
    score: '60/100',
  },
  {
    img: '/img/bruce-mars.jpeg',
    name: 'Bruce Mars',
    email: 'bruce@creative-tim.com',
    job: ['Manager', 'Executive'],
    online: 'late',
    gender: 'Male',
    studentCode: '123456',
    phone: '1234567890',
    date: '04/10/21',
    score: '50/100',
  },
  {
    img: '/img/team-2.jpeg',
    name: 'Alexander',
    email: 'alexander@creative-tim.com',
    job: ['Programator', 'Developer'],
    online: 'in progress',
    gender: 'Female',
    studentCode: '123456',
    phone: '1234567890',
    date: '14/09/20',
    score: '40/100',
  },
];

export default function PracticesParticipant() {
  const navigate = useNavigate();
  return (
    <div className="mt-12">
      <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-12">
        <Button
          size="sm"
          variant="outlined"
          className="flex items-center gap-3"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
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
            placeholder="Search for student"
          />
        </div>
      </div>

      <Card>
        <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
          <Typography variant="h6" color="white">
            List of participants
          </Typography>
        </CardHeader>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table-auto">
            <thead className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <tr>
                <th scope="col" class="p-4">
                  <div class="flex items-center">
                    <input
                      id="checkbox-all-search"
                      type="checkbox"
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label for="checkbox-all-search" class="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                {[
                  'student name',
                  'status',
                  'gender',
                  'school year',
                  'student code',
                  'phone number',
                  'score',
                ].map((el) => (
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
              {practiceTableData.map(
                ({ img, name, email, gender, studentCode, phone, online, date, score }, key) => {
                  const className = `py-3 px-5 ${
                    key === practiceTableData.length - 1 ? '' : 'border-b border-blue-gray-50'
                  }`;

                  return (
                    <tr
                      key={name}
                      className="hover:opacity-70 cursor-pointer"
                      onClick={() => {
                        navigate(name);
                      }}
                    >
                      <th scope="col" class="p-4">
                        <div class="flex items-center">
                          <input
                            id="checkbox-all-search"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          />
                          <label for="checkbox-all-search" class="sr-only">
                            checkbox
                          </label>
                        </div>
                      </th>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={img} alt={name} size="sm" variant="rounded" />
                          <div>
                            <Typography variant="small" color="blue-gray" className="font-semibold">
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
                          value={online}
                          color={
                            online === 'submitted' ? 'green' : online === 'late' ? 'red' : 'amber'
                          }
                          className="py-0.5 px-2 text-[11px] font-medium w-fit capitalize"
                        />
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {gender}
                        </Typography>
                      </td>

                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {date}
                        </Typography>
                      </td>

                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {studentCode}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {phone}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {score}
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
    </div>
  );
}
