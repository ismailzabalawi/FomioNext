import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

import { ButtonProps } from '@/types';

const StyledButton = styled.TouchableOpacity<{
  variant: ButtonProps['variant'];
  size: ButtonProps['size'];
  disabled: boolean;
}>`
  padding: ${props => {
    switch (props.size) {
      case 'sm': return `${props.theme.spacing.sm}px ${props.theme.spacing.md}px`;
      case 'lg': return `${props.theme.spacing.lg}px ${props.theme.spacing.xl}px`;
      default: return `${props.theme.spacing.md}px ${props.theme.spacing.lg}px`;
    }
  }};
  border-radius: ${props => props.theme.borderRadius.md}px;
  background-color: ${props => {
    if (props.disabled) return props.theme.colors.border;
    switch (props.variant) {
      case 'secondary': return props.theme.colors.secondary;
      case 'outline': return 'transparent';
      default: return props.theme.colors.primary;
    }
  }};
  border-width: ${props => props.variant === 'outline' ? '2px' : '0px'};
  border-color: ${props => props.variant === 'outline' ? props.theme.colors.primary : 'transparent'};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  min-height: ${props => {
    switch (props.size) {
      case 'sm': return '36px';
      case 'lg': return '56px';
      default: return '48px';
    }
  }};
  opacity: ${props => props.disabled ? 0.6 : 1};
`;

const ButtonText = styled.Text<{
  variant: ButtonProps['variant'];
  size: ButtonProps['size'];
  disabled: boolean;
}>`
  font-size: ${props => {
    switch (props.size) {
      case 'sm': return `${props.theme.typography.caption}px`;
      case 'lg': return `${props.theme.typography.h3}px`;
      default: return `${props.theme.typography.body}px`;
    }
  }};
  font-weight: 600;
  color: ${props => {
    if (props.disabled) return props.theme.colors.textSecondary;
    if (props.variant === 'outline') return props.theme.colors.primary;
    return '#FFFFFF';
  }};
  margin-left: ${props => props.children ? `${props.theme.spacing.xs}px` : '0px'};
`;

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  isLoading = false,
}: ButtonProps): JSX.Element {
  const handlePress = () => {
    if (!disabled && !isLoading) {
      onPress();
    }
  };

  return (
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled || isLoading}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      {isLoading && (
        <ActivityIndicator
          size="small"
          color={variant === 'outline' ? undefined : '#FFFFFF'}
        />
      )}
      <ButtonText
        variant={variant}
        size={size}
        disabled={disabled || isLoading}
      >
        {title}
      </ButtonText>
    </StyledButton>
  );
}
