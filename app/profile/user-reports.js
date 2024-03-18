import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { useEffect, useState } from 'react';
import { getReports } from '../_services/reports-service';

export const UserReports = () => {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const reportsData = await getReports();
      setReports(reportsData);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);


  if (!reports || reports.length === 0) {
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
              image={report.image}
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
