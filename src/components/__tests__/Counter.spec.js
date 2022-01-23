import { createLocalVue, shallowMount } from "@vue/test-utils";
import Counter from "@/components/Counter";
import store from "../../store";
import flushPromises from "flush-promises";

function mountComponentConfig() {
  const localVue = createLocalVue();

  return {
    localVue,
    mocks: {
      $store: store,
    },
  };
}

describe("Counter.vue", () => {
  test("Sanity check for test environment", () => {
    expect(true).toBeTruthy();
  });

  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(Counter, mountComponentConfig());
  });

  describe("exist checks", () => {
    // 1 - Component Exist Check
    test("counter component exist", () => {
      expect(wrapper.exists()).toBeTruthy();
    });

    // 2 - Increase button exist check
    test("increase button exist", () => {
      const increaseButton = wrapper.find("#increase-button");
      expect(increaseButton.exists()).toBeTruthy();
    });

    // 3 - Decrease button exist check
    test("decrease button exist", () => {
      const decreaseButton = wrapper.find("#decrease-button");
      expect(decreaseButton.exists()).toBeTruthy();
    });
  });

  describe("functionality checks", () => {
    // 4 - Increase button functionality check
    test("increase button functionality", async () => {
      const increaseButton = wrapper.find("#increase-button");
      await increaseButton.trigger("click");

      await flushPromises();

      const countElement = wrapper.find("#count");
      expect(countElement.text()).toStrictEqual("1k");
    });

    // 5 - Decrease button functionality check
    test("decrease button functionality", async () => {
      const decreaseButton = wrapper.find("#decrease-button");
      await decreaseButton.trigger("click");

      await flushPromises();

      const countElement = wrapper.find("#count");
      expect(countElement.text()).toStrictEqual("0k");
    });

    // 6 - 2 increase + decrease functionality check together
    test("2-increase 1-decrease functionality check together", async () => {
      const increaseButton = wrapper.find("#increase-button");
      const decreaseButton = wrapper.find("#decrease-button");

      await increaseButton.trigger("click");
      await increaseButton.trigger("click");
      await decreaseButton.trigger("click");

      await flushPromises();

      const countElement = wrapper.find("#count");
      expect(countElement.text()).toStrictEqual("1k");
    });

    // 7 - Count text show check
    test("count text show check", () => {
      const countElement = wrapper.find("#count");
      expect(typeof countElement.text()).toBe("string");
    });
  });
});
