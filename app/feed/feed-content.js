import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert'; // Adding MoreVertIcon
import CardHeader from '@mui/material/CardHeader'; // Adding CardHeader
import Button from '@mui/material/Button';
import { CardActionArea, CardActions, Collapse, Container } from '@mui/material';
import { getPublicReports } from '../reports/_services/reports-service';
import { UserAuth } from "../context/AuthContext.js";

export const PublicReports = () => {
  const [reports, setReports] = useState([]);
  const { user } = UserAuth();
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
      console.log("Reports", reports);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, [user]);

  if (!reports) {
    return null;
  }

  return (
    <>
      {reports.map((report) => (
        <Card key={report.id} sx={{ width: '100%', marginBottom: '20px' }}>
          <CardHeader
              title="User"
              action={
                <Button style={{ marginLeft: 'auto' }}>
                  View page
                </Button>
              }
            />

          <CardActionArea>
            <div style={{ position: 'relative' }}>
              <CardMedia
                component="img"
                src="/reportsdefault.jpg" 
                alt="Report Image"
                sx={{ height: 200, objectFit: 'fill', backgroundColor: 'rgba(0, 0, 0, 0.5)'}}
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
            {user && (
              <>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </>
            )}
            <div style={{ margin: user ? '0px 0px 0px 90%' : 'auto' }}>
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
          <Collapse in={expandedCards[report.id]}  timeout="auto" unmountOnExit>
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