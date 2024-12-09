'use client';

import dynamic from 'next/dynamic';
import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const LoadingText = styled.p`
  font-size: 1.125rem;
  color: #666;
`;

const Vehicle = dynamic(() => import('./Vehicle'), {
  ssr: false,
  loading: () => (
    <LoadingContainer>
      <LoadingText>Loading...</LoadingText>
    </LoadingContainer>
  ),
});

export default function ClientWrapper() {
  return <Vehicle />;
}
