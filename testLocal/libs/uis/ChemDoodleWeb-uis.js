//
// ChemDoodle Web Components 7.0.2
//
// http://web.chemdoodle.com
//
// Copyright 2009-2015 iChemLabs, LLC.  All rights reserved.
//
// The ChemDoodle Web Components library is licensed under version 3
// of the GNU GENERAL PUBLIC LICENSE.
//
// You may redistribute it and/or modify it under the terms of the
// GNU General Public License as published by the Free Software Foundation,
// either version 3 of the License, or (at your option) any later version.
//
// As an exception to the GPL, you may distribute this packed form of
// the code without the copy of the GPL license normally required,
// provided you include this license notice and a URL through which
// recipients can access the corresponding unpacked source code. 
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// Please contact iChemLabs <http://www.ichemlabs.com/contact-us> for
// alternate licensing options.
//
(function(a) {
    var g = a,
        l = function(b, f) {
            var a, c;
            a = b.nodeName.toLowerCase();
            if ("area" === a) {
                a = b.parentNode;
                c = a.name;
                if (!b.href || !c || "map" !== a.nodeName.toLowerCase()) return !1;
                a = g("img[usemap\x3d#" + c + "]")[0];
                return !!a && k(a)
            }
            return (/input|select|textarea|button|object/.test(a) ? !b.disabled : "a" === a ? b.href || f : f) && k(b)
        },
        k = function(b) {
            return g.expr.filters.visible(b) && !g(b).parents().addBack().filter(function() {
                return "hidden" === g.css(this, "visibility")
            }).length
        },
        d = 0,
        e = /^ui-id-\d+$/;
    g.ui = g.ui || {};
    g.extend(g.ui, {
        version: "1.10.3",
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        }
    });
    g.fn.extend({
        focus: function(b) {
            return function(f, a) {
                return "number" === typeof f ? this.each(function() {
                    var b = this;
                    setTimeout(function() {
                        g(b).focus();
                        a && a.call(b)
                    }, f)
                }) : b.apply(this, arguments)
            }
        }(g.fn.focus),
        scrollParent: function() {
            var b;
            b = g.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                return /(relative|absolute|fixed)/.test(g.css(this, "position")) && /(auto|scroll)/.test(g.css(this, "overflow") + g.css(this, "overflow-y") + g.css(this, "overflow-x"))
            }).eq(0) : this.parents().filter(function() {
                return /(auto|scroll)/.test(g.css(this, "overflow") + g.css(this, "overflow-y") + g.css(this, "overflow-x"))
            }).eq(0);
            return /fixed/.test(this.css("position")) || !b.length ? g(document) :
                b
        },
        zIndex: function(b) {
            if (void 0 !== b) return this.css("zIndex", b);
            if (this.length) {
                b = g(this[0]);
                for (var f; b.length && b[0] !== document;) {
                    f = b.css("position");
                    if ("absolute" === f || "relative" === f || "fixed" === f)
                        if (f = parseInt(b.css("zIndex"), 10), !isNaN(f) && 0 !== f) return f;
                    b = b.parent()
                }
            }
            return 0
        },
        uniqueId: function() {
            return this.each(function() {
                this.id || (this.id = "ui-id-" + ++d)
            })
        },
        removeUniqueId: function() {
            return this.each(function() {
                e.test(this.id) && g(this).removeAttr("id")
            })
        }
    });
    g.extend(g.expr[":"], {
        data: g.expr.createPseudo ?
            g.expr.createPseudo(function(b) {
                return function(f) {
                    return !!g.data(f, b)
                }
            }) : function(b, f, a) {
                return !!g.data(b, a[3])
            },
        focusable: function(b) {
            return l(b, !isNaN(g.attr(b, "tabindex")))
        },
        tabbable: function(b) {
            var f = g.attr(b, "tabindex"),
                a = isNaN(f);
            return (a || 0 <= f) && l(b, !a)
        }
    });
    g("\x3ca\x3e").outerWidth(1).jquery || g.each(["Width", "Height"], function(b, f) {
        function a(b, f, m, d) {
            g.each(c, function() {
                f -= parseFloat(g.css(b, "padding" + this)) || 0;
                m && (f -= parseFloat(g.css(b, "border" + this + "Width")) || 0);
                d && (f -= parseFloat(g.css(b,
                    "margin" + this)) || 0)
            });
            return f
        }
        var c = "Width" === f ? ["Left", "Right"] : ["Top", "Bottom"],
            d = f.toLowerCase(),
            e = {
                innerWidth: g.fn.innerWidth,
                innerHeight: g.fn.innerHeight,
                outerWidth: g.fn.outerWidth,
                outerHeight: g.fn.outerHeight
            };
        g.fn["inner" + f] = function(b) {
            return void 0 === b ? e["inner" + f].call(this) : this.each(function() {
                g(this).css(d, a(this, b) + "px")
            })
        };
        g.fn["outer" + f] = function(b, c) {
            return "number" !== typeof b ? e["outer" + f].call(this, b) : this.each(function() {
                g(this).css(d, a(this, b, !0, c) + "px")
            })
        }
    });
    g.fn.addBack || (g.fn.addBack =
        function(b) {
            return this.add(null == b ? this.prevObject : this.prevObject.filter(b))
        });
    if (g("\x3ca\x3e").data("a-b", "a").removeData("a-b").data("a-b")) {
        var j = g.fn.removeData;
        g.fn.removeData = function(b) {
            return arguments.length ? j.call(this, g.camelCase(b)) : j.call(this)
        }
    }
    g.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase());
    g.support.selectstart = "onselectstart" in document.createElement("div");
    g.fn.extend({
        disableSelection: function() {
            return this.bind((g.support.selectstart ? "selectstart" : "mousedown") +
                ".ui-disableSelection",
                function(b) {
                    b.preventDefault()
                })
        },
        enableSelection: function() {
            return this.unbind(".ui-disableSelection")
        }
    });
    g.extend(g.ui, {
        plugin: {
            add: function(b, f, a) {
                var c;
                b = g.ui[b].prototype;
                for (c in a) b.plugins[c] = b.plugins[c] || [], b.plugins[c].push([f, a[c]])
            },
            call: function(b, f, a) {
                var c = b.plugins[f];
                if (c && b.element[0].parentNode && 11 !== b.element[0].parentNode.nodeType)
                    for (f = 0; f < c.length; f++) b.options[c[f][0]] && c[f][1].apply(b.element, a)
            }
        },
        hasScroll: function(b, f) {
            if ("hidden" === g(b).css("overflow")) return !1;
            var a = f && "left" === f ? "scrollLeft" : "scrollTop",
                c = !1;
            if (0 < b[a]) return !0;
            b[a] = 1;
            c = 0 < b[a];
            b[a] = 0;
            return c
        }
    });
    var i = a,
        p = 0,
        h = Array.prototype.slice,
        n = i.cleanData;
    i.cleanData = function(b) {
        for (var f = 0, a; null != (a = b[f]); f++) try {
            i(a).triggerHandler("remove")
        } catch (c) {}
        n(b)
    };
    i.widget = function(b, f, a) {
        var c, d, e, h, j = {},
            g = b.split(".")[0];
        b = b.split(".")[1];
        c = g + "-" + b;
        a || (a = f, f = i.Widget);
        i.expr[":"][c.toLowerCase()] = function(b) {
            return !!i.data(b, c)
        };
        i[g] = i[g] || {};
        d = i[g][b];
        e = i[g][b] = function(b, f) {
            if (!this._createWidget) return new e(b,
                f);
            arguments.length && this._createWidget(b, f)
        };
        i.extend(e, d, {
            version: a.version,
            _proto: i.extend({}, a),
            _childConstructors: []
        });
        h = new f;
        h.options = i.widget.extend({}, h.options);
        i.each(a, function(b, a) {
            var m;
            if (i.isFunction(a)) {
                var c = function() {
                        return f.prototype[b].apply(this, arguments)
                    },
                    d = function(a) {
                        return f.prototype[b].apply(this, a)
                    };
                m = function() {
                    var b = this._super,
                        f = this._superApply,
                        m;
                    this._super = c;
                    this._superApply = d;
                    m = a.apply(this, arguments);
                    this._super = b;
                    this._superApply = f;
                    return m
                }
            } else m = a;
            j[b] =
                m
        });
        e.prototype = i.widget.extend(h, {
            widgetEventPrefix: d ? h.widgetEventPrefix : b
        }, j, {
            constructor: e,
            namespace: g,
            widgetName: b,
            widgetFullName: c
        });
        d ? (i.each(d._childConstructors, function(b, f) {
            var a = f.prototype;
            i.widget(a.namespace + "." + a.widgetName, e, f._proto)
        }), delete d._childConstructors) : f._childConstructors.push(e);
        i.widget.bridge(b, e)
    };
    i.widget.extend = function(b) {
        for (var f = h.call(arguments, 1), a = 0, c = f.length, d, e; a < c; a++)
            for (d in f[a]) e = f[a][d], f[a].hasOwnProperty(d) && void 0 !== e && (b[d] = i.isPlainObject(e) ?
                i.isPlainObject(b[d]) ? i.widget.extend({}, b[d], e) : i.widget.extend({}, e) : e);
        return b
    };
    i.widget.bridge = function(b, f) {
        var a = f.prototype.widgetFullName || b;
        i.fn[b] = function(c) {
            var d = "string" === typeof c,
                e = h.call(arguments, 1),
                j = this;
            c = !d && e.length ? i.widget.extend.apply(null, [c].concat(e)) : c;
            d ? this.each(function() {
                var f, d = i.data(this, a);
                if (!d) return i.error("cannot call methods on " + b + " prior to initialization; attempted to call method '" + c + "'");
                if (!i.isFunction(d[c]) || "_" === c.charAt(0)) return i.error("no such method '" +
                    c + "' for " + b + " widget instance");
                f = d[c].apply(d, e);
                if (f !== d && void 0 !== f) return j = f && f.jquery ? j.pushStack(f.get()) : f, !1
            }) : this.each(function() {
                var b = i.data(this, a);
                b ? b.option(c || {})._init() : i.data(this, a, new f(c, this))
            });
            return j
        }
    };
    i.Widget = function() {};
    i.Widget._childConstructors = [];
    i.Widget.prototype = {
        widgetName: "widget",
        widgetEventPrefix: "",
        defaultElement: "\x3cdiv\x3e",
        options: {
            disabled: !1,
            create: null
        },
        _createWidget: function(b, f) {
            f = i(f || this.defaultElement || this)[0];
            this.element = i(f);
            this.uuid =
                p++;
            this.eventNamespace = "." + this.widgetName + this.uuid;
            this.options = i.widget.extend({}, this.options, this._getCreateOptions(), b);
            this.bindings = i();
            this.hoverable = i();
            this.focusable = i();
            f !== this && (i.data(f, this.widgetFullName, this), this._on(!0, this.element, {
                remove: function(b) {
                    b.target === f && this.destroy()
                }
            }), this.document = i(f.style ? f.ownerDocument : f.document || f), this.window = i(this.document[0].defaultView || this.document[0].parentWindow));
            this._create();
            this._trigger("create", null, this._getCreateEventData());
            this._init()
        },
        _getCreateOptions: i.noop,
        _getCreateEventData: i.noop,
        _create: i.noop,
        _init: i.noop,
        destroy: function() {
            this._destroy();
            this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(i.camelCase(this.widgetFullName));
            this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled");
            this.bindings.unbind(this.eventNamespace);
            this.hoverable.removeClass("ui-state-hover");
            this.focusable.removeClass("ui-state-focus")
        },
        _destroy: i.noop,
        widget: function() {
            return this.element
        },
        option: function(b, f) {
            var a = b,
                c, d, e;
            if (0 === arguments.length) return i.widget.extend({}, this.options);
            if ("string" === typeof b)
                if (a = {}, c = b.split("."), b = c.shift(), c.length) {
                    d = a[b] = i.widget.extend({}, this.options[b]);
                    for (e = 0; e < c.length - 1; e++) d[c[e]] = d[c[e]] || {}, d = d[c[e]];
                    b = c.pop();
                    if (void 0 === f) return void 0 === d[b] ? null : d[b];
                    d[b] = f
                } else {
                    if (void 0 === f) return void 0 === this.options[b] ? null : this.options[b];
                    a[b] = f
                }
            this._setOptions(a);
            return this
        },
        _setOptions: function(b) {
            for (var f in b) this._setOption(f,
                b[f]);
            return this
        },
        _setOption: function(b, f) {
            this.options[b] = f;
            "disabled" === b && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!f).attr("aria-disabled", f), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus"));
            return this
        },
        enable: function() {
            return this._setOption("disabled", !1)
        },
        disable: function() {
            return this._setOption("disabled", !0)
        },
        _on: function(b, f, a) {
            var c, d = this;
            "boolean" !== typeof b && (a = f, f = b, b = !1);
            a ? (f = c = i(f), this.bindings = this.bindings.add(f)) :
                (a = f, f = this.element, c = this.widget());
            i.each(a, function(a, m) {
                function e() {
                    if (b || !(!0 === d.options.disabled || i(this).hasClass("ui-state-disabled"))) return ("string" === typeof m ? d[m] : m).apply(d, arguments)
                }
                "string" !== typeof m && (e.guid = m.guid = m.guid || e.guid || i.guid++);
                var h = a.match(/^(\w+)\s*(.*)$/),
                    j = h[1] + d.eventNamespace;
                (h = h[2]) ? c.delegate(h, j, e): f.bind(j, e)
            })
        },
        _off: function(b, f) {
            f = (f || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace;
            b.unbind(f).undelegate(f)
        },
        _delay: function(b, f) {
            var a =
                this;
            return setTimeout(function() {
                return ("string" === typeof b ? a[b] : b).apply(a, arguments)
            }, f || 0)
        },
        _hoverable: function(b) {
            this.hoverable = this.hoverable.add(b);
            this._on(b, {
                mouseenter: function(b) {
                    i(b.currentTarget).addClass("ui-state-hover")
                },
                mouseleave: function(b) {
                    i(b.currentTarget).removeClass("ui-state-hover")
                }
            })
        },
        _focusable: function(b) {
            this.focusable = this.focusable.add(b);
            this._on(b, {
                focusin: function(b) {
                    i(b.currentTarget).addClass("ui-state-focus")
                },
                focusout: function(b) {
                    i(b.currentTarget).removeClass("ui-state-focus")
                }
            })
        },
        _trigger: function(b, f, a) {
            var c, d = this.options[b];
            a = a || {};
            f = i.Event(f);
            f.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase();
            f.target = this.element[0];
            if (b = f.originalEvent)
                for (c in b) c in f || (f[c] = b[c]);
            this.element.trigger(f, a);
            return !(i.isFunction(d) && !1 === d.apply(this.element[0], [f].concat(a)) || f.isDefaultPrevented())
        }
    };
    i.each({
        show: "fadeIn",
        hide: "fadeOut"
    }, function(b, f) {
        i.Widget.prototype["_" + b] = function(a, c, d) {
            "string" === typeof c && (c = {
                effect: c
            });
            var e, h = !c ? b : !0 === c || "number" ===
                typeof c ? f : c.effect || f;
            c = c || {};
            "number" === typeof c && (c = {
                duration: c
            });
            e = !i.isEmptyObject(c);
            c.complete = d;
            c.delay && a.delay(c.delay);
            if (e && i.effects && i.effects.effect[h]) a[b](c);
            else if (h !== b && a[h]) a[h](c.duration, c.easing, d);
            else a.queue(function(f) {
                i(this)[b]();
                d && d.call(a[0]);
                f()
            })
        }
    });
    var s = !1;
    a(document).mouseup(function() {
        s = !1
    });
    a.widget("ui.mouse", {
        version: "1.10.3",
        options: {
            cancel: "input,textarea,button,select,option",
            distance: 1,
            delay: 0
        },
        _mouseInit: function() {
            var b = this;
            this.element.bind("mousedown." +
                this.widgetName,
                function(f) {
                    return b._mouseDown(f)
                }).bind("click." + this.widgetName, function(f) {
                if (!0 === a.data(f.target, b.widgetName + ".preventClickEvent")) return a.removeData(f.target, b.widgetName + ".preventClickEvent"), f.stopImmediatePropagation(), !1
            });
            this.started = !1
        },
        _mouseDestroy: function() {
            this.element.unbind("." + this.widgetName);
            this._mouseMoveDelegate && a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
        },
        _mouseDown: function(b) {
            if (!s) {
                this._mouseStarted &&
                    this._mouseUp(b);
                this._mouseDownEvent = b;
                var f = this,
                    m = 1 === b.which,
                    c = "string" === typeof this.options.cancel && b.target.nodeName ? a(b.target).closest(this.options.cancel).length : !1;
                if (!m || c || !this._mouseCapture(b)) return !0;
                this.mouseDelayMet = !this.options.delay;
                this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                    f.mouseDelayMet = !0
                }, this.options.delay));
                if (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = !1 !== this._mouseStart(b), !this._mouseStarted)) return b.preventDefault(), !0;
                !0 === a.data(b.target, this.widgetName + ".preventClickEvent") && a.removeData(b.target, this.widgetName + ".preventClickEvent");
                this._mouseMoveDelegate = function(b) {
                    return f._mouseMove(b)
                };
                this._mouseUpDelegate = function(b) {
                    return f._mouseUp(b)
                };
                a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
                b.preventDefault();
                return s = !0
            }
        },
        _mouseMove: function(b) {
            if (a.ui.ie && (!document.documentMode || 9 > document.documentMode) && !b.button) return this._mouseUp(b);
            if (this._mouseStarted) return this._mouseDrag(b), b.preventDefault();
            this._mouseDistanceMet(b) && this._mouseDelayMet(b) && ((this._mouseStarted = !1 !== this._mouseStart(this._mouseDownEvent, b)) ? this._mouseDrag(b) : this._mouseUp(b));
            return !this._mouseStarted
        },
        _mouseUp: function(b) {
            a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
            this._mouseStarted && (this._mouseStarted = !1, b.target === this._mouseDownEvent.target && a.data(b.target, this.widgetName +
                ".preventClickEvent", !0), this._mouseStop(b));
            return !1
        },
        _mouseDistanceMet: function(b) {
            return Math.max(Math.abs(this._mouseDownEvent.pageX - b.pageX), Math.abs(this._mouseDownEvent.pageY - b.pageY)) >= this.options.distance
        },
        _mouseDelayMet: function() {
            return this.mouseDelayMet
        },
        _mouseStart: function() {},
        _mouseDrag: function() {},
        _mouseStop: function() {},
        _mouseCapture: function() {
            return !0
        }
    });
    var c = function(b, f, a) {
        return [parseFloat(b[0]) * (x.test(b[0]) ? f / 100 : 1), parseFloat(b[1]) * (x.test(b[1]) ? a / 100 : 1)]
    };
    a.ui = a.ui || {};
    var o, r = Math.max,
        q = Math.abs,
        u = Math.round,
        w = /left|center|right/,
        y = /top|center|bottom/,
        v = /[\+\-]\d+(\.[\d]+)?%?/,
        A = /^\w+/,
        x = /%$/,
        E = a.fn.position;
    a.position = {
        scrollbarWidth: function() {
            if (void 0 !== o) return o;
            var b, f, m = a("\x3cdiv style\x3d'display:block;width:50px;height:50px;overflow:hidden;'\x3e\x3cdiv style\x3d'height:100px;width:auto;'\x3e\x3c/div\x3e\x3c/div\x3e");
            f = m.children()[0];
            a("body").append(m);
            b = f.offsetWidth;
            m.css("overflow", "scroll");
            f = f.offsetWidth;
            b === f && (f = m[0].clientWidth);
            m.remove();
            return o = b - f
        },
        getScrollInfo: function(b) {
            var f = b.isWindow ? "" : b.element.css("overflow-x"),
                m = b.isWindow ? "" : b.element.css("overflow-y"),
                f = "scroll" === f || "auto" === f && b.width < b.element[0].scrollWidth;
            return {
                width: "scroll" === m || "auto" === m && b.height < b.element[0].scrollHeight ? a.position.scrollbarWidth() : 0,
                height: f ? a.position.scrollbarWidth() : 0
            }
        },
        getWithinInfo: function(b) {
            b = a(b || window);
            var f = a.isWindow(b[0]);
            return {
                element: b,
                isWindow: f,
                offset: b.offset() || {
                    left: 0,
                    top: 0
                },
                scrollLeft: b.scrollLeft(),
                scrollTop: b.scrollTop(),
                width: f ? b.width() : b.outerWidth(),
                height: f ? b.height() : b.outerHeight()
            }
        }
    };
    a.fn.position = function(b) {
        if (!b || !b.of) return E.apply(this, arguments);
        b = a.extend({}, b);
        var f, m, d, e, h, i, j = a(b.of),
            g = a.position.getWithinInfo(b.within),
            k = a.position.getScrollInfo(g),
            p = (b.collision || "flip").split(" "),
            n = {};
        i = j;
        var s = i[0];
        i = 9 === s.nodeType ? {
            width: i.width(),
            height: i.height(),
            offset: {
                top: 0,
                left: 0
            }
        } : a.isWindow(s) ? {
            width: i.width(),
            height: i.height(),
            offset: {
                top: i.scrollTop(),
                left: i.scrollLeft()
            }
        } : s.preventDefault ? {
            width: 0,
            height: 0,
            offset: {
                top: s.pageY,
                left: s.pageX
            }
        } : {
            width: i.outerWidth(),
            height: i.outerHeight(),
            offset: i.offset()
        };
        j[0].preventDefault && (b.at = "left top");
        m = i.width;
        d = i.height;
        e = i.offset;
        h = a.extend({}, e);
        a.each(["my", "at"], function() {
            var f = (b[this] || "").split(" "),
                a, m;
            1 === f.length && (f = w.test(f[0]) ? f.concat(["center"]) : y.test(f[0]) ? ["center"].concat(f) : ["center", "center"]);
            f[0] = w.test(f[0]) ? f[0] : "center";
            f[1] = y.test(f[1]) ? f[1] : "center";
            a = v.exec(f[0]);
            m = v.exec(f[1]);
            n[this] = [a ? a[0] : 0, m ? m[0] : 0];
            b[this] = [A.exec(f[0])[0],
                A.exec(f[1])[0]
            ]
        });
        1 === p.length && (p[1] = p[0]);
        "right" === b.at[0] ? h.left += m : "center" === b.at[0] && (h.left += m / 2);
        "bottom" === b.at[1] ? h.top += d : "center" === b.at[1] && (h.top += d / 2);
        f = c(n.at, m, d);
        h.left += f[0];
        h.top += f[1];
        return this.each(function() {
            var i, s, l = a(this),
                o = l.outerWidth(),
                F = l.outerHeight(),
                w = parseInt(a.css(this, "marginLeft"), 10) || 0,
                t = parseInt(a.css(this, "marginTop"), 10) || 0,
                S = o + w + (parseInt(a.css(this, "marginRight"), 10) || 0) + k.width,
                y = F + t + (parseInt(a.css(this, "marginBottom"), 10) || 0) + k.height,
                v = a.extend({},
                    h),
                x = c(n.my, l.outerWidth(), l.outerHeight());
            "right" === b.my[0] ? v.left -= o : "center" === b.my[0] && (v.left -= o / 2);
            "bottom" === b.my[1] ? v.top -= F : "center" === b.my[1] && (v.top -= F / 2);
            v.left += x[0];
            v.top += x[1];
            a.support.offsetFractions || (v.left = u(v.left), v.top = u(v.top));
            i = {
                marginLeft: w,
                marginTop: t
            };
            a.each(["left", "top"], function(c, e) {
                if (a.ui.position[p[c]]) a.ui.position[p[c]][e](v, {
                    targetWidth: m,
                    targetHeight: d,
                    elemWidth: o,
                    elemHeight: F,
                    collisionPosition: i,
                    collisionWidth: S,
                    collisionHeight: y,
                    offset: [f[0] + x[0], f[1] + x[1]],
                    my: b.my,
                    at: b.at,
                    within: g,
                    elem: l
                })
            });
            b.using && (s = function(f) {
                var a = e.left - v.left,
                    c = a + m - o,
                    h = e.top - v.top,
                    i = h + d - F,
                    g = {
                        target: {
                            element: j,
                            left: e.left,
                            top: e.top,
                            width: m,
                            height: d
                        },
                        element: {
                            element: l,
                            left: v.left,
                            top: v.top,
                            width: o,
                            height: F
                        },
                        horizontal: 0 > c ? "left" : 0 < a ? "right" : "center",
                        vertical: 0 > i ? "top" : 0 < h ? "bottom" : "middle"
                    };
                m < o && q(a + c) < m && (g.horizontal = "center");
                d < F && q(h + i) < d && (g.vertical = "middle");
                g.important = r(q(a), q(c)) > r(q(h), q(i)) ? "horizontal" : "vertical";
                b.using.call(this, f, g)
            });
            l.offset(a.extend(v, {
                using: s
            }))
        })
    };
    a.ui.position = {
        fit: {
            left: function(b, f) {
                var a = f.within,
                    c = a.isWindow ? a.scrollLeft : a.offset.left,
                    d = a.width,
                    e = b.left - f.collisionPosition.marginLeft,
                    a = c - e,
                    h = e + f.collisionWidth - d - c;
                f.collisionWidth > d ? 0 < a && 0 >= h ? (c = b.left + a + f.collisionWidth - d - c, b.left += a - c) : b.left = 0 < h && 0 >= a ? c : a > h ? c + d - f.collisionWidth : c : b.left = 0 < a ? b.left + a : 0 < h ? b.left - h : r(b.left - e, b.left)
            },
            top: function(b, f) {
                var a = f.within,
                    c = a.isWindow ? a.scrollTop : a.offset.top,
                    d = f.within.height,
                    e = b.top - f.collisionPosition.marginTop,
                    a = c - e,
                    h = e + f.collisionHeight -
                    d - c;
                f.collisionHeight > d ? 0 < a && 0 >= h ? (c = b.top + a + f.collisionHeight - d - c, b.top += a - c) : b.top = 0 < h && 0 >= a ? c : a > h ? c + d - f.collisionHeight : c : b.top = 0 < a ? b.top + a : 0 < h ? b.top - h : r(b.top - e, b.top)
            }
        },
        flip: {
            left: function(b, f) {
                var a = f.within,
                    c = a.offset.left + a.scrollLeft,
                    d = a.width,
                    e = a.isWindow ? a.scrollLeft : a.offset.left,
                    h = b.left - f.collisionPosition.marginLeft,
                    a = h - e,
                    i = h + f.collisionWidth - d - e,
                    h = "left" === f.my[0] ? -f.elemWidth : "right" === f.my[0] ? f.elemWidth : 0,
                    j = "left" === f.at[0] ? f.targetWidth : "right" === f.at[0] ? -f.targetWidth : 0,
                    g = -2 *
                    f.offset[0];
                if (0 > a) {
                    if (c = b.left + h + j + g + f.collisionWidth - d - c, 0 > c || c < q(a)) b.left += h + j + g
                } else if (0 < i && (c = b.left - f.collisionPosition.marginLeft + h + j + g - e, 0 < c || q(c) < i)) b.left += h + j + g
            },
            top: function(b, f) {
                var a = f.within,
                    c = a.offset.top + a.scrollTop,
                    d = a.height,
                    e = a.isWindow ? a.scrollTop : a.offset.top,
                    h = b.top - f.collisionPosition.marginTop,
                    a = h - e,
                    i = h + f.collisionHeight - d - e,
                    h = "top" === f.my[1] ? -f.elemHeight : "bottom" === f.my[1] ? f.elemHeight : 0,
                    j = "top" === f.at[1] ? f.targetHeight : "bottom" === f.at[1] ? -f.targetHeight : 0,
                    g = -2 * f.offset[1];
                if (0 > a) {
                    if (c = b.top + h + j + g + f.collisionHeight - d - c, b.top + h + j + g > a && (0 > c || c < q(a))) b.top += h + j + g
                } else if (0 < i && (c = b.top - f.collisionPosition.marginTop + h + j + g - e, b.top + h + j + g > i && (0 < c || q(c) < i))) b.top += h + j + g
            }
        },
        flipfit: {
            left: function() {
                a.ui.position.flip.left.apply(this, arguments);
                a.ui.position.fit.left.apply(this, arguments)
            },
            top: function() {
                a.ui.position.flip.top.apply(this, arguments);
                a.ui.position.fit.top.apply(this, arguments)
            }
        }
    };
    var D, B, C, I, J = document.getElementsByTagName("body")[0];
    C = document.createElement("div");
    D = document.createElement(J ? "div" : "body");
    B = {
        visibility: "hidden",
        width: 0,
        height: 0,
        border: 0,
        margin: 0,
        background: "none"
    };
    J && a.extend(B, {
        position: "absolute",
        left: "-1000px",
        top: "-1000px"
    });
    for (I in B) D.style[I] = B[I];
    D.appendChild(C);
    B = J || document.documentElement;
    B.insertBefore(D, B.firstChild);
    C.style.cssText = "position: absolute; left: 10.7432222px;";
    C = a(C).offset().left;
    a.support.offsetFractions = 10 < C && 11 > C;
    D.innerHTML = "";
    B.removeChild(D);
    a.widget("ui.draggable", a.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "drag",
        options: {
            addClasses: !0,
            appendTo: "parent",
            axis: !1,
            connectToSortable: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            iframeFix: !1,
            opacity: !1,
            refreshPositions: !1,
            revert: !1,
            revertDuration: 500,
            scope: "default",
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            snap: !1,
            snapMode: "both",
            snapTolerance: 20,
            stack: !1,
            zIndex: !1,
            drag: null,
            start: null,
            stop: null
        },
        _create: function() {
            "original" === this.options.helper && !/^(?:r|a|f)/.test(this.element.css("position")) && (this.element[0].style.position =
                "relative");
            this.options.addClasses && this.element.addClass("ui-draggable");
            this.options.disabled && this.element.addClass("ui-draggable-disabled");
            this._mouseInit()
        },
        _destroy: function() {
            this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");
            this._mouseDestroy()
        },
        _mouseCapture: function(b) {
            var f = this.options;
            if (this.helper || f.disabled || 0 < a(b.target).closest(".ui-resizable-handle").length) return !1;
            this.handle = this._getHandle(b);
            if (!this.handle) return !1;
            a(!0 === f.iframeFix ?
                "iframe" : f.iframeFix).each(function() {
                a("\x3cdiv class\x3d'ui-draggable-iframeFix' style\x3d'background: #fff;'\x3e\x3c/div\x3e").css({
                    width: this.offsetWidth + "px",
                    height: this.offsetHeight + "px",
                    position: "absolute",
                    opacity: "0.001",
                    zIndex: 1E3
                }).css(a(this).offset()).appendTo("body")
            });
            return !0
        },
        _mouseStart: function(b) {
            var f = this.options;
            this.helper = this._createHelper(b);
            this.helper.addClass("ui-draggable-dragging");
            this._cacheHelperProportions();
            a.ui.ddmanager && (a.ui.ddmanager.current = this);
            this._cacheMargins();
            this.cssPosition = this.helper.css("position");
            this.scrollParent = this.helper.scrollParent();
            this.offsetParent = this.helper.offsetParent();
            this.offsetParentCssPosition = this.offsetParent.css("position");
            this.offset = this.positionAbs = this.element.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            this.offset.scroll = !1;
            a.extend(this.offset, {
                click: {
                    left: b.pageX - this.offset.left,
                    top: b.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.originalPosition = this.position = this._generatePosition(b);
            this.originalPageX = b.pageX;
            this.originalPageY = b.pageY;
            f.cursorAt && this._adjustOffsetFromHelper(f.cursorAt);
            this._setContainment();
            if (!1 === this._trigger("start", b)) return this._clear(), !1;
            this._cacheHelperProportions();
            a.ui.ddmanager && !f.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b);
            this._mouseDrag(b, !0);
            a.ui.ddmanager && a.ui.ddmanager.dragStart(this, b);
            return !0
        },
        _mouseDrag: function(b, f) {
            "fixed" === this.offsetParentCssPosition && (this.offset.parent =
                this._getParentOffset());
            this.position = this._generatePosition(b);
            this.positionAbs = this._convertPositionTo("absolute");
            if (!f) {
                var m = this._uiHash();
                if (!1 === this._trigger("drag", b, m)) return this._mouseUp({}), !1;
                this.position = m.position
            }
            if (!this.options.axis || "y" !== this.options.axis) this.helper[0].style.left = this.position.left + "px";
            if (!this.options.axis || "x" !== this.options.axis) this.helper[0].style.top = this.position.top + "px";
            a.ui.ddmanager && a.ui.ddmanager.drag(this, b);
            return !1
        },
        _mouseStop: function(b) {
            var f =
                this,
                m = !1;
            a.ui.ddmanager && !this.options.dropBehaviour && (m = a.ui.ddmanager.drop(this, b));
            this.dropped && (m = this.dropped, this.dropped = !1);
            if ("original" === this.options.helper && !a.contains(this.element[0].ownerDocument, this.element[0])) return !1;
            "invalid" === this.options.revert && !m || "valid" === this.options.revert && m || !0 === this.options.revert || a.isFunction(this.options.revert) && this.options.revert.call(this.element, m) ? a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
                !1 !==
                    f._trigger("stop", b) && f._clear()
            }) : !1 !== this._trigger("stop", b) && this._clear();
            return !1
        },
        _mouseUp: function(b) {
            a("div.ui-draggable-iframeFix").each(function() {
                this.parentNode.removeChild(this)
            });
            a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b);
            return a.ui.mouse.prototype._mouseUp.call(this, b)
        },
        cancel: function() {
            this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear();
            return this
        },
        _getHandle: function(b) {
            return this.options.handle ? !!a(b.target).closest(this.element.find(this.options.handle)).length :
                !0
        },
        _createHelper: function(b) {
            var f = this.options;
            b = a.isFunction(f.helper) ? a(f.helper.apply(this.element[0], [b])) : "clone" === f.helper ? this.element.clone().removeAttr("id") : this.element;
            b.parents("body").length || b.appendTo("parent" === f.appendTo ? this.element[0].parentNode : f.appendTo);
            b[0] !== this.element[0] && !/(fixed|absolute)/.test(b.css("position")) && b.css("position", "absolute");
            return b
        },
        _adjustOffsetFromHelper: function(b) {
            "string" === typeof b && (b = b.split(" "));
            a.isArray(b) && (b = {
                left: +b[0],
                top: +b[1] ||
                    0
            });
            "left" in b && (this.offset.click.left = b.left + this.margins.left);
            "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left);
            "top" in b && (this.offset.click.top = b.top + this.margins.top);
            "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            var b = this.offsetParent.offset();
            "absolute" === this.cssPosition && (this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0])) && (b.left +=
                this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop());
            if (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && a.ui.ie) b = {
                top: 0,
                left: 0
            };
            return {
                top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" === this.cssPosition) {
                var b = this.element.position();
                return {
                    top: b.top - (parseInt(this.helper.css("top"),
                        10) || 0) + this.scrollParent.scrollTop(),
                    left: b.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.element.css("marginLeft"), 10) || 0,
                top: parseInt(this.element.css("marginTop"), 10) || 0,
                right: parseInt(this.element.css("marginRight"), 10) || 0,
                bottom: parseInt(this.element.css("marginBottom"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var b, f, m;
            b = this.options;
            if (b.containment)
                if ("window" === b.containment) this.containment = [a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, a(window).scrollLeft() + a(window).width() - this.helperProportions.width - this.margins.left, a(window).scrollTop() + (a(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
                else if ("document" === b.containment) this.containment = [0, 0, a(document).width() - this.helperProportions.width - this.margins.left, (a(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            else if (b.containment.constructor === Array) this.containment = b.containment;
            else {
                if ("parent" === b.containment && (b.containment = this.helper[0].parentNode), f = a(b.containment), m = f[0]) b = "hidden" !== f.css("overflow"), this.containment = [(parseInt(f.css("borderLeftWidth"), 10) || 0) + (parseInt(f.css("paddingLeft"), 10) || 0), (parseInt(f.css("borderTopWidth"),
                    10) || 0) + (parseInt(f.css("paddingTop"), 10) || 0), (b ? Math.max(m.scrollWidth, m.offsetWidth) : m.offsetWidth) - (parseInt(f.css("borderRightWidth"), 10) || 0) - (parseInt(f.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (b ? Math.max(m.scrollHeight, m.offsetHeight) : m.offsetHeight) - (parseInt(f.css("borderBottomWidth"), 10) || 0) - (parseInt(f.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = f
            } else this.containment =
                null
        },
        _convertPositionTo: function(b, f) {
            f || (f = this.position);
            var m = "absolute" === b ? 1 : -1,
                c = "absolute" === this.cssPosition && !(this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent;
            this.offset.scroll || (this.offset.scroll = {
                top: c.scrollTop(),
                left: c.scrollLeft()
            });
            return {
                top: f.top + this.offset.relative.top * m + this.offset.parent.top * m - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * m,
                left: f.left + this.offset.relative.left *
                    m + this.offset.parent.left * m - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * m
            }
        },
        _generatePosition: function(b) {
            var f, m, c, d = this.options,
                e = "absolute" === this.cssPosition && !(this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent;
            c = b.pageX;
            m = b.pageY;
            this.offset.scroll || (this.offset.scroll = {
                top: e.scrollTop(),
                left: e.scrollLeft()
            });
            this.originalPosition && (this.containment && (this.relative_container ? (f =
                this.relative_container.offset(), f = [this.containment[0] + f.left, this.containment[1] + f.top, this.containment[2] + f.left, this.containment[3] + f.top]) : f = this.containment, b.pageX - this.offset.click.left < f[0] && (c = f[0] + this.offset.click.left), b.pageY - this.offset.click.top < f[1] && (m = f[1] + this.offset.click.top), b.pageX - this.offset.click.left > f[2] && (c = f[2] + this.offset.click.left), b.pageY - this.offset.click.top > f[3] && (m = f[3] + this.offset.click.top)), d.grid && (m = d.grid[1] ? this.originalPageY + Math.round((m - this.originalPageY) /
                d.grid[1]) * d.grid[1] : this.originalPageY, m = f ? m - this.offset.click.top >= f[1] || m - this.offset.click.top > f[3] ? m : m - this.offset.click.top >= f[1] ? m - d.grid[1] : m + d.grid[1] : m, c = d.grid[0] ? this.originalPageX + Math.round((c - this.originalPageX) / d.grid[0]) * d.grid[0] : this.originalPageX, c = f ? c - this.offset.click.left >= f[0] || c - this.offset.click.left > f[2] ? c : c - this.offset.click.left >= f[0] ? c - d.grid[0] : c + d.grid[0] : c));
            return {
                top: m - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ?
                    -this.scrollParent.scrollTop() : this.offset.scroll.top),
                left: c - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
            }
        },
        _clear: function() {
            this.helper.removeClass("ui-draggable-dragging");
            this.helper[0] !== this.element[0] && !this.cancelHelperRemoval && this.helper.remove();
            this.helper = null;
            this.cancelHelperRemoval = !1
        },
        _trigger: function(b, f, m) {
            m = m || this._uiHash();
            a.ui.plugin.call(this, b, [f, m]);
            "drag" ===
            b && (this.positionAbs = this._convertPositionTo("absolute"));
            return a.Widget.prototype._trigger.call(this, b, f, m)
        },
        plugins: {},
        _uiHash: function() {
            return {
                helper: this.helper,
                position: this.position,
                originalPosition: this.originalPosition,
                offset: this.positionAbs
            }
        }
    });
    a.ui.plugin.add("draggable", "connectToSortable", {
        start: function(b, f) {
            var m = a(this).data("ui-draggable"),
                c = m.options,
                d = a.extend({}, f, {
                    item: m.element
                });
            m.sortables = [];
            a(c.connectToSortable).each(function() {
                var f = a.data(this, "ui-sortable");
                f && !f.options.disabled &&
                    (m.sortables.push({
                        instance: f,
                        shouldRevert: f.options.revert
                    }), f.refreshPositions(), f._trigger("activate", b, d))
            })
        },
        stop: function(b, f) {
            var m = a(this).data("ui-draggable"),
                c = a.extend({}, f, {
                    item: m.element
                });
            a.each(m.sortables, function() {
                this.instance.isOver ? (this.instance.isOver = 0, m.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(b), this.instance.options.helper = this.instance.options._helper, "original" ===
                    m.options.helper && this.instance.currentItem.css({
                        top: "auto",
                        left: "auto"
                    })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", b, c))
            })
        },
        drag: function(b, f) {
            var m = a(this).data("ui-draggable"),
                c = this;
            a.each(m.sortables, function() {
                var d = !1,
                    e = this;
                this.instance.positionAbs = m.positionAbs;
                this.instance.helperProportions = m.helperProportions;
                this.instance.offset.click = m.offset.click;
                this.instance._intersectsWith(this.instance.containerCache) && (d = !0, a.each(m.sortables, function() {
                    this.instance.positionAbs =
                        m.positionAbs;
                    this.instance.helperProportions = m.helperProportions;
                    this.instance.offset.click = m.offset.click;
                    this !== e && (this.instance._intersectsWith(this.instance.containerCache) && a.contains(e.instance.element[0], this.instance.element[0])) && (d = !1);
                    return d
                }));
                d ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = a(c).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper =
                    function() {
                        return f.helper[0]
                    }, b.target = this.instance.currentItem[0], this.instance._mouseCapture(b, !0), this.instance._mouseStart(b, !0, !0), this.instance.offset.click.top = m.offset.click.top, this.instance.offset.click.left = m.offset.click.left, this.instance.offset.parent.left -= m.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= m.offset.parent.top - this.instance.offset.parent.top, m._trigger("toSortable", b), m.dropped = this.instance.element, m.currentItem = m.element, this.instance.fromOutside =
                    m), this.instance.currentItem && this.instance._mouseDrag(b)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", b, this.instance._uiHash(this.instance)), this.instance._mouseStop(b, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), m._trigger("fromSortable", b), m.dropped = !1)
            })
        }
    });
    a.ui.plugin.add("draggable",
        "cursor", {
            start: function() {
                var b = a("body"),
                    f = a(this).data("ui-draggable").options;
                b.css("cursor") && (f._cursor = b.css("cursor"));
                b.css("cursor", f.cursor)
            },
            stop: function() {
                var b = a(this).data("ui-draggable").options;
                b._cursor && a("body").css("cursor", b._cursor)
            }
        });
    a.ui.plugin.add("draggable", "opacity", {
        start: function(b, f) {
            var m = a(f.helper),
                c = a(this).data("ui-draggable").options;
            m.css("opacity") && (c._opacity = m.css("opacity"));
            m.css("opacity", c.opacity)
        },
        stop: function(b, f) {
            var m = a(this).data("ui-draggable").options;
            m._opacity && a(f.helper).css("opacity", m._opacity)
        }
    });
    a.ui.plugin.add("draggable", "scroll", {
        start: function() {
            var b = a(this).data("ui-draggable");
            b.scrollParent[0] !== document && "HTML" !== b.scrollParent[0].tagName && (b.overflowOffset = b.scrollParent.offset())
        },
        drag: function(b) {
            var f = a(this).data("ui-draggable"),
                m = f.options,
                c = !1;
            if (f.scrollParent[0] !== document && "HTML" !== f.scrollParent[0].tagName) {
                if (!m.axis || "x" !== m.axis) f.overflowOffset.top + f.scrollParent[0].offsetHeight - b.pageY < m.scrollSensitivity ? f.scrollParent[0].scrollTop =
                    c = f.scrollParent[0].scrollTop + m.scrollSpeed : b.pageY - f.overflowOffset.top < m.scrollSensitivity && (f.scrollParent[0].scrollTop = c = f.scrollParent[0].scrollTop - m.scrollSpeed);
                if (!m.axis || "y" !== m.axis) f.overflowOffset.left + f.scrollParent[0].offsetWidth - b.pageX < m.scrollSensitivity ? f.scrollParent[0].scrollLeft = c = f.scrollParent[0].scrollLeft + m.scrollSpeed : b.pageX - f.overflowOffset.left < m.scrollSensitivity && (f.scrollParent[0].scrollLeft = c = f.scrollParent[0].scrollLeft - m.scrollSpeed)
            } else {
                if (!m.axis || "x" !== m.axis) b.pageY -
                    a(document).scrollTop() < m.scrollSensitivity ? c = a(document).scrollTop(a(document).scrollTop() - m.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < m.scrollSensitivity && (c = a(document).scrollTop(a(document).scrollTop() + m.scrollSpeed));
                if (!m.axis || "y" !== m.axis) b.pageX - a(document).scrollLeft() < m.scrollSensitivity ? c = a(document).scrollLeft(a(document).scrollLeft() - m.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < m.scrollSensitivity && (c = a(document).scrollLeft(a(document).scrollLeft() +
                    m.scrollSpeed))
            }!1 !== c && (a.ui.ddmanager && !m.dropBehaviour) && a.ui.ddmanager.prepareOffsets(f, b)
        }
    });
    a.ui.plugin.add("draggable", "snap", {
        start: function() {
            var b = a(this).data("ui-draggable"),
                f = b.options;
            b.snapElements = [];
            a(f.snap.constructor !== String ? f.snap.items || ":data(ui-draggable)" : f.snap).each(function() {
                var f = a(this),
                    c = f.offset();
                this !== b.element[0] && b.snapElements.push({
                    item: this,
                    width: f.outerWidth(),
                    height: f.outerHeight(),
                    top: c.top,
                    left: c.left
                })
            })
        },
        drag: function(b, f) {
            var m, c, d, e, h, i, j, g, k, p, n =
                a(this).data("ui-draggable"),
                s = n.options,
                l = s.snapTolerance,
                o = f.offset.left,
                r = o + n.helperProportions.width,
                q = f.offset.top,
                u = q + n.helperProportions.height;
            for (k = n.snapElements.length - 1; 0 <= k; k--) h = n.snapElements[k].left, i = h + n.snapElements[k].width, j = n.snapElements[k].top, g = j + n.snapElements[k].height, r < h - l || o > i + l || u < j - l || q > g + l || !a.contains(n.snapElements[k].item.ownerDocument, n.snapElements[k].item) ? (n.snapElements[k].snapping && n.options.snap.release && n.options.snap.release.call(n.element, b, a.extend(n._uiHash(), {
                snapItem: n.snapElements[k].item
            })), n.snapElements[k].snapping = !1) : ("inner" !== s.snapMode && (m = Math.abs(j - u) <= l, c = Math.abs(g - q) <= l, d = Math.abs(h - r) <= l, e = Math.abs(i - o) <= l, m && (f.position.top = n._convertPositionTo("relative", {
                top: j - n.helperProportions.height,
                left: 0
            }).top - n.margins.top), c && (f.position.top = n._convertPositionTo("relative", {
                top: g,
                left: 0
            }).top - n.margins.top), d && (f.position.left = n._convertPositionTo("relative", {
                top: 0,
                left: h - n.helperProportions.width
            }).left - n.margins.left), e && (f.position.left =
                n._convertPositionTo("relative", {
                    top: 0,
                    left: i
                }).left - n.margins.left)), p = m || c || d || e, "outer" !== s.snapMode && (m = Math.abs(j - q) <= l, c = Math.abs(g - u) <= l, d = Math.abs(h - o) <= l, e = Math.abs(i - r) <= l, m && (f.position.top = n._convertPositionTo("relative", {
                top: j,
                left: 0
            }).top - n.margins.top), c && (f.position.top = n._convertPositionTo("relative", {
                top: g - n.helperProportions.height,
                left: 0
            }).top - n.margins.top), d && (f.position.left = n._convertPositionTo("relative", {
                top: 0,
                left: h
            }).left - n.margins.left), e && (f.position.left = n._convertPositionTo("relative", {
                top: 0,
                left: i - n.helperProportions.width
            }).left - n.margins.left)), !n.snapElements[k].snapping && (m || c || d || e || p) && n.options.snap.snap && n.options.snap.snap.call(n.element, b, a.extend(n._uiHash(), {
                snapItem: n.snapElements[k].item
            })), n.snapElements[k].snapping = m || c || d || e || p)
        }
    });
    a.ui.plugin.add("draggable", "stack", {
        start: function() {
            var b, f = this.data("ui-draggable").options,
                f = a.makeArray(a(f.stack)).sort(function(b, f) {
                    return (parseInt(a(b).css("zIndex"), 10) || 0) - (parseInt(a(f).css("zIndex"), 10) || 0)
                });
            f.length &&
                (b = parseInt(a(f[0]).css("zIndex"), 10) || 0, a(f).each(function(f) {
                    a(this).css("zIndex", b + f)
                }), this.css("zIndex", b + f.length))
        }
    });
    a.ui.plugin.add("draggable", "zIndex", {
        start: function(b, f) {
            var m = a(f.helper),
                c = a(this).data("ui-draggable").options;
            m.css("zIndex") && (c._zIndex = m.css("zIndex"));
            m.css("zIndex", c.zIndex)
        },
        stop: function(b, f) {
            var m = a(this).data("ui-draggable").options;
            m._zIndex && a(f.helper).css("zIndex", m._zIndex)
        }
    });
    a.widget("ui.droppable", {
        version: "1.10.3",
        widgetEventPrefix: "drop",
        options: {
            accept: "*",
            activeClass: !1,
            addClasses: !0,
            greedy: !1,
            hoverClass: !1,
            scope: "default",
            tolerance: "intersect",
            activate: null,
            deactivate: null,
            drop: null,
            out: null,
            over: null
        },
        _create: function() {
            var b = this.options,
                f = b.accept;
            this.isover = !1;
            this.isout = !0;
            this.accept = a.isFunction(f) ? f : function(b) {
                return b.is(f)
            };
            this.proportions = {
                width: this.element[0].offsetWidth,
                height: this.element[0].offsetHeight
            };
            a.ui.ddmanager.droppables[b.scope] = a.ui.ddmanager.droppables[b.scope] || [];
            a.ui.ddmanager.droppables[b.scope].push(this);
            b.addClasses &&
                this.element.addClass("ui-droppable")
        },
        _destroy: function() {
            for (var b = 0, f = a.ui.ddmanager.droppables[this.options.scope]; b < f.length; b++) f[b] === this && f.splice(b, 1);
            this.element.removeClass("ui-droppable ui-droppable-disabled")
        },
        _setOption: function(b, f) {
            "accept" === b && (this.accept = a.isFunction(f) ? f : function(b) {
                return b.is(f)
            });
            a.Widget.prototype._setOption.apply(this, arguments)
        },
        _activate: function(b) {
            var f = a.ui.ddmanager.current;
            this.options.activeClass && this.element.addClass(this.options.activeClass);
            f && this._trigger("activate", b, this.ui(f))
        },
        _deactivate: function(b) {
            var f = a.ui.ddmanager.current;
            this.options.activeClass && this.element.removeClass(this.options.activeClass);
            f && this._trigger("deactivate", b, this.ui(f))
        },
        _over: function(b) {
            var f = a.ui.ddmanager.current;
            if (f && (f.currentItem || f.element)[0] !== this.element[0])
                if (this.accept.call(this.element[0], f.currentItem || f.element)) this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", b, this.ui(f))
        },
        _out: function(b) {
            var f =
                a.ui.ddmanager.current;
            if (f && (f.currentItem || f.element)[0] !== this.element[0])
                if (this.accept.call(this.element[0], f.currentItem || f.element)) this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", b, this.ui(f))
        },
        _drop: function(b, f) {
            var m = f || a.ui.ddmanager.current,
                c = !1;
            if (!m || (m.currentItem || m.element)[0] === this.element[0]) return !1;
            this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
                var b = a.data(this, "ui-droppable");
                if (b.options.greedy &&
                    !b.options.disabled && b.options.scope === m.options.scope && b.accept.call(b.element[0], m.currentItem || m.element) && a.ui.intersect(m, a.extend(b, {
                        offset: b.element.offset()
                    }), b.options.tolerance)) return c = !0, !1
            });
            return c ? !1 : this.accept.call(this.element[0], m.currentItem || m.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", b, this.ui(m)), this.element) : !1
        },
        ui: function(b) {
            return {
                draggable: b.currentItem ||
                    b.element,
                helper: b.helper,
                position: b.position,
                offset: b.positionAbs
            }
        }
    });
    a.ui.intersect = function(b, f, a) {
        if (!f.offset) return !1;
        var c = (b.positionAbs || b.position.absolute).left,
            d = c + b.helperProportions.width,
            e = (b.positionAbs || b.position.absolute).top,
            h = e + b.helperProportions.height,
            i = f.offset.left,
            j = i + f.proportions.width,
            g = f.offset.top,
            n = g + f.proportions.height;
        switch (a) {
            case "fit":
                return i <= c && d <= j && g <= e && h <= n;
            case "intersect":
                return i < c + b.helperProportions.width / 2 && d - b.helperProportions.width / 2 < j && g < e +
                    b.helperProportions.height / 2 && h - b.helperProportions.height / 2 < n;
            case "pointer":
                return a = (b.positionAbs || b.position.absolute).left + (b.clickOffset || b.offset.click).left, b = (b.positionAbs || b.position.absolute).top + (b.clickOffset || b.offset.click).top, b > g && b < g + f.proportions.height && a > i && a < i + f.proportions.width;
            case "touch":
                return (e >= g && e <= n || h >= g && h <= n || e < g && h > n) && (c >= i && c <= j || d >= i && d <= j || c < i && d > j);
            default:
                return !1
        }
    };
    a.ui.ddmanager = {
        current: null,
        droppables: {
            "default": []
        },
        prepareOffsets: function(b, f) {
            var c,
                d, e = a.ui.ddmanager.droppables[b.options.scope] || [],
                h = f ? f.type : null,
                i = (b.currentItem || b.element).find(":data(ui-droppable)").addBack();
            c = 0;
            a: for (; c < e.length; c++)
                if (!(e[c].options.disabled || b && !e[c].accept.call(e[c].element[0], b.currentItem || b.element))) {
                    for (d = 0; d < i.length; d++)
                        if (i[d] === e[c].element[0]) {
                            e[c].proportions.height = 0;
                            continue a
                        }
                    e[c].visible = "none" !== e[c].element.css("display");
                    e[c].visible && ("mousedown" === h && e[c]._activate.call(e[c], f), e[c].offset = e[c].element.offset(), e[c].proportions = {
                        width: e[c].element[0].offsetWidth,
                        height: e[c].element[0].offsetHeight
                    })
                }
        },
        drop: function(b, f) {
            var c = !1;
            a.each((a.ui.ddmanager.droppables[b.options.scope] || []).slice(), function() {
                if (this.options && (!this.options.disabled && (this.visible && a.ui.intersect(b, this, this.options.tolerance)) && (c = this._drop.call(this, f) || c), !this.options.disabled && this.visible && this.accept.call(this.element[0], b.currentItem || b.element))) this.isout = !0, this.isover = !1, this._deactivate.call(this, f)
            });
            return c
        },
        dragStart: function(b,
            f) {
            b.element.parentsUntil("body").bind("scroll.droppable", function() {
                b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, f)
            })
        },
        drag: function(b, f) {
            b.options.refreshPositions && a.ui.ddmanager.prepareOffsets(b, f);
            a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function() {
                if (!this.options.disabled && !this.greedyChild && this.visible) {
                    var c, d, e;
                    e = a.ui.intersect(b, this, this.options.tolerance);
                    var h = !e && this.isover ? "isout" : e && !this.isover ? "isover" : null;
                    h && (this.options.greedy && (d = this.options.scope,
                        e = this.element.parents(":data(ui-droppable)").filter(function() {
                            return a.data(this, "ui-droppable").options.scope === d
                        }), e.length && (c = a.data(e[0], "ui-droppable"), c.greedyChild = "isover" === h)), c && "isover" === h && (c.isover = !1, c.isout = !0, c._out.call(c, f)), this[h] = !0, this["isout" === h ? "isover" : "isout"] = !1, this["isover" === h ? "_over" : "_out"].call(this, f), c && "isout" === h && (c.isout = !1, c.isover = !0, c._over.call(c, f)))
                }
            })
        },
        dragStop: function(b, f) {
            b.element.parentsUntil("body").unbind("scroll.droppable");
            b.options.refreshPositions ||
                a.ui.ddmanager.prepareOffsets(b, f)
        }
    };
    var K = function(b) {
            return parseInt(b, 10) || 0
        },
        z = function(b) {
            return !isNaN(parseInt(b, 10))
        };
    a.widget("ui.resizable", a.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "resize",
        options: {
            alsoResize: !1,
            animate: !1,
            animateDuration: "slow",
            animateEasing: "swing",
            aspectRatio: !1,
            autoHide: !1,
            containment: !1,
            ghost: !1,
            grid: !1,
            handles: "e,s,se",
            helper: !1,
            maxHeight: null,
            maxWidth: null,
            minHeight: 10,
            minWidth: 10,
            zIndex: 90,
            resize: null,
            start: null,
            stop: null
        },
        _create: function() {
            var b, f, c, d, e,
                h = this,
                i = this.options;
            this.element.addClass("ui-resizable");
            a.extend(this, {
                _aspectRatio: !!i.aspectRatio,
                aspectRatio: i.aspectRatio,
                originalElement: this.element,
                _proportionallyResizeElements: [],
                _helper: i.helper || i.ghost || i.animate ? i.helper || "ui-resizable-helper" : null
            });
            this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(a("\x3cdiv class\x3d'ui-wrapper' style\x3d'overflow: hidden;'\x3e\x3c/div\x3e").css({
                    position: this.element.css("position"),
                    width: this.element.outerWidth(),
                    height: this.element.outerHeight(),
                    top: this.element.css("top"),
                    left: this.element.css("left")
                })), this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable")), this.elementIsWrapper = !0, this.element.css({
                    marginLeft: this.originalElement.css("marginLeft"),
                    marginTop: this.originalElement.css("marginTop"),
                    marginRight: this.originalElement.css("marginRight"),
                    marginBottom: this.originalElement.css("marginBottom")
                }), this.originalElement.css({
                    marginLeft: 0,
                    marginTop: 0,
                    marginRight: 0,
                    marginBottom: 0
                }),
                this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
                    position: "static",
                    zoom: 1,
                    display: "block"
                })), this.originalElement.css({
                    margin: this.originalElement.css("margin")
                }), this._proportionallyResize());
            this.handles = i.handles || (!a(".ui-resizable-handle", this.element).length ? "e,s,se" : {
                n: ".ui-resizable-n",
                e: ".ui-resizable-e",
                s: ".ui-resizable-s",
                w: ".ui-resizable-w",
                se: ".ui-resizable-se",
                sw: ".ui-resizable-sw",
                ne: ".ui-resizable-ne",
                nw: ".ui-resizable-nw"
            });
            if (this.handles.constructor === String) {
                "all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw");
                b = this.handles.split(",");
                this.handles = {};
                for (f = 0; f < b.length; f++) c = a.trim(b[f]), e = "ui-resizable-" + c, d = a("\x3cdiv class\x3d'ui-resizable-handle " + e + "'\x3e\x3c/div\x3e"), d.css({
                    zIndex: i.zIndex
                }), "se" === c && d.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[c] = ".ui-resizable-" + c, this.element.append(d)
            }
            this._renderAxis = function(b) {
                var f, c, m;
                b = b || this.element;
                for (f in this.handles) this.handles[f].constructor === String && (this.handles[f] = a(this.handles[f], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (c = a(this.handles[f], this.element), m = /sw|ne|nw|se|n|s/.test(f) ? c.outerHeight() : c.outerWidth(), c = ["padding", /ne|nw|n/.test(f) ? "Top" : /se|sw|s/.test(f) ? "Bottom" : /^e$/.test(f) ? "Right" : "Left"].join(""), b.css(c, m), this._proportionallyResize()), a(this.handles[f])
            };
            this._renderAxis(this.element);
            this._handles = a(".ui-resizable-handle", this.element).disableSelection();
            this._handles.mouseover(function() {
                h.resizing || (this.className && (d = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), h.axis = d && d[1] ? d[1] : "se")
            });
            i.autoHide && (this._handles.hide(), a(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
                i.disabled || (a(this).removeClass("ui-resizable-autohide"), h._handles.show())
            }).mouseleave(function() {
                !i.disabled && !h.resizing && (a(this).addClass("ui-resizable-autohide"),
                    h._handles.hide())
            }));
            this._mouseInit()
        },
        _destroy: function() {
            this._mouseDestroy();
            var b, f = function(b) {
                a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
            };
            this.elementIsWrapper && (f(this.element), b = this.element, this.originalElement.css({
                position: b.css("position"),
                width: b.outerWidth(),
                height: b.outerHeight(),
                top: b.css("top"),
                left: b.css("left")
            }).insertAfter(b), b.remove());
            this.originalElement.css("resize", this.originalResizeStyle);
            f(this.originalElement);
            return this
        },
        _mouseCapture: function(b) {
            var f, c, d = !1;
            for (f in this.handles)
                if (c = a(this.handles[f])[0], c === b.target || a.contains(c, b.target)) d = !0;
            return !this.options.disabled && d
        },
        _mouseStart: function(b) {
            var f, c, d;
            d = this.options;
            f = this.element.position();
            var e = this.element;
            this.resizing = !0;
            /absolute/.test(e.css("position")) ? e.css({
                position: "absolute",
                top: e.css("top"),
                left: e.css("left")
            }) : e.is(".ui-draggable") && e.css({
                position: "absolute",
                top: f.top,
                left: f.left
            });
            this._renderProxy();
            f = K(this.helper.css("left"));
            c = K(this.helper.css("top"));
            d.containment && (f += a(d.containment).scrollLeft() || 0, c += a(d.containment).scrollTop() || 0);
            this.offset = this.helper.offset();
            this.position = {
                left: f,
                top: c
            };
            this.size = this._helper ? {
                width: e.outerWidth(),
                height: e.outerHeight()
            } : {
                width: e.width(),
                height: e.height()
            };
            this.originalSize = this._helper ? {
                width: e.outerWidth(),
                height: e.outerHeight()
            } : {
                width: e.width(),
                height: e.height()
            };
            this.originalPosition = {
                left: f,
                top: c
            };
            this.sizeDiff = {
                width: e.outerWidth() - e.width(),
                height: e.outerHeight() - e.height()
            };
            this.originalMousePosition = {
                left: b.pageX,
                top: b.pageY
            };
            this.aspectRatio = "number" === typeof d.aspectRatio ? d.aspectRatio : this.originalSize.width / this.originalSize.height || 1;
            d = a(".ui-resizable-" + this.axis).css("cursor");
            a("body").css("cursor", "auto" === d ? this.axis + "-resize" : d);
            e.addClass("ui-resizable-resizing");
            this._propagate("start", b);
            return !0
        },
        _mouseDrag: function(b) {
            var f, c = this.helper,
                d = {};
            f = this.originalMousePosition;
            var e = this.position.top,
                h = this.position.left,
                i = this.size.width,
                j = this.size.height,
                g = this._change[this.axis];
            if (!g) return !1;
            f = g.apply(this, [b, b.pageX - f.left || 0, b.pageY - f.top || 0]);
            this._updateVirtualBoundaries(b.shiftKey);
            if (this._aspectRatio || b.shiftKey) f = this._updateRatio(f, b);
            f = this._respectSize(f, b);
            this._updateCache(f);
            this._propagate("resize", b);
            this.position.top !== e && (d.top = this.position.top + "px");
            this.position.left !== h && (d.left = this.position.left + "px");
            this.size.width !== i && (d.width = this.size.width +
                "px");
            this.size.height !== j && (d.height = this.size.height + "px");
            c.css(d);
            !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize();
            a.isEmptyObject(d) || this._trigger("resize", b, this.ui());
            return !1
        },
        _mouseStop: function(b) {
            this.resizing = !1;
            var f, c, d, e = this.options;
            this._helper && (f = this._proportionallyResizeElements, f = (c = f.length && /textarea/i.test(f[0].nodeName)) && a.ui.hasScroll(f[0], "left") ? 0 : this.sizeDiff.height, c = c ? 0 : this.sizeDiff.width, c = {
                width: this.helper.width() - c,
                height: this.helper.height() -
                    f
            }, f = parseInt(this.element.css("left"), 10) + (this.position.left - this.originalPosition.left) || null, d = parseInt(this.element.css("top"), 10) + (this.position.top - this.originalPosition.top) || null, e.animate || this.element.css(a.extend(c, {
                top: d,
                left: f
            })), this.helper.height(this.size.height), this.helper.width(this.size.width), this._helper && !e.animate && this._proportionallyResize());
            a("body").css("cursor", "auto");
            this.element.removeClass("ui-resizable-resizing");
            this._propagate("stop", b);
            this._helper && this.helper.remove();
            return !1
        },
        _updateVirtualBoundaries: function(b) {
            var f, a, c, d;
            d = this.options;
            d = {
                minWidth: z(d.minWidth) ? d.minWidth : 0,
                maxWidth: z(d.maxWidth) ? d.maxWidth : Infinity,
                minHeight: z(d.minHeight) ? d.minHeight : 0,
                maxHeight: z(d.maxHeight) ? d.maxHeight : Infinity
            };
            if (this._aspectRatio || b) b = d.minHeight * this.aspectRatio, a = d.minWidth / this.aspectRatio, f = d.maxHeight * this.aspectRatio, c = d.maxWidth / this.aspectRatio, b > d.minWidth && (d.minWidth = b), a > d.minHeight && (d.minHeight = a), f < d.maxWidth && (d.maxWidth = f), c < d.maxHeight && (d.maxHeight =
                c);
            this._vBoundaries = d
        },
        _updateCache: function(b) {
            this.offset = this.helper.offset();
            z(b.left) && (this.position.left = b.left);
            z(b.top) && (this.position.top = b.top);
            z(b.height) && (this.size.height = b.height);
            z(b.width) && (this.size.width = b.width)
        },
        _updateRatio: function(b) {
            var f = this.position,
                a = this.size,
                c = this.axis;
            z(b.height) ? b.width = b.height * this.aspectRatio : z(b.width) && (b.height = b.width / this.aspectRatio);
            "sw" === c && (b.left = f.left + (a.width - b.width), b.top = null);
            "nw" === c && (b.top = f.top + (a.height - b.height), b.left =
                f.left + (a.width - b.width));
            return b
        },
        _respectSize: function(b) {
            var f = this._vBoundaries,
                a = this.axis,
                c = z(b.width) && f.maxWidth && f.maxWidth < b.width,
                d = z(b.height) && f.maxHeight && f.maxHeight < b.height,
                e = z(b.width) && f.minWidth && f.minWidth > b.width,
                h = z(b.height) && f.minHeight && f.minHeight > b.height,
                i = this.originalPosition.left + this.originalSize.width,
                j = this.position.top + this.size.height,
                g = /sw|nw|w/.test(a),
                a = /nw|ne|n/.test(a);
            e && (b.width = f.minWidth);
            h && (b.height = f.minHeight);
            c && (b.width = f.maxWidth);
            d && (b.height =
                f.maxHeight);
            e && g && (b.left = i - f.minWidth);
            c && g && (b.left = i - f.maxWidth);
            h && a && (b.top = j - f.minHeight);
            d && a && (b.top = j - f.maxHeight);
            !b.width && !b.height && !b.left && b.top ? b.top = null : !b.width && (!b.height && !b.top && b.left) && (b.left = null);
            return b
        },
        _proportionallyResize: function() {
            if (this._proportionallyResizeElements.length) {
                var b, f, a, c, d, e = this.helper || this.element;
                for (b = 0; b < this._proportionallyResizeElements.length; b++) {
                    d = this._proportionallyResizeElements[b];
                    if (!this.borderDif) {
                        this.borderDif = [];
                        a = [d.css("borderTopWidth"),
                            d.css("borderRightWidth"), d.css("borderBottomWidth"), d.css("borderLeftWidth")
                        ];
                        c = [d.css("paddingTop"), d.css("paddingRight"), d.css("paddingBottom"), d.css("paddingLeft")];
                        for (f = 0; f < a.length; f++) this.borderDif[f] = (parseInt(a[f], 10) || 0) + (parseInt(c[f], 10) || 0)
                    }
                    d.css({
                        height: e.height() - this.borderDif[0] - this.borderDif[2] || 0,
                        width: e.width() - this.borderDif[1] - this.borderDif[3] || 0
                    })
                }
            }
        },
        _renderProxy: function() {
            var b = this.options;
            this.elementOffset = this.element.offset();
            this._helper ? (this.helper = this.helper ||
                a("\x3cdiv style\x3d'overflow:hidden;'\x3e\x3c/div\x3e"), this.helper.addClass(this._helper).css({
                    width: this.element.outerWidth() - 1,
                    height: this.element.outerHeight() - 1,
                    position: "absolute",
                    left: this.elementOffset.left + "px",
                    top: this.elementOffset.top + "px",
                    zIndex: ++b.zIndex
                }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
        },
        _change: {
            e: function(b, f) {
                return {
                    width: this.originalSize.width + f
                }
            },
            w: function(b, f) {
                return {
                    left: this.originalPosition.left + f,
                    width: this.originalSize.width -
                        f
                }
            },
            n: function(b, f, a) {
                return {
                    top: this.originalPosition.top + a,
                    height: this.originalSize.height - a
                }
            },
            s: function(b, f, a) {
                return {
                    height: this.originalSize.height + a
                }
            },
            se: function(b, f, c) {
                return a.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [b, f, c]))
            },
            sw: function(b, f, c) {
                return a.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [b, f, c]))
            },
            ne: function(b, f, c) {
                return a.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [b, f, c]))
            },
            nw: function(b, f,
                c) {
                return a.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [b, f, c]))
            }
        },
        _propagate: function(b, f) {
            a.ui.plugin.call(this, b, [f, this.ui()]);
            "resize" !== b && this._trigger(b, f, this.ui())
        },
        plugins: {},
        ui: function() {
            return {
                originalElement: this.originalElement,
                element: this.element,
                helper: this.helper,
                position: this.position,
                size: this.size,
                originalSize: this.originalSize,
                originalPosition: this.originalPosition
            }
        }
    });
    a.ui.plugin.add("resizable", "animate", {
        stop: function(b) {
            var f = a(this).data("ui-resizable"),
                c = f.options,
                d = f._proportionallyResizeElements,
                e = d.length && /textarea/i.test(d[0].nodeName),
                h = e && a.ui.hasScroll(d[0], "left") ? 0 : f.sizeDiff.height,
                e = {
                    width: f.size.width - (e ? 0 : f.sizeDiff.width),
                    height: f.size.height - h
                },
                h = parseInt(f.element.css("left"), 10) + (f.position.left - f.originalPosition.left) || null,
                i = parseInt(f.element.css("top"), 10) + (f.position.top - f.originalPosition.top) || null;
            f.element.animate(a.extend(e, i && h ? {
                top: i,
                left: h
            } : {}), {
                duration: c.animateDuration,
                easing: c.animateEasing,
                step: function() {
                    var c = {
                        width: parseInt(f.element.css("width"), 10),
                        height: parseInt(f.element.css("height"), 10),
                        top: parseInt(f.element.css("top"), 10),
                        left: parseInt(f.element.css("left"), 10)
                    };
                    d && d.length && a(d[0]).css({
                        width: c.width,
                        height: c.height
                    });
                    f._updateCache(c);
                    f._propagate("resize", b)
                }
            })
        }
    });
    a.ui.plugin.add("resizable", "containment", {
        start: function() {
            var b, f, c, d, e, h = a(this).data("ui-resizable"),
                i = h.element;
            c = h.options.containment;
            if (i = c instanceof a ? c.get(0) : /parent/.test(c) ? i.parent().get(0) : c) h.containerElement = a(i),
                /document/.test(c) || c === document ? (h.containerOffset = {
                    left: 0,
                    top: 0
                }, h.containerPosition = {
                    left: 0,
                    top: 0
                }, h.parentData = {
                    element: a(document),
                    left: 0,
                    top: 0,
                    width: a(document).width(),
                    height: a(document).height() || document.body.parentNode.scrollHeight
                }) : (b = a(i), f = [], a(["Top", "Right", "Left", "Bottom"]).each(function(a, c) {
                        f[a] = K(b.css("padding" + c))
                    }), h.containerOffset = b.offset(), h.containerPosition = b.position(), h.containerSize = {
                        height: b.innerHeight() - f[3],
                        width: b.innerWidth() - f[1]
                    }, c = h.containerOffset, d = h.containerSize.height,
                    e = h.containerSize.width, e = a.ui.hasScroll(i, "left") ? i.scrollWidth : e, d = a.ui.hasScroll(i) ? i.scrollHeight : d, h.parentData = {
                        element: i,
                        left: c.left,
                        top: c.top,
                        width: e,
                        height: d
                    })
        },
        resize: function(b) {
            var f, c, d, e, h = a(this).data("ui-resizable");
            f = h.options;
            c = h.containerOffset;
            d = h.position;
            b = h._aspectRatio || b.shiftKey;
            e = {
                top: 0,
                left: 0
            };
            var i = h.containerElement;
            i[0] !== document && /static/.test(i.css("position")) && (e = c);
            if (d.left < (h._helper ? c.left : 0)) h.size.width += h._helper ? h.position.left - c.left : h.position.left - e.left,
                b && (h.size.height = h.size.width / h.aspectRatio), h.position.left = f.helper ? c.left : 0;
            if (d.top < (h._helper ? c.top : 0)) h.size.height += h._helper ? h.position.top - c.top : h.position.top, b && (h.size.width = h.size.height * h.aspectRatio), h.position.top = h._helper ? c.top : 0;
            h.offset.left = h.parentData.left + h.position.left;
            h.offset.top = h.parentData.top + h.position.top;
            f = Math.abs(h.offset.left - e.left + h.sizeDiff.width);
            c = Math.abs((h._helper ? h.offset.top - e.top : h.offset.top - c.top) + h.sizeDiff.height);
            d = h.containerElement.get(0) ===
                h.element.parent().get(0);
            e = /relative|absolute/.test(h.containerElement.css("position"));
            d && e && (f -= h.parentData.left);
            f + h.size.width >= h.parentData.width && (h.size.width = h.parentData.width - f, b && (h.size.height = h.size.width / h.aspectRatio));
            c + h.size.height >= h.parentData.height && (h.size.height = h.parentData.height - c, b && (h.size.width = h.size.height * h.aspectRatio))
        },
        stop: function() {
            var b = a(this).data("ui-resizable"),
                f = b.options,
                c = b.containerOffset,
                d = b.containerPosition,
                e = b.containerElement,
                h = a(b.helper),
                i =
                h.offset(),
                j = h.outerWidth() - b.sizeDiff.width,
                h = h.outerHeight() - b.sizeDiff.height;
            b._helper && (!f.animate && /relative/.test(e.css("position"))) && a(this).css({
                left: i.left - d.left - c.left,
                width: j,
                height: h
            });
            b._helper && (!f.animate && /static/.test(e.css("position"))) && a(this).css({
                left: i.left - d.left - c.left,
                width: j,
                height: h
            })
        }
    });
    a.ui.plugin.add("resizable", "alsoResize", {
        start: function() {
            var b = a(this).data("ui-resizable").options,
                f = function(b) {
                    a(b).each(function() {
                        var b = a(this);
                        b.data("ui-resizable-alsoresize", {
                            width: parseInt(b.width(), 10),
                            height: parseInt(b.height(), 10),
                            left: parseInt(b.css("left"), 10),
                            top: parseInt(b.css("top"), 10)
                        })
                    })
                };
            "object" === typeof b.alsoResize && !b.alsoResize.parentNode ? b.alsoResize.length ? (b.alsoResize = b.alsoResize[0], f(b.alsoResize)) : a.each(b.alsoResize, function(b) {
                f(b)
            }) : f(b.alsoResize)
        },
        resize: function(b, f) {
            var c = a(this).data("ui-resizable"),
                d = c.options,
                e = c.originalSize,
                h = c.originalPosition,
                i = {
                    height: c.size.height - e.height || 0,
                    width: c.size.width - e.width || 0,
                    top: c.position.top - h.top ||
                        0,
                    left: c.position.left - h.left || 0
                },
                j = function(b, c) {
                    a(b).each(function() {
                        var b = a(this),
                            d = a(this).data("ui-resizable-alsoresize"),
                            e = {},
                            m = c && c.length ? c : b.parents(f.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
                        a.each(m, function(b, f) {
                            var a = (d[f] || 0) + (i[f] || 0);
                            a && 0 <= a && (e[f] = a || null)
                        });
                        b.css(e)
                    })
                };
            "object" === typeof d.alsoResize && !d.alsoResize.nodeType ? a.each(d.alsoResize, function(b, f) {
                j(b, f)
            }) : j(d.alsoResize)
        },
        stop: function() {
            a(this).removeData("resizable-alsoresize")
        }
    });
    a.ui.plugin.add("resizable", "ghost", {
        start: function() {
            var b = a(this).data("ui-resizable"),
                f = b.options,
                c = b.size;
            b.ghost = b.originalElement.clone();
            b.ghost.css({
                opacity: 0.25,
                display: "block",
                position: "relative",
                height: c.height,
                width: c.width,
                margin: 0,
                left: 0,
                top: 0
            }).addClass("ui-resizable-ghost").addClass("string" === typeof f.ghost ? f.ghost : "");
            b.ghost.appendTo(b.helper)
        },
        resize: function() {
            var b = a(this).data("ui-resizable");
            b.ghost && b.ghost.css({
                position: "relative",
                height: b.size.height,
                width: b.size.width
            })
        },
        stop: function() {
            var b = a(this).data("ui-resizable");
            b.ghost && b.helper && b.helper.get(0).removeChild(b.ghost.get(0))
        }
    });
    a.ui.plugin.add("resizable", "grid", {
        resize: function() {
            var b = a(this).data("ui-resizable"),
                f = b.options,
                c = b.size,
                d = b.originalSize,
                e = b.originalPosition,
                h = b.axis,
                i = "number" === typeof f.grid ? [f.grid, f.grid] : f.grid,
                j = i[0] || 1,
                g = i[1] || 1,
                n = Math.round((c.width - d.width) / j) * j,
                c = Math.round((c.height - d.height) / g) * g,
                k = d.width + n,
                d = d.height + c,
                p = f.maxWidth && f.maxWidth < k,
                s = f.maxHeight && f.maxHeight < d,
                l =
                f.minWidth && f.minWidth > k,
                o = f.minHeight && f.minHeight > d;
            f.grid = i;
            l && (k += j);
            o && (d += g);
            p && (k -= j);
            s && (d -= g);
            /^(se|s|e)$/.test(h) ? (b.size.width = k, b.size.height = d) : /^(ne)$/.test(h) ? (b.size.width = k, b.size.height = d, b.position.top = e.top - c) : (/^(sw)$/.test(h) ? (b.size.width = k, b.size.height = d) : (b.size.width = k, b.size.height = d, b.position.top = e.top - c), b.position.left = e.left - n)
        }
    });
    a.widget("ui.selectable", a.ui.mouse, {
        version: "1.10.3",
        options: {
            appendTo: "body",
            autoRefresh: !0,
            distance: 0,
            filter: "*",
            tolerance: "touch",
            selected: null,
            selecting: null,
            start: null,
            stop: null,
            unselected: null,
            unselecting: null
        },
        _create: function() {
            var b, f = this;
            this.element.addClass("ui-selectable");
            this.dragged = !1;
            this.refresh = function() {
                b = a(f.options.filter, f.element[0]);
                b.addClass("ui-selectee");
                b.each(function() {
                    var b = a(this),
                        f = b.offset();
                    a.data(this, "selectable-item", {
                        element: this,
                        $element: b,
                        left: f.left,
                        top: f.top,
                        right: f.left + b.outerWidth(),
                        bottom: f.top + b.outerHeight(),
                        startselected: !1,
                        selected: b.hasClass("ui-selected"),
                        selecting: b.hasClass("ui-selecting"),
                        unselecting: b.hasClass("ui-unselecting")
                    })
                })
            };
            this.refresh();
            this.selectees = b.addClass("ui-selectee");
            this._mouseInit();
            this.helper = a("\x3cdiv class\x3d'ui-selectable-helper'\x3e\x3c/div\x3e")
        },
        _destroy: function() {
            this.selectees.removeClass("ui-selectee").removeData("selectable-item");
            this.element.removeClass("ui-selectable ui-selectable-disabled");
            this._mouseDestroy()
        },
        _mouseStart: function(b) {
            var f = this,
                c = this.options;
            this.opos = [b.pageX, b.pageY];
            this.options.disabled || (this.selectees = a(c.filter,
                this.element[0]), this._trigger("start", b), a(c.appendTo).append(this.helper), this.helper.css({
                left: b.pageX,
                top: b.pageY,
                width: 0,
                height: 0
            }), c.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
                var c = a.data(this, "selectable-item");
                c.startselected = !0;
                !b.metaKey && !b.ctrlKey && (c.$element.removeClass("ui-selected"), c.selected = !1, c.$element.addClass("ui-unselecting"), c.unselecting = !0, f._trigger("unselecting", b, {
                    unselecting: c.element
                }))
            }), a(b.target).parents().addBack().each(function() {
                var c,
                    d = a.data(this, "selectable-item");
                if (d) return c = !b.metaKey && !b.ctrlKey || !d.$element.hasClass("ui-selected"), d.$element.removeClass(c ? "ui-unselecting" : "ui-selected").addClass(c ? "ui-selecting" : "ui-unselecting"), d.unselecting = !c, d.selecting = c, (d.selected = c) ? f._trigger("selecting", b, {
                    selecting: d.element
                }) : f._trigger("unselecting", b, {
                    unselecting: d.element
                }), !1
            }))
        },
        _mouseDrag: function(b) {
            this.dragged = !0;
            if (!this.options.disabled) {
                var f, c = this,
                    d = this.options,
                    e = this.opos[0],
                    h = this.opos[1],
                    i = b.pageX,
                    j = b.pageY;
                e > i && (f = i, i = e, e = f);
                h > j && (f = j, j = h, h = f);
                this.helper.css({
                    left: e,
                    top: h,
                    width: i - e,
                    height: j - h
                });
                this.selectees.each(function() {
                    var f = a.data(this, "selectable-item"),
                        g = !1;
                    f && f.element !== c.element[0] && ("touch" === d.tolerance ? g = !(f.left > i || f.right < e || f.top > j || f.bottom < h) : "fit" === d.tolerance && (g = f.left > e && f.right < i && f.top > h && f.bottom < j), g ? (f.selected && (f.$element.removeClass("ui-selected"), f.selected = !1), f.unselecting && (f.$element.removeClass("ui-unselecting"), f.unselecting = !1), f.selecting || (f.$element.addClass("ui-selecting"),
                        f.selecting = !0, c._trigger("selecting", b, {
                            selecting: f.element
                        }))) : (f.selecting && ((b.metaKey || b.ctrlKey) && f.startselected ? (f.$element.removeClass("ui-selecting"), f.selecting = !1, f.$element.addClass("ui-selected"), f.selected = !0) : (f.$element.removeClass("ui-selecting"), f.selecting = !1, f.startselected && (f.$element.addClass("ui-unselecting"), f.unselecting = !0), c._trigger("unselecting", b, {
                        unselecting: f.element
                    }))), f.selected && (!b.metaKey && !b.ctrlKey && !f.startselected) && (f.$element.removeClass("ui-selected"),
                        f.selected = !1, f.$element.addClass("ui-unselecting"), f.unselecting = !0, c._trigger("unselecting", b, {
                            unselecting: f.element
                        }))))
                });
                return !1
            }
        },
        _mouseStop: function(b) {
            var f = this;
            this.dragged = !1;
            a(".ui-unselecting", this.element[0]).each(function() {
                var c = a.data(this, "selectable-item");
                c.$element.removeClass("ui-unselecting");
                c.unselecting = !1;
                c.startselected = !1;
                f._trigger("unselected", b, {
                    unselected: c.element
                })
            });
            a(".ui-selecting", this.element[0]).each(function() {
                var c = a.data(this, "selectable-item");
                c.$element.removeClass("ui-selecting").addClass("ui-selected");
                c.selecting = !1;
                c.selected = !0;
                c.startselected = !0;
                f._trigger("selected", b, {
                    selected: c.element
                })
            });
            this._trigger("stop", b);
            this.helper.remove();
            return !1
        }
    });
    var M = function(b) {
        return /left|right/.test(b.css("float")) || /inline|table-cell/.test(b.css("display"))
    };
    a.widget("ui.sortable", a.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "sort",
        ready: !1,
        options: {
            appendTo: "parent",
            axis: !1,
            connectWith: !1,
            containment: !1,
            cursor: "auto",
            cursorAt: !1,
            dropOnEmpty: !0,
            forcePlaceholderSize: !1,
            forceHelperSize: !1,
            grid: !1,
            handle: !1,
            helper: "original",
            items: "\x3e *",
            opacity: !1,
            placeholder: !1,
            revert: !1,
            scroll: !0,
            scrollSensitivity: 20,
            scrollSpeed: 20,
            scope: "default",
            tolerance: "intersect",
            zIndex: 1E3,
            activate: null,
            beforeStop: null,
            change: null,
            deactivate: null,
            out: null,
            over: null,
            receive: null,
            remove: null,
            sort: null,
            start: null,
            stop: null,
            update: null
        },
        _create: function() {
            var b = this.options;
            this.containerCache = {};
            this.element.addClass("ui-sortable");
            this.refresh();
            this.floating = this.items.length ? "x" === b.axis || M(this.items[0].item) : !1;
            this.offset =
                this.element.offset();
            this._mouseInit();
            this.ready = !0
        },
        _destroy: function() {
            this.element.removeClass("ui-sortable ui-sortable-disabled");
            this._mouseDestroy();
            for (var b = this.items.length - 1; 0 <= b; b--) this.items[b].item.removeData(this.widgetName + "-item");
            return this
        },
        _setOption: function(b, f) {
            "disabled" === b ? (this.options[b] = f, this.widget().toggleClass("ui-sortable-disabled", !!f)) : a.Widget.prototype._setOption.apply(this, arguments)
        },
        _mouseCapture: function(b, f) {
            var c = null,
                d = !1,
                e = this;
            if (this.reverting ||
                this.options.disabled || "static" === this.options.type) return !1;
            this._refreshItems(b);
            a(b.target).parents().each(function() {
                if (a.data(this, e.widgetName + "-item") === e) return c = a(this), !1
            });
            a.data(b.target, e.widgetName + "-item") === e && (c = a(b.target));
            if (!c || this.options.handle && !f && (a(this.options.handle, c).find("*").addBack().each(function() {
                    this === b.target && (d = !0)
                }), !d)) return !1;
            this.currentItem = c;
            this._removeCurrentsFromItems();
            return !0
        },
        _mouseStart: function(b, f, c) {
            var d;
            f = this.options;
            this.currentContainer =
                this;
            this.refreshPositions();
            this.helper = this._createHelper(b);
            this._cacheHelperProportions();
            this._cacheMargins();
            this.scrollParent = this.helper.scrollParent();
            this.offset = this.currentItem.offset();
            this.offset = {
                top: this.offset.top - this.margins.top,
                left: this.offset.left - this.margins.left
            };
            a.extend(this.offset, {
                click: {
                    left: b.pageX - this.offset.left,
                    top: b.pageY - this.offset.top
                },
                parent: this._getParentOffset(),
                relative: this._getRelativeOffset()
            });
            this.helper.css("position", "absolute");
            this.cssPosition =
                this.helper.css("position");
            this.originalPosition = this._generatePosition(b);
            this.originalPageX = b.pageX;
            this.originalPageY = b.pageY;
            f.cursorAt && this._adjustOffsetFromHelper(f.cursorAt);
            this.domPosition = {
                prev: this.currentItem.prev()[0],
                parent: this.currentItem.parent()[0]
            };
            this.helper[0] !== this.currentItem[0] && this.currentItem.hide();
            this._createPlaceholder();
            f.containment && this._setContainment();
            f.cursor && "auto" !== f.cursor && (d = this.document.find("body"), this.storedCursor = d.css("cursor"), d.css("cursor",
                f.cursor), this.storedStylesheet = a("\x3cstyle\x3e*{ cursor: " + f.cursor + " !important; }\x3c/style\x3e").appendTo(d));
            f.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", f.opacity));
            f.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", f.zIndex));
            this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset());
            this._trigger("start",
                b, this._uiHash());
            this._preserveHelperProportions || this._cacheHelperProportions();
            if (!c)
                for (c = this.containers.length - 1; 0 <= c; c--) this.containers[c]._trigger("activate", b, this._uiHash(this));
            a.ui.ddmanager && (a.ui.ddmanager.current = this);
            a.ui.ddmanager && !f.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b);
            this.dragging = !0;
            this.helper.addClass("ui-sortable-helper");
            this._mouseDrag(b);
            return !0
        },
        _mouseDrag: function(b) {
            var f, c, d, e;
            f = this.options;
            c = !1;
            this.position = this._generatePosition(b);
            this.positionAbs =
                this._convertPositionTo("absolute");
            this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs);
            this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - b.pageY < f.scrollSensitivity ? this.scrollParent[0].scrollTop = c = this.scrollParent[0].scrollTop + f.scrollSpeed : b.pageY - this.overflowOffset.top < f.scrollSensitivity && (this.scrollParent[0].scrollTop = c = this.scrollParent[0].scrollTop - f.scrollSpeed), this.overflowOffset.left +
                this.scrollParent[0].offsetWidth - b.pageX < f.scrollSensitivity ? this.scrollParent[0].scrollLeft = c = this.scrollParent[0].scrollLeft + f.scrollSpeed : b.pageX - this.overflowOffset.left < f.scrollSensitivity && (this.scrollParent[0].scrollLeft = c = this.scrollParent[0].scrollLeft - f.scrollSpeed)) : (b.pageY - a(document).scrollTop() < f.scrollSensitivity ? c = a(document).scrollTop(a(document).scrollTop() - f.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < f.scrollSensitivity && (c = a(document).scrollTop(a(document).scrollTop() +
                f.scrollSpeed)), b.pageX - a(document).scrollLeft() < f.scrollSensitivity ? c = a(document).scrollLeft(a(document).scrollLeft() - f.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < f.scrollSensitivity && (c = a(document).scrollLeft(a(document).scrollLeft() + f.scrollSpeed))), !1 !== c && (a.ui.ddmanager && !f.dropBehaviour) && a.ui.ddmanager.prepareOffsets(this, b));
            this.positionAbs = this._convertPositionTo("absolute");
            if (!this.options.axis || "y" !== this.options.axis) this.helper[0].style.left = this.position.left +
                "px";
            if (!this.options.axis || "x" !== this.options.axis) this.helper[0].style.top = this.position.top + "px";
            for (f = this.items.length - 1; 0 <= f; f--)
                if (c = this.items[f], d = c.item[0], (e = this._intersectsWithPointer(c)) && c.instance === this.currentContainer && d !== this.currentItem[0] && this.placeholder[1 === e ? "next" : "prev"]()[0] !== d && !a.contains(this.placeholder[0], d) && ("semi-dynamic" === this.options.type ? !a.contains(this.element[0], d) : 1)) {
                    this.direction = 1 === e ? "down" : "up";
                    if ("pointer" === this.options.tolerance || this._intersectsWithSides(c)) this._rearrange(b,
                        c);
                    else break;
                    this._trigger("change", b, this._uiHash());
                    break
                }
            this._contactContainers(b);
            a.ui.ddmanager && a.ui.ddmanager.drag(this, b);
            this._trigger("sort", b, this._uiHash());
            this.lastPositionAbs = this.positionAbs;
            return !1
        },
        _mouseStop: function(b, f) {
            if (b) {
                a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, b);
                if (this.options.revert) {
                    var c = this,
                        d = this.placeholder.offset(),
                        e = this.options.axis,
                        h = {};
                    if (!e || "x" === e) h.left = d.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] ===
                        document.body ? 0 : this.offsetParent[0].scrollLeft);
                    if (!e || "y" === e) h.top = d.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop);
                    this.reverting = !0;
                    a(this.helper).animate(h, parseInt(this.options.revert, 10) || 500, function() {
                        c._clear(b)
                    })
                } else this._clear(b, f);
                return !1
            }
        },
        cancel: function() {
            if (this.dragging) {
                this._mouseUp({
                    target: null
                });
                "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                for (var b = this.containers.length - 1; 0 <= b; b--) this.containers[b]._trigger("deactivate", null, this._uiHash(this)), this.containers[b].containerCache.over && (this.containers[b]._trigger("out", null, this._uiHash(this)), this.containers[b].containerCache.over = 0)
            }
            this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && (this.helper && this.helper[0].parentNode) && this.helper.remove(), a.extend(this, {
                helper: null,
                dragging: !1,
                reverting: !1,
                _noFinalSort: null
            }), this.domPosition.prev ? a(this.domPosition.prev).after(this.currentItem) : a(this.domPosition.parent).prepend(this.currentItem));
            return this
        },
        serialize: function(b) {
            var f = this._getItemsAsjQuery(b && b.connected),
                c = [];
            b = b || {};
            a(f).each(function() {
                var f = (a(b.item || this).attr(b.attribute || "id") || "").match(b.expression || /(.+)[\-=_](.+)/);
                f && c.push((b.key || f[1] + "[]") + "\x3d" + (b.key && b.expression ? f[1] : f[2]))
            });
            !c.length && b.key && c.push(b.key + "\x3d");
            return c.join("\x26")
        },
        toArray: function(b) {
            var f =
                this._getItemsAsjQuery(b && b.connected),
                c = [];
            b = b || {};
            f.each(function() {
                c.push(a(b.item || this).attr(b.attribute || "id") || "")
            });
            return c
        },
        _intersectsWith: function(b) {
            var f = this.positionAbs.left,
                a = f + this.helperProportions.width,
                c = this.positionAbs.top,
                d = c + this.helperProportions.height,
                e = b.left,
                h = e + b.width,
                i = b.top,
                j = i + b.height,
                g = this.offset.click.top,
                n = this.offset.click.left,
                n = "y" === this.options.axis || f + n > e && f + n < h,
                g = ("x" === this.options.axis || c + g > i && c + g < j) && n;
            return "pointer" === this.options.tolerance || this.options.forcePointerForContainers ||
                "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > b[this.floating ? "width" : "height"] ? g : e < f + this.helperProportions.width / 2 && a - this.helperProportions.width / 2 < h && i < c + this.helperProportions.height / 2 && d - this.helperProportions.height / 2 < j
        },
        _intersectsWithPointer: function(b) {
            var f = "y" === this.options.axis || this.positionAbs.left + this.offset.click.left > b.left && this.positionAbs.left + this.offset.click.left < b.left + b.width;
            b = ("x" === this.options.axis || this.positionAbs.top +
                this.offset.click.top > b.top && this.positionAbs.top + this.offset.click.top < b.top + b.height) && f;
            var f = this._getDragVerticalDirection(),
                a = this._getDragHorizontalDirection();
            return !b ? !1 : this.floating ? a && "right" === a || "down" === f ? 2 : 1 : f && ("down" === f ? 2 : 1)
        },
        _intersectsWithSides: function(b) {
            var f = this.positionAbs.top + this.offset.click.top > b.top + b.height / 2 && this.positionAbs.top + this.offset.click.top < b.top + b.height / 2 + b.height;
            b = this.positionAbs.left + this.offset.click.left > b.left + b.width / 2 && this.positionAbs.left +
                this.offset.click.left < b.left + b.width / 2 + b.width;
            var a = this._getDragVerticalDirection(),
                c = this._getDragHorizontalDirection();
            return this.floating && c ? "right" === c && b || "left" === c && !b : a && ("down" === a && f || "up" === a && !f)
        },
        _getDragVerticalDirection: function() {
            var b = this.positionAbs.top - this.lastPositionAbs.top;
            return 0 !== b && (0 < b ? "down" : "up")
        },
        _getDragHorizontalDirection: function() {
            var b = this.positionAbs.left - this.lastPositionAbs.left;
            return 0 !== b && (0 < b ? "right" : "left")
        },
        refresh: function(b) {
            this._refreshItems(b);
            this.refreshPositions();
            return this
        },
        _connectWith: function() {
            var b = this.options;
            return b.connectWith.constructor === String ? [b.connectWith] : b.connectWith
        },
        _getItemsAsjQuery: function(b) {
            var f, c, d, e = [],
                h = [],
                i = this._connectWith();
            if (i && b)
                for (b = i.length - 1; 0 <= b; b--) {
                    c = a(i[b]);
                    for (f = c.length - 1; 0 <= f; f--)(d = a.data(c[f], this.widgetFullName)) && (d !== this && !d.options.disabled) && h.push([a.isFunction(d.options.items) ? d.options.items.call(d.element) : a(d.options.items, d.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),
                        d
                    ])
                }
            h.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                options: this.options,
                item: this.currentItem
            }) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
            for (b = h.length - 1; 0 <= b; b--) h[b][0].each(function() {
                e.push(this)
            });
            return a(e)
        },
        _removeCurrentsFromItems: function() {
            var b = this.currentItem.find(":data(" + this.widgetName + "-item)");
            this.items = a.grep(this.items, function(f) {
                for (var a = 0; a < b.length; a++)
                    if (b[a] === f.item[0]) return !1;
                return !0
            })
        },
        _refreshItems: function(b) {
            this.items = [];
            this.containers = [this];
            var f, c, d, e, h, i = this.items,
                j = [
                    [a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, {
                        item: this.currentItem
                    }) : a(this.options.items, this.element), this]
                ];
            if ((h = this._connectWith()) && this.ready)
                for (f = h.length - 1; 0 <= f; f--) {
                    d = a(h[f]);
                    for (c = d.length - 1; 0 <= c; c--)
                        if ((e = a.data(d[c], this.widgetFullName)) && e !== this && !e.options.disabled) j.push([a.isFunction(e.options.items) ? e.options.items.call(e.element[0], b, {
                                item: this.currentItem
                            }) :
                            a(e.options.items, e.element), e
                        ]), this.containers.push(e)
                }
            for (f = j.length - 1; 0 <= f; f--) {
                b = j[f][1];
                d = j[f][0];
                c = 0;
                for (h = d.length; c < h; c++) e = a(d[c]), e.data(this.widgetName + "-item", b), i.push({
                    item: e,
                    instance: b,
                    width: 0,
                    height: 0,
                    left: 0,
                    top: 0
                })
            }
        },
        refreshPositions: function(b) {
            this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
            var f, c, d;
            for (f = this.items.length - 1; 0 <= f; f--) c = this.items[f], c.instance !== this.currentContainer && this.currentContainer && c.item[0] !== this.currentItem[0] || (d = this.options.toleranceElement ?
                a(this.options.toleranceElement, c.item) : c.item, b || (c.width = d.outerWidth(), c.height = d.outerHeight()), d = d.offset(), c.left = d.left, c.top = d.top);
            if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
            else
                for (f = this.containers.length - 1; 0 <= f; f--) d = this.containers[f].element.offset(), this.containers[f].containerCache.left = d.left, this.containers[f].containerCache.top = d.top, this.containers[f].containerCache.width = this.containers[f].element.outerWidth(),
                    this.containers[f].containerCache.height = this.containers[f].element.outerHeight();
            return this
        },
        _createPlaceholder: function(b) {
            b = b || this;
            var f, c = b.options;
            if (!c.placeholder || c.placeholder.constructor === String) f = c.placeholder, c.placeholder = {
                element: function() {
                    var c = b.currentItem[0].nodeName.toLowerCase(),
                        d = a("\x3c" + c + "\x3e", b.document[0]).addClass(f || b.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                    "tr" === c ? b.currentItem.children().each(function() {
                        a("\x3ctd\x3e\x26#160;\x3c/td\x3e",
                            b.document[0]).attr("colspan", a(this).attr("colspan") || 1).appendTo(d)
                    }) : "img" === c && d.attr("src", b.currentItem.attr("src"));
                    f || d.css("visibility", "hidden");
                    return d
                },
                update: function(a, d) {
                    if (!f || c.forcePlaceholderSize) d.height() || d.height(b.currentItem.innerHeight() - parseInt(b.currentItem.css("paddingTop") || 0, 10) - parseInt(b.currentItem.css("paddingBottom") || 0, 10)), d.width() || d.width(b.currentItem.innerWidth() - parseInt(b.currentItem.css("paddingLeft") || 0, 10) - parseInt(b.currentItem.css("paddingRight") ||
                        0, 10))
                }
            };
            b.placeholder = a(c.placeholder.element.call(b.element, b.currentItem));
            b.currentItem.after(b.placeholder);
            c.placeholder.update(b, b.placeholder)
        },
        _contactContainers: function(b) {
            var f, c, d, e, h, i, j, g, n, k = c = null;
            for (f = this.containers.length - 1; 0 <= f; f--)
                if (!a.contains(this.currentItem[0], this.containers[f].element[0]))
                    if (this._intersectsWith(this.containers[f].containerCache)) {
                        if (!c || !a.contains(this.containers[f].element[0], c.element[0])) c = this.containers[f], k = f
                    } else this.containers[f].containerCache.over &&
                        (this.containers[f]._trigger("out", b, this._uiHash(this)), this.containers[f].containerCache.over = 0);
            if (c)
                if (1 === this.containers.length) this.containers[k].containerCache.over || (this.containers[k]._trigger("over", b, this._uiHash(this)), this.containers[k].containerCache.over = 1);
                else {
                    f = 1E4;
                    d = null;
                    e = (n = c.floating || M(this.currentItem)) ? "left" : "top";
                    h = n ? "width" : "height";
                    i = this.positionAbs[e] + this.offset.click[e];
                    for (c = this.items.length - 1; 0 <= c; c--)
                        if (a.contains(this.containers[k].element[0], this.items[c].item[0]) &&
                            this.items[c].item[0] !== this.currentItem[0] && (!n || this.positionAbs.top + this.offset.click.top > this.items[c].top && this.positionAbs.top + this.offset.click.top < this.items[c].top + this.items[c].height)) j = this.items[c].item.offset()[e], g = !1, Math.abs(j - i) > Math.abs(j + this.items[c][h] - i) && (g = !0, j += this.items[c][h]), Math.abs(j - i) < f && (f = Math.abs(j - i), d = this.items[c], this.direction = g ? "up" : "down");
                    if ((d || this.options.dropOnEmpty) && this.currentContainer !== this.containers[k]) d ? this._rearrange(b, d, null, !0) : this._rearrange(b,
                        null, this.containers[k].element, !0), this._trigger("change", b, this._uiHash()), this.containers[k]._trigger("change", b, this._uiHash(this)), this.currentContainer = this.containers[k], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[k]._trigger("over", b, this._uiHash(this)), this.containers[k].containerCache.over = 1
                }
        },
        _createHelper: function(b) {
            var f = this.options;
            b = a.isFunction(f.helper) ? a(f.helper.apply(this.element[0], [b, this.currentItem])) : "clone" === f.helper ? this.currentItem.clone() :
                this.currentItem;
            b.parents("body").length || a("parent" !== f.appendTo ? f.appendTo : this.currentItem[0].parentNode)[0].appendChild(b[0]);
            b[0] === this.currentItem[0] && (this._storedCSS = {
                width: this.currentItem[0].style.width,
                height: this.currentItem[0].style.height,
                position: this.currentItem.css("position"),
                top: this.currentItem.css("top"),
                left: this.currentItem.css("left")
            });
            (!b[0].style.width || f.forceHelperSize) && b.width(this.currentItem.width());
            (!b[0].style.height || f.forceHelperSize) && b.height(this.currentItem.height());
            return b
        },
        _adjustOffsetFromHelper: function(b) {
            "string" === typeof b && (b = b.split(" "));
            a.isArray(b) && (b = {
                left: +b[0],
                top: +b[1] || 0
            });
            "left" in b && (this.offset.click.left = b.left + this.margins.left);
            "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left);
            "top" in b && (this.offset.click.top = b.top + this.margins.top);
            "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
        },
        _getParentOffset: function() {
            this.offsetParent = this.helper.offsetParent();
            var b = this.offsetParent.offset();
            "absolute" === this.cssPosition && (this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0])) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop());
            if (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && a.ui.ie) b = {
                top: 0,
                left: 0
            };
            return {
                top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"),
                    10) || 0)
            }
        },
        _getRelativeOffset: function() {
            if ("relative" === this.cssPosition) {
                var b = this.currentItem.position();
                return {
                    top: b.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                    left: b.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                }
            }
            return {
                top: 0,
                left: 0
            }
        },
        _cacheMargins: function() {
            this.margins = {
                left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                top: parseInt(this.currentItem.css("marginTop"), 10) || 0
            }
        },
        _cacheHelperProportions: function() {
            this.helperProportions = {
                width: this.helper.outerWidth(),
                height: this.helper.outerHeight()
            }
        },
        _setContainment: function() {
            var b, f, c;
            f = this.options;
            "parent" === f.containment && (f.containment = this.helper[0].parentNode);
            if ("document" === f.containment || "window" === f.containment) this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a("document" === f.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (a("document" === f.containment ? document :
                window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top];
            /^(document|window|parent)$/.test(f.containment) || (b = a(f.containment)[0], f = a(f.containment).offset(), c = "hidden" !== a(b).css("overflow"), this.containment = [f.left + (parseInt(a(b).css("borderLeftWidth"), 10) || 0) + (parseInt(a(b).css("paddingLeft"), 10) || 0) - this.margins.left, f.top + (parseInt(a(b).css("borderTopWidth"), 10) || 0) + (parseInt(a(b).css("paddingTop"), 10) || 0) - this.margins.top, f.left + (c ? Math.max(b.scrollWidth,
                b.offsetWidth) : b.offsetWidth) - (parseInt(a(b).css("borderLeftWidth"), 10) || 0) - (parseInt(a(b).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, f.top + (c ? Math.max(b.scrollHeight, b.offsetHeight) : b.offsetHeight) - (parseInt(a(b).css("borderTopWidth"), 10) || 0) - (parseInt(a(b).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
        },
        _convertPositionTo: function(b, f) {
            f || (f = this.position);
            var c = "absolute" === b ? 1 : -1,
                d = "absolute" === this.cssPosition && !(this.scrollParent[0] !==
                    document && a.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                e = /(html|body)/i.test(d[0].tagName);
            return {
                top: f.top + this.offset.relative.top * c + this.offset.parent.top * c - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : e ? 0 : d.scrollTop()) * c,
                left: f.left + this.offset.relative.left * c + this.offset.parent.left * c - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : e ? 0 : d.scrollLeft()) * c
            }
        },
        _generatePosition: function(b) {
            var f, c, d = this.options;
            c = b.pageX;
            f =
                b.pageY;
            var e = "absolute" === this.cssPosition && !(this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
                h = /(html|body)/i.test(e[0].tagName);
            "relative" === this.cssPosition && !(this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0]) && (this.offset.relative = this._getRelativeOffset());
            this.originalPosition && (this.containment && (b.pageX - this.offset.click.left < this.containment[0] && (c = this.containment[0] + this.offset.click.left),
                b.pageY - this.offset.click.top < this.containment[1] && (f = this.containment[1] + this.offset.click.top), b.pageX - this.offset.click.left > this.containment[2] && (c = this.containment[2] + this.offset.click.left), b.pageY - this.offset.click.top > this.containment[3] && (f = this.containment[3] + this.offset.click.top)), d.grid && (f = this.originalPageY + Math.round((f - this.originalPageY) / d.grid[1]) * d.grid[1], f = this.containment ? f - this.offset.click.top >= this.containment[1] && f - this.offset.click.top <= this.containment[3] ? f : f - this.offset.click.top >=
                this.containment[1] ? f - d.grid[1] : f + d.grid[1] : f, c = this.originalPageX + Math.round((c - this.originalPageX) / d.grid[0]) * d.grid[0], c = this.containment ? c - this.offset.click.left >= this.containment[0] && c - this.offset.click.left <= this.containment[2] ? c : c - this.offset.click.left >= this.containment[0] ? c - d.grid[0] : c + d.grid[0] : c));
            return {
                top: f - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : h ? 0 : e.scrollTop()),
                left: c - this.offset.click.left -
                    this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : h ? 0 : e.scrollLeft())
            }
        },
        _rearrange: function(b, f, a, c) {
            a ? a[0].appendChild(this.placeholder[0]) : f.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? f.item[0] : f.item[0].nextSibling);
            var d = this.counter = this.counter ? ++this.counter : 1;
            this._delay(function() {
                d === this.counter && this.refreshPositions(!c)
            })
        },
        _clear: function(b, f) {
            this.reverting = !1;
            var a, c = [];
            !this._noFinalSort &&
                this.currentItem.parent().length && this.placeholder.before(this.currentItem);
            this._noFinalSort = null;
            if (this.helper[0] === this.currentItem[0]) {
                for (a in this._storedCSS)
                    if ("auto" === this._storedCSS[a] || "static" === this._storedCSS[a]) this._storedCSS[a] = "";
                this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
            } else this.currentItem.show();
            this.fromOutside && !f && c.push(function(b) {
                this._trigger("receive", b, this._uiHash(this.fromOutside))
            });
            (this.fromOutside || this.domPosition.prev !== this.currentItem.prev().not(".ui-sortable-helper")[0] ||
                this.domPosition.parent !== this.currentItem.parent()[0]) && !f && c.push(function(b) {
                this._trigger("update", b, this._uiHash())
            });
            this !== this.currentContainer && !f && (c.push(function(b) {
                this._trigger("remove", b, this._uiHash())
            }), c.push(function(b) {
                return function(f) {
                    b._trigger("receive", f, this._uiHash(this))
                }
            }.call(this, this.currentContainer)), c.push(function(b) {
                return function(f) {
                    b._trigger("update", f, this._uiHash(this))
                }
            }.call(this, this.currentContainer)));
            for (a = this.containers.length - 1; 0 <= a; a--) f || c.push(function(b) {
                return function(f) {
                    b._trigger("deactivate",
                        f, this._uiHash(this))
                }
            }.call(this, this.containers[a])), this.containers[a].containerCache.over && (c.push(function(b) {
                return function(f) {
                    b._trigger("out", f, this._uiHash(this))
                }
            }.call(this, this.containers[a])), this.containers[a].containerCache.over = 0);
            this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove());
            this._storedOpacity && this.helper.css("opacity", this._storedOpacity);
            this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" :
                this._storedZIndex);
            this.dragging = !1;
            if (this.cancelHelperRemoval) {
                if (!f) {
                    this._trigger("beforeStop", b, this._uiHash());
                    for (a = 0; a < c.length; a++) c[a].call(this, b);
                    this._trigger("stop", b, this._uiHash())
                }
                return this.fromOutside = !1
            }
            f || this._trigger("beforeStop", b, this._uiHash());
            this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
            this.helper[0] !== this.currentItem[0] && this.helper.remove();
            this.helper = null;
            if (!f) {
                for (a = 0; a < c.length; a++) c[a].call(this, b);
                this._trigger("stop", b, this._uiHash())
            }
            this.fromOutside = !1;
            return !0
        },
        _trigger: function() {
            !1 === a.Widget.prototype._trigger.apply(this, arguments) && this.cancel()
        },
        _uiHash: function(b) {
            var f = b || this;
            return {
                helper: f.helper,
                placeholder: f.placeholder || a([]),
                position: f.position,
                originalPosition: f.originalPosition,
                offset: f.positionAbs,
                item: f.currentItem,
                sender: b ? b.element : null
            }
        }
    });
    var L, N, O, H, T = function() {
            var b = a(this);
            setTimeout(function() {
                b.find(":ui-button").button("refresh")
            }, 1)
        },
        P = function(b) {
            var f = b.name,
                c = b.form,
                d = a([]);
            f && (f = f.replace(/'/g, "\\'"), d = c ? a(c).find("[name\x3d'" +
                f + "']") : a("[name\x3d'" + f + "']", b.ownerDocument).filter(function() {
                return !this.form
            }));
            return d
        };
    a.widget("ui.button", {
        version: "1.10.3",
        defaultElement: "\x3cbutton\x3e",
        options: {
            disabled: null,
            text: !0,
            label: null,
            icons: {
                primary: null,
                secondary: null
            }
        },
        _create: function() {
            this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, T);
            "boolean" !== typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled);
            this._determineButtonType();
            this.hasTitle = !!this.buttonElement.attr("title");
            var b = this,
                f = this.options,
                c = "checkbox" === this.type || "radio" === this.type,
                d = !c ? "ui-state-active" : "";
            null === f.label && (f.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html());
            this._hoverable(this.buttonElement);
            this.buttonElement.addClass("ui-button ui-widget ui-state-default ui-corner-all").attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
                f.disabled || this === L && a(this).addClass("ui-state-active")
            }).bind("mouseleave" +
                this.eventNamespace,
                function() {
                    f.disabled || a(this).removeClass(d)
                }).bind("click" + this.eventNamespace, function(b) {
                f.disabled && (b.preventDefault(), b.stopImmediatePropagation())
            });
            this.element.bind("focus" + this.eventNamespace, function() {
                b.buttonElement.addClass("ui-state-focus")
            }).bind("blur" + this.eventNamespace, function() {
                b.buttonElement.removeClass("ui-state-focus")
            });
            c && (this.element.bind("change" + this.eventNamespace, function() {
                H || b.refresh()
            }), this.buttonElement.bind("mousedown" + this.eventNamespace,
                function(b) {
                    f.disabled || (H = !1, N = b.pageX, O = b.pageY)
                }).bind("mouseup" + this.eventNamespace, function(b) {
                if (!f.disabled && (N !== b.pageX || O !== b.pageY)) H = !0
            }));
            "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                if (f.disabled || H) return !1
            }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
                if (f.disabled || H) return !1;
                a(this).addClass("ui-state-active");
                b.buttonElement.attr("aria-pressed", "true");
                var c = b.element[0];
                P(c).not(c).map(function() {
                    return a(this).button("widget")[0]
                }).removeClass("ui-state-active").attr("aria-pressed",
                    "false")
            }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
                if (f.disabled) return !1;
                a(this).addClass("ui-state-active");
                L = this;
                b.document.one("mouseup", function() {
                    L = null
                })
            }).bind("mouseup" + this.eventNamespace, function() {
                if (f.disabled) return !1;
                a(this).removeClass("ui-state-active")
            }).bind("keydown" + this.eventNamespace, function(b) {
                if (f.disabled) return !1;
                (b.keyCode === a.ui.keyCode.SPACE || b.keyCode === a.ui.keyCode.ENTER) && a(this).addClass("ui-state-active")
            }).bind("keyup" + this.eventNamespace +
                " blur" + this.eventNamespace,
                function() {
                    a(this).removeClass("ui-state-active")
                }), this.buttonElement.is("a") && this.buttonElement.keyup(function(b) {
                b.keyCode === a.ui.keyCode.SPACE && a(this).click()
            }));
            this._setOption("disabled", f.disabled);
            this._resetButton()
        },
        _determineButtonType: function() {
            var b, f;
            this.type = this.element.is("[type\x3dcheckbox]") ? "checkbox" : this.element.is("[type\x3dradio]") ? "radio" : this.element.is("input") ? "input" : "button";
            "checkbox" === this.type || "radio" === this.type ? (b = this.element.parents().last(),
                f = "label[for\x3d'" + this.element.attr("id") + "']", this.buttonElement = b.find(f), this.buttonElement.length || (b = b.length ? b.siblings() : this.element.siblings(), this.buttonElement = b.filter(f), this.buttonElement.length || (this.buttonElement = b.find(f))), this.element.addClass("ui-helper-hidden-accessible"), (b = this.element.is(":checked")) && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", b)) : this.buttonElement = this.element
        },
        widget: function() {
            return this.buttonElement
        },
        _destroy: function() {
            this.element.removeClass("ui-helper-hidden-accessible");
            this.buttonElement.removeClass("ui-button ui-widget ui-state-default ui-corner-all ui-state-hover ui-state-active  ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only").removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html());
            this.hasTitle || this.buttonElement.removeAttr("title")
        },
        _setOption: function(b, f) {
            this._super(b, f);
            "disabled" === b ? f ? this.element.prop("disabled", !0) : this.element.prop("disabled", !1) : this._resetButton()
        },
        refresh: function() {
            var b = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
            b !== this.options.disabled && this._setOption("disabled", b);
            "radio" === this.type ? P(this.element[0]).each(function() {
                    a(this).is(":checked") ? a(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
                }) : "checkbox" ===
                this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
        },
        _resetButton: function() {
            if ("input" === this.type) this.options.label && this.element.val(this.options.label);
            else {
                var b = this.buttonElement.removeClass("ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only"),
                    f = a("\x3cspan\x3e\x3c/span\x3e",
                        this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(),
                    c = this.options.icons,
                    d = c.primary && c.secondary,
                    e = [];
                c.primary || c.secondary ? (this.options.text && e.push("ui-button-text-icon" + (d ? "s" : c.primary ? "-primary" : "-secondary")), c.primary && b.prepend("\x3cspan class\x3d'ui-button-icon-primary ui-icon " + c.primary + "'\x3e\x3c/span\x3e"), c.secondary && b.append("\x3cspan class\x3d'ui-button-icon-secondary ui-icon " + c.secondary + "'\x3e\x3c/span\x3e"), this.options.text || (e.push(d ?
                    "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || b.attr("title", a.trim(f)))) : e.push("ui-button-text-only");
                b.addClass(e.join(" "))
            }
        }
    });
    a.widget("ui.buttonset", {
        version: "1.10.3",
        options: {
            items: "button, input[type\x3dbutton], input[type\x3dsubmit], input[type\x3dreset], input[type\x3dcheckbox], input[type\x3dradio], a, :data(ui-button)"
        },
        _create: function() {
            this.element.addClass("ui-buttonset")
        },
        _init: function() {
            this.refresh()
        },
        _setOption: function(b, f) {
            "disabled" === b && this.buttons.button("option",
                b, f);
            this._super(b, f)
        },
        refresh: function() {
            var b = "rtl" === this.element.css("direction");
            this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
                return a(this).button("widget")[0]
            }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(b ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(b ? "ui-corner-left" : "ui-corner-right").end().end()
        },
        _destroy: function() {
            this.element.removeClass("ui-buttonset");
            this.buttons.map(function() {
                return a(this).button("widget")[0]
            }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
        }
    });
    var t = a,
        U = {
            buttons: !0,
            height: !0,
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0,
            width: !0
        },
        V = {
            maxHeight: !0,
            maxWidth: !0,
            minHeight: !0,
            minWidth: !0
        };
    t.widget("ui.dialog", {
        version: "1.10.3",
        options: {
            appendTo: "body",
            autoOpen: !0,
            buttons: [],
            closeOnEscape: !0,
            closeText: "close",
            dialogClass: "",
            draggable: !0,
            hide: null,
            height: "auto",
            maxHeight: null,
            maxWidth: null,
            minHeight: 150,
            minWidth: 150,
            modal: !1,
            position: {
                my: "center",
                at: "center",
                of: window,
                collision: "fit",
                using: function(b) {
                    var f = t(this).css(b).offset().top;
                    0 > f && t(this).css("top", b.top - f)
                }
            },
            resizable: !0,
            show: null,
            title: null,
            width: 300,
            beforeClose: null,
            close: null,
            drag: null,
            dragStart: null,
            dragStop: null,
            focus: null,
            open: null,
            resize: null,
            resizeStart: null,
            resizeStop: null
        },
        _create: function() {
            this.originalCss = {
                display: this.element[0].style.display,
                width: this.element[0].style.width,
                minHeight: this.element[0].style.minHeight,
                maxHeight: this.element[0].style.maxHeight,
                height: this.element[0].style.height
            };
            this.originalPosition = {
                parent: this.element.parent(),
                index: this.element.parent().children().index(this.element)
            };
            this.originalTitle = this.element.attr("title");
            this.options.title = this.options.title || this.originalTitle;
            this._createWrapper();
            this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog);
            this._createTitlebar();
            this._createButtonPane();
            this.options.draggable && t.fn.draggable && this._makeDraggable();
            this.options.resizable &&
                t.fn.resizable && this._makeResizable();
            this._isOpen = !1
        },
        _init: function() {
            this.options.autoOpen && this.open()
        },
        _appendTo: function() {
            var b = this.options.appendTo;
            return b && (b.jquery || b.nodeType) ? t(b) : this.document.find(b || "body").eq(0)
        },
        _destroy: function() {
            var b, f = this.originalPosition;
            this._destroyOverlay();
            this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach();
            this.uiDialog.stop(!0, !0).remove();
            this.originalTitle && this.element.attr("title", this.originalTitle);
            b = f.parent.children().eq(f.index);
            b.length && b[0] !== this.element[0] ? b.before(this.element) : f.parent.append(this.element)
        },
        widget: function() {
            return this.uiDialog
        },
        disable: t.noop,
        enable: t.noop,
        close: function(b) {
            var f = this;
            this._isOpen && !1 !== this._trigger("beforeClose", b) && (this._isOpen = !1, this._destroyOverlay(), this.opener.filter(":focusable").focus().length || t(this.document[0].activeElement).blur(), this._hide(this.uiDialog, this.options.hide, function() {
                f._trigger("close", b)
            }))
        },
        isOpen: function() {
            return this._isOpen
        },
        moveToTop: function() {
            this._moveToTop()
        },
        _moveToTop: function(b, f) {
            var a = !!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;
            a && !f && this._trigger("focus", b);
            return a
        },
        open: function() {
            var b = this;
            this._isOpen ? this._moveToTop() && this._focusTabbable() : (this._isOpen = !0, this.opener = t(this.document[0].activeElement), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this._show(this.uiDialog, this.options.show, function() {
                b._focusTabbable();
                b._trigger("focus")
            }), this._trigger("open"))
        },
        _focusTabbable: function() {
            var b = this.element.find("[autofocus]");
            b.length || (b = this.element.find(":tabbable"));
            b.length || (b = this.uiDialogButtonPane.find(":tabbable"));
            b.length || (b = this.uiDialogTitlebarClose.filter(":tabbable"));
            b.length || (b = this.uiDialog);
            b.eq(0).focus()
        },
        _keepFocus: function(b) {
            function f() {
                var b = this.document[0].activeElement;
                this.uiDialog[0] === b || t.contains(this.uiDialog[0], b) || this._focusTabbable()
            }
            b.preventDefault();
            f.call(this);
            this._delay(f)
        },
        _createWrapper: function() {
            this.uiDialog =
                t("\x3cdiv\x3e").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
                    tabIndex: -1,
                    role: "dialog"
                }).appendTo(this._appendTo());
            this._on(this.uiDialog, {
                keydown: function(b) {
                    if (this.options.closeOnEscape && !b.isDefaultPrevented() && b.keyCode && b.keyCode === t.ui.keyCode.ESCAPE) b.preventDefault(), this.close(b);
                    else if (b.keyCode === t.ui.keyCode.TAB) {
                        var f = this.uiDialog.find(":tabbable"),
                            a = f.filter(":first"),
                            f = f.filter(":last");
                        if ((b.target === f[0] || b.target ===
                                this.uiDialog[0]) && !b.shiftKey) a.focus(1), b.preventDefault();
                        else if ((b.target === a[0] || b.target === this.uiDialog[0]) && b.shiftKey) f.focus(1), b.preventDefault()
                    }
                },
                mousedown: function(b) {
                    this._moveToTop(b) && this._focusTabbable()
                }
            });
            this.element.find("[aria-describedby]").length || this.uiDialog.attr({
                "aria-describedby": this.element.uniqueId().attr("id")
            })
        },
        _createTitlebar: function() {
            var b;
            this.uiDialogTitlebar = t("\x3cdiv\x3e").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog);
            this._on(this.uiDialogTitlebar, {
                mousedown: function(b) {
                    t(b.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus()
                }
            });
            this.uiDialogTitlebarClose = t("\x3cbutton\x3e\x3c/button\x3e").button({
                label: this.options.closeText,
                icons: {
                    primary: "ui-icon-closethick"
                },
                text: !1
            }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar);
            this._on(this.uiDialogTitlebarClose, {
                click: function(b) {
                    b.preventDefault();
                    this.close(b)
                }
            });
            b = t("\x3cspan\x3e").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar);
            this._title(b);
            this.uiDialog.attr({
                "aria-labelledby": b.attr("id")
            })
        },
        _title: function(b) {
            this.options.title || b.html("\x26#160;");
            b.text(this.options.title)
        },
        _createButtonPane: function() {
            this.uiDialogButtonPane = t("\x3cdiv\x3e").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");
            this.uiButtonSet = t("\x3cdiv\x3e").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane);
            this._createButtons()
        },
        _createButtons: function() {
            var b = this,
                f = this.options.buttons;
            this.uiDialogButtonPane.remove();
            this.uiButtonSet.empty();
            t.isEmptyObject(f) || t.isArray(f) && !f.length ? this.uiDialog.removeClass("ui-dialog-buttons") : (t.each(f, function(f, a) {
                var c, d;
                a = t.isFunction(a) ? {
                    click: a,
                    text: f
                } : a;
                a = t.extend({
                    type: "button"
                }, a);
                c = a.click;
                a.click = function() {
                    c.apply(b.element[0], arguments)
                };
                d = {
                    icons: a.icons,
                    text: a.showText
                };
                delete a.icons;
                delete a.showText;
                t("\x3cbutton\x3e\x3c/button\x3e", a).button(d).appendTo(b.uiButtonSet)
            }), this.uiDialog.addClass("ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog))
        },
        _makeDraggable: function() {
            function b(b) {
                return {
                    position: b.position,
                    offset: b.offset
                }
            }
            var f = this,
                a = this.options;
            this.uiDialog.draggable({
                cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
                handle: ".ui-dialog-titlebar",
                containment: "document",
                start: function(a, c) {
                    t(this).addClass("ui-dialog-dragging");
                    f._blockFrames();
                    f._trigger("dragStart", a, b(c))
                },
                drag: function(a, c) {
                    f._trigger("drag", a, b(c))
                },
                stop: function(c, d) {
                    a.position = [d.position.left - f.document.scrollLeft(), d.position.top - f.document.scrollTop()];
                    t(this).removeClass("ui-dialog-dragging");
                    f._unblockFrames();
                    f._trigger("dragStop", c, b(d))
                }
            })
        },
        _makeResizable: function() {
            function b(b) {
                return {
                    originalPosition: b.originalPosition,
                    originalSize: b.originalSize,
                    position: b.position,
                    size: b.size
                }
            }
            var f = this,
                a = this.options,
                c = a.resizable,
                d = this.uiDialog.css("position"),
                c = "string" === typeof c ? c : "n,e,s,w,se,sw,ne,nw";
            this.uiDialog.resizable({
                cancel: ".ui-dialog-content",
                containment: "document",
                alsoResize: this.element,
                maxWidth: a.maxWidth,
                maxHeight: a.maxHeight,
                minWidth: a.minWidth,
                minHeight: this._minHeight(),
                handles: c,
                start: function(a, c) {
                    t(this).addClass("ui-dialog-resizing");
                    f._blockFrames();
                    f._trigger("resizeStart", a, b(c))
                },
                resize: function(a, c) {
                    f._trigger("resize", a, b(c))
                },
                stop: function(c, d) {
                    a.height = t(this).height();
                    a.width = t(this).width();
                    t(this).removeClass("ui-dialog-resizing");
                    f._unblockFrames();
                    f._trigger("resizeStop", c, b(d))
                }
            }).css("position", d)
        },
        _minHeight: function() {
            var b = this.options;
            return "auto" === b.height ? b.minHeight : Math.min(b.minHeight, b.height)
        },
        _position: function() {
            var b =
                this.uiDialog.is(":visible");
            b || this.uiDialog.show();
            this.uiDialog.position(this.options.position);
            b || this.uiDialog.hide()
        },
        _setOptions: function(b) {
            var f = this,
                a = !1,
                c = {};
            t.each(b, function(b, d) {
                f._setOption(b, d);
                b in U && (a = !0);
                b in V && (c[b] = d)
            });
            a && (this._size(), this._position());
            this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", c)
        },
        _setOption: function(b, f) {
            var a, c = this.uiDialog;
            "dialogClass" === b && c.removeClass(this.options.dialogClass).addClass(f);
            "disabled" !== b && (this._super(b,
                f), "appendTo" === b && this.uiDialog.appendTo(this._appendTo()), "buttons" === b && this._createButtons(), "closeText" === b && this.uiDialogTitlebarClose.button({
                label: "" + f
            }), "draggable" === b && ((a = c.is(":data(ui-draggable)")) && !f && c.draggable("destroy"), !a && f && this._makeDraggable()), "position" === b && this._position(), "resizable" === b && ((a = c.is(":data(ui-resizable)")) && !f && c.resizable("destroy"), a && "string" === typeof f && c.resizable("option", "handles", f), !a && !1 !== f && this._makeResizable()), "title" === b && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
        },
        _size: function() {
            var b, f, a, c = this.options;
            this.element.show().css({
                width: "auto",
                minHeight: 0,
                maxHeight: "none",
                height: 0
            });
            c.minWidth > c.width && (c.width = c.minWidth);
            b = this.uiDialog.css({
                height: "auto",
                width: c.width
            }).outerHeight();
            f = Math.max(0, c.minHeight - b);
            a = "number" === typeof c.maxHeight ? Math.max(0, c.maxHeight - b) : "none";
            "auto" === c.height ? this.element.css({
                minHeight: f,
                maxHeight: a,
                height: "auto"
            }) : this.element.height(Math.max(0, c.height - b));
            this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option",
                "minHeight", this._minHeight())
        },
        _blockFrames: function() {
            this.iframeBlocks = this.document.find("iframe").map(function() {
                var b = t(this);
                return t("\x3cdiv\x3e").css({
                    position: "absolute",
                    width: b.outerWidth(),
                    height: b.outerHeight()
                }).appendTo(b.parent()).offset(b.offset())[0]
            })
        },
        _unblockFrames: function() {
            this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
        },
        _allowInteraction: function(b) {
            return t(b.target).closest(".ui-dialog").length ? !0 : !!t(b.target).closest(".ui-datepicker").length
        },
        _createOverlay: function() {
            if (this.options.modal) {
                var b = this,
                    f = this.widgetFullName;
                t.ui.dialog.overlayInstances || this._delay(function() {
                    t.ui.dialog.overlayInstances && this.document.bind("focusin.dialog", function(a) {
                        b._allowInteraction(a) || (a.preventDefault(), t(".ui-dialog:visible:last .ui-dialog-content").data(f)._focusTabbable())
                    })
                });
                this.overlay = t("\x3cdiv\x3e").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo());
                this._on(this.overlay, {
                    mousedown: "_keepFocus"
                });
                t.ui.dialog.overlayInstances++
            }
        },
        _destroyOverlay: function() {
            this.options.modal && this.overlay && (t.ui.dialog.overlayInstances--, t.ui.dialog.overlayInstances || this.document.unbind("focusin.dialog"), this.overlay.remove(), this.overlay = null)
        }
    });
    t.ui.dialog.overlayInstances = 0;
    !1 !== t.uiBackCompat && t.widget("ui.dialog", t.ui.dialog, {
        _position: function() {
            var b = this.options.position,
                f = [],
                a = [0, 0],
                c;
            if (b) {
                if ("string" === typeof b || "object" === typeof b && "0" in b) f = b.split ? b.split(" ") : [b[0], b[1]], 1 === f.length && (f[1] = f[0]), t.each(["left", "top"], function(b,
                    c) {
                    +f[b] === f[b] && (a[b] = f[b], f[b] = c)
                }), b = {
                    my: f[0] + (0 > a[0] ? a[0] : "+" + a[0]) + " " + f[1] + (0 > a[1] ? a[1] : "+" + a[1]),
                    at: f.join(" ")
                };
                b = t.extend({}, t.ui.dialog.prototype.options.position, b)
            } else b = t.ui.dialog.prototype.options.position;
            (c = this.uiDialog.is(":visible")) || this.uiDialog.show();
            this.uiDialog.position(b);
            c || this.uiDialog.hide()
        }
    });
    a.widget("ui.menu", {
        version: "1.10.3",
        defaultElement: "\x3cul\x3e",
        delay: 300,
        options: {
            icons: {
                submenu: "ui-icon-carat-1-e"
            },
            menus: "ul",
            position: {
                my: "left top",
                at: "right top"
            },
            role: "menu",
            blur: null,
            focus: null,
            select: null
        },
        _create: function() {
            this.activeMenu = this.element;
            this.mouseHandled = !1;
            this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
                role: this.options.role,
                tabIndex: 0
            }).bind("click" + this.eventNamespace, a.proxy(function(b) {
                this.options.disabled && b.preventDefault()
            }, this));
            this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled",
                "true");
            this._on({
                "mousedown .ui-menu-item \x3e a": function(b) {
                    b.preventDefault()
                },
                "click .ui-state-disabled \x3e a": function(b) {
                    b.preventDefault()
                },
                "click .ui-menu-item:has(a)": function(b) {
                    var f = a(b.target).closest(".ui-menu-item");
                    !this.mouseHandled && f.not(".ui-state-disabled").length && (this.mouseHandled = !0, this.select(b), f.has(".ui-menu").length ? this.expand(b) : this.element.is(":focus") || (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
                },
                "mouseenter .ui-menu-item": function(b) {
                    var f = a(b.currentTarget);
                    f.siblings().children(".ui-state-active").removeClass("ui-state-active");
                    this.focus(b, f)
                },
                mouseleave: "collapseAll",
                "mouseleave .ui-menu": "collapseAll",
                focus: function(b, f) {
                    var a = this.active || this.element.children(".ui-menu-item").eq(0);
                    f || this.focus(b, a)
                },
                blur: function(b) {
                    this._delay(function() {
                        a.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(b)
                    })
                },
                keydown: "_keydown"
            });
            this.refresh();
            this._on(this.document, {
                click: function(b) {
                    a(b.target).closest(".ui-menu").length || this.collapseAll(b);
                    this.mouseHandled = !1
                }
            })
        },
        _destroy: function() {
            this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show();
            this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
                var b =
                    a(this);
                b.data("ui-menu-submenu-carat") && b.remove()
            });
            this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
        },
        _keydown: function(b) {
            function f(b) {
                return b.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$\x26")
            }
            var c, d, e, h, i = !0;
            switch (b.keyCode) {
                case a.ui.keyCode.PAGE_UP:
                    this.previousPage(b);
                    break;
                case a.ui.keyCode.PAGE_DOWN:
                    this.nextPage(b);
                    break;
                case a.ui.keyCode.HOME:
                    this._move("first", "first", b);
                    break;
                case a.ui.keyCode.END:
                    this._move("last", "last", b);
                    break;
                case a.ui.keyCode.UP:
                    this.previous(b);
                    break;
                case a.ui.keyCode.DOWN:
                    this.next(b);
                    break;
                case a.ui.keyCode.LEFT:
                    this.collapse(b);
                    break;
                case a.ui.keyCode.RIGHT:
                    this.active && !this.active.is(".ui-state-disabled") && this.expand(b);
                    break;
                case a.ui.keyCode.ENTER:
                case a.ui.keyCode.SPACE:
                    this._activate(b);
                    break;
                case a.ui.keyCode.ESCAPE:
                    this.collapse(b);
                    break;
                default:
                    i = !1, c = this.previousFilter || "", d = String.fromCharCode(b.keyCode), e = !1, clearTimeout(this.filterTimer), d === c ? e = !0 : d = c + d, h = RegExp("^" + f(d), "i"), c = this.activeMenu.children(".ui-menu-item").filter(function() {
                            return h.test(a(this).children("a").text())
                        }),
                        c = e && -1 !== c.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : c, c.length || (d = String.fromCharCode(b.keyCode), h = RegExp("^" + f(d), "i"), c = this.activeMenu.children(".ui-menu-item").filter(function() {
                            return h.test(a(this).children("a").text())
                        })), c.length ? (this.focus(b, c), 1 < c.length ? (this.previousFilter = d, this.filterTimer = this._delay(function() {
                            delete this.previousFilter
                        }, 1E3)) : delete this.previousFilter) : delete this.previousFilter
            }
            i && b.preventDefault()
        },
        _activate: function(b) {
            this.active.is(".ui-state-disabled") ||
                (this.active.children("a[aria-haspopup\x3d'true']").length ? this.expand(b) : this.select(b))
        },
        refresh: function() {
            var b, f = this.options.icons.submenu;
            b = this.element.find(this.options.menus);
            b.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
                role: this.options.role,
                "aria-hidden": "true",
                "aria-expanded": "false"
            }).each(function() {
                var b = a(this),
                    c = b.prev("a"),
                    d = a("\x3cspan\x3e").addClass("ui-menu-icon ui-icon " + f).data("ui-menu-submenu-carat", !0);
                c.attr("aria-haspopup",
                    "true").prepend(d);
                b.attr("aria-labelledby", c.attr("id"))
            });
            b = b.add(this.element);
            b.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
                tabIndex: -1,
                role: this._itemRole()
            });
            b.children(":not(.ui-menu-item)").each(function() {
                var b = a(this);
                /[^\-\u2014\u2013\s]/.test(b.text()) || b.addClass("ui-widget-content ui-menu-divider")
            });
            b.children(".ui-state-disabled").attr("aria-disabled", "true");
            this.active && !a.contains(this.element[0],
                this.active[0]) && this.blur()
        },
        _itemRole: function() {
            return {
                menu: "menuitem",
                listbox: "option"
            }[this.options.role]
        },
        _setOption: function(b, f) {
            "icons" === b && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(f.submenu);
            this._super(b, f)
        },
        focus: function(b, f) {
            var a;
            this.blur(b, b && "focus" === b.type);
            this._scrollIntoView(f);
            this.active = f.first();
            a = this.active.children("a").addClass("ui-state-focus");
            this.options.role && this.element.attr("aria-activedescendant", a.attr("id"));
            this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active");
            b && "keydown" === b.type ? this._close() : this.timer = this._delay(function() {
                this._close()
            }, this.delay);
            a = f.children(".ui-menu");
            a.length && /^mouse/.test(b.type) && this._startOpening(a);
            this.activeMenu = f.parent();
            this._trigger("focus", b, {
                item: f
            })
        },
        _scrollIntoView: function(b) {
            var f, c, d;
            this._hasScroll() && (f = parseFloat(a.css(this.activeMenu[0], "borderTopWidth")) || 0, c = parseFloat(a.css(this.activeMenu[0], "paddingTop")) || 0, f = b.offset().top - this.activeMenu.offset().top - f - c, c = this.activeMenu.scrollTop(), d = this.activeMenu.height(),
                b = b.height(), 0 > f ? this.activeMenu.scrollTop(c + f) : f + b > d && this.activeMenu.scrollTop(c + f - d + b))
        },
        blur: function(b, a) {
            a || clearTimeout(this.timer);
            this.active && (this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", b, {
                item: this.active
            }))
        },
        _startOpening: function(b) {
            clearTimeout(this.timer);
            "true" === b.attr("aria-hidden") && (this.timer = this._delay(function() {
                this._close();
                this._open(b)
            }, this.delay))
        },
        _open: function(b) {
            var f = a.extend({
                of: this.active
            }, this.options.position);
            clearTimeout(this.timer);
            this.element.find(".ui-menu").not(b.parents(".ui-menu")).hide().attr("aria-hidden", "true");
            b.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(f)
        },
        collapseAll: function(b, f) {
            clearTimeout(this.timer);
            this.timer = this._delay(function() {
                var c = f ? this.element : a(b && b.target).closest(this.element.find(".ui-menu"));
                c.length || (c = this.element);
                this._close(c);
                this.blur(b);
                this.activeMenu = c
            }, this.delay)
        },
        _close: function(b) {
            b || (b = this.active ? this.active.parent() : this.element);
            b.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
        },
        collapse: function(b) {
            var a = this.active && this.active.parent().closest(".ui-menu-item", this.element);
            a && a.length && (this._close(), this.focus(b, a))
        },
        expand: function(b) {
            var a = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
            a && a.length && (this._open(a.parent()), this._delay(function() {
                this.focus(b, a)
            }))
        },
        next: function(b) {
            this._move("next",
                "first", b)
        },
        previous: function(b) {
            this._move("prev", "last", b)
        },
        isFirstItem: function() {
            return this.active && !this.active.prevAll(".ui-menu-item").length
        },
        isLastItem: function() {
            return this.active && !this.active.nextAll(".ui-menu-item").length
        },
        _move: function(b, a, c) {
            var d;
            this.active && (d = "first" === b || "last" === b ? this.active["first" === b ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[b + "All"](".ui-menu-item").eq(0));
            if (!d || !d.length || !this.active) d = this.activeMenu.children(".ui-menu-item")[a]();
            this.focus(c, d)
        },
        nextPage: function(b) {
            var f, c, d;
            this.active ? this.isLastItem() || (this._hasScroll() ? (c = this.active.offset().top, d = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
                f = a(this);
                return 0 > f.offset().top - c - d
            }), this.focus(b, f)) : this.focus(b, this.activeMenu.children(".ui-menu-item")[!this.active ? "first" : "last"]())) : this.next(b)
        },
        previousPage: function(b) {
            var f, c, d;
            this.active ? this.isFirstItem() || (this._hasScroll() ? (c = this.active.offset().top, d = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
                f =
                    a(this);
                return 0 < f.offset().top - c + d
            }), this.focus(b, f)) : this.focus(b, this.activeMenu.children(".ui-menu-item").first())) : this.next(b)
        },
        _hasScroll: function() {
            return this.element.outerHeight() < this.element.prop("scrollHeight")
        },
        select: function(b) {
            this.active = this.active || a(b.target).closest(".ui-menu-item");
            var f = {
                item: this.active
            };
            this.active.has(".ui-menu").length || this.collapseAll(b, !0);
            this._trigger("select", b, f)
        }
    });
    a.widget("ui.progressbar", {
        version: "1.10.3",
        options: {
            max: 100,
            value: 0,
            change: null,
            complete: null
        },
        min: 0,
        _create: function() {
            this.oldValue = this.options.value = this._constrainedValue();
            this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
                role: "progressbar",
                "aria-valuemin": this.min
            });
            this.valueDiv = a("\x3cdiv class\x3d'ui-progressbar-value ui-widget-header ui-corner-left'\x3e\x3c/div\x3e").appendTo(this.element);
            this._refreshValue()
        },
        _destroy: function() {
            this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
            this.valueDiv.remove()
        },
        value: function(b) {
            if (void 0 === b) return this.options.value;
            this.options.value = this._constrainedValue(b);
            this._refreshValue()
        },
        _constrainedValue: function(b) {
            void 0 === b && (b = this.options.value);
            this.indeterminate = !1 === b;
            "number" !== typeof b && (b = 0);
            return this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, b))
        },
        _setOptions: function(b) {
            var a = b.value;
            delete b.value;
            this._super(b);
            this.options.value = this._constrainedValue(a);
            this._refreshValue()
        },
        _setOption: function(b,
            a) {
            "max" === b && (a = Math.max(this.min, a));
            this._super(b, a)
        },
        _percentage: function() {
            return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
        },
        _refreshValue: function() {
            var b = this.options.value,
                f = this._percentage();
            this.valueDiv.toggle(this.indeterminate || b > this.min).toggleClass("ui-corner-right", b === this.options.max).width(f.toFixed(0) + "%");
            this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate);
            this.indeterminate ? (this.element.removeAttr("aria-valuenow"),
                this.overlayDiv || (this.overlayDiv = a("\x3cdiv class\x3d'ui-progressbar-overlay'\x3e\x3c/div\x3e").appendTo(this.valueDiv))) : (this.element.attr({
                "aria-valuemax": this.options.max,
                "aria-valuenow": b
            }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null));
            this.oldValue !== b && (this.oldValue = b, this._trigger("change"));
            b === this.options.max && this._trigger("complete")
        }
    });
    a.widget("ui.slider", a.ui.mouse, {
        version: "1.10.3",
        widgetEventPrefix: "slide",
        options: {
            animate: !1,
            distance: 0,
            max: 100,
            min: 0,
            orientation: "horizontal",
            range: !1,
            step: 1,
            value: 0,
            values: null,
            change: null,
            slide: null,
            start: null,
            stop: null
        },
        _create: function() {
            this._mouseSliding = this._keySliding = !1;
            this._animateOff = !0;
            this._handleIndex = null;
            this._detectOrientation();
            this._mouseInit();
            this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget ui-widget-content ui-corner-all");
            this._refresh();
            this._setOption("disabled", this.options.disabled);
            this._animateOff = !1
        },
        _refresh: function() {
            this._createRange();
            this._createHandles();
            this._setupEvents();
            this._refreshValue()
        },
        _createHandles: function() {
            var b, f;
            b = this.options;
            var c = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
                d = [];
            f = b.values && b.values.length || 1;
            c.length > f && (c.slice(f).remove(), c = c.slice(0, f));
            for (b = c.length; b < f; b++) d.push("\x3ca class\x3d'ui-slider-handle ui-state-default ui-corner-all' href\x3d'#'\x3e\x3c/a\x3e");
            this.handles = c.add(a(d.join("")).appendTo(this.element));
            this.handle = this.handles.eq(0);
            this.handles.each(function(b) {
                a(this).data("ui-slider-handle-index",
                    b)
            })
        },
        _createRange: function() {
            var b = this.options,
                c = "";
            b.range ? (!0 === b.range && (b.values ? b.values.length && 2 !== b.values.length ? b.values = [b.values[0], b.values[0]] : a.isArray(b.values) && (b.values = b.values.slice(0)) : b.values = [this._valueMin(), this._valueMin()]), !this.range || !this.range.length ? (this.range = a("\x3cdiv\x3e\x3c/div\x3e").appendTo(this.element), c = "ui-slider-range ui-widget-header ui-corner-all") : this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
                left: "",
                bottom: ""
            }), this.range.addClass(c +
                ("min" === b.range || "max" === b.range ? " ui-slider-range-" + b.range : ""))) : this.range = a([])
        },
        _setupEvents: function() {
            var b = this.handles.add(this.range).filter("a");
            this._off(b);
            this._on(b, this._handleEvents);
            this._hoverable(b);
            this._focusable(b)
        },
        _destroy: function() {
            this.handles.remove();
            this.range.remove();
            this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all");
            this._mouseDestroy()
        },
        _mouseCapture: function(b) {
            var c, d, e, h, i, j = this,
                g = this.options;
            if (g.disabled) return !1;
            this.elementSize = {
                width: this.element.outerWidth(),
                height: this.element.outerHeight()
            };
            this.elementOffset = this.element.offset();
            c = this._normValueFromMouse({
                x: b.pageX,
                y: b.pageY
            });
            d = this._valueMax() - this._valueMin() + 1;
            this.handles.each(function(b) {
                var i = Math.abs(c - j.values(b));
                if (d > i || d === i && (b === j._lastChangedValue || j.values(b) === g.min)) d = i, e = a(this), h = b
            });
            if (!1 === this._start(b, h)) return !1;
            this._mouseSliding = !0;
            this._handleIndex = h;
            e.addClass("ui-state-active").focus();
            i = e.offset();
            this._clickOffset = !a(b.target).parents().addBack().is(".ui-slider-handle") ? {
                left: 0,
                top: 0
            } : {
                left: b.pageX - i.left - e.width() / 2,
                top: b.pageY - i.top - e.height() / 2 - (parseInt(e.css("borderTopWidth"), 10) || 0) - (parseInt(e.css("borderBottomWidth"), 10) || 0) + (parseInt(e.css("marginTop"), 10) || 0)
            };
            this.handles.hasClass("ui-state-hover") || this._slide(b, h, c);
            return this._animateOff = !0
        },
        _mouseStart: function() {
            return !0
        },
        _mouseDrag: function(b) {
            var a = this._normValueFromMouse({
                x: b.pageX,
                y: b.pageY
            });
            this._slide(b, this._handleIndex,
                a);
            return !1
        },
        _mouseStop: function(b) {
            this.handles.removeClass("ui-state-active");
            this._mouseSliding = !1;
            this._stop(b, this._handleIndex);
            this._change(b, this._handleIndex);
            this._clickOffset = this._handleIndex = null;
            return this._animateOff = !1
        },
        _detectOrientation: function() {
            this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
        },
        _normValueFromMouse: function(b) {
            var a;
            "horizontal" === this.orientation ? (a = this.elementSize.width, b = b.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left :
                0)) : (a = this.elementSize.height, b = b.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0));
            a = b / a;
            1 < a && (a = 1);
            0 > a && (a = 0);
            "vertical" === this.orientation && (a = 1 - a);
            b = this._valueMax() - this._valueMin();
            a = this._valueMin() + a * b;
            return this._trimAlignValue(a)
        },
        _start: function(b, a) {
            var c = {
                handle: this.handles[a],
                value: this.value()
            };
            this.options.values && this.options.values.length && (c.value = this.values(a), c.values = this.values());
            return this._trigger("start", b, c)
        },
        _slide: function(b, a, c) {
            var d;
            if (this.options.values &&
                this.options.values.length) {
                d = this.values(a ? 0 : 1);
                if (2 === this.options.values.length && !0 === this.options.range && (0 === a && c > d || 1 === a && c < d)) c = d;
                c !== this.values(a) && (d = this.values(), d[a] = c, b = this._trigger("slide", b, {
                    handle: this.handles[a],
                    value: c,
                    values: d
                }), this.values(a ? 0 : 1), !1 !== b && this.values(a, c, !0))
            } else c !== this.value() && (b = this._trigger("slide", b, {
                handle: this.handles[a],
                value: c
            }), !1 !== b && this.value(c))
        },
        _stop: function(b, a) {
            var c = {
                handle: this.handles[a],
                value: this.value()
            };
            this.options.values && this.options.values.length &&
                (c.value = this.values(a), c.values = this.values());
            this._trigger("stop", b, c)
        },
        _change: function(b, a) {
            if (!this._keySliding && !this._mouseSliding) {
                var c = {
                    handle: this.handles[a],
                    value: this.value()
                };
                this.options.values && this.options.values.length && (c.value = this.values(a), c.values = this.values());
                this._lastChangedValue = a;
                this._trigger("change", b, c)
            }
        },
        value: function(b) {
            if (arguments.length) this.options.value = this._trimAlignValue(b), this._refreshValue(), this._change(null, 0);
            else return this._value()
        },
        values: function(b,
            c) {
            var d, e, h;
            if (1 < arguments.length) this.options.values[b] = this._trimAlignValue(c), this._refreshValue(), this._change(null, b);
            else if (arguments.length)
                if (a.isArray(arguments[0])) {
                    d = this.options.values;
                    e = arguments[0];
                    for (h = 0; h < d.length; h += 1) d[h] = this._trimAlignValue(e[h]), this._change(null, h);
                    this._refreshValue()
                } else return this.options.values && this.options.values.length ? this._values(b) : this.value();
            else return this._values()
        },
        _setOption: function(b, c) {
            var d, e = 0;
            "range" === b && !0 === this.options.range &&
                ("min" === c ? (this.options.value = this._values(0), this.options.values = null) : "max" === c && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null));
            a.isArray(this.options.values) && (e = this.options.values.length);
            a.Widget.prototype._setOption.apply(this, arguments);
            switch (b) {
                case "orientation":
                    this._detectOrientation();
                    this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation);
                    this._refreshValue();
                    break;
                case "value":
                    this._animateOff = !0;
                    this._refreshValue();
                    this._change(null, 0);
                    this._animateOff = !1;
                    break;
                case "values":
                    this._animateOff = !0;
                    this._refreshValue();
                    for (d = 0; d < e; d += 1) this._change(null, d);
                    this._animateOff = !1;
                    break;
                case "min":
                case "max":
                    this._animateOff = !0;
                    this._refreshValue();
                    this._animateOff = !1;
                    break;
                case "range":
                    this._animateOff = !0, this._refresh(), this._animateOff = !1
            }
        },
        _value: function() {
            var b = this.options.value;
            return b = this._trimAlignValue(b)
        },
        _values: function(b) {
            var a, c;
            if (arguments.length) return a = this.options.values[b],
                a = this._trimAlignValue(a);
            if (this.options.values && this.options.values.length) {
                a = this.options.values.slice();
                for (c = 0; c < a.length; c += 1) a[c] = this._trimAlignValue(a[c]);
                return a
            }
            return []
        },
        _trimAlignValue: function(b) {
            if (b <= this._valueMin()) return this._valueMin();
            if (b >= this._valueMax()) return this._valueMax();
            var a = 0 < this.options.step ? this.options.step : 1,
                c = (b - this._valueMin()) % a;
            b -= c;
            2 * Math.abs(c) >= a && (b += 0 < c ? a : -a);
            return parseFloat(b.toFixed(5))
        },
        _valueMin: function() {
            return this.options.min
        },
        _valueMax: function() {
            return this.options.max
        },
        _refreshValue: function() {
            var b, c, d, e, h, i = this.options.range,
                j = this.options,
                g = this,
                n = !this._animateOff ? j.animate : !1,
                k = {};
            if (this.options.values && this.options.values.length) this.handles.each(function(d) {
                c = 100 * ((g.values(d) - g._valueMin()) / (g._valueMax() - g._valueMin()));
                k["horizontal" === g.orientation ? "left" : "bottom"] = c + "%";
                a(this).stop(1, 1)[n ? "animate" : "css"](k, j.animate);
                if (!0 === g.options.range)
                    if ("horizontal" === g.orientation) {
                        if (0 === d) g.range.stop(1, 1)[n ? "animate" : "css"]({
                            left: c + "%"
                        }, j.animate);
                        if (1 ===
                            d) g.range[n ? "animate" : "css"]({
                            width: c - b + "%"
                        }, {
                            queue: !1,
                            duration: j.animate
                        })
                    } else {
                        if (0 === d) g.range.stop(1, 1)[n ? "animate" : "css"]({
                            bottom: c + "%"
                        }, j.animate);
                        if (1 === d) g.range[n ? "animate" : "css"]({
                            height: c - b + "%"
                        }, {
                            queue: !1,
                            duration: j.animate
                        })
                    }
                b = c
            });
            else {
                d = this.value();
                e = this._valueMin();
                h = this._valueMax();
                c = h !== e ? 100 * ((d - e) / (h - e)) : 0;
                k["horizontal" === this.orientation ? "left" : "bottom"] = c + "%";
                this.handle.stop(1, 1)[n ? "animate" : "css"](k, j.animate);
                if ("min" === i && "horizontal" === this.orientation) this.range.stop(1,
                    1)[n ? "animate" : "css"]({
                    width: c + "%"
                }, j.animate);
                if ("max" === i && "horizontal" === this.orientation) this.range[n ? "animate" : "css"]({
                    width: 100 - c + "%"
                }, {
                    queue: !1,
                    duration: j.animate
                });
                if ("min" === i && "vertical" === this.orientation) this.range.stop(1, 1)[n ? "animate" : "css"]({
                    height: c + "%"
                }, j.animate);
                if ("max" === i && "vertical" === this.orientation) this.range[n ? "animate" : "css"]({
                    height: 100 - c + "%"
                }, {
                    queue: !1,
                    duration: j.animate
                })
            }
        },
        _handleEvents: {
            keydown: function(b) {
                var c, d, e, h = a(b.target).data("ui-slider-handle-index");
                switch (b.keyCode) {
                    case a.ui.keyCode.HOME:
                    case a.ui.keyCode.END:
                    case a.ui.keyCode.PAGE_UP:
                    case a.ui.keyCode.PAGE_DOWN:
                    case a.ui.keyCode.UP:
                    case a.ui.keyCode.RIGHT:
                    case a.ui.keyCode.DOWN:
                    case a.ui.keyCode.LEFT:
                        if (b.preventDefault(), !this._keySliding && (this._keySliding = !0, a(b.target).addClass("ui-state-active"), c = this._start(b, h), !1 === c)) return
                }
                e = this.options.step;
                c = this.options.values && this.options.values.length ? d = this.values(h) : d = this.value();
                switch (b.keyCode) {
                    case a.ui.keyCode.HOME:
                        d = this._valueMin();
                        break;
                    case a.ui.keyCode.END:
                        d = this._valueMax();
                        break;
                    case a.ui.keyCode.PAGE_UP:
                        d = this._trimAlignValue(c + (this._valueMax() - this._valueMin()) / 5);
                        break;
                    case a.ui.keyCode.PAGE_DOWN:
                        d = this._trimAlignValue(c - (this._valueMax() - this._valueMin()) /
                            5);
                        break;
                    case a.ui.keyCode.UP:
                    case a.ui.keyCode.RIGHT:
                        if (c === this._valueMax()) return;
                        d = this._trimAlignValue(c + e);
                        break;
                    case a.ui.keyCode.DOWN:
                    case a.ui.keyCode.LEFT:
                        if (c === this._valueMin()) return;
                        d = this._trimAlignValue(c - e)
                }
                this._slide(b, h, d)
            },
            click: function(b) {
                b.preventDefault()
            },
            keyup: function(b) {
                var c = a(b.target).data("ui-slider-handle-index");
                this._keySliding && (this._keySliding = !1, this._stop(b, c), this._change(b, c), a(b.target).removeClass("ui-state-active"))
            }
        }
    });
    var G = function(b) {
        return function() {
            var a =
                this.element.val();
            b.apply(this, arguments);
            this._refresh();
            a !== this.element.val() && this._trigger("change")
        }
    };
    a.widget("ui.spinner", {
        version: "1.10.3",
        defaultElement: "\x3cinput\x3e",
        widgetEventPrefix: "spin",
        options: {
            culture: null,
            icons: {
                down: "ui-icon-triangle-1-s",
                up: "ui-icon-triangle-1-n"
            },
            incremental: !0,
            max: null,
            min: null,
            numberFormat: null,
            page: 10,
            step: 1,
            change: null,
            spin: null,
            start: null,
            stop: null
        },
        _create: function() {
            this._setOption("max", this.options.max);
            this._setOption("min", this.options.min);
            this._setOption("step",
                this.options.step);
            this._value(this.element.val(), !0);
            this._draw();
            this._on(this._events);
            this._refresh();
            this._on(this.window, {
                beforeunload: function() {
                    this.element.removeAttr("autocomplete")
                }
            })
        },
        _getCreateOptions: function() {
            var b = {},
                c = this.element;
            a.each(["min", "max", "step"], function(a, d) {
                var e = c.attr(d);
                void 0 !== e && e.length && (b[d] = e)
            });
            return b
        },
        _events: {
            keydown: function(b) {
                this._start(b) && this._keydown(b) && b.preventDefault()
            },
            keyup: "_stop",
            focus: function() {
                this.previous = this.element.val()
            },
            blur: function(b) {
                this.cancelBlur ?
                    delete this.cancelBlur : (this._stop(), this._refresh(), this.previous !== this.element.val() && this._trigger("change", b))
            },
            mousewheel: function(b, a) {
                if (a) {
                    if (!this.spinning && !this._start(b)) return !1;
                    this._spin((0 < a ? 1 : -1) * this.options.step, b);
                    clearTimeout(this.mousewheelTimer);
                    this.mousewheelTimer = this._delay(function() {
                        this.spinning && this._stop(b)
                    }, 100);
                    b.preventDefault()
                }
            },
            "mousedown .ui-spinner-button": function(b) {
                function c() {
                    this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous =
                        d, this._delay(function() {
                            this.previous = d
                        }))
                }
                var d;
                d = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val();
                b.preventDefault();
                c.call(this);
                this.cancelBlur = !0;
                this._delay(function() {
                    delete this.cancelBlur;
                    c.call(this)
                });
                !1 !== this._start(b) && this._repeat(null, a(b.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, b)
            },
            "mouseup .ui-spinner-button": "_stop",
            "mouseenter .ui-spinner-button": function(b) {
                if (a(b.currentTarget).hasClass("ui-state-active")) {
                    if (!1 === this._start(b)) return !1;
                    this._repeat(null, a(b.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, b)
                }
            },
            "mouseleave .ui-spinner-button": "_stop"
        },
        _draw: function() {
            var b = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
            this.element.attr("role", "spinbutton");
            this.buttons = b.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all");
            this.buttons.height() > Math.ceil(0.5 * b.height()) && 0 < b.height() && b.height(b.height());
            this.options.disabled && this.disable()
        },
        _keydown: function(b) {
            var c = this.options,
                d = a.ui.keyCode;
            switch (b.keyCode) {
                case d.UP:
                    return this._repeat(null, 1, b), !0;
                case d.DOWN:
                    return this._repeat(null, -1, b), !0;
                case d.PAGE_UP:
                    return this._repeat(null, c.page, b), !0;
                case d.PAGE_DOWN:
                    return this._repeat(null, -c.page, b), !0
            }
            return !1
        },
        _uiSpinnerHtml: function() {
            return "\x3cspan class\x3d'ui-spinner ui-widget ui-widget-content ui-corner-all'\x3e\x3c/span\x3e"
        },
        _buttonHtml: function() {
            return "\x3ca class\x3d'ui-spinner-button ui-spinner-up ui-corner-tr'\x3e\x3cspan class\x3d'ui-icon " +
                this.options.icons.up + "'\x3e\x26#9650;\x3c/span\x3e\x3c/a\x3e\x3ca class\x3d'ui-spinner-button ui-spinner-down ui-corner-br'\x3e\x3cspan class\x3d'ui-icon " + this.options.icons.down + "'\x3e\x26#9660;\x3c/span\x3e\x3c/a\x3e"
        },
        _start: function(b) {
            if (!this.spinning && !1 === this._trigger("start", b)) return !1;
            this.counter || (this.counter = 1);
            return this.spinning = !0
        },
        _repeat: function(b, a, c) {
            b = b || 500;
            clearTimeout(this.timer);
            this.timer = this._delay(function() {
                this._repeat(40, a, c)
            }, b);
            this._spin(a * this.options.step,
                c)
        },
        _spin: function(b, a) {
            var c = this.value() || 0;
            this.counter || (this.counter = 1);
            c = this._adjustValue(c + b * this._increment(this.counter));
            if (!this.spinning || !1 !== this._trigger("spin", a, {
                    value: c
                })) this._value(c), this.counter++
        },
        _increment: function(b) {
            var c = this.options.incremental;
            return c ? a.isFunction(c) ? c(b) : Math.floor(b * b * b / 5E4 - b * b / 500 + 17 * b / 200 + 1) : 1
        },
        _precision: function() {
            var b = this._precisionOf(this.options.step);
            null !== this.options.min && (b = Math.max(b, this._precisionOf(this.options.min)));
            return b
        },
        _precisionOf: function(b) {
            b = b.toString();
            var a = b.indexOf(".");
            return -1 === a ? 0 : b.length - a - 1
        },
        _adjustValue: function(b) {
            var a, c = this.options;
            a = null !== c.min ? c.min : 0;
            b = Math.round((b - a) / c.step) * c.step;
            b = a + b;
            b = parseFloat(b.toFixed(this._precision()));
            return null !== c.max && b > c.max ? c.max : null !== c.min && b < c.min ? c.min : b
        },
        _stop: function(b) {
            this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", b))
        },
        _setOption: function(b, a) {
            if ("culture" === b ||
                "numberFormat" === b) {
                var c = this._parse(this.element.val());
                this.options[b] = a;
                this.element.val(this._format(c))
            } else {
                if ("max" === b || "min" === b || "step" === b) "string" === typeof a && (a = this._parse(a));
                "icons" === b && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(a.up), this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(a.down));
                this._super(b, a);
                "disabled" === b && (a ? (this.element.prop("disabled", !0), this.buttons.button("disable")) : (this.element.prop("disabled", !1), this.buttons.button("enable")))
            }
        },
        _setOptions: G(function(b) {
            this._super(b);
            this._value(this.element.val())
        }),
        _parse: function(b) {
            "string" === typeof b && "" !== b && (b = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(b, 10, this.options.culture) : +b);
            return "" === b || isNaN(b) ? null : b
        },
        _format: function(b) {
            return "" === b ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(b, this.options.numberFormat, this.options.culture) : b
        },
        _refresh: function() {
            this.element.attr({
                "aria-valuemin": this.options.min,
                "aria-valuemax": this.options.max,
                "aria-valuenow": this._parse(this.element.val())
            })
        },
        _value: function(b, a) {
            var c;
            "" !== b && (c = this._parse(b), null !== c && (a || (c = this._adjustValue(c)), b = this._format(c)));
            this.element.val(b);
            this._refresh()
        },
        _destroy: function() {
            this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow");
            this.uiSpinner.replaceWith(this.element)
        },
        stepUp: G(function(b) {
            this._stepUp(b)
        }),
        _stepUp: function(b) {
            this._start() && (this._spin((b || 1) * this.options.step), this._stop())
        },
        stepDown: G(function(b) {
            this._stepDown(b)
        }),
        _stepDown: function(b) {
            this._start() && (this._spin((b || 1) * -this.options.step), this._stop())
        },
        pageUp: G(function(b) {
            this._stepUp((b || 1) * this.options.page)
        }),
        pageDown: G(function(b) {
            this._stepDown((b || 1) * this.options.page)
        }),
        value: function(b) {
            if (!arguments.length) return this._parse(this.element.val());
            G(this._value).call(this, b)
        },
        widget: function() {
            return this.uiSpinner
        }
    });
    var R =
        function(b) {
            return 1 < b.hash.length && decodeURIComponent(b.href.replace(Q, "")) === decodeURIComponent(location.href.replace(Q, ""))
        },
        W = 0,
        Q = /#.*$/;
    a.widget("ui.tabs", {
        version: "1.10.3",
        delay: 300,
        options: {
            active: null,
            collapsible: !1,
            event: "click",
            heightStyle: "content",
            hide: null,
            show: null,
            activate: null,
            beforeActivate: null,
            beforeLoad: null,
            load: null
        },
        _create: function() {
            var b = this,
                c = this.options;
            this.running = !1;
            this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible",
                c.collapsible).delegate(".ui-tabs-nav \x3e li", "mousedown" + this.eventNamespace, function(b) {
                a(this).is(".ui-state-disabled") && b.preventDefault()
            }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
                a(this).closest("li").is(".ui-state-disabled") && this.blur()
            });
            this._processTabs();
            c.active = this._initialActive();
            a.isArray(c.disabled) && (c.disabled = a.unique(c.disabled.concat(a.map(this.tabs.filter(".ui-state-disabled"), function(c) {
                return b.tabs.index(c)
            }))).sort());
            this.active = !1 !== this.options.active &&
                this.anchors.length ? this._findActive(c.active) : a();
            this._refresh();
            this.active.length && this.load(c.active)
        },
        _initialActive: function() {
            var b = this.options.active,
                c = this.options.collapsible,
                d = location.hash.substring(1);
            if (null === b && (d && this.tabs.each(function(c, f) {
                    if (a(f).attr("aria-controls") === d) return b = c, !1
                }), null === b && (b = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), null === b || -1 === b)) b = this.tabs.length ? 0 : !1;
            !1 !== b && (b = this.tabs.index(this.tabs.eq(b)), -1 === b && (b = c ? !1 : 0));
            !c && (!1 === b && this.anchors.length) &&
                (b = 0);
            return b
        },
        _getCreateEventData: function() {
            return {
                tab: this.active,
                panel: !this.active.length ? a() : this._getPanelForTab(this.active)
            }
        },
        _tabKeydown: function(b) {
            var c = a(this.document[0].activeElement).closest("li"),
                d = this.tabs.index(c),
                e = !0;
            if (!this._handlePageNav(b)) {
                switch (b.keyCode) {
                    case a.ui.keyCode.RIGHT:
                    case a.ui.keyCode.DOWN:
                        d++;
                        break;
                    case a.ui.keyCode.UP:
                    case a.ui.keyCode.LEFT:
                        e = !1;
                        d--;
                        break;
                    case a.ui.keyCode.END:
                        d = this.anchors.length - 1;
                        break;
                    case a.ui.keyCode.HOME:
                        d = 0;
                        break;
                    case a.ui.keyCode.SPACE:
                        b.preventDefault();
                        clearTimeout(this.activating);
                        this._activate(d);
                        return;
                    case a.ui.keyCode.ENTER:
                        b.preventDefault();
                        clearTimeout(this.activating);
                        this._activate(d === this.options.active ? !1 : d);
                        return;
                    default:
                        return
                }
                b.preventDefault();
                clearTimeout(this.activating);
                d = this._focusNextTab(d, e);
                b.ctrlKey || (c.attr("aria-selected", "false"), this.tabs.eq(d).attr("aria-selected", "true"), this.activating = this._delay(function() {
                    this.option("active", d)
                }, this.delay))
            }
        },
        _panelKeydown: function(b) {
            !this._handlePageNav(b) && (b.ctrlKey &&
                b.keyCode === a.ui.keyCode.UP) && (b.preventDefault(), this.active.focus())
        },
        _handlePageNav: function(b) {
            if (b.altKey && b.keyCode === a.ui.keyCode.PAGE_UP) return this._activate(this._focusNextTab(this.options.active - 1, !1)), !0;
            if (b.altKey && b.keyCode === a.ui.keyCode.PAGE_DOWN) return this._activate(this._focusNextTab(this.options.active + 1, !0)), !0
        },
        _findNextTab: function(b, c) {
            function d() {
                b > e && (b = 0);
                0 > b && (b = e);
                return b
            }
            for (var e = this.tabs.length - 1; - 1 !== a.inArray(d(), this.options.disabled);) b = c ? b + 1 : b - 1;
            return b
        },
        _focusNextTab: function(b, c) {
            b = this._findNextTab(b, c);
            this.tabs.eq(b).focus();
            return b
        },
        _setOption: function(b, c) {
            "active" === b ? this._activate(c) : "disabled" === b ? this._setupDisabled(c) : (this._super(b, c), "collapsible" === b && (this.element.toggleClass("ui-tabs-collapsible", c), !c && !1 === this.options.active && this._activate(0)), "event" === b && this._setupEvents(c), "heightStyle" === b && this._setupHeightStyle(c))
        },
        _tabId: function(b) {
            return b.attr("aria-controls") || "ui-tabs-" + ++W
        },
        _sanitizeSelector: function(b) {
            return b ?
                b.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$\x26") : ""
        },
        refresh: function() {
            var b = this.options,
                c = this.tablist.children(":has(a[href])");
            b.disabled = a.map(c.filter(".ui-state-disabled"), function(b) {
                return c.index(b)
            });
            this._processTabs();
            !1 === b.active || !this.anchors.length ? (b.active = !1, this.active = a()) : this.active.length && !a.contains(this.tablist[0], this.active[0]) ? this.tabs.length === b.disabled.length ? (b.active = !1, this.active = a()) : this._activate(this._findNextTab(Math.max(0, b.active - 1), !1)) : b.active =
                this.tabs.index(this.active);
            this._refresh()
        },
        _refresh: function() {
            this._setupDisabled(this.options.disabled);
            this._setupEvents(this.options.event);
            this._setupHeightStyle(this.options.heightStyle);
            this.tabs.not(this.active).attr({
                "aria-selected": "false",
                tabIndex: -1
            });
            this.panels.not(this._getPanelForTab(this.active)).hide().attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            });
            this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
                "aria-selected": "true",
                tabIndex: 0
            }), this._getPanelForTab(this.active).show().attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            })) : this.tabs.eq(0).attr("tabIndex", 0)
        },
        _processTabs: function() {
            var b = this;
            this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist");
            this.tabs = this.tablist.find("\x3e li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
                role: "tab",
                tabIndex: -1
            });
            this.anchors = this.tabs.map(function() {
                return a("a", this)[0]
            }).addClass("ui-tabs-anchor").attr({
                role: "presentation",
                tabIndex: -1
            });
            this.panels =
                a();
            this.anchors.each(function(c, d) {
                var e, h, i, j = a(d).uniqueId().attr("id"),
                    g = a(d).closest("li"),
                    n = g.attr("aria-controls");
                R(d) ? (e = d.hash, h = b.element.find(b._sanitizeSelector(e))) : (i = b._tabId(g), e = "#" + i, h = b.element.find(e), h.length || (h = b._createPanel(i), h.insertAfter(b.panels[c - 1] || b.tablist)), h.attr("aria-live", "polite"));
                h.length && (b.panels = b.panels.add(h));
                n && g.data("ui-tabs-aria-controls", n);
                g.attr({
                    "aria-controls": e.substring(1),
                    "aria-labelledby": j
                });
                h.attr("aria-labelledby", j)
            });
            this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role",
                "tabpanel")
        },
        _getList: function() {
            return this.element.find("ol,ul").eq(0)
        },
        _createPanel: function(b) {
            return a("\x3cdiv\x3e").attr("id", b).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
        },
        _setupDisabled: function(b) {
            a.isArray(b) && (b.length ? b.length === this.anchors.length && (b = !0) : b = !1);
            for (var c = 0, d; d = this.tabs[c]; c++) !0 === b || -1 !== a.inArray(c, b) ? a(d).addClass("ui-state-disabled").attr("aria-disabled", "true") : a(d).removeClass("ui-state-disabled").removeAttr("aria-disabled");
            this.options.disabled = b
        },
        _setupEvents: function(b) {
            var c = {
                click: function(b) {
                    b.preventDefault()
                }
            };
            b && a.each(b.split(" "), function(b, a) {
                c[a] = "_eventHandler"
            });
            this._off(this.anchors.add(this.tabs).add(this.panels));
            this._on(this.anchors, c);
            this._on(this.tabs, {
                keydown: "_tabKeydown"
            });
            this._on(this.panels, {
                keydown: "_panelKeydown"
            });
            this._focusable(this.tabs);
            this._hoverable(this.tabs)
        },
        _setupHeightStyle: function(b) {
            var c, d = this.element.parent();
            "fill" === b ? (c = d.height(), c -= this.element.outerHeight() - this.element.height(),
                this.element.siblings(":visible").each(function() {
                    var b = a(this),
                        d = b.css("position");
                    "absolute" === d || "fixed" === d || (c -= b.outerHeight(!0))
                }), this.element.children().not(this.panels).each(function() {
                    c -= a(this).outerHeight(!0)
                }), this.panels.each(function() {
                    a(this).height(Math.max(0, c - a(this).innerHeight() + a(this).height()))
                }).css("overflow", "auto")) : "auto" === b && (c = 0, this.panels.each(function() {
                c = Math.max(c, a(this).height("").height())
            }).height(c))
        },
        _eventHandler: function(b) {
            var c = this.options,
                d = this.active,
                e = a(b.currentTarget).closest("li"),
                h = e[0] === d[0],
                i = h && c.collapsible,
                j = i ? a() : this._getPanelForTab(e),
                g = !d.length ? a() : this._getPanelForTab(d),
                d = {
                    oldTab: d,
                    oldPanel: g,
                    newTab: i ? a() : e,
                    newPanel: j
                };
            b.preventDefault();
            if (!e.hasClass("ui-state-disabled") && !e.hasClass("ui-tabs-loading") && !this.running && !(h && !c.collapsible || !1 === this._trigger("beforeActivate", b, d))) c.active = i ? !1 : this.tabs.index(e), this.active = h ? a() : e, this.xhr && this.xhr.abort(), !g.length && !j.length && a.error("jQuery UI Tabs: Mismatching fragment identifier."),
                j.length && this.load(this.tabs.index(e), b), this._toggle(b, d)
        },
        _toggle: function(b, c) {
            function d() {
                h.running = !1;
                h._trigger("activate", b, c)
            }

            function e() {
                c.newTab.closest("li").addClass("ui-tabs-active ui-state-active");
                i.length && h.options.show ? h._show(i, h.options.show, d) : (i.show(), d())
            }
            var h = this,
                i = c.newPanel,
                j = c.oldPanel;
            this.running = !0;
            j.length && this.options.hide ? this._hide(j, this.options.hide, function() {
                c.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active");
                e()
            }) : (c.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"),
                j.hide(), e());
            j.attr({
                "aria-expanded": "false",
                "aria-hidden": "true"
            });
            c.oldTab.attr("aria-selected", "false");
            i.length && j.length ? c.oldTab.attr("tabIndex", -1) : i.length && this.tabs.filter(function() {
                return 0 === a(this).attr("tabIndex")
            }).attr("tabIndex", -1);
            i.attr({
                "aria-expanded": "true",
                "aria-hidden": "false"
            });
            c.newTab.attr({
                "aria-selected": "true",
                tabIndex: 0
            })
        },
        _activate: function(b) {
            b = this._findActive(b);
            b[0] !== this.active[0] && (b.length || (b = this.active), b = b.find(".ui-tabs-anchor")[0], this._eventHandler({
                target: b,
                currentTarget: b,
                preventDefault: a.noop
            }))
        },
        _findActive: function(b) {
            return !1 === b ? a() : this.tabs.eq(b)
        },
        _getIndex: function(b) {
            "string" === typeof b && (b = this.anchors.index(this.anchors.filter("[href$\x3d'" + b + "']")));
            return b
        },
        _destroy: function() {
            this.xhr && this.xhr.abort();
            this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible");
            this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role");
            this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId();
            this.tabs.add(this.panels).each(function() {
                a.data(this, "ui-tabs-destroy") ? a(this).remove() : a(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
            });
            this.tabs.each(function() {
                var b = a(this),
                    c = b.data("ui-tabs-aria-controls");
                c ? b.attr("aria-controls", c).removeData("ui-tabs-aria-controls") : b.removeAttr("aria-controls")
            });
            this.panels.show();
            "content" !== this.options.heightStyle && this.panels.css("height", "")
        },
        enable: function(b) {
            var c = this.options.disabled;
            !1 !== c && (void 0 === b ? c = !1 : (b = this._getIndex(b), c = a.isArray(c) ? a.map(c, function(c) {
                return c !== b ? c : null
            }) : a.map(this.tabs, function(c, a) {
                return a !== b ? a : null
            })), this._setupDisabled(c))
        },
        disable: function(b) {
            var c = this.options.disabled;
            if (!0 !== c) {
                if (void 0 === b) c = !0;
                else {
                    b = this._getIndex(b);
                    if (-1 !== a.inArray(b, c)) return;
                    c = a.isArray(c) ? a.merge([b], c).sort() : [b]
                }
                this._setupDisabled(c)
            }
        },
        load: function(b, c) {
            b = this._getIndex(b);
            var d = this,
                e = this.tabs.eq(b),
                h = e.find(".ui-tabs-anchor"),
                i = this._getPanelForTab(e),
                j = {
                    tab: e,
                    panel: i
                };
            if (!R(h[0]) && (this.xhr = a.ajax(this._ajaxSettings(h, c, j))) && "canceled" !== this.xhr.statusText) e.addClass("ui-tabs-loading"), i.attr("aria-busy", "true"), this.xhr.success(function(b) {
                setTimeout(function() {
                    i.html(b);
                    d._trigger("load", c, j)
                }, 1)
            }).complete(function(b, c) {
                setTimeout(function() {
                    "abort" ===
                    c && d.panels.stop(!1, !0);
                    e.removeClass("ui-tabs-loading");
                    i.removeAttr("aria-busy");
                    b === d.xhr && delete d.xhr
                }, 1)
            })
        },
        _ajaxSettings: function(b, c, d) {
            var e = this;
            return {
                url: b.attr("href"),
                beforeSend: function(b, h) {
                    return e._trigger("beforeLoad", c, a.extend({
                        jqXHR: b,
                        ajaxSettings: h
                    }, d))
                }
            }
        },
        _getPanelForTab: function(b) {
            b = a(b).attr("aria-controls");
            return this.element.find(this._sanitizeSelector("#" + b))
        }
    });
    var X = 0;
    a.widget("ui.tooltip", {
        version: "1.10.3",
        options: {
            content: function() {
                var b = a(this).attr("title") ||
                    "";
                return a("\x3ca\x3e").text(b).html()
            },
            hide: !0,
            items: "[title]:not([disabled])",
            position: {
                my: "left top+15",
                at: "left bottom",
                collision: "flipfit flip"
            },
            show: !0,
            tooltipClass: null,
            track: !1,
            close: null,
            open: null
        },
        _create: function() {
            this._on({
                mouseover: "open",
                focusin: "open"
            });
            this.tooltips = {};
            this.parents = {};
            this.options.disabled && this._disable()
        },
        _setOption: function(b, c) {
            var d = this;
            "disabled" === b ? (this[c ? "_disable" : "_enable"](), this.options[b] = c) : (this._super(b, c), "content" === b && a.each(this.tooltips, function(b,
                c) {
                d._updateContent(c)
            }))
        },
        _disable: function() {
            var b = this;
            a.each(this.tooltips, function(c, d) {
                var e = a.Event("blur");
                e.target = e.currentTarget = d[0];
                b.close(e, !0)
            });
            this.element.find(this.options.items).addBack().each(function() {
                var b = a(this);
                b.is("[title]") && b.data("ui-tooltip-title", b.attr("title")).attr("title", "")
            })
        },
        _enable: function() {
            this.element.find(this.options.items).addBack().each(function() {
                var b = a(this);
                b.data("ui-tooltip-title") && b.attr("title", b.data("ui-tooltip-title"))
            })
        },
        open: function(b) {
            var c =
                this,
                d = a(b ? b.target : this.element).closest(this.options.items);
            d.length && !d.data("ui-tooltip-id") && (d.attr("title") && d.data("ui-tooltip-title", d.attr("title")), d.data("ui-tooltip-open", !0), b && "mouseover" === b.type && d.parents().each(function() {
                var b = a(this),
                    d;
                b.data("ui-tooltip-open") && (d = a.Event("blur"), d.target = d.currentTarget = this, c.close(d, !0));
                b.attr("title") && (b.uniqueId(), c.parents[this.id] = {
                    element: this,
                    title: b.attr("title")
                }, b.attr("title", ""))
            }), this._updateContent(d, b))
        },
        _updateContent: function(b,
            c) {
            var a;
            a = this.options.content;
            var d = this,
                e = c ? c.type : null;
            if ("string" === typeof a) return this._open(c, b, a);
            (a = a.call(b[0], function(a) {
                b.data("ui-tooltip-open") && d._delay(function() {
                    c && (c.type = e);
                    this._open(c, b, a)
                })
            })) && this._open(c, b, a)
        },
        _open: function(b, c, d) {
            function e(b) {
                j.of = b;
                h.is(":hidden") || h.position(j)
            }
            var h, i, j = a.extend({}, this.options.position);
            if (d)
                if (h = this._find(c), h.length) h.find(".ui-tooltip-content").html(d);
                else {
                    c.is("[title]") && (b && "mouseover" === b.type ? c.attr("title", "") : c.removeAttr("title"));
                    h = this._tooltip(c);
                    var g = h.attr("id"),
                        n = (c.attr("aria-describedby") || "").split(/\s+/);
                    n.push(g);
                    c.data("ui-tooltip-id", g).attr("aria-describedby", a.trim(n.join(" ")));
                    h.find(".ui-tooltip-content").html(d);
                    this.options.track && b && /^mouse/.test(b.type) ? (this._on(this.document, {
                        mousemove: e
                    }), e(b)) : h.position(a.extend({
                        of: c
                    }, this.options.position));
                    h.hide();
                    this._show(h, this.options.show);
                    this.options.show && this.options.show.delay && (i = this.delayedShow = setInterval(function() {
                        h.is(":visible") && (e(j.of),
                            clearInterval(i))
                    }, a.fx.interval));
                    this._trigger("open", b, {
                        tooltip: h
                    });
                    d = {
                        keyup: function(b) {
                            b.keyCode === a.ui.keyCode.ESCAPE && (b = a.Event(b), b.currentTarget = c[0], this.close(b, !0))
                        },
                        remove: function() {
                            this._removeTooltip(h)
                        }
                    };
                    if (!b || "mouseover" === b.type) d.mouseleave = "close";
                    if (!b || "focusin" === b.type) d.focusout = "close";
                    this._on(!0, c, d)
                }
        },
        close: function(b) {
            var c = this,
                d = a(b ? b.currentTarget : this.element),
                e = this._find(d);
            if (!this.closing) {
                clearInterval(this.delayedShow);
                d.data("ui-tooltip-title") && d.attr("title",
                    d.data("ui-tooltip-title"));
                var h = d.data("ui-tooltip-id"),
                    i = (d.attr("aria-describedby") || "").split(/\s+/),
                    h = a.inArray(h, i); - 1 !== h && i.splice(h, 1);
                d.removeData("ui-tooltip-id");
                (i = a.trim(i.join(" "))) ? d.attr("aria-describedby", i): d.removeAttr("aria-describedby");
                e.stop(!0);
                this._hide(e, this.options.hide, function() {
                    c._removeTooltip(a(this))
                });
                d.removeData("ui-tooltip-open");
                this._off(d, "mouseleave focusout keyup");
                d[0] !== this.element[0] && this._off(d, "remove");
                this._off(this.document, "mousemove");
                b &&
                    "mouseleave" === b.type && a.each(this.parents, function(b, d) {
                        a(d.element).attr("title", d.title);
                        delete c.parents[b]
                    });
                this.closing = !0;
                this._trigger("close", b, {
                    tooltip: e
                });
                this.closing = !1
            }
        },
        _tooltip: function(b) {
            var c = "ui-tooltip-" + X++,
                d = a("\x3cdiv\x3e").attr({
                    id: c,
                    role: "tooltip"
                }).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || ""));
            a("\x3cdiv\x3e").addClass("ui-tooltip-content").appendTo(d);
            d.appendTo(this.document[0].body);
            this.tooltips[c] = b;
            return d
        },
        _find: function(b) {
            return (b =
                b.data("ui-tooltip-id")) ? a("#" + b) : a()
        },
        _removeTooltip: function(b) {
            b.remove();
            delete this.tooltips[b.attr("id")]
        },
        _destroy: function() {
            var b = this;
            a.each(this.tooltips, function(c, d) {
                var e = a.Event("blur");
                e.target = e.currentTarget = d[0];
                b.close(e, !0);
                a("#" + c).remove();
                d.data("ui-tooltip-title") && (d.attr("title", d.data("ui-tooltip-title")), d.removeData("ui-tooltip-title"))
            })
        }
    })
})(ChemDoodle.lib.jQuery);
(function(a) {
    a.fn.simpleColor = function(g) {
        var l = this,
            k = "990033 ff3366 cc0033 ff0033 ff9999 cc3366 ffccff cc6699 993366 660033 cc3399 ff99cc ff66cc ff99ff ff6699 cc0066 ff0066 ff3399 ff0099 ff33cc ff00cc ff66ff ff33ff ff00ff cc0099 990066 cc66cc cc33cc cc99ff cc66ff cc33ff 993399 cc00cc cc00ff 9900cc 990099 cc99cc 996699 663366 660099 9933cc 660066 9900ff 9933ff 9966cc 330033 663399 6633cc 6600cc 9966ff 330066 6600ff 6633ff ccccff 9999ff 9999cc 6666cc 6666ff 666699 333366 333399 330099 3300cc 3300ff 3333ff 3333cc 0066ff 0033ff 3366ff 3366cc 000066 000033 0000ff 000099 0033cc 0000cc 336699 0066cc 99ccff 6699ff 003366 6699cc 006699 3399cc 0099cc 66ccff 3399ff 003399 0099ff 33ccff 00ccff 99ffff 66ffff 33ffff 00ffff 00cccc 009999 669999 99cccc ccffff 33cccc 66cccc 339999 336666 006666 003333 00ffcc 33ffcc 33cc99 00cc99 66ffcc 99ffcc 00ff99 339966 006633 336633 669966 66cc66 99ff99 66ff66 339933 99cc99 66ff99 33ff99 33cc66 00cc66 66cc99 009966 009933 33ff66 00ff66 ccffcc ccff99 99ff66 99ff33 00ff33 33ff33 00cc33 33cc33 66ff33 00ff00 66cc33 006600 003300 009900 33ff00 66ff00 99ff00 66cc00 00cc00 33cc00 339900 99cc66 669933 99cc33 336600 669900 99cc00 ccff66 ccff33 ccff00 999900 cccc00 cccc33 333300 666600 999933 cccc66 666633 999966 cccc99 ffffcc ffff99 ffff66 ffff33 ffff00 ffcc00 ffcc66 ffcc33 cc9933 996600 cc9900 ff9900 cc6600 993300 cc6633 663300 ff9966 ff6633 ff9933 ff6600 cc3300 996633 330000 663333 996666 cc9999 993333 cc6666 ffcccc ff3333 cc3333 ff6666 660000 990000 cc0000 ff0000 ff3300 cc9966 ffcc99 ffffff cccccc 999999 666666 333333 000000 000000 000000 000000 000000 000000 000000 000000 000000".split(" ");
        g =
            a.extend({
                defaultColor: this.attr("defaultColor") || "#FFF",
                cellWidth: this.attr("cellWidth") || 10,
                cellHeight: this.attr("cellHeight") || 10,
                cellMargin: this.attr("cellMargin") || 1,
                boxWidth: this.attr("boxWidth") || "115px",
                boxHeight: this.attr("boxHeight") || "20px",
                columns: this.attr("columns") || 16,
                insert: this.attr("insert") || "after",
                colors: this.attr("colors") || k,
                displayColorCode: this.attr("displayColorCode") || !1,
                colorCodeAlign: this.attr("colorCodeAlign") || "center",
                colorCodeColor: this.attr("colorCodeColor") || "#FFF",
                onSelect: null,
                onCellEnter: null,
                onClose: null,
                livePreview: !1
            }, g || {});
        g.totalWidth = g.columns * (g.cellWidth + 2 * g.cellMargin);
        g.chooserCSS = a.extend({
            border: "1px solid #000",
            margin: "0 0 0 5px",
            width: g.totalWidth,
            height: g.totalHeight,
            top: 0,
            left: g.boxWidth,
            position: "absolute",
            "background-color": "#fff"
        }, g.chooserCSS || {});
        g.displayCSS = a.extend({
            "background-color": g.defaultColor,
            border: "1px solid #000",
            width: g.boxWidth,
            height: g.boxHeight,
            "line-height": g.boxHeight + "px",
            cursor: "pointer"
        }, g.displayCSS || {});
        this.hide(); - 1 != navigator.userAgent.indexOf("MSIE") && (g.totalWidth += 2);
        g.totalHeight = Math.ceil(g.colors.length / g.columns) * (g.cellHeight + 2 * g.cellMargin);
        a.simpleColorOptions = g;
        this.each(function() {
            g = a.simpleColorOptions;
            var d = a("\x3cdiv class\x3d'simpleColorContainer' /\x3e");
            d.css("position", "relative");
            var e = this.value && "" != this.value ? this.value : g.defaultColor,
                j = a("\x3cdiv class\x3d'simpleColorDisplay' /\x3e");
            j.css(a.extend(g.displayCSS, {
                "background-color": e
            }));
            j.data("color", e);
            d.append(j);
            g.displayColorCode &&
                (j.data("displayColorCode", !0), j.text(this.value), j.css({
                    color: g.colorCodeColor,
                    textAlign: g.colorCodeAlign
                }));
            j.bind("click", {
                input: this,
                container: d,
                displayBox: j
            }, function(d) {
                a("html").bind("click.simpleColorDisplay", function(e) {
                    a("html").unbind("click.simpleColorDisplay");
                    a(".simpleColorChooser").hide();
                    e = a(e.target);
                    if (!1 === e.is(".simpleColorCell") || !1 === a.contains(a(d.target).closest(".simpleColorContainer")[0], e[0])) j.css("background-color", j.data("color")), g.displayColorCode && j.text(j.data("color"));
                    if (g.onClose) g.onClose(l)
                });
                if (d.data.container.chooser) d.data.container.chooser.toggle();
                else {
                    var e = a("\x3cdiv class\x3d'simpleColorChooser'/\x3e");
                    e.css(g.chooserCSS);
                    d.data.container.chooser = e;
                    d.data.container.append(e);
                    for (var h = 0; h < g.colors.length; h++) {
                        var n = a("\x3cdiv class\x3d'simpleColorCell' id\x3d'" + g.colors[h] + "'/\x3e");
                        n.css({
                            width: g.cellWidth + "px",
                            height: g.cellHeight + "px",
                            margin: g.cellMargin + "px",
                            cursor: "pointer",
                            lineHeight: g.cellHeight + "px",
                            fontSize: "1px",
                            "float": "left",
                            "background-color": "#" +
                                g.colors[h]
                        });
                        e.append(n);
                        (g.onCellEnter || g.livePreview) && n.bind("mouseenter", function() {
                            if (g.onCellEnter) g.onCellEnter(this.id, l);
                            g.livePreview && (j.css("background-color", "#" + this.id), g.displayColorCode && j.text("#" + this.id))
                        });
                        n.bind("click", {
                            input: d.data.input,
                            chooser: e,
                            displayBox: j
                        }, function(d) {
                            var c = "#" + this.id;
                            d.data.input.value = c;
                            a(d.data.input).change();
                            a(d.data.displayBox).data("color", c);
                            d.data.displayBox.css("background-color", c);
                            d.data.chooser.hide();
                            g.displayColorCode && d.data.displayBox.text(c);
                            if (g.onSelect) g.onSelect(c, l)
                        })
                    }
                }
            });
            a(this).after(d);
            a(this).data("container", d)
        });
        a(".simpleColorDisplay").each(function() {
            a(this).click(function(a) {
                a.stopPropagation()
            })
        });
        return this
    };
    a.fn.closeChooser = function() {
        this.each(function() {
            a(this).data("container").find(".simpleColorChooser").hide()
        });
        return this
    };
    a.fn.setColor = function(g) {
        this.each(function() {
            var l = a(this).data("container").find(".simpleColorDisplay");
            l.css("background-color", g).data("color", g);
            !0 === l.data("displayColorCode") && l.text(g)
        });
        return this
    }
})(ChemDoodle.lib.jQuery);
ChemDoodle.uis = function() {
    var a = {
        actions: {},
        gui: {}
    };
    a.gui.desktop = {};
    a.gui.mobile = {};
    a.states = {};
    a.tools = {};
    return a
}();
(function(a) {
    a._Action = function() {};
    a = a._Action.prototype;
    a.forward = function(a) {
        this.innerForward();
        this.checks(a)
    };
    a.reverse = function(a) {
        this.innerReverse();
        this.checks(a)
    };
    a.checks = function(a) {
        for (var l = 0, k = a.molecules.length; l < k; l++) a.molecules[l].check();
        a.lasso && a.lasso.isActive() && a.lasso.setBounds();
        a.repaint()
    }
})(ChemDoodle.uis.actions);
(function(a, g, l) {
    l.AddAction = function(a, d, e, j) {
        this.sketcher = a;
        this.a = d;
        this.as = e;
        this.bs = j
    };
    l = l.AddAction.prototype = new l._Action;
    l.innerForward = function() {
        var a = this.sketcher.getMoleculeByAtom(this.a);
        a || (a = new g.Molecule, this.sketcher.molecules.push(a));
        if (this.as)
            for (var d = 0, e = this.as.length; d < e; d++) a.atoms.push(this.as[d]);
        if (this.bs) {
            for (var j = [], d = 0, e = this.bs.length; d < e; d++) {
                var i = this.bs[d];
                if (-1 === a.atoms.indexOf(i.a1)) {
                    var p = this.sketcher.getMoleculeByAtom(i.a1); - 1 === j.indexOf(p) && j.push(p)
                } - 1 ===
                    a.atoms.indexOf(i.a2) && (p = this.sketcher.getMoleculeByAtom(i.a2), -1 === j.indexOf(p) && j.push(p));
                a.bonds.push(i)
            }
            d = 0;
            for (e = j.length; d < e; d++) i = j[d], this.sketcher.removeMolecule(i), a.atoms = a.atoms.concat(i.atoms), a.bonds = a.bonds.concat(i.bonds)
        }
    };
    l.innerReverse = function() {
        var g = this.sketcher.getMoleculeByAtom(this.a);
        if (this.as) {
            for (var d = [], e = 0, j = g.atoms.length; e < j; e++) - 1 === this.as.indexOf(g.atoms[e]) && d.push(g.atoms[e]);
            g.atoms = d
        }
        if (this.bs) {
            d = [];
            e = 0;
            for (j = g.bonds.length; e < j; e++) - 1 === this.bs.indexOf(g.bonds[e]) &&
                d.push(g.bonds[e]);
            g.bonds = d
        }
        if (0 === g.atoms.length) this.sketcher.removeMolecule(g);
        else if (d = (new a.Splitter).split(g), 1 < d.length) {
            this.sketcher.removeMolecule(g);
            e = 0;
            for (j = d.length; e < j; e++) this.sketcher.molecules.push(d[e])
        }
    }
})(ChemDoodle.informatics, ChemDoodle.structures, ChemDoodle.uis.actions);
(function(a) {
    a.AddShapeAction = function(a, l) {
        this.sketcher = a;
        this.s = l
    };
    a = a.AddShapeAction.prototype = new a._Action;
    a.innerForward = function() {
        this.sketcher.shapes.push(this.s)
    };
    a.innerReverse = function() {
        this.sketcher.removeShape(this.s)
    }
})(ChemDoodle.uis.actions);
(function(a, g, l) {
    a.ChangeBondAction = function(a, d, e) {
        this.b = a;
        this.orderBefore = a.bondOrder;
        this.stereoBefore = a.stereo;
        d ? (this.orderAfter = d, this.stereoAfter = e) : (this.orderAfter = l.floor(a.bondOrder + 1), 3 < this.orderAfter && (this.orderAfter = 1), this.stereoAfter = g.STEREO_NONE)
    };
    a = a.ChangeBondAction.prototype = new a._Action;
    a.innerForward = function() {
        this.b.bondOrder = this.orderAfter;
        this.b.stereo = this.stereoAfter
    };
    a.innerReverse = function() {
        this.b.bondOrder = this.orderBefore;
        this.b.stereo = this.stereoBefore
    }
})(ChemDoodle.uis.actions,
    ChemDoodle.structures.Bond, Math);
(function(a, g) {
    a.ChangeBracketAttributeAction = function(a, d) {
        this.s = a;
        this.type = d
    };
    var l = a.ChangeBracketAttributeAction.prototype = new a._Action;
    l.innerForward = function() {
        var a = 0 < this.type ? 1 : -1;
        switch (g.abs(this.type)) {
            case 1:
                this.s.charge += a;
                break;
            case 2:
                this.s.repeat += a;
                break;
            case 3:
                this.s.mult += a
        }
    };
    l.innerReverse = function() {
        var a = 0 < this.type ? -1 : 1;
        switch (g.abs(this.type)) {
            case 1:
                this.s.charge += a;
                break;
            case 2:
                this.s.repeat += a;
                break;
            case 3:
                this.s.mult += a
        }
    }
})(ChemDoodle.uis.actions, Math);
(function(a) {
    a.ChangeChargeAction = function(a, l) {
        this.a = a;
        this.delta = l
    };
    a = a.ChangeChargeAction.prototype = new a._Action;
    a.innerForward = function() {
        this.a.charge += this.delta
    };
    a.innerReverse = function() {
        this.a.charge -= this.delta
    }
})(ChemDoodle.uis.actions);
(function(a) {
    a.ChangeCoordinatesAction = function(a, l) {
        this.as = a;
        this.recs = [];
        for (var k = 0, d = this.as.length; k < d; k++) this.recs[k] = {
            xo: this.as[k].x,
            yo: this.as[k].y,
            xn: l[k].x,
            yn: l[k].y
        }
    };
    a = a.ChangeCoordinatesAction.prototype = new a._Action;
    a.innerForward = function() {
        for (var a = 0, l = this.as.length; a < l; a++) this.as[a].x = this.recs[a].xn, this.as[a].y = this.recs[a].yn
    };
    a.innerReverse = function() {
        for (var a = 0, l = this.as.length; a < l; a++) this.as[a].x = this.recs[a].xo, this.as[a].y = this.recs[a].yo
    }
})(ChemDoodle.uis.actions);
(function(a) {
    a.ChangeLabelAction = function(a, l) {
        this.a = a;
        this.before = a.label;
        this.after = l
    };
    a = a.ChangeLabelAction.prototype = new a._Action;
    a.innerForward = function() {
        this.a.label = this.after
    };
    a.innerReverse = function() {
        this.a.label = this.before
    }
})(ChemDoodle.uis.actions);
(function(a) {
    a.ChangeLonePairAction = function(a, l) {
        this.a = a;
        this.delta = l
    };
    a = a.ChangeLonePairAction.prototype = new a._Action;
    a.innerForward = function() {
        this.a.numLonePair += this.delta
    };
    a.innerReverse = function() {
        this.a.numLonePair -= this.delta
    }
})(ChemDoodle.uis.actions);
(function(a) {
    a.ChangeQueryAction = function(a, l) {
        this.o = a;
        this.before = a.query;
        this.after = l
    };
    a = a.ChangeQueryAction.prototype = new a._Action;
    a.innerForward = function() {
        this.o.query = this.after
    };
    a.innerReverse = function() {
        this.o.query = this.before
    }
})(ChemDoodle.uis.actions);
(function(a) {
    a.ChangeRadicalAction = function(a, l) {
        this.a = a;
        this.delta = l
    };
    a = a.ChangeRadicalAction.prototype = new a._Action;
    a.innerForward = function() {
        this.a.numRadical += this.delta
    };
    a.innerReverse = function() {
        this.a.numRadical -= this.delta
    }
})(ChemDoodle.uis.actions);
(function(a) {
    a.ChangeRgroupAction = function(a, l) {
        this.a = a;
        this.rbefore = a.rgroup;
        this.rafter = l
    };
    a = a.ChangeRgroupAction.prototype = new a._Action;
    a.innerForward = function() {
        this.a.rgroup = this.rafter
    };
    a.innerReverse = function() {
        this.a.rgroup = this.rbefore
    }
})(ChemDoodle.uis.actions);
(function(a, g) {
    g.ClearAction = function(g) {
        this.sketcher = g;
        this.beforeMols = this.sketcher.molecules;
        this.beforeShapes = this.sketcher.shapes;
        this.sketcher.clear();
        this.sketcher.oneMolecule && !this.sketcher.setupScene && (this.afterMol = new a.Molecule, this.afterMol.atoms.push(new a.Atom), this.sketcher.molecules.push(this.afterMol), this.sketcher.center(), this.sketcher.repaint())
    };
    var l = g.ClearAction.prototype = new g._Action;
    l.innerForward = function() {
        this.sketcher.molecules = [];
        this.sketcher.shapes = [];
        this.sketcher.oneMolecule &&
            !this.sketcher.setupScene && this.sketcher.molecules.push(this.afterMol)
    };
    l.innerReverse = function() {
        this.sketcher.molecules = this.beforeMols;
        this.sketcher.shapes = this.beforeShapes
    }
})(ChemDoodle.structures, ChemDoodle.uis.actions);
(function(a) {
    a.DeleteAction = function(a, g, d, e) {
        this.sketcher = a;
        this.a = g;
        this.as = d;
        this.bs = e;
        this.ss = []
    };
    var g = a.DeleteAction.prototype = new a._Action;
    g.innerForwardAReverse = a.AddAction.prototype.innerReverse;
    g.innerReverseAForward = a.AddAction.prototype.innerForward;
    g.innerForward = function() {
        this.innerForwardAReverse();
        for (var a = 0, g = this.ss.length; a < g; a++) this.sketcher.removeShape(this.ss[a])
    };
    g.innerReverse = function() {
        this.innerReverseAForward();
        0 < this.ss.length && (this.sketcher.shapes = this.sketcher.shapes.concat(this.ss))
    }
})(ChemDoodle.uis.actions);
(function(a, g) {
    g.DeleteContentAction = function(a, d, e) {
        this.sketcher = a;
        this.as = d;
        this.ss = e;
        this.bs = [];
        a = 0;
        for (d = this.sketcher.molecules.length; a < d; a++) {
            e = this.sketcher.molecules[a];
            for (var j = 0, i = e.bonds.length; j < i; j++) {
                var g = e.bonds[j];
                g.a1.isLassoed && g.a2.isLassoed && this.bs.push(g)
            }
        }
    };
    var l = g.DeleteContentAction.prototype = new g._Action;
    l.innerForward = function() {
        for (var g = 0, d = this.ss.length; g < d; g++) this.sketcher.removeShape(this.ss[g]);
        for (var e = [], j = [], g = 0, d = this.sketcher.molecules.length; g < d; g++) {
            for (var i =
                    this.sketcher.molecules[g], p = 0, h = i.atoms.length; p < h; p++) {
                var n = i.atoms[p]; - 1 === this.as.indexOf(n) && e.push(n)
            }
            p = 0;
            for (h = i.bonds.length; p < h; p++) n = i.bonds[p], -1 === this.bs.indexOf(n) && j.push(n)
        }
        this.sketcher.molecules = (new a.Splitter).split({
            atoms: e,
            bonds: j
        })
    };
    l.innerReverse = function() {
        this.sketcher.shapes = this.sketcher.shapes.concat(this.ss);
        for (var g = [], d = [], e = 0, j = this.sketcher.molecules.length; e < j; e++) var i = this.sketcher.molecules[e],
            g = g.concat(i.atoms),
            d = d.concat(i.bonds);
        this.sketcher.molecules =
            (new a.Splitter).split({
                atoms: g.concat(this.as),
                bonds: d.concat(this.bs)
            })
    }
})(ChemDoodle.informatics, ChemDoodle.uis.actions);
(function(a) {
    a.DeleteShapeAction = function(a, g) {
        this.sketcher = a;
        this.s = g
    };
    var g = a.DeleteShapeAction.prototype = new a._Action;
    g.innerForward = a.AddShapeAction.prototype.innerReverse;
    g.innerReverse = a.AddShapeAction.prototype.innerForward
})(ChemDoodle.uis.actions);
(function(a) {
    a.FlipBondAction = function(a) {
        this.b = a
    };
    a = a.FlipBondAction.prototype = new a._Action;
    a.innerForward = function() {
        var a = this.b.a1;
        this.b.a1 = this.b.a2;
        this.b.a2 = a
    };
    a.innerReverse = function() {
        this.innerForward()
    }
})(ChemDoodle.uis.actions);
(function(a) {
    a.MoveAction = function(a, l) {
        this.ps = a;
        this.dif = l
    };
    a = a.MoveAction.prototype = new a._Action;
    a.innerForward = function() {
        for (var a = 0, l = this.ps.length; a < l; a++) this.ps[a].add(this.dif)
    };
    a.innerReverse = function() {
        for (var a = 0, l = this.ps.length; a < l; a++) this.ps[a].sub(this.dif)
    }
})(ChemDoodle.uis.actions);
(function(a, g) {
    g.NewMoleculeAction = function(a, d, e) {
        this.sketcher = a;
        this.as = d;
        this.bs = e
    };
    var l = g.NewMoleculeAction.prototype = new g._Action;
    l.innerForward = function() {
        var g = new a.Molecule;
        g.atoms = g.atoms.concat(this.as);
        g.bonds = g.bonds.concat(this.bs);
        g.check();
        this.sketcher.addMolecule(g)
    };
    l.innerReverse = function() {
        this.sketcher.removeMolecule(this.sketcher.getMoleculeByAtom(this.as[0]))
    }
})(ChemDoodle.structures, ChemDoodle.uis.actions);
(function(a, g) {
    a.RotateAction = function(a, d, e) {
        this.ps = a;
        this.dif = d;
        this.center = e
    };
    var l = a.RotateAction.prototype = new a._Action;
    l.innerForward = function() {
        for (var a = 0, d = this.ps.length; a < d; a++) {
            var e = this.ps[a],
                j = this.center.distance(e),
                i = this.center.angle(e) + this.dif;
            e.x = this.center.x + j * g.cos(i);
            e.y = this.center.y - j * g.sin(i)
        }
    };
    l.innerReverse = function() {
        for (var a = 0, d = this.ps.length; a < d; a++) {
            var e = this.ps[a],
                j = this.center.distance(e),
                i = this.center.angle(e) - this.dif;
            e.x = this.center.x + j * g.cos(i);
            e.y = this.center.y -
                j * g.sin(i)
        }
    }
})(ChemDoodle.uis.actions, Math);
(function(a) {
    a.SwitchContentAction = function(a, l, k) {
        this.sketcher = a;
        this.beforeMols = this.sketcher.molecules;
        this.beforeShapes = this.sketcher.shapes;
        this.molsA = l;
        this.shapesA = k
    };
    a = a.SwitchContentAction.prototype = new a._Action;
    a.innerForward = function() {
        this.sketcher.loadContent(this.molsA, this.shapesA)
    };
    a.innerReverse = function() {
        this.sketcher.molecules = this.beforeMols;
        this.sketcher.shapes = this.beforeShapes
    }
})(ChemDoodle.uis.actions);
(function(a) {
    a.SwitchMoleculeAction = function(a, l) {
        this.sketcher = a;
        this.beforeMols = this.sketcher.molecules;
        this.beforeShapes = this.sketcher.shapes;
        this.molA = l
    };
    a = a.SwitchMoleculeAction.prototype = new a._Action;
    a.innerForward = function() {
        this.sketcher.loadMolecule(this.molA)
    };
    a.innerReverse = function() {
        this.sketcher.molecules = this.beforeMols;
        this.sketcher.shapes = this.beforeShapes
    }
})(ChemDoodle.uis.actions);
(function(a) {
    a.ToggleAnyAtomAction = function(a) {
        this.a = a
    };
    var g = a.ToggleAnyAtomAction.prototype = new a._Action;
    g.innerForward = function() {
        this.a.any = !this.a.any
    };
    g.innerReverse = a.ToggleAnyAtomAction.prototype.innerForward
})(ChemDoodle.uis.actions);
(function(a) {
    a.HistoryManager = function(a) {
        this.sketcher = a;
        this.undoStack = [];
        this.redoStack = []
    };
    a = a.HistoryManager.prototype;
    a.undo = function() {
        if (0 !== this.undoStack.length) {
            this.sketcher.lasso && this.sketcher.lasso.isActive() && this.sketcher.lasso.empty();
            var a = this.undoStack.pop();
            a.reverse(this.sketcher);
            this.redoStack.push(a);
            0 === this.undoStack.length && this.sketcher.toolbarManager.buttonUndo.disable();
            this.sketcher.toolbarManager.buttonRedo.enable()
        }
    };
    a.redo = function() {
        if (0 !== this.redoStack.length) {
            this.sketcher.lasso &&
                this.sketcher.lasso.isActive() && this.sketcher.lasso.empty();
            var a = this.redoStack.pop();
            a.forward(this.sketcher);
            this.undoStack.push(a);
            this.sketcher.toolbarManager.buttonUndo.enable();
            0 === this.redoStack.length && this.sketcher.toolbarManager.buttonRedo.disable()
        }
    };
    a.pushUndo = function(a) {
        a.forward(this.sketcher);
        this.undoStack.push(a);
        0 !== this.redoStack.length && (this.redoStack = []);
        this.sketcher.toolbarManager.buttonUndo.enable();
        this.sketcher.toolbarManager.buttonRedo.disable()
    };
    a.clear = function() {
        0 !==
            this.undoStack.length && (this.undoStack = [], this.sketcher.toolbarManager.buttonUndo.disable());
        0 !== this.redoStack.length && (this.redoStack = [], this.sketcher.toolbarManager.buttonRedo.disable())
    }
})(ChemDoodle.uis.actions);
(function(a, g, l, k, d, e, j) {
    k._State = function() {};
    k = k._State.prototype;
    k.setup = function(a) {
        this.sketcher = a
    };
    k.clearHover = function() {
        this.sketcher.hovering && (this.sketcher.hovering.isHover = !1, this.sketcher.hovering.isSelected = !1, this.sketcher.hovering = void 0)
    };
    k.findHoveredObject = function(a, d, e, j) {
        this.clearHover();
        var g = Infinity,
            c, k = this.sketcher.specs.bondLength_2D;
        this.sketcher.isMobile || (k /= this.sketcher.specs.scale);
        if (d) {
            d = 0;
            for (var l = this.sketcher.molecules.length; d < l; d++)
                for (var q = this.sketcher.molecules[d],
                        u = 0, w = q.atoms.length; u < w; u++) {
                    var y = q.atoms[u];
                    y.isHover = !1;
                    var v = a.p.distance(y);
                    v < k && v < g && (g = v, c = y)
                }
        }
        if (e) {
            d = 0;
            for (l = this.sketcher.molecules.length; d < l; d++) {
                q = this.sketcher.molecules[d];
                u = 0;
                for (w = q.bonds.length; u < w; u++) e = q.bonds[u], e.isHover = !1, v = a.p.distance(e.getCenter()), v < k && v < g && (g = v, c = e)
            }
        }
        if (j) {
            d = 0;
            for (l = this.sketcher.shapes.length; d < l; d++) {
                j = this.sketcher.shapes[d];
                j.isHover = !1;
                j.hoverPoint = void 0;
                e = j.getPoints();
                u = 0;
                for (w = e.length; u < w; u++) q = e[u], v = a.p.distance(q), v < k && v < g && (g = v, c = j, j.hoverPoint =
                    q)
            }
            if (!c) {
                d = 0;
                for (l = this.sketcher.shapes.length; d < l; d++) j = this.sketcher.shapes[d], j.isOver(a.p, k) && (c = j)
            }
        }
        c && (c.isHover = !0, this.sketcher.hovering = c)
    };
    k.getOptimumAngle = function(d, e) {
        var h = this.sketcher.getMoleculeByAtom(d),
            g = h.getAngles(d),
            k = 0;
        if (0 === g.length) k = j.PI / 6;
        else if (1 === g.length) {
            for (var c, k = 0, l = h.bonds.length; k < l; k++) h.bonds[k].contains(this.sketcher.hovering) && (c = h.bonds[k]);
            3 <= c.bondOrder || 3 <= e ? k = g[0] + j.PI : (h = 2 * (g[0] % j.PI), k = a.isBetween(h, 0, j.PI / 2) || a.isBetween(h, j.PI, 3 * j.PI / 2) ? g[0] +
                2 * j.PI / 3 : g[0] - 2 * j.PI / 3)
        } else {
            for (var r, k = 0, l = h.rings.length; k < l; k++) c = h.rings[k], -1 !== c.atoms.indexOf(d) && (g.push(d.angle(c.getCenter())), r = !0);
            r && g.sort();
            k = a.angleBetweenLargest(g).angle
        }
        return k
    };
    k.removeStartAtom = function() {
        this.sketcher.startAtom && (this.sketcher.startAtom.x = -10, this.sketcher.startAtom.y = -10, this.sketcher.repaint())
    };
    k.enter = function() {
        this.innerenter && this.innerenter()
    };
    k.exit = function() {
        this.innerexit && this.innerexit()
    };
    k.click = function(a) {
        this.innerclick && this.innerclick(a)
    };
    k.rightclick = function(a) {
        this.innerrightclick && this.innerrightclick(a)
    };
    k.dblclick = function(a) {
        this.innerdblclick && this.innerdblclick(a);
        if (!this.sketcher.hovering && this.sketcher.oneMolecule) {
            a = new d.Point(this.sketcher.width / 2, this.sketcher.height / 2);
            var e = this.sketcher.getContentBounds();
            a.x -= (e.maxX + e.minX) / 2;
            a.y -= (e.maxY + e.minY) / 2;
            this.sketcher.historyManager.pushUndo(new l.MoveAction(this.sketcher.getAllPoints(), a))
        }
    };
    k.mousedown = function(a) {
        this.sketcher.lastPoint = a.p;
        this.sketcher.isHelp ||
            this.sketcher.isMobile && 10 > a.op.distance(new d.Point(this.sketcher.width - 20, 20)) ? (this.sketcher.isHelp = !1, this.sketcher.lastPoint = void 0, this.sketcher.repaint(), window.open("http://web.chemdoodle.com/demos/sketcher")) : this.innermousedown && this.innermousedown(a)
    };
    k.rightmousedown = function(a) {
        this.innerrightmousedown && this.innerrightmousedown(a)
    };
    k.mousemove = function(a) {
        this.innermousemove && this.innermousemove(a);
        this.sketcher.repaint()
    };
    k.mouseout = function(a) {
        this.innermouseout && this.innermouseout(a);
        this.sketcher.isHelp && (this.sketcher.isHelp = !1, this.sketcher.repaint());
        this.sketcher.hovering && g.CANVAS_DRAGGING != this.sketcher && (this.sketcher.hovering = void 0, this.sketcher.repaint())
    };
    k.mouseover = function(a) {
        this.innermouseover && this.innermouseover(a)
    };
    k.mouseup = function(a) {
        this.parentAction = void 0;
        this.innermouseup && this.innermouseup(a)
    };
    k.rightmouseup = function(a) {
        this.innerrightmouseup && this.innerrightmouseup(a)
    };
    k.mousewheel = function(a, d) {
        this.innermousewheel && this.innermousewheel(a);
        this.sketcher.specs.scale +=
            d / 50;
        this.sketcher.checkScale();
        this.sketcher.repaint()
    };
    k.drag = function(a) {
        this.innerdrag && this.innerdrag(a);
        if (!this.sketcher.hovering && this !== this.sketcher.stateManager.STATE_LASSO && this !== this.sketcher.stateManager.STATE_SHAPE && this !== this.sketcher.stateManager.STATE_PUSHER) {
            if (g.SHIFT)
                if (this.parentAction) {
                    var e = this.parentAction.center,
                        h = e.angle(this.sketcher.lastPoint),
                        n = e.angle(a.p),
                        k = n - h;
                    this.parentAction.dif += k;
                    h = 0;
                    for (n = this.parentAction.ps.length; h < n; h++) {
                        var c = this.parentAction.ps[h],
                            o = e.distance(c),
                            r = e.angle(c) + k;
                        c.x = e.x + o * j.cos(r);
                        c.y = e.y - o * j.sin(r)
                    }
                    h = 0;
                    for (n = this.sketcher.molecules.length; h < n; h++) this.sketcher.molecules[h].check()
                } else e = new d.Point(this.sketcher.width / 2, this.sketcher.height / 2), h = e.angle(this.sketcher.lastPoint), n = e.angle(a.p), this.parentAction = new l.RotateAction(this.sketcher.getAllPoints(), n - h, e), this.sketcher.historyManager.pushUndo(this.parentAction);
            else {
                if (!this.sketcher.lastPoint) return;
                e = new d.Point(a.p.x, a.p.y);
                e.sub(this.sketcher.lastPoint);
                if (this.parentAction) {
                    this.parentAction.dif.add(e);
                    h = 0;
                    for (n = this.parentAction.ps.length; h < n; h++) this.parentAction.ps[h].add(e);
                    this.sketcher.lasso && this.sketcher.lasso.isActive() && (this.sketcher.lasso.bounds.minX += e.x, this.sketcher.lasso.bounds.maxX += e.x, this.sketcher.lasso.bounds.minY += e.y, this.sketcher.lasso.bounds.maxY += e.y);
                    h = 0;
                    for (n = this.sketcher.molecules.length; h < n; h++) this.sketcher.molecules[h].check()
                } else this.parentAction = new l.MoveAction(this.sketcher.getAllPoints(), e), this.sketcher.historyManager.pushUndo(this.parentAction)
            }
            this.sketcher.repaint()
        }
        this.sketcher.lastPoint =
            a.p
    };
    k.keydown = function(i) {
        if (g.CANVAS_DRAGGING === this.sketcher) this.sketcher.lastPoint && (i.p = this.sketcher.lastPoint, this.drag(i));
        else if (g.META) 90 === i.which ? this.sketcher.historyManager.undo() : 89 === i.which ? this.sketcher.historyManager.redo() : 83 === i.which ? this.sketcher.toolbarManager.buttonSave.getElement().click() : 79 === i.which ? this.sketcher.toolbarManager.buttonOpen.getElement().click() : 78 === i.which ? this.sketcher.toolbarManager.buttonClear.getElement().click() : 187 === i.which || 61 === i.which ? this.sketcher.toolbarManager.buttonScalePlus.getElement().click() :
            189 === i.which || 109 === i.which ? this.sketcher.toolbarManager.buttonScaleMinus.getElement().click() : 65 === i.which && !this.sketcher.oneMolecule && (this.sketcher.toolbarManager.buttonLasso.getElement().click(), this.sketcher.lasso.select(this.sketcher.getAllAtoms(), this.sketcher.shapes));
        else if (9 === i.which) {
            if (!this.sketcher.oneMolecule)
                if (this.sketcher.lasso.block = !0, this.sketcher.toolbarManager.buttonLasso.getElement().click(), this.sketcher.lasso.block = !1, g.SHIFT) {
                    if (0 < this.sketcher.shapes.length) {
                        var k =
                            this.sketcher.shapes.length - 1;
                        0 < this.sketcher.lasso.shapes.length && (k = this.sketcher.shapes.indexOf(this.sketcher.lasso.shapes[0]) + 1);
                        k === this.sketcher.shapes.length && (k = 0);
                        this.sketcher.lasso.empty();
                        this.sketcher.lasso.select([], [this.sketcher.shapes[k]])
                    }
                } else 0 < this.sketcher.molecules.length && (k = this.sketcher.molecules.length - 1, 0 < this.sketcher.lasso.atoms.length && (k = this.sketcher.getMoleculeByAtom(this.sketcher.lasso.atoms[0]), k = this.sketcher.molecules.indexOf(k) + 1), k === this.sketcher.molecules.length &&
                    (k = 0), this.sketcher.lasso.select(this.sketcher.molecules[k].atoms, []))
        } else if (32 === i.which) this.sketcher.lasso && this.sketcher.lasso.empty(), this.sketcher.toolbarManager.buttonSingle.getElement().click();
        else if (37 <= i.which && 40 >= i.which) {
            k = new d.Point;
            switch (i.which) {
                case 37:
                    k.x = -10;
                    break;
                case 38:
                    k.y = -10;
                    break;
                case 39:
                    k.x = 10;
                    break;
                case 40:
                    k.y = 10
            }
            this.sketcher.historyManager.pushUndo(new l.MoveAction(this.sketcher.lasso && this.sketcher.lasso.isActive() ? this.sketcher.lasso.getAllPoints() : this.sketcher.getAllPoints(),
                k))
        } else if (187 === i.which || 189 === i.which || 61 === i.which || 109 === i.which) this.sketcher.hovering && this.sketcher.hovering instanceof d.Atom && this.sketcher.historyManager.pushUndo(new l.ChangeChargeAction(this.sketcher.hovering, 187 === i.which || 61 === i.which ? 1 : -1));
        else if (8 === i.which || 127 === i.which) this.sketcher.stateManager.STATE_ERASE.handleDelete();
        else if (48 <= i.which && 57 >= i.which) {
            if (this.sketcher.hovering) {
                var h = i.which - 48,
                    n = [],
                    s = [];
                if (this.sketcher.hovering instanceof d.Atom)
                    if (k = this.sketcher.hovering,
                        g.SHIFT) {
                        if (2 < h && 9 > h) {
                            var c = this.sketcher.getMoleculeByAtom(this.sketcher.hovering),
                                o = c.getAngles(this.sketcher.hovering),
                                r = 3 * j.PI / 2;
                            0 !== o.length && (r = a.angleBetweenLargest(o).angle);
                            h = this.sketcher.stateManager.STATE_NEW_RING.getRing(this.sketcher.hovering, h, this.sketcher.specs.bondLength_2D, r, !1); - 1 === c.atoms.indexOf(h[0]) && n.push(h[0]);
                            this.sketcher.bondExists(this.sketcher.hovering, h[0]) || s.push(new d.Bond(this.sketcher.hovering, h[0]));
                            for (var q = 1, u = h.length; q < u; q++) - 1 === c.atoms.indexOf(h[q]) &&
                                n.push(h[q]), this.sketcher.bondExists(h[q - 1], h[q]) || s.push(new d.Bond(h[q - 1], h[q]));
                            this.sketcher.bondExists(h[h.length - 1], this.sketcher.hovering) || s.push(new d.Bond(h[h.length - 1], this.sketcher.hovering))
                        }
                    } else {
                        0 === h && (h = 10);
                        for (var w = new d.Point(this.sketcher.hovering.x, this.sketcher.hovering.y), y = this.getOptimumAngle(this.sketcher.hovering), v = this.sketcher.hovering, A = 0; A < h; A++) {
                            c = y + (1 === A % 2 ? j.PI / 3 : 0);
                            w.x += this.sketcher.specs.bondLength_2D * j.cos(c);
                            w.y -= this.sketcher.specs.bondLength_2D * j.sin(c);
                            for (var x = new d.Atom("C", w.x, w.y), E = Infinity, D, q = 0, u = this.sketcher.molecules.length; q < u; q++) {
                                c = this.sketcher.molecules[q];
                                o = 0;
                                for (r = c.atoms.length; o < r; o++) {
                                    var B = c.atoms[o],
                                        C = B.distance(x);
                                    C < E && (E = C, D = B)
                                }
                            }
                            5 > E ? x = D : n.push(x);
                            this.sketcher.bondExists(v, x) || s.push(new d.Bond(v, x));
                            v = x
                        }
                    } else if (this.sketcher.hovering instanceof d.Bond)
                    if (k = this.sketcher.hovering.a1, g.SHIFT) {
                        if (2 < h && 9 > h) {
                            h = this.sketcher.stateManager.STATE_NEW_RING.getOptimalRing(this.sketcher.hovering, h);
                            r = this.sketcher.hovering.a2;
                            o = this.sketcher.hovering.a1;
                            c = this.sketcher.getMoleculeByAtom(r);
                            h[0] === this.sketcher.hovering.a1 && (r = this.sketcher.hovering.a1, o = this.sketcher.hovering.a2); - 1 === c.atoms.indexOf(h[1]) && n.push(h[1]);
                            this.sketcher.bondExists(r, h[1]) || s.push(new d.Bond(r, h[1]));
                            q = 2;
                            for (u = h.length; q < u; q++) - 1 === c.atoms.indexOf(h[q]) && n.push(h[q]), this.sketcher.bondExists(h[q - 1], h[q]) || s.push(new d.Bond(h[q - 1], h[q]));
                            this.sketcher.bondExists(h[h.length - 1], o) || s.push(new d.Bond(h[h.length - 1], o))
                        }
                    } else if (0 < h && 4 > h && this.sketcher.hovering.bondOrder !==
                    h) this.sketcher.historyManager.pushUndo(new l.ChangeBondAction(this.sketcher.hovering, h, d.Bond.STEREO_NONE));
                else if (7 === h || 8 === h) c = d.Bond.STEREO_RECESSED, 7 === h && (c = d.Bond.STEREO_PROTRUDING), this.sketcher.historyManager.pushUndo(new l.ChangeBondAction(this.sketcher.hovering, 1, c));
                (0 !== n.length || 0 !== s.length) && this.sketcher.historyManager.pushUndo(new l.AddAction(this.sketcher, k, n, s))
            }
        } else if (65 <= i.which && 90 >= i.which && this.sketcher.hovering)
            if (this.sketcher.hovering instanceof d.Atom) {
                k = String.fromCharCode(i.which);
                c = !1;
                o = 0;
                for (r = e.length; o < r; o++)
                    if (this.sketcher.hovering.label.charAt(0) === k) e[o] === this.sketcher.hovering.label ? c = !0 : e[o].charAt(0) === k && (c && !s ? s = e[o] : n || (n = e[o]));
                    else if (e[o].charAt(0) === k) {
                    n = e[o];
                    break
                }
                x = "C";
                s ? x = s : n && (x = n);
                x !== this.sketcher.hovering.label && this.sketcher.historyManager.pushUndo(new l.ChangeLabelAction(this.sketcher.hovering, x))
            } else this.sketcher.hovering instanceof d.Bond && 70 === i.which && this.sketcher.historyManager.pushUndo(new l.FlipBondAction(this.sketcher.hovering));
        this.innerkeydown &&
            this.innerkeydown(i)
    };
    k.keypress = function(a) {
        this.innerkeypress && this.innerkeypress(a)
    };
    k.keyup = function(a) {
        g.CANVAS_DRAGGING === this.sketcher && this.sketcher.lastPoint && (a.p = this.sketcher.lastPoint, this.sketcher.drag(a));
        this.innerkeyup && this.innerkeyup(a)
    }
})(ChemDoodle.math, ChemDoodle.monitor, ChemDoodle.uis.actions, ChemDoodle.uis.states, ChemDoodle.structures, ChemDoodle.SYMBOLS, Math);
(function(a, g) {
    g.ChargeState = function(a) {
        this.setup(a)
    };
    var l = g.ChargeState.prototype = new g._State;
    l.delta = 1;
    l.innermouseup = function() {
        this.sketcher.hovering && this.sketcher.historyManager.pushUndo(new a.ChangeChargeAction(this.sketcher.hovering, this.delta))
    };
    l.innermousemove = function(a) {
        this.findHoveredObject(a, !0, !1)
    }
})(ChemDoodle.uis.actions, ChemDoodle.uis.states);
(function(a, g, l, k) {
    g.EraseState = function(a) {
        this.setup(a)
    };
    g = g.EraseState.prototype = new g._State;
    g.handleDelete = function() {
        if (this.sketcher.lasso && this.sketcher.lasso.isActive()) this.sketcher.historyManager.pushUndo(new a.DeleteContentAction(this.sketcher, this.sketcher.lasso.atoms, this.sketcher.lasso.shapes)), this.sketcher.lasso.empty();
        else if (this.sketcher.hovering) {
            if (this.sketcher.hovering instanceof l.Atom)
                if (this.sketcher.oneMolecule) {
                    for (var d = this.sketcher.molecules[0], e = 0, j = d.atoms.length; e <
                        j; e++) d.atoms[e].visited = !1;
                    var i = [],
                        g = [];
                    this.sketcher.hovering.visited = !0;
                    e = 0;
                    for (j = d.bonds.length; e < j; e++) {
                        var h = d.bonds[e];
                        if (h.contains(this.sketcher.hovering)) {
                            var n = [],
                                s = [],
                                c = new l.Queue;
                            for (c.enqueue(h.getNeighbor(this.sketcher.hovering)); !c.isEmpty();)
                                if (h = c.dequeue(), !h.visited) {
                                    h.visited = !0;
                                    n.push(h);
                                    for (var o = 0, r = d.bonds.length; o < r; o++) {
                                        var q = d.bonds[o];
                                        q.contains(h) && !q.getNeighbor(h).visited && (c.enqueue(q.getNeighbor(h)), s.push(q))
                                    }
                                }
                            i.push(n);
                            g.push(s)
                        }
                    }
                    o = h = -1;
                    e = 0;
                    for (j = i.length; e < j; e++) i[e].length >
                        h && (o = e, h = i[e].length);
                    if (-1 < o) {
                        for (var e = [], j = [], u, n = 0, r = d.atoms.length; n < r; n++) h = d.atoms[n], -1 === i[o].indexOf(h) ? e.push(h) : u || (u = h);
                        n = 0;
                        for (r = d.bonds.length; n < r; n++) h = d.bonds[n], -1 === g[o].indexOf(h) && j.push(h);
                        this.sketcher.historyManager.pushUndo(new a.DeleteAction(this.sketcher, u, e, j))
                    } else this.sketcher.historyManager.pushUndo(new a.ClearAction(this.sketcher))
                } else d = this.sketcher.getMoleculeByAtom(this.sketcher.hovering), this.sketcher.historyManager.pushUndo(new a.DeleteAction(this.sketcher,
                    d.atoms[0], [this.sketcher.hovering], d.getBonds(this.sketcher.hovering)));
            else this.sketcher.hovering instanceof l.Bond ? (!this.sketcher.oneMolecule || this.sketcher.hovering.ring) && this.sketcher.historyManager.pushUndo(new a.DeleteAction(this.sketcher, this.sketcher.hovering.a1, void 0, [this.sketcher.hovering])) : this.sketcher.hovering instanceof k._Shape && this.sketcher.historyManager.pushUndo(new a.DeleteShapeAction(this.sketcher, this.sketcher.hovering));
            this.sketcher.hovering = void 0;
            this.sketcher.repaint()
        }
        for (n =
            this.sketcher.shapes.length - 1; 0 <= n; n--)
            if (g = this.sketcher.shapes[n], g instanceof k.Pusher) {
                i = u = !1;
                e = 0;
                for (j = this.sketcher.molecules.length; e < j; e++) {
                    d = this.sketcher.molecules[e];
                    o = 0;
                    for (r = d.atoms.length; o < r; o++) h = d.atoms[o], h === g.o1 ? u = !0 : h === g.o2 && (i = !0);
                    o = 0;
                    for (r = d.bonds.length; o < r; o++) h = d.bonds[o], h === g.o1 ? u = !0 : h === g.o2 && (i = !0)
                }
                if (!u || !i) this.sketcher.historyManager.undoStack[this.sketcher.historyManager.undoStack.length - 1].ss.push(g), this.sketcher.removeShape(g)
            }
    };
    g.innermouseup = function() {
        this.handleDelete()
    };
    g.innermousemove = function(a) {
        this.findHoveredObject(a, !0, !0, !0)
    }
})(ChemDoodle.uis.actions, ChemDoodle.uis.states, ChemDoodle.structures, ChemDoodle.structures.d2);
(function(a, g, l, k, d) {
    k.LabelState = function(a) {
        this.setup(a)
    };
    k = k.LabelState.prototype = new k._State;
    k.label = "C";
    k.innermousedown = function() {
        this.newMolAllowed = !0;
        this.sketcher.hovering && (this.sketcher.hovering.isHover = !1, this.sketcher.hovering.isSelected = !0, this.sketcher.repaint())
    };
    k.innermouseup = function(a) {
        if (this.sketcher.hovering)
            if (this.sketcher.hovering.isSelected = !1, this.sketcher.tempAtom) {
                var d = new g.Bond(this.sketcher.hovering, this.sketcher.tempAtom);
                this.sketcher.historyManager.pushUndo(new l.AddAction(this.sketcher,
                    d.a1, [d.a2], [d]));
                this.sketcher.tempAtom = void 0
            } else this.label !== this.sketcher.hovering.label && this.sketcher.historyManager.pushUndo(new l.ChangeLabelAction(this.sketcher.hovering, this.label));
        else !this.sketcher.oneMolecule && this.newMolAllowed && this.sketcher.historyManager.pushUndo(new l.NewMoleculeAction(this.sketcher, [new g.Atom(this.label, a.p.x, a.p.y)], []));
        this.sketcher.isMobile || this.mousemove(a)
    };
    k.innermousemove = function(a) {
        this.findHoveredObject(a, !0, !1)
    };
    k.innerdrag = function(e) {
        this.newMolAllowed = !1;
        if (this.sketcher.hovering) {
            if (9 > this.sketcher.hovering.distance(e.p)) this.sketcher.tempAtom = void 0;
            else if (15 > e.p.distance(this.sketcher.hovering)) {
                var j = this.getOptimumAngle(this.sketcher.hovering);
                e = this.sketcher.hovering.x + this.sketcher.specs.bondLength_2D * d.cos(j);
                j = this.sketcher.hovering.y - this.sketcher.specs.bondLength_2D * d.sin(j);
                this.sketcher.tempAtom = new g.Atom(this.label, e, j, 0)
            } else a.ALT && a.SHIFT ? this.sketcher.tempAtom = new g.Atom(this.label, e.p.x, e.p.y, 0) : (j = this.sketcher.hovering.angle(e.p),
                e = this.sketcher.hovering.distance(e.p), a.SHIFT || (e = this.sketcher.specs.bondLength_2D), a.ALT || (j = d.floor((j + d.PI / 12) / (d.PI / 6)) * d.PI / 6), this.sketcher.tempAtom = new g.Atom(this.label, this.sketcher.hovering.x + e * d.cos(j), this.sketcher.hovering.y - e * d.sin(j), 0));
            this.sketcher.repaint()
        }
    }
})(ChemDoodle.monitor, ChemDoodle.structures, ChemDoodle.uis.actions, ChemDoodle.uis.states, Math);
(function(a, g, l, k, d, e, j, i) {
    e.LassoState = function(a) {
        this.setup(a)
    };
    var p = 1,
        h = !1;
    e = e.LassoState.prototype = new e._State;
    e.innerdrag = function(a) {
        this.inDrag = !0;
        if (this.sketcher.lasso.isActive() && p) {
            if (this.sketcher.lastPoint)
                if (1 === p) {
                    var e = new l.Point(a.p.x, a.p.y);
                    e.sub(this.sketcher.lastPoint);
                    if (this.parentAction) {
                        this.parentAction.dif.add(e);
                        a = 0;
                        for (var c = this.parentAction.ps.length; a < c; a++) this.parentAction.ps[a].add(e);
                        a = 0;
                        for (c = this.sketcher.molecules.length; a < c; a++) this.sketcher.molecules[a].check();
                        this.sketcher.lasso.bounds.minX += e.x;
                        this.sketcher.lasso.bounds.maxX += e.x;
                        this.sketcher.lasso.bounds.minY += e.y;
                        this.sketcher.lasso.bounds.maxY += e.y;
                        this.sketcher.repaint()
                    } else this.parentAction = new d.MoveAction(this.sketcher.lasso.getAllPoints(), e), this.sketcher.historyManager.pushUndo(this.parentAction)
                } else if (2 === p)
                if (this.parentAction) {
                    e = this.parentAction.center;
                    c = e.angle(this.sketcher.lastPoint);
                    a = e.angle(a.p);
                    var h = a - c;
                    this.parentAction.dif += h;
                    a = 0;
                    for (c = this.parentAction.ps.length; a < c; a++) {
                        var j =
                            this.parentAction.ps[a],
                            q = e.distance(j),
                            u = e.angle(j) + h;
                        j.x = e.x + q * i.cos(u);
                        j.y = e.y - q * i.sin(u)
                    }
                    a = 0;
                    for (c = this.sketcher.molecules.length; a < c; a++) this.sketcher.molecules[a].check();
                    this.sketcher.lasso.setBounds();
                    this.sketcher.repaint()
                } else e = new l.Point((this.sketcher.lasso.bounds.minX + this.sketcher.lasso.bounds.maxX) / 2, (this.sketcher.lasso.bounds.minY + this.sketcher.lasso.bounds.maxY) / 2), c = e.angle(this.sketcher.lastPoint), a = e.angle(a.p), this.parentAction = new d.RotateAction(this.sketcher.lasso.getAllPoints(),
                    a - c, e), this.sketcher.historyManager.pushUndo(this.parentAction)
        } else if (this.sketcher.hovering) {
            if (this.sketcher.lastPoint)
                if (e = new l.Point(a.p.x, a.p.y), e.sub(this.sketcher.lastPoint), this.parentAction) {
                    this.parentAction.dif.add(e);
                    a = 0;
                    for (c = this.parentAction.ps.length; a < c; a++) this.parentAction.ps[a].add(e);
                    a = 0;
                    for (c = this.sketcher.molecules.length; a < c; a++) this.sketcher.molecules[a].check();
                    this.sketcher.repaint()
                } else this.sketcher.hovering instanceof l.Atom ? c = g.SHIFT ? [this.sketcher.hovering] : this.sketcher.getMoleculeByAtom(this.sketcher.hovering).atoms :
                    this.sketcher.hovering instanceof l.Bond ? c = [this.sketcher.hovering.a1, this.sketcher.hovering.a2] : this.sketcher.hovering instanceof k._Shape && (c = this.sketcher.hovering.hoverPoint ? [this.sketcher.hovering.hoverPoint] : this.sketcher.hovering.getPoints()), this.parentAction = new d.MoveAction(c, e), this.sketcher.historyManager.pushUndo(this.parentAction)
        } else this.sketcher.lasso.addPoint(a.p), this.sketcher.repaint()
    };
    e.innermousedown = function(d) {
        this.inDrag = !1;
        if (this.sketcher.lasso.isActive() && !g.SHIFT) {
            p =
                void 0;
            var e = 25 / this.sketcher.specs.scale;
            a.isBetween(d.p.x, this.sketcher.lasso.bounds.minX, this.sketcher.lasso.bounds.maxX) && a.isBetween(d.p.y, this.sketcher.lasso.bounds.minY, this.sketcher.lasso.bounds.maxY) ? p = 1 : a.isBetween(d.p.x, this.sketcher.lasso.bounds.minX - e, this.sketcher.lasso.bounds.maxX + e) && a.isBetween(d.p.y, this.sketcher.lasso.bounds.minY - e, this.sketcher.lasso.bounds.maxY + e) && (p = 2)
        } else this.sketcher.hovering || (this.sketcher.lastPoint = void 0, this.sketcher.lasso.addPoint(d.p), this.sketcher.repaint())
    };
    e.innermouseup = function(a) {
        p || this.sketcher.hovering || this.sketcher.lasso.select();
        this.innermousemove(a)
    };
    e.innerclick = function() {
        if (!p && !this.inDrag)
            if (this.sketcher.hovering) {
                var a = [],
                    d = [];
                this.sketcher.hovering instanceof l.Atom ? a.push(this.sketcher.hovering) : this.sketcher.hovering instanceof l.Bond ? (a.push(this.sketcher.hovering.a1), a.push(this.sketcher.hovering.a2)) : this.sketcher.hovering instanceof k._Shape && d.push(this.sketcher.hovering);
                this.sketcher.lasso.select(a, d)
            } else this.sketcher.lasso.isActive() &&
                this.sketcher.lasso.empty();
        p = void 0
    };
    e.innermousemove = function(d) {
        if (this.sketcher.lasso.isActive()) {
            if (!g.SHIFT) {
                var e = !1,
                    c = 25 / this.sketcher.specs.scale;
                if ((!a.isBetween(d.p.x, this.sketcher.lasso.bounds.minX, this.sketcher.lasso.bounds.maxX) || !a.isBetween(d.p.y, this.sketcher.lasso.bounds.minY, this.sketcher.lasso.bounds.maxY)) && a.isBetween(d.p.x, this.sketcher.lasso.bounds.minX - c, this.sketcher.lasso.bounds.maxX + c) && a.isBetween(d.p.y, this.sketcher.lasso.bounds.minY - c, this.sketcher.lasso.bounds.maxY +
                        c)) e = !0;
                e != h && (h = e, this.sketcher.repaint())
            }
        } else e = this.sketcher.lasso.mode !== j.Lasso.MODE_LASSO_SHAPES, this.findHoveredObject(d, e, e, !0)
    };
    e.innerdblclick = function() {
        this.sketcher.lasso.isActive() && this.sketcher.lasso.empty()
    };
    e.draw = function(a) {
        if (h && this.sketcher.lasso.bounds) {
            a.fillStyle = "rgba(0,0,255,.1)";
            var d = 25 / this.sketcher.specs.scale,
                c = this.sketcher.lasso.bounds;
            a.beginPath();
            a.rect(c.minX - d, c.minY - d, c.maxX - c.minX + 2 * d, d);
            a.rect(c.minX - d, c.maxY, c.maxX - c.minX + 2 * d, d);
            a.rect(c.minX - d, c.minY,
                d, c.maxY - c.minY);
            a.rect(c.maxX, c.minY, d, c.maxY - c.minY);
            a.fill()
        }
    }
})(ChemDoodle.math, ChemDoodle.monitor, ChemDoodle.structures, ChemDoodle.structures.d2, ChemDoodle.uis.actions, ChemDoodle.uis.states, ChemDoodle.uis.tools, Math);
(function(a, g) {
    g.LonePairState = function(a) {
        this.setup(a)
    };
    var l = g.LonePairState.prototype = new g._State;
    l.delta = 1;
    l.innermouseup = function() {
        0 > this.delta && 1 > this.sketcher.hovering.numLonePair || this.sketcher.hovering && this.sketcher.historyManager.pushUndo(new a.ChangeLonePairAction(this.sketcher.hovering, this.delta))
    };
    l.innermousemove = function(a) {
        this.findHoveredObject(a, !0, !1)
    }
})(ChemDoodle.uis.actions, ChemDoodle.uis.states);
(function(a, g, l) {
    g.MoveState = function(a) {
        this.setup(a)
    };
    g = g.MoveState.prototype = new g._State;
    g.action = void 0;
    g.innerdrag = function(g) {
        if (this.sketcher.hovering)
            if (this.action) {
                g = new l.Point(g.p.x, g.p.y);
                g.sub(this.sketcher.lastPoint);
                this.action.dif.add(g);
                for (var d = 0, e = this.action.ps.length; d < e; d++) this.action.ps[d].add(g);
                d = 0;
                for (e = this.sketcher.molecules.length; d < e; d++) this.sketcher.molecules[d].check();
                this.sketcher.repaint()
            } else d = [], g = new l.Point(g.p.x, g.p.y), this.sketcher.hovering instanceof
        l.Atom ? (g.sub(this.sketcher.hovering), d[0] = this.sketcher.hovering) : this.sketcher.hovering instanceof l.Bond && (g.sub(this.sketcher.lastPoint), d[0] = this.sketcher.hovering.a1, d[1] = this.sketcher.hovering.a2), this.action = new a.MoveAction(d, g), this.sketcher.historyManager.pushUndo(this.action)
    };
    g.innermousemove = function(a) {
        this.findHoveredObject(a, !0, !0)
    };
    g.innermouseup = function() {
        this.action = void 0
    }
})(ChemDoodle.uis.actions, ChemDoodle.uis.states, ChemDoodle.structures);
(function(a, g, l, k, d) {
    l.NewBondState = function(a) {
        this.setup(a)
    };
    l = l.NewBondState.prototype = new l._State;
    l.bondOrder = 1;
    l.stereo = k.Bond.STEREO_NONE;
    l.incrementBondOrder = function(a) {
        this.newMolAllowed = !1;
        1 === this.bondOrder && this.stereo === k.Bond.STEREO_NONE ? this.sketcher.historyManager.pushUndo(new g.ChangeBondAction(a)) : a.bondOrder === this.bondOrder && a.stereo === this.stereo ? (1 === a.bondOrder && a.stereo !== k.Bond.STEREO_NONE || 2 === a.bondOrder && a.stereo === k.Bond.STEREO_NONE) && this.sketcher.historyManager.pushUndo(new g.FlipBondAction(a)) :
            this.sketcher.historyManager.pushUndo(new g.ChangeBondAction(a, this.bondOrder, this.stereo))
    };
    l.innerexit = function() {
        this.removeStartAtom()
    };
    l.innerdrag = function(e) {
        this.newMolAllowed = !1;
        this.removeStartAtom();
        if (this.sketcher.hovering instanceof k.Atom) {
            if (15 > e.p.distance(this.sketcher.hovering)) {
                var j = this.getOptimumAngle(this.sketcher.hovering, this.bondOrder);
                e = this.sketcher.hovering.x + this.sketcher.specs.bondLength_2D * d.cos(j);
                j = this.sketcher.hovering.y - this.sketcher.specs.bondLength_2D * d.sin(j);
                this.sketcher.tempAtom = new k.Atom("C", e, j, 0)
            } else {
                for (var i = 1E3, g = 0, h = this.sketcher.molecules.length; g < h; g++)
                    for (var n = this.sketcher.molecules[g], l = 0, c = n.atoms.length; l < c; l++) {
                        var o = n.atoms[l],
                            r = o.distance(e.p);
                        if (5 > r && (!j || r < i)) j = o, i = r
                    }
                j ? this.sketcher.tempAtom = new k.Atom("C", j.x, j.y, 0) : a.ALT && a.SHIFT ? this.sketcher.tempAtom = new k.Atom("C", e.p.x, e.p.y, 0) : (j = this.sketcher.hovering.angle(e.p), e = this.sketcher.hovering.distance(e.p), a.SHIFT || (e = this.sketcher.specs.bondLength_2D), a.ALT || (j = d.floor((j + d.PI /
                    12) / (d.PI / 6)) * d.PI / 6), this.sketcher.tempAtom = new k.Atom("C", this.sketcher.hovering.x + e * d.cos(j), this.sketcher.hovering.y - e * d.sin(j), 0))
            }
            g = 0;
            for (h = this.sketcher.molecules.length; g < h; g++) {
                n = this.sketcher.molecules[g];
                l = 0;
                for (c = n.atoms.length; l < c; l++) o = n.atoms[l], 5 > o.distance(this.sketcher.tempAtom) && (this.sketcher.tempAtom.x = o.x, this.sketcher.tempAtom.y = o.y, this.sketcher.tempAtom.isOverlap = !0)
            }
            this.sketcher.repaint()
        }
    };
    l.innerclick = function(a) {
        !this.sketcher.hovering && (!this.sketcher.oneMolecule && this.newMolAllowed) &&
            (this.sketcher.historyManager.pushUndo(new g.NewMoleculeAction(this.sketcher, [new k.Atom("C", a.p.x, a.p.y)], [])), this.sketcher.isMobile || this.mousemove(a), this.newMolAllowed = !1)
    };
    l.innermousedown = function(a) {
        this.newMolAllowed = !0;
        if (this.sketcher.hovering instanceof k.Atom) this.sketcher.hovering.isHover = !1, this.sketcher.hovering.isSelected = !0, this.drag(a);
        else if (this.sketcher.hovering instanceof k.Bond) {
            this.sketcher.hovering.isHover = !1;
            this.incrementBondOrder(this.sketcher.hovering);
            a = 0;
            for (var d =
                    this.sketcher.molecules.length; a < d; a++) this.sketcher.molecules[a].check();
            this.sketcher.repaint()
        }
    };
    l.innermouseup = function(a) {
        if (this.sketcher.tempAtom && this.sketcher.hovering) {
            var d = [],
                i = [],
                l = !0;
            if (this.sketcher.tempAtom.isOverlap) {
                for (var h = 0, n = this.sketcher.molecules.length; h < n; h++)
                    for (var s = this.sketcher.molecules[h], c = 0, o = s.atoms.length; c < o; c++) {
                        var r = s.atoms[c];
                        5 > r.distance(this.sketcher.tempAtom) && (this.sketcher.tempAtom = r)
                    }
                if (h = this.sketcher.getBond(this.sketcher.hovering, this.sketcher.tempAtom)) this.incrementBondOrder(h),
                    l = !1
            } else d.push(this.sketcher.tempAtom);
            l && (i[0] = new k.Bond(this.sketcher.hovering, this.sketcher.tempAtom, this.bondOrder), i[0].stereo = this.stereo, this.sketcher.historyManager.pushUndo(new g.AddAction(this.sketcher, i[0].a1, d, i)))
        }
        this.sketcher.tempAtom = void 0;
        this.sketcher.isMobile || this.mousemove(a)
    };
    l.innermousemove = function(a) {
        this.sketcher.tempAtom || (this.findHoveredObject(a, !0, !0), this.sketcher.startAtom && (this.sketcher.hovering ? (this.sketcher.startAtom.x = -10, this.sketcher.startAtom.y = -10) : (this.sketcher.startAtom.x =
            a.p.x, this.sketcher.startAtom.y = a.p.y)))
    };
    l.innermouseout = function() {
        this.removeStartAtom()
    }
})(ChemDoodle.monitor, ChemDoodle.uis.actions, ChemDoodle.uis.states, ChemDoodle.structures, Math);
(function(a, g, l, k, d, e) {
    k.NewRingState = function(a) {
        this.setup(a)
    };
    k = k.NewRingState.prototype = new k._State;
    k.numSides = 6;
    k.unsaturated = !1;
    k.getRing = function(a, i, g, h, k) {
        var l = e.PI - 2 * e.PI / i;
        h += l / 2;
        for (var c = [], o = 0; o < i - 1; o++) {
            var r = 0 === o ? new d.Atom("C", a.x, a.y) : new d.Atom("C", c[c.length - 1].x, c[c.length - 1].y);
            r.x += g * e.cos(h);
            r.y -= g * e.sin(h);
            c.push(r);
            h += e.PI + l
        }
        o = 0;
        for (a = this.sketcher.molecules.length; o < a; o++) {
            i = this.sketcher.molecules[o];
            g = 0;
            for (h = i.atoms.length; g < h; g++) i.atoms[g].isOverlap = !1
        }
        o = 0;
        for (a =
            c.length; o < a; o++) {
            for (var l = Infinity, q, r = 0, u = this.sketcher.molecules.length; r < u; r++) {
                i = this.sketcher.molecules[r];
                g = 0;
                for (h = i.atoms.length; g < h; g++) {
                    var w = i.atoms[g].distance(c[o]);
                    w < l && (l = w, q = i.atoms[g])
                }
            }
            5 > l && (c[o] = q, k && (q.isOverlap = !0))
        }
        return c
    };
    k.getOptimalRing = function(a, d) {
        for (var g = e.PI / 2 - e.PI / d, h = a.a1.distance(a.a2), k = this.getRing(a.a1, d, h, a.a1.angle(a.a2) - g, !1), g = this.getRing(a.a2, d, h, a.a2.angle(a.a1) - g, !1), l = h = 0, c = 1, o = k.length; c < o; c++)
            for (var r = 0, q = this.sketcher.molecules.length; r < q; r++)
                for (var u =
                        this.sketcher.molecules[r], w = 0, y = u.atoms.length; w < y; w++) var v = u.atoms[w].distance(k[c]),
                    A = u.atoms[w].distance(g[c]),
                    h = h + e.min(1E8, 1 / (v * v)),
                    l = l + e.min(1E8, 1 / (A * A));
        return h < l ? k : g
    };
    k.innerexit = function() {
        this.removeStartAtom()
    };
    k.innerdrag = function(j) {
        this.newMolAllowed = !1;
        this.removeStartAtom();
        if (this.sketcher.hovering instanceof d.Atom) {
            var i = 0,
                k = 0;
            if (15 > j.p.distance(this.sketcher.hovering)) j = this.sketcher.getMoleculeByAtom(this.sketcher.hovering).getAngles(this.sketcher.hovering), i = 0 === j.length ?
                3 * e.PI / 2 : a.angleBetweenLargest(j).angle, k = this.sketcher.specs.bondLength_2D;
            else if (i = this.sketcher.hovering.angle(j.p), k = this.sketcher.hovering.distance(j.p), !g.ALT || !g.SHIFT) g.SHIFT || (k = this.sketcher.specs.bondLength_2D), g.ALT || (i = e.floor((i + e.PI / 12) / (e.PI / 6)) * e.PI / 6);
            this.sketcher.tempRing = this.getRing(this.sketcher.hovering, this.numSides, k, i, !0);
            this.sketcher.repaint()
        } else if (this.sketcher.hovering instanceof d.Bond) {
            i = a.distanceFromPointToLineInclusive(j.p, this.sketcher.hovering.a1, this.sketcher.hovering.a2);
            if (-1 !== i && 7 >= i) j = this.getOptimalRing(this.sketcher.hovering, this.numSides);
            else {
                for (var k = e.PI / 2 - e.PI / this.numSides, h = this.sketcher.hovering.a1.distance(this.sketcher.hovering.a2), i = this.getRing(this.sketcher.hovering.a1, this.numSides, h, this.sketcher.hovering.a1.angle(this.sketcher.hovering.a2) - k, !1), k = this.getRing(this.sketcher.hovering.a2, this.numSides, h, this.sketcher.hovering.a2.angle(this.sketcher.hovering.a1) - k, !1), l = new d.Point, h = new d.Point, s = 1, c = i.length; s < c; s++) l.add(i[s]), h.add(k[s]);
                l.x /=
                    i.length - 1;
                l.y /= i.length - 1;
                h.x /= k.length - 1;
                h.y /= k.length - 1;
                l = l.distance(j.p);
                h = h.distance(j.p);
                j = k;
                l < h && (j = i)
            }
            i = 1;
            for (k = j.length; i < k; i++) - 1 !== this.sketcher.getAllAtoms().indexOf(j[i]) && (j[i].isOverlap = !0);
            this.sketcher.tempRing = j;
            this.sketcher.repaint()
        }
    };
    k.innerclick = function(a) {
        !this.sketcher.hovering && (!this.sketcher.oneMolecule && this.newMolAllowed) && (this.sketcher.historyManager.pushUndo(new l.NewMoleculeAction(this.sketcher, [new d.Atom("C", a.p.x, a.p.y)], [])), this.sketcher.isMobile || this.mousemove(a),
            this.newMolAllowed = !1)
    };
    k.innermousedown = function(a) {
        this.newMolAllowed = !0;
        this.sketcher.hovering && (this.sketcher.hovering.isHover = !1, this.sketcher.hovering.isSelected = !0, this.drag(a))
    };
    k.innermouseup = function(a) {
        if (this.sketcher.tempRing && this.sketcher.hovering) {
            var e = [],
                g = [],
                h = this.sketcher.getAllAtoms();
            if (this.sketcher.hovering instanceof d.Atom) {
                -1 === h.indexOf(this.sketcher.tempRing[0]) && e.push(this.sketcher.tempRing[0]);
                this.sketcher.bondExists(this.sketcher.hovering, this.sketcher.tempRing[0]) ||
                    g.push(new d.Bond(this.sketcher.hovering, this.sketcher.tempRing[0]));
                for (var k = 1, s = this.sketcher.tempRing.length; k < s; k++) - 1 === h.indexOf(this.sketcher.tempRing[k]) && e.push(this.sketcher.tempRing[k]), this.sketcher.bondExists(this.sketcher.tempRing[k - 1], this.sketcher.tempRing[k]) || g.push(new d.Bond(this.sketcher.tempRing[k - 1], this.sketcher.tempRing[k], 1 === k % 2 && this.unsaturated ? 2 : 1));
                this.sketcher.bondExists(this.sketcher.tempRing[this.sketcher.tempRing.length - 1], this.sketcher.hovering) || g.push(new d.Bond(this.sketcher.tempRing[this.sketcher.tempRing.length -
                    1], this.sketcher.hovering, this.unsaturated ? 2 : 1))
            } else if (this.sketcher.hovering instanceof d.Bond) {
                var k = this.sketcher.hovering.a2,
                    c = this.sketcher.hovering.a1;
                this.sketcher.tempRing[0] === this.sketcher.hovering.a1 && (k = this.sketcher.hovering.a1, c = this.sketcher.hovering.a2); - 1 === h.indexOf(this.sketcher.tempRing[1]) && e.push(this.sketcher.tempRing[1]);
                this.sketcher.bondExists(k, this.sketcher.tempRing[1]) || g.push(new d.Bond(k, this.sketcher.tempRing[1]));
                k = 2;
                for (s = this.sketcher.tempRing.length; k < s; k++) - 1 ===
                    h.indexOf(this.sketcher.tempRing[k]) && e.push(this.sketcher.tempRing[k]), this.sketcher.bondExists(this.sketcher.tempRing[k - 1], this.sketcher.tempRing[k]) || g.push(new d.Bond(this.sketcher.tempRing[k - 1], this.sketcher.tempRing[k], 0 === k % 2 && this.unsaturated ? 2 : 1));
                this.sketcher.bondExists(this.sketcher.tempRing[this.sketcher.tempRing.length - 1], c) || g.push(new d.Bond(this.sketcher.tempRing[this.sketcher.tempRing.length - 1], c))
            }(0 !== e.length || 0 !== g.length) && this.sketcher.historyManager.pushUndo(new l.AddAction(this.sketcher,
                g[0].a1, e, g));
            e = 0;
            for (g = h.length; e < g; e++) h[e].isOverlap = !1
        }
        this.sketcher.tempRing = void 0;
        this.sketcher.isMobile || this.mousemove(a)
    };
    k.innermousemove = function(a) {
        this.sketcher.tempAtom || (this.findHoveredObject(a, !0, !0), this.sketcher.startAtom && (this.sketcher.hovering ? (this.sketcher.startAtom.x = -10, this.sketcher.startAtom.y = -10) : (this.sketcher.startAtom.x = a.p.x, this.sketcher.startAtom.y = a.p.y)))
    };
    k.innermouseout = function() {
        this.removeStartAtom()
    }
})(ChemDoodle.math, ChemDoodle.monitor, ChemDoodle.uis.actions,
    ChemDoodle.uis.states, ChemDoodle.structures, Math);
(function(a, g, l, k, d) {
    d.PusherState = function(a) {
        this.setup(a)
    };
    d = d.PusherState.prototype = new d._State;
    d.numElectron = 1;
    d.innermousedown = function() {
        this.sketcher.hovering && (this.start = this.sketcher.hovering)
    };
    d.innerdrag = function(a) {
        this.start && (this.end = new g.Point(a.p.x, a.p.y), this.findHoveredObject(a, !0, !0), this.sketcher.repaint())
    };
    d.innermouseup = function() {
        if (this.start && this.sketcher.hovering && this.sketcher.hovering !== this.start) {
            for (var a, d = !1, g = 0, p = this.sketcher.shapes.length; g < p; g++) {
                var h =
                    this.sketcher.shapes[g];
                h instanceof l.Pusher && (h.o1 === this.start && h.o2 === this.sketcher.hovering ? a = h : h.o2 === this.start && h.o1 === this.sketcher.hovering && (a = h, d = !0))
            }
            a ? (d && this.sketcher.historyManager.pushUndo(new k.DeleteShapeAction(this.sketcher, a)), this.end = this.start = void 0, this.sketcher.repaint()) : (a = new l.Pusher(this.start, this.sketcher.hovering, this.numElectron), this.end = this.start = void 0, this.sketcher.historyManager.pushUndo(new k.AddShapeAction(this.sketcher, a)))
        } else this.end = this.start = void 0,
            this.sketcher.repaint()
    };
    d.innermousemove = function(a) {
        this.findHoveredObject(a, !0, !0);
        this.sketcher.repaint()
    };
    d.draw = function(d) {
        if (this.start && this.end) {
            d.strokeStyle = "#00FF00";
            d.fillStyle = "#00FF00";
            d.lineWidth = 1;
            var j = this.start instanceof g.Atom ? this.start : this.start.getCenter(),
                i = this.end;
            this.sketcher.hovering && this.sketcher.hovering !== this.start && (i = this.sketcher.hovering instanceof g.Atom ? this.sketcher.hovering : this.sketcher.hovering.getCenter());
            d.beginPath();
            d.moveTo(j.x, j.y);
            a.contextHashTo(d,
                j.x, j.y, i.x, i.y, 2, 2);
            d.stroke()
        }
    }
})(ChemDoodle.extensions, ChemDoodle.structures, ChemDoodle.structures.d2, ChemDoodle.uis.actions, ChemDoodle.uis.states);
(function(a, g, l) {
    g.QueryState = function(a) {
        this.setup(a)
    };
    a = g.QueryState.prototype = new g._State;
    a.innermouseup = function() {
        this.sketcher.hovering && (this.sketcher.hovering instanceof l.Atom ? (this.sketcher.dialogManager.atomQueryDialog.setAtom(this.sketcher.hovering), this.sketcher.dialogManager.atomQueryDialog.getElement().dialog("open")) : this.sketcher.hovering instanceof l.Bond && (this.sketcher.dialogManager.bondQueryDialog.setBond(this.sketcher.hovering), this.sketcher.dialogManager.bondQueryDialog.getElement().dialog("open")))
    };
    a.innermousemove = function(a) {
        this.findHoveredObject(a, !0, !0, !1)
    }
})(ChemDoodle.uis.actions, ChemDoodle.uis.states, ChemDoodle.structures, ChemDoodle.structures.d2);
(function(a, g) {
    g.RadicalState = function(a) {
        this.setup(a)
    };
    var l = g.RadicalState.prototype = new g._State;
    l.delta = 1;
    l.innermouseup = function() {
        0 > this.delta && 1 > this.sketcher.hovering.numRadical || this.sketcher.hovering && this.sketcher.historyManager.pushUndo(new a.ChangeRadicalAction(this.sketcher.hovering, this.delta))
    };
    l.innermousemove = function(a) {
        this.findHoveredObject(a, !0, !1)
    }
})(ChemDoodle.uis.actions, ChemDoodle.uis.states);
(function(a, g, l, k, d, e, j, i) {
    function p(a, d, c, e, h) {
        e && i.abs(e.t) === h && (a.fillStyle = "#885110", a.beginPath(), 0 < e.t ? (a.moveTo(d, c), a.lineTo(d + 6, c - 6), a.lineTo(d + 12, c)) : (a.moveTo(d, c + 6), a.lineTo(d + 6, c + 12), a.lineTo(d + 12, c + 6)), a.closePath(), a.fill());
        a.strokeStyle = "blue";
        a.beginPath();
        a.moveTo(d, c);
        a.lineTo(d + 6, c - 6);
        a.lineTo(d + 12, c);
        a.moveTo(d, c + 6);
        a.lineTo(d + 6, c + 12);
        a.lineTo(d + 12, c + 6);
        a.stroke()
    }
    j.ShapeState = function(a) {
        this.setup(a)
    };
    var h = j.ShapeState.prototype = new j._State;
    h.shapeType = j.ShapeState.LINE;
    h.superDoubleClick = h.dblclick;
    h.dblclick = function(a) {
        this.control || this.superDoubleClick(a)
    };
    h.innerexit = function() {
        this.shapeType = j.ShapeState.LINE;
        this.sketcher.repaint()
    };
    h.innermousemove = function(a) {
        this.control = void 0;
        if (this.shapeType === j.ShapeState.BRACKET) {
            for (var e = 0, c = this.sketcher.shapes.length; e < c; e++) {
                var h = this.sketcher.shapes[e];
                if (h instanceof d.Bracket) {
                    var k = i.min(h.p1.x, h.p2.x),
                        l = i.max(h.p1.x, h.p2.x),
                        p = i.min(h.p1.y, h.p2.y),
                        w = i.max(h.p1.y, h.p2.y),
                        y = [];
                    y.push({
                        x: l + 5,
                        y: p + 15,
                        v: 1
                    });
                    y.push({
                        x: l + 5,
                        y: w + 15,
                        v: 2
                    });
                    y.push({
                        x: k - 17,
                        y: (p + w) / 2 + 15,
                        v: 3
                    });
                    k = 0;
                    for (l = y.length; k < l; k++)
                        if (p = y[k], g.isBetween(a.p.x, p.x, p.x + 12) && g.isBetween(a.p.y, p.y - 6, p.y)) {
                            this.control = {
                                s: h,
                                t: p.v
                            };
                            break
                        } else if (g.isBetween(a.p.x, p.x, p.x + 12) && g.isBetween(a.p.y, p.y + 6, p.y + 12)) {
                        this.control = {
                            s: h,
                            t: -1 * p.v
                        };
                        break
                    }
                    if (this.control) break
                }
            }
            this.sketcher.repaint()
        }
    };
    h.innermousedown = function(a) {
        this.control ? (this.sketcher.historyManager.pushUndo(new e.ChangeBracketAttributeAction(this.control.s, this.control.t)), this.sketcher.repaint()) :
            this.end = this.start = new k.Point(a.p.x, a.p.y)
    };
    h.innerdrag = function(a) {
        this.end = new k.Point(a.p.x, a.p.y);
        if (this.shapeType === j.ShapeState.BRACKET) {
            if (l.SHIFT) {
                a = this.end.x - this.start.x;
                var d = this.end.y - this.start.y;
                0 > a && 0 < d ? d *= -1 : 0 < a && 0 > d && (a *= -1);
                var c = d;
                i.abs(a) < i.abs(d) && (c = a);
                this.end.x = this.start.x + c;
                this.end.y = this.start.y + c
            }
        } else l.ALT || (a = this.start.angle(this.end), d = this.start.distance(this.end), l.ALT || (a = i.floor((a + i.PI / 12) / (i.PI / 6)) * i.PI / 6), this.end.x = this.start.x + d * i.cos(a), this.end.y =
            this.start.y - d * i.sin(a));
        this.sketcher.repaint()
    };
    h.innermouseup = function() {
        if (this.start && this.end) {
            var a;
            5 < this.start.distance(this.end) && (this.shapeType >= j.ShapeState.LINE && this.shapeType <= j.ShapeState.ARROW_EQUILIBRIUM ? (a = new d.Line(this.start, this.end), this.shapeType === j.ShapeState.ARROW_SYNTHETIC ? a.arrowType = d.Line.ARROW_SYNTHETIC : this.shapeType === j.ShapeState.ARROW_RETROSYNTHETIC ? a.arrowType = d.Line.ARROW_RETROSYNTHETIC : this.shapeType === j.ShapeState.ARROW_RESONANCE ? a.arrowType = d.Line.ARROW_RESONANCE :
                this.shapeType === j.ShapeState.ARROW_EQUILIBRIUM && (a.arrowType = d.Line.ARROW_EQUILIBRIUM)) : this.shapeType === j.ShapeState.BRACKET && (a = new d.Bracket(this.start, this.end)));
            this.end = this.start = void 0;
            a && this.sketcher.historyManager.pushUndo(new e.AddShapeAction(this.sketcher, a))
        }
    };
    h.draw = function(e) {
        if (this.start && this.end) e.strokeStyle = "#00FF00", e.fillStyle = "#00FF00", e.lineWidth = 1, e.beginPath(), e.moveTo(this.start.x, this.start.y), this.shapeType === j.ShapeState.BRACKET ? (a.contextHashTo(e, this.start.x, this.start.y,
            this.end.x, this.start.y, 2, 2), a.contextHashTo(e, this.end.x, this.start.y, this.end.x, this.end.y, 2, 2), a.contextHashTo(e, this.end.x, this.end.y, this.start.x, this.end.y, 2, 2), a.contextHashTo(e, this.start.x, this.end.y, this.start.x, this.start.y, 2, 2)) : a.contextHashTo(e, this.start.x, this.start.y, this.end.x, this.end.y, 2, 2), e.stroke();
        else if (this.shapeType === j.ShapeState.BRACKET) {
            e.lineWidth = 2;
            e.lineJoin = "miter";
            e.lineCap = "butt";
            for (var h = 0, c = this.sketcher.shapes.length; h < c; h++) {
                var g = this.sketcher.shapes[h];
                if (g instanceof d.Bracket) {
                    var k = i.min(g.p1.x, g.p2.x),
                        l = i.max(g.p1.x, g.p2.x),
                        u = i.min(g.p1.y, g.p2.y),
                        w = i.max(g.p1.y, g.p2.y),
                        g = this.control && this.control.s === g ? this.control : void 0;
                    p(e, l + 5, u + 15, g, 1);
                    p(e, l + 5, w + 15, g, 2);
                    p(e, k - 17, (u + w) / 2 + 15, g, 3)
                }
            }
        }
    };
    j.ShapeState.LINE = 1;
    j.ShapeState.ARROW_SYNTHETIC = 2;
    j.ShapeState.ARROW_RETROSYNTHETIC = 3;
    j.ShapeState.ARROW_RESONANCE = 4;
    j.ShapeState.ARROW_EQUILIBRIUM = 5;
    j.ShapeState.BRACKET = 10
})(ChemDoodle.extensions, ChemDoodle.math, ChemDoodle.monitor, ChemDoodle.structures, ChemDoodle.structures.d2,
    ChemDoodle.uis.actions, ChemDoodle.uis.states, Math);
(function(a) {
    a.StateManager = function(g) {
        this.STATE_NEW_BOND = new a.NewBondState(g);
        this.STATE_NEW_RING = new a.NewRingState(g);
        this.STATE_CHARGE = new a.ChargeState(g);
        this.STATE_LONE_PAIR = new a.LonePairState(g);
        this.STATE_RADICAL = new a.RadicalState(g);
        this.STATE_MOVE = new a.MoveState(g);
        this.STATE_ERASE = new a.EraseState(g);
        this.STATE_LABEL = new a.LabelState(g);
        this.STATE_LASSO = new a.LassoState(g);
        this.STATE_SHAPE = new a.ShapeState(g);
        this.STATE_PUSHER = new a.PusherState(g);
        this.STATE_QUERY = new a.QueryState(g);
        var l = this.STATE_NEW_BOND;
        this.setState = function(a) {
            a !== l && (l.exit(), l = a, l.enter())
        };
        this.getCurrentState = function() {
            return l
        }
    }
})(ChemDoodle.uis.states);
ChemDoodle.uis.gui.imageDepot = function() {
    return {
        getURI: function(a) {
            return "data:image/png;base64," + a
        },
        ADD_LONE_PAIR: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAANElEQVR42mNgGAWjYHACGyB+DMTPgdiFDHkMAFL8H4qfkyFPewNtoApB2IMM+VEwCgYcAADjvBhZpYZJbQAAAABJRU5ErkJggg\x3d\x3d",
        ADD_RADICAL: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAL0lEQVR42mNgGAWjYGgAGyB+DMTPgdiFGgaCDPsPxc8HpYE2UINA2GM0BYyCoQAAdQgMLdlWmzIAAAAASUVORK5CYII\x3d",
        ANGLE: "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\x3d\x3d",
        ANIMATION: "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\x3d",
        ARROW_DOWN: "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",
        ARROW_EQUILIBRIUM: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAV0lEQVR42mNgGAXDArBQ28AKIL4GxAFAzEMtF/6H4s9AfBKIq4DYBFnRfyrhx0Mj1h5T0ctwYADERUB8FYh/APEvqAKqxCIHEHsA8Xkgbhj0iXgUDAAAAG9tMdQezXJsAAAAAElFTkSuQmCC",
        ARROW_RESONANCE: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAWUlEQVR42mNgGAWjYPACFiBWwSOvAcQc+AzgAWIXIJ4BxP+h2AOPehMkdduAuAiIbaDmMNQgSVIDo7hwERkuPADEFUDsAHMhriBwgIYlNgDynshoUhsFVAIA/dMiIBsQRGUAAAAASUVORK5CYII\x3d",
        ARROW_RETROSYNTHETIC: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAYElEQVR42mNgGI5AhZqGKQDxbSA2oaahBrQ01ILahr4HYhtskv8pwF9xGUouAHn7MRA7UNNQG6hrPahtoA+1vPwc3XWURooPtZLNc2qFG8iw+9Q2zIFahQPV05zG0C59AY3IMME0CTYYAAAAAElFTkSuQmCC",
        ARROW_SYNTHETIC: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAUklEQVR42mNgGAWjgC5ABoh5qGmgAhD/B+I7QJwAxALUMPQg1NAHQPwdiPegG/6fipgssA+q+REQ/wDivUCcAsQi5EYKLAzJNgQ9UmRGE/tIBgDIaCG7b3KulAAAAABJRU5ErkJggg\x3d\x3d",
        BENZENE: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAA5klEQVR42s2VPwrCMBSH06k0o1MX6R2c7A08hDfRRdDVgp5BR71GvUKdtHNvIMRf4FcoIdgkzeCDD0r+fLyQl1ch3GMmIkUOzuADDkBOEVWgA0ewABfQgjVIQkU5x/vMlqAGD1CGiFKwBS+QcSxhli2znpsyvVAZIh0r8AQ3UFiS0FnvuDczJ9XgW2++g4bSsVC/BiWPt+FxXSRqbEHmmZVyTvtvhTKmUMvesS+lYO0Fl01f2JWlsJvQws75UjpDnPL4Xk/PRdzLSjaGmo3Cq30Nxbp9XXlhXu3LJj6xwe6nNNigX8AXVupH9hGtsNcAAAAASUVORK5CYII\x3d",
        BOND_ANY: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAA3UlEQVR42mNgGMRAgJqGeQDxc2oZ6gLE76GGUs0wH2oYZkNNw0Auew3EEQMS/fOB2AGJbwQVg4FsIFYA4glArAkVEwfiemyGqUOjfw2SGMjwv0AcB+V3Qg0CheFaqNhUqF4M0A3E/kB8H4hFkQyciiTWieSyDUCcAhXDAGxAfB6I+YG4C4hLkAwsAuIkIF6GZiCIfgPEfNgMDAPi9UDcCMTNQHwJzUAGqPx5JANB4AKuyNgMxMJI/FVAbI1moAg0jLWIMZCmifY9tRItVfOmBzUNE4AGtgc1sxxVCkcAqLktfrI9I0gAAAAASUVORK5CYII\x3d",
        BOND_DOUBLE: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAQUlEQVR42mNgoA7gZqAicADi+0DMRS3DXgGxPTVcim4YzKVUMwyZP2rYqGGjhg0Dw7ihpQRVDIMBLmoahsulZAEA2GgvCVlTJIIAAAAASUVORK5CYII\x3d",
        BOND_DOUBLE_AMBIGUOUS: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAwElEQVR42q2UsQ2DQBAE38EnBDQAJUBGA6YM04UD3n1AYhdhMkqAHpw4owgkJNbSfuLw904aIZLV3t/tOWdTmTOsGnytRHPwATcLpxcwgYH/HZ0mVwALXY10WqWKtWADDVjBm+0nVUmxO79BadPT0UyxqzrVF4V+b1eoYg+wgyedymIH6FUhzzZ3C7GSA9jYplRxz2YOwCtxCn97VihBn+ioUfesZhYHZnNVEpDxSsQTNDKbJhe3o9PcGVR0WikiJ/j5KxJqecPNAAAAAElFTkSuQmCC",
        BOND_HALF: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAYklEQVR42mNgGAVkAA8g3k4tw0yA+DXUUIqBC9SwGGq57jYQ+1Az7FioYYgCtQwCAQMgvg/EKtQy7DG1YtMB6jKqRUAFtVxGVeBATVeBIuA5tcIMFptUMUyH2rHJAXXh4AIAvQ0O0wCO68MAAAAASUVORK5CYII\x3d",
        BOND_PROTRUDING: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAl0lEQVR42mNgoAwEAHEDA5WAChC/B+L/1DCUBYivQw37Tw1Dl6MZRpGhBTgM+w3EFaQaZgPEn7EY9hiIPUg1TAaI72Mx7DAQK5ATCbuxGNYPxDzkhFs3lvCKoCTxIht2G4g1qJF4QXg9uV5ET7xkJQlciZesJIEr8ZKVJHAl3n5Kwgs58d6mJEmgR8J0SpIENq/yMAx7AADDzz/MOB6JagAAAABJRU5ErkJggg\x3d\x3d",
        BOND_QUADRUPLE: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAYElEQVR42mNgIA9wM1AROADxfSDmopZhr4DYnhouRTeMIpdiM4xslxIyjCSXEmMY0S4l1TCYS6lmGDJ/1DAKDeOGxg5VDIMBLmoaRq5LiQJc1DSMWJeSBbioaRgulxIFAGBAR5Vp19YFAAAAAElFTkSuQmCC",
        BOND_QUINTUPLE: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAcElEQVR42q3UsQ2AMAxEUdfJUGb/JdwzBRYChKIkzsV3kguap98QEWxViDv8zK+wsNNPGaUtlirtYdulEQaVrmDLpSg2Ld3BhqVZ7C2lYd93fWQl4fcKE/v/+MbCsqXhE2UsDC2FH1NjYVFpam3pdBfQk0tlqZTZlgAAAABJRU5ErkJggg\x3d\x3d",
        BOND_RECESSED: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAQUlEQVR42mNgGGQghJqGBQDxbyBOoaahCYPSUGyaYYYOI28y4PDm4IxNBmp6k2JAE28OPvAdiBuoaaALwyggBQAA+tATdpIiCMcAAAAASUVORK5CYII\x3d",
        BOND_RESONANCE: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAfUlEQVR42mNgoA7gZqAicADi+0DMRS3DXgGx/aA3zAOIt1PLMBMgfg01lGLDXKCGxVArzG4DsQ81I4CFGoYpkGsQNsMMoIlYhVqGPaZWbMKyF9UioIJaLqNqdnIg11W4IuA5uWHGDQ1w9Nj0ocS7sMJRh5LYxAY4oC4kGwAAJbAmYdoaIPoAAAAASUVORK5CYII\x3d",
        BOND_SEXTUPLE: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAZElEQVR42s3OMQ6AMAxDUc/uocr9L8HOKZqBCaXgBiNhKevPA7Q1GLfF7XF0xY647pBeY6+kWawsfYotSZWYLF2N3Uorsam0nZ+6U8o/S/GFFE5pOjpjVak0OmOqtDQ6YzNpugFelEmRwpAbowAAAABJRU5ErkJggg\x3d\x3d",
        BOND_SINGLE: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAMklEQVR42mNgGMSAm5qGOQDxfSDmopZhr4DYftSwUcNGDRs1jP6GcUPLM6oYBgNUKRwBiE8XjxDJvZUAAAAASUVORK5CYII\x3d",
        BOND_TRIPLE: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAUUlEQVR42mNgoAxwM1AROADxfSDmopZhr4DYnhouRTeMIpdiM4xslxIyDOZSqhmGzB81bNSwATeMG5rCqWIYDHBR0zBiXUoW4KKmYbhcShIAAA2MPiFy45L3AAAAAElFTkSuQmCC",
        BOND_ZERO: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAH0lEQVR42mNgGAVkgPtQPHgNHA2z0TAbDbPRMBsAAADVkQ3x7nq43wAAAABJRU5ErkJggg\x3d\x3d",
        BROMINE: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAA3UlEQVR42mNgGAVUB8s0NDYu09T8D8LLNTVvA+lZKzQ1dSg18MRSTU2X5RoarUD2dyC+SKmBu+B8Tc0FQPx3prExK1UMXK6lNRPo2rNIFnQB1UwCikUs09K6DuQXEGXgQg0NYaCGGCD7xVItLX8kA5cD8R1QsADDOBZosCoxBv6F4v9AQxNR5CEGPl2kpydGkpdXqalJA+ksIH4AxLNRDASqITsMgV6yA7kUlnQoNhCYdBRABgINzqTEwINAA+SXq6ubANnrgfgfiE2Jgf+h+C0QrwSKBZMdhqNg4AEAUSSF6Clvq/4AAAAASUVORK5CYII\x3d",
        CALCULATE: "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\x3d",
        CARBON: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAA2klEQVR42mNgGAXYwMyZM1knTZqk1dvbK9vQ0MBEtkETJ06UmzBhwi4g/gXEn4D4L5R9jGTDQK4BanwPxNeArtP///8/4/z58zmAfFcg7iHZQKCmaUD8derUqRIUh9mqVauYgYb9ABlKlUiYPHmyItCw//39/QlUMRBokAPIQFB4UcXAvr4+XaiB4VQxsLu7mxtqYDPVEjM0/b0BJhk+qhgINMgQaOBvID4LS4fAXMIC5JsDw3gCuZFjBDTgPNT7n4H4O1DsApDuoMi1HR0d/MBsaAyiR0s22gMANJ6AxDvp00kAAAAASUVORK5CYII\x3d",
        CHARGE_BRACKET: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAYUlEQVR42mNgGAnACYhF0AX/Q3EDDk0NSGrQwUogNsZmIDEApk4MiOWheAsQ+yLxyTJwIhBfgOIPQHwLiU+WgVT3Mk0NlAZiDkoNXAjEz3Bgil1IkcJRA4e6geSWNkMMAAAxJTQf078zGQAAAABJRU5ErkJggg\x3d\x3d",
        CHLORINE: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAA9klEQVR42mNgGAXIwPi/MavcZzkt5bfKsgz/GZiQ5RTeKyTIfZBLI8ogpXdKcgofFHbJf5D/BcSfgPgvlH0MpgbIXq7wUWEjQcNArgEqfg/E1xTfK+oDXcao8F+BA+gaV6BYD8kGAhVOA+KvCl8UJAioI8LA/wzMQIU/QIYSYTFhA4GKFIH4PyjAqWIg0CAHkIGg8KKKgTLvZHTBLvygEE4VA8VfiHODDATGcTNVDAR7G5L+3qi8VeGjioFA1xkCFf8G4rOwdAjELEDN5kA8gWQDoYqNgPg82Psf5D8D8XcgvgB0fQdZBiJlQX5gjBuD6NGSjX4AAER4jBfAQ3QdAAAAAElFTkSuQmCC",
        CLEAR: "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\x3d\x3d",
        CYCLOBUTANE: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAiklEQVR42q3UwQ2AIAwF0E7hOv4bTCN7uwIXG0MTYgRa2iYNF3lB+ECkr4MCK3NX7hSBgfvmvtp4RmCCnB4Ug8lbKBaTTCiUH6tQGH9nimJzw3/R7IyEoEluQG0581RpzlvJuUL0KyRnaKd7b0VVB6lFTalYoVsRG6HwHOAXRcQTJmiJwPqcql7sB1sQMyMuYZLDAAAAAElFTkSuQmCC",
        CYCLOHEPTANE: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAA+UlEQVR42mNgIB4IMFABMAOxJxCvAeK/QLwAiA3IMUgTiDuB+CkQnwDiDCBWAuIKIH4ExIeAOASIWfAZIgzEmUB8EmpQBxBr4HA1yLCDUMMrgVgcXREPEP8D4pVA7AHVRAzQB+J5UL08yBKKQPyQgrAGuVQBWcARiA9QYCDI+w7IAonQGCQXLATiBGSBRiBuoMBADP0YNpAIMHyIEQYkAow4wIglEgFKKuGFpiMTCgw0gZrBCxMIgdogQYZhElC9IegS1dB8y0GCYRzQrFqNS8FSKCYWLCOkngPqymoiDKsh1kewMAnCoyaY1DA3BOL/BLAhqbHHRY4cAH9nN15emqC1AAAAAElFTkSuQmCC",
        CYCLOHEXANE: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAoElEQVR42mNgIB4IMVAJSADxZCD+A8StQMxFiUH9QPwWiPuA2AiIlwLxYyCOAWJGcg2SQJO3AOITQHwSiC0pMQgZMEJd+Rjqall0BZxA/J8Ig9ABKDwboXo50SX/UxBx/4kWHDVw1EDcemEJu5+aCVsCmlPeEmEwwaxHisGW0ILhBLSgIKn4QjYYVHwtA+JHpBZf2AyeBC1gWygpYMmqAgB+TzRkG9cEtwAAAABJRU5ErkJggg\x3d\x3d",
        CYCLOOCTANE: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABBElEQVR42q2UvQ6CMBSFSXS1g4PRzVUXeRGdHH0KWfQlINGB1VcgzJLokxB2B3dIPDWnSYO1QutJvkB/ONxL7yUIumsU/EFLEIECNCAHOyC6GozBBqSgJPJ+DaY0y8CTVzme2MxkFFewBwvLiwXNcj4zM23a0KyvLuBgWkgZWV+FoAKD9kL5I02b7mDbPs3Soxqk2U2fiJiyq4ZMe6UmCpaGj448oHcHNKwz3yao1UB1gI8ScFID1QGuktk99CwF20l4RBe3JzPHtD+i09POHQzPpugC/jUaHn3YMbIzT3b+bdOMjV5p7TQ0GCVMM7aZ6Rpo7VSxaJctI+e6XfEz1Kwzq9ELFZA4hr9lYwQAAAAASUVORK5CYII\x3d",
        CYCLOPENTANE: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAA0klEQVR42mNgIB6IMFAJMAFxKRD/BuI0Sg1TAeJDUOwOxFeBeAEQc5Hjqnwgfg3EeUDMCBUHGTQfarAWOa5SxqEmHohfAXECOa7CBbTwBYEWEa7CBpCDwAAmKAjEf6ExyUhm5KUD8R8gFoAJ7AHiIApSA0jvbmSBHKjTyQUgvdnIAvJA/BIaMeQksZdQM1DAJSC2IMNAS6heDNAKxaQCnPpw2kQA4PQZzrDAAwiGPUZsEQCg1DGPUHraQYKBOwmlXx4g/k8i5iFkKxsJLmRjoDUAAID6NQMa+if+AAAAAElFTkSuQmCC",
        CYCLOPROPANE: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAjElEQVR42mNgGE5AgZqGiQDxfyCWoJaBk4H4ORBPp4ZhGkB8G4h5gPg6EBtQauB2IA6Asj2AeD8Qs5BrGDYDkC0gCbDg8CIsCDhINbAATySAIqmC1GRyH08yISRPlgsKiE1GxIYRC7HJiJRYJJiMyElnOB3AQmZOwBlEBRTkVYxIlICWJpRimcFfCgMA4CwtbAP2SjIAAAAASUVORK5CYII\x3d",
        DECREASE_CHARGE: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAs0lEQVR42mNgGAU4gAAQK0BpsgELEGcA8WUg/g3E/6H4NhCXQOVJMmw/EL8G4gYgdoC60AKIK4D4ORAfB2IeYg07DMT3gVgFhxoZID4PNZSDkIE5UJepEFAnA3VpCSEDL0O9SQyogIYp3tj8DQ0zUPhI4sE80DD9jy/2FaAKFKCu/I8H16Opp48LqR6GNIllWDq8jidsZKBqiEqHyIZSJacgG5oDdSly7N6HepNjwEubwQEAQdI454gPA8EAAAAASUVORK5CYII\x3d",
        DISTANCE: "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",
        ERASE: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAKQ2lDQ1BJQ0MgUHJvZmlsZQAAeAGdlndUU1kTwO97L73QEkKREnoNTUoAkRJ6kV5FJSQBQgkYErBXRAVXFBVpiiKLIi64uhRZK6JYWBQUsC/IIqCsi6uIimVf9Bxl/9j9vrPzx5zfmztz79yZuec8ACi+gUJRJqwAQIZIIg7z8WDGxMYx8d0ABkSAA9YAcHnZWUHh3hEAFT8vDjMbdZKxTKDP+nX/F7jF8g1hMj+b/n+lyMsSS9CdQtCQuXxBNg/lPJTTcyVZMvskyvTENBnDGBmL0QRRVpVx8hc2/+zzhd1kzM8Q8VEfWc5Z/Ay+jDtQ3pIjFaCMBKKcnyMU5KJ8G2X9dGmGEOU3KNMzBNxsADAUmV0i4KWgbIUyRRwRxkF5HgAESvIsTpzFEsEyNE8AOJlZy8XC5BQJ05hnwrR2dGQzfQW56QKJhBXC5aVxxXwmJzMjiytaDsCXO8uigJKstky0yPbWjvb2LBsLtPxf5V8Xv3r9O8h6+8XjZejnnkGMrm+2b7HfbJnVALCn0Nrs+GZLLAOgZRMAqve+2fQPACCfB0DzjVn3YcjmJUUiyXKytMzNzbUQCngWsoJ+lf/p8NXzn2HWeRay877WjukpSOJK0yVMWVF5memZUjEzO4vLEzBZfxtidOv/HDgrrVl5mIcJkgRigQg9KgqdMqEoGW23iC+UCDNFTKHonzr8H8Nm5SDDL3ONAq3mI6AvsQAKN+gA+b0LYGhkgMTvR1egr30LJEYB2cuL1h79Mvcoo+uf9d8UXIR+wtnCZKbMzAmLYPKk4hwZo29CprCABOQBHagBLaAHjAEL2AAH4AzcgBfwB8EgAsSCxYAHUkAGEINcsAqsB/mgEOwAe0A5qAI1oA40gBOgBZwGF8BlcB3cBH3gPhgEI+AZmASvwQwEQXiICtEgNUgbMoDMIBuIDc2HvKBAKAyKhRKgZEgESaFV0EaoECqGyqGDUB30I3QKugBdhXqgu9AQNA79Cb2DEZgC02FN2BC2hNmwOxwAR8CL4GR4KbwCzoO3w6VwNXwMboYvwNfhPngQfgZPIQAhIwxEB2EhbISDBCNxSBIiRtYgBUgJUo00IG1IJ3ILGUQmkLcYHIaGYWJYGGeMLyYSw8MsxazBbMOUY45gmjEdmFuYIcwk5iOWitXAmmGdsH7YGGwyNhebjy3B1mKbsJewfdgR7GscDsfAGeEccL64WFwqbiVuG24frhF3HteDG8ZN4fF4NbwZ3gUfjOfiJfh8fBn+GP4cvhc/gn9DIBO0CTYEb0IcQUTYQCghHCWcJfQSRgkzRAWiAdGJGEzkE5cTi4g1xDbiDeIIcYakSDIiuZAiSKmk9aRSUgPpEukB6SWZTNYlO5JDyULyOnIp+Tj5CnmI/JaiRDGlcCjxFCllO+Uw5TzlLuUllUo1pLpR46gS6nZqHfUi9RH1jRxNzkLOT44vt1auQq5ZrlfuuTxR3kDeXX6x/Ar5EvmT8jfkJxSICoYKHAWuwhqFCoVTCgMKU4o0RWvFYMUMxW2KRxWvKo4p4ZUMlbyU+Ep5SoeULioN0xCaHo1D49E20mpol2gjdBzdiO5HT6UX0n+gd9MnlZWUbZWjlJcpVyifUR5kIAxDhh8jnVHEOMHoZ7xT0VRxVxGobFVpUOlVmVado+qmKlAtUG1U7VN9p8ZU81JLU9up1qL2UB2jbqoeqp6rvl/9kvrEHPoc5zm8OQVzTsy5pwFrmGqEaazUOKTRpTGlqaXpo5mlWaZ5UXNCi6HlppWqtVvrrNa4Nk17vrZQe7f2Oe2nTGWmOzOdWcrsYE7qaOj46kh1Dup068zoGulG6m7QbdR9qEfSY+sl6e3Wa9eb1NfWD9JfpV+vf8+AaMA2SDHYa9BpMG1oZBhtuNmwxXDMSNXIz2iFUb3RA2OqsavxUuNq49smOBO2SZrJPpObprCpnWmKaYXpDTPYzN5MaLbPrMcca+5oLjKvNh9gUVjurBxWPWvIgmERaLHBosXiuaW+ZZzlTstOy49WdlbpVjVW962VrP2tN1i3Wf9pY2rDs6mwuT2XOtd77tq5rXNf2JrZCmz3296xo9kF2W22a7f7YO9gL7ZvsB930HdIcKh0GGDT2SHsbewrjlhHD8e1jqcd3zrZO0mcTjj94cxyTnM+6jw2z2ieYF7NvGEXXReuy0GXwfnM+QnzD8wfdNVx5bpWuz5203Pju9W6jbqbuKe6H3N/7mHlIfZo8pjmOHFWc857Ip4+ngWe3V5KXpFe5V6PvHW9k73rvSd97HxW+pz3xfoG+O70HfDT9OP51flN+jv4r/bvCKAEhAeUBzwONA0UB7YFwUH+QbuCHiwwWCBa0BIMgv2CdwU/DDEKWRrycyguNCS0IvRJmHXYqrDOcFr4kvCj4a8jPCKKIu5HGkdKI9uj5KPio+qipqM9o4ujB2MsY1bHXI9VjxXGtsbh46LiauOmFnot3LNwJN4uPj++f5HRomWLri5WX5y++MwS+SXcJScTsAnRCUcT3nODudXcqUS/xMrESR6Ht5f3jO/G380fF7gIigWjSS5JxUljyS7Ju5LHU1xTSlImhBxhufBFqm9qVep0WnDa4bRP6dHpjRmEjISMUyIlUZqoI1Mrc1lmT5ZZVn7W4FKnpXuWTooDxLXZUPai7FYJHf2Z6pIaSzdJh3Lm51TkvMmNyj25THGZaFnXctPlW5ePrvBe8f1KzEreyvZVOqvWrxpa7b764BpoTeKa9rV6a/PWjqzzWXdkPWl92vpfNlhtKN7wamP0xrY8zbx1ecObfDbV58vli/MHNjtvrtqC2SLc0r117tayrR8L+AXXCq0KSwrfb+Ntu/ad9Xel333anrS9u8i+aP8O3A7Rjv6drjuPFCsWryge3hW0q3k3c3fB7ld7luy5WmJbUrWXtFe6d7A0sLS1TL9sR9n78pTyvgqPisZKjcqtldP7+Pt697vtb6jSrCqsendAeODOQZ+DzdWG1SWHcIdyDj2piarp/J79fV2tem1h7YfDosODR8KOdNQ51NUd1ThaVA/XS+vHj8Ufu/mD5w+tDayGg42MxsLj4Lj0+NMfE37sPxFwov0k+2TDTwY/VTbRmgqaoeblzZMtKS2DrbGtPaf8T7W3Obc1/Wzx8+HTOqcrziifKTpLOpt39tO5Feemzmedn7iQfGG4fUn7/YsxF293hHZ0Xwq4dOWy9+WLne6d5664XDl91enqqWvsay3X7a83d9l1Nf1i90tTt3138w2HG603HW+29czrOdvr2nvhluety7f9bl/vW9DX0x/Zf2cgfmDwDv/O2N30uy/u5dybub/uAfZBwUOFhyWPNB5V/2rya+Og/eCZIc+hrsfhj+8P84af/Zb92/uRvCfUJyWj2qN1YzZjp8e9x28+Xfh05FnWs5mJ/N8Vf698bvz8pz/c/uiajJkceSF+8enPbS/VXh5+ZfuqfSpk6tHrjNcz0wVv1N4cect+2/ku+t3oTO57/PvSDyYf2j4GfHzwKePTp78AA5vz/OzO54oAAAAJcEhZcwAACxMAAAsTAQCanBgAAAQfSURBVDgRhZNdTFtlGMf/pz30Y4W13WhhBZKlshgCSyryFTK1LJvRbFkgxuiFZq1xiXEX6oV6Obgx8YrEK++oVxpvNm+8Mo4sM2qA8dVS2FlXCqVftPS0pR30nJ7j8x5WhbHFN3n7nHOePr88///7vBz+Z3EcB5PJBLfbjaGhIfT09MD/+hWfockyWc0Wkbm36D/39Xt36hh9/eF5UafTwWq1ahCv16tF3xtXp8xO+zjf0GDSyapJSuXf3/x5OuZ889UFxuCeB2LfeJ6Hw+GAx+NBf38/Prv8rs3UbLtrPGnxoCpDWt+GnMpr5buZHWw/2vCf/+5m4BiQSTQYDGhra8PAwIAGvPHaVa/F5bjdYDbZlNITSA8TqOVKUBUFIBWcjkN+M41wKOTnD3fIYI2Njejs7NRgXV1d+Ojitc/Np22TPBUyiCQQrLSnlXEkUK0pUFWgxMuYzUQn/wXq9XrY7XbNJ9bZV1c+sJmc9skTTpuPkxTUEnnsRZKAVDswiiB1w0rlCv4KLuC+sGjTgMyv1tZW9Pb2oq+vDzdHxjzmNseUudnqwRMJUjQDKbkDTlGhkklMCYtaawQWVtfwe2gGMTET4I1GIzo6OjA4OHjg16WxUVOLfYrMt6kkTRaSkPNlcFSoEohotOmFgkJyI8FV3I0uILKdgKKoP/AulwvDw8Ma7OPLY+Pmdsct3miAShBmvlqpaow6TOuOaFWSKQTD+CMnIJTZxE6psL4mJqZ5Zjw7hBtvv3Pb4naNMiVKuoBadBuQ2SmyVmhr8cC3UjqH5ZUgFssJLG9GsBKLQJWVCcqCZ3I/vXDNZ7CcGK2VKtCJ+1AyBZZ7Ko9gJJN1xqDxYARLcQHhQhKLG4+wHBWg7suBh4VUgJXw7FrxZuMtPbksTge1U7SddR3AWFdPd7W8j8ezS5jPxSDkEpiLrmF9Kw5Fkv11mAb8cnjMa+lwnuXoNI0kTYyTVDLbyqA6kkydVXIFhP6cI4lxCOk4ZiJhZLM5kWZwhGDalWMwtnhjs/U6bzGhlipqY9XUcgoFmvrdRBZtgz3IClHMzc8hXE4hvBXDHMH2disLqqKOCMW0eID575crLkXzTR1OmzQbhVwsQ97fR7Wyh1JyG0WxiBVxC6simb8RQYjMV/akAIH8dYTKrsmhxSu1GlSxrI2BjplPN0ZPg85bzAhHQniQXceDx2vYTCdFVap9QbDAofpjj/y973+aMLafnmx3nkGL7RRMHE9ToiK2sYH78VX8HVlBQSysk19jBDvi1zEafaBjBL69dN3X/rJ7qru7GzaTBVupBH789Rf8JswziXdIlv95frHaZyVrQJb45uKHPvJySjJwmFlawGJkFVJVmiDQOMu/aD0LPPK/T/re8l146bz6yhn3/LmTLd4jyRe8MODh/Q+zf/gKTlsAkwAAAABJRU5ErkJggg\x3d\x3d",
        FLUORINE: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAUElEQVR42mNgGAU0AxPuB26c8CDgPxr+SqmBpyc+DDCG4UkP/AwpNXAvtb08+A38A8SfYbj/ob8LpQae6Hvoqw3DU1+F8oxGygAaOAoGDgAAN7dbSHln+I0AAAAASUVORK5CYII\x3d",
        HYDROGEN: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAANElEQVR42mNgGAW0BBuBeC8W8SIg/jtqINEGngBiTTTcSYmB/4D4Jxr+Mxopw8jAUTBAAADIhCT11Q14ZwAAAABJRU5ErkJggg\x3d\x3d",
        INCREASE_CHARGE: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAyklEQVR42mNgGAU4gAAQK0BpsgELEGcA8WUg/g3E/6H4NhCXQOVJMmw/EL8G4gYgdoC60AKIK4D4ORAfB2IeYg07DMT3gVgFKsYDNRhmgAwQn4caykHIwByoy1SQxCSh3pVEEpOBurSEkIGXoa5hIGAgA9T7twnF5m9omPFADQBhA6iBBkhiPNAw/Y8v9hWgChSgrvyPB9ejqaePC6kehjSJZVg6vI4UNjzQMENOh4eJTYfIhlIlpyAbmgN1KXLs3od6k2PAS5vBAQCFSEECjKrjagAAAABJRU5ErkJggg\x3d\x3d",
        IODINE: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAI0lEQVR42mNgGAV0AVMYpmyeyjB196iBowaOGkhXA0cBfQEADcspQU08dAAAAAAASUVORK5CYII\x3d",
        LASSO: "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\x3d",
        LASSO_SHAPES: "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",
        MARQUEE: "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",
        MOVE: "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\x3d",
        NITROGEN: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAoElEQVR42mNgGAU0AwaBPzYaBPx4Z+z7SQRZXN/vlyFQ/L9l6H9Ocgz8b+D/YxY1DfwJxH8N/X6ZUMdAoOuAml8ZBPw8wcDwn5EaLuw09P8eBzJA3/97IlUMBLMDfuwH4pfGof/5qWKgUeBPTWh4TqCKgRD+91Yg/zcsCCg2EGQAkH8PiJ9SxUAQMAz44QlOm9QyEBzLAT/WkGXgKBg4AABF1poQYk+4pAAAAABJRU5ErkJggg\x3d\x3d",
        OPEN: "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",
        OPTIMIZE: "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\x3d\x3d",
        OXYGEN: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABCklEQVR42mNgGAXYwH8pKa7/PDxa/xkY2CgzSFBQ7j8v7wEg/gPEn4H4JxBvAGJh0g3j4pICanwDxCf+8/MrgcW4uXWB/FtAfA/katIM5OGZCNT44b+AgACKOD+/MtTFxcQbxsDADNTwDWQoVnle3nVAfJt4A/n5FYEa/v/n44vF4fpqoPxfoiMJqMEBbCA3twsOFyaC5aFhS4yBOmANPDwhOAwsAssLCfERG4acQA3/gLgKqzwf33Sg3CvSYpmXdy0Q3wEazoQiLirKAxR/jyvC8BmoAY3pZTCvAcNUHCi2F5w+eXhESU/ckLC8CE13T8Axy8u7D5SDKMuCvLwiwBg1Bnl3tGSjPQAAoX15+BfxFYQAAAAASUVORK5CYII\x3d",
        PERIODIC_TABLE: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAKQ2lDQ1BJQ0MgUHJvZmlsZQAAeAGdlndUU1kTwO97L73QEkKREnoNTUoAkRJ6kV5FJSQBQgkYErBXRAVXFBVpiiKLIi64uhRZK6JYWBQUsC/IIqCsi6uIimVf9Bxl/9j9vrPzx5zfmztz79yZuec8ACi+gUJRJqwAQIZIIg7z8WDGxMYx8d0ABkSAA9YAcHnZWUHh3hEAFT8vDjMbdZKxTKDP+nX/F7jF8g1hMj+b/n+lyMsSS9CdQtCQuXxBNg/lPJTTcyVZMvskyvTENBnDGBmL0QRRVpVx8hc2/+zzhd1kzM8Q8VEfWc5Z/Ay+jDtQ3pIjFaCMBKKcnyMU5KJ8G2X9dGmGEOU3KNMzBNxsADAUmV0i4KWgbIUyRRwRxkF5HgAESvIsTpzFEsEyNE8AOJlZy8XC5BQJ05hnwrR2dGQzfQW56QKJhBXC5aVxxXwmJzMjiytaDsCXO8uigJKstky0yPbWjvb2LBsLtPxf5V8Xv3r9O8h6+8XjZejnnkGMrm+2b7HfbJnVALCn0Nrs+GZLLAOgZRMAqve+2fQPACCfB0DzjVn3YcjmJUUiyXKytMzNzbUQCngWsoJ+lf/p8NXzn2HWeRay877WjukpSOJK0yVMWVF5memZUjEzO4vLEzBZfxtidOv/HDgrrVl5mIcJkgRigQg9KgqdMqEoGW23iC+UCDNFTKHonzr8H8Nm5SDDL3ONAq3mI6AvsQAKN+gA+b0LYGhkgMTvR1egr30LJEYB2cuL1h79Mvcoo+uf9d8UXIR+wtnCZKbMzAmLYPKk4hwZo29CprCABOQBHagBLaAHjAEL2AAH4AzcgBfwB8EgAsSCxYAHUkAGEINcsAqsB/mgEOwAe0A5qAI1oA40gBOgBZwGF8BlcB3cBH3gPhgEI+AZmASvwQwEQXiICtEgNUgbMoDMIBuIDc2HvKBAKAyKhRKgZEgESaFV0EaoECqGyqGDUB30I3QKugBdhXqgu9AQNA79Cb2DEZgC02FN2BC2hNmwOxwAR8CL4GR4KbwCzoO3w6VwNXwMboYvwNfhPngQfgZPIQAhIwxEB2EhbISDBCNxSBIiRtYgBUgJUo00IG1IJ3ILGUQmkLcYHIaGYWJYGGeMLyYSw8MsxazBbMOUY45gmjEdmFuYIcwk5iOWitXAmmGdsH7YGGwyNhebjy3B1mKbsJewfdgR7GscDsfAGeEccL64WFwqbiVuG24frhF3HteDG8ZN4fF4NbwZ3gUfjOfiJfh8fBn+GP4cvhc/gn9DIBO0CTYEb0IcQUTYQCghHCWcJfQSRgkzRAWiAdGJGEzkE5cTi4g1xDbiDeIIcYakSDIiuZAiSKmk9aRSUgPpEukB6SWZTNYlO5JDyULyOnIp+Tj5CnmI/JaiRDGlcCjxFCllO+Uw5TzlLuUllUo1pLpR46gS6nZqHfUi9RH1jRxNzkLOT44vt1auQq5ZrlfuuTxR3kDeXX6x/Ar5EvmT8jfkJxSICoYKHAWuwhqFCoVTCgMKU4o0RWvFYMUMxW2KRxWvKo4p4ZUMlbyU+Ep5SoeULioN0xCaHo1D49E20mpol2gjdBzdiO5HT6UX0n+gd9MnlZWUbZWjlJcpVyifUR5kIAxDhh8jnVHEOMHoZ7xT0VRxVxGobFVpUOlVmVado+qmKlAtUG1U7VN9p8ZU81JLU9up1qL2UB2jbqoeqp6rvl/9kvrEHPoc5zm8OQVzTsy5pwFrmGqEaazUOKTRpTGlqaXpo5mlWaZ5UXNCi6HlppWqtVvrrNa4Nk17vrZQe7f2Oe2nTGWmOzOdWcrsYE7qaOj46kh1Dup068zoGulG6m7QbdR9qEfSY+sl6e3Wa9eb1NfWD9JfpV+vf8+AaMA2SDHYa9BpMG1oZBhtuNmwxXDMSNXIz2iFUb3RA2OqsavxUuNq49smOBO2SZrJPpObprCpnWmKaYXpDTPYzN5MaLbPrMcca+5oLjKvNh9gUVjurBxWPWvIgmERaLHBosXiuaW+ZZzlTstOy49WdlbpVjVW962VrP2tN1i3Wf9pY2rDs6mwuT2XOtd77tq5rXNf2JrZCmz3296xo9kF2W22a7f7YO9gL7ZvsB930HdIcKh0GGDT2SHsbewrjlhHD8e1jqcd3zrZO0mcTjj94cxyTnM+6jw2z2ieYF7NvGEXXReuy0GXwfnM+QnzD8wfdNVx5bpWuz5203Pju9W6jbqbuKe6H3N/7mHlIfZo8pjmOHFWc857Ip4+ngWe3V5KXpFe5V6PvHW9k73rvSd97HxW+pz3xfoG+O70HfDT9OP51flN+jv4r/bvCKAEhAeUBzwONA0UB7YFwUH+QbuCHiwwWCBa0BIMgv2CdwU/DDEKWRrycyguNCS0IvRJmHXYqrDOcFr4kvCj4a8jPCKKIu5HGkdKI9uj5KPio+qipqM9o4ujB2MsY1bHXI9VjxXGtsbh46LiauOmFnot3LNwJN4uPj++f5HRomWLri5WX5y++MwS+SXcJScTsAnRCUcT3nODudXcqUS/xMrESR6Ht5f3jO/G380fF7gIigWjSS5JxUljyS7Ju5LHU1xTSlImhBxhufBFqm9qVep0WnDa4bRP6dHpjRmEjISMUyIlUZqoI1Mrc1lmT5ZZVn7W4FKnpXuWTooDxLXZUPai7FYJHf2Z6pIaSzdJh3Lm51TkvMmNyj25THGZaFnXctPlW5ePrvBe8f1KzEreyvZVOqvWrxpa7b764BpoTeKa9rV6a/PWjqzzWXdkPWl92vpfNlhtKN7wamP0xrY8zbx1ecObfDbV58vli/MHNjtvrtqC2SLc0r117tayrR8L+AXXCq0KSwrfb+Ntu/ad9Xel333anrS9u8i+aP8O3A7Rjv6drjuPFCsWryge3hW0q3k3c3fB7ld7luy5WmJbUrWXtFe6d7A0sLS1TL9sR9n78pTyvgqPisZKjcqtldP7+Pt697vtb6jSrCqsendAeODOQZ+DzdWG1SWHcIdyDj2piarp/J79fV2tem1h7YfDosODR8KOdNQ51NUd1ThaVA/XS+vHj8Ufu/mD5w+tDayGg42MxsLj4Lj0+NMfE37sPxFwov0k+2TDTwY/VTbRmgqaoeblzZMtKS2DrbGtPaf8T7W3Obc1/Wzx8+HTOqcrziifKTpLOpt39tO5Feemzmedn7iQfGG4fUn7/YsxF293hHZ0Xwq4dOWy9+WLne6d5664XDl91enqqWvsay3X7a83d9l1Nf1i90tTt3138w2HG603HW+29czrOdvr2nvhluety7f9bl/vW9DX0x/Zf2cgfmDwDv/O2N30uy/u5dybub/uAfZBwUOFhyWPNB5V/2rya+Og/eCZIc+hrsfhj+8P84af/Zb92/uRvCfUJyWj2qN1YzZjp8e9x28+Xfh05FnWs5mJ/N8Vf698bvz8pz/c/uiajJkceSF+8enPbS/VXh5+ZfuqfSpk6tHrjNcz0wVv1N4cect+2/ku+t3oTO57/PvSDyYf2j4GfHzwKePTp78AA5vz/OzO54oAAAAJcEhZcwAACxMAAAsTAQCanBgAAAKnSURBVDgRzVTPTxNBGH37g6WlTdmCNKJQTA/EAzF6aIyNCXKzMcazN27Em0dvEv0DPJiY+A+IJ403jdHgyRiUqohtRaTSSotlW0rbbffnOLONJLsVqTdfMpt937x5M998MwPt2V1SS16ZFwQBoiiC53kcBNYfiUQwNTWFRCKB6elpEEKcduvht/mzD9aIyPkbsKu7E6nI+OlTxdz7g8xYPBgMOmbxeBwjIyOwLMslf7O5AxGqAt+sOZu9Z51AETMuhYdIkgRZlhG6eH1ejvhuqrqNO8sKBI7DuiyBzy5BJFoNre0CVndUz/BuytKrVCpYkXjsCjxU1UTdsGHaQKpuQ9jI0BVaBngOCFEBQzQaRSwW63ajkcHBQQwPD4NNvdm2kVc0VDXqRqF9TwOtPWpIi9AfPo7LchH3B4aQTCadjXdUno/P50MgEECZppcnHAqgK/FAZJzzh2GMBi48mUwQ/9gxCEG/R9ahHC+A0EwWV5awejIOwyZdOpHWHMTS4BNCOFIsgxTS4Pr6uoQswPawZZpITZ5DZvwMDLZ5HjiGMHXYe3VYP03Y2589EjfVKM0PxFChxRjoXiAOPsVun57Z/28oknoRlWIOH+pHEdLbILT9DewMKsoWtPQyuKq+L9VLORC1Cu7F1Rh59FHBpzwH2+JAjNa+6E8/rK4b4VGUI1Hw9Or9BtFbMDUTYvl5e8avCwi3m6jprIaHo1+TYDbkjpBQU5Nm5WQmgmNPEbtq7Aawc/avWFhYcA3h5ubmcOnaeTI2RCcxm67OXohla9iqreHG49eLX2+/nRFLpRLqrSy22hKautKLh0tj2G28+pHGeqruxMVsNouVAjXK6yhvHv6EudwoMXWC9BdayFyjY5jJZPDy6QRW36mwm4ZX3xN33gits/+/AMFdJZghFwS8AAAAAElFTkSuQmCC",
        PERSPECTIVE: "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\x3d",
        PHOSPHORUS: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAeElEQVR42mNgGAU0A/8bGDYC8X8o/gLEV/43MqRSZmA9wwkgtgAalA/kXwSy//1vYtCnxIW74PxGBnewa+sZMqhjYD2DCtTAHOoY2MDQAjXQjBIDrwANKALS+4H4D5A9g9JY/gA1bC4Q+1Ej2eyidjocSQaOgoEDAIsaZcCSspZYAAAAAElFTkSuQmCC",
        PUSHER_BOND_FORMING: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAABAUlEQVR42mNgQAAdIH4PxJeBOIaBOBABxNeB+DkQm6BLdgNxPxBbAPFjIGYhwsD7QOwAxM1APBld8jRUkgHqSg0ChilAXccA1XceXQHI2TJQ9mwgziFgYAoQL4ayJYD4NbqC/0jeLADi6QQMBHmxBE0/hoHIgb2agIGr0SLvPz7FFtAwxQdOQ9XhjK37aAF+n4gYVsBlBrqBEtBIwgeeQ9XhMoMBW5iCwugaUviA6IdAnEAozHAZ+ARKb4aKrUcylCwDvwLxDyBWgYqB6F9QObIMPAnE89HElwDxH3IN/I7kOgYkV5Jt4HwcchvJNVAFh5wKOQYOLtCAlBQowfVUNxAAeY1sopoKHG8AAAAASUVORK5CYII\x3d",
        PUSHER_DOUBLE: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAA8klEQVR42mNgGACgA8QxQBwAxCKUGOQAxKeB+DwQzwfiw0D8HohzyDEM5JrXQBwBxCxI4hpQC7pJ9eJjIDbBIS8BxLeBOIFYA/cDcQUBNSZQS3mICbfbaN7EBZYDcQEhRYuJcB0MeEDDE6flPNBYVCDSQBYCYQ327mUSUwPI2ym4JEuAeDaRBskAsQpUz3SoK1WwhV8JkQaCguc/NOHfg7IxYhyUE1xI8O5zqEEwjAFuY3M2HpAJxP+ghu3FpgAUwwIkGAhS+xdqYC82Bf/JyPM3ofpiqGVgGVSfCbXKSgFsMXwfinHxCYF+dAFKDZRB5gAAj/I5E2fZy9MAAAAASUVORK5CYII\x3d",
        PUSHER_SINGLE: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAA6ElEQVR42mNgGACgA8QxQBwAxCKUGOQAxKeB+DwQzwfiw0D8HohzyDEM5JrXQBwBxCxI4hpQC7pJ9eJjIDbBIS8BxLeBOIFYA/cDcQUBNSZQS3mICbfbaN7EBZYDcQEhRYuJcB0MeEDDE6flPNBYVCDSQBYCYQ327mUSUwPI2ym4JEuAeDaJBoL0TIeyZdB9txiqgBTgAU38O4H4P9RQOADlBBcSDVSAGvQPiO+gS4KSiwqJBgpADbyKLSzfQxWQCkAGfsFWcPwnsxAB6duOS4JcA1OoWV7+x1VO3odiUsFxXBLkGoiSdgEanzHP7ILArQAAAABJRU5ErkJggg\x3d\x3d",
        QUERY: "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",
        REDO: "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\x3d\x3d",
        REMOVE_LONE_PAIR: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAN0lEQVR42mNgGAWjYHACBSDeD8T/gfg4lE+KPAYAKTaBsg2gmkiRxwD/KeTT3oVUD8NRMAoIAAADoBa5tWLP/wAAAABJRU5ErkJggg\x3d\x3d",
        REMOVE_RADICAL: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAM0lEQVR42mNgGAWjYGgABSDeD8T/gfg4lE8RABlmAmUbQA2lCPwnwB94F1I9DEfBKEADAAT6C11yCuPwAAAAAElFTkSuQmCC",
        SAVE: "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\x3d",
        SEARCH: "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\x3d\x3d",
        SETTINGS: "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\x3d",
        SULFUR: "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAwUlEQVR42mNgGAXo4P9/Y7n///Wl//9nYKTQIAP///8NzwIN+w5k/wHir0BsQK6ruICa3wHxEiCbH8I3jPv/X1eJTAP1jICG/Qe6zoxK4WYmDDTwNxDXUzEyDOZBXGkw+/9/cz4qGMjACHIhEP8D4gdkRwgWl1oD8UNoLFtTKy2KAA17DcTzqRimhjuABh4jU7O+IdCAiP//VdihhpkADfsJpJvJdY0z0ICP0KTzDBoxi2EWUJiPDUxBYThaqtEPAAAQY5TwZ4cDHAAAAABJRU5ErkJggg\x3d\x3d",
        TORSION: "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\x3d",
        UNDO: "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\x3d",
        ZOOM_IN: "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\x3d",
        ZOOM_OUT: "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\x3d"
    }
}();
(function(a, g, l) {
    a.Button = function(a, d, e, g) {
        this.id = a;
        this.icon = d;
        this.toggle = !1;
        this.tooltip = e ? e : "";
        this.func = g ? g : void 0
    };
    a = a.Button.prototype;
    a.getElement = function() {
        return l("#" + this.id)
    };
    a.getSource = function(a) {
        var d = [];
        this.toggle ? (d.push('\x3cinput type\x3d"radio" name\x3d"'), d.push(a), d.push('" id\x3d"'), d.push(this.id), d.push('" title\x3d"'), d.push(this.tooltip), d.push('" /\x3e\x3clabel for\x3d"'), d.push(this.id), d.push('"\x3e\x3cimg id\x3d"'), d.push(this.id), d.push('_icon" title\x3d"'), d.push(this.tooltip),
            d.push('" width\x3d"20" height\x3d"20" src\x3d"'), d.push(g.getURI(this.icon)), d.push('"\x3e\x3c/label\x3e')) : (d.push('\x3cbutton id\x3d"'), d.push(this.id), d.push('" onclick\x3d"return false;" title\x3d"'), d.push(this.tooltip), d.push('"\x3e\x3cimg title\x3d"'), d.push(this.tooltip), d.push('" width\x3d"20" height\x3d"20" src\x3d"'), d.push(g.getURI(this.icon)), d.push('"\x3e\x3c/button\x3e'));
        return d.join("")
    };
    a.setup = function(a) {
        var d = this.getElement();
        (!this.toggle || a) && d.button();
        d.click(this.func)
    };
    a.disable = function() {
        var a = this.getElement();
        a.mouseout();
        a.button("disable")
    };
    a.enable = function() {
        this.getElement().button("enable")
    };
    a.select = function() {
        var a = this.getElement();
        a.attr("checked", !0);
        a.button("refresh")
    }
})(ChemDoodle.uis.gui.desktop, ChemDoodle.uis.gui.imageDepot, ChemDoodle.lib.jQuery);
(function(a, g) {
    a.ButtonSet = function(a) {
        this.id = a;
        this.buttons = [];
        this.toggle = !0
    };
    var l = a.ButtonSet.prototype;
    l.getElement = function() {
        return g("#" + this.id)
    };
    l.getSource = function(a) {
        var d = [];
        d.push('\x3cspan id\x3d"');
        d.push(this.id);
        d.push('"\x3e');
        for (var e = 0, g = this.buttons.length; e < g; e++) this.toggle && (this.buttons[e].toggle = !0), d.push(this.buttons[e].getSource(a));
        this.dropDown && d.push(this.dropDown.getButtonSource());
        d.push("\x3c/span\x3e");
        this.dropDown && d.push(this.dropDown.getHiddenSource());
        return d.join("")
    };
    l.setup = function() {
        this.getElement().buttonset();
        for (var a = 0, d = this.buttons.length; a < d; a++) this.buttons[a].setup(!1);
        this.dropDown && this.dropDown.setup()
    };
    l.addDropDown = function(g) {
        this.dropDown = new a.DropDown(this.id + "_dd", g, this.buttons[this.buttons.length - 1])
    };
    l.disable = function() {
        for (var a = 0, d = this.buttons.length; a < d; a++) this.buttons[a].disable()
    };
    l.enable = function() {
        for (var a = 0, d = this.buttons.length; a < d; a++) this.buttons[a].enable()
    }
})(ChemDoodle.uis.gui.desktop, ChemDoodle.lib.jQuery);
(function(a) {
    a.CheckBox = function(a, l, k, d) {
        this.id = a;
        this.checked = d ? d : !1;
        this.tooltip = l ? l : "";
        this.func = k ? k : void 0
    };
    a = a.CheckBox.prototype = new a.Button;
    a.getSource = function() {
        var a = [];
        a.push('\x3cinput type\x3d"checkbox" id\x3d"');
        a.push(this.id);
        a.push('" ');
        this.checked && a.push('checked\x3d"" ');
        a.push('\x3e\x3clabel for\x3d"');
        a.push(this.id);
        a.push('"\x3e');
        a.push(this.tooltip);
        a.push("\x3c/label\x3e");
        return a.join("")
    };
    a.setup = function() {
        this.getElement().click(this.func)
    };
    a.check = function() {
        this.checked = !0;
        this.getElement().prop("checked", !0)
    };
    a.uncheck = function() {
        this.checked = !1;
        this.getElement().removeAttr("checked")
    }
})(ChemDoodle.uis.gui.desktop, ChemDoodle.lib.jQuery);
(function(a, g) {
    a.ColorPicker = function(a, d, e) {
        this.id = a;
        this.tooltip = d ? d : "";
        this.func = e ? e : void 0
    };
    var l = a.ColorPicker.prototype;
    l.getElement = function() {
        return g("#" + this.id)
    };
    l.getSource = function() {
        var a = [];
        a.push('\x3ctable style\x3d"font-size:12px;text-align:left;border-spacing:0px"\x3e\x3ctr\x3e\x3ctd\x3e\x3cp\x3e');
        a.push(this.tooltip);
        a.push('\x3c/p\x3e\x3c/td\x3e\x3ctd\x3e\x3cinput id\x3d"');
        a.push(this.id);
        a.push('" class\x3d"simple_color" value\x3d"#000000" /\x3e\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e');
        return a.join("")
    };
    l.setup = function() {
        this.getElement().simpleColor({
            boxWidth: 20,
            livePreview: !0,
            chooserCSS: {
                "z-index": "900"
            },
            onSelect: this.func
        })
    };
    l.setColor = function(a) {
        this.getElement().setColor(a)
    }
})(ChemDoodle.uis.gui.desktop, ChemDoodle.lib.jQuery);
(function(a, g, l) {
    a.Dialog = function(a, d, e) {
        this.sketcherid = a;
        this.id = a + d;
        this.title = e ? e : "Information"
    };
    a = a.Dialog.prototype;
    a.buttons = void 0;
    a.message = void 0;
    a.afterMessage = void 0;
    a.includeTextArea = !1;
    a.includeTextField = !1;
    a.getElement = function() {
        return g("#" + this.id)
    };
    a.getTextArea = function() {
        return g("#" + this.id + "_ta")
    };
    a.getTextField = function() {
        return g("#" + this.id + "_tf")
    };
    a.setup = function() {
        var a = [];
        a.push('\x3cdiv style\x3d"font-size:12px;" id\x3d"');
        a.push(this.id);
        a.push('" title\x3d"');
        a.push(this.title);
        a.push('"\x3e');
        this.message && (a.push("\x3cp\x3e"), a.push(this.message), a.push("\x3c/p\x3e"));
        this.includeTextField && (a.push('\x3cinput type\x3d"text" style\x3d"font-family:\'Courier New\';" id\x3d"'), a.push(this.id), a.push('_tf" autofocus\x3e\x3c/input\x3e'));
        this.includeTextArea && (a.push('\x3ctextarea style\x3d"font-family:\'Courier New\';" id\x3d"'), a.push(this.id), a.push('_ta" cols\x3d"55" rows\x3d"10"\x3e\x3c/textarea\x3e'));
        this.afterMessage && (a.push("\x3cp\x3e"), a.push(this.afterMessage), a.push("\x3c/p\x3e"));
        a.push("\x3c/div\x3e");
        l.getElementById(this.sketcherid) ? g("#" + this.sketcherid).before(a.join("")) : l.writeln(a.join(""));
        this.getElement().dialog({
            autoOpen: !1,
            width: 435,
            buttons: this.buttons
        })
    }
})(ChemDoodle.uis.gui.desktop, ChemDoodle.lib.jQuery, document);
(function(a, g, l, k, d, e) {
    var j = function(a, d, e, g, j) {
        var c = ["\x3ctr\x3e"];
        c.push("\x3ctd\x3e"); - 1 === a.indexOf("_elements") && (c.push('\x3cinput type\x3d"checkbox" id\x3d"'), c.push(a), c.push('_include"\x3e'));
        c.push("\x3c/td\x3e");
        c.push("\x3ctd\x3e");
        c.push(d);
        e && (c.push("\x3cbr\x3e(\x3cstrong\x3e"), c.push(e), c.push("\x3c/strong\x3e)"));
        c.push("\x3c/td\x3e");
        c.push('\x3ctd style\x3d"padding-left:20px;padding-right:20px;"\x3e');
        c.push(g);
        j && (1 === j ? (c.push("\x3cbr\x3e"), c.push('\x3cinput type\x3d"text" id\x3d"'),
            c.push(a), c.push('_value"\x3e')) : c.push(j));
        c.push("\x3c/td\x3e");
        c.push('\x3ctd\x3e\x3cinput type\x3d"checkbox" id\x3d"');
        c.push(a);
        c.push('_not"\x3e\x3cbr\x3e\x3cstrong\x3eNOT\x3c/strong\x3e');
        c.push("\x3c/td\x3e");
        c.push("\x3c/tr\x3e");
        return c.join("")
    };
    k.AtomQueryDialog = function(a, d) {
        this.sketcher = a;
        this.id = a.id + d
    };
    k = k.AtomQueryDialog.prototype = new k.Dialog;
    k.title = "Atom Query";
    k.setAtom = function(a) {
        this.a = a;
        var e = a.query;
        e || (e = new g.Query(g.Query.TYPE_ATOM), e.elements.v.push(a.label));
        a = 0;
        for (var h =
                this.periodicTable.cells.length; a < h; a++) this.periodicTable.cells[a].selected = -1 !== e.elements.v.indexOf(this.periodicTable.cells[a].element.symbol);
        this.periodicTable.repaint();
        d("#" + this.id + "_el_any").prop("checked", -1 !== e.elements.v.indexOf("a"));
        d("#" + this.id + "_el_noth").prop("checked", -1 !== e.elements.v.indexOf("r"));
        d("#" + this.id + "_el_het").prop("checked", -1 !== e.elements.v.indexOf("q"));
        d("#" + this.id + "_el_hal").prop("checked", -1 !== e.elements.v.indexOf("x"));
        d("#" + this.id + "_el_met").prop("checked", -1 !== e.elements.v.indexOf("m"));
        d("#" + this.id + "_elements_not").prop("checked", e.elements.not);
        d("#" + this.id + "_aromatic_include").prop("checked", void 0 !== e.aromatic);
        d("#" + this.id + "_aromatic_not").prop("checked", void 0 !== e.aromatic && e.aromatic.not);
        d("#" + this.id + "_charge_include").prop("checked", void 0 !== e.charge);
        d("#" + this.id + "_charge_value").val(e.charge ? e.outputRange(e.charge.v) : "");
        d("#" + this.id + "_charge_not").prop("checked", void 0 !== e.charge && e.charge.not);
        d("#" + this.id + "_hydrogens_include").prop("checked",
            void 0 !== e.hydrogens);
        d("#" + this.id + "_hydrogens_value").val(e.hydrogens ? e.outputRange(e.hydrogens.v) : "");
        d("#" + this.id + "_hydrogens_not").prop("checked", void 0 !== e.charge && e.charge.not);
        d("#" + this.id + "_ringCount_include").prop("checked", void 0 !== e.ringCount);
        d("#" + this.id + "_ringCount_value").val(e.ringCount ? e.outputRange(e.ringCount.v) : "");
        d("#" + this.id + "_ringCount_not").prop("checked", void 0 !== e.ringCount && e.ringCount.not);
        d("#" + this.id + "_saturation_include").prop("checked", void 0 !== e.saturation);
        d("#" + this.id + "_saturation_not").prop("checked", void 0 !== e.saturation && e.saturation.not);
        d("#" + this.id + "_connectivity_include").prop("checked", void 0 !== e.connectivity);
        d("#" + this.id + "_connectivity_value").val(e.connectivity ? e.outputRange(e.connectivity.v) : "");
        d("#" + this.id + "_connectivity_not").prop("checked", void 0 !== e.connectivity && e.connectivity.not);
        d("#" + this.id + "_connectivityNoH_include").prop("checked", void 0 !== e.connectivityNoH);
        d("#" + this.id + "_connectivityNoH_value").val(e.connectivityNoH ?
            e.outputRange(e.connectivityNoH.v) : "");
        d("#" + this.id + "_connectivityNoH_not").prop("checked", void 0 !== e.connectivityNoH && e.connectivityNoH.not);
        d("#" + this.id + "_chirality_include").prop("checked", void 0 !== e.chirality);
        !e.chirality || "R" === e.chirality.v ? d("#" + this.id + "_chiral_r").prop("checked", !0).button("refresh") : !e.chirality || "S" === e.chirality.v ? d("#" + this.id + "_chiral_s").prop("checked", !0).button("refresh") : (!e.chirality || "A" === e.chirality.v) && d("#" + this.id + "_chiral_a").prop("checked", !0).button("refresh");
        d("#" + this.id + "_chirality_not").prop("checked", void 0 !== e.chirality && e.chirality.not)
    };
    k.setup = function() {
        var i = [];
        i.push('\x3cdiv style\x3d"font-size:12px;text-align:center;height:300px;overflow-y:scroll;" id\x3d"');
        i.push(this.id);
        i.push('" title\x3d"');
        i.push(this.title);
        i.push('"\x3e');
        i.push("\x3cp\x3eSet the following form to define the atom query.\x3c/p\x3e");
        i.push("\x3ctable\x3e");
        i.push(j(this.id + "_elements", "Identity", void 0, "Select any number of elements and/or wildcards.", '\x3ccanvas class\x3d"ChemDoodleWebComponent" id\x3d"' +
            this.id + '_pt"\x3e\x3c/canvas\x3e\x3cbr\x3e\x3cinput type\x3d"checkbox" id\x3d"' + this.id + '_el_any"\x3eAny (a)\x3cinput type\x3d"checkbox" id\x3d"' + this.id + '_el_noth"\x3e!Hydrogen (r)\x3cinput type\x3d"checkbox" id\x3d"' + this.id + '_el_het"\x3eHeteroatom (q)\x3cbr\x3e\x3cinput type\x3d"checkbox" id\x3d"' + this.id + '_el_hal"\x3eHalide (x)\x3cinput type\x3d"checkbox" id\x3d"' + this.id + '_el_met"\x3eMetal (m)'));
        i.push('\x3ctr\x3e\x3ctd colspan\x3d"4"\x3e\x3chr style\x3d"width:100%"\x3e\x3c/td\x3e\x3c/tr\x3e');
        i.push(j(this.id + "_aromatic", "Aromatic", "A", "Specifies that the matched atom should be aromatic. Use the NOT modifier to specify not aromatic or anti-aromatic."));
        i.push(j(this.id + "_charge", "Charge", "C", "Defines the allowed charge for the matched atom.", 1));
        i.push(j(this.id + "_hydrogens", "Hydrogens", "H", "Defines the total number of hydrogens attached to the atom, implicit and explicit.", 1));
        i.push(j(this.id + "_ringCount", "Ring Count", "R", "Defines the total number of rings this atom is a member of. (SSSR)",
            1));
        i.push(j(this.id + "_saturation", "Saturation", "S", "Specifies that the matched atom should be saturated. Use the NOT modifier to specify unsaturation."));
        i.push(j(this.id + "_connectivity", "Connectivity", "X", "Defines the total number of bonds connected to the atom, including all hydrogens.", 1));
        i.push(j(this.id + "_connectivityNoH", "Connectivity (No H)", "x", "Defines the total number of bonds connected to the atom, excluding all hydrogens.", 1));
        i.push(j(this.id + "_chirality", "Chirality", "@", "Defines the stereochemical configuration of the atom.",
            '\x3cdiv id\x3d"' + this.id + '_radio"\x3e\x3cinput type\x3d"radio" id\x3d"' + this.id + '_chiral_a" name\x3d"radio"\x3e\x3clabel for\x3d"' + this.id + '_chiral_a"\x3eAny (A)\x3c/label\x3e\x3cinput type\x3d"radio" id\x3d"' + this.id + '_chiral_r" name\x3d"radio"\x3e\x3clabel for\x3d"' + this.id + '_chiral_r"\x3eRectus (R)\x3c/label\x3e\x3cinput type\x3d"radio" id\x3d"' + this.id + '_chiral_s" name\x3d"radio"\x3e\x3clabel for\x3d"' + this.id + '_chiral_s"\x3eSinestra (S)\x3c/label\x3e\x3c/div\x3e'));
        i.push("\x3c/table\x3e");
        i.push("\x3c/div\x3e");
        e.getElementById(this.id) ? d("#" + this.id).before(i.join("")) : e.writeln(i.join(""));
        this.periodicTable = new a.PeriodicTableCanvas(this.id + "_pt", 16);
        this.periodicTable.allowMultipleSelections = !0;
        this.periodicTable.drawCell = function(a, d, e) {
            this.hovered === e ? (a.fillStyle = "blue", a.fillRect(e.x, e.y, e.dimension, e.dimension)) : e.selected && (a.fillStyle = "#c10000", a.fillRect(e.x, e.y, e.dimension, e.dimension));
            a.strokeStyle = "black";
            a.strokeRect(e.x, e.y, e.dimension, e.dimension);
            a.font = "10px Sans-serif";
            a.fillStyle = "black";
            a.textAlign = "center";
            a.textBaseline = "middle";
            a.fillText(e.element.symbol, e.x + e.dimension / 2, e.y + e.dimension / 2)
        };
        this.periodicTable.repaint();
        var k = this;
        d("#" + this.id + "_radio").buttonset();
        k = this;
        this.getElement().dialog({
            autoOpen: !1,
            width: 500,
            height: 300,
            buttons: {
                Cancel: function() {
                    d(this).dialog("close")
                },
                Remove: function() {
                    k.sketcher.historyManager.pushUndo(new l.ChangeQueryAction(k.a));
                    d(this).dialog("close")
                },
                Set: function() {
                    var a = new g.Query(g.Query.TYPE_ATOM);
                    d("#" + k.id + "_el_any").is(":checked") &&
                        a.elements.v.push("a");
                    d("#" + k.id + "_el_noth").is(":checked") && a.elements.v.push("r");
                    d("#" + k.id + "_el_het").is(":checked") && a.elements.v.push("q");
                    d("#" + k.id + "_el_hal").is(":checked") && a.elements.v.push("x");
                    d("#" + k.id + "_el_met").is(":checked") && a.elements.v.push("m");
                    for (var e = 0, i = k.periodicTable.cells.length; e < i; e++) k.periodicTable.cells[e].selected && a.elements.v.push(k.periodicTable.cells[e].element.symbol);
                    d("#" + k.id + "_elements_not").is(":checked") && (a.elements.not = !0);
                    d("#" + k.id + "_aromatic_include").is(":checked") &&
                        (a.aromatic = {
                            v: !0,
                            not: d("#" + k.id + "_aromatic_not").is(":checked")
                        });
                    d("#" + k.id + "_charge_include").is(":checked") && (a.charge = {
                        v: a.parseRange(d("#" + k.id + "_charge_value").val()),
                        not: d("#" + k.id + "_charge_not").is(":checked")
                    });
                    d("#" + k.id + "_hydrogens_include").is(":checked") && (a.hydrogens = {
                        v: a.parseRange(d("#" + k.id + "_hydrogens_value").val()),
                        not: d("#" + k.id + "_hydrogens_not").is(":checked")
                    });
                    d("#" + k.id + "_ringCount_include").is(":checked") && (a.ringCount = {
                        v: a.parseRange(d("#" + k.id + "_ringCount_value").val()),
                        not: d("#" + k.id + "_ringCount_not").is(":checked")
                    });
                    d("#" + k.id + "_saturation_include").is(":checked") && (a.saturation = {
                        v: !0,
                        not: d("#" + k.id + "_saturation_not").is(":checked")
                    });
                    d("#" + k.id + "_connectivity_include").is(":checked") && (a.connectivity = {
                        v: a.parseRange(d("#" + k.id + "_connectivity_value").val()),
                        not: d("#" + k.id + "_connectivity_not").is(":checked")
                    });
                    d("#" + k.id + "_connectivityNoH_include").is(":checked") && (a.connectivityNoH = {
                        v: a.parseRange(d("#" + k.id + "_connectivityNoH_value").val()),
                        not: d("#" + k.id + "_connectivityNoH_not").is(":checked")
                    });
                    d("#" + k.id + "_chirality_include").is(":checked") && (e = "R", d("#" + k.id + "_chiral_a").is(":checked") ? e = "A" : d("#" + k.id + "_chiral_s").is(":checked") && (e = "S"), a.chirality = {
                        v: e,
                        not: d("#" + k.id + "_chirity_not").is(":checked")
                    });
                    k.sketcher.historyManager.pushUndo(new l.ChangeQueryAction(k.a, a));
                    d(this).dialog("close")
                }
            },
            open: function() {
                d("#" + k.id).animate({
                    scrollTop: 0
                }, "fast")
            }
        })
    }
})(ChemDoodle, ChemDoodle.structures, ChemDoodle.uis.actions, ChemDoodle.uis.gui.desktop, ChemDoodle.lib.jQuery, document);
(function(a, g, l, k, d, e, j) {
    var i = function(a, d, e, g, c) {
        var i = ["\x3ctr\x3e"];
        i.push("\x3ctd\x3e"); - 1 === a.indexOf("_orders") && (i.push('\x3cinput type\x3d"checkbox" id\x3d"'), i.push(a), i.push('_include"\x3e'));
        i.push("\x3c/td\x3e");
        i.push("\x3ctd\x3e");
        i.push(d);
        e && (i.push("\x3cbr\x3e(\x3cstrong\x3e"), i.push(e), i.push("\x3c/strong\x3e)"));
        i.push("\x3c/td\x3e");
        i.push('\x3ctd style\x3d"padding-left:20px;padding-right:20px;"\x3e');
        i.push(g);
        c && (1 === c ? (i.push("\x3cbr\x3e"), i.push('\x3cinput type\x3d"text" id\x3d"'),
            i.push(a), i.push('_value"\x3e')) : i.push(c));
        i.push("\x3c/td\x3e");
        i.push('\x3ctd\x3e\x3cinput type\x3d"checkbox" id\x3d"');
        i.push(a);
        i.push('_not"\x3e\x3cbr\x3e\x3cstrong\x3eNOT\x3c/strong\x3e');
        i.push("\x3c/td\x3e");
        i.push("\x3c/tr\x3e");
        return i.join("")
    };
    k.BondQueryDialog = function(a, d) {
        this.sketcher = a;
        this.id = a.id + d
    };
    a = k.BondQueryDialog.prototype = new k.Dialog;
    a.title = "Bond Query";
    a.setBond = function(a) {
        this.b = a;
        var d = a.query;
        if (!d) switch (d = new g.Query(g.Query.TYPE_BOND), a.bondOrder) {
            case 0:
                d.orders.v.push("0");
                break;
            case 0.5:
                d.orders.v.push("h");
                break;
            case 1:
                d.orders.v.push("1");
                break;
            case 1.5:
                d.orders.v.push("r");
                break;
            case 2:
                d.orders.v.push("2");
                break;
            case 3:
                d.orders.v.push("3")
        }
        e("#" + this.id + "_type_0").prop("checked", -1 !== d.orders.v.indexOf("0")).button("refresh");
        e("#" + this.id + "_type_1").prop("checked", -1 !== d.orders.v.indexOf("1")).button("refresh");
        e("#" + this.id + "_type_2").prop("checked", -1 !== d.orders.v.indexOf("2")).button("refresh");
        e("#" + this.id + "_type_3").prop("checked", -1 !== d.orders.v.indexOf("3")).button("refresh");
        e("#" + this.id + "_type_4").prop("checked", -1 !== d.orders.v.indexOf("4")).button("refresh");
        e("#" + this.id + "_type_5").prop("checked", -1 !== d.orders.v.indexOf("5")).button("refresh");
        e("#" + this.id + "_type_6").prop("checked", -1 !== d.orders.v.indexOf("6")).button("refresh");
        e("#" + this.id + "_type_h").prop("checked", -1 !== d.orders.v.indexOf("h")).button("refresh");
        e("#" + this.id + "_type_r").prop("checked", -1 !== d.orders.v.indexOf("r")).button("refresh");
        e("#" + this.id + "_type_a").prop("checked", -1 !== d.orders.v.indexOf("a")).button("refresh");
        e("#" + this.id + "_orders_not").prop("checked", d.orders.not);
        e("#" + this.id + "_aromatic_include").prop("checked", void 0 !== d.aromatic);
        e("#" + this.id + "_aromatic_not").prop("checked", void 0 !== d.aromatic && d.aromatic.not);
        e("#" + this.id + "_ringCount_include").prop("checked", void 0 !== d.ringCount);
        e("#" + this.id + "_ringCount_value").val(d.ringCount ? d.outputRange(d.ringCount.v) : "");
        e("#" + this.id + "_ringCount_not").prop("checked", void 0 !== d.ringCount && d.ringCount.not);
        e("#" + this.id + "_stereo_include").prop("checked",
            void 0 !== d.stereo);
        !d.stereo || "E" === d.stereo.v ? e("#" + this.id + "_stereo_e").prop("checked", !0).button("refresh") : !d.stereo || "Z" === d.stereo.v ? e("#" + this.id + "_stereo_z").prop("checked", !0).button("refresh") : (!d.stereo || "A" === d.stereo.v) && e("#" + this.id + "_stereo_a").prop("checked", !0).button("refresh");
        e("#" + this.id + "_stereo_not").prop("checked", void 0 !== d.stereo && d.stereo.not)
    };
    a.setup = function() {
        var a = [];
        a.push('\x3cdiv style\x3d"font-size:12px;text-align:center;height:300px;overflow-y:scroll;" id\x3d"');
        a.push(this.id);
        a.push('" title\x3d"');
        a.push(this.title);
        a.push('"\x3e');
        a.push("\x3cp\x3eSet the following form to define the bond query.\x3c/p\x3e");
        a.push("\x3ctable\x3e");
        a.push(i(this.id + "_orders", "Identity", void 0, "Select any number of bond types.", '\x3cdiv id\x3d"' + this.id + '_radioTypes"\x3e\x3cinput type\x3d"checkbox" id\x3d"' + this.id + '_type_0"\x3e\x3clabel for\x3d"' + this.id + '_type_0"\x3e\x3cimg width\x3d"20" height\x3d"20" src\x3d"' + d.getURI(d.BOND_ZERO) + '" /\x3e\x3c/label\x3e\x3cinput type\x3d"checkbox" id\x3d"' +
            this.id + '_type_1"\x3e\x3clabel for\x3d"' + this.id + '_type_1"\x3e\x3cimg width\x3d"20" height\x3d"20" src\x3d"' + d.getURI(d.BOND_SINGLE) + '" /\x3e\x3c/label\x3e\x3cinput type\x3d"checkbox" id\x3d"' + this.id + '_type_2"\x3e\x3clabel for\x3d"' + this.id + '_type_2"\x3e\x3cimg width\x3d"20" height\x3d"20" src\x3d"' + d.getURI(d.BOND_DOUBLE) + '" /\x3e\x3c/label\x3e\x3cinput type\x3d"checkbox" id\x3d"' + this.id + '_type_3"\x3e\x3clabel for\x3d"' + this.id + '_type_3"\x3e\x3cimg width\x3d"20" height\x3d"20" src\x3d"' + d.getURI(d.BOND_TRIPLE) +
            '" /\x3e\x3c/label\x3e\x3cinput type\x3d"checkbox" id\x3d"' + this.id + '_type_4"\x3e\x3clabel for\x3d"' + this.id + '_type_4"\x3e\x3cimg width\x3d"20" height\x3d"20" src\x3d"' + d.getURI(d.BOND_QUADRUPLE) + '" /\x3e\x3c/label\x3e\x3cinput type\x3d"checkbox" id\x3d"' + this.id + '_type_5"\x3e\x3clabel for\x3d"' + this.id + '_type_5"\x3e\x3cimg width\x3d"20" height\x3d"20" src\x3d"' + d.getURI(d.BOND_QUINTUPLE) + '" /\x3e\x3c/label\x3e\x3cinput type\x3d"checkbox" id\x3d"' + this.id + '_type_6"\x3e\x3clabel for\x3d"' + this.id +
            '_type_6"\x3e\x3cimg width\x3d"20" height\x3d"20" src\x3d"' + d.getURI(d.BOND_SEXTUPLE) + '" /\x3e\x3c/label\x3e\x3cinput type\x3d"checkbox" id\x3d"' + this.id + '_type_h"\x3e\x3clabel for\x3d"' + this.id + '_type_h"\x3e\x3cimg width\x3d"20" height\x3d"20" src\x3d"' + d.getURI(d.BOND_HALF) + '" /\x3e\x3c/label\x3e\x3cinput type\x3d"checkbox" id\x3d"' + this.id + '_type_r"\x3e\x3clabel for\x3d"' + this.id + '_type_r"\x3e\x3cimg width\x3d"20" height\x3d"20" src\x3d"' + d.getURI(d.BOND_RESONANCE) + '" /\x3e\x3c/label\x3e\x3cinput type\x3d"checkbox" id\x3d"' +
            this.id + '_type_a"\x3e\x3clabel for\x3d"' + this.id + '_type_a"\x3e\x3cimg width\x3d"20" height\x3d"20" src\x3d"' + d.getURI(d.BOND_ANY) + '" /\x3e\x3c/label\x3e\x3c/div\x3e'));
        a.push('\x3ctr\x3e\x3ctd colspan\x3d"4"\x3e\x3chr style\x3d"width:100%"\x3e\x3c/td\x3e\x3c/tr\x3e');
        a.push(i(this.id + "_aromatic", "Aromatic", "A", "Specifies that the matched bond should be aromatic. Use the NOT modifier to specify not aromatic or anti-aromatic."));
        a.push(i(this.id + "_ringCount", "Ring Count", "R", "Defines the total number of rings this bond is a member of. (SSSR)",
            1));
        a.push(i(this.id + "_stereo", "Stereochemistry", "@", "Defines the stereochemical configuration of the bond.", '\x3cdiv id\x3d"' + this.id + '_radio"\x3e\x3cinput type\x3d"radio" id\x3d"' + this.id + '_stereo_a" name\x3d"radio"\x3e\x3clabel for\x3d"' + this.id + '_stereo_a"\x3eAny (A)\x3c/label\x3e\x3cinput type\x3d"radio" id\x3d"' + this.id + '_stereo_e" name\x3d"radio"\x3e\x3clabel for\x3d"' + this.id + '_stereo_e"\x3eEntgegen (E)\x3c/label\x3e\x3cinput type\x3d"radio" id\x3d"' + this.id + '_stereo_z" name\x3d"radio"\x3e\x3clabel for\x3d"' +
            this.id + '_stereo_z"\x3eZusammen (Z)\x3c/label\x3e\x3c/div\x3e'));
        a.push("\x3c/table\x3e");
        a.push("\x3c/div\x3e");
        j.getElementById(this.id) ? e("#" + this.id).before(a.join("")) : j.writeln(a.join(""));
        var h = this;
        e("#" + this.id + "_radioTypes").buttonset();
        e("#" + this.id + "_radio").buttonset();
        this.getElement().dialog({
            autoOpen: !1,
            width: 520,
            height: 300,
            buttons: {
                Cancel: function() {
                    e(this).dialog("close")
                },
                Remove: function() {
                    h.sketcher.historyManager.pushUndo(new l.ChangeQueryAction(h.b));
                    e(this).dialog("close")
                },
                Set: function() {
                    var a = new g.Query(g.Query.TYPE_BOND);
                    e("#" + h.id + "_type_0").is(":checked") && a.orders.v.push("0");
                    e("#" + h.id + "_type_1").is(":checked") && a.orders.v.push("1");
                    e("#" + h.id + "_type_2").is(":checked") && a.orders.v.push("2");
                    e("#" + h.id + "_type_3").is(":checked") && a.orders.v.push("3");
                    e("#" + h.id + "_type_4").is(":checked") && a.orders.v.push("4");
                    e("#" + h.id + "_type_5").is(":checked") && a.orders.v.push("5");
                    e("#" + h.id + "_type_6").is(":checked") && a.orders.v.push("6");
                    e("#" + h.id + "_type_h").is(":checked") &&
                        a.orders.v.push("h");
                    e("#" + h.id + "_type_r").is(":checked") && a.orders.v.push("r");
                    e("#" + h.id + "_type_a").is(":checked") && a.orders.v.push("a");
                    e("#" + h.id + "_orders_not").is(":checked") && (a.orders.not = !0);
                    e("#" + h.id + "_aromatic_include").is(":checked") && (a.aromatic = {
                        v: !0,
                        not: e("#" + h.id + "_aromatic_not").is(":checked")
                    });
                    e("#" + h.id + "_ringCount_include").is(":checked") && (a.ringCount = {
                        v: a.parseRange(e("#" + h.id + "_ringCount_value").val()),
                        not: e("#" + h.id + "_ringCount_not").is(":checked")
                    });
                    if (e("#" + h.id + "_stereo_include").is(":checked")) {
                        var d =
                            "E";
                        e("#" + h.id + "_stereo_a").is(":checked") ? d = "A" : e("#" + h.id + "_stereo_z").is(":checked") && (d = "Z");
                        a.stereo = {
                            v: d,
                            not: e("#" + h.id + "_stereo_not").is(":checked")
                        }
                    }
                    h.sketcher.historyManager.pushUndo(new l.ChangeQueryAction(h.b, a));
                    e(this).dialog("close")
                }
            },
            open: function() {
                e("#" + h.id).animate({
                    scrollTop: 0
                }, "fast")
            }
        })
    }
})(ChemDoodle, ChemDoodle.structures, ChemDoodle.uis.actions, ChemDoodle.uis.gui.desktop, ChemDoodle.uis.gui.imageDepot, ChemDoodle.lib.jQuery, document);
(function(a, g, l, k) {
    g.MolGrabberDialog = function(a, e) {
        this.sketcherid = a;
        this.id = a + e
    };
    g = g.MolGrabberDialog.prototype = new g.Dialog;
    g.title = "MolGrabber";
    g.setup = function() {
        var d = [];
        d.push('\x3cdiv style\x3d"font-size:12px;text-align:center;" id\x3d"');
        d.push(this.id);
        d.push('" title\x3d"');
        d.push(this.title);
        d.push('"\x3e');
        this.message && (d.push("\x3cp\x3e"), d.push(this.message), d.push("\x3c/p\x3e"));
        d.push('\x3ccanvas class\x3d"ChemDoodleWebComponent" id\x3d"');
        d.push(this.id);
        d.push('_mg"\x3e\x3c/canvas\x3e');
        this.afterMessage && (d.push("\x3cp\x3e"), d.push(this.afterMessage), d.push("\x3c/p\x3e"));
        d.push("\x3c/div\x3e");
        k.getElementById(this.sketcherid) ? l("#" + this.sketcherid).before(d.join("")) : k.writeln(d.join(""));
        this.canvas = new a.MolGrabberCanvas(this.id + "_mg", 200, 200);
        this.canvas.specs.backgroundColor = "#fff";
        this.canvas.repaint();
        this.getElement().dialog({
            autoOpen: !1,
            width: 250,
            buttons: this.buttons
        })
    }
})(ChemDoodle, ChemDoodle.uis.gui.desktop, ChemDoodle.lib.jQuery, document);
(function(a, g, l, k) {
    g.PeriodicTableDialog = function(a, e) {
        this.sketcherid = a;
        this.id = a + e
    };
    a = g.PeriodicTableDialog.prototype = new g.Dialog;
    a.title = "Periodic Table";
    a.setup = function() {
        var a = [];
        a.push('\x3cdiv style\x3d"text-align:center;" id\x3d"');
        a.push(this.id);
        a.push('" title\x3d"');
        a.push(this.title);
        a.push('"\x3e');
        a.push('\x3ccanvas class\x3d"ChemDoodleWebComponents" id\x3d"');
        a.push(this.id);
        a.push('_pt"\x3e\x3c/canvas\x3e\x3c/div\x3e');
        k.getElementById(this.sketcherid) ? l("#" + this.sketcherid).before(a.join("")) :
            k.writeln(a.join(""));
        this.canvas = new ChemDoodle.PeriodicTableCanvas(this.id + "_pt", 20);
        this.getElement().dialog({
            autoOpen: !1,
            width: 400,
            buttons: this.buttons
        })
    }
})(ChemDoodle, ChemDoodle.uis.gui.desktop, ChemDoodle.lib.jQuery, document);
(function(a, g, l, k) {
    g.SaveFileDialog = function(a, e) {
        this.id = a;
        this.sketcher = e
    };
    a = g.SaveFileDialog.prototype = new g.Dialog;
    a.title = "Save File";
    a.clear = function() {
        l("#" + this.id + "_link").html("The file link will appear here.")
    };
    a.setup = function() {
        var a = [];
        a.push('\x3cdiv style\x3d"font-size:12px;" id\x3d"');
        a.push(this.id);
        a.push('" title\x3d"');
        a.push(this.title);
        a.push('"\x3e');
        a.push("\x3cp\x3eSelect the file format to save your structure to and click on the \x3cstrong\x3eGenerate File\x3c/strong\x3e button.\x3c/p\x3e");
        a.push('\x3cselect id\x3d"');
        a.push(this.id);
        a.push('_select"\x3e');
        a.push('\x3coption value\x3d"sk2"\x3eACD/ChemSketch Document {sk2}');
        a.push('\x3coption value\x3d"ros"\x3eBeilstein ROSDAL {ros}');
        a.push('\x3coption value\x3d"cdx"\x3eCambridgesoft ChemDraw Exchange {cdx}');
        a.push('\x3coption value\x3d"cdxml"\x3eCambridgesoft ChemDraw XML {cdxml}');
        a.push('\x3coption value\x3d"mrv"\x3eChemAxon Marvin Document {mrv}');
        a.push('\x3coption value\x3d"cml"\x3eChemical Markup Language {cml}');
        a.push('\x3coption value\x3d"smiles"\x3eDaylight SMILES {smiles}');
        a.push('\x3coption value\x3d"icl" selected\x3eiChemLabs ChemDoodle Document {icl}');
        a.push('\x3coption value\x3d"inchi"\x3eIUPAC InChI {inchi}');
        a.push('\x3coption value\x3d"jdx"\x3eIUPAC JCAMP-DX {jdx}');
        a.push('\x3coption value\x3d"skc"\x3eMDL ISIS Sketch {skc}');
        a.push('\x3coption value\x3d"tgf"\x3eMDL ISIS Sketch Transportable Graphics File {tgf}');
        a.push('\x3coption value\x3d"mol"\x3eMDL MOLFile {mol}');
        a.push('\x3coption value\x3d"sdf"\x3eMDL SDFile {sdf}');
        a.push('\x3coption value\x3d"jme"\x3eMolinspiration JME String {jme}');
        a.push('\x3coption value\x3d"pdb"\x3eRCSB Protein Data Bank {pdb}');
        a.push('\x3coption value\x3d"mmd"\x3eSchr\x26ouml;dinger Macromodel {mmd}');
        a.push('\x3coption value\x3d"mae"\x3eSchr\x26ouml;dinger Maestro {mae}');
        a.push('\x3coption value\x3d"smd"\x3eStandard Molecular Data {smd}');
        a.push('\x3coption value\x3d"mol2"\x3eTripos Mol2 {mol2}');
        a.push('\x3coption value\x3d"sln"\x3eTripos SYBYL SLN {sln}');
        a.push('\x3coption value\x3d"xyz"\x3eXYZ {xyz}');
        a.push("\x3c/select\x3e");
        a.push('\x3cbutton id\x3d"');
        a.push(this.id);
        a.push('_button"\x3e');
        a.push("Generate File\x3c/button\x3e");
        a.push("\x3cp\x3eWhen the file is written, a link will appear in the red-bordered box below, right-click on the link and choose the browser's \x3cstrong\x3eSave As...\x3c/strong\x3e function to save the file to your computer.\x3c/p\x3e");
        a.push('\x3cdiv style\x3d"width:100%;height:30px;border:1px solid #c10000;text-align:center;" id\x3d"');
        a.push(this.id);
        a.push('_link"\x3eThe file link will appear here.\x3c/div\x3e');
        a.push('\x3cp\x3e\x3ca href\x3d"http://www.chemdoodle.com" target\x3d"_blank"\x3eHow do I use these files?\x3c/a\x3e\x3c/p\x3e');
        a.push("\x3c/div\x3e");
        k.getElementById(this.sketcher.id) ? l("#" + this.sketcher.id).before(a.join("")) : k.writeln(a.join(""));
        var e = this;
        l("#" + this.id + "_button").click(function() {
            l("#" + e.id + "_link").html("Generating file, please wait...");
            ChemDoodle.iChemLabs.saveFile(e.sketcher.oneMolecule ? e.sketcher.molecules[0] : e.sketcher.lasso.getFirstMolecule(), {
                ext: l("#" + e.id + "_select").val()
            }, function(a) {
                l("#" + e.id + "_link").html('\x3ca href\x3d"' + a + '"\x3e\x3cspan style\x3d"text-decoration:underline;"\x3eFile is generated. Right-click on this link and Save As...\x3c/span\x3e\x3c/a\x3e')
            })
        });
        this.getElement().dialog({
            autoOpen: !1,
            width: 435,
            buttons: e.buttons
        })
    }
})(ChemDoodle, ChemDoodle.uis.gui.desktop, ChemDoodle.lib.jQuery, document);
(function(a, g, l, k, d) {
    l.DialogManager = function(e) {
        e.useServices ? this.saveDialog = new k.SaveFileDialog(e.id + "_save_dialog", e) : (this.saveDialog = new k.Dialog(e.id, "_save_dialog", "Save Molecule"), this.saveDialog.message = "Copy and paste the content of the textarea into a file and save it with the extension \x3cstrong\x3e.mol\x3c/strong\x3e.", this.saveDialog.includeTextArea = !0, this.saveDialog.afterMessage = '\x3ca href\x3d"http://www.chemdoodle.com" target\x3d"_blank"\x3eHow do I use MOLFiles?\x3c/a\x3e');
        this.saveDialog.setup();
        this.loadDialog = new k.Dialog(e.id, "_load_dialog", "Load Molecule");
        var j = ["Copy and paste the contents of a MOLFile (\x3cstrong\x3e.mol\x3c/strong\x3e)"];
        j.push(" or ChemDoodle JSON in the textarea below and then press the \x3cstrong\x3eLoad\x3c/strong\x3e button.");
        this.loadDialog.message = j.join("");
        this.loadDialog.includeTextArea = !0;
        this.loadDialog.afterMessage = '\x3ca href\x3d"http://www.chemdoodle.com" target\x3d"_blank"\x3eWhere do I get MOLFiles or ChemDoodle JSON?\x3c/a\x3e';
        var i = this;
        this.loadDialog.buttons = {
            Load: function() {
                d(this).dialog("close");
                var j = i.loadDialog.getTextArea().val(),
                    h; - 1 !== j.indexOf("v2000") || -1 !== j.indexOf("V2000") ? h = {
                    molecules: [a.readMOL(j)],
                    shapes: []
                } : "{" == j.charAt(0) && (h = new a.readJSON(j));
                e.oneMolecule && h && 0 < h.molecules.length && 0 < h.molecules[0].atoms.length ? e.historyManager.pushUndo(new g.SwitchMoleculeAction(e, h.molecules[0])) : !e.oneMolecule && h && (0 < h.molecules.length || 0 < h.shapes.length) ? e.historyManager.pushUndo(new g.SwitchContentAction(e,
                    h.molecules, h.shapes)) : alert("No chemical content was recognized.")
            }
        };
        this.loadDialog.setup();
        this.atomQueryDialog = new k.AtomQueryDialog(e, "_atom_query_dialog");
        this.atomQueryDialog.setup();
        this.bondQueryDialog = new k.BondQueryDialog(e, "_bond_query_dialog");
        this.bondQueryDialog.setup();
        this.searchDialog = new k.MolGrabberDialog(e.id, "_search_dialog");
        this.searchDialog.buttons = {
            Load: function() {
                d(this).dialog("close");
                var a = i.searchDialog.canvas.molecules[0];
                a && 0 < a.atoms.length && (e.oneMolecule ? a !== e.molecule &&
                    e.historyManager.pushUndo(new g.SwitchMoleculeAction(e, a)) : (e.historyManager.pushUndo(new g.NewMoleculeAction(e, a.atoms, a.bonds)), e.toolbarManager.buttonLasso.getElement().click(), e.lasso.select(a.atoms, [])))
            }
        };
        this.searchDialog.setup();
        e.setupScene && (this.specsDialog = new k.SpecsDialog(e, "_specs_dialog"), this.specsDialog.buttons = {
            Done: function() {
                d(this).dialog("close")
            }
        }, this.specsDialog.setup(this.specsDialog, e));
        this.periodicTableDialog = new k.PeriodicTableDialog(e.id, "_periodicTable_dialog");
        this.periodicTableDialog.buttons = {
            Close: function() {
                d(this).dialog("close")
            }
        };
        this.periodicTableDialog.setup();
        this.periodicTableDialog.canvas.click = function() {
            if (this.hovered) {
                this.selected = this.hovered;
                var a = this.getHoveredElement();
                e.stateManager.setState(e.stateManager.STATE_LABEL);
                e.stateManager.STATE_LABEL.label = a.symbol;
                e.toolbarManager.buttonLabel.select();
                this.repaint()
            }
        };
        this.calculateDialog = new k.Dialog(e.id, "_calculate_dialog", "Calculations");
        this.calculateDialog.includeTextArea = !0;
        this.calculateDialog.afterMessage = '\x3ca href\x3d"http://www.chemdoodle.com" target\x3d"_blank"\x3eWant more calculations?\x3c/a\x3e';
        this.calculateDialog.setup();
        this.inputDialog = new k.Dialog(e.id, "_input_dialog", "Input");
        this.inputDialog.message = 'Please input the rgroup number (must be a positive integer). Input "-1" to remove the rgroup.';
        this.inputDialog.includeTextField = !0;
        this.inputDialog.buttons = {
            Done: function() {
                d(this).dialog("close");
                i.inputDialog.doneFunction && i.inputDialog.doneFunction(i.inputDialog.getTextField().val())
            }
        };
        this.inputDialog.setup()
    }
})(ChemDoodle, ChemDoodle.uis.actions, ChemDoodle.uis.gui, ChemDoodle.uis.gui.desktop,
    ChemDoodle.lib.jQuery);
(function(a, g, l, k) {
    a.DropDown = function(d, g, i) {
        this.id = d;
        this.tooltip = g;
        this.dummy = i;
        this.buttonSet = new a.ButtonSet(d + "_set");
        this.buttonSet.buttonGroup = g;
        this.defaultButton = void 0
    };
    var d = a.DropDown.prototype;
    d.getButtonSource = function() {
        var a = [];
        a.push('\x3cbutton id\x3d"');
        a.push(this.id);
        a.push('" onclick\x3d"return false;" title\x3d"');
        a.push(this.tooltip);
        a.push('"\x3e\x3cimg title\x3d"');
        a.push(this.tooltip);
        a.push('" width\x3d"9" height\x3d"20" src\x3d"');
        a.push(g.getURI(g.ARROW_DOWN));
        a.push('"\x3e\x3c/button\x3e');
        return a.join("")
    };
    d.getHiddenSource = function() {
        var a = [];
        a.push('\x3cdiv style\x3d"display:none;position:absolute;z-index:10;border:1px #C1C1C1 solid;background:#F5F5F5;padding:5px;border-bottom-left-radius:5px;-moz-border-radius-bottomleft:5px;border-bottom-right-radius:5px;-moz-border-radius-bottomright:5px;" id\x3d"');
        a.push(this.id);
        a.push('_hidden"\x3e');
        a.push(this.buttonSet.getSource(this.id + "_popup_set"));
        a.push("\x3c/div\x3e");
        return a.join("")
    };
    d.setup = function() {
        this.defaultButton || (this.defaultButton =
            this.buttonSet.buttons[0]);
        var a = "#" + this.id;
        l(a).button();
        l(a + "_hidden").hide();
        l(a).click(function() {
            l(k).trigger("click");
            var d = l(a + "_hidden");
            d.show().position({
                my: "center top",
                at: "center bottom",
                of: this,
                collision: "fit"
            });
            l(k).one("click", function() {
                d.hide()
            });
            return !1
        });
        this.buttonSet.setup();
        var d = this;
        l.each(this.buttonSet.buttons, function(a) {
            d.buttonSet.buttons[a].getElement().click(function() {
                d.dummy.absorb(d.buttonSet.buttons[a]);
                d.dummy.select();
                d.dummy.func()
            })
        });
        d.dummy.absorb(this.defaultButton);
        this.defaultButton.select()
    }
})(ChemDoodle.uis.gui.desktop, ChemDoodle.uis.gui.imageDepot, ChemDoodle.lib.jQuery, document);
(function(a, g, l) {
    a.DummyButton = function(a, d, e) {
        this.id = a;
        this.icon = d;
        this.toggle = !1;
        this.tooltip = e ? e : "";
        this.func = void 0
    };
    a = a.DummyButton.prototype = new a.Button;
    a.setup = function() {
        var a = this;
        this.getElement().click(function() {
            a.func()
        })
    };
    a.absorb = function(a) {
        l("#" + this.id + "_icon").attr("src", g.getURI(a.icon));
        this.func = a.func
    }
})(ChemDoodle.uis.gui.desktop, ChemDoodle.uis.gui.imageDepot, ChemDoodle.lib.jQuery);
(function(a) {
    a.TextButton = function(a, l, k) {
        this.id = a;
        this.toggle = !1;
        this.tooltip = l ? l : "";
        this.func = k ? k : void 0
    };
    a = a.TextButton.prototype = new a.Button;
    a.getSource = function(a) {
        var l = [];
        this.toggle ? (l.push('\x3cinput type\x3d"radio" name\x3d"'), l.push(a), l.push('" id\x3d"'), l.push(this.id), l.push('" title\x3d"'), l.push(this.tooltip), l.push('" /\x3e\x3clabel for\x3d"'), l.push(this.id), l.push('"\x3e'), l.push(this.tooltip), l.push("\x3c/label\x3e")) : (l.push('\x3cbutton id\x3d"'), l.push(this.id), l.push('" onclick\x3d"return false;" title\x3d"'),
            l.push(this.tooltip), l.push('"\x3e\x3clabel for\x3d"'), l.push(this.id), l.push('"\x3e'), l.push(this.tooltip), l.push("\x3c/label\x3e\x3c/button\x3e"));
        return l.join("")
    };
    a.check = function() {
        var a = this.getElement();
        a.prop("checked", !0);
        a.button("refresh")
    };
    a.uncheck = function() {
        var a = this.getElement();
        a.removeAttr("checked");
        a.button("refresh")
    }
})(ChemDoodle.uis.gui.desktop, ChemDoodle.lib.jQuery);
(function(a, g, l, k, d, e, j, i, p, h, n, s) {
    e.ToolbarManager = function(c) {
        this.sketcher = c;
        this.buttonOpen = new i.Button(c.id + "_button_open", j.OPEN, "Open", function() {
            c.dialogManager.loadDialog.getTextArea().val("");
            c.dialogManager.loadDialog.getElement().dialog("open")
        });
        this.buttonSave = new i.Button(c.id + "_button_save", j.SAVE, "Save", function() {
            c.useServices ? c.dialogManager.saveDialog.clear() : c.oneMolecule ? c.dialogManager.saveDialog.getTextArea().val(a.writeMOL(c.molecules[0])) : c.lasso.isActive() && c.dialogManager.saveDialog.getTextArea().val(a.writeMOL(c.lasso.getFirstMolecule()));
            c.dialogManager.saveDialog.getElement().dialog("open")
        });
        this.buttonSearch = new i.Button(c.id + "_button_search", j.SEARCH, "Search", function() {
            c.dialogManager.searchDialog.getElement().dialog("open")
        });
        this.buttonCalculate = new i.Button(c.id + "_button_calculate", j.CALCULATE, "Calculate", function() {
            var a = c.oneMolecule ? c.molecules[0] : c.lasso.getFirstMolecule();
            a && g.calculate(a, {
                descriptors: "mf ef mw miw deg_unsat hba hbd rot electron pol_miller cmr tpsa vabc xlogp2 bertz".split(" ")
            }, function(a) {
                function d(a,
                    c, h) {
                    e.push(a);
                    e.push(": ");
                    for (a = a.length + 2; 30 > a; a++) e.push(" ");
                    e.push(c);
                    e.push(" ");
                    e.push(h);
                    e.push("\n")
                }
                var e = [];
                d("Molecular Formula", a.mf, "");
                d("Empirical Formula", a.ef, "");
                d("Molecular Mass", a.mw, "amu");
                d("Monoisotopic Mass", a.miw, "amu");
                d("Degree of Unsaturation", a.deg_unsat, "");
                d("Hydrogen Bond Acceptors", a.hba, "");
                d("Hydrogen Bond Donors", a.hbd, "");
                d("Rotatable Bonds", a.rot, "");
                d("Total Electrons", a.rot, "");
                d("Molecular Polarizability", a.pol_miller, "A^3");
                d("Molar Refractivity", a.cmr,
                    "cm^3/mol");
                d("Polar Surface Area", a.tpsa, "A^2");
                d("vdW Volume", a.vabc, "A^3");
                d("logP", a.xlogp2, "");
                d("Complexity", a.bertz, "");
                c.dialogManager.calculateDialog.getTextArea().val(e.join(""));
                c.dialogManager.calculateDialog.getElement().dialog("open")
            })
        });
        this.buttonMove = new i.Button(c.id + "_button_move", j.MOVE, "Move", function() {
            c.stateManager.setState(c.stateManager.STATE_MOVE)
        });
        this.buttonMove.toggle = !0;
        this.buttonErase = new i.Button(c.id + "_button_erase", j.ERASE, "Erase", function() {
            c.stateManager.setState(c.stateManager.STATE_ERASE)
        });
        this.buttonErase.toggle = !0;
        this.buttonClear = new i.Button(c.id + "_button_clear", j.CLEAR, "Clear", function() {
            var a = !0;
            if (c.oneMolecule) {
                if (1 === c.molecules[0].atoms.length) {
                    var e = c.molecules[0].atoms[0];
                    "C" === e.label && (0 === e.charge && -1 === e.mass) && (a = !1)
                }
            } else 0 === c.molecules.length && 0 === c.shapes.length && (a = !1);
            a && (c.stateManager.getCurrentState().clearHover(), c.lasso && c.lasso.isActive() && c.lasso.empty(), c.historyManager.pushUndo(new d.ClearAction(c)))
        });
        this.buttonClean = new i.Button(c.id + "_button_clean",
            j.OPTIMIZE, "Clean",
            function() {
                var a = c.oneMolecule ? c.molecules[0] : c.lasso.getFirstMolecule();
                if (a) {
                    var e = new l.JSONInterpreter;
                    g._contactServer("optimize", {
                        mol: e.molTo(a)
                    }, {
                        dimension: 2
                    }, function(h) {
                        h = e.molFrom(h.mol);
                        var g = h.getCenter(),
                            i = c.oneMolecule ? new k.Point(c.width / 2, c.height / 2) : a.getCenter();
                        i.sub(g);
                        for (var g = 0, j = h.atoms.length; g < j; g++) h.atoms[g].add(i);
                        c.historyManager.pushUndo(new d.ChangeCoordinatesAction(a.atoms, h.atoms))
                    })
                }
            });
        this.makeLassoSet(this);
        this.makeScaleSet(this);
        this.makeHistorySet(this);
        this.makeLabelSet(this);
        this.buttonQuery = new i.Button(c.id + "_button_query", j.QUERY, "Set Query to Atom or Bond", function() {
            c.stateManager.setState(c.stateManager.STATE_QUERY)
        });
        this.buttonQuery.toggle = !0;
        this.makeBondSet(this);
        this.makeRingSet(this);
        this.makeAttributeSet(this);
        this.makeShapeSet(this)
    };
    e = e.ToolbarManager.prototype;
    e.write = function() {
        var a = ['\x3cdiv style\x3d"font-size:10px;"\x3e'],
            d = this.sketcher.id + "_main_group";
        this.sketcher.oneMolecule ? a.push(this.buttonMove.getSource(d)) : a.push(this.lassoSet.getSource(d));
        a.push(this.buttonClear.getSource());
        a.push(this.buttonErase.getSource(d));
        this.sketcher.useServices && a.push(this.buttonClean.getSource());
        a.push(this.historySet.getSource());
        a.push(this.scaleSet.getSource());
        a.push(this.buttonOpen.getSource());
        a.push(this.buttonSave.getSource());
        this.sketcher.useServices && (a.push(this.buttonSearch.getSource()), a.push(this.buttonCalculate.getSource()));
        a.push("\x3cbr\x3e");
        a.push(this.labelSet.getSource(d));
        this.sketcher.includeQuery && a.push(this.buttonQuery.getSource(d));
        a.push(this.attributeSet.getSource(d));
        a.push(this.bondSet.getSource(d));
        a.push(this.ringSet.getSource(d));
        this.sketcher.oneMolecule || a.push(this.shapeSet.getSource(d));
        a.push("\x3c/div\x3e");
        s.getElementById(this.sketcher.id) ? n("#" + this.sketcher.id).before(a.join("")) : s.write(a.join(""))
    };
    e.setup = function() {
        this.sketcher.oneMolecule ? this.buttonMove.setup(!0) : this.lassoSet.setup();
        this.buttonClear.setup();
        this.buttonErase.setup(!0);
        this.sketcher.useServices && this.buttonClean.setup();
        this.historySet.setup();
        this.scaleSet.setup();
        this.buttonOpen.setup();
        this.buttonSave.setup();
        this.sketcher.useServices && (this.buttonSearch.setup(), this.buttonCalculate.setup());
        this.labelSet.setup();
        this.sketcher.includeQuery && this.buttonQuery.setup(!0);
        this.attributeSet.setup();
        this.bondSet.setup();
        this.ringSet.setup();
        this.sketcher.oneMolecule || this.shapeSet.setup();
        this.buttonSingle.select();
        this.buttonUndo.disable();
        this.buttonRedo.disable();
        !this.sketcher.oneMolecule && this.sketcher.useServices && (this.buttonClean.disable(),
            this.buttonCalculate.disable(), this.buttonSave.disable())
    };
    e.makeScaleSet = function(a) {
        this.scaleSet = new i.ButtonSet(a.sketcher.id + "_buttons_scale");
        this.scaleSet.toggle = !1;
        this.buttonScalePlus = new i.Button(a.sketcher.id + "_button_scale_plus", j.ZOOM_IN, "Increase Scale", function() {
            a.sketcher.specs.scale *= 1.5;
            a.sketcher.checkScale();
            a.sketcher.repaint()
        });
        this.scaleSet.buttons.push(this.buttonScalePlus);
        this.buttonScaleMinus = new i.Button(a.sketcher.id + "_button_scale_minus", j.ZOOM_OUT, "Decrease Scale",
            function() {
                a.sketcher.specs.scale /= 1.5;
                a.sketcher.checkScale();
                a.sketcher.repaint()
            });
        this.scaleSet.buttons.push(this.buttonScaleMinus)
    };
    e.makeLassoSet = function(a) {
        this.lassoSet = new i.ButtonSet(a.sketcher.id + "_buttons_lasso");
        this.buttonLasso = new i.DummyButton(a.sketcher.id + "_button_lasso", j.LASSO, "Selection Tool");
        this.lassoSet.buttons.push(this.buttonLasso);
        this.lassoSet.addDropDown("More Selection Tools");
        this.lassoSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_lasso_lasso",
            j.LASSO, "Lasso Tool",
            function() {
                a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_LASSO);
                a.sketcher.lasso.mode = p.Lasso.MODE_LASSO;
                0 < a.sketcher.molecules.length && !a.sketcher.lasso.isActive() && a.sketcher.lasso.select(a.sketcher.molecules[a.sketcher.molecules.length - 1].atoms, [])
            }));
        this.lassoSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_lasso_shapes", j.LASSO_SHAPES, "Lasso Tool (shapes only)", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_LASSO);
            a.sketcher.lasso.mode = p.Lasso.MODE_LASSO_SHAPES;
            0 < a.sketcher.shapes.length && !a.sketcher.lasso.isActive() && a.sketcher.lasso.select([], [a.sketcher.shapes[a.sketcher.shapes.length - 1]])
        }));
        this.lassoSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_lasso_marquee", j.MARQUEE, "Marquee Tool", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_LASSO);
            a.sketcher.lasso.mode = p.Lasso.MODE_RECTANGLE_MARQUEE;
            0 < a.sketcher.molecules.length && !a.sketcher.lasso.isActive() &&
                a.sketcher.lasso.select(a.sketcher.molecules[a.sketcher.molecules.length - 1].atoms, [])
        }))
    };
    e.makeHistorySet = function(a) {
        this.historySet = new i.ButtonSet(a.sketcher.id + "_buttons_history");
        this.historySet.toggle = !1;
        this.buttonUndo = new i.Button(a.sketcher.id + "_button_undo", j.UNDO, "Undo", function() {
            a.sketcher.historyManager.undo()
        });
        this.historySet.buttons.push(this.buttonUndo);
        this.buttonRedo = new i.Button(a.sketcher.id + "_button_redo", j.REDO, "Redo", function() {
            a.sketcher.historyManager.redo()
        });
        this.historySet.buttons.push(this.buttonRedo)
    };
    e.makeLabelSet = function(a) {
        this.labelSet = new i.ButtonSet(a.sketcher.id + "_buttons_label");
        this.buttonLabel = new i.DummyButton(a.sketcher.id + "_button_label", j.CARBON, "Set Label");
        this.labelSet.buttons.push(this.buttonLabel);
        this.labelSet.addDropDown("More Labels");
        this.labelSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_label_h", j.HYDROGEN, "Hydrogen", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_LABEL);
            a.sketcher.stateManager.STATE_LABEL.label = "H"
        }));
        this.labelSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_label_c", j.CARBON, "Carbon", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_LABEL);
            a.sketcher.stateManager.STATE_LABEL.label = "C"
        }));
        this.labelSet.dropDown.defaultButton = this.labelSet.dropDown.buttonSet.buttons[this.labelSet.dropDown.buttonSet.buttons.length - 1];
        this.labelSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_label_n", j.NITROGEN, "Nitrogen", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_LABEL);
            a.sketcher.stateManager.STATE_LABEL.label = "N"
        }));
        this.labelSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_label_o", j.OXYGEN, "Oxygen", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_LABEL);
            a.sketcher.stateManager.STATE_LABEL.label = "O"
        }));
        this.labelSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_label_f", j.FLUORINE, "Fluorine", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_LABEL);
            a.sketcher.stateManager.STATE_LABEL.label =
                "F"
        }));
        this.labelSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_label_cl", j.CHLORINE, "Chlorine", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_LABEL);
            a.sketcher.stateManager.STATE_LABEL.label = "Cl"
        }));
        this.labelSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_label_br", j.BROMINE, "Bromine", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_LABEL);
            a.sketcher.stateManager.STATE_LABEL.label = "Br"
        }));
        this.labelSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id +
            "_button_label_i", j.IODINE, "Iodine",
            function() {
                a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_LABEL);
                a.sketcher.stateManager.STATE_LABEL.label = "I"
            }));
        this.labelSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_label_p", j.PHOSPHORUS, "Phosphorus", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_LABEL);
            a.sketcher.stateManager.STATE_LABEL.label = "P"
        }));
        this.labelSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_label_s",
            j.SULFUR, "Sulfur",
            function() {
                a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_LABEL);
                a.sketcher.stateManager.STATE_LABEL.label = "S"
            }));
        this.labelSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_label_pt", j.PERIODIC_TABLE, "Choose Symbol", function() {
            for (var d = 0, e = a.sketcher.dialogManager.periodicTableDialog.canvas.cells.length; d < e; d++) {
                var h = a.sketcher.dialogManager.periodicTableDialog.canvas.cells[d];
                if (h.element.symbol === a.sketcher.stateManager.STATE_LABEL.label) {
                    a.sketcher.dialogManager.periodicTableDialog.canvas.selected =
                        h;
                    a.sketcher.dialogManager.periodicTableDialog.canvas.repaint();
                    break
                }
            }
            a.sketcher.dialogManager.periodicTableDialog.getElement().dialog("open")
        }))
    };
    e.makeBondSet = function(a) {
        this.bondSet = new i.ButtonSet(a.sketcher.id + "_buttons_bond");
        this.buttonSingle = new i.Button(a.sketcher.id + "_button_bond_single", j.BOND_SINGLE, "Single Bond", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_NEW_BOND);
            a.sketcher.stateManager.STATE_NEW_BOND.bondOrder = 1;
            a.sketcher.stateManager.STATE_NEW_BOND.stereo =
                k.Bond.STEREO_NONE
        });
        this.bondSet.buttons.push(this.buttonSingle);
        this.buttonRecessed = new i.Button(a.sketcher.id + "_button_bond_recessed", j.BOND_RECESSED, "Recessed Bond", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_NEW_BOND);
            a.sketcher.stateManager.STATE_NEW_BOND.bondOrder = 1;
            a.sketcher.stateManager.STATE_NEW_BOND.stereo = k.Bond.STEREO_RECESSED
        });
        this.bondSet.buttons.push(this.buttonRecessed);
        this.buttonProtruding = new i.Button(a.sketcher.id + "_button_bond_protruding", j.BOND_PROTRUDING,
            "Protruding Bond",
            function() {
                a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_NEW_BOND);
                a.sketcher.stateManager.STATE_NEW_BOND.bondOrder = 1;
                a.sketcher.stateManager.STATE_NEW_BOND.stereo = k.Bond.STEREO_PROTRUDING
            });
        this.bondSet.buttons.push(this.buttonProtruding);
        this.buttonDouble = new i.Button(a.sketcher.id + "_button_bond_double", j.BOND_DOUBLE, "Double Bond", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_NEW_BOND);
            a.sketcher.stateManager.STATE_NEW_BOND.bondOrder =
                2;
            a.sketcher.stateManager.STATE_NEW_BOND.stereo = k.Bond.STEREO_NONE
        });
        this.bondSet.buttons.push(this.buttonDouble);
        this.buttonBond = new i.DummyButton(a.sketcher.id + "_button_bond", j.BOND_TRIPLE, "Other Bond");
        this.bondSet.buttons.push(this.buttonBond);
        this.bondSet.addDropDown("More Bonds");
        this.bondSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_bond_zero", j.BOND_ZERO, "Zero Bond (Ionic/Hydrogen)", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_NEW_BOND);
            a.sketcher.stateManager.STATE_NEW_BOND.bondOrder = 0;
            a.sketcher.stateManager.STATE_NEW_BOND.stereo = k.Bond.STEREO_NONE
        }));
        this.bondSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_bond_half", j.BOND_HALF, "Half Bond", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_NEW_BOND);
            a.sketcher.stateManager.STATE_NEW_BOND.bondOrder = 0.5;
            a.sketcher.stateManager.STATE_NEW_BOND.stereo = k.Bond.STEREO_NONE
        }));
        this.bondSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id +
            "_button_bond_resonance", j.BOND_RESONANCE, "Resonance Bond",
            function() {
                a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_NEW_BOND);
                a.sketcher.stateManager.STATE_NEW_BOND.bondOrder = 1.5;
                a.sketcher.stateManager.STATE_NEW_BOND.stereo = k.Bond.STEREO_NONE
            }));
        this.bondSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_bond_ambiguous_double", j.BOND_DOUBLE_AMBIGUOUS, "Ambiguous Double Bond", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_NEW_BOND);
            a.sketcher.stateManager.STATE_NEW_BOND.bondOrder =
                2;
            a.sketcher.stateManager.STATE_NEW_BOND.stereo = k.Bond.STEREO_AMBIGUOUS
        }));
        this.bondSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_bond_triple", j.BOND_TRIPLE, "Triple Bond", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_NEW_BOND);
            a.sketcher.stateManager.STATE_NEW_BOND.bondOrder = 3;
            a.sketcher.stateManager.STATE_NEW_BOND.stereo = k.Bond.STEREO_NONE
        }));
        this.bondSet.dropDown.defaultButton = this.bondSet.dropDown.buttonSet.buttons[this.bondSet.dropDown.buttonSet.buttons.length -
            1]
    };
    e.makeRingSet = function(a) {
        this.ringSet = new i.ButtonSet(a.sketcher.id + "_buttons_ring");
        this.buttonCyclohexane = new i.Button(a.sketcher.id + "_button_ring_cyclohexane", j.CYCLOHEXANE, "Cyclohexane Ring", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_NEW_RING);
            a.sketcher.stateManager.STATE_NEW_RING.numSides = 6;
            a.sketcher.stateManager.STATE_NEW_RING.unsaturated = !1
        });
        this.ringSet.buttons.push(this.buttonCyclohexane);
        this.buttonBenzene = new i.Button(a.sketcher.id + "_button_ring_benzene",
            j.BENZENE, "Benzene Ring",
            function() {
                a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_NEW_RING);
                a.sketcher.stateManager.STATE_NEW_RING.numSides = 6;
                a.sketcher.stateManager.STATE_NEW_RING.unsaturated = !0
            });
        this.ringSet.buttons.push(this.buttonBenzene);
        this.buttonRing = new i.DummyButton(a.sketcher.id + "_button_ring", j.CYCLOPENTANE, "Other Ring");
        this.ringSet.buttons.push(this.buttonRing);
        this.ringSet.addDropDown("More Rings");
        this.ringSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id +
            "_button_ring_cyclopropane", j.CYCLOPROPANE, "Cyclopropane Ring",
            function() {
                a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_NEW_RING);
                a.sketcher.stateManager.STATE_NEW_RING.numSides = 3;
                a.sketcher.stateManager.STATE_NEW_RING.unsaturated = !1
            }));
        this.ringSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_ring_cyclobutane", j.CYCLOBUTANE, "Cyclobutane Ring", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_NEW_RING);
            a.sketcher.stateManager.STATE_NEW_RING.numSides =
                4;
            a.sketcher.stateManager.STATE_NEW_RING.unsaturated = !1
        }));
        this.ringSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_ring_cyclopentane", j.CYCLOPENTANE, "Cyclopentane Ring", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_NEW_RING);
            a.sketcher.stateManager.STATE_NEW_RING.numSides = 5;
            a.sketcher.stateManager.STATE_NEW_RING.unsaturated = !1
        }));
        this.ringSet.dropDown.defaultButton = this.ringSet.dropDown.buttonSet.buttons[this.ringSet.dropDown.buttonSet.buttons.length -
            1];
        this.ringSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_ring_cycloheptane", j.CYCLOHEPTANE, "Cycloheptane Ring", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_NEW_RING);
            a.sketcher.stateManager.STATE_NEW_RING.numSides = 7;
            a.sketcher.stateManager.STATE_NEW_RING.unsaturated = !1
        }));
        this.ringSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_ring_cyclooctane", j.CYCLOOCTANE, "Cyclooctane Ring", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_NEW_RING);
            a.sketcher.stateManager.STATE_NEW_RING.numSides = 8;
            a.sketcher.stateManager.STATE_NEW_RING.unsaturated = !1
        }))
    };
    e.makeAttributeSet = function(a) {
        this.attributeSet = new i.ButtonSet(a.sketcher.id + "_buttons_attribute");
        this.buttonAttribute = new i.DummyButton(a.sketcher.id + "_button_attribute", j.INCREASE_CHARGE, "Attributes");
        this.attributeSet.buttons.push(this.buttonAttribute);
        this.attributeSet.addDropDown("More Attributes");
        this.attributeSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_attribute_charge_increment",
            j.INCREASE_CHARGE, "Increase Charge",
            function() {
                a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_CHARGE);
                a.sketcher.stateManager.STATE_CHARGE.delta = 1
            }));
        this.attributeSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_attribute_charge_decrement", j.DECREASE_CHARGE, "Decrease Charge", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_CHARGE);
            a.sketcher.stateManager.STATE_CHARGE.delta = -1
        }));
        this.attributeSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id +
            "_button_attribute_lonePair_increment", j.ADD_LONE_PAIR, "Add Lone Pair",
            function() {
                a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_LONE_PAIR);
                a.sketcher.stateManager.STATE_LONE_PAIR.delta = 1
            }));
        this.attributeSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_attribute_lonePair_decrement", j.REMOVE_LONE_PAIR, "Remove Lone Pair", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_LONE_PAIR);
            a.sketcher.stateManager.STATE_LONE_PAIR.delta = -1
        }));
        this.attributeSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id +
            "_button_attribute_radical_increment", j.ADD_RADICAL, "Add Radical",
            function() {
                a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_RADICAL);
                a.sketcher.stateManager.STATE_RADICAL.delta = 1
            }));
        this.attributeSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_attribute_radical_decrement", j.REMOVE_RADICAL, "Remove Radical", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_RADICAL);
            a.sketcher.stateManager.STATE_RADICAL.delta = -1
        }))
    };
    e.makeShapeSet = function(a) {
        this.shapeSet =
            new i.ButtonSet(a.sketcher.id + "_buttons_shape");
        this.buttonShape = new i.DummyButton(a.sketcher.id + "_button_shape", j.ARROW_SYNTHETIC, "Add Shape");
        this.shapeSet.buttons.push(this.buttonShape);
        this.shapeSet.addDropDown("More Shapes");
        this.shapeSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_shape_arrow_synthetic", j.ARROW_SYNTHETIC, "Synthetic Arrow", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_SHAPE);
            a.sketcher.stateManager.STATE_SHAPE.shapeType = h.ShapeState.ARROW_SYNTHETIC
        }));
        this.shapeSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_shape_arrow_retrosynthetic", j.ARROW_RETROSYNTHETIC, "Retrosynthetic Arrow", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_SHAPE);
            a.sketcher.stateManager.STATE_SHAPE.shapeType = h.ShapeState.ARROW_RETROSYNTHETIC
        }));
        this.shapeSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_shape_arrow_resonance", j.ARROW_RESONANCE, "Resonance Arrow", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_SHAPE);
            a.sketcher.stateManager.STATE_SHAPE.shapeType = h.ShapeState.ARROW_RESONANCE
        }));
        this.shapeSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_shape_arrow_equilibrium", j.ARROW_EQUILIBRIUM, "Equilibrium Arrow", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_SHAPE);
            a.sketcher.stateManager.STATE_SHAPE.shapeType = h.ShapeState.ARROW_EQUILIBRIUM
        }));
        this.shapeSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_shape_pusher_1", j.PUSHER_SINGLE, "Single Electron Pusher",
            function() {
                a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_PUSHER);
                a.sketcher.stateManager.STATE_PUSHER.numElectron = 1
            }));
        this.shapeSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_shape_pusher_2", j.PUSHER_DOUBLE, "Electron Pair Pusher", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_PUSHER);
            a.sketcher.stateManager.STATE_PUSHER.numElectron = 2
        }));
        this.shapeSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_shape_pusher_bond_forming",
            j.PUSHER_BOND_FORMING, "Bond Forming Pusher",
            function() {
                a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_PUSHER);
                a.sketcher.stateManager.STATE_PUSHER.numElectron = -1
            }));
        this.shapeSet.dropDown.buttonSet.buttons.push(new i.Button(a.sketcher.id + "_button_shape_charge_bracket", j.CHARGE_BRACKET, "Bracket", function() {
            a.sketcher.stateManager.setState(a.sketcher.stateManager.STATE_SHAPE);
            a.sketcher.stateManager.STATE_SHAPE.shapeType = h.ShapeState.BRACKET;
            a.sketcher.repaint()
        }))
    }
})(ChemDoodle, ChemDoodle.iChemLabs,
    ChemDoodle.io, ChemDoodle.structures, ChemDoodle.uis.actions, ChemDoodle.uis.gui, ChemDoodle.uis.gui.imageDepot, ChemDoodle.uis.gui.desktop, ChemDoodle.uis.tools, ChemDoodle.uis.states, ChemDoodle.lib.jQuery, document);
(function(a, g, l) {
    l.Lasso = function(a) {
        this.sketcher = a;
        this.atoms = [];
        this.shapes = [];
        this.bounds = void 0;
        this.mode = l.Lasso.MODE_LASSO;
        this.points = []
    };
    l.Lasso.MODE_LASSO = "lasso";
    l.Lasso.MODE_LASSO_SHAPES = "shapes";
    l.Lasso.MODE_RECTANGLE_MARQUEE = "rectangle";
    var k = l.Lasso.prototype;
    k.select = function(d, e) {
        if (!this.block) {
            g.SHIFT || this.empty();
            if (d) this.atoms = d.slice(0), this.shapes = e.slice(0);
            else {
                if (this.mode !== l.Lasso.MODE_LASSO_SHAPES) {
                    for (var j = [], i = 0, k = this.sketcher.molecules.length; i < k; i++)
                        for (var h =
                                this.sketcher.molecules[i], n = 0, s = h.atoms.length; n < s; n++) {
                            var c = h.atoms[n];
                            this.mode === l.Lasso.MODE_RECTANGLE_MARQUEE ? 2 === this.points.length && a.isBetween(c.x, this.points[0].x, this.points[1].x) && a.isBetween(c.y, this.points[0].y, this.points[1].y) && j.push(c) : 1 < this.points.length && a.isPointInPoly(this.points, c) && j.push(c)
                        }
                    if (0 === this.atoms.length) this.atoms = j;
                    else {
                        for (var o = [], i = 0, k = this.atoms.length; i < k; i++) c = this.atoms[i], -1 === j.indexOf(c) ? o.push(c) : c.isLassoed = !1;
                        i = 0;
                        for (k = j.length; i < k; i++) - 1 === this.atoms.indexOf(j[i]) &&
                            o.push(j[i]);
                        this.atoms = o
                    }
                }
                j = [];
                i = 0;
                for (k = this.sketcher.shapes.length; i < k; i++) {
                    for (var h = this.sketcher.shapes[i], c = h.getPoints(), r = 0 < c.length, n = 0, s = c.length; n < s; n++) {
                        var q = c[n];
                        if (this.mode === l.Lasso.MODE_RECTANGLE_MARQUEE)
                            if (2 === this.points.length) {
                                if (!a.isBetween(q.x, this.points[0].x, this.points[1].x) || !a.isBetween(q.y, this.points[0].y, this.points[1].y)) {
                                    r = !1;
                                    break
                                }
                            } else {
                                r = !1;
                                break
                            } else if (1 < this.points.length) {
                            if (!a.isPointInPoly(this.points, q)) {
                                r = !1;
                                break
                            }
                        } else {
                            r = !1;
                            break
                        }
                    }
                    r && j.push(h)
                }
                if (0 ===
                    this.shapes.length) this.shapes = j;
                else {
                    n = [];
                    i = 0;
                    for (k = this.shapes.length; i < k; i++) h = this.shapes[i], -1 === j.indexOf(h) ? o.push(h) : h.isLassoed = !1;
                    i = 0;
                    for (k = j.length; i < k; i++) - 1 === this.shapes.indexOf(j[i]) && n.push(j[i]);
                    this.shapes = n
                }
            }
            i = 0;
            for (k = this.atoms.length; i < k; i++) this.atoms[i].isLassoed = !0;
            i = 0;
            for (k = this.shapes.length; i < k; i++) this.shapes[i].isLassoed = !0;
            this.setBounds();
            this.bounds && Infinity === this.bounds.minX && this.empty();
            this.points = [];
            this.sketcher.stateManager.getCurrentState().clearHover();
            this.enableButtons();
            this.sketcher.repaint()
        }
    };
    k.enableButtons = function() {
        this.sketcher.useServices && (0 < this.atoms.length ? (this.sketcher.toolbarManager.buttonClean.enable(), this.sketcher.toolbarManager.buttonCalculate.enable(), this.sketcher.toolbarManager.buttonSave.enable()) : (this.sketcher.toolbarManager.buttonClean.disable(), this.sketcher.toolbarManager.buttonCalculate.disable(), this.sketcher.toolbarManager.buttonSave.disable()))
    };
    k.setBounds = function() {
        if (this.isActive()) {
            this.sketcher.repaint();
            this.bounds = new a.Bounds;
            for (var d = 0, e = this.atoms.length; d < e; d++) this.bounds.expand(this.atoms[d].getBounds());
            d = 0;
            for (e = this.shapes.length; d < e; d++) this.bounds.expand(this.shapes[d].getBounds());
            this.bounds.minX -= 5;
            this.bounds.minY -= 5;
            this.bounds.maxX += 5;
            this.bounds.maxY += 5
        } else this.bounds = void 0
    };
    k.empty = function() {
        for (var a = 0, e = this.atoms.length; a < e; a++) this.atoms[a].isLassoed = !1;
        a = 0;
        for (e = this.shapes.length; a < e; a++) this.shapes[a].isLassoed = !1;
        this.atoms = [];
        this.shapes = [];
        this.bounds = void 0;
        this.enableButtons();
        this.sketcher.repaint()
    };
    k.draw = function(a, e) {
        a.strokeStyle = "blue";
        a.lineWidth = 0.5 / e.scale;
        if (0 < this.points.length)
            if (this.mode === l.Lasso.MODE_RECTANGLE_MARQUEE) {
                if (2 === this.points.length) {
                    var g = this.points[0],
                        i = this.points[1];
                    a.beginPath();
                    a.rect(g.x, g.y, i.x - g.x, i.y - g.y);
                    a.stroke()
                }
            } else if (1 < this.points.length) {
            a.beginPath();
            a.moveTo(this.points[0].x, this.points[0].y);
            g = 1;
            for (i = this.points.length; g < i; g++) a.lineTo(this.points[g].x, this.points[g].y);
            a.closePath();
            a.stroke()
        }
        this.bounds && (a.beginPath(), a.rect(this.bounds.minX,
            this.bounds.minY, this.bounds.maxX - this.bounds.minX, this.bounds.maxY - this.bounds.minY), a.stroke())
    };
    k.isActive = function() {
        return 0 < this.atoms.length || 0 < this.shapes.length
    };
    k.getFirstMolecule = function() {
        if (0 < this.atoms.length) return this.sketcher.getMoleculeByAtom(this.atoms[0])
    };
    k.getAllPoints = function() {
        for (var a = this.atoms, e = 0, g = this.shapes.length; e < g; e++) a = a.concat(this.shapes[e].getPoints());
        return a
    };
    k.addPoint = function(a) {
        if (this.mode === l.Lasso.MODE_RECTANGLE_MARQUEE)
            if (2 > this.points.length) this.points.push(a);
            else {
                var e = this.points[1];
                e.x = a.x;
                e.y = a.y
            } else this.points.push(a)
    }
})(ChemDoodle.math, ChemDoodle.monitor, ChemDoodle.uis.tools);
(function(a, g, l, k, d, e, j, i, p) {
    a.SketcherCanvas = function(a, g, i, c) {
        this.isMobile = void 0 === c.isMobile ? l.supports_touch() : c.isMobile;
        this.useServices = void 0 === c.useServices ? !1 : c.useServices;
        this.oneMolecule = void 0 === c.oneMolecule ? !1 : c.oneMolecule;
        this.includeToolbar = void 0 === c.includeToolbar ? !0 : c.includeToolbar;
        this.includeQuery = void 0 === c.includeQuery ? !1 : c.includeQuery;
        this.id = a;
        this.toolbarManager = new k.gui.ToolbarManager(this);
        if (this.includeToolbar) {
            this.toolbarManager.write();
            var o = this;
            document.getElementById(this.id) ?
                j("#" + a + "_button_attribute_lonePair_decrement_icon").load(function() {
                    o.toolbarManager.setup()
                }) : j(p).load(function() {
                    o.toolbarManager.setup()
                });
            this.dialogManager = new k.gui.DialogManager(this)
        }
        this.stateManager = new k.states.StateManager(this);
        this.historyManager = new k.actions.HistoryManager(this);
        a && this.create(a, g, i);
        this.specs.atoms_circleDiameter_2D = 7;
        this.specs.atoms_circleBorderWidth_2D = 0;
        this.isHelp = !1;
        this.lastPinchScale = 1;
        this.lastGestureRotate = 0;
        this.inGesture = !1;
        this.oneMolecule ? (a = new d.Molecule,
            a.atoms.push(new d.Atom), this.loadMolecule(a)) : (this.startAtom = new d.Atom("C", -10, -10), this.startAtom.isLone = !0, this.lasso = new e.Lasso(this))
    };
    a = a.SketcherCanvas.prototype = new a._Canvas;
    a.drawSketcherDecorations = function(a) {
        a.save();
        a.translate(this.width / 2, this.height / 2);
        a.rotate(this.specs.rotateAngle);
        a.scale(this.specs.scale, this.specs.scale);
        a.translate(-this.width / 2, -this.height / 2);
        this.hovering && this.hovering.drawDecorations(a, this.specs);
        this.startAtom && (-10 != this.startAtom.x && !this.isMobile) &&
            this.startAtom.draw(a, this.specs);
        this.tempAtom && (a.strokeStyle = "#00FF00", a.fillStyle = "#00FF00", a.lineWidth = 1, a.beginPath(), a.moveTo(this.hovering.x, this.hovering.y), g.contextHashTo(a, this.hovering.x, this.hovering.y, this.tempAtom.x, this.tempAtom.y, 2, 2), a.stroke(), "C" === this.tempAtom.label ? (a.beginPath(), a.arc(this.tempAtom.x, this.tempAtom.y, 3, 0, 2 * i.PI, !1), a.fill()) : (a.textAlign = "center", a.textBaseline = "middle", a.font = g.getFontString(this.specs.atoms_font_size_2D, this.specs.atoms_font_families_2D,
            this.specs.atoms_font_bold_2D, this.specs.atoms_font_italic_2D), a.fillText(this.tempAtom.label, this.tempAtom.x, this.tempAtom.y)), this.tempAtom.isOverlap && (a.strokeStyle = "#C10000", a.lineWidth = 1.2, a.beginPath(), a.arc(this.tempAtom.x, this.tempAtom.y, 7, 0, 2 * i.PI, !1), a.stroke()));
        if (this.tempRing) {
            a.strokeStyle = "#00FF00";
            a.fillStyle = "#00FF00";
            a.lineWidth = 1;
            a.beginPath();
            if (this.hovering instanceof d.Atom) {
                a.moveTo(this.hovering.x, this.hovering.y);
                g.contextHashTo(a, this.hovering.x, this.hovering.y, this.tempRing[0].x,
                    this.tempRing[0].y, 2, 2);
                for (var e = 1, j = this.tempRing.length; e < j; e++) g.contextHashTo(a, this.tempRing[e - 1].x, this.tempRing[e - 1].y, this.tempRing[e].x, this.tempRing[e].y, 2, 2);
                g.contextHashTo(a, this.tempRing[this.tempRing.length - 1].x, this.tempRing[this.tempRing.length - 1].y, this.hovering.x, this.hovering.y, 2, 2)
            } else if (this.hovering instanceof d.Bond) {
                var e = this.hovering.a2,
                    c = this.hovering.a1;
                this.tempRing[0] === this.hovering.a1 && (e = this.hovering.a1, c = this.hovering.a2);
                a.moveTo(e.x, e.y);
                g.contextHashTo(a,
                    e.x, e.y, this.tempRing[1].x, this.tempRing[1].y, 2, 2);
                e = 2;
                for (j = this.tempRing.length; e < j; e++) g.contextHashTo(a, this.tempRing[e - 1].x, this.tempRing[e - 1].y, this.tempRing[e].x, this.tempRing[e].y, 2, 2);
                g.contextHashTo(a, this.tempRing[this.tempRing.length - 1].x, this.tempRing[this.tempRing.length - 1].y, c.x, c.y, 2, 2)
            }
            a.stroke();
            a.strokeStyle = "#C10000";
            a.lineWidth = 1.2;
            e = 0;
            for (j = this.tempRing.length; e < j; e++) this.tempRing[e].isOverlap && (a.beginPath(), a.arc(this.tempRing[e].x, this.tempRing[e].y, 7, 0, 2 * i.PI, !1), a.stroke())
        }
        this.lasso &&
            this.lasso.draw(a, this.specs);
        this.stateManager.getCurrentState().draw && this.stateManager.getCurrentState().draw(a);
        a.restore()
    };
    a.drawChildExtras = function(a) {
        this.drawSketcherDecorations(a);
        if (!this.hideHelp) {
            var e = new d.Point(this.width - 20, 20),
                g = a.createRadialGradient(e.x, e.y, 10, e.x, e.y, 2);
            g.addColorStop(0, "#00680F");
            g.addColorStop(1, "#FFFFFF");
            a.fillStyle = g;
            a.beginPath();
            a.arc(e.x, e.y, 10, 0, 2 * i.PI, !1);
            a.fill();
            this.isHelp && (a.lineWidth = 2, a.strokeStyle = "black", a.stroke());
            a.fillStyle = this.isHelp ?
                "red" : "black";
            a.textAlign = "center";
            a.textBaseline = "middle";
            a.font = "14px sans-serif";
            a.fillText("?", e.x, e.y)
        }
        this.paidToHideTrademark || (a.font = "14px sans-serif", e = a.measureText("ChemDoodle").width, a.textAlign = "left", a.textBaseline = "bottom", a.fillStyle = "rgba(0, 60, 0, 0.5)", a.fillText("ChemDoodle", this.width - e - 13, this.height - 4), a.font = "8px sans-serif", a.fillText("\u00ae", this.width - 13, this.height - 12))
    };
    a.scaleEvent = function(a) {
        a.op = new d.Point(a.p.x, a.p.y);
        1 !== this.specs.scale && (a.p.x = this.width / 2 +
            (a.p.x - this.width / 2) / this.specs.scale, a.p.y = this.height / 2 + (a.p.y - this.height / 2) / this.specs.scale)
    };
    a.checkScale = function() {
        0.5 > this.specs.scale ? this.specs.scale = 0.5 : 10 < this.specs.scale && (this.specs.scale = 10)
    };
    a.click = function(a) {
        this.scaleEvent(a);
        this.stateManager.getCurrentState().click(a)
    };
    a.rightclick = function(a) {
        this.scaleEvent(a);
        this.stateManager.getCurrentState().rightclick(a)
    };
    a.dblclick = function(a) {
        this.scaleEvent(a);
        this.stateManager.getCurrentState().dblclick(a)
    };
    a.mousedown = function(a) {
        this.scaleEvent(a);
        this.stateManager.getCurrentState().mousedown(a)
    };
    a.rightmousedown = function(a) {
        this.scaleEvent(a);
        this.stateManager.getCurrentState().rightmousedown(a)
    };
    a.mousemove = function(a) {
        this.isHelp = !1;
        10 > a.p.distance(new d.Point(this.width - 20, 20)) && (this.isHelp = !0);
        this.scaleEvent(a);
        this.stateManager.getCurrentState().mousemove(a)
    };
    a.mouseout = function(a) {
        this.scaleEvent(a);
        this.stateManager.getCurrentState().mouseout(a)
    };
    a.mouseover = function(a) {
        this.scaleEvent(a);
        this.stateManager.getCurrentState().mouseover(a)
    };
    a.mouseup = function(a) {
        this.scaleEvent(a);
        this.stateManager.getCurrentState().mouseup(a)
    };
    a.rightmouseup = function(a) {
        this.scaleEvent(a);
        this.stateManager.getCurrentState().rightmouseup(a)
    };
    a.mousewheel = function(a, d) {
        this.scaleEvent(a);
        this.stateManager.getCurrentState().mousewheel(a, d)
    };
    a.drag = function(a) {
        this.scaleEvent(a);
        this.stateManager.getCurrentState().drag(a)
    };
    a.keydown = function(a) {
        this.scaleEvent(a);
        this.stateManager.getCurrentState().keydown(a)
    };
    a.keypress = function(a) {
        this.scaleEvent(a);
        this.stateManager.getCurrentState().keypress(a)
    };
    a.keyup = function(a) {
        this.scaleEvent(a);
        this.stateManager.getCurrentState().keyup(a)
    };
    a.touchstart = function(a) {
        if (a.originalEvent.touches && 1 < a.originalEvent.touches.length) {
            if (this.tempAtom || this.tempRing) this.hovering = this.tempRing = this.tempAtom = void 0, this.repaint();
            this.lastPoint = void 0
        } else this.scaleEvent(a), this.stateManager.getCurrentState().mousemove(a), this.stateManager.getCurrentState().mousedown(a)
    };
    a.touchmove = function(a) {
        this.scaleEvent(a);
        this.inGesture || this.stateManager.getCurrentState().drag(a)
    };
    a.touchend = function(a) {
        this.scaleEvent(a);
        this.stateManager.getCurrentState().mouseup(a);
        this.hovering && (this.stateManager.getCurrentState().clearHover(), this.repaint())
    };
    a.gesturechange = function(a) {
        this.inGesture = !0;
        if (1 !== a.originalEvent.scale - this.lastPinchScale) {
            if (!this.lasso || !this.lasso.isActive()) this.specs.scale *= a.originalEvent.scale / this.lastPinchScale, this.checkScale();
            this.lastPinchScale = a.originalEvent.scale
        }
        if (0 !== this.lastGestureRotate -
            a.originalEvent.rotation) {
            var e = (this.lastGestureRotate - a.originalEvent.rotation) / 180 * i.PI;
            if (this.parentAction) {
                this.parentAction.dif += e;
                for (var g = 0, c = this.parentAction.ps.length; g < c; g++) {
                    var j = this.parentAction.ps[g],
                        l = this.parentAction.center.distance(j),
                        q = this.parentAction.center.angle(j) + e;
                    j.x = this.parentAction.center.x + l * i.cos(q);
                    j.y = this.parentAction.center.y - l * i.sin(q)
                }
                g = 0;
                for (c = this.molecules.length; g < c; g++) this.molecules[g].check();
                this.lasso && this.lasso.isActive() && this.lasso.setBounds()
            } else g =
                this.lasso && this.lasso.isActive() ? this.lasso.getAllPoints() : this.getAllPoints(), c = this.lasso && this.lasso.isActive() ? new d.Point((this.lasso.bounds.minX + this.lasso.bounds.maxX) / 2, (this.lasso.bounds.minY + this.lasso.bounds.maxY) / 2) : new d.Point(this.width / 2, this.height / 2), this.parentAction = new k.actions.RotateAction(g, e, c), this.historyManager.pushUndo(this.parentAction);
            this.lastGestureRotate = a.originalEvent.rotation
        }
        this.repaint()
    };
    a.gestureend = function() {
        this.inGesture = !1;
        this.lastPinchScale = 1;
        this.lastGestureRotate =
            0;
        this.parentAction = void 0
    }
})(ChemDoodle, ChemDoodle.extensions, ChemDoodle.featureDetection, ChemDoodle.uis, ChemDoodle.structures, ChemDoodle.uis.tools, ChemDoodle.lib.jQuery, Math, window);
(function(a, g, l, k, d, e) {
    d._State3D = function() {};
    a = d._State3D.prototype;
    a.setup = function(a) {
        this.editor = a
    };
    a.enter = function() {
        this.innerenter && this.innerenter()
    };
    a.exit = function() {
        this.innerexit && this.innerexit()
    };
    a.click = function(a) {
        this.innerclick && this.innerclick(a)
    };
    a.rightclick = function(a) {
        this.innerrightclick && this.innerrightclick(a)
    };
    a.dblclick = function(a) {
        this.innerdblclick && this.innerdblclick(a)
    };
    a.mousedown = function(a) {
        this.editor.defaultmousedown(a);
        this.editor.isHelp || this.editor.isMobile &&
            10 > a.p.distance(new e.Point(this.editor.width - 20, 20)) ? (this.editor.isHelp = !1, this.editor.lastPoint = void 0, this.editor.repaint(), window.open("http://web.chemdoodle.com/demos/3d-editor")) : this.innermousedown && this.innermousedown(a)
    };
    a.rightmousedown = function(a) {
        this.innerrightmousedown && this.innerrightmousedown(a);
        this.editor.defaultrightmousedown(a)
    };
    a.mousemove = function(a) {
        this.innermousemove && this.innermousemove(a);
        this.editor.repaint()
    };
    a.mouseout = function(a) {
        this.innermouseout && this.innermouseout(a)
    };
    a.mouseover = function(a) {
        this.innermouseover && this.innermouseover(a)
    };
    a.mouseup = function(a) {
        this.innermouseup && this.innermouseup(a);
        this.editor.defaultmouseup(a)
    };
    a.rightmouseup = function(a) {
        this.innerrightmouseup && this.innerrightmouseup(a)
    };
    a.mousewheel = function(a, d) {
        this.innermousewheel ? this.innermousewheel(a) : this.editor.defaultmousewheel(a, d)
    };
    a.drag = function(a) {
        this.innerdrag ? this.innerdrag(a) : this.editor.defaultdrag(a)
    };
    a.keydown = function(a) {
        l.META && (90 === a.which ? this.editor.historyManager.undo() :
            89 === a.which ? this.editor.historyManager.redo() : 83 === a.which ? this.editor.toolbarManager.buttonSave.getElement().click() : 79 === a.which ? this.editor.toolbarManager.buttonOpen.getElement().click() : 78 === a.which ? this.editor.toolbarManager.buttonClear.getElement().click() : 187 === a.which || 61 === a.which ? this.editor.toolbarManager.buttonScalePlus.getElement().click() : (189 === a.which || 109 === a.which) && this.editor.toolbarManager.buttonScaleMinus.getElement().click());
        this.innerkeydown && this.innerkeydown(a)
    };
    a.keypress =
        function(a) {
            this.innerkeypress && this.innerkeypress(a)
        };
    a.keyup = function(a) {
        this.innerkeyup && this.innerkeyup(a)
    }
})(ChemDoodle, ChemDoodle.math, ChemDoodle.monitor, ChemDoodle.uis.actions, ChemDoodle.uis.states, ChemDoodle.structures, ChemDoodle.SYMBOLS, Math, ChemDoodle.lib.mat4);
(function(a, g, l, k, d) {
    g.MeasureState3D = function(a) {
        this.setup(a);
        this.selectedAtoms = []
    };
    g = g.MeasureState3D.prototype = new g._State3D;
    g.numToSelect = 2;
    g.reset = function() {
        for (var a = 0, d = this.selectedAtoms.length; a < d; a++) this.selectedAtoms[a].isSelected = !1;
        this.selectedAtoms = [];
        this.editor.repaint()
    };
    g.innerenter = function() {
        this.reset()
    };
    g.innerexit = function() {
        this.reset()
    };
    g.innermousemove = function(a) {
        this.hoveredAtom && (this.hoveredAtom.isHover = !1, this.hoveredAtom = void 0);
        if ((a = this.editor.pick(a.p.x, a.p.y, !0, !1)) && a instanceof l.Atom) this.hoveredAtom = a, a.isHover = !0;
        this.editor.repaint()
    };
    g.innermousedown = function(e) {
        this.editor.isMobile && this.innermousemove(e);
        if (this.hoveredAtom) {
            this.hoveredAtom.isHover = !1;
            if (this.hoveredAtom.isSelected) {
                var g = this.hoveredAtom;
                this.selectedAtoms = d.grep(this.selectedAtoms, function(a) {
                    return a !== g
                })
            } else this.selectedAtoms.push(this.hoveredAtom);
            this.hoveredAtom.isSelected = !this.hoveredAtom.isSelected;
            this.hoveredAtom = void 0;
            this.editor.repaint()
        }
        if (this.selectedAtoms.length ===
            this.numToSelect) {
            var i;
            switch (this.numToSelect) {
                case 2:
                    i = new k.Distance(this.selectedAtoms[0], this.selectedAtoms[1]);
                    break;
                case 3:
                    i = new k.Angle(this.selectedAtoms[0], this.selectedAtoms[1], this.selectedAtoms[2]);
                    break;
                case 4:
                    i = new k.Torsion(this.selectedAtoms[0], this.selectedAtoms[1], this.selectedAtoms[2], this.selectedAtoms[3])
            }
            this.reset();
            i && this.editor.historyManager.pushUndo(new a.AddShapeAction(this.editor, i))
        }
    }
})(ChemDoodle.uis.actions, ChemDoodle.uis.states, ChemDoodle.structures, ChemDoodle.structures.d3,
    ChemDoodle.lib.jQuery);
(function(a) {
    a.ViewState3D = function(a) {
        this.setup(a)
    };
    a.ViewState3D.prototype = new a._State3D
})(ChemDoodle.uis.states);
(function(a) {
    a.StateManager3D = function(g) {
        this.STATE_VIEW = new a.ViewState3D(g);
        this.STATE_MEASURE = new a.MeasureState3D(g);
        var l = this.STATE_VIEW;
        this.setState = function(a) {
            a !== l && (l.exit(), l = a, l.enter())
        };
        this.getCurrentState = function() {
            return l
        }
    }
})(ChemDoodle.uis.states);
(function(a, g, l, k, d, e, j, i, p, h, n, s) {
    e.ToolbarManager3D = function(c) {
        this.editor = c;
        this.buttonOpen = new i.Button(c.id + "_button_open", j.OPEN, "Open", function() {
            c.dialogManager.loadDialog.getTextArea().val("");
            c.dialogManager.loadDialog.getElement().dialog("open")
        });
        this.buttonSave = new i.Button(c.id + "_button_save", j.SAVE, "Save", function() {
            c.useServices ? c.dialogManager.saveDialog.clear() : c.dialogManager.saveDialog.getTextArea().val(a.writeMOL(c.molecules[0]));
            c.dialogManager.saveDialog.getElement().dialog("open")
        });
        this.buttonSearch = new i.Button(c.id + "_button_search", j.SEARCH, "Search", function() {
            c.dialogManager.searchDialog.getElement().dialog("open")
        });
        this.buttonCalculate = new i.Button(c.id + "_button_calculate", j.CALCULATE, "Calculate", function() {
            var a = c.molecules[0];
            a && g.calculate(a, {
                descriptors: "mf ef mw miw deg_unsat hba hbd rot electron pol_miller cmr tpsa vabc xlogp2 bertz".split(" ")
            }, function(a) {
                function d(a, c, g) {
                    e.push(a);
                    e.push(": ");
                    for (a = a.length + 2; 30 > a; a++) e.push(" ");
                    e.push(c);
                    e.push(" ");
                    e.push(g);
                    e.push("\n")
                }
                var e = [];
                d("Molecular Formula", a.mf, "");
                d("Empirical Formula", a.ef, "");
                d("Molecular Mass", a.mw, "amu");
                d("Monoisotopic Mass", a.miw, "amu");
                d("Degree of Unsaturation", a.deg_unsat, "");
                d("Hydrogen Bond Acceptors", a.hba, "");
                d("Hydrogen Bond Donors", a.hbd, "");
                d("Rotatable Bonds", a.rot, "");
                d("Total Electrons", a.rot, "");
                d("Molecular Polarizability", a.pol_miller, "A^3");
                d("Molar Refractivity", a.cmr, "cm^3/mol");
                d("Polar Surface Area", a.tpsa, "A^2");
                d("vdW Volume", a.vabc, "A^3");
                d("logP", a.xlogp2, "");
                d("Complexity", a.bertz, "");
                c.dialogManager.calculateDialog.getTextArea().val(e.join(""));
                c.dialogManager.calculateDialog.getElement().dialog("open")
            })
        });
        this.buttonTransform = new i.Button(c.id + "_button_transform", j.PERSPECTIVE, "Transform", function() {
            c.stateManager.setState(c.stateManager.STATE_VIEW)
        });
        this.buttonTransform.toggle = !0;
        this.buttonSettings = new i.Button(c.id + "_button_specifications", j.SETTINGS, "Visual Specifications", function() {
            c.dialogManager.specsDialog.update(c.specs);
            c.dialogManager.specsDialog.getElement().dialog("open")
        });
        this.buttonAnimation = new i.Button(c.id + "_button_animation", j.ANIMATION, "Animations", function() {
            c.stateManager.setState(c.stateManager.STATE_MOVE)
        });
        this.buttonClear = new i.Button(c.id + "_button_clear", j.CLEAR, "Clear", function() {
            c.historyManager.pushUndo(new d.ClearAction(c))
        });
        this.buttonClean = new i.Button(c.id + "_button_clean", j.OPTIMIZE, "Clean", function() {
            var a = c.molecules[0];
            a && g.optimize(a, {
                dimension: 3
            }, function(a) {
                c.historyManager.pushUndo(new d.SwitchMoleculeAction(c, a))
            })
        });
        this.makeScaleSet(this);
        this.makeHistorySet(this);
        this.makeMeasurementsSet(this)
    };
    l = e.ToolbarManager3D.prototype;
    l.write = function() {
        var a = ['\x3cdiv style\x3d"font-size:10px;"\x3e'],
            d = this.editor.id + "_main_group";
        a.push(this.historySet.getSource());
        a.push(this.scaleSet.getSource());
        a.push(this.buttonOpen.getSource());
        a.push(this.buttonSave.getSource());
        this.editor.useServices && (a.push(this.buttonSearch.getSource()), a.push(this.buttonCalculate.getSource()));
        a.push("\x3cbr\x3e");
        a.push(this.buttonTransform.getSource(d));
        a.push(this.buttonSettings.getSource());
        a.push(this.measurementsSet.getSource(d));
        a.push(this.buttonClear.getSource());
        this.editor.useServices && a.push(this.buttonClean.getSource());
        a.push("\x3c/div\x3e");
        s.getElementById(this.editor.id) ? n("#" + this.editor.id).before(a.join("")) : s.write(a.join(""))
    };
    l.setup = function() {
        this.buttonTransform.setup(!0);
        this.buttonSettings.setup();
        this.measurementsSet.setup();
        this.buttonClear.setup();
        this.editor.useServices && this.buttonClean.setup();
        this.historySet.setup();
        this.scaleSet.setup();
        this.buttonOpen.setup();
        this.buttonSave.setup();
        this.editor.useServices && (this.buttonSearch.setup(), this.buttonCalculate.setup());
        this.buttonTransform.select();
        this.buttonUndo.disable();
        this.buttonRedo.disable()
    };
    l.makeScaleSet = function(a) {
        this.scaleSet = new i.ButtonSet(a.editor.id + "_buttons_scale");
        this.scaleSet.toggle = !1;
        this.buttonScalePlus = new i.Button(a.editor.id + "_button_scale_plus", j.ZOOM_IN, "Increase Scale", function() {
            a.editor.mousewheel(null, -10)
        });
        this.scaleSet.buttons.push(this.buttonScalePlus);
        this.buttonScaleMinus =
            new i.Button(a.editor.id + "_button_scale_minus", j.ZOOM_OUT, "Decrease Scale", function() {
                a.editor.mousewheel(null, 10)
            });
        this.scaleSet.buttons.push(this.buttonScaleMinus)
    };
    l.makeHistorySet = function(a) {
        this.historySet = new i.ButtonSet(a.editor.id + "_buttons_history");
        this.historySet.toggle = !1;
        this.buttonUndo = new i.Button(a.editor.id + "_button_undo", j.UNDO, "Undo", function() {
            a.editor.historyManager.undo()
        });
        this.historySet.buttons.push(this.buttonUndo);
        this.buttonRedo = new i.Button(a.editor.id + "_button_redo",
            j.REDO, "Redo",
            function() {
                a.editor.historyManager.redo()
            });
        this.historySet.buttons.push(this.buttonRedo)
    };
    l.makeMeasurementsSet = function(a) {
        this.measurementsSet = new i.ButtonSet(a.editor.id + "_buttons_measurements");
        this.buttonDistance = new i.Button(a.editor.id + "_button_distance", j.DISTANCE, "Distance", function() {
            a.editor.stateManager.STATE_MEASURE.numToSelect = 2;
            a.editor.stateManager.STATE_MEASURE.reset();
            a.editor.stateManager.setState(a.editor.stateManager.STATE_MEASURE)
        });
        this.measurementsSet.buttons.push(this.buttonDistance);
        this.buttonAngle = new i.Button(a.editor.id + "_button_angle", j.ANGLE, "Angle", function() {
            a.editor.stateManager.STATE_MEASURE.numToSelect = 3;
            a.editor.stateManager.STATE_MEASURE.reset();
            a.editor.stateManager.setState(a.editor.stateManager.STATE_MEASURE)
        });
        this.measurementsSet.buttons.push(this.buttonAngle);
        this.buttonTorsion = new i.Button(a.editor.id + "_button_torsion", j.TORSION, "Torsion", function() {
            a.editor.stateManager.STATE_MEASURE.numToSelect = 4;
            a.editor.stateManager.STATE_MEASURE.reset();
            a.editor.stateManager.setState(a.editor.stateManager.STATE_MEASURE)
        });
        this.measurementsSet.buttons.push(this.buttonTorsion)
    }
})(ChemDoodle, ChemDoodle.iChemLabs, ChemDoodle.io, ChemDoodle.structures, ChemDoodle.uis.actions, ChemDoodle.uis.gui, ChemDoodle.uis.gui.imageDepot, ChemDoodle.uis.gui.desktop, ChemDoodle.uis.tools, ChemDoodle.uis.states, ChemDoodle.lib.jQuery, document);
(function(a, g, l, k) {
    g.SpecsDialog = function(a, e) {
        this.editor = a;
        this.id = this.editor.id + e
    };
    a = g.SpecsDialog.prototype = new g.Dialog;
    a.title = "Visual Specifications";
    a.makeProjectionSet = function(a) {
        this.projectionSet = new g.ButtonSet(a.id + "_projection_group");
        this.buttonPerspective = new g.TextButton(a.id + "_button_Perspective", "Perspective", function() {
            a.editor.specs.projectionPerspective_3D = !0;
            a.editor.updateScene();
            a.update(editor.specs)
        });
        this.projectionSet.buttons.push(this.buttonPerspective);
        this.buttonOrthographic =
            new g.TextButton(a.id + "_button_Orthographic", "Orthographic", function() {
                a.editor.specs.projectionPerspective_3D = !1;
                a.editor.updateScene(a);
                a.update(editor.specs)
            });
        this.projectionSet.buttons.push(this.buttonOrthographic)
    };
    a.makeAtomColorSet = function(a) {
        this.atomColorSet = new g.ButtonSet(a.id + "_atom_color_group");
        this.atomColorSet.toggle = !0;
        this.buttonJmolColors = new g.TextButton(a.id + "_button_Jmol_Colors", "Jmol", function() {
            a.editor.specs.atoms_useJMOLColors = !0;
            a.editor.specs.atoms_usePYMOLColors = !1;
            a.editor.updateScene();
            a.update(editor.specs)
        });
        this.atomColorSet.buttons.push(this.buttonJmolColors);
        this.buttonPymolColors = new g.TextButton(a.id + "_button_PyMOL_Colors", "PyMOL", function() {
            a.editor.specs.atoms_usePYMOLColors = !0;
            a.editor.specs.atoms_useJMOLColors = !1;
            a.editor.updateScene();
            a.update(editor.specs)
        });
        this.atomColorSet.buttons.push(this.buttonPymolColors)
    };
    a.makeBondColorSet = function(a) {
        this.bondColorSet = new g.ButtonSet(a.id + "_bond_color_group");
        this.bondColorSet.toggle = !0;
        this.buttonJmolBondColors =
            new g.TextButton(a.id + "_button_Jmol_Bond_Colors", "Jmol", function() {
                a.editor.specs.bonds_useJMOLColors = !0;
                a.editor.specs.bonds_usePYMOLColors = !1;
                a.editor.updateScene();
                a.update(editor.specs)
            });
        this.bondColorSet.buttons.push(this.buttonJmolBondColors);
        this.buttonPymolBondColors = new g.TextButton(a.id + "_button_PyMOL_Bond_Colors", "PyMOL", function() {
            a.editor.specs.bonds_usePYMOLColors = !0;
            a.editor.specs.bonds_useJMOLColors = !1;
            a.editor.updateScene();
            a.update(editor.specs)
        });
        this.bondColorSet.buttons.push(this.buttonPymolBondColors)
    };
    a.makeCompassPositionSet = function(a) {
        this.compassPositionSet = new g.ButtonSet(a.id + "_compass_position_group");
        this.buttonCompassCorner = new g.TextButton(a.id + "_button_compass_corner", "Corner", function() {
            a.editor.specs.compass_type_3D = 0;
            a.editor.specs.compass_size_3D = 50;
            a.editor.setupScene();
            a.editor.updateScene();
            a.update(editor.specs)
        });
        this.compassPositionSet.buttons.push(this.buttonCompassCorner);
        this.buttonCompassOrigin = new g.TextButton(a.id + "_button_compass_origin", "Origin", function() {
            a.editor.specs.compass_type_3D =
                1;
            a.editor.specs.compass_size_3D = 150;
            a.editor.setupScene();
            a.editor.updateScene();
            a.update(editor.specs)
        });
        this.compassPositionSet.buttons.push(this.buttonCompassOrigin)
    };
    a.makeFogModeSet = function(a) {
        this.fogModeSet = new g.ButtonSet(a.id + "_fog_mode_group");
        this.buttonFogMode0 = new g.TextButton(a.id + "_button_fog_mode_0", "No Fogging", function() {
            a.editor.specs.fog_mode_3D = 0;
            a.editor.updateScene();
            a.update(editor.specs)
        });
        this.fogModeSet.buttons.push(this.buttonFogMode0);
        this.buttonFogMode1 = new g.TextButton(a.id +
            "_button_fog_mode_1", "Linear",
            function() {
                a.editor.specs.fog_mode_3D = 1;
                a.editor.updateScene();
                a.update(editor.specs)
            });
        this.fogModeSet.buttons.push(this.buttonFogMode1);
        this.buttonFogMode2 = new g.TextButton(a.id + "_button_fog_mode_2", "Exponential", function() {
            a.editor.specs.fog_mode_3D = 2;
            a.editor.updateScene();
            a.update(editor.specs)
        });
        this.fogModeSet.buttons.push(this.buttonFogMode2);
        this.buttonFogMode3 = new g.TextButton(a.id + "_button_fog_mode_3", "Exponential\x26sup2;", function() {
            a.editor.specs.fog_mode_3D =
                3;
            a.editor.updateScene();
            a.update(editor.specs)
        });
        this.fogModeSet.buttons.push(this.buttonFogMode3)
    };
    a.setup = function(a, e) {
        this.makeProjectionSet(this);
        this.bgcolor = new g.ColorPicker(this.id + "_bgcolor", "Background Color: ", function(g) {
            e.specs.backgroundColor = g;
            e.setupScene();
            e.repaint();
            a.update(e.specs)
        });
        this.makeFogModeSet(this);
        this.fogcolor = new g.ColorPicker(this.id + "_fogcolor", "Fog Color: ", function(g) {
            e.specs.fog_color_3D = g;
            e.setupScene();
            e.repaint();
            a.update(e.specs)
        });
        this.atomsDisplayToggle =
            new g.CheckBox(this.id + "_atoms_display_toggle", "Display atoms", function() {
                e.specs.atoms_display = !e.specs.atoms_display;
                e.updateScene();
                a.update(e.specs)
            }, !0);
        this.atomcolor = new g.ColorPicker(this.id + "_atomcolor", "Atom Color: ", function(g) {
            e.specs.atoms_color = g;
            e.setupScene();
            e.repaint();
            a.update(e.specs)
        });
        this.makeAtomColorSet(this);
        this.atomColorSetToggle = new g.CheckBox(this.id + "_atom_color_group_toggle", "Color Schemes", function() {
            a.buttonJmolColors.getElement().prop("disabled") ? (a.atomColorSet.enable(),
                e.specs.atoms_useJMOLColors = !0) : (a.atomColorSet.disable(), e.specs.atoms_useJMOLColors = !1, e.specs.atoms_usePYMOLColors = !1, a.buttonJmolColors.uncheck(), a.buttonPymolColors.uncheck());
            e.updateScene();
            a.update(e.specs)
        }, !1);
        this.vdwToggle = new g.CheckBox(this.id + "_vdw_toggle", "Use VDW Diameters", function() {
            e.specs.atoms_useVDWDiameters_3D = !e.specs.atoms_useVDWDiameters_3D;
            e.updateScene();
            a.update(e.specs)
        }, !1);
        this.atomsNonBondedAsStarsToggle = new g.CheckBox(this.id + "_non_bonded_as_stars_toggle", "Non-bonded as stars",
            function() {
                e.specs.atoms_nonBondedAsStars_3D = !e.specs.atoms_nonBondedAsStars_3D;
                e.updateScene();
                a.update(e.specs)
            }, !1);
        this.displayLabelsToggle = new g.CheckBox(this.id + "_display_labels_toggle", "Atom labels", function() {
            e.specs.atoms_displayLabels_3D = !e.specs.atoms_displayLabels_3D;
            e.updateScene();
            a.update(e.specs)
        }, !1);
        this.bondsDisplayToggle = new g.CheckBox(this.id + "_bonds_display_toggle", "Display bonds", function() {
            e.specs.bonds_display = !e.specs.bonds_display;
            e.updateScene();
            a.update(e.specs)
        }, !0);
        this.bondcolor = new g.ColorPicker(this.id + "_bondcolor", "Bond Color: ", function(g) {
            e.specs.bonds_color = g;
            e.setupScene();
            e.repaint();
            a.update(e.specs)
        });
        this.makeBondColorSet(this);
        this.bondColorSetToggle = new g.CheckBox(this.id + "_bond_color_group_toggle", "Color Schemes", function() {
            a.buttonJmolBondColors.getElement().prop("disabled") ? (a.bondColorSet.enable(), e.specs.bonds_useJMOLColors = !0) : (a.bondColorSet.disable(), e.specs.bonds_useJMOLColors = !1, e.specs.bonds_usePYMOLColors = !1, a.buttonJmolBondColors.uncheck(),
                a.buttonPymolBondColors.uncheck());
            e.updateScene();
            a.update(e.specs)
        }, !1);
        this.bondOrderToggle = new g.CheckBox(this.id + "_bond_order_toggle", "Show order", function() {
            e.specs.bonds_showBondOrders_3D = !e.specs.bonds_showBondOrders_3D;
            e.updateScene();
            a.update(e.specs)
        }, !1);
        this.bondsRenderAsLinesToggle = new g.CheckBox(this.id + "_bonds_render_as_lines_toggle", "Render as lines", function() {
            e.specs.bonds_renderAsLines_3D = !e.specs.bonds_renderAsLines_3D;
            e.updateScene();
            a.update(e.specs)
        }, !1);
        this.ribbonsToggle =
            new g.CheckBox(this.id + "_ribbons_toggle", "Ribbons", function() {
                e.specs.proteins_displayRibbon = !e.specs.proteins_displayRibbon;
                e.updateScene();
                a.update(e.specs)
            }, !1);
        this.backboneToggle = new g.CheckBox(this.id + "_backbone_toggle", "Backbone", function() {
            e.specs.proteins_displayBackbone = !e.specs.proteins_displayBackbone;
            e.updateScene();
            a.update(e.specs)
        }, !1);
        this.pipeplankToggle = new g.CheckBox(this.id + "_pipeplank_toggle", "Pipe and Plank", function() {
            e.specs.proteins_displayPipePlank = !e.specs.proteins_displayPipePlank;
            e.updateScene();
            a.update(e.specs)
        }, !1);
        this.cartoonizeToggle = new g.CheckBox(this.id + "_cartoonize_toggle", "Cartoonize", function() {
            e.specs.proteins_ribbonCartoonize = !e.specs.proteins_ribbonCartoonize;
            e.updateScene();
            a.update(e.specs)
        }, !1);
        this.colorByChainToggle = new g.CheckBox(this.id + "_color_by_chain_toggle", "Color by Chain", function() {
            e.specs.macro_colorByChain = !e.specs.macro_colorByChain;
            e.updateScene();
            a.update(e.specs)
        }, !1);
        this.proteinColorToggle = new g.CheckBox(this.id + "_protein_color_toggle",
            "Color by Segment",
            function() {
                a.proteinColorToggle.checked ? (e.specs.proteins_residueColor = "none", a.proteinColorToggle.uncheck(), l("#proteinColors").prop("disabled", !0)) : (a.proteinColorToggle.check(), l("#proteinColors").removeAttr("disabled"), e.specs.proteins_residueColor = l("#proteinColors").val());
                e.updateScene();
                a.update(e.specs)
            }, !1);
        this.nucleicAcidColorToggle = new g.CheckBox(this.id + "_nucleic_acid_color_toggle", "Color by Segment", function() {
            a.nucleicAcidColorToggle.checked ? (e.specs.nucleics_residueColor =
                "none", a.nucleicAcidColorToggle.uncheck(), l("#nucleicColors").prop("disabled", !0)) : (a.nucleicAcidColorToggle.check(), l("#nucleicColors").removeAttr("disabled"), e.specs.nucleics_residueColor = l("#nucleicColors").val());
            e.updateScene();
            a.update(e.specs)
        }, !1);
        this.shapecolor = new g.ColorPicker(this.id + "_shapecolor", "Shape Color: ", function(g) {
            e.specs.shapes_color = g;
            e.setupScene();
            e.repaint();
            a.update(e.specs)
        });
        this.displayCompassToggle = new g.CheckBox(this.id + "_display_compass_toggle", "Display Compass",
            function() {
                a.displayCompassToggle.checked ? (e.specs.compass_display = !1, e.setupScene(), e.updateScene(), a.compassPositionSet.disable(), a.buttonCompassCorner.uncheck(), a.displayCompassToggle.uncheck()) : (e.specs.compass_display = !0, e.specs.compass_type_3D = 0, e.specs.compass_size_3D = 50, a.compassPositionSet.enable(), a.displayCompassToggle.check(), a.buttonCompassCorner.check(), e.setupScene(), e.updateScene());
                a.update(e.specs)
            }, !1);
        this.makeCompassPositionSet(this);
        var j = [];
        j.push('\x3cdiv style\x3d"font-size:12px;text-align:left;overflow-y:scroll;height:300px;" id\x3d"');
        j.push(this.id);
        j.push('" title\x3d"');
        j.push(this.title);
        j.push('"\x3e');
        this.message && (j.push("\x3cp\x3e"), j.push(this.message), j.push("\x3c/p\x3e"));
        j.push("\x3cp\x3e\x3cstrong\x3eRepresentation\x3c/strong\x3e");
        j.push('\x3cp\x3e\x3cselect id\x3d"reps"\x3e\x3coption value\x3d"Ball and Stick"\x3eBall and Stick\x3c/option\x3e\x3coption value\x3d"van der Waals Spheres"\x3evdW Spheres\x3c/option\x3e\x3coption value\x3d"Stick"\x3eStick\x3c/option\x3e\x3coption value\x3d"Wireframe"\x3eWireframe\x3c/option\x3e\x3coption value\x3d"Line"\x3eLine\x3c/option\x3e\x3c/select\x3e\x3c/p\x3e');
        j.push("\x3chr\x3e\x3cstrong\x3eCanvas\x3c/strong\x3e");
        j.push(this.bgcolor.getSource());
        j.push("\x3cp\x3eProjection: ");
        j.push(this.projectionSet.getSource(this.id + "_projection_group"));
        j.push("\x3c/p\x3e\x3cp\x3eFog Mode: ");
        j.push(this.fogModeSet.getSource(this.id + "_fog_mode_group"));
        j.push(this.fogcolor.getSource());
        j.push('\x3c/p\x3e\x3cp\x3eFog start: \x3cinput type\x3d"number" id\x3d"fogstart" min\x3d"0" max\x3d"100" value\x3d"0"\x3e %\x3c/p\x3e');
        j.push('\x3c/p\x3e\x3cp\x3eFog end: \x3cinput type\x3d"number" id\x3d"fogend" min\x3d"0" max\x3d"100" value\x3d"100"\x3e %\x3c/p\x3e');
        j.push('\x3c/p\x3e\x3cp\x3eFog density: \x3cinput type\x3d"number" id\x3d"fogdensity" min\x3d"0" max\x3d"100" value\x3d"100"\x3e %\x3c/p\x3e');
        j.push("\x3chr\x3e\x3cstrong\x3eAtoms\x3c/strong\x3e\x3cp\x3e");
        j.push(this.atomsDisplayToggle.getSource());
        j.push("\x3c/p\x3e\x3cp\x3e");
        j.push(this.atomcolor.getSource());
        j.push('\x3c/p\x3e\x3cp\x3eSphere diameter: \x3cinput type\x3d"number" id\x3d"spherediameter" min\x3d"0" max\x3d"40" value\x3d"0.8" step\x3d"0.01"\x3e Angstroms\x3c/p\x3e');
        j.push(this.vdwToggle.getSource());
        j.push('\x3c/p\x3e\x3cp\x3eVDW Multiplier: \x3cinput type\x3d"number" id\x3d"vdwMultiplier" min\x3d"0" max\x3d"100" value\x3d"100"\x3e %\x3c/p\x3e');
        j.push(this.atomsNonBondedAsStarsToggle.getSource());
        j.push("\x3c/p\x3e\x3cp\x3e");
        j.push(this.displayLabelsToggle.getSource());
        j.push("\x3c/p\x3e\x3cp\x3e");
        j.push(this.atomColorSetToggle.getSource());
        j.push(": ");
        j.push(this.atomColorSet.getSource(this.id + "_atom_color_group"));
        j.push("\x3c/p\x3e\x3chr\x3e\x3cstrong\x3eBonds\x3c/strong\x3e\x3cp\x3e");
        j.push(this.bondsDisplayToggle.getSource());
        j.push("\x3c/p\x3e\x3cp\x3e");
        j.push(this.bondcolor.getSource());
        j.push(this.bondColorSetToggle.getSource());
        j.push(": ");
        j.push(this.bondColorSet.getSource(this.id + "_bond_color_group"));
        j.push("\x3c/p\x3e\x3cp\x3e");
        j.push(this.bondOrderToggle.getSource());
        j.push('\x3c/p\x3e\x3cp\x3eCylinder diameter: \x3cinput type\x3d"number" id\x3d"cylinderdiameter" min\x3d"0" max\x3d"40" value\x3d"0.3" step\x3d"0.01"\x3e Angstroms\x3c/p\x3e');
        j.push("\x3c/p\x3e\x3chr\x3e\x3cstrong\x3eProteins\x3c/strong\x3e");
        j.push("\x3cp\x3e");
        j.push(this.ribbonsToggle.getSource());
        j.push("\x3c/p\x3e\x3cp\x3e");
        j.push(this.backboneToggle.getSource());
        j.push("\x3c/p\x3e\x3cp\x3e");
        j.push(this.pipeplankToggle.getSource());
        j.push("\x3c/p\x3e\x3cp\x3e");
        j.push(this.cartoonizeToggle.getSource());
        j.push("\x3c/p\x3e\x3cp\x3e");
        j.push(this.colorByChainToggle.getSource());
        j.push("\x3c/p\x3e\x3cp\x3e");
        j.push(this.proteinColorToggle.getSource());
        j.push('\x3cselect id\x3d"proteinColors" disabled\x3e\x3coption value\x3d"amino"\x3eAmino\x3c/option\x3e\x3coption value\x3d"shapely"\x3eShapely\x3c/option\x3e\x3coption value\x3d"polarity"\x3ePolarity\x3c/option\x3e\x3coption value\x3d"rainbow"\x3eRainbow\x3c/option\x3e\x3coption value\x3d"acidity"\x3eAcidity\x3c/option\x3e\x3c/select\x3e\x3c/p\x3e');
        j.push("\x3chr\x3e\x3cstrong\x3eNucleic Acids\x3c/strong\x3e\x3cp\x3e");
        j.push(this.nucleicAcidColorToggle.getSource());
        j.push(": ");
        j.push('\x3cselect id\x3d"nucleicColors" disabled\x3e\x3coption value\x3d"shapely"\x3eShapely\x3c/option\x3e\x3coption value\x3d"rainbow"\x3eRainbow\x3c/option\x3e\x3c/select\x3e\x3c/p\x3e');
        j.push("\x3chr\x3e\x3cstrong\x3eShapes\x3c/strong\x3e\x3cp\x3e");
        j.push(this.shapecolor.getSource());
        j.push("\x3c/p\x3e\x3chr\x3e\x3cstrong\x3eCompass\x3c/strong\x3e");
        j.push("\x3cp\x3e");
        j.push(this.displayCompassToggle.getSource());
        j.push(": ");
        j.push(this.compassPositionSet.getSource(this.id + "_compass_position_group"));
        j.push("\x3c/p\x3e");
        j.push("\x3c/div\x3e");
        this.afterMessage && (j.push("\x3cp\x3e"), j.push(this.afterMessage), j.push("\x3c/p\x3e"));
        k.writeln(j.join(""));
        this.getElement().dialog({
            autoOpen: !1,
            position: {
                my: "center",
                at: "center",
                of: k
            },
            buttons: a.buttons,
            width: 500,
            height: 300,
            open: function() {
                l(this).height(300);
                l(this).width(478);
                l(this).dialog("option", "position", "center")
            }
        });
        this.bgcolor.setup();
        this.fogcolor.setup();
        this.atomcolor.setup();
        this.bondcolor.setup();
        this.shapecolor.setup();
        l("#reps").change(function() {
            e.specs.set3DRepresentation(this.options[this.selectedIndex].value);
            e.updateScene();
            a.update(e.specs)
        });
        l("#proteinColors").change(function() {
            switch (this.selectedIndex) {
                case 0:
                    e.specs.proteins_residueColor = "amino";
                    break;
                case 1:
                    e.specs.proteins_residueColor = "shapely";
                    break;
                case 2:
                    e.specs.proteins_residueColor = "polarity";
                    break;
                case 3:
                    e.specs.proteins_residueColor =
                        "rainbow";
                    break;
                case 4:
                    e.specs.proteins_residueColor = "acidity"
            }
            e.updateScene();
            a.update(e.specs)
        });
        l("#nucleicColors").change(function() {
            switch (this.selectedIndex) {
                case 0:
                    e.specs.nucleics_residueColor = "shapely";
                    break;
                case 1:
                    e.specs.nucleics_residueColor = "rainbow"
            }
            e.updateScene();
            a.update(e.specs)
        });
        l("#fogstart").change(function() {
            e.specs.fog_start_3D = parseInt(this.value) / 100;
            e.updateScene()
        });
        l("#fogend").change(function() {
            e.specs.fog_end_3D = parseInt(this.value) / 100;
            e.updateScene()
        });
        l("#fogdensity").change(function() {
            e.specs.fog_density_3D =
                parseInt(this.value) / 100;
            e.updateScene()
        });
        l("#vdwMultiplier").change(function() {
            e.specs.atoms_vdwMultiplier_3D = parseInt(this.value) / 100;
            e.updateScene()
        });
        l("#spherediameter").change(function() {
            e.specs.atoms_sphereDiameter_3D = parseFloat(this.value);
            e.updateScene()
        });
        l("#cylinderdiameter").change(function() {
            e.specs.bonds_cylinderDiameter_3D = parseFloat(this.value);
            e.updateScene()
        });
        this.projectionSet.setup();
        this.fogModeSet.setup();
        this.atomsDisplayToggle.setup();
        this.vdwToggle.setup();
        this.atomsNonBondedAsStarsToggle.setup();
        this.displayLabelsToggle.setup();
        this.atomColorSet.setup();
        this.atomColorSet.disable();
        this.atomColorSetToggle.setup();
        this.bondsDisplayToggle.setup();
        this.bondColorSet.setup();
        this.bondColorSet.disable();
        this.bondColorSetToggle.setup();
        this.bondOrderToggle.setup();
        this.ribbonsToggle.setup();
        this.backboneToggle.setup();
        this.pipeplankToggle.setup();
        this.cartoonizeToggle.setup();
        this.colorByChainToggle.setup();
        this.proteinColorToggle.setup();
        this.nucleicAcidColorToggle.setup();
        this.displayCompassToggle.setup();
        this.compassPositionSet.setup();
        this.compassPositionSet.disable()
    };
    a.update = function(a) {
        this.bgcolor.setColor(a.backgroundColor);
        this.fogcolor.setColor(a.fog_color_3D);
        this.atomcolor.setColor(a.atoms_color);
        this.bondcolor.setColor(a.bonds_color);
        this.shapecolor.setColor(a.shapes_color);
        a.projectionPerspective_3D ? this.buttonPerspective.select() : this.buttonOrthographic.select();
        switch (a.fog_mode_3D) {
            case 1:
                this.buttonFogMode0.uncheck();
                this.buttonFogMode1.check();
                this.buttonFogMode2.uncheck();
                this.buttonFogMode3.uncheck();
                break;
            case 2:
                this.buttonFogMode0.uncheck();
                this.buttonFogMode1.uncheck();
                this.buttonFogMode2.check();
                this.buttonFogMode3.uncheck();
                break;
            case 3:
                this.buttonFogMode0.uncheck();
                this.buttonFogMode1.uncheck();
                this.buttonFogMode2.uncheck();
                this.buttonFogMode3.check();
                break;
            default:
                this.buttonFogMode0.check(), this.buttonFogMode1.uncheck(), this.buttonFogMode2.uncheck(), this.buttonFogMode3.uncheck()
        }
        l("#fogstart").val(100 * a.fog_start_3D);
        l("#fogend").val(100 * a.fog_end_3D);
        l("#fogdensity").val(100 * a.fog_density_3D);
        a.atoms_display ? this.atomsDisplayToggle.check() : this.atomsDisplayToggle.uncheck();
        a.atoms_useVDWDiameters_3D ? (this.vdwToggle.check(), l("#spherediameter").prop("disabled", !0), l("#vdwMultiplier").prop("disabled", !1), l("#vdwMultiplier").val(100 * a.atoms_vdwMultiplier_3D)) : (this.vdwToggle.uncheck(), l("#spherediameter").prop("disabled", !1), l("#spherediameter").val(a.atoms_sphereDiameter_3D), l("#vdwMultiplier").prop("disabled", !0));
        a.atoms_useJMOLColors || a.atoms_usePYMOLColors ? (this.atomColorSetToggle.check(),
            this.atomColorSet.enable(), a.atoms_useJMOLColors ? (this.buttonJmolColors.check(), this.buttonPymolColors.uncheck()) : a.atoms_usePYMOLColors && (this.buttonJmolColors.uncheck(), this.buttonPymolColors.check())) : (this.atomColorSetToggle.uncheck(), this.buttonPymolColors.uncheck(), this.buttonJmolColors.uncheck(), this.atomColorSet.disable());
        a.atoms_nonBondedAsStars_3D ? this.atomsNonBondedAsStarsToggle.check() : this.atomsNonBondedAsStarsToggle.uncheck();
        a.atoms_displayLabels_3D ? this.displayLabelsToggle.check() :
            this.displayLabelsToggle.uncheck();
        a.bonds_display ? this.bondsDisplayToggle.check() : this.bondsDisplayToggle.uncheck();
        a.bonds_useJMOLColors || a.bonds_usePYMOLColors ? (this.bondColorSetToggle.check(), this.bondColorSet.enable(), a.bonds_useJMOLColors ? (this.buttonJmolBondColors.check(), this.buttonPymolBondColors.uncheck()) : a.atoms_usePYMOLColors && (this.buttonJmolBondColors.uncheck(), this.buttonPymolBondColors.check())) : (this.bondColorSetToggle.uncheck(), this.buttonPymolBondColors.uncheck(), this.buttonJmolBondColors.uncheck(),
            this.bondColorSet.disable());
        a.bonds_showBondOrders_3D ? this.bondOrderToggle.check() : this.bondOrderToggle.uncheck();
        l("#cylinderdiameter").val(a.bonds_cylinderDiameter_3D);
        a.proteins_displayRibbon ? this.ribbonsToggle.check() : this.ribbonsToggle.uncheck();
        a.proteins_displayBackbone ? this.backboneToggle.check() : this.backboneToggle.uncheck();
        a.proteins_displayPipePlank ? this.pipeplankToggle.check() : this.pipeplankToggle.uncheck();
        a.proteins_ribbonCartoonize ? this.cartoonizeToggle.check() : this.cartoonizeToggle.uncheck();
        a.macro_colorByChain ? this.colorByChainToggle.check() : this.colorByChainToggle.uncheck();
        switch (a.proteins_residueColor) {
            case "amino":
                this.proteinColorToggle.check();
                l("#proteinColors").val("amino");
                break;
            case "shapely":
                this.proteinColorToggle.check();
                l("#proteinColors").val("shapely");
                break;
            case "polarity":
                this.proteinColorToggle.check();
                l("#proteinColors").val("polarity");
                break;
            case "rainbow":
                this.proteinColorToggle.check();
                l("#proteinColors").val("rainbow");
                break;
            case "acidity":
                this.proteinColorToggle.check();
                l("#proteinColors").val("acidity");
                break;
            default:
                this.proteinColorToggle.uncheck(), l("#proteinColors").prop("disabled", !0)
        }
        switch (a.nucleics_residueColor) {
            case "shapely":
                this.nucleicAcidColorToggle.check();
                l("#nucleicColors").val("shapely");
                break;
            case "rainbow":
                this.nucleicAcidColorToggle.check();
                l("#nucleicColors").val("rainbow");
                break;
            default:
                this.nucleicAcidColorToggle.uncheck(), l("#nucleicColors").prop("disabled", !0)
        }!0 == a.compass_display ? (this.compassPositionSet.enable(), 0 == a.compass_type_3D ?
            (this.buttonCompassCorner.check(), this.buttonCompassOrigin.uncheck()) : (this.buttonCompassOrigin.check(), this.buttonCompassCorner.uncheck())) : (this.compassPositionSet.disable(), this.buttonCompassCorner.uncheck(), this.buttonCompassOrigin.uncheck())
    }
})(ChemDoodle, ChemDoodle.uis.gui.desktop, ChemDoodle.lib.jQuery, document);
(function(a, g, l, k, d, e, j, i, p, h, n) {
    a.EditorCanvas3D = function(a, c, g, h) {
        this.isMobile = void 0 === h.isMobile ? l.supports_touch() : h.isMobile;
        this.useServices = void 0 === h.useServices ? !1 : h.useServices;
        this.includeToolbar = void 0 === h.includeToolbar ? !0 : h.includeToolbar;
        this.oneMolecule = !0;
        this.id = a;
        this.toolbarManager = new d.gui.ToolbarManager3D(this);
        if (this.includeToolbar) {
            this.toolbarManager.write();
            var j = this;
            document.getElementById(this.id) ? i("#" + a + "_button_calculate").load(function() {
                    j.toolbarManager.setup()
                }) :
                i(n).load(function() {
                    j.toolbarManager.setup()
                });
            this.dialogManager = new d.gui.DialogManager(this)
        }
        this.stateManager = new d.states.StateManager3D(this);
        this.historyManager = new d.actions.HistoryManager(this);
        a && this.create(a, c, g);
        a = new e.VisualSpecifications;
        a.atoms_useVDWDiameters_3D = !1;
        a.atoms_sphereDiameter_3D = 2;
        this.helpButton = new e.Atom("C", 0, 0, 0);
        this.helpButton.isHover = !0;
        this.helpButton.specs = a;
        this.specs.backgroundColor = "#000";
        this.specs.shapes_color = "#fff";
        this.isHelp = !1;
        this.setupScene();
        this.repaint()
    };
    a = a.EditorCanvas3D.prototype = new a._Canvas3D;
    a.defaultmousedown = a.mousedown;
    a.defaultmouseup = a.mouseup;
    a.defaultrightmousedown = a.rightmousedown;
    a.defaultdrag = a.drag;
    a.defaultmousewheel = a.mousewheel;
    a.drawChildExtras = function(a) {
        var c = a.getUniformLocation(a.program, "u_projection_matrix"),
            d = h.create(),
            e = new k.TextImage;
        e.init(a);
        var g = new k.TextMesh;
        g.init(a);
        var i = this.height / 20,
            j = p.tan(this.specs.projectionPerspectiveVerticalFieldOfView_3D / 360 * p.PI),
            l = i / j,
            n = p.max(l - i, 0.1),
            A = this.width / this.height,
            x = l / this.height * j,
            j = j * l,
            E = -j,
            i = h.ortho(A * E, A * j, E, j, n, l + i, []);
        a.uniformMatrix4fv(c, !1, i);
        a.fogging.setMode(0);
        this.hideHelp || (c = (this.width - 40) * x, i = (this.height - 40) * x, h.translate(h.identity([]), [c, i, -l], d), a.material.setTempColors(this.specs.bonds_materialAmbientColor_3D, void 0, this.specs.bonds_materialSpecularColor_3D, this.specs.bonds_materialShininess_3D), a.material.setDiffuseColor("#00ff00"), a.modelViewMatrix = h.multiply(d, a.rotationMatrix, []), a.sphereBuffer.bindBuffers(this.gl), this.helpButton.render(a,
            void 0, !0), this.isHelp && (a.sphereBuffer.bindBuffers(a), a.blendFunc(a.SRC_ALPHA, a.ONE), a.material.setTempColors("#000000", void 0, "#000000", 0), a.enable(a.BLEND), a.depthMask(!1), a.material.setAlpha(0.4), this.helpButton.renderHighlight(a, void 0), a.depthMask(!0), a.disable(a.BLEND), a.blendFuncSeparate(a.SRC_ALPHA, a.ONE_MINUS_SRC_ALPHA, a.ONE, a.ONE_MINUS_SRC_ALPHA)), a.enable(a.BLEND), a.depthMask(!1), e.updateFont(a, 14.1, ["sans-serif"], !1, !1, !0), e.useTexture(a), c = {
            position: [],
            texCoord: [],
            translation: []
        }, e.pushVertexData("?", [0, 0, 0], 0, c), g.storeData(a, c.position, c.texCoord, c.translation), a.enableVertexAttribArray(a.shader.vertexTexCoordAttribute), c = h.multiply(d, h.identity([]), []), a.setMatrixUniforms(c), e.useTexture(a), g.render(a), a.disableVertexAttribArray(a.shader.vertexTexCoordAttribute), a.disable(a.BLEND), a.depthMask(!0));
        this.paidToHideTrademark || (a.enable(this.gl.BLEND), a.enableVertexAttribArray(a.shader.vertexTexCoordAttribute), e.updateFont(a, 14.1, ["sans-serif"], !1, !1, !0), e.useTexture(a), i = e.textWidth("ChemDoodle"),
            c = {
                position: [],
                texCoord: [],
                translation: []
            }, e.pushVertexData("ChemDoodle", [0, 0, 0], 0, c), g.storeData(a, c.position, c.texCoord, c.translation), c = (this.width - i - 30) * x, i = (-this.height + 24) * x, h.translate(h.identity([]), [c, i, -l], d), c = h.multiply(d, a.rotationMatrix, []), a.setMatrixUniforms(c), g.render(a), e.updateFont(a, 8, ["sans-serif"], !1, !1, !0), e.useTexture(a), c = {
                position: [],
                texCoord: [],
                translation: []
            }, e.pushVertexData("\u00ae", [0, 0, 0], 0, c), g.storeData(a, c.position, c.texCoord, c.translation), c = (this.width - 24) * x,
            i = (-this.height + 30) * x, h.translate(h.identity([]), [c, i, -l], d), c = h.multiply(d, a.rotationMatrix, []), a.setMatrixUniforms(c), g.render(a), a.disableVertexAttribArray(a.shader.vertexTexCoordAttribute), a.disable(a.BLEND))
    };
    a.click = function(a) {
        this.stateManager.getCurrentState().click(a)
    };
    a.rightclick = function(a) {
        this.stateManager.getCurrentState().rightclick(a)
    };
    a.dblclick = function(a) {
        this.stateManager.getCurrentState().dblclick(a)
    };
    a.mousedown = function(a) {
        this.stateManager.getCurrentState().mousedown(a)
    };
    a.rightmousedown = function(a) {
        this.stateManager.getCurrentState().rightmousedown(a)
    };
    a.mousemove = function(a) {
        this.isHelp = !1;
        10 > a.p.distance(new e.Point(this.width - 20, 20)) && (this.isHelp = !0);
        this.stateManager.getCurrentState().mousemove(a)
    };
    a.mouseout = function(a) {
        this.stateManager.getCurrentState().mouseout(a)
    };
    a.mouseover = function(a) {
        this.stateManager.getCurrentState().mouseover(a)
    };
    a.mouseup = function(a) {
        this.stateManager.getCurrentState().mouseup(a)
    };
    a.rightmouseup = function(a) {
        this.stateManager.getCurrentState().rightmouseup(a)
    };
    a.mousewheel = function(a, c) {
        this.stateManager.getCurrentState().mousewheel(a, c)
    };
    a.drag = function(a) {
        this.stateManager.getCurrentState().drag(a)
    };
    a.keydown = function(a) {
        this.stateManager.getCurrentState().keydown(a)
    };
    a.keypress = function(a) {
        this.stateManager.getCurrentState().keypress(a)
    };
    a.keyup = function(a) {
        this.stateManager.getCurrentState().keyup(a)
    }
})(ChemDoodle, ChemDoodle.extensions, ChemDoodle.featureDetection, ChemDoodle.structures.d3, ChemDoodle.uis, ChemDoodle.structures, ChemDoodle.uis.tools, ChemDoodle.lib.jQuery,
    Math, ChemDoodle.lib.mat4, window);