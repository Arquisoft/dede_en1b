import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';
import { useState } from "react";
import { Router } from "react-router-dom";

function Footer() : JSX.Element {
    const [selected, setSelected] = useState(0);
    
     return (
       <>
            <BottomNavigation
                style={{ width: "100%",
                    backgroundColor: "lavender",
                    marginTop: "5%",
                    height: "22ch",
                    position: "static",
                    bottom: "0",
                    left:"0"
                }}
                showLabels
            >
                <BottomNavigationAction label="About Us" icon={<GroupRoundedIcon />} href="/about_us" />
                <BottomNavigationAction label="SOLID" icon={<CircleRoundedIcon />} href="https://solidproject.org/" />
                <BottomNavigationAction label="Source code" icon={<CodeRoundedIcon />} href="https://github.com/arquisoft/dede_en_01b" />
            </BottomNavigation>
       </>
     );
}

export default Footer;
