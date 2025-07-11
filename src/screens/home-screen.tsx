import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { RootStackParamList } from '@/types';
import { useAppContext } from '@/context/app-context';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const Content = styled.View`
  flex: 1;
  padding: ${props => props.theme.spacing.md}px;
`;

const Title = styled.Text`
  font-size: ${props => props.theme.typography.h1}px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg}px;
  text-align: center;
`;

const Subtitle = styled.Text`
  font-size: ${props => props.theme.typography.body}px;
  color: ${props => props.theme.colors.textSecondary};
  margin-bottom: ${props => props.theme.spacing.xl}px;
  text-align: center;
  line-height: 24px;
`;

const CardContainer = styled.View`
  margin-bottom: ${props => props.theme.spacing.md}px;
`;

const CardTitle = styled.Text`
  font-size: ${props => props.theme.typography.h3}px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm}px;
`;

const CardDescription = styled.Text`
  font-size: ${props => props.theme.typography.body}px;
  color: ${props => props.theme.colors.textSecondary};
  line-height: 22px;
`;

export function HomeScreen(): JSX.Element {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { state } = useAppContext();

  const handleNavigateToDetails = () => {
    navigation.navigate('Details', { id: '123' });
  };

  const features = [
    {
      title: 'TypeScript Support',
      description: 'Built with strict TypeScript for better type safety and developer experience.',
    },
    {
      title: 'React Navigation',
      description: 'Seamless navigation with typed routes and deep linking support.',
    },
    {
      title: 'Dark Mode',
      description: 'Automatic dark mode detection with consistent theming throughout the app.',
    },
    {
      title: 'State Management',
      description: 'Global state management with React Context and useReducer patterns.',
    },
  ];

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Content>
          <Title>Welcome to Expo MVP</Title>
          <Subtitle>
            A modern React Native application built with Expo, TypeScript, and best practices for mobile development.
          </Subtitle>

          {features.map((feature, index) => (
            <CardContainer key={index}>
              <Card>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </Card>
            </CardContainer>
          ))}

          <Button
            title="View Details"
            onPress={handleNavigateToDetails}
            variant="primary"
          />
        </Content>
      </ScrollView>
    </Container>
  );
}