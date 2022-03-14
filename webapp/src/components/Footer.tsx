import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import GroupRoundedIcon from '@mui/icons-material/GroupRounded';
import CircleRoundedIcon from '@mui/icons-material/CircleRounded';
import CodeRoundedIcon from '@mui/icons-material/CodeRounded';

function Footer(): JSX.Element {

    return (
        <>
            <BottomNavigation
                style={{
                    width: "100vw",
                    backgroundColor: "lavender",
                    marginTop: "5%",
                    height: "20vh",
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
