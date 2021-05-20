import React, { FormEvent } from 'react';
import {
  Box,
  Stack,
  Input,
  FormLabel,
  Button,
  Divider,
  FormControl,
  Heading,
  Grid,
  Flex,
  useColorModeValue,
  FormErrorMessage,
  useToast,
  HStack,
} from '@chakra-ui/react';
import cookie from 'cookie';

import Router from 'next/router';
import { Content } from '@/components';
import { useFormState } from 'react-use-form-state';
import { isLoggedIn, maybeForgotPassword } from '@/utils';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const reqCookies = cookie.parse(req.headers.cookie ?? ``);
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

const ResetPassword = () => {
  const toast = useToast();
  const [formState, { email }] = useFormState<{
    email: string;
  }>();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await maybeForgotPassword(formState.values.email);
      toast({
        title: `Password reset email has been sent!.`,
        status: `info`,
        position: `top`,
        duration: 5000,
      });
      Router.push(`/`);
    } catch {
      toast({
        title: `Email entered does not exist!`,
        status: `error`,
        position: `top`,
        duration: 5000,
      });
    }
  };

  return (
    <Content hasNavbar>
      <Box padding="10rem">
        <Flex alignItems="center" flexDirection="column">
          <Heading fontSize="2xl">Reset password</Heading>
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
            <form onSubmit={handleSubmit}>
              <Stack spacing={4} marginBottom="1rem">
                <FormControl>
                  <FormLabel fontWeight="bold" htmlFor="email">
                    Email Address
                  </FormLabel>
                  <Input
                    bg="white"
                    focusBorderColor="blue.500"
                    placeholder="Enter your email address..."
                    required
                    {...email(`email`)}
                  />
                  <FormErrorMessage>{formState.errors.email}</FormErrorMessage>
                </FormControl>
              </Stack>
              <Stack marginBottom="1rem">
                <Button
                  type="submit"
                  loadingText="Please wait.."
                  colorScheme="blue"
                >
                  Reset password
                </Button>
              </Stack>
            </form>
            <Divider marginBottom="1rem" />
            <HStack h="10">
              <Button
                onClick={() => Router.push(`/register`)}
                colorScheme="blue"
                variant="outline"
                isFullWidth
              >
                Sign up
              </Button>
              <Divider orientation="vertical" />
              <Button
                onClick={() => Router.push(`/login`)}
                colorScheme="blackAlpha"
                variant="outline"
                isFullWidth
              >
                Sign in
              </Button>
            </HStack>
          </Box>
        </Grid>
      </Box>
    </Content>
  );
};

export default ResetPassword;
