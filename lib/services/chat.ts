export const MOCK_RESPONSES = [
  `Sentient refers to the ability to experience feelings or sensations. It means being capable of sensing or feeling, conscious of or responsive to the sensations of seeing, hearing. feeling, tasting, or smelling.


Key Points:

- Sentient beings are able to feel things or sense them.

- The term is often used in phrases like "sentient beings" and "sentient creatures," emphasizing that things that don't have life don't have feelings.

- Sentient is a formal adjective that can be used in different contexts and languages.

- The word has its roots in Latin, with the earliest known use dating back to the early 1600s.


Examples and Usage:

- Man is a sentient being.

- There was no sign of any sentient life or activity.

- Sentient is used nouns like "being" to describe entities that possess consciousness or the ability to feel.


Related Concepts:

- Sentience is an important concept in ethics, particularly in utilitarianism, as it forms a basis for determining which entities deserve moral consideration.

- In Asian religions, the word "sentience" has been used to translate various concepts. 

- In science fiction, the word "sentience" is often used to describe the ability of artificial intelligence or other non-human entities to experience consciousness or emotions.`,
  "The meaning of life is a philosophical and spiritual question that has intrigued humans throughout history. Different perspectives include:\n\n1. Scientific: Understanding and exploring the universe\n2. Religious: Fulfilling divine purpose\n3. Philosophical: Creating personal meaning\n4. Humanistic: Contributing to society and human progress\n\nUltimately, many argue that each individual must discover their own meaning.",
  "Consciousness is the state of being aware of and able to think about one's own existence. Key aspects include:\n\n1. Self-awareness\n2. Subjective experiences\n3. Perception of thoughts and feelings\n4. Mental states\n\nIt remains one of the most fascinating and debated topics in philosophy, neuroscience, and psychology."
]

export async function mockChatResponse(query: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Updated matching logic
  const q = query.toLowerCase()
  if (q.includes('sentient')) return MOCK_RESPONSES[0]
  if (q.includes('life')) return MOCK_RESPONSES[1]
  if (q.includes('consciousness')) return MOCK_RESPONSES[2]
  return MOCK_RESPONSES[0]
} 