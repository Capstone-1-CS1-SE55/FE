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
import {updateAssignment} from "@/service/teacher/Assignment.jsx";
import Swal from "sweetalert2";

export default function PracticeDetail() {
    const navigate = useNavigate();
    const {assignmentId, studentId} = useParams();
    const [listQuestions, setListQuestions] = React.useState([]);
    const [startDate, setStartDate] = useState();
    const currentDate = new Date();
    const [errors, setErrors] = useState([]);
    const [errorTitle, setErrorTitle] = useState({});
    const [dele, setDele] = React.useState(false);
    const [assignment, setAssignment] = useState();

    const [listQuiz, setListQuiz] = React.useState([
        {
            title: 'Quiz 1',
            view: '10 views',
        },
        {
            title: 'Quiz 2',
            view: '10 views',
        },
        {
            title: 'Quiz 3',
            view: '10 views',
        },
        {
            title: 'Quiz 4',
            view: '10 views',
        },
    ]);

    const handleGetAllQuestions = async () => {
        const response = await getAllQuestionsInAssignment(assignmentId, studentId);
        const filteredQuestions = response.map((question) => {
            const { score, answerText, ...rest } = question;
            return { ...rest };
        });
        setListQuestions(filteredQuestions);
        setStartDate(new Date(response[0].startDate));
    }

    useEffect(() => {
        handleGetAllQuestions();
    }, []);

    const handleUpdateQuestion = (index, field, value) => {

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
                updatedErrors[index][field] = `${field} is required`;
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
        if(question.questionText) {
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
    console.log(listQuestions, parseInt(assignmentId));
    const handleAddQuestion = () => {
        const newQuestion = {
            assignmentId:assignmentId,
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
            const isSuccess = await updateAssignment(listQuestions, parseInt(assignmentId));
            if (isSuccess) {
                setTimeout(() => {
                    Swal.fire({
                        icon: "success",
                        title: "Updated Successfully",
                    }).then(() => {
                        navigate(`/dashboard/tests/${assignmentId}`);
                    });
                }, 500);
            } else {
                setTimeout(() => {
                    Swal.fire({
                        icon: "error",
                        title: "Update failed",
                        text: "Something went wrong!",
                    });
                },1000)
            }
        }
    };


    if (!listQuestions) return null;

    return (
        <div className= "mt-10 grid gap-2 grid-cols-[2fr_minmax(300px,1fr)]">
            <Card className=" mb-6 lg:mx-4 border border-blue-gray-100">
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
                        {errorTitle.title && <div className="text-red-500 text-sm mt-1 absolute">{errorTitle.title}</div>}
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
                                    <div className="relative pr-8">
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
                                                handleUpdateQuestion(index, 'score', value);
                                            }
                                        }}
                                        readOnly={new Date(question.startDate) < currentDate}
                                    />
                                    {errors[index]?.maxScore && (
                                        <div className="text-red-500 text-sm absolute">{errors[index].maxScore}</div>
                                    )}
                                    {errors[index]?.score && !question.maxScore && (
                                        <div className="text-red-500 text-sm absolute">{errors[index].score}</div>
                                    )}
                                    </div>
                                    <div className="w-full h-[1px] bg-blue-gray-200"/>

                                    {!(new Date(question.startDate) < currentDate) &&
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
                                />
                                {errors[index]?.questionText && (
                                    <div className="text-red-500 text-sm">{errors[index].questionText}</div>
                                )}
                                </div>
                                <div>
                                <Textarea
                                    rows={5}
                                    label="Answer"
                                    value={question.correctAnswer ?? question.answerText}
                                    onChange={(e) => {
                                        // const value = e.target.value;
                                        // if (question.correctAnswer !== undefined && question.answerText !== null) {
                                        //     handleUpdateQuestion(index, 'correctAnswer', value);
                                        // } else {
                                        //     handleUpdateQuestion(index, 'answerText', value);
                                        // }
                                        handleUpdateQuestion(index, 'correctAnswer', e.target.value);
                                    }}
                                />
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
                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:text-gray-700 disabled:cursor-not-allowed"
                            disabled={Object.values(errors).some((questionErrors) =>
                                Object.values(questionErrors || {}).some((error) => error != null && error !== '')
                            ) || errorTitle.title || listQuestions.length === 0
                        }
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>

                </CardBody>
            </Card>
            <div className="sticky top-0 max-h-fit">
                <Card className="mb-6 lg:mx-4 border border-blue-gray-100 max-h-fit">
                    <CardBody className="p-4">
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <Typography variant="h6" className="whitespace-nowrap ">
                                    Top test access
                                </Typography>
                                <Button
                                    size="sm"
                                    variant="text"
                                    className="flex items-center gap-x-2 whitespace-nowrap"
                                >
                                    See all
                                </Button>
                            </div>
                            <div className="w-full h-[1px] bg-blue-gray-200"/>
                        </div>

                        <div className="mt-4 flex flex-col gap-y-4">
                            {listQuiz.map((quiz, index) => (
                                <QuizItem key={index} {...quiz} no={index + 1}/>
                            ))}
                        </div>
                    </CardBody>
                </Card>

                <Card className="mb-6 lg:mx-4 border border-blue-gray-100 max-h-fit">
                    <CardBody className="p-4">
                        <div className="flex items-center justify-between mb-2">
                            <Typography variant="h6" className="whitespace-nowrap ">
                                Online time
                            </Typography>
                            <Menu placement="left-start">
                                <MenuHandler>
                                    <IconButton size="sm" variant="text" color="blue-gray">
                                        <EllipsisVerticalIcon strokeWidth={3} fill="currenColor" className="h-6 w-6"/>
                                    </IconButton>
                                </MenuHandler>
                                <MenuList>
                                    <MenuItem>Week</MenuItem>
                                    <MenuItem>Month</MenuItem>
                                    <MenuItem>Year</MenuItem>
                                </MenuList>
                            </Menu>
                        </div>
                        <Chart {...statisticsChartsData[1].chart} />
                    </CardBody>
                </Card>
            </div>
            <DeletePracticeDialog open={dele} handleClose={() => setDele(false)} assignment = {assignment} handleClickDelete = {handleClickDelete}/>
        </div>
    );
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

function QuizItem({no, title, view}) {
    return (
        <div className="flex gap-x-4 items-center justify-start">
            <Typography variant="lead">{no}</Typography>
            <ChatBubbleBottomCenterTextIcon className="w-12 h-12 text-light-blue-600"/>
            <div className="flex flex-col">
                <Typography variant="h6">{title}</Typography>
                <Typography>{view}</Typography>
            </div>
        </div>
    );
}
