import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import RadioGroup from '@material-ui/core/RadioGroup';
import AnswerTemplate from './answerTemplate';

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

    useEffect(() => {
        const fetchData = async () => {
            const respAnswer = await axios('https://my-json-server.typicode.com/max97292/quizQuestions/answers');
            props.setAnswers(respAnswer.data);
        };
        fetchData();
    }, []);

    const itemList = props.answers.map((item) => {
        if (item.questionId === props.id) {
            return (
                <AnswerTemplate
                    key={item.id}
                    answer={item.answer}
                />

            )
        }
    });

    const formatArray = (event) => {
        let userAnswers = props.userAnswers;
        if (userAnswers.length) {
            if (userAnswers.filter(item => item.questionId === props.id).length > 0) {
                if (userAnswers.filter(item => item.answer !== event.target.value)) {
                    userAnswers.splice(userAnswers.findIndex(v => v.questionId === props.id), 1);
                    userAnswers.push({ questionId: props.id, answer: event.target.value });
                    return userAnswers;
                }
            } else {
                userAnswers.push({ questionId: props.id, answer: event.target.value });
                count += 1;
                return userAnswers;
            }
        } else {
            userAnswers.push({ questionId: props.id, answer: event.target.value });
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
                        <div>{props.answers && itemList}</div>
                    </RadioGroup>
                </Box>

            </CardContent>
        </Card>
    );
}