import ModalColumnData from "./ModalColumnData";
import ModalColumnDataGroup from "./ModalColumnDataGroup";
import ModalColumnDataMap from "./ModalColumnDataMap";
import EmberColumnData from "ember-column-data";
import EmberObjectUtils from "ember-object-utils";
import ModalComponentTypesMap from "./modal-component-types-map";

EmberColumnData.ColumnData.reopen({
  modal : EmberObjectUtils.belongsTo(ModalColumnDataMap, "moduleType", "header"),
});

EmberColumnData.ColumnDataGroup.reopen({
  modal : EmberObjectUtils.belongsTo(ModalColumnDataGroup),
});

export default {
  ModalColumnData,
  ModalColumnDataGroup,
  ModalColumnDataMap,
  ModalComponentTypesMap,
};
