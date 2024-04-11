import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardHeader from '@mui/material/CardHeader'; // Adding CardHeader
import { CardActionArea, CardActions, Collapse } from '@mui/material';
import { getPublicReports } from '../reports/_services/reports-service';

export const PublicReports = () => {
  const [reports, setReports] = useState([]);
  const [expandedCards, setExpandedCards] = useState({}); // State to track expanded cards

  const handleExpandClick = (reportId) => {
    setExpandedCards(prevState => ({
      ...prevState,
      [reportId]: !prevState[reportId]
    }));
  };

  const fetchReports = async () => {
    try {
      const reportsData = await getPublicReports();
      setReports(reportsData);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (!reports) {
    return null;
  }

  // Sort the reports by date
  const sortedReports = reports.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <>
      {sortedReports.map((report) => (
        <Card key={report.id} sx={{ width: '100%', marginBottom: '20px' }}>
          <CardHeader
            title={report.author}
          />
          <CardActionArea>
            <div style={{ position: 'relative' }}>
              <CardMedia
                component="img"
                src="/reportspublic.jpg"
                alt="Report Image"
                sx={{ height: 200, objectFit: 'fill', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
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
            </div>
          </CardActionArea>
          <CardActions disableSpacing>
            <div style={{ margin: 'auto' }}>
              <IconButton
                aria-label="show more"
                onClick={() => handleExpandClick(report.id)}
                aria-expanded={expandedCards[report.id]}
                expand={expandedCards[report.id]}
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
