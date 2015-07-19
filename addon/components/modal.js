import Ember from "ember";
import layout from "../templates/components/modal";

export default Ember.Component.extend({
  layout : layout,

  classNames : ["modal"],
  classNameBindings : ["animate:fade"],

  /**
   * Animate modal open/close.
   *
   * @property animate
   * @type Boolean
   * @default true
   */
  animate : true,

  attributeBindings : ["titleId:aria-labelledby", "role", "zIndex:data-zindex", "backdrop:data-backdrop"],

  titleId : Ember.computed("elementId", {
    get : function() {
      return this.get("elementId")+"-title";
    },
  }),

  role : "dialog",

  loaded : true,

  /**
   * Z-index of the modal window. Use this to handle stacks of modal windows.
   *
   * @property zIndex
   * @type Number
   * @default 1000
   */
  zIndex : 1000,

  /**
   * Show a dark backdrop or not.
   *
   * @property backdrop
   * @type String
   * @default "true"
   */
  backdrop : "true",

  /**
   * Width of the modal window.
   *
   * @property width
   * @type String
   * @default "600px"
   */
  width : "600px",

  /**
   * Callback called when ok is pressed.
   *
   * @method onOk
   */
  onOk : null,

  /**
   * Callback called when cancel is pressed.
   *
   * @method onCancel
   */
  onCancel : null,

  /**
   * Context to use when calling ok/cancel callbacks
   *
   * @property actionContext
   * @default {Modal}
   */
  actionContext : null,

  showHidePromise : null,
  showHideResolve : null,
  showHideReject : null,
  createShowHidePromise : function() {
    var that = this,
    promise = new Ember.RSVP.Promise(function(resolve, reject) {
      that.setProperties({
        showHideResolve : resolve,
        showHideReject : reject,
      });
    });
    this.set("showHidePromise", promise);
    if(Ember.testing) {
      Ember.Test.lastPromise = promise;
    }
    return promise;
  },
  showModalWindow : function(hide) {
    var ele = this.$(),
    promise = this.createShowHidePromise();
    ele.modal(hide ? "hide" : null);
    return promise;
  },
  didInsertElement : function() {
    var onCancel = this.get("onCancel"), context = this.get("actionContext") || this,
        that = this, element = $(this.get("element"));
    element.on("show.bs.modal", function(/*e*/) {
      Ember.run(function() {
        if(!that.get("showHideResolve")) {
          that.createShowHidePromise();
        }
      });
    });
    element.on("shown.bs.modal", function(/*e*/) {
      Ember.run(function() {
        if(that.get("showHideResolve")) {
          var resolve = that.get("showHideResolve");
          that.set("showHideResolve", null);
          resolve();
        }
        that.postShowHook();
      });
    });
    element.on("hide.bs.modal", function(/*e*/) {
      Ember.run(function() {
        if(!that.get("showHideResolve")) {
          that.createShowHidePromise();
        }
        if(!that.get("fromButton") && onCancel) {
          onCancel.call(context);
        }
        that.set("fromButton", false);
      });
    });
    element.on("hidden.bs.modal", function(/*e*/) {
      Ember.run(function() {
        if(that.get("showHideResolve")) {
          var resolve = that.get("showHideResolve");
          that.set("showHideResolve", null);
          resolve();
        }
        that.postHideHook();
      });
    });
  },

  actions : {
    okClicked : function() {
      var onOk = this.get("onOk");
      this.set("fromButton", true);
      if(onOk) {
        onOk.call(this.get("actionContext") || this);
      }
      this.set("fromButton", false);
    },

    cancelClicked : function() {
      //var onCancel = this.get("onCancel");
    },
  },

  /**
   * Callback called after the modal window is shown.
   *
   * @method postShowHook
   */
  postShowHook : function() {
  },

  /**
   * Callback called after the modal window is hidden.
   *
   * @method postHideHook
   */
  postHideHook : function() {
  },
});
