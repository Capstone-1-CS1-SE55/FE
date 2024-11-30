import { statisticsChartsData } from '@/data';
import {
  ArrowDownLeftIcon,
  ArrowLeftCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ChatBubbleBottomCenterTextIcon,
  EllipsisVerticalIcon,
  TrashIcon,
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
import React from 'react';
import Chart from 'react-apexcharts';
import { useNavigate } from 'react-router-dom';

export default function PracticeDetail() {
  const navigate = useNavigate();
  const [listQuestions, setListQuestions] = React.useState([
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

  return (
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
              <CreateQuestion key={index} {...question} no={index + 1} />
            ))}
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
              <div className="w-full h-[1px] bg-blue-gray-200" />
            </div>

            <div className="mt-4 flex flex-col gap-y-4">
              {listQuiz.map((quiz, index) => (
                <QuizItem key={index} {...quiz} no={index + 1} />
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
                    <EllipsisVerticalIcon strokeWidth={3} fill="currenColor" className="h-6 w-6" />
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
    </div>
  );
}

export function CreateQuestion({
  question,
  answer,
  score,
  no,
  handleUpdateQuestion = () => {},
  handleDeleteQuestion = () => {},
}) {
  return (
    <div className="flex flex-col gap-y-4 group relative">
      <div className="flex items-center">
        <Input
          size="md"
          label="score"
          value={score}
          containerProps={{ className: 'input-score' }}
          onChange={(e) => handleUpdateQuestion(no - 1, 'score', e.target.value)}
        />
        <div className="w-full h-[1px] bg-blue-gray-200" />
        <Typography className="block text-sm font-semibold text-blue-gray-500 whitespace-nowrap ml-4">
          {`Question ${no}`}
        </Typography>
      </div>
      <Input
        size="md"
        label="Question"
        value={question}
        onChange={(e) => handleUpdateQuestion(no - 1, 'question', e.target.value)}
      />
      <Textarea
        label="Answer"
        value={answer}
        onChange={(e) => handleUpdateQuestion(no - 1, 'answer', e.target.value)}
      />
      <Button
        size="sm"
        variant="text"
        className="capitalize text-sm flex items-center gap-x-2 whitespace-nowrap w-fit opacity-0 group-hover:opacity-100 !absolute -bottom-10 right-0"
        onClick={() => handleDeleteQuestion(no - 1)}
      >
        <TrashIcon strokeWidth={2} className="h-5 w-5 text-red-600" />
        Delete this question
      </Button>
    </div>
  );
}

function QuizItem({ no, title, view }) {
  return (
    <div className="flex gap-x-4 items-center justify-start">
      <Typography variant="lead">{no}</Typography>
      <ChatBubbleBottomCenterTextIcon className="w-12 h-12 text-light-blue-600" />
      <div className="flex flex-col">
        <Typography variant="h6">{title}</Typography>
        <Typography>{view}</Typography>
      </div>
    </div>
  );
}
