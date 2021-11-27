import Vue from 'vue';
import { shallowMount, createLocalVue } from '@vue/test-utils'
import VueMaterial from 'vue-material'

import UrlForm from '@/components/UrlForm.vue'

const localVue = createLocalVue()
localVue.use(VueMaterial)

global.navigator.permissions = {
    query: function(){
      return new Promise((resolve) => {
        resolve({
            state: 'granted'
          })
       })
    }
};
global.navigator.clipboard = {
  writeText: function(){}
}

describe('UrlForm.vue', () => {
  let wrapper;

  const SAMPLE_URL = 'https://vue-test-utils.vuejs.org/';
  const SAMPLE_URL_HASH = 'http://short.url/1279301759';

  beforeEach(() => {
    wrapper = shallowMount(UrlForm, {
      localVue,
      propsData: {
        hostUrl: 'http://short.url/'
      }
    })
  })

  it('check initial props', () => {
    expect(wrapper.vm.alowedToCopy).toEqual(true);
    expect(wrapper.vm.link).toEqual('');
    expect(wrapper.vm.shortLink).toEqual('');
    expect(wrapper.vm.validate()).toBeFalsy();
  });

  it('UI elements',  () => {
    // const checkPermissions = jest.fn();
    // wrapper = shallowMount(UrlForm, {
    //   localVue,
    //   propsData: {
    //     hostUrl: 'http://short.url/'
    //   },
    //   methods: {
    //     checkPermissions
    //   }
    // })

    //const spyOnQuery = jest.spyOn(global.navigator.permissions, 'query');
    const button = wrapper.find('[data-testid="makeLinkShort"]')
    const codeElement = wrapper.find('code')

    //await Vue.nextTick()
    
    expect(button.exists()).toBe(true);
    expect(codeElement.exists()).toBe(true);

    //expect(checkPermissions).toBeCalled()
    //expect(wrapper.vm.checkPermissions).toHaveBeenCalledTimes(1);
    
  });

  it('validate input', () => {

    expect(wrapper.vm.validate()).toBeFalsy();
    wrapper.vm.link = 'abcd'
    expect(wrapper.vm.validate()).toBeFalsy();
    
    wrapper.vm.link = SAMPLE_URL
    expect(wrapper.vm.validate()).toBe(true);
    expect(wrapper.vm.shortLink).toEqual('');
  });

  it('hashing function', async () => {
    
    wrapper.vm.link = SAMPLE_URL
    wrapper.vm.makeLinkShort();

    expect(wrapper.vm.shortLink).toEqual(SAMPLE_URL_HASH);
  });

  it('copy function', async () => {
    const spy = jest.spyOn(global.navigator.clipboard, 'writeText');

    wrapper.vm.link = SAMPLE_URL
    wrapper.vm.makeLinkShort();
    wrapper.vm.copyShortUrl();

    expect(wrapper.vm.link).toBe('')
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenLastCalledWith(SAMPLE_URL_HASH)
    
  });
});
