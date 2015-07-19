import Ember from "ember";
import layout from "../templates/components/modal-footer";

export default Ember.Component.extend({
  layout : layout,

  classNames : ["modal-footer"],

  actions : {
    okClicked : function() {
      this.get("modal").send("okClicked");
    },

    cancelClicked : function() {
      this.get("modal").send("cancelClicked");
    },
  },
});
