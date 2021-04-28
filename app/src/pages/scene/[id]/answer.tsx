import { Content } from '@/components';
import {
  Box,
  Button,
  Center,
  Grid,
  Heading,
  Img,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';

const Questionnaire = () => (
  <Content title="Senti - Send your answers!" hasNavbar={false}>
    <Box>
      <Center paddingTop="10rem">
        <Img src="/senti-dark.svg" height="5rem" width="md" />
      </Center>
      <Grid placeItems="center" paddingTop="8rem">
        <Stack width="xl">
          <Heading pb="3" fontSize="2rem" fontWeight="semibold">
            Are you happy? Lorem
          </Heading>
          <Textarea
            maxLength={250}
            placeholder="Short answers are recommended. You can enter up to 250 characters
                only."
          />
          <Text color="gray.600" fontStyle="italic">
            You can submit multiple answer
          </Text>
          <Button colorScheme="blue">Submit answer</Button>
        </Stack>
      </Grid>
    </Box>
  </Content>
);

export default Questionnaire;
