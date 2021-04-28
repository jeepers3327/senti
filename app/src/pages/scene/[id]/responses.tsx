import { FunctionComponent } from 'react';
import { Box, Flex, Button, Text, SimpleGrid } from '@chakra-ui/react';
import { Content } from '@/components';

const Responses: FunctionComponent = () => (
  <Content title="Senti - Current responses" hasNavbar={false}>
    <Box flex="1" id="response_area" width="100%">
      <Flex justifyContent="space-evenly" padding="2em">
        <Text fontSize="xxx-large" id="question">
          What are you currently doing today?
        </Text>
        <Button
          size="lg"
          id="navigateQuestion"
          colorScheme="green"
          // onClick={captureResult}
        >
          Next question
        </Button>
      </Flex>
      <SimpleGrid
        paddingX="3em"
        minHeight="22em"
        minChildWidth="15.7em"
        spacing="3em"
        color="blackAlpha.800"
      >
        <Box
          borderRadius="lg"
          borderWidth="2px"
          display="grid"
          placeItems="center"
          borderColor="blueviolet"
        >
          Test
        </Box>
        <Box
          borderRadius="lg"
          borderWidth="2px"
          display="grid"
          placeItems="center"
          borderColor="burlywood"
        >
          Test
        </Box>
        <Box
          borderRadius="lg"
          borderWidth="2px"
          display="grid"
          placeItems="center"
          borderColor="tomato"
        >
          Test
        </Box>
        <Box
          borderRadius="lg"
          borderWidth="2px"
          display="grid"
          placeItems="center"
          borderColor="blue.100"
        >
          Test
        </Box>
        <Box
          borderRadius="lg"
          borderWidth="2px"
          display="grid"
          placeItems="center"
          borderColor="blue.800"
        >
          Test
        </Box>
        <Box
          borderRadius="lg"
          borderWidth="2px"
          display="grid"
          placeItems="center"
          borderColor="yellowgreen"
        >
          Test
        </Box>
        <Box
          borderRadius="lg"
          borderWidth="2px"
          display="grid"
          placeItems="center"
          borderColor="yellow.900"
        >
          Test
        </Box>
        <Box
          borderRadius="lg"
          borderWidth="2px"
          display="grid"
          placeItems="center"
          borderColor="whatsapp.100"
        >
          Test
        </Box>
        <Box
          borderRadius="lg"
          borderWidth="2px"
          display="grid"
          placeItems="center"
          borderColor="violet"
        >
          Test
        </Box>
        <Box
          borderRadius="lg"
          borderWidth="2px"
          display="grid"
          placeItems="center"
          borderColor="twitter.200"
        >
          Test
        </Box>
        <Box
          borderRadius="lg"
          borderWidth="2px"
          display="grid"
          placeItems="center"
          borderColor="turquoise"
        >
          Test
        </Box>
      </SimpleGrid>
    </Box>
  </Content>
);

export default Responses;
