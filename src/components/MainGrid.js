import React, { useContext, useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SelectCountry from './SelectCountry';
import CountryContext from './CountryContext/CountryContext';
import CountUp from 'react-countup';
import BarChart from './BarChart';
import PieChart from './PieChart';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '20px',
    paddingTop:'8px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  Infected: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderBottom: '8px solid rgba(63,81,181,0.8)',
  },
  recovered: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderBottom: '8px solid limegreen',
  },
  death: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderBottom: '8px solid rgba(246, 36, 89, 1)',
  },
  heading: {
    fontWeight: 'bold',
    textTransform: 'upperCase',
  },
  countContaienr: {
    textAlign: 'left',
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '15px',
    flexDirection: 'column',
  }
}));

export default function MainGrid() {
  const classes = useStyles();
  const data = useContext(CountryContext);
  const [totalNum, setTotalNum] = useState(0);
  const [recNum, setRecNum] = useState(0);
  const [detNum, setDetNum] = useState(0);
  const [date, setDate] = useState();

  useEffect(() => {

    const getData = async () => {
      let apiResponse = await fetch('https://api.covid19api.com/summary');
      let apiData = await apiResponse.json();
      if (data[0] === 'Global') {
        setTotalNum(apiData[data[0]].TotalConfirmed);
        setRecNum(apiData[data[0]].TotalRecovered);
        setDetNum(apiData[data[0]].TotalDeaths);
        let d = new Date(apiData[data[0]].Date);
        setDate(d.toDateString());
      } else {
        let contriesList = apiData['Countries'];
        for (let i = 0; i < contriesList.length; i++) {
          if (contriesList[i].Country === data[0]) {
            setTotalNum(contriesList[i].TotalConfirmed);
            setRecNum(contriesList[i].TotalRecovered);
            setDetNum(contriesList[i].TotalDeaths);
            let d = new Date(contriesList[i].Date);
            setDate(d.toDateString())
          }
        }
      }
    }
    getData();
  });

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <a target="_blank" rel="noreferrer" href="https://www.vecteezy.com/free-vector/glass">
            <img style={{ width: "100px" }} alt="Coivd 19 Tracker" src="logo.jpg" />
          </a>
          <SelectCountry />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.Infected}>
            <Typography variant="subtitle1" className={classes.heading}>
              Infected
            </Typography>
            <div className={classes.countContaienr}>
              <Typography variant="h5" className={classes.heading}>
                <CountUp start={0} end={totalNum} separator={','} delay={0} />
              </Typography>
              <Typography variant="body2" className={classes.heading}>
                {date}
              </Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.recovered}>
            <Typography variant="subtitle1" className={classes.heading}>
              Recovered
            </Typography>
            <div className={classes.countContaienr}>
              <Typography variant="h5" className={classes.heading}>
                <CountUp start={0} end={recNum} separator={','} delay={0} />
              </Typography>
              <Typography variant="body2" className={classes.heading}>
                {date}
              </Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.death}>
            <Typography variant="subtitle1" className={classes.heading}>
              Death
            </Typography>
            <div className={classes.countContaienr}>
              <Typography variant="h5" className={classes.heading}>
                <CountUp start={0} end={detNum} separator={','} delay={0} />
              </Typography>
              <Typography variant="body2" className={classes.heading}>
                {date}
              </Typography>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <BarChart barData={{ infected: totalNum, recoverd: recNum, deths: detNum }} />
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper className={classes.paper}>
                <PieChart barData={{ infected: totalNum, recoverd: recNum, deths: detNum }} />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
