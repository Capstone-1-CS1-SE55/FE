import {statisticsChartsData} from '@/data/index.js';
import {
    ArrowDownLeftIcon,
    ArrowLeftCircleIcon,
    ArrowLeftIcon,
    ArrowRightIcon,
    ChatBubbleBottomCenterTextIcon,
    EllipsisVerticalIcon, TrashIcon,
} from '@heroicons/react/24/solid';
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    IconButton,
    Input,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Textarea,
    Typography,
} from '@material-tailwind/react';
import React, {useEffect, useRef, useState} from 'react';
import Chart from 'react-apexcharts';
import {useNavigate, useParams} from 'react-router-dom';
import {getAllQuestionsInAssignment} from "@/service/teacher/Question.jsx";
import {PlusIcon} from "@heroicons/react/24/solid/index.js";
import {DeleteClassDialog} from "@/sections/class/delete-class-dialog.jsx";
import {DeletePracticeDialog} from "@/sections/practice/delete-practice-dialog.jsx";
import {testScoring, updateAssignment} from "@/service/teacher/Assignment.jsx";
import Swal from "sweetalert2";
import {listClassroomByTeacher} from "@/service/teacher/Classroom.jsx";

export default function PracticeDetail() {
    const navigate = useNavigate();
    const {assignmentId, studentId} = useParams();
    const [listQuestions, setListQuestions] = React.useState([]);
    const [startDate, setStartDate] = useState();
    const [dueDate, setDueDate] = useState();
    const [startDate1, setStartDate1] = useState();
    const currentDate = new Date();
    const [errors, setErrors] = useState([]);
    const [errorTitle, setErrorTitle] = useState({});
    const [dele, setDele] = React.useState(false);
    const [assignment, setAssignment] = useState();
    const [classrooms, setClassrooms] = useState([]);
    const [selectedClassrooms, setSelectedClassrooms] = useState([]);
    const [classId, setClassId] = useState();

    const handleCheckboxChange = (classroomId, isChecked) => {
        if (isChecked) {
            setSelectedClassrooms((prev) => [
                ...prev,
                { classroomId: classroomId }
            ]);
        } else {
            setSelectedClassrooms((prev) =>
                prev.filter((item) => item.classroomId !== classroomId)
            );
        }
    };
    console.log(selectedClassrooms)
    // const [listQuiz, setListQuiz] = React.useState([
    //     {
    //         title: 'Quiz 1',
    //         view: '10 views',
    //     },
    //     {
    //         title: 'Quiz 2',
    //         view: '10 views',
    //     },
    //     {
    //         title: 'Quiz 3',
    //         view: '10 views',
    //     },
    //     {
    //         title: 'Quiz 4',
    //         view: '10 views',
    //     },
    // ]);

    const handleGetAllQuestions = async () => {
        const response = await getAllQuestionsInAssignment(assignmentId, studentId);
        if (studentId === undefined) {
            const filteredQuestions = response.map((question) => {
                const {score, answerText, ...rest} = question;
                return {...rest};
            });
            setListQuestions(filteredQuestions);
        } else {
            setListQuestions(response);
        }
        setStartDate(new Date(response[0].startDate));
        setStartDate1(response[0].startDate);
        setDueDate(response[0].dueDate);
        setClassId(response[0].classId);
    }
    useEffect(() => {
        handleGetAllQuestions();
        handleListClassroom();
    }, []);

    const handleUpdateQuestion = (index, field, value, max) => {

        setListQuestions((prevQuestions) => {
            const updatedQuestions = [...prevQuestions];
            updatedQuestions[index] = {
                ...updatedQuestions[index],
                [field]: value,
            };
            return updatedQuestions;
        });

        setErrors((prev) => {
            const updatedErrors = Array.isArray(prev) ? [...prev] : [];

            if (!updatedErrors[index]) {
                updatedErrors[index] = {};
            }

            if ((field === 'maxScore' || field === 'score') && isNaN(value)) {
                updatedErrors[index][field] = `score must be a number`;
            } else if (value.trim() === '') {
                updatedErrors[index][field] = `score is required`;
            } else if ((field === 'maxScore' || field === 'score') && value < 0) {
                updatedErrors[index][field] = `score must be greater than 0`;
            } else if ((field === 'score') && value > max) {
                updatedErrors[index][field] = `score must be less than ${max}`;
            } else {
                updatedErrors[index][field] = '';
            }

            return updatedErrors;
        });
    };

    const handleChangeTitle = (e) => {
        const updateTitle = e.target.value;
        setErrorTitle({
            title: updateTitle.trim() === '' ? 'Title is required' : '',
        });

        const updateListQuestion = listQuestions.map((question) => ({
            ...question,
            title: updateTitle,
        }));

        setListQuestions(updateListQuestion);
    };

    const handleDeleteQuestion = (index) => {
        const question = listQuestions[index];
        if (question.questionText) {
            setDele(true);
            setAssignment(question);
        } else {
            const updatedQuestions = listQuestions.filter((_, i) => i !== index);
            setListQuestions(updatedQuestions);
        }
    };

    const handleClickDelete = () => {
        const updatedQuestions = listQuestions.filter(
            (question) => question !== assignment
        );

        setListQuestions(updatedQuestions);
        setAssignment(null);
        setDele(false);
    }

    const handleAddQuestion = () => {
        const newQuestion = {
            assignmentId: assignmentId,
            questionText: '',
            correctAnswer: '',
            maxScore: 0,
        };

        setListQuestions((prevQuestions) => [...prevQuestions, newQuestion]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let hasError = false;
        const newErrors = {};
        const now = new Date();

        if (listQuestions.length > 0) {
            const firstQuestion = listQuestions[0];
            const {startDate, dueDate} = firstQuestion;
            const dateErrors = {};

            if (!startDate) {
                dateErrors.startDate = "Start date is required";
            } else if (new Date(startDate) <= now) {
                dateErrors.startDate = "Start date must be greater than the current date";
            }

            if (!dueDate) {
                dateErrors.dueDate = "Due date is required";
            } else if (startDate && new Date(dueDate) <= new Date(startDate)) {
                dateErrors.dueDate = "Due date must be greater than start date";
            }

            if (Object.keys(dateErrors).length > 0) {
                newErrors[0] = {...newErrors[0], ...dateErrors};
                hasError = true;
            }
        }

        listQuestions.forEach((question, index) => {
            const questionErrors = {};

            if (!question.questionText) {
                questionErrors.questionText = "Question text is required";
            }

            if (!question.correctAnswer) {
                questionErrors.correctAnswer = "Answer is required";
            }

            if (Object.keys(questionErrors).length > 0) {
                newErrors[index] = questionErrors;
                hasError = true;
            }
        });

        if (hasError) {
            setErrors(newErrors);
        } else {
            const isSuccess = await updateAssignment(listQuestions, parseInt(assignmentId), selectedClassrooms);
            if (isSuccess) {
                Swal.fire({
                    icon: "success",
                    title: "Updated Successfully",
                }).then(() => {
                    navigate(`/dashboard/practices/${assignmentId}`);
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Update failed",
                    text: "Something went wrong!",
                });
            }
        }
    };
    console.log(listQuestions);

    const handleScoring = async () => {
        const isSuccess = await testScoring(listQuestions, parseInt(assignmentId), parseInt(studentId));
        if (isSuccess) {
            Swal.fire({
                icon: "success",
                title: "Grading Successfully",
            }).then(() => {
                navigate(`/dashboard/practices/${assignmentId}`);
            });
        } else {
            await Swal.fire({
                icon: "error",
                title: "Grading failed",
                text: "Something went wrong!",
            });
        }
    }

    const handleResetDates = () => {
        setListQuestions((prevQuestions) =>
            prevQuestions.map((question) => ({
                ...question,
                startDate: "",
                dueDate: "",
            }))
        );
        setStartDate1("");
        setDueDate("");
    };

    const handleDateChange = (field, value) => {
        const now = new Date();
        const newErrors = {...errors};

        if (field === 'startDate') {
            if (!value || new Date(value) <= now) {
                newErrors[0] = {
                    ...newErrors[0],
                    startDate: "Start date must be greater than the current date.",
                };
            } else {
                // Xóa lỗi nếu không còn lỗi
                if (newErrors[0]) delete newErrors[0].startDate;
            }
        }

        if (field === 'dueDate') {
            const startDate = listQuestions[0]?.startDate;
            if (!value || (startDate && new Date(value) <= new Date(startDate))) {
                newErrors[0] = {
                    ...newErrors[0],
                    dueDate: "Due date must be greater than start date.",
                };
            } else {
                // Xóa lỗi nếu không còn lỗi
                if (newErrors[0]) delete newErrors[0].dueDate;
            }
        }

        setErrors(newErrors);

        setListQuestions((prevQuestions) =>
            prevQuestions.map((question, index) =>
                index === 0
                    ? {
                        ...question,
                        [field]: value,
                    }
                    : question
            )
        );

        if (field === 'startDate') {
            setStartDate1(value);
        } else if (field === 'dueDate') {
            setDueDate(value);
        }
    };

    const handleListClassroom = async () => {
        const data = await listClassroomByTeacher();
        setClassrooms(data)
    }

    if (!listQuestions) return null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/*Phần bên trái*/}
            <Card className="col-span-2 bg-white rounded-lg shadow-md border border-blue-gray-100">
                <CardBody className="p-4 relative">
                    <div className="flex items-center justify-between">
                        <Button
                            size="sm"
                            variant="text"
                            className="flex items-center gap-x-2"
                            onClick={() => {
                                navigate(-1);
                            }}
                        >
                            Back
                        </Button>
                        <div className="w-full h-[1px] bg-blue-gray-200"/>
                        <div className="relative">
                            {(startDate < currentDate) ?
                                <Typography
                                    variant="h5"
                                    className="whitespace-nowrap border-[1px] border-gray-400 rounded-lg px-3 py-1"
                                >
                                    {listQuestions[0]?.title ? listQuestions[0].title : 'Practice name'}
                                </Typography>
                                :
                                <input
                                    type="text"
                                    value={listQuestions[0]?.title}
                                    onChange={handleChangeTitle}
                                    className="whitespace-nowrap border-[1px] border-gray-400 rounded-lg px-3 py-1"
                                />
                            }
                            {errorTitle.title &&
                                <div className="text-red-500 text-sm mt-1 absolute">{errorTitle.title}</div>
                            }
                        </div>
                        <div className="w-[60px] h-[1px] bg-blue-gray-200"/>
                        {!(startDate < currentDate) &&
                            <Button
                                size="sm"
                                variant="gradient"
                                className="flex items-center gap-x-2 whitespace-nowrap min-w-fit"
                                onClick={handleAddQuestion}
                            >
                                <PlusIcon className="w-5 h-5"/>
                                Add question
                            </Button>
                        }
                    </div>

                    <div className="mt-10 flex flex-col gap-y-12">
                        {listQuestions.map((question, index) => (
                            <div className="flex flex-col gap-y-4" key={index}>
                                <div className="flex items-center space-x-4 mb-4">
                                    <Typography
                                        className="block text-sm font-semibold text-blue-gray-500 whitespace-nowrap ml-4">
                                        {`Question ${index + 1}`}
                                    </Typography>
                                    <div className="relative flex items-center ">
                                        <Input
                                            size="md"
                                            label="score"
                                            value={question.maxScore ?? question.score}
                                            containerProps={{className: 'input-score'}}
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                if (question.maxScore !== undefined && question.maxScore !== null) {
                                                    handleUpdateQuestion(index, 'maxScore', value);
                                                } else {
                                                    handleUpdateQuestion(index, 'score', value, question.max);
                                                }
                                            }}
                                            readOnly={(new Date(question.startDate) < currentDate) && question.score === undefined}
                                            disabled={(new Date(question.startDate) < currentDate) && question.score === undefined}
                                        />
                                        {errors[index]?.maxScore && (
                                            <div
                                                className="absolute left-0 top-full mt-1 text-red-500 text-sm whitespace-nowrap break-words w-full">
                                                {errors[index].maxScore}
                                            </div>
                                        )}
                                        {errors[index]?.score && !question.maxScore && (
                                            <div
                                                className="absolute left-0 top-full mt-1 text-red-500 text-sm whitespace-nowrap break-words w-full">
                                                {errors[index].score}
                                            </div>
                                        )}
                                        {question.max !== undefined && (
                                            <p className="ml-2 text-ellipsis overflow-hidden whitespace-nowrap">({question.max} điểm)</p>
                                        )}
                                    </div>
                                    <div className="w-full h-[1px] bg-blue-gray-200"/>

                                    {!(startDate < currentDate) &&
                                        <button
                                            onClick={() => handleDeleteQuestion(index)}
                                            className="border border-transparent text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-md focus:outline-none ml-4"
                                            aria-label="Delete question"
                                        >
                                            <TrashIcon className="h-5 w-5"/>
                                        </button>
                                    }

                                </div>
                                <div>
                                    <Textarea
                                        rows={2}
                                        label="Question"
                                        value={question.questionText}
                                        onChange={(e) => handleUpdateQuestion(index, 'questionText', e.target.value)}
                                        className="h-auto min-h-[4rem]"
                                        readOnly={new Date(question.startDate) < currentDate}
                                        disabled={new Date(question.startDate) < currentDate}
                                    />
                                    {errors[index]?.questionText && (
                                        <div className="text-red-500 text-sm">{errors[index].questionText}</div>
                                    )}
                                </div>
                                <div>
                                    {question.answerText ? (
                                        <Textarea
                                            rows={5}
                                            label="Answer"
                                            value={question.answerText}
                                            className="h-auto min-h-[4rem]"
                                            readOnly
                                            disabled
                                        />
                                    ) : (
                                        <Textarea
                                            rows={5}
                                            label="Answer"
                                            value={question.correctAnswer}
                                            className="h-auto min-h-[4rem]"
                                            onChange={(e) => {
                                                handleUpdateQuestion(index, 'correctAnswer', e.target.value);
                                            }}
                                        />
                                    )}
                                    {errors[index]?.correctAnswer && (
                                        <div className="text-red-500 text-sm">{errors[index].correctAnswer}</div>
                                    )}
                                    {errors[index]?.answerText && !question.correctAnswer && (
                                        <div className="text-red-500 text-sm">{errors[index].answerText}</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardBody>
            </Card>

            {/*Phần bên phải*/}
            <div className="relative col-span-1 bg-white rounded-lg shadow-md px-2 flex flex-col gap-4">
                <div className="flex flex-col gap-6">

                    <div>
                        <label
                            htmlFor="createdDate"
                            className="block text-sm font-medium text-gray-700 my-2"
                        >
                            Thời gian làm bài
                        </label>
                        <input
                            type="datetime-local"
                            id="createdDate"
                            value={startDate1}
                            onChange={(e) => handleDateChange("startDate", e.target.value)}
                            disabled={startDate < currentDate}
                            className="block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm px-4 py-2 transition duration-200"
                        />
                        {errors[0]?.startDate && (
                            <div className="text-red-500 text-sm mt-1">{errors[0].startDate}</div>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="deadline"
                            className="block text-sm font-medium text-gray-700 mb-2"
                        >
                            Thời gian kết thúc
                        </label>
                        <input
                            type="datetime-local"
                            id="deadline"
                            value={dueDate}
                            disabled={startDate < currentDate}
                            className="block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm px-4 py-2 transition duration-200"
                            onChange={(e) => handleDateChange("dueDate", e.target.value)}
                        />
                        {errors[0]?.dueDate && (
                            <div className="text-red-500 text-sm mt-1">{errors[0].dueDate}</div>
                        )}
                    </div>
                </div>

                {!(startDate < currentDate) && (
                    <button
                        className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
                        onClick={(e) => {
                            e.preventDefault();
                            handleResetDates();
                        }}
                    >
                        Reset date
                    </button>
                )}
                {classId !== null ? (
                    <p></p>
                ) : (
                    !(startDate < currentDate) && (
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 mb-2">
                                Danh sách lớp ({selectedClassrooms.length}/{classrooms.length})
                            </h3>
                            {classrooms.length === 0 ? (
                                <div className="text-gray-500 text-sm">Bạn chưa có lớp nào</div>
                            ) : (
                                <div className="grid grid-cols-2 gap-4 bg-white shadow-md pl-6 pr-6 pb-3 pt-3 rounded-lg">
                                    {classrooms.map((classItem) => (
                                        <label
                                            key={classItem.classroomId}
                                            className="flex items-center space-x-2 text-gray-700 text-sm"
                                        >
                                            <input
                                                type="checkbox"
                                                value={classItem.classroomId}
                                                checked={selectedClassrooms.some(
                                                    (item) => item.classroomId === classItem.classroomId
                                                )}
                                                onChange={(e) =>
                                                    handleCheckboxChange(classItem.classroomId, e.target.checked)
                                                }
                                                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                            />
                                            <span>{classItem.classroomName}</span>
                                        </label>
                                    ))}
                                </div>
                            )}
                        </div>
                    )
                )}
                <div className="flex flex-col items-end">
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed"
                        disabled={Object.values(errors).some((questionErrors) =>
                            Object.values(questionErrors || {}).some((error) => error != null && error !== '')
                        ) || errorTitle.title || listQuestions.length === 0
                        }
                        onClick={(e) => {
                            if (studentId === undefined || studentId === null) {
                                handleSubmit(e);
                            } else {
                                handleScoring(e);
                            }
                        }}
                    >
                        Submit
                    </button>
                </div>
            </div>

            {/*<div className="sticky top-0 max-h-fit">*/}
            {/*<Card className="mb-6 lg:mx-4 border border-blue-gray-100 max-h-fit">*/}
            {/*    <CardBody className="p-4">*/}
            {/*        <div>*/}
            {/*            <div className="flex items-center justify-between mb-2">*/}
            {/*                <Typography variant="h6" className="whitespace-nowrap ">*/}
            {/*                    Top test access*/}
            {/*                </Typography>*/}
            {/*                <Button*/}
            {/*                    size="sm"*/}
            {/*                    variant="text"*/}
            {/*                    className="flex items-center gap-x-2 whitespace-nowrap"*/}
            {/*                >*/}
            {/*                    See all*/}
            {/*                </Button>*/}
            {/*            </div>*/}
            {/*            <div className="w-full h-[1px] bg-blue-gray-200"/>*/}
            {/*        </div>*/}

            {/*        <div className="mt-4 flex flex-col gap-y-4">*/}
            {/*            {listQuiz.map((quiz, index) => (*/}
            {/*                <QuizItem key={index} {...quiz} no={index + 1}/>*/}
            {/*            ))}*/}
            {/*        </div>*/}
            {/*    </CardBody>*/}
            {/*</Card>*/}
            {/*</div>*/}
            <DeletePracticeDialog open={dele} handleClose={() => setDele(false)} assignment={assignment}
                                  handleClickDelete={handleClickDelete}/>
        </div>
    )
}

export function CreateQuestion({
                                   question, answer, score, no, handleUpdateQuestion, handleDeleteQuestion = () => {
    }
                               }) {
    return (
        <div className="flex flex-col gap-y-4">
            <div className="flex items-center space-x-4 mb-4">
                <Typography className="block text-sm font-semibold text-blue-gray-500 whitespace-nowrap ml-4">
                    {`Question ${no}`}
                </Typography>
                <Input
                    size="md"
                    label="score"
                    value={score}
                    containerProps={{className: 'input-score'}}
                    onChange={(e) => handleUpdateQuestion(no - 1, 'score', e.target.value)}
                />
                <div className="w-full h-[1px] bg-blue-gray-200"/>
                <button
                    onClick={() => handleDeleteQuestion(no - 1)}
                    className="border border-transparent text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-md focus:outline-none ml-4"
                    aria-label="Delete question"
                >
                    <TrashIcon className="h-5 w-5"/>
                </button>
            </div>
            <Textarea
                rows={2}
                label="Question"
                value={question}
                onChange={(e) => handleUpdateQuestion(no - 1, 'question', e.target.value)}
                className="h-auto min-h-[4rem]"
            />
            <Textarea
                rows={5}
                label="Answer"
                value={answer}
                onChange={(e) => handleUpdateQuestion(no - 1, 'answer', e.target.value)}
            />
        </div>
    );
}

// function QuizItem({no, title, view}) {
//     return (
//         <div className="flex gap-x-4 items-center justify-start">
//             <Typography variant="lead">{no}</Typography>
//             <ChatBubbleBottomCenterTextIcon className="w-12 h-12 text-light-blue-600"/>
//             <div className="flex flex-col">
//                 <Typography variant="h6">{title}</Typography>
//                 <Typography>{view}</Typography>
//             </div>
//         </div>
//     );
// }
