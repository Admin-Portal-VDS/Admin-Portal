import { mount } from '@vue/test-utils';
import SecondaryButton from '@/components/common/SecondaryButton';

describe('SecondaryButton.vue', () => {
  it('renders button name correctly', () => {
    const secondaryButton = 'Secondary Button';
    const wrapper = mount(SecondaryButton, {
      propsData: {
        secondaryButton,
      },
    });
    const title = wrapper.find('button');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe(secondaryButton);
  });
  it('accepts props and passes them correctly', () => {
    const secondaryButton = 'Test Button';
    const wrapper = mount(SecondaryButton, {
      propsData: { secondaryButton },
    });
    expect(wrapper.props('secondaryButton')).toBe(secondaryButton); // Check prop
  });
  it('throws an error if required prop is missing', () => {
    expect(() => {
      mount(SecondaryButton);
    }).toThrow('Label prop is required');
  });
  it('matches snapshot', () => {
    const wrapper = mount(SecondaryButton, {
      propsData: { secondaryButton: 'Snapshot Test' },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
