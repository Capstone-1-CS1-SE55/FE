import {AddUpdateClassDialog} from '@/sections/class/add-update-class-dialog.jsx';
import {DeleteClassDialog} from '@/sections/class/delete-class-dialog.jsx';
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    DocumentPlusIcon,
    EyeIcon,
    PencilIcon,
    PlusCircleIcon,
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
import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import ReactPaginate from "react-paginate";
import {pageClassroomsByTeacherId} from "@/service/teacher/Classroom.jsx";
import {getUsernameFromToken} from "@/service/Token.jsx";
import {AddClassDialog} from "@/sections/class/add-class-dialog.jsx";
import moment from "moment";

export default function Class() {
    const [open, setOpen] = React.useState(false);
    const [open2, setOpen2] = React.useState(false);
    const [dele, setDele] = React.useState(false);
    const navigate = useNavigate();

    const [selectedClassroom, setSelectedClassroom] = useState(null);

    const handleOpenDialog = (classroom) => {
        setSelectedClassroom(classroom);
        setOpen(true);
    };

    const handleClassroomId = (classroom) => {
        setSelectedClassroom(classroom);
        setDele(true);
    }

    const [classrooms, setClassrooms] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [classroomName, setClassroomName] = useState('');

    useEffect(() => {
        pageClassrooms();
    }, [currentPage, classroomName]);
    const pageClassrooms = async () => {
        const data = await pageClassroomsByTeacherId(classroomName, currentPage);
        setClassrooms(data.content);
        setTotalPages(data.totalPages);
    }
    const handleSearch = (e) => {
        setClassroomName(e.target.value);
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

    const handleSeen = (id) => {
        navigate(`/dashboard/class/${id}`)
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
                            placeholder="Search for classes"
                            onChange={handleSearch}
                            value={classroomName}
                        />
                    </div>

                    <Button className="flex items-center gap-3" onClick={() => setOpen2(true)}>
                        <PlusIcon className="w-5 h-5"/>
                        Add new class
                    </Button>
                </div>
                <Card className="mt-8">
                    <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
                        <Typography variant="h6" color="white">
                            Class List
                        </Typography>
                    </CardHeader>
                    <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">

                        <table className="w-full min-w-[640px] table-auto">
                            <thead className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                            <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input
                                            id="checkbox-all-search"
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor="checkbox-all-search" className="sr-only">
                                            checkbox
                                        </label>
                                    </div>
                                </th>
                                {['stt', 'class name', 'number', 'created date', ''].map((el) => (
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
                            {classrooms.map((classroom, index) => {
                                const {classroomName, quantity, createdDate} = classroom;
                                const className = `py-3 px-5 ${index === classrooms.length - 1 ? '' : 'border-b border-blue-gray-50'}`;

                                return (
                                    <tr key={classroomName} className="hover:opacity-60 cursor-pointer"
                                        onClick={() => handleSeen(classroom.classroomId)}
                                    >
                                        <th scope="col" className="p-4">
                                            <div className="flex items-center">
                                                <input
                                                    id={`checkbox-${index}`}
                                                    type="checkbox"
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                />
                                                <label htmlFor={`checkbox-${index}`} className="sr-only">
                                                    checkbox
                                                </label>
                                            </div>
                                        </th>
                                        <td className={className}>
                                            <div className="flex items-center gap-4">
                                                <Typography variant="small" color="blue-gray" className="font-bold">
                                                    {index + 1}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={className}>
                                            <div className="flex items-center gap-4">
                                                <Typography variant="small" color="blue-gray" className="font-bold">
                                                    {classroomName}
                                                </Typography>
                                            </div>
                                        </td>
                                        <td className={className}>
                                            <Typography
                                                variant="small"
                                                className="text-xs font-medium text-blue-gray-600"
                                            >
                                                {`${quantity} members`}
                                            </Typography>
                                        </td>
                                        <td className={className}>
                                            <Typography
                                                variant="small"
                                                className="text-xs font-medium text-blue-gray-600"
                                            >
                                                {moment(createdDate).format("DD/MM/yyyy")}
                                            </Typography>
                                        </td>
                                        <td className={`${className} min-w-[110px] max-w-[120px]`}>
                                            <IconButton
                                                variant="text"
                                                className="rounded-full"
                                                onClick={() => handleSeen(classroom.classroomId)}
                                            >
                                                <EyeIcon strokeWidth={2} className="h-5 w-5 text-inherit"/>
                                            </IconButton>
                                            <IconButton
                                                variant="text"
                                                className="rounded-full"
                                                onClick={() => handleOpenDialog(classroom)}
                                            >
                                                <PencilIcon strokeWidth={2} className="h-5 w-5 text-inherit"/>
                                            </IconButton>
                                            <IconButton
                                                variant="text"
                                                className="rounded-full"
                                                onClick={() => handleClassroomId(classroom)}
                                            >
                                                <TrashIcon strokeWidth={2} className="h-5 w-5 text-red-600"/>
                                            </IconButton>
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
            <AddUpdateClassDialog open={open} handleClose={() => setOpen(false)} classroom={selectedClassroom}/>
            <DeleteClassDialog open={dele} handleClose={() => setDele(false)} classroom={selectedClassroom}/>
            <AddClassDialog open={open2} handleClose={() => setOpen2(false)} pageClassrooms = {() => pageClassrooms()}></AddClassDialog>
        </>
    );
}
