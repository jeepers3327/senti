import React from 'react';
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
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import RouteLink from 'next/link';
import { Content } from '@/components';

const Login = () => {
  const router = useRouter();

  return (
    <Content title="Senti - Login to get started" hasNavbar>
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
            <form autoComplete="off">
              <Stack spacing={4} marginBottom="1rem">
                <FormControl>
                  <FormLabel fontWeight="bold" htmlFor="email">
                    Email Address
                  </FormLabel>
                  <Input
                    bg="white"
                    focusBorderColor="blue.500"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="name@example.com"
                  />
                </FormControl>

                <FormControl>
                  <Stack justifyContent="space-between" isInline>
                    <FormLabel fontWeight="bold" htmlFor="password">
                      Password
                    </FormLabel>
                    <Link
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
                    bg="white"
                    focusBorderColor="blue.500"
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                  />
                </FormControl>
              </Stack>
              <Stack marginBottom="1rem">
                <Button
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
                onClick={() => router.push(`/register`)}
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
