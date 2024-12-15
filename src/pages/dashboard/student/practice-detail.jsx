import ClockCounter from '@/common/ClockCounter';
import { statisticsChartsData } from '@/data';
import { ConfirmSubmitDialog } from '@/sections/practice/confirm-submit-dialog';
import {
    ChatBubbleBottomCenterTextIcon,
    EllipsisVerticalIcon,
    TrashIcon,
} from '@heroicons/react/24/solid';
import {
    Button,
    Card,
    CardBody,
    IconButton,
    Input,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
    Textarea,
    Typography,
} from '@material-tailwind/react';
import React, {useEffect} from 'react';
import Chart from 'react-apexcharts';
import {useNavigate, useParams} from 'react-router-dom';
import {getAllQuestionInAssignment} from "@/service/teacher/Assignment.jsx";

export default function PracticeDetail() {
    const {assignmentId} = useParams();
    const navigate = useNavigate();
    const [listQuestions, setListQuestion] = React.useState();
    const [onCountDown, setOnCountDown] = React.useState(true);
    const [confirm, setConfirm] = React.useState(false);

    const handleListQuestion = async () => {
        const response = await getAllQuestionInAssignment(assignmentId);
        setListQuestion(response);
    }

    useEffect(() => {
        handleListQuestion();
    }, []);
    const handleUpdateQuestion = (index, key, value) => {
        const newListQuestions = [...listQuestions];
        newListQuestions[index][key] = value;
        setListQuestion(newListQuestions);
    };
    if(!listQuestions) return null;
    return (
        <>
            <div className="mt-10 grid gap-2 grid-cols-[2fr_minmax(300px,1fr)]">
                <Card className=" mb-6 lg:mx-4 border border-blue-gray-100">
                    <CardBody className="p-4">
                        <div className="flex items-center justify-between pb-5">
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
                            <div className="w-full h-[1px] bg-blue-gray-200" />
                            <Typography
                                variant="h5"
                                className="whitespace-nowrap border-[1px] border-gray-400 rounded-lg px-3 py-1"
                            >
                                {listQuestions.title}
                            </Typography>
                            <div className="w-[60px] h-[1px] bg-blue-gray-200" />
                        </div>
                        {listQuestions.listQuestion.map((question, index) => (
                            <div key={index} className="flex flex-col gap-y-4 group relative pt-3">
                                <div className="flex items-center">
                                    <Typography className="block text-sm font-semibold text-blue-gray-500 whitespace-nowrap ml-4">
                                        {`Question ${index + 1}`}
                                    </Typography>
                                    <div className="w-full h-[1px] bg-blue-gray-200" />
                                    <Input
                                        size="md"
                                        label="score"
                                        value={`Score: ${question.maxScore} point`}
                                        containerProps={{ className: 'input-score' }}
                                        disabled
                                    />
                                </div>
                                <Input size="md" label="Question" value={question.questionText} disabled />
                                <Textarea label="Your answer" />
                            </div>
                        ))}
                        <div className="mt-10 flex flex-col gap-y-12">

                        </div>
                    </CardBody>
                </Card>
                <div className="sticky top-0 max-h-fit">
                    <div
                        onClick={() => setOnCountDown(!onCountDown)}
                        id="countDown"
                        className={`${onCountDown ? 'w-fit px-2 h-[142px]' : 'w-[200px] h-[45px]'} 
                        ${
                            (new Date(new Date().getTime() + 3 * 60 * 1000) - Date.now()) / 1000 < 0
                                ? 'hidden'
                                : ''
                        } inline-block overflow-hidden shadow-xl rounded-md bg-opacity-90 transition-all cursor-pointer border border-blue-gray-100 absolute right-0`}
                    >
                        <p className="text-lg font-semibold mt-2 text-center">Time remaining</p>

                        <ClockCounter
                            targetDate={new Date(new Date().getTime() + 120 * 60 * 1000)}
                        ></ClockCounter>
                    </div>

                    <div className="absolute right-0 top-[160px]">
                        <Button variant="gradient" className="ml-auto mr-4 mb-4 pr-7 pl-7">
                            Save
                        </Button>
                        <Button
                            variant="gradient"
                            color="green"
                            className="ml-auto mr-4 mb-4 pr-5 pl-5"
                            onClick={() => setConfirm(true)}
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </div>
            <ConfirmSubmitDialog
                open={confirm}
                handleClose={() => setConfirm(false)}
                handleConfirm={() => navigate(-1)}
            />
        </>
    );
}

// export function AnswerQuestion({ questionText, maxScore, questionId, no, handleUpdateQuestion = () => {} }) {
//     return (
//         <div className="flex flex-col gap-y-4 group relative">
//             <div className="flex items-center">
//                 <Input
//                     size="md"
//                     label="score"
//                     value={`Score: ${maxScore} point`}
//                     containerProps={{ className: 'input-score' }}
//                     disabled
//                 />
//                 <div className="w-full h-[1px] bg-blue-gray-200" />
//                 <Typography className="block text-sm font-semibold text-blue-gray-500 whitespace-nowrap ml-4">
//                     {`Question ${no}`}
//                 </Typography>
//             </div>
//             <Input size="md" label="Question" value={questionText} disabled />
//             <Textarea
//                 label="Your answer"
//                 // value={answer}
//                 // onChange={(e) => handleUpdateQuestion(no - 1, 'answer', e.target.value)}
//             />
//         </div>
//     );
// }