import { withPluginApi } from "discourse/lib/plugin-api";
import { getOwner } from "@ember/application";
import settings from "discourse/lib/theme-settings";
import hbs from "htmlbars-inline-precompile";

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

  initialize() {
    console.log("settings:", settings);

    withPluginApi("1.20.0", (api) => {
      // Desktop buttons in timeline
      if (settings.timeline_buttons_enabled) {
        console.log("Montaggio pulsanti desktop nella timeline");
        api.decoratePluginOutlet("topic-above-post-stream", () => {
          return [
            hbs`<JumpUpButton />`,
            hbs`<JumpDownButton />`
          ];
        });
      }

      // Mobile buttons in nav
      if (settings.mobile_buttons_enabled) {
        console.log("Montaggio pulsanti mobile nella nav");
        api.decoratePluginOutlet("mobile-nav", () => {
          return [
            hbs`<MobileJumpUpButton />`,
            hbs`<MobileJumpDownButton />`
          ];
        });
      }

      // Footer button
      if (settings.jump_button_enabled) {
        console.log("Registrazione pulsante footer avviata");

        api.registerTopicFooterButton({
          id: "discourse-jump-button",
          icon: "arrow-up",
          priority: 0,
          translatedLabel() {
            return settings.jump_button_label || "Jump";
          },
          translatedTitle() {
            return settings.jump_button_title || "Jump to top";
          },
          action() {
            const topicController = getOwner(this).lookup("controller:topic");
            topicController?.send("jumpTop", createFakeEvent());
          },
          classNames: ["discourse-jump-button"],
        });
      }
    });
  }
};
