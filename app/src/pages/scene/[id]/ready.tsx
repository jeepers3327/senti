import { Content } from '@/components';
import { Flex, Heading, HStack, Box, Button } from '@chakra-ui/react';
import React, { FunctionComponent } from 'react';
import { PlayIcon } from '@heroicons/react/outline';

const Ready: FunctionComponent = () => (
  <Content title="Senti - Waiting for presentation to start" hasNavbar={false}>
    <Box className="main">
      <HStack spacing="20rem">
        <Heading size="3xl">My presentation name</Heading>
        <Heading color="gray.500" size="lg" as="h3">
          Access code: ABCD-1245
        </Heading>
      </HStack>

      <Flex direction="column" minW="2xl" p="10rem">
        <Button
          leftIcon={<PlayIcon width="20px" height="20px" />}
          colorScheme="green"
          isFullWidth
        >
          Start presentation
        </Button>
      </Flex>
    </Box>
  </Content>
);

export default Ready;
