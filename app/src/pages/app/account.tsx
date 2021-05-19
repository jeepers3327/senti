import {
  Box,
  Grid,
  Heading,
  Flex,
  Button,
  Stack,
  Textarea,
  Input,
  FormControl,
  FormLabel,
  Text,
  VStack,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import { PlusIcon } from '@heroicons/react/solid';
import { useFormState } from 'react-use-form-state';
import cookie from 'cookie';
import _ from 'lodash';

import { Content, Question } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import {
  createPresentation,
  fetchCurrentUser,
  isLoggedIn,
  updateUser,
  UpdateUserPayload,
} from '@/utils';
import { setUserInfo, UserState } from '@/store';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const reqCookies = cookie.parse(req.headers.cookie ?? '');
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
    return {
      props: {
        authenticatedUser,
      },
    };
  }

  return {
    props: {},
  };
};

const ManageAccount: NextPage<{ authenticatedUser: UserState }> = ({
  authenticatedUser,
}) => {
  const [formState, { text, password }] = useFormState<UpdateUserPayload>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setUserInfo(authenticatedUser));
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await updateUser(formState.values);

      Router.push(`/`);
    } catch {}
  };

  return (
    <Content hasNavbar>
      <Flex p="3rem" flex="1" direction="column" alignItems="center">
        <Heading textAlign="center" pb="1rem" size="md">
          Update your account below!
        </Heading>
        <form onSubmit={handleSubmit}>
          <VStack width="sm" spacing="15">
            <Input placeholder="New name" {...text('name')} />
            <Input placeholder="New password" {...password('password')} />
            <Button type="submit" colorScheme="blue" isFullWidth>
              Update account
            </Button>
          </VStack>
        </form>
      </Flex>
    </Content>
  );
};

export default ManageAccount;
