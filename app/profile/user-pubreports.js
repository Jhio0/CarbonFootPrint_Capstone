import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';  
import { CardActionArea, CardActions, Collapse, } from '@mui/material';
import { getPublicReports, deletePublicReport } from '../reports/_services/reports-service';
import { UserAuth } from "../context/AuthContext.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UserPubReports = () => {
  const [reports, setReports] = useState([]);
  const { user } = UserAuth();  
  const [expandedCards, setExpandedCards] = useState({});  
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  
  const handleDelete = async (reportId) => {
    try {
      await deletePublicReport(reportId);
      toast.success("Successfully deleted report.", { position: "top-center" });
      setReports(reports.filter(report => report.id !== reportId));
    } catch (error) {
      console.error('Error deleting report:', error);
    }
  };
  
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleExpandClick = (reportId) => {
    setExpandedCards(prevState => ({
      ...prevState,
      [reportId]: !prevState[reportId]
    }));
  };

  const fetchPubReports = async () => {
    try {
      const reportsData = await getPublicReports();
      const filteredReports = reportsData.filter(report => report.uid === user.uid);
      setReports(filteredReports);
      console.log("Reports", filteredReports);
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };
  

  useEffect(() => {
    fetchPubReports();
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
                src="/reportspublic.jpg"
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
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
    
  );
};
