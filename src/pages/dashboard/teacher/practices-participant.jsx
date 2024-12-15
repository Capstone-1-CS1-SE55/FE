import {ArrowLeftIcon, ArrowRightIcon} from '@heroicons/react/24/solid';
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
import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {pageClassroomsByTeacherId} from "@/service/teacher/Classroom.jsx";
import {pageGetAllStudentAssignment} from "@/service/teacher/Assignment.jsx";
import moment from "moment";

export default function PracticesParticipant() {
    const navigate = useNavigate();
    const {assignmentId} = useParams();

    const [student, setStudent] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [studentName, setStudentName] = useState('');

    useEffect(() => {
        pageClassrooms();
    }, [currentPage, studentName]);
    const pageClassrooms = async () => {
        const data = await pageGetAllStudentAssignment(assignmentId, studentName, currentPage);
        const filteredStudents = filterStudentsByName(data.content, studentName);
        setStudent(filteredStudents);
        setTotalPages(data.totalPages);
    }
    const filterStudentsByName = (students, studentName) => {
        if (!studentName) return students;
        setCurrentPage(0);
        return students.filter(student =>
            student.studentName.toLowerCase().includes(studentName.toLowerCase())
        );
    };
    console.log(student)
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

    return (
        <div className="mt-12">
            <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-12">
                <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center gap-3">
                <Button
                    size="sm"
                    variant="outlined"
                    className="flex items-center gap-3"
                    onClick={() => navigate(-1)}
                >
                    Back
                </Button>
                <Button
                    size="sm"
                    variant="outlined"
                    className="flex items-center gap-3"
                    onClick={() => navigate(`/dashboard/tests/question/${assignmentId}`)}
                >
                    Question List
                </Button>
                </div>
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
                        placeholder="Search for student"
                        onChange={(e) => setStudentName(e.target.value)}
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
                            {[
                                'STT',
                                'Name',
                                'Status',
                                'Gender',
                                // 'Birthday',
                                // 'Phone number',
                                'Day',
                                'Time',
                                'Score',
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
                        {student.map(
                            ({studentName, email, status, gender, timeToWork, grade, studentId}, key) => {
                                const className = `py-3 px-5 ${
                                    key === student.length - 1 ? '' : 'border-b border-blue-gray-50'
                                }`;

                                return (
                                    <tr
                                        key={studentId}
                                        className="hover:opacity-70 cursor-pointer"
                                        onClick={() => {
                                            navigate(studentId);
                                        }}
                                    >
                                        <td className={className}>
                                            <Typography variant="small" color="blue-gray" className="font-semibold">
                                                {key + 1} {/* Hiển thị số thứ tự */}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <div className="flex items-center gap-4">
                                                <div>
                                                    <Typography variant="small" color="blue-gray"
                                                                className="font-semibold">
                                                        {studentName}
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
                                                value={status}
                                                color={
                                                    status === 'Đã làm' ? 'green' : status === 'Chưa làm' ? 'red' : 'amber'
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
                                                {moment(timeToWork).format('DD/MM/yyyy')}
                                            </Typography>
                                        </td>

                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {moment(timeToWork).hour() * 60 + moment(timeToWork).minute()} phút
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600">
                                                {!grade ? 0 : grade}
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
    );
}
