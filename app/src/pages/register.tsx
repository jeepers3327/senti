import React from 'react';
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
} from '@chakra-ui/react';

import { useRouter } from 'next/router';
import { Content } from '@/components';

const Register = () => {
  const router = useRouter();

  return (
    <Content title="Senti - Create your account" hasNavbar>
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
            <form>
              <Stack spacing={4} marginBottom="1rem">
                <FormControl>
                  <FormLabel fontWeight="bold" htmlFor="name">
                    Name
                  </FormLabel>
                  <InputGroup>
                    <Input
                      bg="white"
                      focusBorderColor="blue.500"
                      type="name"
                      name="name"
                      id="name"
                      placeholder="Enter your name..."
                    />
                  </InputGroup>
                </FormControl>

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
                    placeholder="Enter your email address..."
                  />
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
