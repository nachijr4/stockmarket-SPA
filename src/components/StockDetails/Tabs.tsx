import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Container } from 'react-bootstrap';
import './stockDetails.css'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function StockTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const tabStyle = {
    fontSize: ".8rem",
    fontWeight: "700",
    color: "#808080ba"
  }


  return (
    <Container>
        <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
            <Tabs value={value} centered variant="fullWidth" onChange={handleChange} aria-label="Stock Tabs">
            <Tab sx={tabStyle}  label="Summary" {...a11yProps(0)} />
            <Tab sx={tabStyle} label="Top News" {...a11yProps(1)} />
            <Tab sx={tabStyle} label="Charts" {...a11yProps(2)} />
            <Tab sx={tabStyle} label="Insights" {...a11yProps(3)} />
            </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
            Item One
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
            Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
            Item Three
        </CustomTabPanel><CustomTabPanel value={value} index={3}>
            Item Four
        </CustomTabPanel>
        </Box>
    </Container>
  );
}