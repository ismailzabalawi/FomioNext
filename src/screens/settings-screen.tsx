import React from 'react';
import { ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styled from 'styled-components/native';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { Card } from '@/components/ui/card';

const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${props => props.theme.colors.background};
`;

const Content = styled.View`
  flex: 1;
  padding: ${props => props.theme.spacing.md}px;
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

const SettingRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${props => props.theme.spacing.md}px;
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.md}px;
  margin-bottom: ${props => props.theme.spacing.sm}px;
`;

const SettingLabel = styled.View`
  flex: 1;
`;

const SettingTitle = styled.Text`
  font-size: ${props => props.theme.typography.body}px;
  color: ${props => props.theme.colors.text};
  font-weight: 500;
`;

const SettingDescription = styled.Text`
  font-size: ${props => props.theme.typography.caption}px;
  color: ${props => props.theme.colors.textSecondary};
  margin-top: 2px;
`;

const SettingValue = styled.Text`
  font-size: ${props => props.theme.typography.body}px;
  color: ${props => props.theme.colors.textSecondary};
`;

export function SettingsScreen(): JSX.Element {
  const colorScheme = useColorScheme();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = React.useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = React.useState(true);

  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Content>
          <Section>
            <SectionTitle>Appearance</SectionTitle>
            <Card>
              <SettingRow>
                <SettingLabel>
                  <SettingTitle>Theme</SettingTitle>
                  <SettingDescription>Current theme preference</SettingDescription>
                </SettingLabel>
                <SettingValue>{colorScheme === 'dark' ? 'Dark' : 'Light'}</SettingValue>
              </SettingRow>
            </Card>
          </Section>

          <Section>
            <SectionTitle>Notifications</SectionTitle>
            <Card>
              <SettingRow>
                <SettingLabel>
                  <SettingTitle>Push Notifications</SettingTitle>
                  <SettingDescription>Receive notifications about app updates</SettingDescription>
                </SettingLabel>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                />
              </SettingRow>
            </Card>
          </Section>

          <Section>
            <SectionTitle>Security</SectionTitle>
            <Card>
              <SettingRow>
                <SettingLabel>
                  <SettingTitle>Biometric Authentication</SettingTitle>
                  <SettingDescription>Use fingerprint or face ID for app access</SettingDescription>
                </SettingLabel>
                <Switch
                  value={biometricsEnabled}
                  onValueChange={setBiometricsEnabled}
                />
              </SettingRow>
            </Card>
          </Section>

          <Section>
            <SectionTitle>Privacy</SectionTitle>
            <Card>
              <SettingRow>
                <SettingLabel>
                  <SettingTitle>Analytics</SettingTitle>
                  <SettingDescription>Help improve the app by sharing usage data</SettingDescription>
                </SettingLabel>
                <Switch
                  value={analyticsEnabled}
                  onValueChange={setAnalyticsEnabled}
                />
              </SettingRow>
            </Card>
          </Section>

          <Section>
            <SectionTitle>About</SectionTitle>
            <Card>
              <SettingRow>
                <SettingLabel>
                  <SettingTitle>Version</SettingTitle>
                </SettingLabel>
                <SettingValue>1.0.0</SettingValue>
              </SettingRow>
              <SettingRow>
                <SettingLabel>
                  <SettingTitle>Build</SettingTitle>
                </SettingLabel>
                <SettingValue>2024.1.1</SettingValue>
              </SettingRow>
            </Card>
          </Section>
        </Content>
      </ScrollView>
    </Container>
  );
}