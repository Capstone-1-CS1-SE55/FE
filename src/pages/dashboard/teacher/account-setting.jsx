import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
  Input,
} from '@material-tailwind/react';
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
  ArrowUpIcon,
  BellIcon,
  PlusCircleIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  LockOpenIcon,
  BanknotesIcon,
} from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';
import { ProfileInfoCard, MessageCard } from '@/widgets/cards/index.js';
import { conversationsData, classData } from '@/data/index.js';
import React, {useEffect, useState} from 'react';
import {getAllUser2} from "@/service/Account.jsx";
export function AccountSetting() {
  const [currentTab, setCurrentTab] = useState('info');
  useEffect(() => {
    getInfomation()
  }, []);
  const [inf, setInf]= useState('')
  const getInfomation = async () => {
    try {
      const data = await getAllUser2();
      setInf(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
      <>
        <div className="relative mt-8 h-12 overflow-hidden rounded-xl bg-cover	bg-center"></div>
        <Card className="mx-3 -mt-16 mb-6 lg:mx-4 border border-blue-gray-100">
          <CardBody className="p-4">
            <div className="mb-10 flex items-center justify-between flex-wrap gap-6">
              <div className="flex items-center gap-6">
                <Avatar
                    src="/img/bruce-mars.jpeg"
                    alt="bruce-mars"
                    size="xl"
                    variant="rounded"
                    className="rounded-lg shadow-lg shadow-blue-gray-500/40"
                />
                <div>
                  <Typography variant="h5" color="blue-gray" className="mb-1">
                    {inf.teacherName || 'Loading...'}
                  </Typography>
                  <Typography variant="small" className="font-normal text-blue-gray-600">
                    Teacher /  {inf.email || 'Loading...'}
                  </Typography>
                </div>
              </div>
              <div className="w-96">
                <Tabs value="app">
                  <TabsHeader>
                    <Tab
                        value="your-class"
                        onClick={() => {
                          setCurrentTab('your-class');
                        }}
                    >
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 -mt-1 mr-2 inline-block"
                      >
                        <path
                            fillRule="evenodd"
                            d="M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm8.25 5.25a.75.75 0 0 1 .75-.75h8.25a.75.75 0 0 1 0 1.5H12a.75.75 0 0 1-.75-.75Z"
                            clipRule="evenodd"
                        />
                      </svg>
                      Your class
                    </Tab>
                  </TabsHeader>
                </Tabs>
              </div>
            </div>

            {currentTab === 'info' && (
                <div className="gird-cols-1 mb-12 grid gap-12 px-4 lg:grid-cols-2 xl:grid-cols-3">
                  <div>
                    <Typography variant="h6" color="blue-gray" className="mb-3">
                      Edit profile
                    </Typography>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 items-center">
                        <div className="w-full h-[1px] bg-blue-gray-200"/>
                        <Typography className="block text-xs font-semibold uppercase text-blue-gray-500">
                          Account
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                          Your email
                        </Typography>
                        <Input
                            size="lg"
                            value={inf.email || ''}
                            placeholder="name@mail.com"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                              className: 'before:content-none after:content-none',
                            }}
                            readOnly
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 mt-4">
                      <div className="flex gap-2 items-center">
                        <div className="w-full h-[1px] bg-blue-gray-200"/>
                        <Typography className="block text-xs font-semibold uppercase text-blue-gray-500 whitespace-nowrap">
                          About me
                        </Typography>
                      </div>
                      <div>
                        <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                          Fullname
                        </Typography>
                        <Input
                            size="lg"
                            placeholder="Alec M. Thompson"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                              className: 'before:content-none after:content-none',
                            }}
                            value={inf.teacherName || ''}
                        />
                      </div>
                      <div>
                        <Typography variant="small" color="blue-gray" className="mb-1 font-medium">
                          Date of Birth
                        </Typography>
                        <Input
                            type="date"
                            size="lg"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                              className: 'before:content-none after:content-none',
                            }}
                            value={inf.birthday || ''}
                        />
                      </div>
                    </div>
                  </div>
                  <ProfileInfoCard
                      title="Profile Overview"
                      description={`Hi, I'm ${inf.teacherName}, Decisions: If you can't decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality).`}
                      details={{
                        name: inf.teacherName ,
                        mobile: inf.phoneNumber  ,
                        email: inf.email ,
                        location: 'Việt Nam',
                        social: (
                            <div className="flex items-center gap-4">
                              <i className="fa-brands fa-facebook text-blue-700" />
                              <i className="fa-brands fa-twitter text-blue-400" />
                              <i className="fa-brands fa-instagram text-purple-500" />
                            </div>
                        ),
                      }}
                      action={
                        <Tooltip content="Edit Profile">
                          <PencilIcon className="h-4 w-4 cursor-pointer text-blue-gray-500" />
                        </Tooltip>
                      }
                  />

                </div>
            )}

            {currentTab === 'your-class' && (
                <div className="mb-12 grid gap-10 lg:grid-cols-[2.5fr_minmax(300px,1fr)]">
                  <div className="px-4 pb-4">
                    <Typography variant="h6" color="blue-gray" className="mb-2">
                      Your class
                    </Typography>
                    <div className="flex gap-2 items-center">
                      <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500 whitespace-nowrap"
                      >
                        Manage your class settings
                      </Typography>
                      <div className="w-full h-[1px] bg-blue-gray-100" />
                    </div>
                    <div className="mt-6 grid grid-cols-1 gap-12 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                      {classData.slice(0, 3).map(({ img, title, description, tag, route, members }) => (
                          <Card key={title} color="transparent" shadow={false}>
                            <CardHeader
                                floated={false}
                                color="gray"
                                className="mx-0 mt-0 mb-4 h-64 xl:h-40"
                            >
                              <img src={img} alt={title} className="h-full w-full object-cover" />
                            </CardHeader>
                            <CardBody className="py-0 px-1">
                              <Typography variant="h5" color="blue-gray" className="mt-1 mb-2">
                                {title}
                              </Typography>
                              <Typography variant="small" className="font-normal text-blue-gray-500">
                                {description}
                              </Typography>
                            </CardBody>
                            <CardFooter className="mt-6 flex items-center justify-between py-0 px-1">
                              <Link to={route}>
                                <Button variant="outlined" size="sm">
                                  view class
                                </Button>
                              </Link>
                              <div>
                                {members.map(({ img, name }, key) => (
                                    <Tooltip key={name} content={name}>
                                      <Avatar
                                          src={img}
                                          alt={name}
                                          size="xs"
                                          variant="circular"
                                          className={`cursor-pointer border-2 border-white ${
                                              key === 0 ? '' : '-ml-2.5'
                                          }`}
                                      />
                                    </Tooltip>
                                ))}
                              </div>
                            </CardFooter>
                          </Card>
                      ))}
                    </div>
                  </div>

                  <div className="pb-4">
                    <Typography variant="h6" color="blue-gray" className="mb-2">
                      Your schedule
                    </Typography>
                    <div className="flex gap-2 items-center whitespace-nowrap mb-3">
                      <Typography variant="small" className="font-normal text-blue-gray-500  ">
                        Manage your schedule settings
                      </Typography>
                      <div className="w-full h-[1px] bg-blue-gray-100" />
                    </div>

                    {scheduleData.map(({ icon, color, title, description }, key) => (
                        <div key={title} className="flex items-start gap-4 py-3">
                          <div
                              className={`relative p-1 after:absolute after:-bottom-6 after:left-2/4 after:w-0.5 after:-translate-x-2/4 after:bg-blue-gray-50 after:content-[''] ${
                                  key === scheduleData.length - 1 ? 'after:h-0' : 'after:h-4/6'
                              }`}
                          >
                            {React.createElement(icon, {
                              className: `!w-5 !h-5 ${color}`,
                            })}
                          </div>
                          <div>
                            <Typography variant="small" color="blue-gray" className="block font-medium">
                              {title}
                            </Typography>
                            <Typography
                                as="span"
                                variant="small"
                                className="text-xs font-medium text-blue-gray-500"
                            >
                              {description}
                            </Typography>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
            )}
          </CardBody>
        </Card>
      </>
  );
}

export default AccountSetting;
