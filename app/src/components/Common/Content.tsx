import { Fragment, FunctionComponent } from 'react';
import Head from 'next/head';

import { Navbar } from '@/components';

interface ContentProps {
  hasNavbar: boolean;
}

const Content: FunctionComponent<ContentProps> = ({ children, hasNavbar }) => (
  <>
    <Head>
      <title>Senti - Share you thoughts freely!</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    {hasNavbar ? <Navbar /> : null}
    {children}
  </>
);

export default Content;
