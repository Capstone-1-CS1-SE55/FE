import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {pageGetAssignmentOfClass} from "@/service/student/ClassStudent.jsx";
import {Button, Card, CardBody, CardFooter, CardHeader, Chip, Typography} from "@material-tailwind/react";
import {ArrowLeftIcon} from "@heroicons/react/24/solid/index.js";
import moment from "moment/moment.js";

export default function PracticeInClass() {
    const {classId} = useParams();
    const navigate = useNavigate();

    const [assignments, setAssignments] = useState([]);
    const [currentPageAssignment, setCurrentPageAssignment] = useState(0);
    const [totalPagesAssignment, setTotalPagesAssignment] = useState(0);

    useEffect(() => {
        pageAssignments();
    }, [currentPageAssignment]);
    const pageAssignments = async () => {
        const data = await pageGetAssignmentOfClass(classId, currentPageAssignment);
        setAssignments(data.content);
        setTotalPagesAssignment(data.totalPages);
    }
    const handlePageChangeAssignment = (page) => {
        if (page >= 0 && page < totalPagesAssignment) {
            setCurrentPageAssignment(page);
        }
    };

    const renderPageNumbersAssignment = () => {
        const pageNumbers = [];
        const maxPagesToShow = 5;

        if (totalPagesAssignment <= maxPagesToShow) {
            for (let i = 0; i < totalPagesAssignment; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPageAssignment < 3) {
                pageNumbers.push(0, 1, 2, 3, '...', totalPagesAssignment - 1);
            } else if (currentPageAssignment >= totalPagesAssignment - 3) {
                pageNumbers.push(0, '...', totalPagesAssignment - 4, totalPagesAssignment - 3, totalPagesAssignment - 2, totalPagesAssignment - 1);
            } else {
                pageNumbers.push(0, '...', currentPageAssignment - 1, currentPageAssignment, currentPageAssignment + 1, '...', totalPagesAssignment - 1);
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
                    onClick={() => handlePageChangeAssignment(page)}
                    className={`px-3 py-1 rounded ${
                        currentPageAssignment === page
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
        <>
            <div className="mt-12 flex items-center gap-5">
                <Button variant="outlined" className="flex items-center gap-1" onClick={() => navigate(`/dashboard/class/${classId}`)}>
                    <ArrowLeftIcon className="w-5 h-4"/>
                    Back
                </Button>
            </div>

            <div className="mt-12">
                <Card className="mt-8">
                    <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                        <Typography variant="h6" color="white">
                            List of practice
                        </Typography>
                    </CardHeader>
                    <CardBody className="overflow-x-scroll px-0 pt-0 pb-2 h-full">
                        <table className="w-full min-w-[640px] table-auto">
                            <thead className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <tr>
                                {['stt', 'practice name', 'status', 'start date', 'end date', 'score'].map((el) => (
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
                            {assignments.map(({title, startDate, dueDate, assignmentId, status, grade}, key) => {
                                const className = `py-3 px-5 ${
                                    key === assignments.length - 1 ? '' : 'border-b border-blue-gray-50'
                                }`;
                                return (
                                    <tr
                                        key={key}
                                        className={`hover:opacity-70 cursor-pointer`}
                                        onClick={() => {
                                            const currentDateTime = new Date();
                                            const startDateTime = new Date(startDate);

                                            if (startDateTime <= currentDateTime && status !== 'Đã nộp') {
                                                navigate(`/dashboard/practices/${assignmentId}`);
                                            }
                                        }}
                                    >
                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600 pl-[6px]">
                                                {key + 1}
                                            </Typography>
                                        </td>

                                        <td className={className}>
                                            <Typography className="text-sm font-semibold text-blue-gray-600 pl-[6px]">
                                                {title}
                                            </Typography>
                                        </td>

                                        <td className={className}>
                                            <Chip
                                                size="sm"
                                                variant="ghost"
                                                value={status}
                                                color={status === 'Chưa làm' ? 'amber' : 'green'}
                                                className="py-0.5 px-2 text-[11px] font-medium w-fit capitalize"
                                            />
                                        </td>

                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600 pl-[6px]">
                                                {moment(startDate).format('DD/MM/YYYY - h:mm A')}
                                            </Typography>
                                        </td>

                                        <td className={className}>
                                            <Typography className="text-xs font-semibold text-blue-gray-600 pl-[6px]">
                                                {moment(dueDate).format('DD/MM/YYYY - h:mm A')}
                                            </Typography>
                                        </td>

                                        <td className={className}>
                                            <Typography className="text-sm font-semibold text-blue-gray-600 pl-[6px]">
                                                {grade === null ? 0 : grade}
                                            </Typography>
                                        </td>

                                    </tr>
                                );
                            })}
                            </tbody>
                        </table>
                    </CardBody>
                    <CardFooter className="flex items-center justify-end border-t border-blue-gray-50 p-4 gap-x-2">
                        <div className="flex justify-center mt-4 space-x-2">
                            <button
                                onClick={() => handlePageChangeAssignment(currentPageAssignment - 1)}
                                disabled={currentPageAssignment === 0}
                                className="px-3 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded disabled:opacity-50"
                            >
                                Previous
                            </button>
                            {renderPageNumbersAssignment()}
                            <button
                                onClick={() => handlePageChangeAssignment(currentPageAssignment + 1)}
                                disabled={currentPageAssignment === totalPagesAssignment - 1}
                                className="px-3 py-1 bg-gray-200 text-gray-700 hover:bg-gray-300 rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </>
    )
}