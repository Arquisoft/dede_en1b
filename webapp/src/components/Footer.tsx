import { AppBar, Toolbar, Typography, Link } from "@mui/material";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import { useState } from "react";
import { BorderAll } from "@material-ui/icons";

function Footer() : JSX.Element {
    const [selected, setSelected] = useState(0);
     return (
       <>
            <BottomNavigation
                style={{ width: "100%",
                    backgroundColor: "lavender",
                    marginTop: "5%",
                    marginBottom: "5%",
                    height: "200px"
                }}
                showLabels
            >
                <BottomNavigationAction label="About Us" icon={<GroupRoundedIcon />} href="/about_us" />
                <BottomNavigationAction label="SOLID" icon={<CircleRoundedIcon />} href="https://solidproject.org/" />
                <BottomNavigationAction label="Source code" icon={<CodeRoundedIcon />} href="https://github.com/arquisoft/dede_en_01b" />
                    {/* <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        <Link href="/" ><img src="./logo.png" alt="DeDe logo."/></Link>
                    </Typography>

                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        <Link href="/aboutus" >Sobre nosotros</Link>
                    </Typography>
                     <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        <Link href="https://solidproject.org/">SOLID</Link>
                    </Typography>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        <Link href="https://github.com/arquisoft/dede_en_01b">Source code</Link>
                    </Typography> */}
                </BottomNavigation>
       </>
     );
}

export default Footer;
