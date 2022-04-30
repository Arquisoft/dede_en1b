import { Typography,Link } from "@mui/material"


const PageNotFound = () => {
    return (
        <div style={{display:'inline-block', marginTop:'40px',  textAlign: 'center', marginLeft:'25%', marginRight:'25%'}}>
            <Typography style={{fontSize:'2.2em', color:'#F23005', fontWeight:'bold'}}>SORRY</Typography>
            <Typography style={{fontSize:'1.5'}}>We couldn't find the page you're looking for!!</Typography>
            <Typography style={{fontSize:'1.5'}}>Try navigating through the  <Link id="li" href="/">principal page</Link>!</Typography>
        </div>
    )
}

export default PageNotFound