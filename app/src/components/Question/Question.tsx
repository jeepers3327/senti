import React, { FunctionComponent } from 'react';
import { Box, Flex, Text, IconButton } from '@chakra-ui/react';
import { TrashIcon } from '@heroicons/react/solid';

export interface QuestionProps {
  questionText: string;
  onDelete: () => void;
}

const Question: FunctionComponent<QuestionProps> = ({
  questionText,
  onDelete,
}) => (
  <Box borderWidth="1px" borderRadius="lg" width="xl" p="4">
    <Flex justifyContent="space-between">
      <Text fontWeight="bold" fontSize="large">
        {questionText}
      </Text>
      <IconButton
        size="sm"
        variant="outline"
        colorScheme="red"
        aria-label="Send email"
        icon={<TrashIcon width="20px" height="20px" />}
        onClick={onDelete}
      />
    </Flex>
  </Box>
);

export default Question;
