import { Fragment, FunctionComponent } from 'react';
import Head from 'next/head';
import { Navbar } from '@/components';

interface ContentProps {
  title: string;
  hasNavbar: boolean;
}

const Content: FunctionComponent<ContentProps> = ({
  children,
  title,
  hasNavbar,
}) => (
  <>
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {hasNavbar ? <Navbar /> : ``}
    {children}
  </>
);

export default Content;
