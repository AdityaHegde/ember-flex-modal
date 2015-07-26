import EmberColumnData from "ember-column-data";
import Ember from "ember";
import ModalComponentTypesMap from "./modal-component-types-map";

export default Ember.Object.extend(EmberColumnData.ColumnDataGroupModuleMixin, {
  type : "modal",

  lookupMap : ModalComponentTypesMap,

  modules : ["header", "body", "footer"],

  header : "header",
  body   : "body",
  footer : "footer",
});
