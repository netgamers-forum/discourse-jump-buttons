import Component from "@glimmer/component";
import { action } from "@ember/object";
import { getOwner } from "@ember/application";

export default class FooterJumpButton extends Component {
  @action
  jumpTop(event) {
    const topicController = getOwner(this).lookup("controller:topic");
    topicController?.send("jumpTop", event);
  }
}