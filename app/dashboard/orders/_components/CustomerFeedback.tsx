'use client';

import { Frown, Meh, Smile } from 'lucide-react';

export default function CustomerFeedback() {
  const feedbacks = [
    { icon: Smile, color: 'text-green-500' },
    { icon: Meh, color: 'text-yellow-500' },
    { icon: Frown, color: 'text-red-500' },
  ];

  const randomValue = Math.floor(Math.random() * feedbacks.length);

  // Pick one at random each render
  const random = feedbacks[randomValue];
  const Icon = random.icon;

  return <Icon className={`h-5 w-5 ${random.color}`} />;
}
