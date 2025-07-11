import React from 'react';
import styled from 'styled-components/native';

import { CardProps } from '@/types';

const StyledCard = styled.TouchableOpacity<{
  onPress?: () => void;
  elevation: number;
}>`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg}px;
  padding: ${props => props.theme.spacing.md}px;
  margin-bottom: ${props => props.theme.spacing.sm}px;
  shadow-color: #000;
  shadow-offset: 0px ${props => props.elevation * 2}px;
  shadow-opacity: 0.1;
  shadow-radius: ${props => props.elevation * 2}px;
  elevation: ${props => props.elevation};
  border-width: 1px;
  border-color: ${props => props.theme.colors.border};
`;

const NonTouchableCard = styled.View<{
  elevation: number;
}>`
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.borderRadius.lg}px;
  padding: ${props => props.theme.spacing.md}px;
  margin-bottom: ${props => props.theme.spacing.sm}px;
  shadow-color: #000;
  shadow-offset: 0px ${props => props.elevation * 2}px;
  shadow-opacity: 0.1;
  shadow-radius: ${props => props.elevation * 2}px;
  elevation: ${props => props.elevation};
  border-width: 1px;
  border-color: ${props => props.theme.colors.border};
`;

export function Card({
  children,
  onPress,
  elevation = 2,
}: CardProps): JSX.Element {
  if (onPress) {
    return (
      <StyledCard
        onPress={onPress}
        elevation={elevation}
        activeOpacity={0.8}
      >
        {children}
      </StyledCard>
    );
  }

  return (
    <NonTouchableCard elevation={elevation}>
      {children}
    </NonTouchableCard>
  );
}
