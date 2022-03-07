function Footer() : JSX.Element {
     return (
       <>
            <AppBar>
                <Toolbar>
                    <Typography
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
                    </Typography>
                </Toolbar>
            </AppBar>
       </>
     );
}

export default Footer;