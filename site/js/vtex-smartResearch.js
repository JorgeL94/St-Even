/**
 *	Pesquisa Inteligente
 *	@description Execurar buscas sem recarregar a página
 *	@author Carlos Vinicius [QUATRO DIGITAL]
 *	@version 3.10
 *	@license Todos os direitos reservados
 */
"function" !== typeof String.prototype.replaceSpecialChars && (String.prototype.replaceSpecialChars = function() {
    var s = {"\u00e7": "c", "\u00e6": "ae", "\u0153": "oe", "\u00e1": "a", "\u00e9": "e", "\u00ed": "i", "\u00f3": "o", "\u00fa": "u", "\u00e0": "a", "\u00e8": "e", "\u00ec": "i", "\u00f2": "o", "\u00f9": "u", "\u00e4": "a", "\u00eb": "e", "\u00ef": "i", "\u00f6": "o", "\u00fc": "u", "\u00ff": "y", "\u00e2": "a", "\u00ea": "e", "\u00ee": "i", "\u00f4": "o", "\u00fb": "u", "\u00e5": "a", "\u00e3": "a", "\u00f8": "o", "\u00f5": "o", u: "u", "\u00c1": "A", "\u00c9": "E",
        "\u00cd": "I", "\u00d3": "O", "\u00da": "U", "\u00ca": "E", "\u00d4": "O", "\u00dc": "U", "\u00c3": "A", "\u00d5": "O", "\u00c0": "A", "\u00c7": "C"};
    return this.replace(/[\u00e0-\u00fa]/g, function(e) {
        return"undefined" != typeof s[e] ? s[e] : e
    })
});
"function" !== typeof String.prototype.trim && (String.prototype.trim = function() {
    return this.replace(/^\s+|\s+$/g, "")
});
(function() {
    jQuery.fn.vtexSmartResearch = function(s) {
        $this = jQuery(this);
        var e = function(a, b) {
            "object" == typeof console && console.log("[Smart Research - " + (b || "Erro") + "] " + a)
        }, C = {pageLimit: null, loadContent: ".prateleira[id^=ResultItems]", shelfClass: ".prateleira", filtersMenu: ".search-multiple-navigator", linksMenu: ".search-single-navigator", menuDepartament: ".navigation .menu-departamento", mergeMenu: !0, insertMenuAfter: ".search-multiple-navigator h3:first", emptySearchElem: jQuery('<div class="vtexsr-emptySearch"></div>'),
            elemLoading: '<div id="scrollLoading">Estamos buscando más productos</div>', returnTopText: '<span class="text">voltar ao</span><span class="text2">TOPO</span>', emptySearchMsg: "<h3>No tenemos productos para esta combinación de filtros</h3>", filterErrorMsg: "Hubo un error al cargar la página", searchUrl: null, usePopup: !1, showLinks: !0, popupAutoCloseSeconds: 3, filterScrollTop: function(a) {
                return 0
            }, callback: function() {
            }, getShelfHeight: function(a) {
                return a.scrollTop() + a.height()
            }, shelfCallback: function() {
            },
            ajaxCallback: function() {
            }, emptySearchCallback: function() {
            }, authorizeScroll: function() {
                return!0
            }, authorizeUpdate: function() {
                return!0
            }, labelCallback: function() {
            }, changeCallback: function() {
            }}, b = jQuery.extend({}, C, s), D = jQuery(""), y = jQuery(b.elemLoading), q = 2, u = !0, n = jQuery(window);
        jQuery(document);
        var z = jQuery("html,body"), k = jQuery("body"), p = "", d = "", v = "", w = !1, h = jQuery(b.loadContent), l = jQuery(b.filtersMenu), f = {requests: 0, filters: 0, isEmpty: !1}, m = {}, j = {getUrl: function(a) {
                return a ? p.replace(/PageNumber=[0-9]*/,
                        "PageNumber=" + q) : (v + d).replace(/PageNumber=[0-9]*/, "PageNumber=" + E)
            }, getSearchUrl: function() {
                var a, b, c;
                jQuery("script:not([src])").each(function() {
                    b = jQuery(this)[0].innerHTML;
                    c = /\/buscapagina\?.+&PageNumber=/i;
                    if (-1 < b.search(/\/buscapagina\?/i))
                        return a = c.exec(b), !1
                });
                if ("undefined" !== typeof a && "undefined" !== typeof a[0])
                    return a[0];
                e("N\u00e3o foi poss\u00edvel localizar a url de busca da p\u00e1gina.\n Tente adicionar o .js ao final da p\u00e1gina. \n[M\u00e9todo: getSearchUrl]");
                return""
            }, scrollToTop: function() {
                var a =
                        k.find("#returnToTop");
                1 > a.length && (a = jQuery('<div id="returnToTop"><a href="#">' + b.returnTopText + '<span class="arrowToTop"></span></a></div>'), k.append(a));
                var g = n.height();
                n.bind("resize", function() {
                    g = n.height()
                });
                n.bind("scroll", function() {
                    n.scrollTop() > g ? a.stop(!0).fadeTo(300, 1, function() {
                        a.show()
                    }) : a.stop(!0).fadeTo(300, 0, function() {
                        a.hide()
                    })
                });
                a.bind("click", function() {
                    z.animate({scrollTop: 0}, "slow");
                    return!1
                })
            }, infinitScroll: function() {
                var a, g, c;
                c = (k.find(".pager:first").attr("id") || "").split("_").pop();
                a = null !== b.pageLimit ? b.pageLimit : window["pagecount_" + c];
                g = !0;
                "undefined" === typeof a && (a = 99999999);
                n.bind("scroll", function() {
                    var c = jQuery(this);
                    if (!w && q <= a && u && b.authorizeScroll(f)) {
                        if (c.scrollTop() + c.height() >= b.getShelfHeight(h) && g) {
                            var d = h.find(b.shelfClass).filter(":last");
                            d.after(y);
                            g = !1;
                            x = jQuery.ajax({url: j.getUrl(!0), success: function(a) {
                                    1 > a.trim().length ? (u = !1, e("N\u00e3o existem mais resultados a partir da p\u00e1gina: " + (q - 1), "Aviso")) : d.after(a);
                                    g = !0;
                                    y.remove();
                                    f.requests++;
                                    b.ajaxCallback(f)
                                }});
                            q++
                        }
                    } else
                        return!1
                })
            }}, p = null !== b.searchUrl ? v = b.searchUrl : v = j.getSearchUrl();
        if (1 > $this.length)
            return e("Nenhuma op\u00e7\u00e3o de filtro encontrada", "Aviso"), b.showLinks && jQuery(b.linksMenu).css("visibility", "visible").show(), j.infinitScroll(), j.scrollToTop(), $this;
        if (1 > h.length)
            return e("Elemento para destino da requisi\u00e7\u00e3o n\u00e3o foi encontrado \n (" + h.selector + ")"), !1;
        1 > l.length && e("O menu de filtros n\u00e3o foi encontrado \n (" + l.selector + ")");
        var A = jQuery(b.linksMenu), r = jQuery('<div class="vtexSr-overlay"></div>'),
                B = jQuery(b.menuDepartament), F = h.offset(), E = 1, t = null, x = null;
        b.emptySearchElem.append(b.emptySearchMsg);
        h.before(r);
        var c = {exec: function() {
                c.setFilterMenu();
                c.fieldsetFormat();
                $this.each(function() {
                    var a = jQuery(this), b = a.parent();
                    a.is(":checked") && (d += "&" + (a.attr("rel") || ""), b.addClass("sr_selected"));
                    c.adjustText(a);
                    b.append('<span class="sr_box"></span><span class="sr_box2"></span>');
                    a.bind("change", function() {
                        c.inputAction.call(this);
                        a.is(":checked") ? c.addFilter(a) : c.removeFilter(a);
                        f.filters = $this.filter(":checked").length
                    })
                });
                "" !== d && c.addFilter(D)
            }, mergeMenu: function() {
                if (!b.mergeMenu)
                    return!1;
                B.insertAfter(b.insertMenuAfter);
                c.departamentMenuFormat(B)
            }, mergeMenuList: function() {
                var a = 0;
                l.find("h3,h4").each(function() {
                    var b = A.find("h3,h4").eq(a).next("ul");
                    b.insertAfter(jQuery(this));
                    c.departamentMenuFormat(b);
                    a++
                })
            }, departamentMenuFormat: function(a) {
                a.find("a").each(function() {
                    var a = jQuery(this);
                    a.text(c.removeCounter(a.text()))
                })
            }, fieldsetFormat: function() {
                m.fieldsetCount = 0;
                m.tmpCurrentLabel = {};
                l.find("fieldset").each(function() {
                    var a =
                            jQuery(this), c = a.find("label"), d = "filtro_" + (a.find("h5:first").text() || "").toLowerCase().replaceSpecialChars().replace(/\s/g, "-");
                    m[d] = {};
                    1 > c.length ? a.hide() : (a.addClass(d), c.each(function(c) {
                        var g = jQuery(this), e = g.find("input").val() || "", f = "sr_" + e.toLowerCase().replaceSpecialChars().replace(/\s/g, "-");
                        m.tmpCurrentLabel = {fieldsetParent: [a, d], elem: g};
                        m[d][c.toString()] = {className: f, title: e};
                        g.addClass(f).attr({title: e, index: c});
                        b.labelCallback(m)
                    }), m.fieldsetCount++)
                })
            }, inputAction: function() {
                b.changeCallback.call(this);
                null !== x && x.abort();
                null !== t && t.abort();
                q = 2;
                u = !0
            }, addFilter: function(a) {
                d += "&" + (a.attr("rel") || "");
                r.fadeTo(300, 0.6);
                p = j.getUrl();
                t = jQuery.ajax({url: p, success: c.filterAjaxSuccess, error: c.filterAjaxError});
                a.parent().addClass("sr_selected")
            }, removeFilter: function(a) {
                var b = a.attr("rel") || "";
                r.fadeTo(300, 0.6);
                "" !== b && (d = d.replace("&" + b, ""));
                p = j.getUrl();
                t = jQuery.ajax({url: p, success: c.filterAjaxSuccess, error: c.filterAjaxError});
                a.parent().removeClass("sr_selected")
            }, filterAjaxSuccess: function(a) {
                a = jQuery(a);
                r.fadeTo(300, 0, function() {
                    jQuery(this).hide()
                });
                c.updateContent(a);
                f.requests++;
                b.ajaxCallback(f);
                z.animate({scrollTop: b.filterScrollTop(F || {top: 0, left: 0})}, 600)
            }, filterAjaxError: function(a, c) {
                "abort" !== c && (r.fadeTo(300, 0, function() {
                    jQuery(this).hide()
                }), alert(b.filterErrorMsg), e("Houve um erro ao tentar fazer a requisi\u00e7\u00e3o da p\u00e1gina com filtros."))
            }, updateContent: function(a) {
                w = !0;
                if (!b.authorizeUpdate(f))
                    return!1;
                var c = a.filter(b.shelfClass);
                a = h.find(b.shelfClass);
                (0 < a.length ? a : b.emptySearchElem).slideUp(600,
                        function() {
                            jQuery(this).remove();
                            b.usePopup ? k.find(".boxPopUp2").vtexPopUp2() : b.emptySearchElem.remove();
                            0 < c.length ? (c.hide(), h.append(c), b.shelfCallback(), c.slideDown(600, function() {
                                w = !1
                            }), f.isEmpty = !1) : (f.isEmpty = !0, b.usePopup ? b.emptySearchElem.addClass("freeContent autoClose ac_" + b.popupAutoCloseSeconds).vtexPopUp2().stop(!0).show() : (h.append(b.emptySearchElem), b.emptySearchElem.show().css("height", "auto").fadeTo(300, 0.2, function() {
                                b.emptySearchElem.fadeTo(300, 1)
                            })), b.emptySearchCallback(f))
                        })
            },
            adjustText: function(a) {
                var b = a.parent(), d = b.text();
                qtt = "";
                d = c.removeCounter(d);
                b.text(d).prepend(a)
            }, removeCounter: function(a) {
                return a.replace(/\([0-9]+\)/ig, function(a) {
                    qtt = a.replace(/\(|\)/, "");
                    return""
                })
            }, setFilterMenu: function() {
                0 < l.length && (A.hide(), l.show())
            }};
        k.hasClass("departamento") ? c.mergeMenu() : (k.hasClass("categoria") || k.hasClass("resultado-busca")) && c.mergeMenuList();
        c.exec();
        j.infinitScroll();
        j.scrollToTop();
        b.callback();
        l.css("visibility", "visible")
    }
})(jQuery);


