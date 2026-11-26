import type { User } from '@supabase/supabase-js';

import type { AuthMessage } from '@/lib/auth';
import { supabase } from '@/lib/supabase';

export type WorkType = 'everyday' | 'professional';

export const WORK_TYPES: { value: WorkType; title: string; description: string }[] = [
  {
    value: 'everyday',
    title: 'Everyday tasks',
    description:
      'I can help with everyday jobs, like errands, cleaning, moving or assembling furniture.',
  },
  {
    value: 'professional',
    title: 'Professional',
    description:
      'I am a skilled professional with certificates or qualifications, like an electrician, plumber or carpenter.',
  },
];

/** What onboarding stores in the user's Supabase metadata. */
type OnboardingMetadata = {
  work_country?: string;
  work_type?: WorkType;
  onboarding_completed?: boolean;
};

function metadata(user: User | null | undefined): OnboardingMetadata {
  return (user?.user_metadata ?? {}) as OnboardingMetadata;
}

export function hasCompletedOnboarding(user: User | null | undefined) {
  return metadata(user).onboarding_completed === true;
}

export function onboardingAnswers(user: User | null | undefined) {
  const { work_country, work_type } = metadata(user);
  return { country: work_country, workType: work_type };
}

const saveFailed: AuthMessage = {
  en: "Your answers couldn't be saved. Check your connection and try again.",
  nl: 'Je antwoorden konden niet worden opgeslagen. Controleer je verbinding en probeer het opnieuw.',
};

/**
 * Saves both answers at once. Supabase then reports the updated user, which moves the app on to
 * the tabs.
 */
export async function completeOnboarding(
  country: string,
  workType: WorkType,
): Promise<AuthMessage | null> {
  const data: OnboardingMetadata = {
    work_country: country,
    work_type: workType,
    onboarding_completed: true,
  };
  const { error } = await supabase.auth.updateUser({ data });
  if (!error) return null;
  console.warn('Saving onboarding failed', error);
  return saveFailed;
}
