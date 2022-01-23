import { createLocalVue, shallowMount } from "@vue/test-utils";
import App from "@/views/App";
import { mutations, actions } from "../../store";

function mountComponentConfig(count) {
  const localVue = createLocalVue();

  return {
    localVue,
    mocks: {
      $store: {
        state: {
          count: count,
        },
        getters: {
          getCount: count,
        },
        mutations,
        actions,
        modules: {},
      },
    },
  };
}

describe("App.vue", () => {
  test("Sanity check for test environment", () => {
    expect(true).toBeTruthy();
  });

  describe("exist checks", () => {
    // 1 - h1 exists
    test("h1 exists", () => {
      let wrapper = shallowMount(App, mountComponentConfig(1));
      const title = wrapper.find("#title");
      expect(title.exists()).toBeTruthy();
    });

    // 2 - h1 text equals to `Daily Corona Cases in Turkey` check
    test("h1 text equals to `Daily Corona Cases in Turkey` check", () => {
      let wrapper = shallowMount(App, mountComponentConfig(1));
      const title = wrapper.find("#title");
      expect(title.text()).toStrictEqual("Daily Corona Cases in Turkey");
    });
  });

  describe("functionality checks", () => {
    // 3 - notificationArea class check based on `getCount` value - SAFE
    test("notificationArea SAFE class check based on `getCount` value", () => {
      let wrapper = shallowMount(App, mountComponentConfig(1));
      const notificationArea = wrapper.find(".notificationArea");
      expect(notificationArea.classes()).toContain("safe");
    });

    // 4 - notificationArea text message check - SAFE
    test("notificationArea text message check (SAFE)", () => {
      let count = 1;
      let wrapper = shallowMount(App, mountComponentConfig(count));
      const notificationArea = wrapper.find(".notificationArea");
      expect(notificationArea.text()).toStrictEqual(
        `So safe. Case count is ${count}k`
      );
    });

    // 5 - notificationArea class check based on `getCount` value - NORMAL
    test("notificationArea NORMAL class check based on `getCount` value", () => {
      let wrapper = shallowMount(App, mountComponentConfig(6));
      const notificationArea = wrapper.find(".notificationArea");
      expect(notificationArea.classes()).toContain("normal");
    });

    // 6 - notificationArea text message check - NORMAL
    test("notificationArea text message check (NORMAL)", () => {
      let count = 6;
      let wrapper = shallowMount(App, mountComponentConfig(count));
      const notificationArea = wrapper.find(".notificationArea");
      expect(notificationArea.text()).toStrictEqual(
        `Life is normal. Case count is ${count}k`
      );
    });

    // 7 - notificationArea class check based on `getCount` value - DANGER
    test("notificationArea DANGER class check based on `getCount` value", () => {
      let wrapper = shallowMount(App, mountComponentConfig(11));
      const notificationArea = wrapper.find(".notificationArea");
      expect(notificationArea.classes()).toContain("danger");
    });

    // 8 - notificationArea text message check - DANGER
    test("notificationArea text message check (DANGER)", () => {
      let count = 11;
      let wrapper = shallowMount(App, mountComponentConfig(count));
      const notificationArea = wrapper.find(".notificationArea");
      expect(notificationArea.text()).toStrictEqual(
        `Danger!!! Case count is ${count}k`
      );
    });
  });
});
