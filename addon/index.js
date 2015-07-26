/**
 * A module for a modal.
 *
 * @module ember-modal
 */

import Ember from "ember";
import ModalColumnData from "./column-data/index";

var
EmberFlexModal = Ember.Namespace.create(),
modalModules = [ModalColumnData];
window.EmberFlexModal = EmberFlexModal;

for(var i = 0; i < modalModules.length; i++) {
  for(var k in modalModules[i]) {
    if(modalModules[i].hasOwnProperty(k)) {
      EmberFlexModal[k] = modalModules[i][k];
    }
  }
}

export default EmberFlexModal;
