import React, { useRef, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Background from '~/components/Background';

import api from '~/services/api';
import SelectDateTime from '~/components/SelectDateTime'
import {
  Container,
  ProvidersList,
  Provider,
  Avatar,
  Name,
  Content,
  Separator
} from './styles';

export default function SelectHour({ navigation }) {
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    async function loadProviders() {
      const response = await api.get('providers');
      setProviders(response.data);
    }

    loadProviders();
  }, [providers]);


  function renderItem({ item: provider, index }) {
    return (
      <Content>
        {index !== 0 ? <Separator></Separator> : <></>}
        <Provider>
          <Avatar
            source={{
              uri: provider.avatar
                ? provider.avatar.url
                : `https://api.adorable.io/avatar/50/${provider.name}`,
            }}
          />
          <Name>{provider.name}</Name>
        </Provider>

        <SelectDateTime navigation={navigation} provider={provider} />
      </Content>
    )

  }

  return (
    <Background>
      <Container>
        <ProvidersList
          data={providers}
          keyExtractor={provider => String(provider.id)}
          renderItem={renderItem}
        />
      </Container>
    </Background>
  );
}
