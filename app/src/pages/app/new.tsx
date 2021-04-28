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
  Checkbox,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { PlusIcon } from '@heroicons/react/solid';
import { useFormState } from 'react-use-form-state';
import _ from 'lodash';

import { Content, Question } from '@/components';

interface FormProps {
  name: string;
  allow_multiple_answers: string;
}

interface QuestionListProps {
  text: string;
}

const CreatePresentation = () => {
  const [questionList, setQuestionList] = useState<QuestionListProps[]>([]);
  const [question, setQuestion] = useState(``);
  const [formState, { text, checkbox }] = useFormState<FormProps>();
  // const isFormValid = () => Object.keys(formState.errors).length === 0;
  const addQuestion = () => {
    if (question === ``) return;

    const newQuestionList = [...questionList, { text: question }];
    setQuestionList(newQuestionList);
    setQuestion(``);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // const values = { ...formState.values, questions: questionList };
  };

  return (
    <Content title="Senti - Create new presentation" hasNavbar>
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
                  onDelete={() => console.log(index)}
                />
              ))}
            {questionList.length === 0 && (
              <Box borderWidth="1px" p="5" fontWeight="bold">
                No questions has been added!
              </Box>
            )}
          </Stack>
          <Flex pb="1" pt="8" width="xl">
            <FormControl>
              <FormLabel>
                <Heading fontSize="3xl">Option</Heading>
              </FormLabel>
              <Checkbox defaultChecked {...checkbox(`allow_multiple_answers`)}>
                Allow multiple answers
              </Checkbox>
            </FormControl>
          </Flex>
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
