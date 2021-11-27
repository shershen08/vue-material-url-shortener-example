//require('jsdom-global')();

import { shallowMount, createLocalVue } from '@vue/test-utils'
import UrlForm from '@/components/UrlForm.vue'
import VueMaterial from 'vue-material'

const localVue = createLocalVue()
localVue.use(VueMaterial)

describe('UrlForm.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(UrlForm, {
      localVue,
      propsData: {}
    })
  })

  it('check props', () => {

    expect(wrapper.vm.alowedToCopy).toEqual(false);
    expect(wrapper.vm.link).toEqual('');
    expect(wrapper.vm.shortLink).toEqual('');
    expect(wrapper.vm.validate()).toBeFalsy();
  });


  it('validate input', () => {

    expect(wrapper.vm.validate()).toBeFalsy();
    wrapper.vm.link = 'abcd'
    expect(wrapper.vm.validate()).toBeFalsy();
    
    wrapper.vm.link = 'https://vue-test-utils.vuejs.org/'
    expect(wrapper.vm.validate()).toBe(true);
    expect(wrapper.vm.shortLink).toEqual('');
  });

  it('check hashing ', async () => {
    
    wrapper.vm.link = 'https://vue-test-utils.vuejs.org/'
    // const button = wrapper.find('[data-testid="makeLinkShort"]')
    // const codeElement = wrapper.find('code')

    //await button.trigger('click')
    wrapper.vm.makeLinkShort();

    expect(wrapper.vm.shortLink).toEqual('http://short.url/1279301759');
    //expect(codeElement.text()).toContain('http://short.url/1279301759')
  });

});
