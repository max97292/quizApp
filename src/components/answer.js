import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function ShowDialog(props) {
    const { open } = props;

    const handleReload = () => {
        document.location.reload();
    }

    return (
        <Dialog aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Your result is: {props.personality ? props.personality : ''}</DialogTitle>
            <DialogContent>
                <DialogContentText>{props.personalityInfo ? props.personalityInfo : ''}</DialogContentText>
            </DialogContent>
            <Button variant="contained" onClick={handleReload}>Restart</Button>
        </Dialog>
    );
}

ShowDialog.propTypes = {
    open: PropTypes.bool.isRequired,
};