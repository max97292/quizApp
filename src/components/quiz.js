import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuizTemplate from './templates/itemQuizTemplate';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import ShowDialog from './answer';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { makeStyles } from '@material-ui/core/styles';
import { FormLabel } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    title: {
        fontSize: 25,
        fontWeight: "bold",
        textAlign: "center",
    },
    container: {
        display: "flex",
        flexDirection: "column",
        marginLeft: "5%",
        marginRight: "5%",
    },
    submit: {
        display: "flex",
        justifyContent: 'center',
        marginTop: "1%",
    },
    helper: {
        marginTop: "1%",
        textAlign: "center",
    },
}));

export default function Quiz(props) {
    const classes = useStyles();

    const [value, setValue] = useState(0);
    const [error, setError] = useState(false);
    const [userAnswers, setUserAnswers] = useState([]);
    const [helperText, setHelperText] = useState('');
    const [open, setOpen] = useState(false);
    const [personality, setPersonality] = useState('');
    const [personalityInfo, setPersonalityInfo] = useState('');
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const respQuestion = await axios('https://my-json-server.typicode.com/max97292/quizQuestions/questions');
            setQuestions(respQuestion.data);
        };
        fetchData();
    }, []);

    const itemList = questions.map((item) => {
        return (
            <QuizTemplate
                key={item.id}
                id={item.id}
                question={item.question}
                setValue={setValue}
                setError={setError}
                setUserAnswers={setUserAnswers}
                userAnswers={userAnswers}
                answers={answers}
                setAnswers={setAnswers}
            />

        )
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let sum = 0;
        if (value > 4) {
            setHelperText('');
            setError(false);
            for (let item of userAnswers) {
                let resultAnswer = answers.find(i => i.answer === item.answer && i.questionId === item.questionId).weight;
                sum += resultAnswer;
            }
            if (sum >= 20 && sum <= 37) {
                setPersonality("Stern");
                setPersonalityInfo("You’re a very serious person!");
            }
            else if (sum > 37 && sum <= 62) {
                setPersonality("Funny");
                setPersonalityInfo("You have a wicked sense of humour!");
            }
            else if (sum > 62 && sum <= 86) {
                setPersonality("Outgoing");
                setPersonalityInfo("You’re a perfect mix of funny, chill, and intelligence!");
            }
            else if (sum > 86) {
                setPersonality("Shy");
                setPersonalityInfo("You’re shy and reserved!");
            }
            handleClickOpen();
        } else {
            setHelperText('Please answer all questions.');
            setError(true);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl className={classes.container} component="fieldset" error={error}>
                <FormLabel className={classes.title} component="legend">Tell Us Your Favorite Foods And We’ll Guess What Type Of Personality You Have</FormLabel>
                <div className={classes.container}>{questions && itemList}</div>
                <Box className={classes.submit}>
                    <Button variant="contained" type="submit">Submit</Button>
                </Box>
                <FormHelperText className={classes.helper}>{helperText}</FormHelperText>
                <ShowDialog open={open} personality={personality} personalityInfo={personalityInfo} />
            </FormControl>
        </form>
    )
}