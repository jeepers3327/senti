import Router from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Center,
  Grid,
  Heading,
  Img,
  Stack,
  Textarea,
  useToast,
} from '@chakra-ui/react';

import { Content } from '@/components';
import { useAppDispatch, useAppSelector, useChannel } from '@/hooks';
import { setNextQuestion, setPresentation } from '@/store';
import {
  fetchCurrentPresentation,
  formatPresentation,
  getBorderColor,
} from '@/utils';

const Questionnaire = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const userPresentation = useAppSelector((state) => state.presentation);
  const [answer, setAnswer] = useState(``);
  const [hasSession, setHasSession] = useState(true);
  const [question, setQuestion] = useState<any>({ text: ``, responses: [] });

  const sessionId = localStorage.getItem(`session_id`);
  const presentationId = localStorage.getItem(`presentation_id`);

  const onChannelMessage = useCallback((event, payload) => {
    if (event === `session_ended`) {
      Router.push(`/scene/${sessionId}/ended`);
    }

    if (event === `next_question`) {
      const question_state = {
        index: payload.state.current_index,
        hasNext: payload.state.has_next,
      };

      dispatch(setNextQuestion(question_state));
    } else if (event === `session_started`) {
      Router.push(`/scene/${sessionId}/answer`);
    }
  }, []);

  const { broadcast } = useChannel(`session:${sessionId}`, onChannelMessage);

  const sendResponse = () => {
    broadcast(`session_response`, {
      session_id: sessionId,
      question_id: question.id,
      color: getBorderColor(),
      answer,
    });
    setAnswer(``);
  };

  useEffect(() => {
    if (!sessionId && !presentationId) {
      setHasSession(false);
      toast({
        title: `Invalid session, redirecting to home!`,
        status: `error`,
        position: `top`,
      });
      Router.push(`/`);
    } else {
      const fetchPresentation = async () => {
        const response = await fetchCurrentPresentation(sessionId as string);
        const data = formatPresentation(response);
        dispatch(setPresentation(data));
        setQuestion(data.presentation.questions[data.index]);
      };
      fetchPresentation();
    }
  }, []);

  useEffect(() => {
    if (!userPresentation.isLoading) {
      setQuestion(
        userPresentation.presentation.questions[userPresentation.index],
      );
    }
  }, [userPresentation]);

  if (!hasSession || !question) {
    return <div>Loading...</div>;
  }

  return (
    <Content hasNavbar={false}>
      <Box>
        <Center paddingTop="10rem">
          <Img src="/senti-dark.svg" height="5rem" width="md" />
        </Center>
        <Grid placeItems="center" paddingTop="8rem">
          <Stack width="xl">
            <Heading pb="3" fontSize="2rem" fontWeight="semibold">
              {question.text}
            </Heading>
            <Textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              maxLength={250}
              placeholder="Short answers are recommended. You can enter up to 250 characters
                only."
            />
            <Button onClick={sendResponse} colorScheme="blue">
              Submit answer
            </Button>
          </Stack>
        </Grid>
      </Box>
    </Content>
  );
};

export default Questionnaire;
