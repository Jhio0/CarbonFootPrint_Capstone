import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useEffect, useState } from 'react';
import { getReports } from '../reports/_services/reports-service';
import { UserAuth  } from "../context/AuthContext.js";

export const UserReports = () => {
  const [reports, setReports] = useState([]);
  const { user } = UserAuth(); // Get the user from the auth hook

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


  if (!reports) {
    return null;
  }

  return (
    <>
      {/* Map through the reports array and render a Card component for each report */}
      {reports.map((report) => (
        <Card key={report.id} sx={{ width: '100%', marginBottom: '20px' }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              src="/reportsdefault.jpg" 
              alt="Report Image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {report.title}
              </Typography>
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
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
};
