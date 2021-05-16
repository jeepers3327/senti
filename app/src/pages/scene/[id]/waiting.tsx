import { Flex, Heading, HStack, Text, Box, useToast } from '@chakra-ui/react';
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import Router from 'next/router';
import { StatusOnlineIcon } from '@heroicons/react/outline';
import { Content } from '@/components';
import { useAppDispatch, useAppSelector, useChannel } from '@/hooks';
import { setPresentation, setSessionInfo } from '@/store';
import {
  createSession,
  fetchCurrentPresentation,
  formatPresentation,
} from '@/utils';

const Waiting: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const presentationName = useAppSelector(
    (state) => state.presentation.presentation.name,
  );
  const toast = useToast();
  const sessionId = localStorage.getItem(`session_id`) || ``;
  const presentationId = localStorage.getItem(`presentation_id`) || ``;
  const [participantCount, setParticipantCount] = useState(0);
  const [hasSession, setHasSession] = useState(true);

  const onChannelMessage = useCallback((event, payload) => {
    if (event === `session_started`) {
      dispatch(setPresentation(payload));
      Router.push(`/scene/${sessionId}/answer`);
    }
  }, []);
  const { presence } = useChannel(`session:${sessionId}`, onChannelMessage);

  useEffect(() => {
    if (!sessionId || !presentationId) {
      setHasSession(false);
      toast({
        position: `top`,
        title: `Invalid session, redirecting to homepage!`,
        status: `error`,
      });
      Router.push(`/`);
    } else {
      const fetchPresentation = async () => {
        const session = await createSession(presentationId);
        dispatch(setSessionInfo(session));
        const response = await fetchCurrentPresentation(sessionId);
        dispatch(setPresentation(formatPresentation(response)));
      };

      fetchPresentation();
    }
  }, []);

  useEffect(() => {
    if (presence) {
      presence.onSync(() => {
        setParticipantCount(presence.list().length - 1);
      });
    }
  }, [presence]);

  if (!hasSession) return <div>Loading...</div>;

  return (
    <Content hasNavbar={false}>
      <Box className="main">
        <HStack spacing="20rem">
          <Heading size="2xl">{presentationName}</Heading>
          <HStack>
            <StatusOnlineIcon width="20px" height="20px" />
            <Text>{participantCount} users waiting</Text>
          </HStack>
        </HStack>
        <Flex direction="column-reverse" alignItems="flex-end" minHeight="40vh">
          <Heading color="gray.500" as="h3">
            Waiting for the host to start...
          </Heading>
        </Flex>
      </Box>
    </Content>
  );
};

export default Waiting;
