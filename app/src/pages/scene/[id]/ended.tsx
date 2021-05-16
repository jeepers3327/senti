import { FunctionComponent, useEffect, useState } from 'react';
import {
  Stack,
  Grid,
  Center,
  Heading,
  Button,
  Img,
  useToast,
} from '@chakra-ui/react';
import Router from 'next/router';

import { Content } from '@/components';

const Ended: FunctionComponent = () => {
  const toast = useToast();
  const [hasSession, setHasSession] = useState(true);
  const sessionId = localStorage.getItem(`session_id`);
  const presentationId = localStorage.getItem(`presentation_id`);

  useEffect(() => {
    if (!sessionId || !presentationId) {
      setHasSession(false);
      toast({
        title: `Invalid session, redirecting to homepage!`,
        status: `error`,
        position: `top`,
      });
      Router.push(`/`);
    }
  }, []);

  if (!hasSession) return <div>Loading...</div>;

  return (
    <Content hasNavbar={false}>
      <Grid placeItems="center" height="100vh">
        <Stack spacing="5em">
          <Heading textAlign="center" size="4xl">
            <Img src="/senti-dark.svg" height="5rem" width="md" />
          </Heading>
          <Heading textAlign="center">Presentation has ended!</Heading>
          <Center>
            <Button
              fontSize="xl"
              variant="link"
              onClick={() => Router.push(`/`)}
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
