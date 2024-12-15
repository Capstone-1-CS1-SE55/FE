import {Configurator, DashboardNavbar} from "@/widgets/layout/index.js";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {Button, Input, Textarea, Typography} from "@material-tailwind/react";
import {PlusIcon, TrashIcon} from "@heroicons/react/24/solid/index.js";
import {CreateQuestion} from "@/pages/dashboard/teacher/practice-detail.jsx";
import {addNewClass, listClassroomByTeacher} from "@/service/teacher/Classroom.jsx";
import Swal from "sweetalert2";
import {createNewAssignment} from "@/service/teacher/Assignment.jsx";

function CreateAssignment() {
    const navigate = useNavigate();
    const [classrooms, setClassrooms] = useState([]);
    const [createdAssignment, setCreatedAssignment] = useState({
        title: '',
        startDate: '',
        dueDate: '',
        questions: [
            {
                questionText: '',
                maxScore: '',
                correctAnswer: ''
            }
        ],
        classrooms: []
    })

    const [errors, setErrors] = useState({});

    const validate = (values) => {
        const errors = {};

        if (!values.title) {
            errors.title = "Practice name is required.";
        }

        if (!values.startDate) {
            errors.startDate = "Start date is required.";
        } else if (isNaN(new Date(values.startDate).getTime())) {
            errors.startDate = "Start date is invalid.";
        }

        if (!values.dueDate) {
            errors.dueDate = "Due date is required.";
        } else if (isNaN(new Date(values.dueDate).getTime())) {
            errors.dueDate = "Due date is invalid.";
        } else if (new Date(values.startDate) > new Date(values.dueDate)) {
            errors.dueDate = "Due date must be after start date.";
        }

        if (!values.questions || values.questions.length === 0) {
            errors.questions = "At least one question is required.";
        } else {
            const questionErrors = values.questions.map((question, index) => {
                const qErrors = {};

                if (!question.questionText) {
                    qErrors.questionText = `Question text for question ${index + 1} is required.`;
                }

                if (!question.maxScore || isNaN(parseFloat(question.maxScore))) {
                    qErrors.maxScore = `Valid max score for question ${index + 1} is required.`;
                } else if (parseFloat(question.maxScore) <= 0) {
                    qErrors.maxScore = `Max score for question ${index + 1} must be greater than 0.`;
                }

                if (!question.correctAnswer) {
                    qErrors.correctAnswer = `Correct answer for question ${index + 1} is required.`;
                }

                return qErrors;
            });

            if (questionErrors.some((q) => Object.keys(q).length > 0)) {
                errors.questions = questionErrors;
            }
        }

        if (!values.classrooms || values.classrooms.length === 0) {
            errors.classrooms = "At least one classroom must be selected.";
        } else if (!values.classrooms[0]?.classroomId) {
            errors.classrooms = "Classroom ID is required for selected classrooms.";
        }

        return errors;
    };
    const handleInputChange = (field, value, index = null, subField = null) => {
        setCreatedAssignment((prev) => {
            if (field === "questions") {
                return {
                    ...prev,
                    questions: prev.questions.map((item, idx) =>
                        idx === index ? {...item, [subField]: value} : item
                    ),
                };
            }

            return {
                ...prev,
                [field]: value,
            };
        });

        setErrors((prev) => {
            const updatedErrors = {...prev};

            let updatedAssignment = {...createdAssignment};

            if (field === "questions") {
                updatedAssignment.questions = updatedAssignment.questions.map((item, idx) =>
                    idx === index ? {...item, [subField]: value} : item
                );
            } else {
                updatedAssignment[field] = value;
            }

            const validationErrors = validate(updatedAssignment);

            if (subField) {
                if (!validationErrors[field]?.[index]?.[subField]) {
                    if (updatedErrors[field]?.[index]) {
                        delete updatedErrors[field][index][subField];
                        if (Object.keys(updatedErrors[field][index]).length === 0) {
                            updatedErrors[field].splice(index, 1);
                        }
                    }
                }
            } else {
                if (!validationErrors[field]) {
                    delete updatedErrors[field];
                }
            }

            return updatedErrors;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate(createdAssignment);
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            const isSuccess = await createNewAssignment(createdAssignment)

            if (isSuccess) {
                    Swal.fire({
                        icon: "success",
                        title: "Created Successfully",
                    }).then(() => {
                        navigate('/dashboard/tests')
                    });
            } else {
                    await Swal.fire({
                        icon: "error",
                        title: "Create failed",
                        text: "Something went wrong!",
                    });
            }
        }
    };

    const handleListClassroom = async () => {
        const data = await listClassroomByTeacher();
        setClassrooms(data)
    }
    console.log(createdAssignment)

    useEffect(() => {
        handleListClassroom()
    }, []);

    const handleCheckboxChange = (id) => {
        const isSelected = createdAssignment.classrooms.some(
            (item) => item.classroomId === id
        );
        let updatedClassrooms;
        if (isSelected) {
            updatedClassrooms = createdAssignment.classrooms.filter(
                (item) => item.classroomId !== id
            );
        } else {
            updatedClassrooms = [...createdAssignment.classrooms, {classroomId: id}];
        }

        setCreatedAssignment((prev) => ({
            ...prev,
            classrooms: updatedClassrooms,
        }));

        setErrors((prev) => {
            const updatedErrors = {...prev};
            if (updatedClassrooms.length > 0) {
                delete updatedErrors.classrooms;
            }
            return updatedErrors;
        });
    };

    const handleAddQuestion = () => {
        setCreatedAssignment((prev) => ({
            ...prev,
            questions: [
                ...prev.questions,
                {questionText: '', maxScore: '', correctAnswer: ''},
            ],
        }));
    };
    const handleDeleteQuestion = (index) => {
        setCreatedAssignment((prev) => ({
            ...prev,
            questions: prev.questions.filter((_, idx) => idx !== index),
        }));
    };


    const handleResetDates = () => {
        setCreatedAssignment((prev) => ({
            ...prev,
            startDate: "",
            dueDate: "",
        }));
    };

    return (
        <>
            <div className="h-auto flex flex-col bg-gray-100">
                <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                    {/* Phần bên trái */}
                    <div className="col-span-2 bg-white rounded-lg shadow-md p-2">
                        <div className="flex items-center justify-between">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 px-2 py-2"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 19l-7-7 7-7"
                                    />
                                </svg>
                                Quay lại
                            </button>
                        </div>
                        <div>
                            <div className="flex items-center justify-between sticky top-0 bg-white z-10 py-0">
                                <Input type="text"
                                       size="md"
                                       label="Practice name"
                                       value={createdAssignment.title}
                                       onChange={(e) => handleInputChange("title", e.target.value)}
                                >
                                </Input>
                                <div className="w-full h-[1px] bg-blue-gray-200"/>
                                <Button
                                    size="sm"
                                    variant="gradient"
                                    className="flex items-center gap-x-2 whitespace-nowrap min-w-fit"
                                    onClick={handleAddQuestion}
                                >
                                    <PlusIcon className="w-5 h-5"/>
                                    Add question
                                </Button>
                            </div>
                            {errors.title && (
                                <span className="text-red-500 text-sm">{errors.title}</span>
                            )}

                            <div className="mt-4 flex flex-col gap-y-12 max-h-[500px] overflow-y-auto pt-1">
                                {createdAssignment.questions.length === 0 ? (
                                    <span className="text-red-500 text-xl">
                                        At least one question is required.
                                    </span>
                                ) : (
                                    createdAssignment.questions.map((question, index) => (
                                        <div className="flex flex-col gap-y-4 mb-6" key={index}>
                                            <div className="flex items-center space-x-4">
                                                <Typography
                                                    className="block text-sm font-semibold text-blue-gray-500 whitespace-nowrap ml-4"
                                                >
                                                    {`Question ${index + 1}`}
                                                </Typography>
                                                <Input
                                                    size="md"
                                                    label="Score"
                                                    value={question.maxScore}
                                                    containerProps={{ className: "input-score" }}
                                                    onChange={(e) =>
                                                        handleInputChange("questions", e.target.value, index, "maxScore")
                                                    }
                                                />
                                                <div className="w-full h-[1px] bg-blue-gray-200" />
                                                <button
                                                    onClick={() => handleDeleteQuestion(index)}
                                                    className="border border-transparent text-red-500 hover:bg-red-500 hover:text-white p-2 rounded-md focus:outline-none ml-4"
                                                    aria-label="Delete question"
                                                >
                                                    <TrashIcon className="h-5 w-5" />
                                                </button>
                                            </div>
                                            {errors.questions && errors.questions[index]?.maxScore && (
                                                <span className="text-red-500 text-sm">
                                                    {errors.questions[index].maxScore}
                                                </span>
                                            )}

                                            <div>
                                                <Textarea
                                                    rows={2}
                                                    label="Question Text"
                                                    value={question.questionText}
                                                    onChange={(e) =>
                                                        handleInputChange("questions", e.target.value, index, "questionText")
                                                    }
                                                    className="h-auto min-h-[4rem]"
                                                />
                                                {errors.questions && errors.questions[index]?.questionText && (
                                                    <span className="text-red-500 text-sm">
                                                        {errors.questions[index].questionText}
                                                    </span>
                                                )}
                                            </div>

                                            <div>
                                                <Textarea
                                                    rows={3}
                                                    label="Correct Answer"
                                                    value={question.correctAnswer}
                                                    onChange={(e) =>
                                                        handleInputChange("questions", e.target.value, index, "correctAnswer")
                                                    }
                                                    className="h-auto min-h-[4rem]"
                                                />
                                                {errors.questions && errors.questions[index]?.correctAnswer && (
                                                    <span className="text-red-500 text-sm">
                                                        {errors.questions[index].correctAnswer}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Phần bên phải */}
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
                                    value={createdAssignment.startDate}
                                    className="block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm px-4 py-2 transition duration-200"
                                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                                />
                                {errors.startDate && (
                                    <span className="text-red-500 text-sm">{errors.startDate}</span>
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
                                    value={createdAssignment.dueDate}
                                    className="block w-full rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm px-4 py-2 transition duration-200"
                                    onChange={(e) => handleInputChange("dueDate", e.target.value)}
                                />
                                {errors.dueDate && (
                                    <span className="text-red-500 text-sm">{errors.dueDate}</span>
                                )}
                            </div>
                        </div>

                        <button className="bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleResetDates();
                                }}
                        >
                            Đặt lại
                        </button>
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 mb-2">Danh sách lớp
                                ({createdAssignment.classrooms.length}/{classrooms.length})</h3>
                            <div className="grid grid-cols-2 gap-4 bg-white shadow-md p-6">
                                {classrooms.map((classItem) => (
                                    <label
                                        key={classItem.classroomId}
                                        className="flex items-center space-x-2 text-gray-700 text-sm"
                                    >
                                        <input
                                            type="checkbox"
                                            value={classItem.classroomId}
                                            checked={createdAssignment.classrooms.some(
                                                (item) => item.classroomId === classItem.classroomId
                                            )}
                                            onChange={() => handleCheckboxChange(classItem.classroomId)}
                                            className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                        />
                                        <span>{classItem.classroomName}</span>
                                    </label>
                                ))}

                            </div>
                            {errors.classrooms && (
                                <span className="text-red-500 text-sm">{errors.classrooms}</span>
                            )}
                        </div>
                        <div className="flex flex-col items-end">
                            <button
                                className="bg-blue-600 text-white mb-1 px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                onClick={handleSubmit}
                            >
                                Lưu
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateAssignment