import {
  Box,
  Grid,
  Heading,
  Flex,
  Button,
  Stack,
  Textarea,
  Input,
  FormControl,
  FormLabel,
  Text,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import { PlusIcon } from '@heroicons/react/solid';
import { useFormState } from 'react-use-form-state';
import cookie from 'cookie';
import _ from 'lodash';

import { Content, Question } from '@/components';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { createPresentation, fetchCurrentUser, isLoggedIn } from '@/utils';
import { setUserInfo, UserState } from '@/store';

interface CreatePresentationProps {
  authenticatedUser: UserState;
}

interface FormProps {
  name: string;
}

interface QuestionListProps {
  text: string;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (req.headers && req.headers.cookie) {
    const reqCookies = cookie.parse(req.headers.cookie);
    if (!isLoggedIn(reqCookies)) {
      return {
        redirect: {
          destination: `/login`,
          permanent: false,
        },
      };
    }
  }

  const authenticatedUser = await fetchCurrentUser(
    req.headers.cookie as string,
  );
  return {
    props: {
      authenticatedUser,
    },
  };
};

const CreatePresentation: NextPage<CreatePresentationProps> = ({
  authenticatedUser,
}) => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [questionList, setQuestionList] = useState<QuestionListProps[]>([]);
  const [question, setQuestion] = useState(``);
  const [formState, { text }] = useFormState<FormProps>();

  useEffect(() => {
    dispatch(setUserInfo(authenticatedUser));
  }, []);

  const addQuestion = () => {
    if (question === ``) return;

    const newQuestionList = [...questionList, { text: question }];
    setQuestionList(newQuestionList);
    setQuestion(``);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const values = {
      ...formState.values,
      questions: questionList,
      user_id: user.id,
    };
    await createPresentation(values);
    Router.push(`/app`);
  };

  const removeQuestion = (id: number) => questionList.splice(id, 1);

  return (
    <Content hasNavbar>
      <Grid placeItems="center">
        <form onSubmit={handleSubmit}>
          <Flex pb="12" pt="5" width="xl">
            <FormControl>
              <FormLabel>
                <Heading fontSize="3xl">Presentation name</Heading>
              </FormLabel>
              <Input
                isInvalid={!!formState.errors.name}
                size="lg"
                placeholder="Enter the presentation name..."
                {...text(`name`)}
                required
              />
              {formState.errors && formState.errors.name && (
                <Text color="red">Name is required!</Text>
              )}
            </FormControl>
          </Flex>

          <Stack width="xl" pb="6">
            <Heading fontSize="3xl">Questions</Heading>
            <Textarea
              maxLength={120}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Short questions are recommended. You can enter up to 250 characters
                only."
            />

            <Button
              leftIcon={<PlusIcon width="20px" height="20px" />}
              colorScheme="blue"
              onClick={addQuestion}
            >
              Add question
            </Button>
          </Stack>

          <Stack
            minWidth="xl"
            maxHeight="xl"
            overflowY="auto"
            overflowX="hidden"
            spacing="5"
            py={questionList.length === 0 ? `0` : `1`}
          >
            {questionList &&
              questionList.map((item, index) => (
                <Question
                  key={_.uniqueId(`question`)}
                  questionText={item.text}
                  onDelete={() => removeQuestion(index)}
                />
              ))}
            {questionList.length === 0 && (
              <Box borderWidth="1px" p="5" fontWeight="bold">
                No questions has been added!
              </Box>
            )}
          </Stack>
          <Flex width="xl" pt="5">
            <Button isFullWidth colorScheme="green" type="submit">
              Create presentation
            </Button>
          </Flex>
        </form>
      </Grid>
    </Content>
  );
};

export default CreatePresentation;
