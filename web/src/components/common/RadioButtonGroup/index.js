
// Styling
import FlexContainer from '../styled/FlexContainer';

// Components
import RadioButton from './RadioButton';

const RadioButtonGroup = ({ children, name, def, selector, valueProp, css }) => {
  const radioButtons = children.map((child, i) => {
    const value = child.props[valueProp];
    const isChecked = value === def;
    return (
      <RadioButton
        key={value + i}
        name={name}
        value={value}
        checked={isChecked}
        onChange={(event) => selector(event.target.value)}
      >
        {child}
      </RadioButton>
    )
  });

  return (
    <form>
      <FlexContainer css={css}>
        {radioButtons}
      </FlexContainer>
    </form>
  )
};

export default RadioButtonGroup;
