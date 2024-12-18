import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ChatInput } from '../chat-input'
import { useChatStore } from '@/lib/stores/chat'
import { mockChatResponse } from '@/lib/services/chat'

jest.mock('@/lib/stores/chat')
jest.mock('@/lib/services/chat')

const mockedUseChatStore = jest.mocked(useChatStore)

jest.mock('@/lib/services/chat', () => ({
  mockChatResponse: jest.fn().mockResolvedValue('mocked response'),
}))

describe('ChatInput', () => {
  const mockStore = {
    currentQuery: '',
    setQuery: jest.fn(),
    startSearch: jest.fn(),
    startStreaming: jest.fn(),
    completeStreaming: jest.fn(),
    pauseStreaming: jest.fn(),
    isStreaming: false,
    isLoading: false,
  }

  beforeEach(() => {
    jest.clearAllMocks()
    mockedUseChatStore.mockReturnValue(mockStore)
  })

  it('renders the input field', () => {
    render(<ChatInput />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('updates input value when typing', () => {
    render(<ChatInput />)

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Test message' },
    })
    expect(mockStore.setQuery).toHaveBeenCalledWith('Test message')
  })

  it('handles form submission correctly', async () => {
    // Setup with non-empty query from the start
    const mockStoreWithQuery = {
      ...mockStore,
      currentQuery: 'test query',
    }
    mockedUseChatStore.mockReturnValue(mockStoreWithQuery)

    render(<ChatInput />)

    fireEvent.submit(screen.getByTestId('form-chat-input'))

    // Verify the sequence of actions
    expect(mockStore.startSearch).toHaveBeenCalled()
    expect(mockChatResponse).toHaveBeenCalledWith('test query')
  })

  it('pauses streaming when submitted during active stream', () => {
    mockedUseChatStore.mockReturnValue({
      ...mockStore,
      isStreaming: true,
      currentQuery: 'test',
    })

    render(<ChatInput />)

    fireEvent.submit(screen.getByTestId('form-chat-input'))
    expect(mockStore.pauseStreaming).toHaveBeenCalled()
  })
})
