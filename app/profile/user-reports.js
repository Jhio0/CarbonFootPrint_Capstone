import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Adding MoreVertIcon
import { CardActionArea, CardActions, Collapse } from '@mui/material';
import { getReports } from '../reports/_services/reports-service';
import { UserAuth } from "../context/AuthContext.js";

export const UserReports = () => {
  const [reports, setReports] = useState([]);
  const { user } = UserAuth(); // Get the user from the auth hook
  const [expandedCards, setExpandedCards] = useState({}); // State to track expanded cards
  
  const fetchReports = async () => {
    try {
      const reportsData = await getReports(user.uid);
      setReports(reportsData);
      console.log("Reports", reports);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [user]);

  const handleExpandClick = (reportId) => {
    setExpandedCards(prevState => ({
      ...prevState,
      [reportId]: !prevState[reportId]
    }));
  };

  if (!reports) {
    return null;
  }

  return (
    <>
      {/* Map through the reports array and render a Card component for each report */}
      {reports.map((report) => (
        <Card key={report.id} sx={{ width: '100%', marginBottom: '20px' }}>
          <CardActionArea>
            <div style={{ position: 'relative' }}>
              <CardMedia
                component="img"
                src="/reportsdefault.jpg"
                alt="Report Image"
                sx={{ height: 150, objectFit: 'fill' }}
              />
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                style={{
                  position: 'absolute',
                  bottom: '0',
                  left: '0',
                  width: '100%',
                  color: 'white',
                  padding: '8px',
                  boxSizing: 'border-box',
                }}
              >
                {report.title}
              </Typography>
              <IconButton 
                aria-label="settings"
                style={{ position: 'absolute', top: 5, right: 5, color: 'white' }}>
                <MoreVertIcon />
              </IconButton>
            </div>
          </CardActionArea>
          <CardActions disableSpacing>
            <div style={{ margin: 'auto' }}> {/* Container to center the icon */}
              <IconButton
                aria-label="show more"
                onClick={() => handleExpandClick(report.id)} // Pass report id to handleExpandClick
                aria-expanded={expandedCards[report.id]} // Use expanded state for the specific card
                expand={expandedCards[report.id]} // Use expanded state for the specific card
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>
          </CardActions>
          <Collapse in={expandedCards[report.id]} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography variant="body2" component="div">
                {report.date}
              </Typography>
              <Typography variant="body2" component="div">
                {report.location}
              </Typography>
              <Typography variant="body2" component="div">
                {report.text}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {report.description}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </>
  );
};
