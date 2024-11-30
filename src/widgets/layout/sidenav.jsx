import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Button, IconButton, Typography } from '@material-tailwind/react';
import { useMaterialTailwindController, setOpenSidenav } from '@/context';

export function Sidenav({ brandImg, brandName, routes, role }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes = {
    dark: 'bg-gradient-to-br from-gray-800 to-gray-900',
    white: 'bg-white shadow-sm',
    transparent: 'bg-transparent',
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? 'translate-x-0' : '-translate-x-80'
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 border border-blue-gray-100`}
    >
      <div className={`relative`}>
        <Link to="/" className="py-6 px-8 text-center flex items-center gap-x-4">
          {role === 'teacher' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" className="w-8 h-8">
              <path
                fill="#d99e82"
                d="M30 26a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4h22a4 4 0 0 1 4 4z"
              />
              <path
                fill="#5c913b"
                d="M28 26a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h22a2 2 0 0 1 2 2z"
              />
              <path
                fill="#fff"
                d="M7.515 8.898c-.08.096-.184.24-.184.408c0 .368.272.528.624.528h2.67c.304 0 .576-.16.576-.528s-.271-.528-.624-.528H9.114c.679-.855 1.919-1.958 1.919-3.07c0-1.015-.792-1.663-1.775-1.663s-1.879.807-1.879 1.815c0 .311.2.583.584.583c.768 0 .328-1.295 1.247-1.295c.328 0 .576.288.576.616c0 .288-.136.536-.28.744c-.608.879-1.327 1.599-1.991 2.39m-1.307 5.433H5.049v-1.16c0-.288-.184-.479-.48-.479c-.295 0-.479.192-.479.479v1.16H2.931c-.296 0-.48.192-.48.479c0 .288.184.48.48.48H4.09v1.159c0 .288.184.479.479.479c.296 0 .48-.191.48-.479V15.29h1.159c.296 0 .48-.192.48-.48c0-.287-.184-.479-.48-.479m4.369 1.447H9.113c.68-.855 1.919-1.958 1.919-3.07c0-1.015-.792-1.663-1.775-1.663s-1.879.808-1.879 1.815c0 .311.2.583.583.583c.768 0 .328-1.295 1.248-1.295c.328 0 .576.288.576.616c0 .288-.136.536-.28.744c-.608.879-1.327 1.599-1.991 2.391c-.08.096-.184.24-.184.408c0 .368.272.528.624.528h2.67c.304 0 .576-.16.576-.528c0-.369-.271-.529-.623-.529m.84 3.192H3.083a.5.5 0 0 1 0-1h8.333a.5.5 0 0 1 .001 1"
              />
              <path
                fill="#9266cc"
                d="M35 36v-3.5c0-3.314-3.685-5.5-7-5.5H16c-3.313 0-7 2.186-7 5.5V36z"
              />
              <path
                fill="#ffac33"
                d="M21.944 5.069c4.106 0 10.948 2.053 10.948 10.948s0 10.948-2.053 10.948s-4.79-2.053-8.896-2.053c-4.105 0-6.784 2.053-8.895 2.053c-2.287 0-2.053-8.211-2.053-10.948c.002-8.895 6.844-10.948 10.949-10.948"
              />
              <path fill="#292f33" d="M17 27h9.875s-1.256 3.5-4.938 3.5S17 27 17 27" />
              <path
                fill="#ffdc5d"
                d="M18.328 27.02c0 1.48 2.172 2.48 3.672 2.48s3.66-1 3.66-2.48v-3.205h-7.332z"
              />
              <path
                fill="#f9ca55"
                d="M18.321 25.179c1.023 1.155 2.291 1.468 3.669 1.468s2.647-.312 3.67-1.468v-2.936h-7.339z"
              />
              <path
                fill="#ffdc5d"
                d="M13.734 15.717c0-5.834 3.676-10.563 8.21-10.563s8.211 4.729 8.211 10.563c0 5.833-3.677 10.286-8.211 10.286s-8.21-4.452-8.21-10.286"
              />
              <path
                fill="#df1f32"
                d="M21.944 23.543c-1.605 0-2.446-.794-2.536-.885a.684.684 0 0 1 .96-.974c.035.032.553.491 1.576.491c1.039 0 1.557-.473 1.577-.492a.69.69 0 0 1 .963.02c.26.269.26.691-.004.955c-.089.091-.929.885-2.536.885"
              />
              <path
                fill="#ffac33"
                d="M11.725 19c-.021-1-.044-.224-.044-.465c0-3.422 2.053.494 2.053-1.943c0-2.439 1.368-2.683 2.736-4.051c.685-.685 2.053-2.026 2.053-2.026s3.421 2.067 6.158 2.067c2.736 0 5.474 1.375 5.474 4.112s2.053-1.584 2.053 1.837c0 .244-.022-.531-.04.469h.718c.007-2 .007-1.924.007-3.202c0-8.895-6.843-12.207-10.948-12.207S10.998 6.848 10.998 15.743c0 .793-.02 1.257.008 3.257z"
              />
              <path
                fill="#662113"
                d="M18.608 17.886a.85.85 0 0 1-.846-.846v-.845c0-.465.381-.846.846-.846s.847.381.847.846v.845a.85.85 0 0 1-.847.846m6.765 0a.85.85 0 0 1-.846-.846v-.845c0-.465.381-.846.846-.846s.846.381.846.846v.845a.85.85 0 0 1-.846.846"
              />
              <path
                fill="#c1694f"
                d="M22.837 20.5h-1.691a.424.424 0 0 1-.423-.423v-.153c0-.233.189-.424.423-.424h1.691c.232 0 .423.19.423.424v.153a.424.424 0 0 1-.423.423"
              />
              <path
                fill="#ffdc5d"
                d="M15.444 15.936c0 1.448-.734 2.622-1.639 2.622s-1.639-1.174-1.639-2.622s.734-2.623 1.639-2.623c.905-.001 1.639 1.174 1.639 2.623m16.389 0c0 1.448-.733 2.622-1.639 2.622c-.905 0-1.639-1.174-1.639-2.622s.733-2.623 1.639-2.623c.906-.001 1.639 1.174 1.639 2.623"
              />
              <path
                fill="#744eaa"
                d="M22 30.222s3.381 2.494 4.094 2.777c.156.062-.367-3.656-.367-3.656h-7.453s-.523 3.781-.234 3.625c.64-.342 3.96-2.746 3.96-2.746"
              />
              <path
                fill="#cbb7ea"
                d="M17.291 25.917C17.855 26.483 22 29.3 22 29.3s-2.125 1.242-4.086 3.535c-.195.23-1.543-4.625-1.584-5.709c-.012-.303.69-1.48.961-1.209m9.439 0c-.566.566-4.709 3.383-4.709 3.383s2.125 1.242 4.084 3.535c.195.23 1.541-4.625 1.582-5.709c.012-.303-.687-1.48-.957-1.209"
              />
              <path fill="#744eaa" d="M21 30h2v6h-2z" />
              <circle cx="22" cy="34.5" r="1" fill="#cbb7ea" />
              <circle cx="22" cy="31.5" r="1" fill="#cbb7ea" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" className="w-8 h-8">
              <path
                fill="#543930"
                d="M98.9 79.76c-1.25-2.27.34-4.58 3.06-7.44c4.31-4.54 9-15.07 4.64-25.76c.03-.06-.86-1.86-.83-1.92l-1.79-.09c-.57-.08-20.26-.12-39.97-.12s-39.4.04-39.97.12c0 0-2.65 1.95-2.63 2.01c-4.35 10.69.33 21.22 4.64 25.76c2.71 2.86 4.3 5.17 3.06 7.44c-1.21 2.21-4.81 2.53-4.81 2.53s.83 2.26 2.83 3.48c1.85 1.13 4.13 1.39 5.7 1.43c0 0 6.15 8.51 22.23 8.51h17.9c16.08 0 22.23-8.51 22.23-8.51c1.57-.04 3.85-.3 5.7-1.43c2-1.22 2.83-3.48 2.83-3.48s-3.61-.33-4.82-2.53"
              />
              <radialGradient
                id="notoStudent0"
                cx="99.638"
                cy="45.941"
                r="23.419"
                gradientTransform="matrix(1 0 0 .4912 -21.055 59.492)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".728" stop-color="#6d4c41" stop-opacity="0" />
                <stop offset="1" stop-color="#6d4c41" />
              </radialGradient>
              <path
                fill="url(#notoStudent0)"
                d="M63.99 95.7v-9.44L92.56 84l2.6 3.2s-6.15 8.51-22.23 8.51z"
              />
              <radialGradient
                id="notoStudent1"
                cx="76.573"
                cy="49.423"
                r="6.921"
                gradientTransform="matrix(-.9057 .4238 -.3144 -.6719 186.542 79.33)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".663" stop-color="#6d4c41" />
                <stop offset="1" stop-color="#6d4c41" stop-opacity="0" />
              </radialGradient>
              <path
                fill="url(#notoStudent1)"
                d="M95.1 83.07c-4.28-6.5 5.21-8.93 5.21-8.93l.01.01c-1.65 2.05-2.4 3.84-1.43 5.61c1.21 2.21 4.81 2.53 4.81 2.53s-4.91 4.36-8.6.78"
              />
              <radialGradient
                id="notoStudent2"
                cx="94.509"
                cy="69.002"
                r="30.399"
                gradientTransform="matrix(-.0746 -.9972 .8311 -.0622 33.418 157.536)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".725" stop-color="#6d4c41" stop-opacity="0" />
                <stop offset="1" stop-color="#6d4c41" />
              </radialGradient>
              <path
                fill="url(#notoStudent2)"
                d="M106.62 46.56c4.25 10.35-.22 21.01-4.41 25.51c-.57.62-3.01 3.01-3.57 4.92c0 0-9.54-13.31-12.39-21.13c-.57-1.58-1.1-3.2-1.17-4.88c-.05-1.26.14-2.76.87-3.83c.89-1.31 20.16-1.7 20.16-1.7c0 .01.51 1.11.51 1.11"
              />
              <radialGradient
                id="notoStudent3"
                cx="44.31"
                cy="69.002"
                r="30.399"
                gradientTransform="matrix(.0746 -.9972 -.8311 -.0622 98.35 107.477)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".725" stop-color="#6d4c41" stop-opacity="0" />
                <stop offset="1" stop-color="#6d4c41" />
              </radialGradient>
              <path
                fill="url(#notoStudent3)"
                d="M21.4 46.56c-4.25 10.35.22 21.01 4.41 25.51c.58.62 3.01 3.01 3.57 4.92c0 0 9.54-13.31 12.39-21.13c.58-1.58 1.1-3.2 1.17-4.88c.05-1.26-.14-2.76-.87-3.83c-.89-1.31-1.93-.96-3.44-.96c-2.88 0-15.49-.74-16.47-.74c.01.01-.76 1.11-.76 1.11"
              />
              <radialGradient
                id="notoStudent4"
                cx="49.439"
                cy="45.941"
                r="23.419"
                gradientTransform="matrix(-1 0 0 .4912 98.878 59.492)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".728" stop-color="#6d4c41" stop-opacity="0" />
                <stop offset="1" stop-color="#6d4c41" />
              </radialGradient>
              <path
                fill="url(#notoStudent4)"
                d="M64.03 95.7v-9.44L35.46 84l-2.6 3.2s6.15 8.51 22.23 8.51z"
              />
              <radialGradient
                id="notoStudent5"
                cx="26.374"
                cy="49.423"
                r="6.921"
                gradientTransform="matrix(.9057 .4238 .3144 -.6719 -13.052 100.605)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".663" stop-color="#6d4c41" />
                <stop offset="1" stop-color="#6d4c41" stop-opacity="0" />
              </radialGradient>
              <path
                fill="url(#notoStudent5)"
                d="M32.92 83.07c4.28-6.5-5.21-8.93-5.21-8.93l-.01.01c1.65 2.05 2.4 3.84 1.43 5.61c-1.21 2.21-4.81 2.53-4.81 2.53s4.91 4.36 8.6.78"
              />
              <path
                fill="#e59600"
                d="M73.78 112.04V89.25H54.21v22.79zm17.55-61.7H36.67c-5.89 0-10.71 5.13-10.71 11.41s4.82 11.41 10.71 11.41h54.65c5.89 0 10.71-5.14 10.71-11.41c.01-6.27-4.81-11.41-10.7-11.41"
              />
              <path
                fill="#ffca28"
                d="M64 10.98c-17.4 0-33.52 18.61-33.52 45.4c0 26.64 16.61 39.81 33.52 39.81s33.52-13.17 33.52-39.81c0-26.79-16.12-45.4-33.52-45.4"
              />
              <path
                fill="#6d4c41"
                d="M54.8 49.72c-.93-1.23-3.07-3.01-7.23-3.01s-6.31 1.79-7.23 3.01c-.41.54-.31 1.17-.02 1.55c.26.35 1.04.68 1.9.39s2.54-1.16 5.35-1.18c2.81.02 4.49.89 5.35 1.18s1.64-.03 1.9-.39c.28-.37.39-1-.02-1.55m32.87 0c-.93-1.23-3.07-3.01-7.23-3.01s-6.31 1.79-7.23 3.01c-.41.54-.31 1.17-.02 1.55c.26.35 1.04.68 1.9.39s2.54-1.16 5.35-1.18c2.81.02 4.49.89 5.35 1.18s1.64-.03 1.9-.39c.28-.37.39-1-.02-1.55"
              />
              <g fill="#404040">
                <ellipse cx="47.56" cy="58.72" rx="4.93" ry="5.1" />
                <ellipse cx="80.44" cy="58.72" rx="4.93" ry="5.1" />
              </g>
              <path
                fill="#795548"
                d="M72.42 76.05c-3.18 1.89-13.63 1.89-16.81 0c-1.83-1.09-3.7.58-2.94 2.24c.75 1.63 6.44 5.42 11.37 5.42s10.55-3.79 11.3-5.42c.75-1.66-1.09-3.33-2.92-2.24"
              />
              <path
                fill="#e59600"
                d="M67.86 67.96c-.11-.04-.21-.07-.32-.08h-7.08c-.11.01-.22.04-.32.08c-.64.26-.99.92-.69 1.63s1.71 2.69 4.55 2.69s4.25-1.99 4.55-2.69s-.05-1.37-.69-1.63"
              />
              <path
                fill="#543930"
                d="M99.27 23.45c-.79-4.72-13.85-13.12-18.74-14.67c-13.24-4.19-21.85-2.49-26.47.03c-.96.52-7.17 3.97-11.51 1.5c-2.72-1.55-10.53 10.84-14.46 13.21c-4.59 2.77-4.19 7.81-3.49 9.77c-2.52 2.14-5.69 6.69-3.52 12.6c1.64 4.45 8.17 6.5 8.17 6.5c-.62 10.74 2.28 15.95 2.28 15.95s4.69-18.45 4.3-21.27c0 0 7.76-1.54 16.57-6.58c5.95-3.41 10.02-7.4 16.71-8.91c10.18-2.29 12.45 5.08 12.45 5.08s9.42-1.81 12.26 11.27c1.17 5.38 1.93 14.3 2.57 19.77c-.06-.48 3.24-6.33 3.86-12.33c.16-1.55 4.34-3.6 6.14-10.26c2.4-8.88-.24-18.5-7.12-21.66"
              />
              <radialGradient
                id="notoStudent6"
                cx="82.872"
                cy="84.536"
                r="33.876"
                gradientTransform="matrix(.3076 .9515 .706 -.2282 -2.303 -16.1)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".699" stop-color="#6d4c41" stop-opacity="0" />
                <stop offset="1" stop-color="#6d4c41" />
              </radialGradient>
              <path
                fill="url(#notoStudent6)"
                d="M106.4 45.1c-1.5 5.53-4.63 7.88-5.75 9.41c-1.54-9.37-1.3-18.27-12.71-28.81c0 0 2.29-.49 3.41-2.53c.87-1.59.54-3.57.54-3.57c.38.02.77.06 1.17.11c1.96.36 3.96 1.32 5.79 2.55c.22.42.36.82.42 1.19c6.88 3.15 9.53 12.77 7.13 21.65"
              />
              <radialGradient
                id="notoStudent7"
                cx="38.533"
                cy="84.7"
                r="16.886"
                gradientTransform="matrix(.9907 .1363 .1915 -1.3921 -15.859 155.958)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".598" stop-color="#6d4c41" stop-opacity="0" />
                <stop offset="1" stop-color="#6d4c41" />
              </radialGradient>
              <path
                fill="url(#notoStudent7)"
                d="M24.37 33.49c-2.37 2.1-5.56 6.79-3.21 12.61c1.77 4.39 8.09 6.29 8.09 6.29c0 .02 1.26.4 1.91.4l1.48-21.9c-3.03 0-5.94.91-7.82 2.22c.03.03-.46.35-.45.38"
              />
              <radialGradient
                id="notoStudent8"
                cx="37.086"
                cy="95.778"
                r="12.941"
                gradientTransform="matrix(-.9657 -.2598 -.2432 .9037 96.192 -44.696)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".66" stop-color="#6d4c41" stop-opacity="0" />
                <stop offset="1" stop-color="#6d4c41" />
              </radialGradient>
              <path
                fill="url(#notoStudent8)"
                d="M32.69 30.9v-.05c-3.03 0-5.93.91-7.82 2.21c0 .03-.15.14-.27.23v-.01c.01-.01.03-.02.04-.03c-.7-1.96-1.11-7 3.49-9.77c.44-.27.93-.66 1.46-1.15c1.22-.5 2.52-.79 3.72-.91c.35-.03.99-.08 1.18-.08l4.81.59z"
              />
              <path
                fill="#e8ad00"
                d="M116.67 53.3c-1.24 0-2.25.96-2.25 2.14v9.2c0 1.18 1.01 2.14 2.25 2.14s2.25-.96 2.25-2.14v-9.2c0-1.18-1.01-2.14-2.25-2.14m-4.5 0c-1.24 0-2.25.96-2.25 2.14v9.2c0 1.18 1.01 2.14 2.25 2.14s2.25-.96 2.25-2.14v-9.2c0-1.18-1.01-2.14-2.25-2.14"
              />
              <path
                fill="#ffca28"
                d="M114.42 53.3c-1.24 0-2.25.96-2.25 2.14v11.19c0 1.18 1.01 2.14 2.25 2.14s2.25-.96 2.25-2.14V55.44c0-1.18-1.01-2.14-2.25-2.14"
              />
              <ellipse cx="114.42" cy="52.07" fill="#ffca28" rx="2.76" ry="2.63" />
              <path
                fill="#504f4f"
                d="M114.42 52.04c-.55 0-1-.45-1-1v-38c0-.55.45-1 1-1s1 .45 1 1v38c0 .55-.45 1-1 1"
              />
              <linearGradient
                id="notoStudent9"
                x1="63.417"
                x2="63.417"
                y1="128.333"
                y2="99.693"
                gradientTransform="matrix(1 0 0 -1 0 128)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".003" stop-color="#424242" />
                <stop offset=".472" stop-color="#353535" />
                <stop offset="1" stop-color="#212121" />
              </linearGradient>
              <path
                fill="url(#notoStudent9)"
                d="M115.42 12c-30.83-7.75-52-8-52-8s-21.17.25-52 8v.77c0 1.33.87 2.5 2.14 2.87c3.72 1.1 11.47 3.34 16.53 4.36c0 0-1.11 1.71-2 3.52c0 0 9.95 5.92 35.33 8.48c25.38-2.56 35.85-8.55 35.85-8.55c-.88-1.81-1.98-3.45-1.98-3.45c4.5-.74 12.32-3.14 16.04-4.32c1.25-.4 2.09-1.55 2.09-2.86z"
              />
              <linearGradient
                id="notoStudenta"
                x1="63.417"
                x2="63.417"
                y1="128.167"
                y2="97.167"
                gradientTransform="matrix(1 0 0 -1 0 128)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".003" stop-color="#616161" />
                <stop offset=".324" stop-color="#505050" />
                <stop offset=".955" stop-color="#242424" />
                <stop offset="1" stop-color="#212121" />
              </linearGradient>
              <path
                fill="url(#notoStudenta)"
                d="M63.42 4s-21.17.25-52 8c0 0 35.41 9.67 52 9.38c16.59.29 52-9.38 52-9.38c-30.84-7.75-52-8-52-8"
              />
              <linearGradient
                id="notoStudentb"
                x1="13.309"
                x2="114.137"
                y1="110.001"
                y2="110.001"
                gradientTransform="matrix(1 0 0 -1 0 128)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".001" stop-color="#bfbebe" />
                <stop offset=".3" stop-color="#212121" stop-opacity="0" />
                <stop offset=".7" stop-color="#212121" stop-opacity="0" />
                <stop offset="1" stop-color="#bfbebe" />
              </linearGradient>
              <path
                fill="url(#notoStudentb)"
                d="M115.42 12c-30.83-7.75-52-8-52-8s-21.17.25-52 8v.77c0 1.33.87 2.5 2.14 2.87c3.72 1.1 11.47 3.34 16.53 4.36c0 0-1.11 1.71-2 3.52c0 0 9.95 5.92 35.33 8.48c25.38-2.56 35.85-8.55 35.85-8.55c-.88-1.81-1.98-3.45-1.98-3.45c4.5-.74 12.32-3.14 16.04-4.32c1.25-.4 2.09-1.55 2.09-2.86z"
                opacity="0.4"
              />
              <path
                fill="#212121"
                d="M114.5 120.99c0-14.61-21.75-21.54-40.72-23.1l-8.6 11.03c-.28.36-.72.58-1.18.58s-.9-.21-1.18-.58L54.2 97.87c-10.55.81-40.71 4.75-40.71 23.12V124h101z"
              />
              <radialGradient
                id="notoStudentc"
                cx="64"
                cy="5.397"
                r="54.167"
                gradientTransform="matrix(1 0 0 -.5247 0 125.435)"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset=".598" stop-color="#212121" />
                <stop offset="1" stop-color="#616161" />
              </radialGradient>
              <path
                fill="url(#notoStudentc)"
                d="M114.5 120.99c0-14.61-21.75-21.54-40.72-23.1l-8.6 11.03c-.28.36-.72.58-1.18.58s-.9-.21-1.18-.58L54.2 97.87c-10.55.81-40.71 4.75-40.71 23.12V124h101z"
              />
            </svg>
          )}

          <Typography variant="h6" color={sidenavType === 'dark' ? 'white' : 'blue-gray'}>
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className="m-4">
        {routes.slice(0, 1).map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === 'dark' ? 'white' : 'blue-gray'}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path }) => (
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? 'gradient' : 'text'}
                      color={
                        isActive ? sidenavColor : sidenavType === 'dark' ? 'white' : 'blue-gray'
                      }
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                    >
                      {icon}
                      <Typography color="inherit" className="font-medium capitalize">
                        {name}
                      </Typography>
                    </Button>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: '/img/logo.svg',
  brandName: 'Pass Capstone',
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = '/src/widgets/layout/sidnave.jsx';

export default Sidenav;
