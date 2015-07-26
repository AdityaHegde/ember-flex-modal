import Ember from "ember";
import EmberColumnData from "ember-column-data";
import layout from "../templates/components/modal-body";

export default Ember.Component.extend(EmberColumnData.ColumnDataValueMixin, {
  classNames : ["modal-body"],
  layout : layout,
});
