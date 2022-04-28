import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Grid } from '@mui/material';
import { Box } from '@mui/system';

export default function MultiActionAreaCard() {
    return (
        <Box>
            <Grid container
                spacing={{ xs: 1, md: 2 }} columns={{ xs: 4, sm: 8, md: 12 }} columnGap={{ xs: 4, md: 10 }}
            >
                <Card sx={{ maxWidth: 500, marginBottom: 10 }}>
                    <a target="_blank" href="https://github.com/lumialfe">
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://avatars.githubusercontent.com/u/60442261?v=4"
                                alt="Developer Profile Picture."
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Luis Miguel Alonso Ferreiro
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    I like cars and concept design, specially if 3D software is involved.
                                    You can check my art at @alonsodsgn
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </a>
                </Card>

                <Card sx={{ maxWidth: 500, marginBottom: 10 }}>
                    <a target="_blank" href="https://github.com/danieladov">
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://avatars.githubusercontent.com/u/29411250?v=4"
                                alt="Developer Profile Picture."
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Daniel Álvarez Díaz
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    I'm a software developer student, I like to build things and I'm always looking for new challenges.
                                    Frontend makes me go bye bye, that's why I only do backend.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </a>
                </Card>

                <Card sx={{ maxWidth: 500, marginBottom: 10 }}>
                    <a target="_blank" href="https://github.com/jesugmend">
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://avatars.githubusercontent.com/u/60233951?v=4"
                                alt="Developer Profile Picture."
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Jesús González Méndez
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    I'm a very chill guy who happens to like Software Developing and everything related.                                    
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </a>
                </Card>

                <Card sx={{ maxWidth: 500, marginBottom: 10 }}>
                    <a target="_blank" href="https://github.com/sebaslh01">
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://avatars.githubusercontent.com/u/66498000?v=4"
                                alt="Developer Profile Picture."
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Sebastián López Hernández
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                  I am first-gen student with a keen interest in software development.
                                  I like swimming and the IoT world. Working with this amazing team
                                  has been a pleasure.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </a>
                </Card>

                <Card sx={{ maxWidth: 500, marginBottom: 10 }}>
                    <a target="_blank" href="https://github.com/UO258220">
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="140"
                                image="https://avatars.githubusercontent.com/u/49642640?v=4"
                                alt="Developer Profile Picture."
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    Miguel Cuesta Martínez
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    I've enjoyed this opportunity to get work experience.
                                    I find React to be a framework with a lot of future.
                                    I like trains.
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </a>
                </Card>

            </Grid>
        </Box>
    );
}
