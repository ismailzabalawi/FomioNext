import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute } from '@react-navigation/native';
import styled from 'styled-components/native';

import { RootStackParamList } from '@/types';
import { Card } from '@/components/ui/card';

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;

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
`;

const Section = styled.View`
  margin-bottom: ${props => props.theme.spacing.lg}px;
`;

const SectionTitle = styled.Text`
  font-size: ${props => props.theme.typography.h3}px;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm}px;
`;

const DetailRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.md}px;
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.md}px;
  margin-bottom: ${props => props.theme.spacing.sm}px;
`;

const DetailLabel = styled.Text`
  font-size: ${props => props.theme.typography.body}px;
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`;

const DetailValue = styled.Text`
  font-size: ${props => props.theme.typography.body}px;
  color: ${props => props.theme.colors.textSecondary};
`;

const Description = styled.Text`
  font-size: ${props => props.theme.typography.body}px;
  color: ${props => props.theme.colors.text};
  line-height: 24px;
  padding: ${props => props.theme.spacing.md}px;
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.md}px;
`;

export function DetailsScreen(): JSX.Element {
  const route = useRoute<DetailsScreenRouteProp>();
  const { id } = route.params;

  // Mock data based on the ID
  const itemDetails = {
    id,
    name: `Item ${id}`,
    category: 'Technology',
    status: 'Active',
    created: '2024-01-15',
    updated: '2024-01-20',
    description: 'This is a detailed view of an item in the application. Here you can see all the relevant information about this specific item, including its properties, status, and history.',
  };

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Content>
          <Title>{itemDetails.name}</Title>

          <Section>
            <SectionTitle>General Information</SectionTitle>
            <Card>
              <DetailRow>
                <DetailLabel>ID</DetailLabel>
                <DetailValue>{itemDetails.id}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Category</DetailLabel>
                <DetailValue>{itemDetails.category}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Status</DetailLabel>
                <DetailValue>{itemDetails.status}</DetailValue>
              </DetailRow>
            </Card>
          </Section>

          <Section>
            <SectionTitle>Timeline</SectionTitle>
            <Card>
              <DetailRow>
                <DetailLabel>Created</DetailLabel>
                <DetailValue>{itemDetails.created}</DetailValue>
              </DetailRow>
              <DetailRow>
                <DetailLabel>Last Updated</DetailLabel>
                <DetailValue>{itemDetails.updated}</DetailValue>
              </DetailRow>
            </Card>
          </Section>

          <Section>
            <SectionTitle>Description</SectionTitle>
            <Description>{itemDetails.description}</Description>
          </Section>
        </Content>
      </ScrollView>
    </Container>
  );
}