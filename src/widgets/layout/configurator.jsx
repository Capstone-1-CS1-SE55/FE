import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, IconButton, Switch, Typography, Chip } from '@material-tailwind/react';
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setSidenavColor,
  setSidenavType,
  setFixedNavbar,
} from '@/context';
import {useNavigate} from "react-router-dom";

function formatNumber(number, decPlaces) {
  decPlaces = Math.pow(10, decPlaces);

  const abbrev = ['K', 'M', 'B', 'T'];

  for (let i = abbrev.length - 1; i >= 0; i--) {
    var size = Math.pow(10, (i + 1) * 3);

    if (size <= number) {
      number = Math.round((number * decPlaces) / size) / decPlaces;

      if (number == 1000 && i < abbrev.length - 1) {
        number = 1;
        i++;
      }

      number += abbrev[i];

      break;
    }
  }

  return number;
}

export function Configurator() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openConfigurator, sidenavColor, sidenavType, fixedNavbar } = controller;
  const [stars, setStars] = React.useState(0);

  const sidenavColors = {
    white: 'from-gray-100 to-gray-100 border-gray-200',
    dark: 'from-black to-black border-gray-200',
    green: 'from-green-400 to-green-600',
    orange: 'from-orange-400 to-orange-600',
    red: 'from-red-400 to-red-600',
    pink: 'from-pink-400 to-pink-600',
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch({ type: "OPEN_CONFIGURATOR", payload: false });
    localStorage.removeItem('token');
    navigate("/auth/sign-in");
  }

  React.useEffect(() => {
    const stars = fetch(
      'https://api.github.com/repos/creativetimofficial/material-tailwind-dashboard-react'
    )
      .then((response) => response.json())
      .then((data) => setStars(formatNumber(data.stargazers_count, 1)));
  }, []);

  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-96 bg-white px-2.5 shadow-lg transition-transform duration-300 ${
        openConfigurator ? 'translate-x-0' : 'translate-x-96'
      }`}
    >
      <div className="flex items-start justify-between px-6 pt-8 pb-6">
        <div>
          <Typography variant="h5" color="blue-gray">
            Theme Setting
          </Typography>
          <Typography className="font-normal text-blue-gray-600">
            Setting panel for theme configuration
          </Typography>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => setOpenConfigurator(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>
      <div className="py-4 px-6">

        <button
            className="flex mb-8 items-center px-4 py-2 bg-red-500 text-white font-medium rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50 transition duration-200"
            onClick={handleLogout}
        >
          <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
          >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
            />
          </svg>
          Logout
        </button>

        {/*<div className="mb-12">*/}
        {/*  <Typography variant="h6" color="blue-gray">*/}
        {/*    Sidenav Colors*/}
        {/*  </Typography>*/}
        {/*  <div className="mt-3 flex items-center gap-2">*/}
        {/*    {Object.keys(sidenavColors).map((color) => (*/}
        {/*      <span*/}
        {/*        key={color}*/}
        {/*        className={`h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 ${*/}
        {/*          sidenavColors[color]*/}
        {/*        } ${sidenavColor === color ? 'border-black' : 'border-transparent'}`}*/}
        {/*        onClick={() => setSidenavColor(dispatch, color)}*/}
        {/*      />*/}
        {/*    ))}*/}
        {/*  </div>*/}
        {/*</div>*/}
        <div className="mb-12">
          <Typography variant="h6" color="blue-gray">
            Sidenav Types
          </Typography>
          <Typography variant="small" color="gray">
            Choose between 3 different sidenav types.
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            <Button
              variant={sidenavType === 'dark' ? 'gradient' : 'outlined'}
              onClick={() => setSidenavType(dispatch, 'dark')}
            >
              Dark
            </Button>
            <Button
              variant={sidenavType === 'transparent' ? 'gradient' : 'outlined'}
              onClick={() => setSidenavType(dispatch, 'transparent')}
            >
              Transparent
            </Button>
            <Button
              variant={sidenavType === 'white' ? 'gradient' : 'outlined'}
              onClick={() => setSidenavType(dispatch, 'white')}
            >
              White
            </Button>
          </div>
        </div>
        <div className="mb-12">
          <hr />
          <div className="flex items-center justify-between py-5">
            <Typography variant="h6" color="blue-gray">
              Navbar Fixed
            </Typography>
            <Switch
              id="navbar-fixed"
              value={fixedNavbar}
              onChange={() => setFixedNavbar(dispatch, !fixedNavbar)}
            />
          </div>
          <hr />
        </div>
      </div>
    </aside>
  );
}

Configurator.displayName = '/src/widgets/layout/configurator.jsx';

export default Configurator;
