import React, { FormEvent } from 'react';
import {
  Box,
  Text,
  Stack,
  InputGroup,
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
} from '@chakra-ui/react';
import cookie from 'cookie';

import { useRouter } from 'next/router';
import { Content } from '@/components';
import { useFormState } from 'react-use-form-state';
import { createNewUser, isLoggedIn } from '@/utils';
import { useAppDispatch } from '@/hooks';
import { setUserInfo } from '@/store';
import { GetServerSideProps } from 'next';

interface RegisterProps {
  name: string;
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

const Register = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const toast = useToast();
  const [formState, { text, password, email }] = useFormState<RegisterProps>();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const data = await createNewUser(formState.values);
      dispatch(setUserInfo(data));
      router.push(`/app`);
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
      <Box padding="10rem">
        <Flex alignItems="center" flexDirection="column">
          <Heading fontSize="2xl">Create your Senti account</Heading>
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
                  <FormLabel fontWeight="bold" htmlFor="name">
                    Name
                  </FormLabel>
                  <InputGroup>
                    <Input
                      bg="white"
                      focusBorderColor="blue.500"
                      placeholder="Enter your name..."
                      required
                      {...text(`name`)}
                    />
                  </InputGroup>
                  <FormErrorMessage>{formState.errors.name}</FormErrorMessage>
                </FormControl>

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

                <FormControl>
                  <Stack justifyContent="space-between" isInline>
                    <FormLabel fontWeight="bold" htmlFor="password">
                      Password
                    </FormLabel>
                  </Stack>
                  <Input
                    bg="white"
                    focusBorderColor="blue.500"
                    placeholder="Enter your password"
                    required
                    minLength={8}
                    {...password(`password`)}
                  />
                  <FormErrorMessage>
                    {formState.errors.password}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
              <Stack marginBottom="1rem">
                <Button
                  type="submit"
                  loadingText="Please wait.."
                  colorScheme="blue"
                >
                  Create account
                </Button>
              </Stack>
            </form>
            <Divider marginBottom="1rem" />
            <Stack>
              <Text textAlign="center" fontWeight="500">
                Already have an account?
              </Text>

              <Button
                onClick={() => router.push(`/login`)}
                colorScheme="blue"
                variant="outline"
              >
                Sign in
              </Button>
            </Stack>
          </Box>
        </Grid>
      </Box>
    </Content>
  );
};

export default Register;
