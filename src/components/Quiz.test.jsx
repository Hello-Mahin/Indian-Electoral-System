import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import Quiz from './Quiz';

describe('Election Quiz Component', () => {
  it('renders standard question options properly', () => {
    render(<Quiz />);
    expect(screen.getByText('Election Knowledge Quiz')).toBeInTheDocument();
    expect(screen.getByText('What is the minimum voting age in India?')).toBeInTheDocument();
  });

  it('progresses safely upon selection responses', () => {
    render(<Quiz />);
    const correctOption = screen.getByText('18 Years');
    fireEvent.click(correctOption);
    expect(screen.getByText('Next Question')).toBeInTheDocument();
  });
});
