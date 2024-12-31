import {AddPracticeDialog} from '@/sections/practice/add-practice-dialog.jsx';
import {ArrowLeftIcon, ArrowRightIcon, EyeIcon, PlusIcon} from '@heroicons/react/24/solid';
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip, Dialog, DialogBody, DialogHeader,
    IconButton,
    Typography,
} from '@material-tailwind/react';
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {pageClassroomsByTeacherId} from "@/service/teacher/Classroom.jsx";
import {pageAssignmentOfTeacher} from "@/service/teacher/Practices.jsx";
import moment from "moment";

export default function PracticesList() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);

    const [assignments, setAssignments] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [title, setTitle] = useState('');

    useEffect(() => {
        pageAssignments();
    }, [currentPage, title]);
    const pageAssignments = async () => {
        const data = await pageAssignmentOfTeacher(title, currentPage);
        setAssignments(data.content);
        setTotalPages(data.totalPages);
    }
    const handleSearch = (e) => {
        setTitle(e.target.value);
        setCurrentPage(0); // Đặt lại trang về 0 khi tìm kiếm mới
    };

    const handlePageChange = (page) => {
        if (page >= 0 && page < totalPages) {
            setCurrentPage(page);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;

        if (totalPages <= maxPagesToShow) {
            for (let i = 0; i < totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage < 3) {
                pageNumbers.push(0, 1, 2, 3, '...', totalPages - 1);
            } else if (currentPage >= totalPages - 3) {
                pageNumbers.push(0, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1);
            } else {
                pageNumbers.push(0, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages - 1);
            }
        }

        return pageNumbers.map((page, index) =>
            typeof page === 'string' ? (
                <span key={index} className="px-3 py-1 text-gray-500">
                    {page}
                </span>
            ) : (
                <button
                    key={index}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-1 rounded ${
                        currentPage === page
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    {page + 1}
                </button>
            )
        );
    };

    if (!assignments) {
        return (
            <Dialog size="sm" open={open} handler={handleClose} className="p-4">
                <DialogHeader className="relative m-0 block">
                    <Typography variant="h5" color="blue-gray" className="mb-1">
                        Loading...
                    </Typography>
                </DialogHeader>
                <DialogBody className="space-y-4 pb-6">
                    <Typography variant="small" className="text-center text-blue-gray-600">
                        Please wait while the assignment data is being loaded.
                    </Typography>
                </DialogBody>
            </Dialog>
        );
    }

    return (
        <>
            <div className="mt-12">
                <div
                    className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
                    <div className="relative">
                        <div
                            className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
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
                            placeholder="Search for assignment"
                            onChange={handleSearch}
                        />
                    </div>

                    <Button className="flex items-center gap-3" onClick={() => navigate('/dashboard/tests/assignment')}>
                        <PlusIcon className="w-5 h-5"/>
                        Add new test
                    </Button>
                </div>

                <Card className="mt-12">
                    <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                        <Typography variant="h6" color="white">
                            Test List
                        </Typography>
                    </CardHeader>
                    <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
                        <table className="w-full min-w-[640px] table-auto">
                            <thead className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <tr>
                                {/*<th scope="col" className="p-4">*/}
                                {/*    <div className="flex items-center">*/}
                                {/*        <input*/}
                                {/*            id="checkbox-all-search"*/}
                                {/*            type="checkbox"*/}
                                {/*            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"*/}
                                {/*        />*/}
                                {/*        <label htmlFor="checkbox-all-search" className="sr-only">*/}
                                {/*            checkbox*/}
                                {/*        </label>*/}
                                {/*    </div>*/}
                                {/*</th>*/}
                                <th className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                    <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                        STT
                                    </Typography>
                                </th>
                                {[
                                    'practice name',
                                    'creat date',
                                    'start date',
                                    'end date',
                                    'Class',
                                    '',
                                ].map((el) => (
                                    <th key={el} className="border-b border-blue-gray-50 py-3 px-5 text-left">
                                        <Typography variant="small" className="text-[11px] font-bold uppercase text-blue-gray-400">
                                            {el}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {assignments.map(
                                (
                                    { title, createdDate, dueDate, startDate, classroomName, assignmentId },
                                    index
                                ) => {
                                    const className = `py-3 px-5 ${
                                        index === assignments.length - 1 ? '' : 'border-b border-blue-gray-50'
                                    }`;

                                    return (
                                        <tr key={assignmentId} className="hover:opacity-70 cursor-pointer"
                                            onClick={() => {
                                                navigate(`/dashboard/practices/${assignmentId}`);
                                            }}
                                        >
                                            {/*<th scope="col" className="p-4">*/}
                                            {/*    <div className="flex items-center">*/}
                                            {/*        <input*/}
                                            {/*            id={`checkbox-${index}`}*/}
                                            {/*            type="checkbox"*/}
                                            {/*            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"*/}
                                            {/*        />*/}
                                            {/*        <label htmlFor={`checkbox-${index}`} className="sr-only">*/}
                                            {/*            checkbox*/}
                                            {/*        </label>*/}
                                            {/*    </div>*/}
                                            {/*</th>*/}
                                            <td className={className}>
                                                <Typography variant="small" color="blue-gray" className="font-semibold">
                                                    {index + 1} {/* Hiển thị số thứ tự */}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography variant="small" color="blue-gray" className="text-sm font-semibold">
                                                    {title}
                                                </Typography>
                                            </td>
                                            {/*<td className={className}>*/}
                                            {/*    <Chip*/}
                                            {/*        size="sm"*/}
                                            {/*        variant="ghost"*/}
                                            {/*        value={status}*/}
                                            {/*        color={status === 'ended' ? 'red' : 'green'}*/}
                                            {/*        className="py-0.5 px-2 text-[11px] font-medium w-fit capitalize"*/}
                                            {/*    />*/}
                                            {/*</td>*/}
                                            <td className={className}>
                                                <Typography className="text-sm font-semibold text-blue-gray-600">
                                                    {moment(createdDate).format('DD/MM/YYYY - h:mm A')}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-sm font-semibold text-blue-gray-600">
                                                    {moment(startDate).format('DD/MM/YYYY - h:mm A')}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-sm font-semibold text-blue-gray-600">
                                                    {moment(dueDate).format('DD/MM/YYYY - h:mm A')}
                                                </Typography>
                                            </td>
                                            <td className={className}>
                                                <Typography className="text-sm font-semibold text-blue-gray-600">
                                                    {/*{`${participants} students`}*/}
                                                    {classroomName ? classroomName : "No Class"}
                                                </Typography>
                                            </td>
                                            {/*<td className={className}>*/}
                                            {/*    <Typography className="text-xs font-semibold text-blue-gray-600">*/}
                                            {/*        {`${numberOfQuestions} questions`}*/}
                                            {/*    </Typography>*/}
                                            {/*</td>*/}
                                            {/*<td className={className}>*/}
                                            {/*    <IconButton*/}
                                            {/*        variant="text"*/}
                                            {/*        className="rounded-full"*/}
                                            {/*        onClick={() => {*/}
                                            {/*            navigate(`/dashboard/tests/${assignmentId}`);*/}
                                            {/*        }}*/}
                                            {/*    >*/}
                                            {/*        <EyeIcon strokeWidth={2} className="h-5 w-5 text-inherit" />*/}
                                            {/*    </IconButton>*/}
                                            {/*</td>*/}
                                        </tr>
                                    );
                                }
                            )}
                            </tbody>
                        </table>
                    </CardBody>
                    <CardFooter className="flex items-center justify-end border-t border-blue-gray-50 p-4 gap-x-2">
                        <div className="flex justify-center mt-4 space-x-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 0}
                                className="px-3 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded disabled:opacity-50"
                            >
                                Previous
                            </button>
                            {renderPageNumbers()}
                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages - 1}
                                className="px-3 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </CardFooter>
                </Card>
            </div>

            {/*<AddPracticeDialog open={open} handleClose={() => setOpen(false)}/>*/}
        </>
    );
}
