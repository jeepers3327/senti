import React, { useEffect } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { PlayIcon } from '@heroicons/react/solid';
import Link from 'next/link';

import { Content } from '@/components';
import {
  createSession,
  fetchCurrentUser,
  fetchUserPresentations,
  formatSession,
  isLoggedIn,
} from '@/utils';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  Presentation,
  setSessionInfo,
  setUserInfo,
  setUserPresentations,
  UserState,
} from '@/store';
import { GetServerSideProps, NextPage } from 'next';
import Router from 'next/router';
import cookie from 'cookie';

interface AppIndexProps {
  authenticatedUser: UserState;
  userPresentations: Presentation[];
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const reqCookies = cookie.parse(req.headers.cookie ?? ``);
  if (!isLoggedIn(reqCookies)) {
    return {
      redirect: {
        destination: `/login`,
        permanent: false,
      },
    };
  }

  if (req.headers && req.headers.cookie) {
    const authenticatedUser = await fetchCurrentUser(req.headers.cookie);
    const userPresentations = await fetchUserPresentations(req.headers.cookie);

    return {
      props: {
        authenticatedUser,
        userPresentations,
      },
    };
  }

  return {
    props: {},
  };
};

const Index: NextPage<AppIndexProps> = ({
  authenticatedUser,
  userPresentations,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const presentations = useAppSelector((state) => state.user.presentations);

  useEffect(() => {
    dispatch(setUserInfo(authenticatedUser));
    dispatch(setUserPresentations(userPresentations));
  }, []);

  const handlePresent = async (presentationId: string) => {
    let session = await createSession(presentationId);
    session = formatSession(session);
    dispatch(setSessionInfo(session));

    localStorage.setItem(`session_id`, String(session.id));
    localStorage.setItem(`presentation_id`, String(session.presentationId));

    if (!user.isAuthenticated) {
      if (session.status === `ready`) {
        Router.push(`/scene/${session.id}/waiting`);
      } else if (session.status === `started`) {
        Router.push(`/scene/${session.id}/answer`);
      } else if (session.status === `ended`) {
        Router.push(`/scene/${session.id}/ended`);
      }
    } else if (session.status === `ready`) {
      Router.push(`/scene/${session.id}/ready`);
    } else if (session.status === `started`) {
      Router.push(`/scene/${session.id}/responses`);
    } else if (session.status === `ended`) {
      Router.push(`/scene/${session.id}/ended`);
    }
  };

  const renderRows = () =>
    presentations.map((item) => (
      <Tr key={item.id}>
        <Td display="none">{item.id}</Td>
        <Td width="40%">{item.name}</Td>
        <Td width="20%">{item.sessions}</Td>
        <Td width="20%">{dayjs(item.createdAt).format(`MMMM DD, YYYY`)}</Td>
        <Td width="20%">{dayjs(item.updatedAt).format(`MMMM DD, YYYY`)}</Td>
        <Td>
          <ButtonGroup size="sm">
            <Button
              onClick={() => handlePresent(String(item.id))}
              colorScheme="green"
              leftIcon={<PlayIcon width="20px" height="20px" />}
            >
              Present
            </Button>
          </ButtonGroup>
        </Td>
      </Tr>
    ));

  return (
    <Content hasNavbar>
      <Flex direction="column" justifyContent="center" alignItems="center">
        <Flex
          justifyContent="space-between"
          height="50px"
          width="50vw"
          py="5rem"
        >
          <Heading size="lg">My presentations</Heading>
          <Button colorScheme="blue" size="sm">
            <Link href="/app/new">Create new presentation</Link>
          </Button>
        </Flex>

        <Box pt="10" minW="7xl">
          <Table colorScheme="facebook" variant="simple">
            <Thead>
              <Tr>
                <Th display="none">ID</Th>
                <Th>Name</Th>
                <Th>Number of sessions</Th>
                <Th>Created At</Th>
                <Th>Updated At</Th>
                <Th />
              </Tr>
            </Thead>
            <Tbody>
              {presentations.length === 0 ? (
                <Tr>
                  <Td colSpan={5}>There are currently no presentations!</Td>
                </Tr>
              ) : (
                renderRows()
              )}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Content>
  );
};

export default Index;
