import { mount } from '@vue/test-utils';
import HeadingComponent from '@/components/common/HeadingComponent.vue';

describe('HeadingComponent.vue', () => {
  let heading = 'Hello World';
  let wrapper;
  beforeEach(() => {
    wrapper = mount(HeadingComponent, {
      propsData: {
        heading,
      },
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });
  it('renders the heading with the correct text', () => {
    const title = wrapper.find('[data-id="heading"]');
    expect(title.exists()).toBe(true);
    expect(title.text()).toBe(heading);
  });
  it('accepts props and passes them correctly', () => {
    let heading = 'Heading';
    const wrapper = mount(HeadingComponent, {
      propsData: { heading },
    });
    expect(wrapper.props('heading')).toBe(heading);
  });

  it('matches snapshot', () => {
    const wrapper = mount(HeadingComponent, {
      propsData: {
        heading: 'Snapshot Test', // Correct prop name
      },
    });
    expect(wrapper.html()).toMatchSnapshot();
  });
});
