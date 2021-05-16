import { Flex, Heading, HStack, Box, Button, useToast } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import Router from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import { PlayIcon } from '@heroicons/react/outline';

import { useChannel, useAppDispatch, useAppSelector } from '@/hooks';
import {
  Presentation,
  setPresentation,
  setSelectedPresentation,
  setSessionInfo,
  setUserPresentations,
} from '@/store';
import {
  createSession,
  fetchUserPresentations,
  formatPresentation,
  formatSession,
} from '@/utils';
import { Content } from '@/components';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (!req.headers.cookie) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }

  const userPresentations = await fetchUserPresentations(req.headers.cookie);
  return {
    props: {
      userPresentations,
    },
  };
};

interface ReadyPageProps {
  userPresentations: Presentation[];
}

const Ready: NextPage<ReadyPageProps> = ({ userPresentations }) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const session = useAppSelector((state) => state.session);
  const [hasSession, setHasSession] = useState(true);
  const presentation = useAppSelector(
    (state) => state.user.selectedPresentation,
  );

  const sessionId = localStorage.getItem(`session_id`);
  const presentationId = localStorage.getItem(`presentation_id`);

  useEffect(() => {
    if (!sessionId && !presentationId) {
      setHasSession(false);
      toast({
        title: `Invalid session, redirecting to homepage!`,
        status: `error`,
        position: `top`,
      });
      Router.push(`/`);
    } else {
      dispatch(setUserPresentations(userPresentations));
      dispatch(setSelectedPresentation(Number(presentationId)));

      const fetchPresentations = async () => {
        let session_state = await createSession(presentationId as string);
        session_state = formatSession(session_state);
        dispatch(setSessionInfo(session_state));
      };
      fetchPresentations();
    }
  }, []);

  const onChannelMessage = useCallback((event, payload) => {
    if (event === `session_started`) {
      dispatch(setPresentation(formatPresentation(payload)));
      Router.push(`/scene/${sessionId}/responses`);
    }
  }, []);

  const { broadcast } = useChannel(`session:${sessionId}`, onChannelMessage);
  const startPresentation = () => {
    broadcast(`start_session`, []);
  };

  if (!hasSession) return <div>Loading...</div>;

  return (
    <Content hasNavbar={false}>
      <Box className="main">
        <HStack spacing="20rem">
          <Heading size="3xl">{presentation.name}</Heading>
          <Heading color="gray.500" size="lg" as="h3">
            Access code: {session.accessCode}
          </Heading>
        </HStack>

        <Flex direction="column" minW="2xl" p="10rem">
          <Button
            onClick={startPresentation}
            leftIcon={<PlayIcon width="20px" height="20px" />}
            colorScheme="green"
            isFullWidth
          >
            Start presentation
          </Button>
        </Flex>
      </Box>
    </Content>
  );
};

export default Ready;
