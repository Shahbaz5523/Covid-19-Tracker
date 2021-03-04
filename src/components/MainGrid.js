import React , {useContext , useState , useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SelectCountry from './SelectCountry';
import NumberFormat from 'react-number-format';
import CountryContext from './CountryContext/CountryContext';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding:'20px'
  },
  Infected:{
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderBottom:'8px solid',
  },
  recovered:{
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderBottom:'8px solid limegreen',
  },
  death:{
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    borderBottom:'8px solid rgba(246, 36, 89, 1)',
  },
  heading:{
      fontWeight:'bold',
      textTransform:'upperCase',
  },
  countContaienr:{
      textAlign:'left',
      display:'flex',
      flexWrap:'wrap',
      marginTop:'15px',
      flexDirection:'column',
  }
}));

export default function MainGrid() {
  const classes = useStyles();
  const data = useContext(CountryContext);
  const [totalNum , setTotalNum] = useState(0);
  const [recNum , setRecNum] = useState(0);
  const [detNum , setDetNum] = useState(0);
  const [date, setDate] = useState();
  const [gettingData,setGettingData] = useState(false);
  const [err , setErr] = useState('');
  useEffect(()=>{
    const getData = async ()=>{
      setGettingData(true);
      try {
        let apiResponse = await fetch('https://api.covid19api.com/summary');
        let apiData = await apiResponse.json();
        if(data[0] === 'Global'){
          setTotalNum(apiData[data[0]].TotalConfirmed);
          setRecNum(apiData[data[0]].TotalRecovered);
          setDetNum(apiData[data[0]].TotalDeaths);
          let d = new Date(apiData[data[0]].Date); 
          setDate(d.toDateString());
        }else{
          let contriesList = apiData['Countries'];
          for(let i=0; i<contriesList.length; i++){
            if(contriesList[i].Country === data[0]){
              setTotalNum(contriesList[i].TotalConfirmed);
              setRecNum(contriesList[i].TotalRecovered);
              setDetNum(contriesList[i].TotalDeaths);
              let d = new Date(contriesList[i].Date); 
              console.log(totalNum)
              setDate(d.toDateString())
            }
          }
        }
      } catch (error) {
        setErr(error);
      }
      setGettingData(false);
    }
    getData();
  },[data]);

  if(gettingData === true && err ===''){
    return <div>Data is Loading....</div>
  }
  if(gettingData === true && err !== ''){
    return <div>{err}</div>
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} style={{textAlign:'center'}}>
            <SelectCountry/>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper className={classes.Infected}>
            <Typography variant="subtitle1" className={classes.heading}>
                Infected
            </Typography>
            <div className={classes.countContaienr}>
                <Typography variant="h5" className={classes.heading}>
                    <NumberFormat value={totalNum} displayType={'text'} thousandSeparator={true}/>
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
                  <NumberFormat value={recNum} displayType={'text'} thousandSeparator={true}/>
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
                  <NumberFormat value={detNum} displayType={'text'} thousandSeparator={true}/>
                </Typography>
                <Typography variant="body2" className={classes.heading}>
                  {date}
                </Typography>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
