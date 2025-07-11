import React from 'react';
import { ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { useAppContext } from '@/context/app-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const Content = styled.View`
  flex: 1;
  padding: ${props => props.theme.spacing.md}px;
`;

const ProfileHeader = styled.View`
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.xl}px;
`;

const Avatar = styled.View`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background-color: ${props => props.theme.colors.primary};
  justify-content: center;
  align-items: center;
  margin-bottom: ${props => props.theme.spacing.md}px;
`;

const AvatarText = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: white;
`;

const Name = styled.Text`
  font-size: ${props => props.theme.typography.h2}px;
  font-weight: bold;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.xs}px;
`;

const Email = styled.Text`
  font-size: ${props => props.theme.typography.body}px;
  color: ${props => props.theme.colors.textSecondary};
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

const InfoRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.md}px;
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.md}px;
  margin-bottom: ${props => props.theme.spacing.sm}px;
`;

const InfoLabel = styled.Text`
  font-size: ${props => props.theme.typography.body}px;
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`;

const InfoValue = styled.Text`
  font-size: ${props => props.theme.typography.body}px;
  color: ${props => props.theme.colors.textSecondary};
`;

export function ProfileScreen(): JSX.Element {
  const { state, setUser } = useAppContext();

  const mockUser = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'JD',
  };

  const handleSignIn = () => {
    setUser(mockUser);
  };

  const handleSignOut = () => {
    setUser(null);
  };

  const user = state.user || mockUser;

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Content>
          <ProfileHeader>
            <Avatar>
              <AvatarText>{user.name.split(' ').map(n => n[0]).join('')}</AvatarText>
            </Avatar>
            <Name>{user.name}</Name>
            <Email>{user.email}</Email>
          </ProfileHeader>

          <Section>
            <SectionTitle>Account Information</SectionTitle>
            <Card>
              <InfoRow>
                <InfoLabel>User ID</InfoLabel>
                <InfoValue>{user.id}</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Member Since</InfoLabel>
                <InfoValue>January 2024</InfoValue>
              </InfoRow>
              <InfoRow>
                <InfoLabel>Status</InfoLabel>
                <InfoValue>Active</InfoValue>
              </InfoRow>
            </Card>
          </Section>

          <Section>
            <SectionTitle>Actions</SectionTitle>
            <Button
              title={state.user ? 'Sign Out' : 'Sign In'}
              onPress={state.user ? handleSignOut : handleSignIn}
              variant="primary"
            />
          </Section>
        </Content>
      </ScrollView>
    </Container>
  );
}