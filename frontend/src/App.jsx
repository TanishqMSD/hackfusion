import React from 'react';
import { useSelector } from 'react-redux'; // Get role from Redux
import SettingsIcon from '@mui/icons-material/Settings';
import AnnouncementIcon from '@mui/icons-material/Campaign';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AssignmentIcon from '@mui/icons-material/Assignment';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import EventIcon from '@mui/icons-material/Event';
import { ReactRouterAppProvider } from '@toolpad/core/react-router';
import { Outlet } from 'react-router';
import { extendTheme } from '@mui/material/styles'
import GavelIcon from "@mui/icons-material/Gavel";
import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import DescriptionIcon from '@mui/icons-material/Description';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'election',
    title: 'Election',
    icon: <DashboardIcon />,
  },
  {
    segment: 'pending-request',
    title: 'Pending Requests',
    icon: <ShoppingCartIcon />,
  },
  // {
  //   kind: 'divider',
  // },
  // {
  //   kind: 'header',
  //   title: 'Analytics',
  // },
  {
    segment: 'dashboard',
    title: 'Facility Booking',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'facility',
        title: 'Facilities',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'admin',
        title: 'Admin Pannel',
        icon: <DescriptionIcon />,
      },
    ],
  },
  {
    segment: 'pending-request',
    title: 'Requests',
    icon: <LayersIcon />,
  },
];

const BRANDING = {
  title: 'CollegeConnect',
};

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function App() {
  const userRole = useSelector(state => state.auth.userData); // Fetch user role from Redux
  // console.log(userRole);

  // Define sidebar navigation conditionally
  const NAVIGATION = [
    {
      kind: 'header',
      title: 'Main Items',
    },
    {
      segment: 'notices',
      title: 'Announce',
      icon: <AnnouncementIcon />,
    },
    {
      segment: 'pending-request',
      title: 'Pending Requests',
      icon: <ShoppingCartIcon />,
    },
    {
      segment: 'college-dashboard',
      title: 'College Dashboard',
      icon: <BusinessCenterIcon />,
    },
    {
      segment: 'student-dashboard',
      title: 'Student Dashboard',
      icon: <BusinessCenterIcon />,
    },
    {
      segment: 'admin-dashboard',
      title: 'Admin ',
      icon: <BusinessCenterIcon />,
    },
    {
      segment: 'dashboard',
      title: 'Facility Booking',
      icon: <BarChartIcon />,
      children: [
        {
          segment: 'booking',
          title: 'Booking',
          icon: <DescriptionIcon />,
        },
        {
          segment: 'admin',
          title: 'Admin Pannel',
          icon: <DescriptionIcon />,
        },
      ],
    },
    {
      segment: 'election',
      title: 'Elections',
      icon: <HowToVoteIcon />,
    },
    {
      segment: 'dashboard',
      title: 'Facilities Booking',
      icon: <BusinessCenterIcon />,
    },
    {
      segment: 'applications',
      title: 'Applications',
      icon: <AssignmentIcon />,
    },
    {
      segment: 'wallofshame',
      title: 'Wall of Shame',
      icon: <GavelIcon />,
    },
    {
      segment: 'admin-wallofshame',
      title: 'Wall of Shame',
      icon: <GavelIcon />,
    },
    {
      segment: 'complaints',
      title: 'Complaint Box',
      icon: <ReportProblemIcon />,
    },
    {
      segment: 'admin-complaints',
      title: 'Admin Complaints',
      icon: <ReportProblemIcon />,
    },
    {
      segment: 'events',
      title: 'Events',
      icon: <EventIcon />,
    },
    {
      segment: 'application-page',
      title: 'Applicationuser',
      icon: <EventIcon />,
    },
    {
      segment: 'admin-application',
      title: 'ApplicationAdmin',
      icon: <EventIcon />,
    },
    ...(userRole === 'admin'
      ? [
        {
          segment: 'config',
          title: 'Config',
          icon: <SettingsIcon />,
        },
      ]
      : []),
  ];

  return (
    <ReactRouterAppProvider navigation={NAVIGATION} branding={BRANDING}>
      <Outlet /> {/* This will render nested routes */}
    </ReactRouterAppProvider>
  );
}

export default App;