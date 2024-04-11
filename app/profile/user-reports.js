import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'; // Importing DeleteOutlinedIcon
import { CardActionArea, CardActions, Collapse,} from '@mui/material'; // Import MenuItem
import { getReports, deleteReport } from '../reports/_services/reports-service';
import { UserAuth } from "../context/AuthContext.js";

export const UserReports = () => {
  const [reports, setReports] = useState([]);
  const { user } = UserAuth();
  const [expandedCards, setExpandedCards] = useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleDelete = async (reportId) => {
    try {
      await deleteReport(user.uid, reportId);
      setReports(reports.filter(report => report.id !== reportId));
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };
  

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = (reportId) => {
    setExpandedCards((prevState) => ({
      ...prevState,
      [reportId]: !prevState[reportId],
    }));
  };

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
      {reports.map((report) => (
        <Card key={report.id} sx={{ width: '100%', marginBottom: '20px' }}>
          <CardActionArea>
            <div style={{ position: 'relative' }}>
              <CardMedia
                component="img"
                src="/reportsprivate.jpg"
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
                style={{ position: 'absolute', top: 5, right: 5, color: 'white' }}
                onClick={() => handleDelete(report.id)}
              >
                <DeleteOutlinedIcon />
              </IconButton>
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