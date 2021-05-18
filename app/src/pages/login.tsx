import React, { FormEvent, useEffect } from 'react';
import {
  Box,
  Text,
  Stack,
  Input,
  FormLabel,
  Button,
  Divider,
  FormControl,
  Heading,
  Grid,
  Flex,
  Link,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import Router from 'next/router';
import RouteLink from 'next/link';
import { useFormState } from 'react-use-form-state';
import cookie from 'cookie';

import { Content } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { createUserSession, isLoggedIn } from '@/utils';
import { increaseAuthFailedAttempts } from '@/store';
import { GetServerSideProps } from 'next';

interface LoginProps {
  email: string;
  password: string;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const reqCookies = cookie.parse(req.headers.cookie ?? '');
  if (isLoggedIn(reqCookies)) {
    return {
      redirect: {
        destination: `/app`,
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

const Login = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const toast = useToast();
  const [formState, { email, password }] = useFormState<LoginProps>();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await createUserSession(formState.values);

      Router.push(`/app`);
    } catch {
      dispatch(increaseAuthFailedAttempts());
    }
  };

  useEffect(() => {
    if (!user.isAuthenticated && user.failedAttempts > 0) {
      toast({
        title: `Wrong email or password!`,
        status: `error`,
        position: `top`,
        duration: 5000,
      });
    }
  }, [user.failedAttempts]);

  return (
    <Content hasNavbar>
      <Box padding="10rem">
        <Flex alignItems="center" flexDirection="column">
          <Heading fontSize="2xl">Sign in to Senti</Heading>
        </Flex>

        <Grid w="100%" placeItems="center" paddingTop="10" paddingBottom="10">
          <Box
            p="10"
            rounded="lg"
            border="1px solid #d3dae6"
            shadow="lg"
            bg={useColorModeValue(`white`, `gray.800`)}
            minW="lg"
          >
            <form onSubmit={handleSubmit} autoComplete="off">
              <Stack spacing={4} marginBottom="1rem">
                <FormControl>
                  <FormLabel fontWeight="bold" htmlFor="email">
                    Email Address
                  </FormLabel>
                  <Input
                    tabIndex={1}
                    bg="white"
                    focusBorderColor="blue.500"
                    placeholder="name@example.com"
                    required
                    {...email(`email`)}
                  />
                </FormControl>

                <FormControl>
                  <Stack justifyContent="space-between" isInline>
                    <FormLabel fontWeight="bold" htmlFor="password">
                      Password
                    </FormLabel>
                    <Link
                      tabIndex={5}
                      as={RouteLink}
                      href="/password_reset"
                      color="secondary.link"
                      fontSize="sm"
                      fontWeight="500"
                    >
                      Forgot Password?
                    </Link>
                  </Stack>
                  <Input
                    tabIndex={2}
                    bg="white"
                    focusBorderColor="blue.500"
                    placeholder="Enter your password"
                    required
                    {...password(`password`)}
                  />
                </FormControl>
              </Stack>
              <Stack marginBottom="1rem">
                <Button
                  tabIndex={3}
                  type="submit"
                  loadingText="Please wait.."
                  colorScheme="blue"
                >
                  Sign in
                </Button>
              </Stack>
            </form>
            <Divider marginBottom="1rem" />
            <Stack>
              <Text textAlign="center" fontWeight="500">
                Don&apos;t have an account?
              </Text>
              <Button
                tabIndex={4}
                onClick={() => Router.push(`/register`)}
                colorScheme="blue"
                variant="outline"
              >
                Sign up
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Box>
    </Content>
  );
};

export default Login;
