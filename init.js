import { withPluginApi } from "discourse/lib/plugin-api";

function createFakeEvent() {
  return {
    defaultPrevented: false,
    shiftKey: false,
    metaKey: false,
    ctrlKey: false,
    button: 0,
    currentTarget: { target: "_self" },
    preventDefault() {}
  };
}

export default {
  name: "discourse-jump-buttons",

  initialize(container) {
    withPluginApi("1.20.0", (api) => {
      if (settings.timeline_buttons_enabled) {
        api.decoratePluginOutlet("topic-above-post-stream", () => {
          return [
            hbs`<JumpUpButton />`,
            hbs`<JumpDownButton />`
          ];
        });
      }

      if (settings.mobile_buttons_enabled) {
        api.decoratePluginOutlet("mobile-nav", () => {
          return [
            hbs`<MobileJumpUpButton />`,
            hbs`<MobileJumpDownButton />`
          ];
        });
      }

      if (settings.jump_button_enabled) {
        api.registerTopicFooterButton({
          id: "discourse-jump-button",
          icon: "arrow-up",
          priority: 0,
          translatedLabel() {
            return settings.jump_button_label;
          },
          translatedTitle() {
            return settings.jump_button_title;
          },
          action() {
            const topicController = container.lookup("controller:topic");
            topicController?.send("jumpTop", createFakeEvent());
          },
          classNames: ["discourse-jump-button"],
        });
      }
    });
  }
};
