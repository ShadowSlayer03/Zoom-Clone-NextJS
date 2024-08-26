import { ReactNode } from 'react';
import { Metadata } from 'next';
import StreamVideoProvider from '@/providers/StreamClientProvider';

export const metadata: Metadata = {
  title: "SyncSpace | Seamless Meetings, Effortless Scheduling, and Instant Collaboration",
  description:
    "An awesome NextJS application to schedule and join real-time meetings and video conferences, built using Stream",
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default RootLayout;