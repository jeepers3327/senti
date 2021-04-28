import { Content } from '@/components';

import {
  useColorModeValue,
  Button,
  VStack,
  Box,
  Heading,
  Input,
  Flex,
} from '@chakra-ui/react';
import React from 'react';

export default function Home() {
  return (
    <Content title="Senti - Join presentation" hasNavbar>
      <Flex p="5rem" flex="1" direction="column" alignItems="center">
        <Box
          p="10"
          rounded="lg"
          border="1px solid #d3dae6"
          shadow="lg"
          bg={useColorModeValue(`white`, `gray.800`)}
          minW="xl"
        >
          <VStack spacing="5">
            <Heading pt="5" size="md">
              Enter the access code below to join!
            </Heading>
            <Input placeholder="Enter access code..." />
            <Button colorScheme="blue" isFullWidth>
              Join Session
            </Button>
          </VStack>
        </Box>
      </Flex>
    </Content>
  );
}
