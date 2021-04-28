import { Flex, Heading, HStack, Text, Box } from '@chakra-ui/react';
import React, { FunctionComponent } from 'react';
import { StatusOnlineIcon } from '@heroicons/react/outline';
import { Content } from '@/components';

const Waiting: FunctionComponent = () => (
  <Content title="Senti - Waiting for presentor to start..." hasNavbar={false}>
    <Box className="main">
      <HStack spacing="20rem">
        <Heading size="2xl">My presentation name</Heading>
        <HStack>
          <StatusOnlineIcon width="20px" height="20px" />
          <Text>20 users waiting</Text>
        </HStack>
      </HStack>
      <Flex direction="column-reverse" alignItems="flex-end" minHeight="40vh">
        <Heading color="gray.500" as="h3">
          Waiting for the host to start...
        </Heading>
      </Flex>
    </Box>
  </Content>
);

export default Waiting;
