import {
  useColorMode,
  useColorModeValue,
  useDisclosure,
  chakra,
  Button,
  CloseButton,
  Flex,
  HStack,
  IconButton,
  VStack,
  Img,
  LinkOverlay,
  LinkBox,
} from '@chakra-ui/react';
import { useViewportScroll } from 'framer-motion';

import {
  SunIcon,
  HomeIcon,
  VideoCameraIcon,
  MenuIcon,
  MoonIcon,
  InboxIcon,
} from '@heroicons/react/outline';

import Link from 'next/link';

import React, { FunctionComponent, useRef } from 'react';
import { useRouter } from 'next/router';

const Header: FunctionComponent = () => {
  const { toggleColorMode: toggleMode, colorMode } = useColorMode();
  const text = useColorModeValue(`dark`, `light`);
  const SwitchIcon = useColorModeValue(MoonIcon, SunIcon);
  const bg = useColorModeValue(`white`, `gray.800`);
  const ref = useRef<HTMLDivElement>(null);
  const [y, setY] = React.useState(0);
  const { height = 0 } = ref.current ? ref.current.getBoundingClientRect() : {};
  const { scrollY } = useViewportScroll();
  const router = useRouter();

  React.useEffect(() => scrollY.onChange(() => setY(scrollY.get())), [scrollY]);

  const mobileNav = useDisclosure();

  const MobileNavContent = (
    <VStack
      pos="absolute"
      top={0}
      left={0}
      right={0}
      display={mobileNav.isOpen ? `flex` : `none`}
      flexDirection="column"
      p={2}
      pb={4}
      m={2}
      bg={bg}
      spacing={3}
      rounded="sm"
      shadow="sm"
    >
      <CloseButton
        aria-label="Close menu"
        justifySelf="self-start"
        onClick={mobileNav.onClose}
      />
      <Button
        w="full"
        variant="ghost"
        leftIcon={<HomeIcon width="20px" height="20px" />}
      >
        Dashboard
      </Button>
      <Button
        w="full"
        variant="solid"
        colorScheme="brand"
        leftIcon={<InboxIcon width="20px" height="20px" />}
      >
        Inbox
      </Button>
      <Button
        w="full"
        variant="ghost"
        leftIcon={<VideoCameraIcon width="20px" height="20px" />}
      >
        Videos
      </Button>
    </VStack>
  );

  return (
    <>
      <chakra.header
        ref={ref}
        shadow={y > height ? `sm` : undefined}
        transition="box-shadow 0.2s"
        bg={bg}
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
                    <Img
                      h="2rem"
                      src={
                        colorMode === `light`
                          ? `/senti-dark.svg`
                          : `/senti-light.svg`
                      }
                    />
                  </LinkOverlay>
                </Link>
              </LinkBox>
            </Flex>
            <Flex justify="flex-end" align="center" color="gray.400">
              <HStack spacing="5" display={{ base: `none`, md: `flex` }}>
                <Button
                  colorScheme="brand"
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(`/login`)}
                >
                  Sign in
                </Button>
                <Button
                  colorScheme="facebook"
                  variant="solid"
                  size="sm"
                  onClick={() => router.push(`/register`)}
                >
                  Sign up
                </Button>
              </HStack>
              <IconButton
                size="md"
                fontSize="lg"
                aria-label={`Switch to ${text} mode`}
                variant="ghost"
                color="current"
                ml={{ base: `0`, md: `3` }}
                onClick={toggleMode}
                icon={<SwitchIcon width="20px" height="20px" />}
              />
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
