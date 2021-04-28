import React, { FunctionComponent } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import {
  PlayIcon,
  ViewListIcon,
  DocumentReportIcon,
} from '@heroicons/react/solid';

import Link from 'next/link';
import { Content } from '@/components';

const today = dayjs().format(`MMMM DD, YYYY`);

const data = [
  { id: 1, name: `Jon`, createdAt: today, updatedAt: today },
  { id: 2, name: `Bon`, createdAt: today, updatedAt: today },
  { id: 3, name: `Gon`, createdAt: today, updatedAt: today },
];

const Index: FunctionComponent = () => {
  const renderRows = () =>
    data.map((item) => (
      <Tr key={item.id}>
        <Td display="none">{item.id}</Td>
        <Td width="60%">{item.name}</Td>
        <Td width="20%">{item.createdAt}</Td>
        <Td width="20%">{item.updatedAt}</Td>
        <Td>
          <ButtonGroup size="sm">
            <Button
              colorScheme="green"
              leftIcon={<PlayIcon width="20px" height="20px" />}
            >
              Present
            </Button>
            <Button
              variant="ghost"
              leftIcon={<ViewListIcon width="20px" height="20px" />}
            >
              Details
            </Button>
            <Button
              variant="ghost"
              leftIcon={<DocumentReportIcon width="20px" height="20px" />}
            >
              Export result
            </Button>
          </ButtonGroup>
        </Td>
      </Tr>
    ));

  return (
    <Content title="Senti" hasNavbar>
      <Flex direction="column" justifyContent="center" alignItems="center">
        <Flex
          justifyContent="space-between"
          height="50px"
          width="50vw"
          py="5rem"
        >
          <Heading size="lg">My presentations</Heading>
          <Button colorScheme="blue" size="sm">
            <Link href="/app/new">Create new presentation</Link>
          </Button>
        </Flex>

        <Box pt="10" minW="7xl">
          <Table colorScheme="facebook" variant="simple">
            <Thead>
              <Tr>
                <Th display="none">ID</Th>
                <Th>Name</Th>
                <Th>Created At</Th>
                <Th>Updated At</Th>
                <Th />
              </Tr>
            </Thead>
            <Tbody>{renderRows()}</Tbody>
          </Table>
        </Box>
      </Flex>
    </Content>
  );
};

export default Index;
