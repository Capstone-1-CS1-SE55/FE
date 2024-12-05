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
import React from 'react';
import Chart from 'react-apexcharts';
import { useNavigate } from 'react-router-dom';

export default function PracticeDetail() {
  const navigate = useNavigate();
  const [listQuestions, setListQuestion] = React.useState([
    {
      question: 'What is the capital of France?',
      answer: 'Paris',
      score: 10,
    },
    {
      question: 'What is the capital of Germany?',
      answer: 'Berlin',
      score: 10,
    },
    {
      question: 'What is the capital of Italy?',
      answer: 'Rome',
      score: 10,
    },
    {
      question: 'What is the capital of Spain?',
      answer: 'Madrid',
      score: 10,
    },
    {
      question: 'What is the capital of France?',
      answer: 'Paris',
      score: 10,
    },
    {
      question: 'What is the capital of Germany?',
      answer: 'Berlin',
      score: 10,
    },
    {
      question: 'What is the capital of Italy?',
      answer: 'Rome',
      score: 10,
    },
    {
      question: 'What is the capital of Spain?',
      answer: 'Madrid',
      score: 10,
    },
    {
      question: 'What is the capital of France?',
      answer: 'Paris',
      score: 10,
    },
    {
      question: 'What is the capital of France?',
      answer: 'Paris',
      score: 10,
    },
    {
      question: 'What is the capital of Germany?',
      answer: 'Berlin',
      score: 10,
    },
    {
      question: 'What is the capital of Italy?',
      answer: 'Rome',
      score: 10,
    },
    {
      question: 'What is the capital of Spain?',
      answer: 'Madrid',
      score: 10,
    },
    {
      question: 'What is the capital of France?',
      answer: 'Paris',
      score: 10,
    },
    {
      question: 'What is the capital of Germany?',
      answer: 'Berlin',
      score: 10,
    },
    {
      question: 'What is the capital of Italy?',
      answer: 'Rome',
      score: 10,
    },
    {
      question: 'What is the capital of Spain?',
      answer: 'Madrid',
      score: 10,
    },
  ]);
  const [onCountDown, setOnCountDown] = React.useState(true);
  const [confirm, setConfirm] = React.useState(false);

  const handleUpdateQuestion = (index, key, value) => {
    const newListQuestions = [...listQuestions];
    newListQuestions[index][key] = value;
    setListQuestion(newListQuestions);
  };

  return (
    <>
      <div className="mt-10 grid gap-2 grid-cols-[2fr_minmax(300px,1fr)]">
        <Card className=" mb-6 lg:mx-4 border border-blue-gray-100">
          <CardBody className="p-4">
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
              <div className="w-full h-[1px] bg-blue-gray-200" />
              <Typography
                variant="h5"
                className="whitespace-nowrap border-[1px] border-gray-400 rounded-lg px-3 py-1"
              >
                Practice name
              </Typography>
              <div className="w-[60px] h-[1px] bg-blue-gray-200" />
            </div>

            <div className="mt-10 flex flex-col gap-y-12">
              {listQuestions.map((question, index) => (
                <AnswerQuestion
                  key={index}
                  {...question}
                  no={index + 1}
                  handleUpdateQuestion={handleUpdateQuestion}
                />
              ))}
            </div>
          </CardBody>
        </Card>
        <div className="sticky top-0 max-h-fit">
          <div
            onClick={() => setOnCountDown(!onCountDown)}
            id="countDown"
            className={`${onCountDown ? 'w-fit px-2 h-[142px]' : 'w-[200px] h-[45px]'} ${
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
            <Button variant="gradient" className="ml-auto mr-4 mb-4">
              Save
            </Button>
            <Button
              variant="gradient"
              color="green"
              className="ml-auto mr-4 mb-4"
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

export function AnswerQuestion({ question, answer, score, no, handleUpdateQuestion = () => {} }) {
  return (
    <div className="flex flex-col gap-y-4 group relative">
      <div className="flex items-center">
        <Input
          size="md"
          label="score"
          value={`Score: ${score} point`}
          containerProps={{ className: 'input-score' }}
          disabled
        />
        <div className="w-full h-[1px] bg-blue-gray-200" />
        <Typography className="block text-sm font-semibold text-blue-gray-500 whitespace-nowrap ml-4">
          {`Question ${no}`}
        </Typography>
      </div>
      <Input size="md" label="Question" value={question} disabled />
      <Textarea
        label="Your answer"
        value={answer}
        onChange={(e) => handleUpdateQuestion(no - 1, 'answer', e.target.value)}
      />
    </div>
  );
}
