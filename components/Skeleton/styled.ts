import styled from 'styled-components';

const StyledSkeleton = styled.div<{ styles: string }>`
  ${props => props.styles}
  display: inline-block;
  background: linear-gradient(-90deg, #f0f0f0 0%, #f8f8f8 50%, #f0f0f0 100%);
  background-size: 400% 400%;
  animation: pulse 0.6s ease-in-out infinite;
  @keyframes pulse {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -135% 0%;
    }
  }
`;

export default StyledSkeleton;
