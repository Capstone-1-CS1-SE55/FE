import React from 'react';

export default function SelectScheduleDialog({ show, setShow }) {
  const [schedule, setSchedule] = React.useState([
    {
      day: 'Mon',
      startTime: '00:00',
      endTime: '00:00',
      checked: false,
    },
  ]);

  const handleGetDay = (length) => {
    switch (length) {
      case 0:
        return 'Mon';
      case 1:
        return 'Tue';
      case 2:
        return 'Wed';
      case 3:
        return 'Thu';
      case 4:
        return 'Fri';
      case 5:
        return 'Sat';
      case 6:
        return 'Sun';
    }
  };

  const handleAddInterval = () => {
    if (schedule.length < 7) {
      setSchedule([
        ...schedule,
        {
          day: handleGetDay(schedule.length),
          startTime: '00:00',
          endTime: '00:00',
          checked: false,
        },
      ]);
    }
  };

  const handleUpdateTime = (index, key, value) => {
    setSchedule(schedule.map((item, i) => (i === index ? { ...item, [key]: value } : item)));
  };

  const handleCheckDay = (index) => {
    setSchedule(
      schedule.map((item, i) => (i === index ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleDeleteInterval = (index) => {
    setSchedule(schedule.filter((_, i) => i !== index));
  };

  return (
    <div
      id="drawer-timepicker"
      className={`absolute top-0 bottom-0 left-0 z-40 p-4 overflow-y-auto transition-transform ${
        show ? '' : '-translate-x-full'
      } bg-white w-96 dark:bg-gray-800 shadow-xl rounded-tl-lg rounded-bl-lg`}
      tabindex="-1"
      aria-labelledby="drawer-timepicker-label"
    >
      <h5
        id="drawer-label"
        className="inline-flex items-center mb-6 text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
      >
        Time schedule
      </h5>
      <button
        onClick={() => setShow(false)}
        type="button"
        data-drawer-hide="drawer-timepicker"
        aria-controls="drawer-timepicker"
        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span className="sr-only">Close menu</span>
      </button>
      <form method="put">
        {schedule.map((item, index) => (
          <TimeItem
            key={index}
            {...item}
            handleCheckDay={() => handleCheckDay(index)}
            handleUpdateTime={(key, value) => handleUpdateTime(index, key, value)}
            handleDeleteInterval={() => handleDeleteInterval(index)}
          />
        ))}
        <button
          type="button"
          className="inline-flex items-center justify-center w-full py-2.5 mb-4 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={handleAddInterval}
        >
          <svg
            className="w-4 h-4 me-1"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h14m-7 7V5"
            />
          </svg>
          Add interval
        </button>
        <div className="grid grid-cols-2 gap-4 bottom-4 left-0 w-full md:px-4 md:absolute">
          <button
            type="button"
            data-drawer-hide="drawer-timepicker"
            className="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={() => setShow(false)}
          >
            Close
          </button>
          <button
            type="submit"
            className="text-white w-full inline-flex items-center justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={(event) => {
              event.preventDefault();
              console.log(schedule);
              setShow(false);
            }}
          >
            Save all
          </button>
        </div>
      </form>
    </div>
  );
}

function TimeItem({
  checked,
  day,
  startTime,
  endTime,
  handleCheckDay,
  handleUpdateTime,
  handleDeleteInterval,
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center min-w-[4rem]">
          <input
            id="monday"
            name="days"
            type="checkbox"
            checked={checked}
            onChange={handleCheckDay}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <label for="monday" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            {day}
          </label>
        </div>
        <div className="w-full max-w-[7rem]">
          <label for="start-time-monday" className="sr-only">
            Start time:
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              type="time"
              id="start-time-monday"
              name="start-time-monday"
              className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              min="07:00"
              max="21:00"
              value={startTime}
              required
              onChange={(e) => handleUpdateTime('startTime', e.target.value)}
            />
          </div>
        </div>
        <div className="w-full max-w-[7rem]">
          <label for="end-time-monday" className="sr-only">
            End time:
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
            <input
              type="time"
              id="end-time-monday"
              name="end-time-monday"
              className="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              min="07:00"
              max="21:00"
              value={endTime}
              required
              onChange={(e) => handleUpdateTime('endTime', e.target.value)}
            />
          </div>
        </div>
        <div>
          <button
            type="button"
            className="inline-flex items-center p-1.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
            onClick={() => handleDeleteInterval()}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                fill-rule="evenodd"
                d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                clip-rule="evenodd"
              />
            </svg>
            <span className="sr-only">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
