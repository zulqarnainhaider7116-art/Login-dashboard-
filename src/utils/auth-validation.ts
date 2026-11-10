export type GenderTheme = 'boy' | 'girl';

export interface ThemeConfig {
  gender: GenderTheme;
  title: string;
  subtitle: string;
  primaryColor: string;
  primaryGradient: string;
  shadow3dClass: string;
  accentBg: string;
  inputIconBg: string;
  badgeText: string;
  companionName: string;
  companionType: string;
  ambientGradient: string;
  accentBorder: string;
  textColor: string;
}

export function getThemeConfig(gender: GenderTheme): ThemeConfig {
  if (gender === 'boy') {
    return {
      gender: 'boy',
      title: 'Welcome Back',
      subtitle: 'Login to continue your journey',
      primaryColor: '#2563EB', // Blue-600
      primaryGradient: 'from-[#3B82F6] to-[#1D4ED8]',
      shadow3dClass: 'shadow-3d-blue',
      accentBg: 'bg-blue-50',
      inputIconBg: 'bg-[#3B82F6]',
      badgeText: 'Adventure Time!',
      companionName: 'Buddy',
      companionType: 'Puppy Dog',
      ambientGradient: 'from-blue-100 via-sky-50 to-blue-200/60',
      accentBorder: 'border-blue-200',
      textColor: 'text-blue-600',
    };
  }

  return {
    gender: 'girl',
    title: 'Welcome Back',
    subtitle: 'Login to continue your journey',
    primaryColor: '#7C3AED', // Purple-600
    primaryGradient: 'from-[#A855F7] to-[#7C3AED]',
    shadow3dClass: 'shadow-3d-purple',
    accentBg: 'bg-purple-50',
    inputIconBg: 'bg-[#8B5CF6]',
    badgeText: 'Sweet Vibes!',
    companionName: 'Mimi',
    companionType: 'Cute Kitten',
    ambientGradient: 'from-purple-100 via-pink-50 to-purple-200/60',
    accentBorder: 'border-purple-200',
    textColor: 'text-purple-600',
  };
}

export function validateUsernameOrEmail(input: string): { valid: boolean; error?: string } {
  const trimmed = input.trim();
  if (!trimmed) {
    return { valid: false, error: 'Please enter your username or email' };
  }
  if (trimmed.length < 3) {
    return { valid: false, error: 'Must be at least 3 characters long' };
  }
  // If it contains @, check email format
  if (trimmed.includes('@')) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return { valid: false, error: 'Please enter a valid email address' };
    }
  }
  return { valid: true };
}

export function validatePassword(password: string): { valid: boolean; error?: string } {
  if (!password) {
    return { valid: false, error: 'Please enter your password' };
  }
  if (password.length < 4) {
    return { valid: false, error: 'Password must be at least 4 characters' };
  }
  return { valid: true };
}

export function validateName(name: string): { valid: boolean; error?: string } {
  const trimmed = name.trim();
  if (!trimmed) {
    return { valid: false, error: 'Please enter your name' };
  }
  if (trimmed.length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters' };
  }
  return { valid: true };
}

export function validateConfirmPassword(
  password: string,
  confirmPassword: string
): { valid: boolean; error?: string } {
  if (!confirmPassword) {
    return { valid: false, error: 'Please confirm your password' };
  }
  if (password !== confirmPassword) {
    return { valid: false, error: 'Passwords do not match' };
  }
  return { valid: true };
}

export function formatSocialProviderName(provider: 'google' | 'apple' | 'facebook'): string {
  switch (provider) {
    case 'google':
      return 'Google';
    case 'apple':
      return 'Apple';
    case 'facebook':
      return 'Facebook';
  }
}

