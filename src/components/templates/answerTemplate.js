import React from 'react';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

export default function AnswerTemplate(props) {
    return (

        <FormControlLabel value={props.answer ? props.answer : ''} control={<Radio color="primary" className="radioBtn" />} label={props.answer ? props.answer : ''} />

    );
}