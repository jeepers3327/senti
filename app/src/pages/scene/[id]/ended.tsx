import { FunctionComponent } from 'react';
import { Stack, Grid, Center, Heading, Button, Img } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { Content } from '@/components';

const Ended: FunctionComponent = () => {
  const router = useRouter();
  return (
    <Content title="Senti - Presentation has ended!" hasNavbar={false}>
      <Grid placeItems="center" height="100vh">
        <Stack spacing="5em">
          <Heading textAlign="center" size="4xl">
            <Img src="/senti-dark.svg" height="5rem" width="md" />
          </Heading>
          <Heading>Presentation has ended!</Heading>
          <Center>
            <Button
              fontSize="xl"
              variant="link"
              onClick={() => router.push(`/`)}
            >
              Click here to go back
            </Button>
          </Center>
        </Stack>
      </Grid>
    </Content>
  );
};

export default Ended;
