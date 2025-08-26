import Component from "@glimmer/component";
import { action } from "@ember/object";
import { getOwner } from "@ember/application";

export default class MobileJumpDownButton extends Component {
  @action
  jumpEnd(event) {
    const topicController = getOwner(this).lookup("controller:topic");
    topicController?.send("jumpEnd", event);
  }
}
