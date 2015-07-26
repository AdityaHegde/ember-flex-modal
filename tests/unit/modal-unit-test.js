import Ember from "ember";
import { moduleForComponent, test } from "ember-qunit";
import startApp from "../helpers/start-app";
import EmberColumnData from "ember-column-data";
/* jshint ignore:start */
import EmberFlexModal from "ember-flex-modal";
/* jshint ignore:end */

moduleForComponent("ember-flex-modal", "ModalWindow", {
  beforeEach : function(assert) {
    assert.application = startApp();
  },
  afterEach : function(assert) {
    Ember.run(assert.application, 'destroy');
  },

  needs : [
    "component:ember-flex-modal-header",
    "component:ember-flex-modal-body",
    "component:ember-flex-modal-footer",
  ],
});

test("Sanity Test", function(assert) {
  var actionContext = {ok : false, cancel : false},
  columnDataGroup = EmberColumnData.ColumnDataGroup.create({
    name : "modalTest",
    columns : [{
      name : "header",
      modal : {
        moduleType : "header",
      },
    }, {
      name : "body",
      modal : {
        moduleType : "body",
      },
    }, {
      name : "footer",
      modal : {
        moduleType : "footer",
        showOk : true,
        okLabel : "Ok Label",
        showCancel : true,
        cancelLabel : "Cancel Label",
      },
    }],
    modal : {},
  }),
  modal = this.subject({
    record : Ember.Object.create({header : "Modal Header", body : "Modal Body"}),
    columnDataGroup : columnDataGroup,
    onOk : function() {
      this.ok = true;
      modal.set("fromButton", false);
    },
    onCancel : function() {
      this.cancel = true;
    },
    actionContext : actionContext,
  });
  Ember.run(function() {
    modal.appendTo("#ember-testing");
  });
  wait();
  andThen(function() {
    $(modal.$()).modal();
    //Modal.ModalWindowView.showModalWindow("#" + modal.$().attr("id"));
  });
  wait();
  andThen(function() {
    click($(modal.get("element")).find(".ok-btn"));
    click($(modal.get("element")).find(".cancel-btn"));
  });
  wait();
  andThen(function() {
    var element = $(modal.get("element"));
    assert.ok(actionContext.ok, "Ok callback called and context was passed");
    assert.ok(actionContext.cancel, "Cancel callback called and context was passed");
    assert.equal(element.find(".modal-title").text().trim(), "Modal Header");
    assert.equal(element.find(".modal-body").text().trim(), "Modal Body");
    assert.equal(element.find(".ok-btn").text().trim(), "Ok Label");
    assert.equal(element.find(".cancel-btn").text().trim(), "Cancel Label");
    modal.destroy();
  });
});
