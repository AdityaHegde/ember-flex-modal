import Ember from "ember";
import layout from "../templates/components/modal-header";
import EmberColumnData from "ember-column-data";

export default Ember.Component.extend(EmberColumnData.ColumnDataValueMixin, {
  layout : layout,

  classNames : ["modal-header"],
});
