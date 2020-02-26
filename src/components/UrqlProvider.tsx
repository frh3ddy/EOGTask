import React from 'react';
import { Provider } from 'urql';
import { Client, defaultExchanges, subscriptionExchange } from 'urql';
import { SubscriptionClient } from 'subscriptions-transport-ws';

interface UrqlProviderProps {
  children: React.ReactNode;
}

const subscriptionClient = new SubscriptionClient('wss://react.eogresources.com/graphql', {
  reconnect: true,
});

const client = new Client({
  url: 'https://react.eogresources.com/graphql',
  exchanges: [
    ...defaultExchanges,
    subscriptionExchange({
      forwardSubscription: operation => subscriptionClient.request(operation),
    }),
  ],
});

export default (props: UrqlProviderProps) => {
  return <Provider value={client}>{props.children}</Provider>;
};
