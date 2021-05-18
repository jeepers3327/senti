import {
  Button,
  VStack,
  Box,
  Heading,
  Input,
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
} from '@chakra-ui/react';
import Router from 'next/router';
import React, { FormEvent, useEffect, useState } from 'react';
import { useFormState } from 'react-use-form-state';
import cookie from 'cookie';

import { Content } from '@/components';
import { useAppDispatch } from '@/hooks';
import {
  fetchCurrentUser,
  formatSession,
  isLoggedIn,
  joinPresentation,
} from '@/utils';
import { setSessionInfo, setUserInfo, UserState } from '@/store';
import { GetServerSideProps, NextPage } from 'next';

interface CodeProp {
  code: string;
}
interface IndexProps {
  user: UserState;
  isAuthenticated: boolean;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const reqCookies = cookie.parse(req.headers.cookie ?? '');
  if (!isLoggedIn(reqCookies)) {
    return {
      props: {
        isAuthenticated: false,
      },
    };
  }

  if (req.headers && req.headers.cookie) {
    const user = await fetchCurrentUser(req.headers.cookie);
    return {
      props: {
        user,
      },
    };
  }

  return {
    props: {},
  };
};

const Index: NextPage<IndexProps> = ({ user }) => {
  const [doesExist, setDoesExist] = useState(true);
  const [formState, { text }] = useFormState<CodeProp>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user) {
      dispatch(setUserInfo(user));
    }
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    const { code } = formState.values;
    event.preventDefault();
    try {
      const data = await joinPresentation(code);
      setDoesExist(true);

      const session = formatSession(data);
      dispatch(setSessionInfo(session));

      localStorage.setItem(`session_id`, String(session.id));
      localStorage.setItem(`presentation_id`, String(session.presentationId));

      if (session.status === `ready`) {
        Router.push(`/scene/${session.id}/waiting`);
      } else if (session.status === `started`) {
        Router.push(`/scene/${session.id}/answer`);
      } else if (session.status === `ended`) {
        Router.push(`/scene/${session.id}/ended`);
      }
    } catch (e) {
      setDoesExist(false);
    }
  };

  return (
    <Content hasNavbar>
      <Flex p="5rem" flex="1" direction="column" alignItems="center">
        <Alert
          maxWidth="xl"
          rounded="sm"
          mb="5"
          status="error"
          display={!doesExist ? `flex` : `none`}
        >
          <AlertIcon />
          <AlertTitle>Access code is invalid or session has ended!</AlertTitle>
        </Alert>
        <Box
          p="10"
          rounded="lg"
          border="1px solid #d3dae6"
          shadow="lg"
          bg="white"
          minW="xl"
        >
          <form onSubmit={handleSubmit}>
            <VStack spacing="15">
              <Heading pt="5" size="md">
                Enter the access code below to join!
              </Heading>
              <Input
                placeholder="Enter access code..."
                required
                {...text(`code`)}
              />
              <Button type="submit" colorScheme="blue" isFullWidth>
                Join Session
              </Button>
            </VStack>
          </form>
        </Box>
      </Flex>
    </Content>
  );
};

export default Index;
