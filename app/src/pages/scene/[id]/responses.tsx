import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Button,
  Text,
  SimpleGrid,
  useToast,
} from '@chakra-ui/react';
import Router from 'next/router';

import { Content } from '@/components';
import { useAppDispatch, useAppSelector, useChannel } from '@/hooks';
import { fetchCurrentPresentation, formatPresentation } from '@/utils';
import { setNextQuestion, setPresentation, Response } from '@/store';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (!req.headers.cookie) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Responses: FunctionComponent = () => {
  const userPresentation = useAppSelector((state) => state.presentation);
  const dispatch = useAppDispatch();
  const toast = useToast();

  const [hasNext, setHasNext] = useState(true);
  const [hasSession, setHasSession] = useState(true);
  const [question, setQuestion] = useState<any>({ text: ``, responses: [] });
  const [responses, setResponses] = useState<Response[]>([]);

  const sessionId = localStorage.getItem(`session_id`);
  const presentationId = localStorage.getItem(`presentation_id`);

  const onChannelMessage = useCallback(
    (event, payload) => {
      if (event === `session_ended`) {
        Router.push(`/scene/${sessionId}/ended`);
      }

      if (event === `new_response`) {
        const updated_responses = [...responses, payload];
        setResponses(updated_responses);
      }

      if (event === `next_question`) {
        const question_state = {
          index: payload.state.current_index,
          hasNext: payload.state.has_next,
        };

        dispatch(setNextQuestion(question_state));
      }
    },
    [responses],
  );

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
        dispatch(setPresentation(formatPresentation(response)));
      };
      fetchPresentation();
    }
  }, []);

  const { broadcast } = useChannel(`session:${sessionId}`, onChannelMessage);

  useEffect(() => {
    if (!userPresentation.isLoading) {
      setQuestion(
        userPresentation.presentation.questions[userPresentation.index],
      );
      setResponses(
        userPresentation.presentation.questions[userPresentation.index]
          .responses,
      );
      setHasNext(userPresentation.hasNext);
    }
  }, [userPresentation]);

  if (!hasSession || userPresentation.isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Content hasNavbar={false}>
      <Box flex="1" id="response_area" width="100%">
        <Flex justifyContent="space-evenly" padding="2em">
          <Text fontSize="xxx-large" id="question">
            {question.text}
          </Text>
          <Box>
            <Button
              size="lg"
              id="navigateQuestion"
              colorScheme="green"
              onClick={
                hasNext
                  ? () => broadcast(`next_question`, [])
                  : () => broadcast(`end_session`, [])
              }
              // onClick={captureResult}
            >
              {hasNext ? `Next question` : `End presentation`}
            </Button>
          </Box>
        </Flex>
        <SimpleGrid
          padding="2em 5em 5em 5em"
          minHeight="22em"
          minChildWidth="25.7em"
          spacing="3em"
          color="blackAlpha.800"
        >
          {responses.length >= 0 &&
            responses.map((r) => (
              <Box
                key={r.id}
                borderRadius="lg"
                borderWidth="2px"
                display="grid"
                placeItems="center"
                borderColor={r.color}
              >
                <Box fontSize="2xl" padding="10">
                  {r.answer}
                </Box>
              </Box>
            ))}
        </SimpleGrid>
      </Box>
    </Content>
  );
};

export default Responses;
