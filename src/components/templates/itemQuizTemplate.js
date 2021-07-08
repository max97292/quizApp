import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const useStyles = makeStyles({
    root: {
        minWidth: 25,
        margin: "1%",
    },
    title: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        fontSize: 20,
    },
});

let count = 0;

export default function QuizTemplate(props) {
    const classes = useStyles();

    const formatArray = (event) => {
        let userAnswers = props.userAnswers;
        if (userAnswers.length) {
            if (userAnswers.filter(item => item.questionId === props.id).length > 0) {
                    if (userAnswers.filter(item => item.answer !== event.target.value)) {
                        userAnswers.splice(userAnswers.findIndex(v => v.questionId === props.id), 1);
                        userAnswers.push({questionId: props.id, answer: event.target.value});
                        return userAnswers;
                    }
            } else {
                    userAnswers.push({questionId: props.id, answer: event.target.value});
                    count += 1;
                    return userAnswers;
            }
        } else {
            userAnswers.push({questionId: props.id, answer: event.target.value});
            count += 1;
            return userAnswers;
        }
    }

    const handleRadioChange = (event) => {
        props.setUserAnswers(formatArray(event));
        props.setValue(count);
        props.setError(false);
      };

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {props.question ? props.question : ''}
                </Typography>
                <Box display="flex" flexDirection="row" justifyContent="center">
                    <RadioGroup row aria-label="position" name="position" defaultValue="top" onChange={handleRadioChange}>
                        <FormControlLabel value={props.answer[0].answer ? props.answer[0].answer : ''} control={<Radio color="primary" className="radioBtn"/>} label={props.answer[0].answer ? props.answer[0].answer : ''} />
                        <FormControlLabel value={props.answer[1].answer ? props.answer[1].answer : ''} control={<Radio color="primary" className="radioBtn"/>} label={props.answer[1].answer ? props.answer[1].answer : ''} />
                        <FormControlLabel value={props.answer[2].answer ? props.answer[2].answer : ''} control={<Radio color="primary" className="radioBtn"/>} label={props.answer[2].answer ? props.answer[2].answer : ''} />
                        <FormControlLabel value={props.answer[3].answer ? props.answer[3].answer : ''} control={<Radio color="primary" className="radioBtn"/>} label={props.answer[3].answer ? props.answer[3].answer : ''} />
                    </RadioGroup>
                </Box>

            </CardContent>
        </Card>
    );
}