import React, { FormEvent } from 'react';
import {
  Box,
  Stack,
  Input,
  FormLabel,
  Button,
  FormControl,
  Heading,
  Grid,
  Flex,
  FormErrorMessage,
  useToast,
} from '@chakra-ui/react';
import cookie from 'cookie';

import Router from 'next/router';
import { Content } from '@/components';
import { useFormState } from 'react-use-form-state';
import { isLoggedIn, updateUserPassword } from '@/utils';
import { GetServerSideProps, NextPage } from 'next';

type NewPasswordProps = {
  password: string;
};

export const getServerSideProps: GetServerSideProps = async ({
  query,
  req,
}) => {
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
    props: {
      token: query.token,
    },
  };
};

const NewPassword: NextPage<{ token: string }> = (props) => {
  const toast = useToast();
  const [formState, { password }] = useFormState<NewPasswordProps>();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      await updateUserPassword(formState.values.password, props.token);
      toast({
        title: `Password updated!`,
        status: `success`,
        position: `top`,
        duration: 5000,
      });
      Router.push(`/`);
    } catch {
      toast({
        title: `An error occured!`,
        status: `error`,
        position: `top`,
        duration: 5000,
      });
    }
  };

  return (
    <Content hasNavbar>
      <Flex
        mt="1rem"
        px="1rem"
        pt="1rem"
        pb="0.5rem"
        alignItems="center"
        flexDirection="column"
      >
        <Heading fontSize="2xl">Update your password</Heading>
      </Flex>
      <Grid w="100%" placeItems="center" paddingTop="10" paddingBottom="10">
        <Box p="2" minW="lg">
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} marginBottom="1rem">
              <FormControl>
                <FormLabel fontWeight="bold" htmlFor="email">
                  New password
                </FormLabel>
                <Input
                  bg="white"
                  focusBorderColor="blue.500"
                  placeholder="Enter your new password..."
                  required
                  {...password(`password`)}
                />
                <FormErrorMessage>{formState.errors.password}</FormErrorMessage>
              </FormControl>
            </Stack>
            <Stack marginBottom="1rem">
              <Button
                type="submit"
                loadingText="Please wait.."
                colorScheme="blue"
              >
                Update password
              </Button>
            </Stack>
          </form>
        </Box>
      </Grid>
    </Content>
  );
};

export default NewPassword;
