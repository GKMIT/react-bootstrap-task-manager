import React from 'react';

class FormLayout extends React.Component {
    render() {
        const { classes, title, fullWidth } = this.props

        return (
            <div>
                {/* <Grid container direction="row" justify="center" alignItems="center">
                    <CssBaseline />
                    <Grid item xs={12} sm={12} md={fullWidth ? 12 : 6} component={Paper} elevation={6} square>
                        <div className={classes.paper}>
                            <Typography component="h1" variant="h5">
                                {title}
                            </Typography>
                            {this.props.children}
                        </div>
                    </Grid>
                </Grid> */}

                {this.props.children}
            </div>
        );
    }
}


export default FormLayout;
