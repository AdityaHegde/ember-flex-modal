/* jshint ignore:start */
define([
  "ember",
  "ember_test_utils",
  "source/modal/Modal",
], function(Ember, EmberTests, Modal) {

return function() {

EmberTests.TestCase.EmberTestSuit.create({
  suitName : "ModalWindowView",
  moduleFunction : "moduleFor",
  param : "view:modal/modalWindow",
  moduleOpts : {
    setup : function() {
      TestApp.advanceReadiness();
    },
    teardown : function() {
    },
    needs : [
      "view:modal/modalTitle",
      "view:modal/modalBody",
      "view:modal/modalFormBody",
      "view:modal/modalFooter",
      "view:globalModules/displayText",
      "view:alerts/alert-message",
    ],
  },

  testCases : [{
    title : "Sanity Test",
    type : "baseTestCase",
    testData : {},
    testBlocks : [
      ["baseTestBlock", [
        ["assignValues", [
          //"type", "path", "putPath", "value", "param", "valuePath"
          ["base", "", "record", Ember.Object.create({title : "Title Test"})],
        ]],
        ["initModalWindow"],
      ]],
      ["baseTestBlock", [
        ["showModalWindow"],
      ]],
      ["baseTestBlock", [
        ["loadElementFromModal"],
        ["clickElement", ".ok-btn"],
      ]],
      ["baseTestBlock", [
        ["clickElement", ".cancel-btn"],
      ]],
      ["checkValues", [
        //"type", "path", "value", "message"
        ["base", "actionContext.okPressed",     true, "onOk callback was passed with right context"    ],
        ["base", "actionContext.cancelPressed", true, "onCancel callback was passed with right context"],
      ]],
      ["checkTextFromElement", ".modal-title", "Title Test",   "Title is as expected"              ],
      ["checkTextFromElement", ".ok-btn",      "Ok Label",     "Ok button label is as expected"    ],
      ["checkTextFromElement", ".cancel-btn",  "Cancel Label", "Cancel button label is as expected"],
    ]
  }, {
    title : "Close on ok",
    type : "baseTestCase",
    testData : {},
    testBlocks : [
      ["baseTestBlock", [
        ["assignValues", [
          //"type", "path", "putPath", "value", "param", "valuePath"
          ["base", "", "record", Ember.Object.create({title : "Title Test"})],
        ]],
        ["initModalWindow"],
        ["assignValues", [
          //"type", "path", "putPath", "value", "param", "valuePath"
          ["base", "modal", "onOk", function() {
            Modal.ModalWindowView.showModalWindow("#"+this.get("modal.elementId"), 1);
            this.set("okPressed", true);
          }],
          ["base", "", "record", Ember.Object.create({title : "Title Test"})],
        ]],
      ]],
      ["baseTestBlock", [
        ["showModalWindow"],
      ]],
      ["baseTestBlock", [
        ["loadElementFromModal"],
        ["clickElement", ".ok-btn"],
        ["clickElement", ".cancel-btn"],
      ]],
      ["checkValues", [
        //"type", "path", "value", "message"
        ["base", "actionContext.okPressed",     true,      "onOk callback was passed with right context"],
        ["base", "actionContext.cancelPressed", undefined, "onCancel was not called"                    ],
      ]],
      ["checkTextFromElement", ".modal-title", "Title Test",   "Title is as expected"              ],
      ["checkTextFromElement", ".ok-btn",      "Ok Label",     "Ok button label is as expected"    ],
      ["checkTextFromElement", ".cancel-btn",  "Cancel Label", "Cancel button label is as expected"],
    ]
  }],
});

};

});
/* jshint ignore:end */
