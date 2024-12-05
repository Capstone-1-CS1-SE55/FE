import { JoinClassDialog } from '@/sections/class/join-class-dialog';
import { LeaveClassDialog } from '@/sections/class/leave-class-dialog';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  EyeIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/solid';
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Progress,
  Tooltip,
  Typography,
} from '@material-tailwind/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const classListTableData = [
  {
    img: '/img/logo-xd.svg',
    name: 'Material XD Version',
    members: [
      { img: '/img/team-1.jpeg', name: 'Romina Hadid' },
      { img: '/img/team-2.jpeg', name: 'Ryan Tompson' },
      { img: '/img/team-3.jpeg', name: 'Jessica Doe' },
      { img: '/img/team-4.jpeg', name: 'Alexander Smith' },
    ],
    budget: '34',
    completion: 60,
    start: '2021-09-01',
    end: '2021-09-30',
    subjectCredit: '3',
    practice: 6,
  },
  {
    img: '/img/logo-atlassian.svg',
    name: 'Add Progress Track',
    members: [
      { img: '/img/team-2.jpeg', name: 'Ryan Tompson' },
      { img: '/img/team-4.jpeg', name: 'Alexander Smith' },
    ],
    budget: '45',
    completion: 10,
    start: '2021-09-01',
    end: '2021-09-30',
    subjectCredit: '3',
    practice: 6,
  },
  {
    img: '/img/logo-slack.svg',
    name: 'Fix Platform Errors',
    members: [
      { img: '/img/team-3.jpeg', name: 'Jessica Doe' },
      { img: '/img/team-1.jpeg', name: 'Romina Hadid' },
    ],
    budget: '23',
    completion: 100,
    start: '2021-09-01',
    end: '2021-09-30',
    subjectCredit: '3',
    practice: 6,
  },
  {
    img: '/img/logo-spotify.svg',
    name: 'Launch our Mobile App',
    members: [
      { img: '/img/team-4.jpeg', name: 'Alexander Smith' },
      { img: '/img/team-3.jpeg', name: 'Jessica Doe' },
      { img: '/img/team-2.jpeg', name: 'Ryan Tompson' },
      { img: '/img/team-1.jpeg', name: 'Romina Hadid' },
    ],
    budget: '45',
    completion: 100,
    start: '2021-09-01',
    end: '2021-09-30',
    subjectCredit: '3',
    practice: 6,
  },
  {
    img: '/img/logo-jira.svg',
    name: 'Add the New Pricing Page',
    members: [{ img: '/img/team-4.jpeg', name: 'Alexander Smith' }],
    budget: '65',
    completion: 25,
    start: '2021-09-01',
    end: '2021-09-30',
    subjectCredit: '3',
    practice: 6,
  },
  {
    img: '/img/logo-invision.svg',
    name: 'Redesign New Online Shop',
    members: [
      { img: '/img/team-1.jpeg', name: 'Romina Hadid' },
      { img: '/img/team-4.jpeg', name: 'Alexander Smith' },
    ],
    budget: '45',
    completion: 40,
    start: '2021-09-01',
    end: '2021-09-30',
    subjectCredit: '3',
    practice: 6,
  },
];

export default function Class() {
  const [open, setOpen] = React.useState(false);
  const [dele, setDele] = React.useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="mt-12">
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
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
              placeholder="Search for classes"
            />
          </div>

          <Button className="flex items-center gap-3" onClick={() => setOpen(true)}>
            <PlusIcon className="w-5 h-5" />
            Join Class
          </Button>
        </div>
        <Card className="mt-8">
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Your Classes
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <tr>
                  {[
                    'stt',
                    'class name',
                    'number',
                    'start date',
                    'end date',
                    'subject credit',
                    'total practice',
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
                {classListTableData.map(
                  ({ img, name, practice, start, end, subjectCredit, budget, completion }, key) => {
                    const className = `py-3 px-5 ${
                      key === classListTableData.length - 1 ? '' : 'border-b border-blue-gray-50'
                    }`;

                    return (
                      <tr
                        key={name}
                        className="hover:opacity-60 cursor-pointer"
                        onClick={() => navigate('123')}
                      >
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Typography variant="small" color="blue-gray" className="font-bold">
                              {key + 1}
                            </Typography>
                          </div>
                        </td>
                        <td className={className}>
                          <div className="flex items-center gap-4">
                            <Typography variant="small" color="blue-gray" className="font-bold">
                              {name}
                            </Typography>
                          </div>
                        </td>

                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {`${budget} members`}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {start}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {end}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {`${subjectCredit} credits`}
                          </Typography>
                        </td>
                        <td className={className}>
                          <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                          >
                            {`${practice} exerrices`}
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
      <JoinClassDialog open={open} handleClose={() => setOpen(false)} />
      <LeaveClassDialog open={dele} handleClose={() => setDele(false)} />
    </>
  );
}
