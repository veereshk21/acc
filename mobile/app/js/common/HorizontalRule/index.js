import styled from 'styled-components';

const HorizontalRule = styled.hr`
  ${(props) => `
    margin: ${props.margin};
    border-top: ${props.y}px solid;
    border-color: ${props.color};
  `}
`;
HorizontalRule.defaultProps = {
  y: 5,
  color: '#0000000',
  margin: '18px 0',
};
export default HorizontalRule;
