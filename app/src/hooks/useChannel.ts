import { SocketContext } from '@/contexts';
import { Presence, Socket } from 'phoenix';
import { Dispatch, useContext, useEffect, useState } from 'react';

export const useChannel = (
  channelTopic: string,
  onMessage: (event: any, payload: any) => void,
) => {
  const socket = useContext(SocketContext);
  const [presence, setPresence] = useState<Presence>();

  const [broadcast, setBroadcast] = useState<
    (eventName: string, payload: any) => void
  >(mustJoinChannelWarning); // eslint-disable-line @typescript-eslint/no-use-before-define

  useEffect(() => {
    let doCleanup: () => void = () => null;

    if (socket != null) {
      // eslint-disable-next-line @typescript-eslint/no-use-before-define
      doCleanup = joinChannel(
        socket,
        channelTopic,
        onMessage,
        setBroadcast,
        setPresence,
      );
    }
    return doCleanup;
  }, [channelTopic, onMessage, socket]);

  return { broadcast, presence };
};

const joinChannel = (
  socket: Socket,
  channelTopic: string,
  onMessage: (event: any, payload: any) => void,
  setBroadcast: React.Dispatch<
    React.SetStateAction<(eventName: string, payload: any) => void>
  >,
  setPresence: Dispatch<any>,
) => {
  const channel = socket.channel(channelTopic, { client: `browser` });
  const presence = new Presence(channel);
  setPresence(presence);

  channel.onMessage = (event, payload) => {
    if (event != null && !event.startsWith(`chan_reply_`)) {
      onMessage(event, payload);
    }

    return payload;
  };

  if (!channelTopic) {
    console.log(`Fetching...`);
  } else {
    channel
      .join()
      .receive(`ok`, ({ messages }) =>
        console.log(`successfully joined channel`, messages || ``),
      )
      .receive(`error`, ({ reason }) =>
        console.error(`failed to join channel`, reason),
      );
  }

  setBroadcast(() => (eventName: string, payload: any) =>
    channel.push(eventName, payload),
  );

  return () => {
    channel.leave();
  };
};

const mustJoinChannelWarning = () => () =>
  console.error(
    `useChannel broadcast function cannot be invoked before the channel has been joined`,
  );
