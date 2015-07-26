/* jshint ignore:start */
define([
  "ember",
  "ember_data",
  "ember_utils_core",
  "ember_test_utils",
  "source/column-data/ColumnDataMod",
  "source/modal/Modal",
], function(Ember, DS, Utils, EmberTests, ColumnDataMod, Modal) {

EmberTests.TestCase.addToTestHierarchy("initModalWindow", EmberTests.TestCase.TestOperation.extend({
  run : function(testData) {
    var 
    actionContext = Ember.Object.create({ok : false, cancel : false}),
    columnDataGroup = ColumnDataMod.ColumnDataGroup.create({
      name : "modalTest",
      columns : [{
        name : "title",
        label : "Title",
        modal : {
          moduleType : "title",
          viewType : "modalTitle",
        },
      }, {
        name : "body",
        label : "Body",
        modal : {
          moduleType : "body",
          viewType : "modalBody",
        },
      }, {
        name : "footer",
        label : "Footer",
        modal : {
          moduleType : "footer",
          viewType : "modalFooter",
          okLabel : "Ok Label",
          cancelLabel : "Cancel Label",
        },
      }],
      modal : {},
    }),
    modal = testData.get("testContext").subject({
      record : testData.get("record"),
      columnDataGroup : columnDataGroup,
      onOk : function() {
        this.set("okPressed", true);
      },
      onCancel : function() {
        this.set("cancelPressed", true);
      },
      actionContext : actionContext,
    });
    modal.appendTo("#ember-testing");
    testData.set("columnDataGroup", columnDataGroup);
    testData.set("modal", modal);
    actionContext.set("modal", modal);
    testData.set("actionContext", actionContext);
  },
}), "to");
EmberTests.TestCase.addToTestHierarchy("initFormModalWindow", EmberTests.TestCase.TestOperation.extend({
  run : function(testData) {
    var 
    actionContext = Ember.Object.create({ok : false, cancel : false}),
    columnDataGroup = ColumnDataMod.ColumnDataGroup.create({
      name : "modalFormTest",
      columns : [{
        name : "title",
        label : "Title",
        modal : {
          moduleType : "title",
          viewType : "modalTitle",
        },
      }, {
        name : "rec",
        label : "Body",
        modal : {
          moduleType : "body",
          viewType : "modalFormBody",
        },
        childColGroup : {
          name : "innerForm",
          form : {},
          columns : [{
            name : "vara",
            label : "Vara",
            form : {
              moduleType : "textInput",
            },
          }, {
            name : "varb",
            label : "Varb",
            form : {
              moduleType : "textInput",
            },
          }],
        },
      }, {
        name : "footer",
        label : "Footer",
        modal : {
          moduleType : "footer",
          viewType : "modalFooter",
          okLabel : "Ok Label",
          cancelLabel : "Cancel Label",
        },
      }],
      modal : {
        bodyType : "modalFormBody",
      },
    }),
    modal = testData.get("testContext").subject({
      record : testData.get("record"),
      columnDataGroup : columnDataGroup,
      saveSuccessCallback : function(record, message, title) {
        this.set("saveSuccessCallback", true);
        this.set("saveSuccessCallbackRecord", record);
        this.set("saveSuccessCallbackMessage", message);
        this.set("saveSuccessCallbackTitle", title);
        this.set("modal.operationStatus", "");
      },
      closeOnFailure : true,
      saveFailureCallback : function(record, message, title) {
        this.set("saveFailureCallback", true);
        this.set("saveFailureCallbackRecord", record);
        this.set("saveFailureCallbackMessage", message);
        this.set("saveFailureCallbackTitle", title);
        this.set("modal.operationStatus", "");
      },
      postCancelCallback : function() {
        this.set("saveCancelCallback", true);
      },
      callbackContext : actionContext,
    });
    modal.appendTo("#ember-testing");
    testData.set("modal", modal);
    testData.set("columnDataGroup", columnDataGroup);
    actionContext.set("modal", modal);
    testData.set("actionContext", actionContext);
  },
}), "to");
EmberTests.TestCase.addToTestHierarchy("showModalWindow", EmberTests.TestCase.AsyncOperation.extend({
  asyncRun : function(testData) {
    var that = this, p;
    Ember.run(function() {
      p = Modal.ModalWindowView.showModalWindow("#"+testData.get("modal.elementId"), that.get("attr1"));
    });
    Ember.Test.lastPromise = p;
    //return wait();
    return p;
  },
}), "to");
EmberTests.TestCase.addToTestHierarchy("loadElementFromModal", EmberTests.TestCase.TestOperation.extend({
  run : function(testData) {
    testData.set("element", $(testData.get("modal.element")));
  },
}), "to");
EmberTests.TestCase.addToTestHierarchy("checkTextFromElement", EmberTests.TestCase.TestOperation.extend({
  run : function(testData) {
    var element = testData.get("element");
    EmberTests.TestUtils.equal(element.find(this.get("attr1")).text(), this.get("attr2"), this.get("attr3"));
  },

  assertions : 1,
}), "to");
EmberTests.TestCase.addToTestHierarchy("clickElement", EmberTests.TestCase.AsyncOperation.extend({
  asyncRun : function(testData) {
    return click(testData.get("element").find(this.get("attr1")));
  },
}), "to");

});
/* jshint ignore:end */
