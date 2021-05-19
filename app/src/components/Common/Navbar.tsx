import {
  useColorModeValue,
  useDisclosure,
  chakra,
  Button,
  Flex,
  HStack,
  IconButton,
  VStack,
  Img,
  LinkOverlay,
  LinkBox,
  MenuList,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  Text,
  useOutsideClick,
} from '@chakra-ui/react';

import React, { Fragment, FunctionComponent, useRef } from 'react';
import { MenuIcon } from '@heroicons/react/outline';
import Link from 'next/link';
import Router from 'next/router';

import { useAppDispatch, useAppSelector } from '@/hooks';
import { deleteSession } from '@/utils';
import { resetUserInfo } from '@/store';

const Header: FunctionComponent = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const mobileNav = useDisclosure();

  useOutsideClick({
    ref: mobileRef,
    handler: mobileNav.onClose,
  });

  const handleLogout = async () => {
    await deleteSession();
    dispatch(resetUserInfo());
    Router.push(`/`);
  };

  const MobileNavContent = (
    <VStack
      ref={mobileRef}
      pos="absolute"
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? `flex` : `none`}
      flexDirection="column"
      p={2}
      pb={4}
      m={2}
      bg="white"
      spacing={3}
      rounded="sm"
      shadow="sm"
    >
      {user.id === `` && (
        <>
          <HStack justifyContent="space-evenly">
            <Button
              colorScheme="brand"
              variant="ghost"
              size="sm"
              onClick={() => Router.push(`/login`)}
            >
              Sign in
            </Button>
            <Button
              colorScheme="facebook"
              variant="solid"
              size="sm"
              onClick={() => Router.push(`/register`)}
            >
              Sign up
            </Button>
          </HStack>
        </>
      )}
      {user.id !== `` && (
        <HStack justifyContent="space-evenly">
          <Text paddingY="0.5rem" paddingX="1rem">
            Logged in as: {user.name}
          </Text>
          <Button colorScheme="blue" onClick={handleLogout}>
            Logout
          </Button>
        </HStack>
      )}
    </VStack>
  );

  return (
    <>
      <chakra.header
        ref={ref}
        shadow="sm"
        transition="box-shadow 0.2s"
        bg="white"
        w="full"
        overflowY="hidden"
        borderBottomWidth={2}
        borderBottomColor={useColorModeValue(`gray.200`, `gray.900`)}
      >
        <chakra.div h="4.5rem" mx="auto" maxW="1200px">
          <Flex
            w="full"
            h="full"
            px="6"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex align="flex-start">
              <LinkBox>
                <Link href="/" passHref>
                  <LinkOverlay>
                    <Img h="2rem" src="/senti-dark.svg" />
                  </LinkOverlay>
                </Link>
              </LinkBox>
            </Flex>
            <Flex justify="flex-end" align="center" color="gray.400">
              <HStack spacing="5" display={{ base: `none`, md: `flex` }}>
                {!user.isAuthenticated && (
                  <>
                    <Button
                      colorScheme="brand"
                      variant="ghost"
                      size="sm"
                      onClick={() => Router.push(`/login`)}
                    >
                      Sign in
                    </Button>
                    <Button
                      colorScheme="facebook"
                      variant="solid"
                      size="sm"
                      onClick={() => Router.push(`/register`)}
                    >
                      Sign up
                    </Button>
                  </>
                )}
                {user.isAuthenticated && (
                  <>
                    <Button
                      variant="ghost"
                      colorScheme="blackAlpha"
                      onClick={() => Router.push(`/app`)}
                    >
                      Dashboard
                    </Button>
                    <Menu>
                      <MenuButton
                        as={Button}
                        variant="ghost"
                        colorScheme="linkedin"
                      >
                        My account
                      </MenuButton>
                      <MenuList>
                        <Text paddingY="0.5rem" paddingX="1rem">
                          Logged in as: {user.name}
                        </Text>
                        <MenuDivider />
                        <MenuItem onClick={() => Router.push('/app/account')}>
                          Update account
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </MenuList>
                    </Menu>
                  </>
                )}
              </HStack>
              <IconButton
                display={{ base: `flex`, md: `none` }}
                aria-label="Open menu"
                fontSize="20px"
                color={useColorModeValue(`gray.800`, `inherit`)}
                variant="ghost"
                icon={<MenuIcon width="20px" height="20px" />}
                onClick={mobileNav.onOpen}
              />
            </Flex>
          </Flex>
          {MobileNavContent}
        </chakra.div>
      </chakra.header>
    </>
  );
};

export default Header;
