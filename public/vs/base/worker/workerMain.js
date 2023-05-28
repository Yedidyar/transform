/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.25.1(336c463ee6c20d8a49e40d099b9178def0df6b18)
 * Released under the MIT license
 * https://github.com/microsoft/vscode/blob/main/LICENSE.txt
 *-----------------------------------------------------------*/ (function() {
  var G = [
      "require",
      "exports",
      "vs/base/common/platform",
      "vs/editor/common/core/position",
      "vs/base/common/errors",
      "vs/base/common/strings",
      "vs/editor/common/core/range",
      "vs/base/common/lifecycle",
      "vs/base/common/stopwatch",
      "vs/base/common/event",
      "vs/base/common/diff/diff",
      "vs/base/common/types",
      "vs/base/common/uint",
      "vs/base/common/uri",
      "vs/base/common/diff/diffChange",
      "vs/base/common/iterator",
      "vs/base/common/keyCodes",
      "vs/base/common/linkedList",
      "vs/base/common/process",
      "vs/base/common/path",
      "vs/base/common/cancellation",
      "vs/base/common/hash",
      "vs/editor/common/core/characterClassifier",
      "vs/editor/common/core/selection",
      "vs/editor/common/core/token",
      "vs/editor/common/diff/diffComputer",
      "vs/editor/common/model/wordHelper",
      "vs/editor/common/modes/linkComputer",
      "vs/editor/common/modes/supports/inplaceReplaceSupport",
      "vs/editor/common/standalone/standaloneEnums",
      "vs/editor/common/standalone/standaloneBase",
      "vs/editor/common/viewModel/prefixSumComputer",
      "vs/editor/common/model/mirrorTextModel",
      "vs/base/common/worker/simpleWorker",
      "vs/editor/common/services/editorSimpleWorker"
    ],
    Q = function(I) {
      for (var t = [], E = 0, M = I.length; E < M; E++) t[E] = G[I[E]];
      return t;
    },
    de = this,
    me = typeof global == "object" ? global : {},
    Z;
  (function(I) {
    I.global = de;
    var t = (function() {
      function E() {
        (this._detected = !1),
          (this._isWindows = !1),
          (this._isNode = !1),
          (this._isElectronRenderer = !1),
          (this._isWebWorker = !1);
      }
      return (
        Object.defineProperty(E.prototype, "isWindows", {
          get: function() {
            return this._detect(), this._isWindows;
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(E.prototype, "isNode", {
          get: function() {
            return this._detect(), this._isNode;
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(E.prototype, "isElectronRenderer", {
          get: function() {
            return this._detect(), this._isElectronRenderer;
          },
          enumerable: !1,
          configurable: !0
        }),
        Object.defineProperty(E.prototype, "isWebWorker", {
          get: function() {
            return this._detect(), this._isWebWorker;
          },
          enumerable: !1,
          configurable: !0
        }),
        (E.prototype._detect = function() {
          this._detected ||
            ((this._detected = !0),
            (this._isWindows = E._isWindows()),
            (this._isNode = typeof module != "undefined" && !!module.exports),
            (this._isElectronRenderer =
              typeof process != "undefined" &&
              typeof process.versions != "undefined" &&
              typeof process.versions.electron != "undefined" &&
              process.type === "renderer"),
            (this._isWebWorker = typeof I.global.importScripts == "function"));
        }),
        (E._isWindows = function() {
          return typeof navigator != "undefined" &&
            navigator.userAgent &&
            navigator.userAgent.indexOf("Windows") >= 0
            ? !0
            : typeof process != "undefined"
            ? process.platform === "win32"
            : !1;
        }),
        E
      );
    })();
    I.Environment = t;
  })(Z || (Z = {}));
  var Z;
  (function(I) {
    var t = (function() {
      function p(o, h, u) {
        (this.type = o), (this.detail = h), (this.timestamp = u);
      }
      return p;
    })();
    I.LoaderEvent = t;
    var E = (function() {
      function p(o) {
        this._events = [new t(1, "", o)];
      }
      return (
        (p.prototype.record = function(o, h) {
          this._events.push(
            new t(o, h, I.Utilities.getHighPerformanceTimestamp())
          );
        }),
        (p.prototype.getEvents = function() {
          return this._events;
        }),
        p
      );
    })();
    I.LoaderEventRecorder = E;
    var M = (function() {
      function p() {}
      return (
        (p.prototype.record = function(o, h) {}),
        (p.prototype.getEvents = function() {
          return [];
        }),
        (p.INSTANCE = new p()),
        p
      );
    })();
    I.NullLoaderEventRecorder = M;
  })(Z || (Z = {}));
  var Z;
  (function(I) {
    var t = (function() {
      function E() {}
      return (
        (E.fileUriToFilePath = function(M, p) {
          if (((p = decodeURI(p).replace(/%23/g, "#")), M)) {
            if (/^file:\/\/\//.test(p)) return p.substr(8);
            if (/^file:\/\//.test(p)) return p.substr(5);
          } else if (/^file:\/\//.test(p)) return p.substr(7);
          return p;
        }),
        (E.startsWith = function(M, p) {
          return M.length >= p.length && M.substr(0, p.length) === p;
        }),
        (E.endsWith = function(M, p) {
          return M.length >= p.length && M.substr(M.length - p.length) === p;
        }),
        (E.containsQueryString = function(M) {
          return /^[^\#]*\?/gi.test(M);
        }),
        (E.isAbsolutePath = function(M) {
          return /^((http:\/\/)|(https:\/\/)|(file:\/\/)|(\/))/.test(M);
        }),
        (E.forEachProperty = function(M, p) {
          if (M) {
            var o = void 0;
            for (o in M) M.hasOwnProperty(o) && p(o, M[o]);
          }
        }),
        (E.isEmpty = function(M) {
          var p = !0;
          return (
            E.forEachProperty(M, function() {
              p = !1;
            }),
            p
          );
        }),
        (E.recursiveClone = function(M) {
          if (
            !M ||
            typeof M != "object" ||
            M instanceof RegExp ||
            (!Array.isArray(M) && Object.getPrototypeOf(M) !== Object.prototype)
          )
            return M;
          var p = Array.isArray(M) ? [] : {};
          return (
            E.forEachProperty(M, function(o, h) {
              h && typeof h == "object"
                ? (p[o] = E.recursiveClone(h))
                : (p[o] = h);
            }),
            p
          );
        }),
        (E.generateAnonymousModule = function() {
          return "===anonymous" + E.NEXT_ANONYMOUS_ID++ + "===";
        }),
        (E.isAnonymousModule = function(M) {
          return E.startsWith(M, "===anonymous");
        }),
        (E.getHighPerformanceTimestamp = function() {
          return (
            this.PERFORMANCE_NOW_PROBED ||
              ((this.PERFORMANCE_NOW_PROBED = !0),
              (this.HAS_PERFORMANCE_NOW =
                I.global.performance &&
                typeof I.global.performance.now == "function")),
            this.HAS_PERFORMANCE_NOW ? I.global.performance.now() : Date.now()
          );
        }),
        (E.NEXT_ANONYMOUS_ID = 1),
        (E.PERFORMANCE_NOW_PROBED = !1),
        (E.HAS_PERFORMANCE_NOW = !1),
        E
      );
    })();
    I.Utilities = t;
  })(Z || (Z = {}));
  var Z;
  (function(I) {
    function t(p) {
      if (p instanceof Error) return p;
      var o = new Error(p.message || String(p) || "Unknown Error");
      return p.stack && (o.stack = p.stack), o;
    }
    I.ensureError = t;
    var E = (function() {
      function p() {}
      return (
        (p.validateConfigurationOptions = function(o) {
          function h(l) {
            if (l.phase === "loading") {
              console.error('Loading "' + l.moduleId + '" failed'),
                console.error(l),
                console.error("Here are the modules that depend on it:"),
                console.error(l.neededBy);
              return;
            }
            if (l.phase === "factory") {
              console.error(
                'The factory method of "' +
                  l.moduleId +
                  '" has thrown an exception'
              ),
                console.error(l);
              return;
            }
          }
          if (
            ((o = o || {}),
            typeof o.baseUrl != "string" && (o.baseUrl = ""),
            typeof o.isBuild != "boolean" && (o.isBuild = !1),
            typeof o.paths != "object" && (o.paths = {}),
            typeof o.config != "object" && (o.config = {}),
            typeof o.catchError == "undefined" && (o.catchError = !1),
            typeof o.recordStats == "undefined" && (o.recordStats = !1),
            typeof o.urlArgs != "string" && (o.urlArgs = ""),
            typeof o.onError != "function" && (o.onError = h),
            Array.isArray(o.ignoreDuplicateModules) ||
              (o.ignoreDuplicateModules = []),
            o.baseUrl.length > 0 &&
              (I.Utilities.endsWith(o.baseUrl, "/") || (o.baseUrl += "/")),
            typeof o.cspNonce != "string" && (o.cspNonce = ""),
            typeof o.preferScriptTags == "undefined" &&
              (o.preferScriptTags = !1),
            Array.isArray(o.nodeModules) || (o.nodeModules = []),
            o.nodeCachedData &&
              typeof o.nodeCachedData == "object" &&
              (typeof o.nodeCachedData.seed != "string" &&
                (o.nodeCachedData.seed = "seed"),
              (typeof o.nodeCachedData.writeDelay != "number" ||
                o.nodeCachedData.writeDelay < 0) &&
                (o.nodeCachedData.writeDelay = 1e3 * 7),
              !o.nodeCachedData.path ||
                typeof o.nodeCachedData.path != "string"))
          ) {
            var u = t(
              new Error("INVALID cached data configuration, 'path' MUST be set")
            );
            (u.phase = "configuration"),
              o.onError(u),
              (o.nodeCachedData = void 0);
          }
          return o;
        }),
        (p.mergeConfigurationOptions = function(o, h) {
          o === void 0 && (o = null), h === void 0 && (h = null);
          var u = I.Utilities.recursiveClone(h || {});
          return (
            I.Utilities.forEachProperty(o, function(l, f) {
              l === "ignoreDuplicateModules" &&
              typeof u.ignoreDuplicateModules != "undefined"
                ? (u.ignoreDuplicateModules = u.ignoreDuplicateModules.concat(
                    f
                  ))
                : l === "paths" && typeof u.paths != "undefined"
                ? I.Utilities.forEachProperty(f, function(L, a) {
                    return (u.paths[L] = a);
                  })
                : l === "config" && typeof u.config != "undefined"
                ? I.Utilities.forEachProperty(f, function(L, a) {
                    return (u.config[L] = a);
                  })
                : (u[l] = I.Utilities.recursiveClone(f));
            }),
            p.validateConfigurationOptions(u)
          );
        }),
        p
      );
    })();
    I.ConfigurationOptionsUtil = E;
    var M = (function() {
      function p(o, h) {
        if (
          ((this._env = o),
          (this.options = E.mergeConfigurationOptions(h)),
          this._createIgnoreDuplicateModulesMap(),
          this._createNodeModulesMap(),
          this._createSortedPathsRules(),
          this.options.baseUrl === "")
        ) {
          if (
            this.options.nodeRequire &&
            this.options.nodeRequire.main &&
            this.options.nodeRequire.main.filename &&
            this._env.isNode
          ) {
            var u = this.options.nodeRequire.main.filename,
              l = Math.max(u.lastIndexOf("/"), u.lastIndexOf("\\"));
            this.options.baseUrl = u.substring(0, l + 1);
          }
          if (this.options.nodeMain && this._env.isNode) {
            var u = this.options.nodeMain,
              l = Math.max(u.lastIndexOf("/"), u.lastIndexOf("\\"));
            this.options.baseUrl = u.substring(0, l + 1);
          }
        }
      }
      return (
        (p.prototype._createIgnoreDuplicateModulesMap = function() {
          this.ignoreDuplicateModulesMap = {};
          for (var o = 0; o < this.options.ignoreDuplicateModules.length; o++)
            this.ignoreDuplicateModulesMap[
              this.options.ignoreDuplicateModules[o]
            ] = !0;
        }),
        (p.prototype._createNodeModulesMap = function() {
          this.nodeModulesMap = Object.create(null);
          for (var o = 0, h = this.options.nodeModules; o < h.length; o++) {
            var u = h[o];
            this.nodeModulesMap[u] = !0;
          }
        }),
        (p.prototype._createSortedPathsRules = function() {
          var o = this;
          (this.sortedPathsRules = []),
            I.Utilities.forEachProperty(this.options.paths, function(h, u) {
              Array.isArray(u)
                ? o.sortedPathsRules.push({ from: h, to: u })
                : o.sortedPathsRules.push({ from: h, to: [u] });
            }),
            this.sortedPathsRules.sort(function(h, u) {
              return u.from.length - h.from.length;
            });
        }),
        (p.prototype.cloneAndMerge = function(o) {
          return new p(this._env, E.mergeConfigurationOptions(o, this.options));
        }),
        (p.prototype.getOptionsLiteral = function() {
          return this.options;
        }),
        (p.prototype._applyPaths = function(o) {
          for (var h, u = 0, l = this.sortedPathsRules.length; u < l; u++)
            if (
              ((h = this.sortedPathsRules[u]),
              I.Utilities.startsWith(o, h.from))
            ) {
              for (var f = [], L = 0, a = h.to.length; L < a; L++)
                f.push(h.to[L] + o.substr(h.from.length));
              return f;
            }
          return [o];
        }),
        (p.prototype._addUrlArgsToUrl = function(o) {
          return I.Utilities.containsQueryString(o)
            ? o + "&" + this.options.urlArgs
            : o + "?" + this.options.urlArgs;
        }),
        (p.prototype._addUrlArgsIfNecessaryToUrl = function(o) {
          return this.options.urlArgs ? this._addUrlArgsToUrl(o) : o;
        }),
        (p.prototype._addUrlArgsIfNecessaryToUrls = function(o) {
          if (this.options.urlArgs)
            for (var h = 0, u = o.length; h < u; h++)
              o[h] = this._addUrlArgsToUrl(o[h]);
          return o;
        }),
        (p.prototype.moduleIdToPaths = function(o) {
          var h =
            this.nodeModulesMap[o] === !0 ||
            (this.options.amdModulesPattern instanceof RegExp &&
              !this.options.amdModulesPattern.test(o));
          if (h) return this.isBuild() ? ["empty:"] : ["node|" + o];
          var u = o,
            l;
          if (
            !I.Utilities.endsWith(u, ".js") &&
            !I.Utilities.isAbsolutePath(u)
          ) {
            l = this._applyPaths(u);
            for (var f = 0, L = l.length; f < L; f++)
              (this.isBuild() && l[f] === "empty:") ||
                (I.Utilities.isAbsolutePath(l[f]) ||
                  (l[f] = this.options.baseUrl + l[f]),
                !I.Utilities.endsWith(l[f], ".js") &&
                  !I.Utilities.containsQueryString(l[f]) &&
                  (l[f] = l[f] + ".js"));
          } else
            !I.Utilities.endsWith(u, ".js") &&
              !I.Utilities.containsQueryString(u) &&
              (u = u + ".js"),
              (l = [u]);
          return this._addUrlArgsIfNecessaryToUrls(l);
        }),
        (p.prototype.requireToUrl = function(o) {
          var h = o;
          return (
            I.Utilities.isAbsolutePath(h) ||
              ((h = this._applyPaths(h)[0]),
              I.Utilities.isAbsolutePath(h) || (h = this.options.baseUrl + h)),
            this._addUrlArgsIfNecessaryToUrl(h)
          );
        }),
        (p.prototype.isBuild = function() {
          return this.options.isBuild;
        }),
        (p.prototype.isDuplicateMessageIgnoredFor = function(o) {
          return this.ignoreDuplicateModulesMap.hasOwnProperty(o);
        }),
        (p.prototype.getConfigForModule = function(o) {
          if (this.options.config) return this.options.config[o];
        }),
        (p.prototype.shouldCatchError = function() {
          return this.options.catchError;
        }),
        (p.prototype.shouldRecordStats = function() {
          return this.options.recordStats;
        }),
        (p.prototype.onError = function(o) {
          this.options.onError(o);
        }),
        p
      );
    })();
    I.Configuration = M;
  })(Z || (Z = {}));
  var Z;
  (function(I) {
    var t = (function() {
        function u(l) {
          (this._env = l),
            (this._scriptLoader = null),
            (this._callbackMap = {});
        }
        return (
          (u.prototype.load = function(l, f, L, a) {
            var _ = this;
            if (!this._scriptLoader)
              if (this._env.isWebWorker) this._scriptLoader = new M();
              else if (this._env.isElectronRenderer) {
                var g = l.getConfig().getOptionsLiteral().preferScriptTags;
                g
                  ? (this._scriptLoader = new E())
                  : (this._scriptLoader = new p(this._env));
              } else
                this._env.isNode
                  ? (this._scriptLoader = new p(this._env))
                  : (this._scriptLoader = new E());
            var m = { callback: L, errorback: a };
            if (this._callbackMap.hasOwnProperty(f)) {
              this._callbackMap[f].push(m);
              return;
            }
            (this._callbackMap[f] = [m]),
              this._scriptLoader.load(
                l,
                f,
                function() {
                  return _.triggerCallback(f);
                },
                function(i) {
                  return _.triggerErrorback(f, i);
                }
              );
          }),
          (u.prototype.triggerCallback = function(l) {
            var f = this._callbackMap[l];
            delete this._callbackMap[l];
            for (var L = 0; L < f.length; L++) f[L].callback();
          }),
          (u.prototype.triggerErrorback = function(l, f) {
            var L = this._callbackMap[l];
            delete this._callbackMap[l];
            for (var a = 0; a < L.length; a++) L[a].errorback(f);
          }),
          u
        );
      })(),
      E = (function() {
        function u() {}
        return (
          (u.prototype.attachListeners = function(l, f, L) {
            var a = function() {
                l.removeEventListener("load", _),
                  l.removeEventListener("error", g);
              },
              _ = function(m) {
                a(), f();
              },
              g = function(m) {
                a(), L(m);
              };
            l.addEventListener("load", _), l.addEventListener("error", g);
          }),
          (u.prototype.load = function(l, f, L, a) {
            if (/^node\|/.test(f)) {
              var _ = l.getConfig().getOptionsLiteral(),
                g = o(l.getRecorder(), _.nodeRequire || I.global.nodeRequire),
                m = f.split("|"),
                i = null;
              try {
                i = g(m[1]);
              } catch (n) {
                a(n);
                return;
              }
              l.enqueueDefineAnonymousModule([], function() {
                return i;
              }),
                L();
            } else {
              var s = document.createElement("script");
              s.setAttribute("async", "async"),
                s.setAttribute("type", "text/javascript"),
                this.attachListeners(s, L, a);
              var d = l.getConfig().getOptionsLiteral().trustedTypesPolicy;
              d && (f = d.createScriptURL(f)), s.setAttribute("src", f);
              var S = l.getConfig().getOptionsLiteral().cspNonce;
              S && s.setAttribute("nonce", S),
                document.getElementsByTagName("head")[0].appendChild(s);
            }
          }),
          u
        );
      })(),
      M = (function() {
        function u() {}
        return (
          (u.prototype.load = function(l, f, L, a) {
            var _ = l.getConfig().getOptionsLiteral().trustedTypesPolicy,
              g =
                /^((http:)|(https:)|(file:))/.test(f) &&
                f.substring(0, self.origin.length) !== self.origin;
            if (!g) {
              fetch(f)
                .then(function(m) {
                  if (m.status !== 200) throw new Error(m.statusText);
                  return m.text();
                })
                .then(function(m) {
                  m =
                    m +
                    `
//# sourceURL=` +
                    f;
                  var i = _
                    ? self.eval(_.createScript("", m))
                    : new Function(m);
                  i.call(self), L();
                })
                .then(void 0, a);
              return;
            }
            try {
              _ && (f = _.createScriptURL(f)), importScripts(f), L();
            } catch (m) {
              a(m);
            }
          }),
          u
        );
      })(),
      p = (function() {
        function u(l) {
          (this._env = l),
            (this._didInitialize = !1),
            (this._didPatchNodeRequire = !1);
        }
        return (
          (u.prototype._init = function(l) {
            this._didInitialize ||
              ((this._didInitialize = !0),
              (this._fs = l("fs")),
              (this._vm = l("vm")),
              (this._path = l("path")),
              (this._crypto = l("crypto")));
          }),
          (u.prototype._initNodeRequire = function(l, f) {
            var L = f.getConfig().getOptionsLiteral().nodeCachedData;
            if (!L || this._didPatchNodeRequire) return;
            this._didPatchNodeRequire = !0;
            var a = this,
              _ = l("module");
            function g(m) {
              var i = m.constructor,
                s = function(S) {
                  try {
                    return m.require(S);
                  } finally {
                  }
                };
              return (
                (s.resolve = function(S, n) {
                  return i._resolveFilename(S, m, !1, n);
                }),
                (s.resolve.paths = function(S) {
                  return i._resolveLookupPaths(S, m);
                }),
                (s.main = process.mainModule),
                (s.extensions = i._extensions),
                (s.cache = i._cache),
                s
              );
            }
            _.prototype._compile = function(m, i) {
              var s = _.wrap(m.replace(/^#!.*/, "")),
                d = f.getRecorder(),
                S = a._getCachedDataPath(L, i),
                n = { filename: i },
                r;
              try {
                var c = a._fs.readFileSync(S);
                (r = c.slice(0, 16)),
                  (n.cachedData = c.slice(16)),
                  d.record(60, S);
              } catch (P) {
                d.record(61, S);
              }
              var C = new a._vm.Script(s, n),
                b = C.runInThisContext(n),
                v = a._path.dirname(i),
                w = g(this),
                N = [this.exports, w, this, i, v, process, me, Buffer],
                y = b.apply(this.exports, N);
              return (
                a._handleCachedData(C, s, S, !n.cachedData, f),
                a._verifyCachedData(C, s, S, r, f),
                y
              );
            };
          }),
          (u.prototype.load = function(l, f, L, a) {
            var _ = this,
              g = l.getConfig().getOptionsLiteral(),
              m = o(l.getRecorder(), g.nodeRequire || I.global.nodeRequire),
              i =
                g.nodeInstrumenter ||
                function(b) {
                  return b;
                };
            this._init(m), this._initNodeRequire(m, l);
            var s = l.getRecorder();
            if (/^node\|/.test(f)) {
              var d = f.split("|"),
                S = null;
              try {
                S = m(d[1]);
              } catch (b) {
                a(b);
                return;
              }
              l.enqueueDefineAnonymousModule([], function() {
                return S;
              }),
                L();
            } else {
              f = I.Utilities.fileUriToFilePath(this._env.isWindows, f);
              var n = this._path.normalize(f),
                r = this._getElectronRendererScriptPathOrUri(n),
                c = Boolean(g.nodeCachedData),
                C = c ? this._getCachedDataPath(g.nodeCachedData, f) : void 0;
              this._readSourceAndCachedData(n, C, s, function(b, v, w, N) {
                if (b) {
                  a(b);
                  return;
                }
                var y;
                v.charCodeAt(0) === u._BOM
                  ? (y = u._PREFIX + v.substring(1) + u._SUFFIX)
                  : (y = u._PREFIX + v + u._SUFFIX),
                  (y = i(y, n));
                var P = { filename: r, cachedData: w },
                  U = _._createAndEvalScript(l, y, P, L, a);
                _._handleCachedData(U, y, C, c && !w, l),
                  _._verifyCachedData(U, y, C, N, l);
              });
            }
          }),
          (u.prototype._createAndEvalScript = function(l, f, L, a, _) {
            var g = l.getRecorder();
            g.record(31, L.filename);
            var m = new this._vm.Script(f, L),
              i = m.runInThisContext(L),
              s = l.getGlobalAMDDefineFunc(),
              d = !1,
              S = function() {
                return (d = !0), s.apply(null, arguments);
              };
            return (
              (S.amd = s.amd),
              i.call(
                I.global,
                l.getGlobalAMDRequireFunc(),
                S,
                L.filename,
                this._path.dirname(L.filename)
              ),
              g.record(32, L.filename),
              d
                ? a()
                : _(
                    new Error(
                      "Didn't receive define call in " + L.filename + "!"
                    )
                  ),
              m
            );
          }),
          (u.prototype._getElectronRendererScriptPathOrUri = function(l) {
            if (!this._env.isElectronRenderer) return l;
            var f = l.match(/^([a-z])\:(.*)/i);
            return f
              ? "file:///" +
                  (f[1].toUpperCase() + ":" + f[2]).replace(/\\/g, "/")
              : "file://" + l;
          }),
          (u.prototype._getCachedDataPath = function(l, f) {
            var L = this._crypto
                .createHash("md5")
                .update(f, "utf8")
                .update(l.seed, "utf8")
                .update(process.arch, "")
                .digest("hex"),
              a = this._path.basename(f).replace(/\.js$/, "");
            return this._path.join(l.path, a + "-" + L + ".code");
          }),
          (u.prototype._handleCachedData = function(l, f, L, a, _) {
            var g = this;
            l.cachedDataRejected
              ? this._fs.unlink(L, function(m) {
                  _.getRecorder().record(62, L),
                    g._createAndWriteCachedData(l, f, L, _),
                    m && _.getConfig().onError(m);
                })
              : a && this._createAndWriteCachedData(l, f, L, _);
          }),
          (u.prototype._createAndWriteCachedData = function(l, f, L, a) {
            var _ = this,
              g = Math.ceil(
                a.getConfig().getOptionsLiteral().nodeCachedData.writeDelay *
                  (1 + Math.random())
              ),
              m = -1,
              i = 0,
              s = void 0,
              d = function() {
                setTimeout(function() {
                  s ||
                    (s = _._crypto
                      .createHash("md5")
                      .update(f, "utf8")
                      .digest());
                  var S = l.createCachedData();
                  if (!(S.length === 0 || S.length === m || i >= 5)) {
                    if (S.length < m) {
                      d();
                      return;
                    }
                    (m = S.length),
                      _._fs.writeFile(L, Buffer.concat([s, S]), function(n) {
                        n && a.getConfig().onError(n),
                          a.getRecorder().record(63, L),
                          d();
                      });
                  }
                }, g * Math.pow(4, i++));
              };
            d();
          }),
          (u.prototype._readSourceAndCachedData = function(l, f, L, a) {
            if (!f) this._fs.readFile(l, { encoding: "utf8" }, a);
            else {
              var _ = void 0,
                g = void 0,
                m = void 0,
                i = 2,
                s = function(d) {
                  d ? a(d) : --i == 0 && a(void 0, _, g, m);
                };
              this._fs.readFile(l, { encoding: "utf8" }, function(d, S) {
                (_ = S), s(d);
              }),
                this._fs.readFile(f, function(d, S) {
                  !d && S && S.length > 0
                    ? ((m = S.slice(0, 16)), (g = S.slice(16)), L.record(60, f))
                    : L.record(61, f),
                    s();
                });
            }
          }),
          (u.prototype._verifyCachedData = function(l, f, L, a, _) {
            var g = this;
            !a ||
              l.cachedDataRejected ||
              setTimeout(function() {
                var m = g._crypto
                  .createHash("md5")
                  .update(f, "utf8")
                  .digest();
                a.equals(m) ||
                  (_.getConfig().onError(
                    new Error(
                      "FAILED TO VERIFY CACHED DATA, deleting stale '" +
                        L +
                        "' now, but a RESTART IS REQUIRED"
                    )
                  ),
                  g._fs.unlink(L, function(i) {
                    i && _.getConfig().onError(i);
                  }));
              }, Math.ceil(5e3 * (1 + Math.random())));
          }),
          (u._BOM = 65279),
          (u._PREFIX = "(function (require, define, __filename, __dirname) { "),
          (u._SUFFIX = `
});`),
          u
        );
      })();
    function o(u, l) {
      if (l.__$__isRecorded) return l;
      var f = function(a) {
        u.record(33, a);
        try {
          return l(a);
        } finally {
          u.record(34, a);
        }
      };
      return (f.__$__isRecorded = !0), f;
    }
    I.ensureRecordedNodeRequire = o;
    function h(u) {
      return new t(u);
    }
    I.createScriptLoader = h;
  })(Z || (Z = {}));
  var Z;
  (function(I) {
    var t = (function() {
      function u(l) {
        var f = l.lastIndexOf("/");
        f !== -1
          ? (this.fromModulePath = l.substr(0, f + 1))
          : (this.fromModulePath = "");
      }
      return (
        (u._normalizeModuleId = function(l) {
          var f = l,
            L;
          for (L = /\/\.\//; L.test(f); ) f = f.replace(L, "/");
          for (
            f = f.replace(/^\.\//g, ""),
              L = /\/(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//;
            L.test(f);

          )
            f = f.replace(L, "/");
          return (
            (f = f.replace(
              /^(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//,
              ""
            )),
            f
          );
        }),
        (u.prototype.resolveModule = function(l) {
          var f = l;
          return (
            I.Utilities.isAbsolutePath(f) ||
              ((I.Utilities.startsWith(f, "./") ||
                I.Utilities.startsWith(f, "../")) &&
                (f = u._normalizeModuleId(this.fromModulePath + f))),
            f
          );
        }),
        (u.ROOT = new u("")),
        u
      );
    })();
    I.ModuleIdResolver = t;
    var E = (function() {
      function u(l, f, L, a, _, g) {
        (this.id = l),
          (this.strId = f),
          (this.dependencies = L),
          (this._callback = a),
          (this._errorback = _),
          (this.moduleIdResolver = g),
          (this.exports = {}),
          (this.error = null),
          (this.exportsPassedIn = !1),
          (this.unresolvedDependenciesCount = this.dependencies.length),
          (this._isComplete = !1);
      }
      return (
        (u._safeInvokeFunction = function(l, f) {
          try {
            return { returnedValue: l.apply(I.global, f), producedError: null };
          } catch (L) {
            return { returnedValue: null, producedError: L };
          }
        }),
        (u._invokeFactory = function(l, f, L, a) {
          return l.isBuild() && !I.Utilities.isAnonymousModule(f)
            ? { returnedValue: null, producedError: null }
            : l.shouldCatchError()
            ? this._safeInvokeFunction(L, a)
            : { returnedValue: L.apply(I.global, a), producedError: null };
        }),
        (u.prototype.complete = function(l, f, L) {
          this._isComplete = !0;
          var a = null;
          if (this._callback)
            if (typeof this._callback == "function") {
              l.record(21, this.strId);
              var _ = u._invokeFactory(f, this.strId, this._callback, L);
              (a = _.producedError),
                l.record(22, this.strId),
                !a &&
                  typeof _.returnedValue != "undefined" &&
                  (!this.exportsPassedIn ||
                    I.Utilities.isEmpty(this.exports)) &&
                  (this.exports = _.returnedValue);
            } else this.exports = this._callback;
          if (a) {
            var g = I.ensureError(a);
            (g.phase = "factory"),
              (g.moduleId = this.strId),
              (this.error = g),
              f.onError(g);
          }
          (this.dependencies = null),
            (this._callback = null),
            (this._errorback = null),
            (this.moduleIdResolver = null);
        }),
        (u.prototype.onDependencyError = function(l) {
          return (
            (this._isComplete = !0),
            (this.error = l),
            this._errorback ? (this._errorback(l), !0) : !1
          );
        }),
        (u.prototype.isComplete = function() {
          return this._isComplete;
        }),
        u
      );
    })();
    I.Module = E;
    var M = (function() {
        function u() {
          (this._nextId = 0),
            (this._strModuleIdToIntModuleId = new Map()),
            (this._intModuleIdToStrModuleId = []),
            this.getModuleId("exports"),
            this.getModuleId("module"),
            this.getModuleId("require");
        }
        return (
          (u.prototype.getMaxModuleId = function() {
            return this._nextId;
          }),
          (u.prototype.getModuleId = function(l) {
            var f = this._strModuleIdToIntModuleId.get(l);
            return (
              typeof f == "undefined" &&
                ((f = this._nextId++),
                this._strModuleIdToIntModuleId.set(l, f),
                (this._intModuleIdToStrModuleId[f] = l)),
              f
            );
          }),
          (u.prototype.getStrModuleId = function(l) {
            return this._intModuleIdToStrModuleId[l];
          }),
          u
        );
      })(),
      p = (function() {
        function u(l) {
          this.id = l;
        }
        return (
          (u.EXPORTS = new u(0)),
          (u.MODULE = new u(1)),
          (u.REQUIRE = new u(2)),
          u
        );
      })();
    I.RegularDependency = p;
    var o = (function() {
      function u(l, f, L) {
        (this.id = l), (this.pluginId = f), (this.pluginParam = L);
      }
      return u;
    })();
    I.PluginDependency = o;
    var h = (function() {
      function u(l, f, L, a, _) {
        _ === void 0 && (_ = 0),
          (this._env = l),
          (this._scriptLoader = f),
          (this._loaderAvailableTimestamp = _),
          (this._defineFunc = L),
          (this._requireFunc = a),
          (this._moduleIdProvider = new M()),
          (this._config = new I.Configuration(this._env)),
          (this._hasDependencyCycle = !1),
          (this._modules2 = []),
          (this._knownModules2 = []),
          (this._inverseDependencies2 = []),
          (this._inversePluginDependencies2 = new Map()),
          (this._currentAnnonymousDefineCall = null),
          (this._recorder = null),
          (this._buildInfoPath = []),
          (this._buildInfoDefineStack = []),
          (this._buildInfoDependencies = []);
      }
      return (
        (u.prototype.reset = function() {
          return new u(
            this._env,
            this._scriptLoader,
            this._defineFunc,
            this._requireFunc,
            this._loaderAvailableTimestamp
          );
        }),
        (u.prototype.getGlobalAMDDefineFunc = function() {
          return this._defineFunc;
        }),
        (u.prototype.getGlobalAMDRequireFunc = function() {
          return this._requireFunc;
        }),
        (u._findRelevantLocationInStack = function(l, f) {
          for (
            var L = function(r) {
                return r.replace(/\\/g, "/");
              },
              a = L(l),
              _ = f.split(/\n/),
              g = 0;
            g < _.length;
            g++
          ) {
            var m = _[g].match(/(.*):(\d+):(\d+)\)?$/);
            if (m) {
              var i = m[1],
                s = m[2],
                d = m[3],
                S = Math.max(i.lastIndexOf(" ") + 1, i.lastIndexOf("(") + 1);
              if (((i = i.substr(S)), (i = L(i)), i === a)) {
                var n = { line: parseInt(s, 10), col: parseInt(d, 10) };
                return (
                  n.line === 1 &&
                    (n.col -= "(function (require, define, __filename, __dirname) { ".length),
                  n
                );
              }
            }
          }
          throw new Error(
            "Could not correlate define call site for needle " + l
          );
        }),
        (u.prototype.getBuildInfo = function() {
          if (!this._config.isBuild()) return null;
          for (
            var l = [], f = 0, L = 0, a = this._modules2.length;
            L < a;
            L++
          ) {
            var _ = this._modules2[L];
            if (!!_) {
              var g = this._buildInfoPath[_.id] || null,
                m = this._buildInfoDefineStack[_.id] || null,
                i = this._buildInfoDependencies[_.id];
              l[f++] = {
                id: _.strId,
                path: g,
                defineLocation:
                  g && m ? u._findRelevantLocationInStack(g, m) : null,
                dependencies: i,
                shim: null,
                exports: _.exports
              };
            }
          }
          return l;
        }),
        (u.prototype.getRecorder = function() {
          return (
            this._recorder ||
              (this._config.shouldRecordStats()
                ? (this._recorder = new I.LoaderEventRecorder(
                    this._loaderAvailableTimestamp
                  ))
                : (this._recorder = I.NullLoaderEventRecorder.INSTANCE)),
            this._recorder
          );
        }),
        (u.prototype.getLoaderEvents = function() {
          return this.getRecorder().getEvents();
        }),
        (u.prototype.enqueueDefineAnonymousModule = function(l, f) {
          if (this._currentAnnonymousDefineCall !== null)
            throw new Error(
              "Can only have one anonymous define call per script file"
            );
          var L = null;
          this._config.isBuild() &&
            (L = new Error("StackLocation").stack || null),
            (this._currentAnnonymousDefineCall = {
              stack: L,
              dependencies: l,
              callback: f
            });
        }),
        (u.prototype.defineModule = function(l, f, L, a, _, g) {
          var m = this;
          g === void 0 && (g = new t(l));
          var i = this._moduleIdProvider.getModuleId(l);
          if (this._modules2[i]) {
            this._config.isDuplicateMessageIgnoredFor(l) ||
              console.warn("Duplicate definition of module '" + l + "'");
            return;
          }
          var s = new E(i, l, this._normalizeDependencies(f, g), L, a, g);
          (this._modules2[i] = s),
            this._config.isBuild() &&
              ((this._buildInfoDefineStack[i] = _),
              (this._buildInfoDependencies[i] = (s.dependencies || []).map(
                function(d) {
                  return m._moduleIdProvider.getStrModuleId(d.id);
                }
              ))),
            this._resolve(s);
        }),
        (u.prototype._normalizeDependency = function(l, f) {
          if (l === "exports") return p.EXPORTS;
          if (l === "module") return p.MODULE;
          if (l === "require") return p.REQUIRE;
          var L = l.indexOf("!");
          if (L >= 0) {
            var a = f.resolveModule(l.substr(0, L)),
              _ = f.resolveModule(l.substr(L + 1)),
              g = this._moduleIdProvider.getModuleId(a + "!" + _),
              m = this._moduleIdProvider.getModuleId(a);
            return new o(g, m, _);
          }
          return new p(this._moduleIdProvider.getModuleId(f.resolveModule(l)));
        }),
        (u.prototype._normalizeDependencies = function(l, f) {
          for (var L = [], a = 0, _ = 0, g = l.length; _ < g; _++)
            L[a++] = this._normalizeDependency(l[_], f);
          return L;
        }),
        (u.prototype._relativeRequire = function(l, f, L, a) {
          if (typeof f == "string") return this.synchronousRequire(f, l);
          this.defineModule(
            I.Utilities.generateAnonymousModule(),
            f,
            L,
            a,
            null,
            l
          );
        }),
        (u.prototype.synchronousRequire = function(l, f) {
          f === void 0 && (f = new t(l));
          var L = this._normalizeDependency(l, f),
            a = this._modules2[L.id];
          if (!a)
            throw new Error(
              "Check dependency list! Synchronous require cannot resolve module '" +
                l +
                "'. This is the first mention of this module!"
            );
          if (!a.isComplete())
            throw new Error(
              "Check dependency list! Synchronous require cannot resolve module '" +
                l +
                "'. This module has not been resolved completely yet."
            );
          if (a.error) throw a.error;
          return a.exports;
        }),
        (u.prototype.configure = function(l, f) {
          var L = this._config.shouldRecordStats();
          f
            ? (this._config = new I.Configuration(this._env, l))
            : (this._config = this._config.cloneAndMerge(l)),
            this._config.shouldRecordStats() && !L && (this._recorder = null);
        }),
        (u.prototype.getConfig = function() {
          return this._config;
        }),
        (u.prototype._onLoad = function(l) {
          if (this._currentAnnonymousDefineCall !== null) {
            var f = this._currentAnnonymousDefineCall;
            (this._currentAnnonymousDefineCall = null),
              this.defineModule(
                this._moduleIdProvider.getStrModuleId(l),
                f.dependencies,
                f.callback,
                null,
                f.stack
              );
          }
        }),
        (u.prototype._createLoadError = function(l, f) {
          var L = this,
            a = this._moduleIdProvider.getStrModuleId(l),
            _ = (this._inverseDependencies2[l] || []).map(function(m) {
              return L._moduleIdProvider.getStrModuleId(m);
            }),
            g = I.ensureError(f);
          return (g.phase = "loading"), (g.moduleId = a), (g.neededBy = _), g;
        }),
        (u.prototype._onLoadError = function(l, f) {
          var L = this._createLoadError(l, f);
          this._modules2[l] ||
            (this._modules2[l] = new E(
              l,
              this._moduleIdProvider.getStrModuleId(l),
              [],
              function() {},
              function() {},
              null
            ));
          for (
            var a = [], _ = 0, g = this._moduleIdProvider.getMaxModuleId();
            _ < g;
            _++
          )
            a[_] = !1;
          var m = !1,
            i = [];
          for (i.push(l), a[l] = !0; i.length > 0; ) {
            var s = i.shift(),
              d = this._modules2[s];
            d && (m = d.onDependencyError(L) || m);
            var S = this._inverseDependencies2[s];
            if (S)
              for (var _ = 0, g = S.length; _ < g; _++) {
                var n = S[_];
                a[n] || (i.push(n), (a[n] = !0));
              }
          }
          m || this._config.onError(L);
        }),
        (u.prototype._hasDependencyPath = function(l, f) {
          var L = this._modules2[l];
          if (!L) return !1;
          for (
            var a = [], _ = 0, g = this._moduleIdProvider.getMaxModuleId();
            _ < g;
            _++
          )
            a[_] = !1;
          var m = [];
          for (m.push(L), a[l] = !0; m.length > 0; ) {
            var i = m.shift(),
              s = i.dependencies;
            if (s)
              for (var _ = 0, g = s.length; _ < g; _++) {
                var d = s[_];
                if (d.id === f) return !0;
                var S = this._modules2[d.id];
                S && !a[d.id] && ((a[d.id] = !0), m.push(S));
              }
          }
          return !1;
        }),
        (u.prototype._findCyclePath = function(l, f, L) {
          if (l === f || L === 50) return [l];
          var a = this._modules2[l];
          if (!a) return null;
          var _ = a.dependencies;
          if (_)
            for (var g = 0, m = _.length; g < m; g++) {
              var i = this._findCyclePath(_[g].id, f, L + 1);
              if (i !== null) return i.push(l), i;
            }
          return null;
        }),
        (u.prototype._createRequire = function(l) {
          var f = this,
            L = function(a, _, g) {
              return f._relativeRequire(l, a, _, g);
            };
          return (
            (L.toUrl = function(a) {
              return f._config.requireToUrl(l.resolveModule(a));
            }),
            (L.getStats = function() {
              return f.getLoaderEvents();
            }),
            (L.hasDependencyCycle = function() {
              return f._hasDependencyCycle;
            }),
            (L.config = function(a, _) {
              _ === void 0 && (_ = !1), f.configure(a, _);
            }),
            (L.__$__nodeRequire = I.global.nodeRequire),
            L
          );
        }),
        (u.prototype._loadModule = function(l) {
          var f = this;
          if (!(this._modules2[l] || this._knownModules2[l])) {
            this._knownModules2[l] = !0;
            var L = this._moduleIdProvider.getStrModuleId(l),
              a = this._config.moduleIdToPaths(L),
              _ = /^@[^\/]+\/[^\/]+$/;
            this._env.isNode &&
              (L.indexOf("/") === -1 || _.test(L)) &&
              a.push("node|" + L);
            var g = -1,
              m = function(i) {
                if ((g++, g >= a.length)) f._onLoadError(l, i);
                else {
                  var s = a[g],
                    d = f.getRecorder();
                  if (f._config.isBuild() && s === "empty:") {
                    (f._buildInfoPath[l] = s),
                      f.defineModule(
                        f._moduleIdProvider.getStrModuleId(l),
                        [],
                        null,
                        null,
                        null
                      ),
                      f._onLoad(l);
                    return;
                  }
                  d.record(10, s),
                    f._scriptLoader.load(
                      f,
                      s,
                      function() {
                        f._config.isBuild() && (f._buildInfoPath[l] = s),
                          d.record(11, s),
                          f._onLoad(l);
                      },
                      function(S) {
                        d.record(12, s), m(S);
                      }
                    );
                }
              };
            m(null);
          }
        }),
        (u.prototype._loadPluginDependency = function(l, f) {
          var L = this;
          if (!(this._modules2[f.id] || this._knownModules2[f.id])) {
            this._knownModules2[f.id] = !0;
            var a = function(_) {
              L.defineModule(
                L._moduleIdProvider.getStrModuleId(f.id),
                [],
                _,
                null,
                null
              );
            };
            (a.error = function(_) {
              L._config.onError(L._createLoadError(f.id, _));
            }),
              l.load(
                f.pluginParam,
                this._createRequire(t.ROOT),
                a,
                this._config.getOptionsLiteral()
              );
          }
        }),
        (u.prototype._resolve = function(l) {
          var f = this,
            L = l.dependencies;
          if (L)
            for (var a = 0, _ = L.length; a < _; a++) {
              var g = L[a];
              if (g === p.EXPORTS) {
                (l.exportsPassedIn = !0), l.unresolvedDependenciesCount--;
                continue;
              }
              if (g === p.MODULE) {
                l.unresolvedDependenciesCount--;
                continue;
              }
              if (g === p.REQUIRE) {
                l.unresolvedDependenciesCount--;
                continue;
              }
              var m = this._modules2[g.id];
              if (m && m.isComplete()) {
                if (m.error) {
                  l.onDependencyError(m.error);
                  return;
                }
                l.unresolvedDependenciesCount--;
                continue;
              }
              if (this._hasDependencyPath(g.id, l.id)) {
                (this._hasDependencyCycle = !0),
                  console.warn(
                    "There is a dependency cycle between '" +
                      this._moduleIdProvider.getStrModuleId(g.id) +
                      "' and '" +
                      this._moduleIdProvider.getStrModuleId(l.id) +
                      "'. The cyclic path follows:"
                  );
                var i = this._findCyclePath(g.id, l.id, 0) || [];
                i.reverse(),
                  i.push(g.id),
                  console.warn(
                    i.map(function(S) {
                      return f._moduleIdProvider.getStrModuleId(S);
                    }).join(` => 
`)
                  ),
                  l.unresolvedDependenciesCount--;
                continue;
              }
              if (
                ((this._inverseDependencies2[g.id] =
                  this._inverseDependencies2[g.id] || []),
                this._inverseDependencies2[g.id].push(l.id),
                g instanceof o)
              ) {
                var s = this._modules2[g.pluginId];
                if (s && s.isComplete()) {
                  this._loadPluginDependency(s.exports, g);
                  continue;
                }
                var d = this._inversePluginDependencies2.get(g.pluginId);
                d ||
                  ((d = []),
                  this._inversePluginDependencies2.set(g.pluginId, d)),
                  d.push(g),
                  this._loadModule(g.pluginId);
                continue;
              }
              this._loadModule(g.id);
            }
          l.unresolvedDependenciesCount === 0 && this._onModuleComplete(l);
        }),
        (u.prototype._onModuleComplete = function(l) {
          var f = this,
            L = this.getRecorder();
          if (!l.isComplete()) {
            var a = l.dependencies,
              _ = [];
            if (a)
              for (var g = 0, m = a.length; g < m; g++) {
                var i = a[g];
                if (i === p.EXPORTS) {
                  _[g] = l.exports;
                  continue;
                }
                if (i === p.MODULE) {
                  _[g] = {
                    id: l.strId,
                    config: function() {
                      return f._config.getConfigForModule(l.strId);
                    }
                  };
                  continue;
                }
                if (i === p.REQUIRE) {
                  _[g] = this._createRequire(l.moduleIdResolver);
                  continue;
                }
                var s = this._modules2[i.id];
                if (s) {
                  _[g] = s.exports;
                  continue;
                }
                _[g] = null;
              }
            l.complete(L, this._config, _);
            var d = this._inverseDependencies2[l.id];
            if (((this._inverseDependencies2[l.id] = null), d))
              for (var g = 0, m = d.length; g < m; g++) {
                var S = d[g],
                  n = this._modules2[S];
                n.unresolvedDependenciesCount--,
                  n.unresolvedDependenciesCount === 0 &&
                    this._onModuleComplete(n);
              }
            var r = this._inversePluginDependencies2.get(l.id);
            if (r) {
              this._inversePluginDependencies2.delete(l.id);
              for (var g = 0, m = r.length; g < m; g++)
                this._loadPluginDependency(l.exports, r[g]);
            }
          }
        }),
        u
      );
    })();
    I.ModuleManager = h;
  })(Z || (Z = {}));
  var z, Z;
  (function(I) {
    var t = new I.Environment(),
      E = null,
      M = function(u, l, f) {
        typeof u != "string" && ((f = l), (l = u), (u = null)),
          (typeof l != "object" || !Array.isArray(l)) && ((f = l), (l = null)),
          l || (l = ["require", "exports", "module"]),
          u
            ? E.defineModule(u, l, f, null, null)
            : E.enqueueDefineAnonymousModule(l, f);
      };
    M.amd = { jQuery: !0 };
    var p = function(u, l) {
        l === void 0 && (l = !1), E.configure(u, l);
      },
      o = function() {
        if (arguments.length === 1) {
          if (arguments[0] instanceof Object && !Array.isArray(arguments[0])) {
            p(arguments[0]);
            return;
          }
          if (typeof arguments[0] == "string")
            return E.synchronousRequire(arguments[0]);
        }
        if (
          (arguments.length === 2 || arguments.length === 3) &&
          Array.isArray(arguments[0])
        ) {
          E.defineModule(
            I.Utilities.generateAnonymousModule(),
            arguments[0],
            arguments[1],
            arguments[2],
            null
          );
          return;
        }
        throw new Error("Unrecognized require call");
      };
    (o.config = p),
      (o.getConfig = function() {
        return E.getConfig().getOptionsLiteral();
      }),
      (o.reset = function() {
        E = E.reset();
      }),
      (o.getBuildInfo = function() {
        return E.getBuildInfo();
      }),
      (o.getStats = function() {
        return E.getLoaderEvents();
      }),
      (o.define = function() {
        return M.apply(null, arguments);
      });
    function h() {
      if (
        typeof I.global.require != "undefined" ||
        typeof require != "undefined"
      ) {
        var u = I.global.require || require;
        if (typeof u == "function" && typeof u.resolve == "function") {
          var l = I.ensureRecordedNodeRequire(E.getRecorder(), u);
          (I.global.nodeRequire = l),
            (o.nodeRequire = l),
            (o.__$__nodeRequire = l);
        }
      }
      t.isNode && !t.isElectronRenderer
        ? ((module.exports = o), (require = o))
        : (t.isElectronRenderer || (I.global.define = M),
          (I.global.require = o));
    }
    (I.init = h),
      (typeof I.global.define != "function" || !I.global.define.amd) &&
        ((E = new I.ModuleManager(
          t,
          I.createScriptLoader(t),
          M,
          o,
          I.Utilities.getHighPerformanceTimestamp()
        )),
        typeof I.global.require != "undefined" &&
          typeof I.global.require != "function" &&
          o.config(I.global.require),
        (z = function() {
          return M.apply(null, arguments);
        }),
        (z.amd = M.amd),
        typeof doNotInitLoader == "undefined" && h());
  })(Z || (Z = {})),
    z(G[14], Q([0, 1]), function(I, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.DiffChange = void 0);
      class E {
        constructor(p, o, h, u) {
          (this.originalStart = p),
            (this.originalLength = o),
            (this.modifiedStart = h),
            (this.modifiedLength = u);
        }
        getOriginalEnd() {
          return this.originalStart + this.originalLength;
        }
        getModifiedEnd() {
          return this.modifiedStart + this.modifiedLength;
        }
      }
      t.DiffChange = E;
    }),
    z(G[4], Q([0, 1]), function(I, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.illegalState = t.illegalArgument = t.canceled = t.isPromiseCanceledError = t.transformErrorForSerialization = t.onUnexpectedExternalError = t.onUnexpectedError = t.errorHandler = t.ErrorHandler = void 0);
      class E {
        constructor() {
          (this.listeners = []),
            (this.unexpectedErrorHandler = function(_) {
              setTimeout(() => {
                throw _.stack
                  ? new Error(
                      _.message +
                        `

` +
                        _.stack
                    )
                  : _;
              }, 0);
            });
        }
        emit(_) {
          this.listeners.forEach(g => {
            g(_);
          });
        }
        onUnexpectedError(_) {
          this.unexpectedErrorHandler(_), this.emit(_);
        }
        onUnexpectedExternalError(_) {
          this.unexpectedErrorHandler(_);
        }
      }
      (t.ErrorHandler = E), (t.errorHandler = new E());
      function M(a) {
        u(a) || t.errorHandler.onUnexpectedError(a);
      }
      t.onUnexpectedError = M;
      function p(a) {
        u(a) || t.errorHandler.onUnexpectedExternalError(a);
      }
      t.onUnexpectedExternalError = p;
      function o(a) {
        if (a instanceof Error) {
          let { name: _, message: g } = a;
          const m = a.stacktrace || a.stack;
          return { $isError: !0, name: _, message: g, stack: m };
        }
        return a;
      }
      t.transformErrorForSerialization = o;
      const h = "Canceled";
      function u(a) {
        return a instanceof Error && a.name === h && a.message === h;
      }
      t.isPromiseCanceledError = u;
      function l() {
        const a = new Error(h);
        return (a.name = a.message), a;
      }
      t.canceled = l;
      function f(a) {
        return a
          ? new Error(`Illegal argument: ${a}`)
          : new Error("Illegal argument");
      }
      t.illegalArgument = f;
      function L(a) {
        return a
          ? new Error(`Illegal state: ${a}`)
          : new Error("Illegal state");
      }
      t.illegalState = L;
    }),
    z(G[15], Q([0, 1]), function(I, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Iterable = void 0);
      var E;
      (function(M) {
        function p(c) {
          return (
            c && typeof c == "object" && typeof c[Symbol.iterator] == "function"
          );
        }
        M.is = p;
        const o = Object.freeze([]);
        function h() {
          return o;
        }
        M.empty = h;
        function* u(c) {
          yield c;
        }
        M.single = u;
        function l(c) {
          return c || o;
        }
        M.from = l;
        function f(c) {
          return !c || c[Symbol.iterator]().next().done === !0;
        }
        M.isEmpty = f;
        function L(c) {
          return c[Symbol.iterator]().next().value;
        }
        M.first = L;
        function a(c, C) {
          for (const b of c) if (C(b)) return !0;
          return !1;
        }
        M.some = a;
        function _(c, C) {
          for (const b of c) if (C(b)) return b;
        }
        M.find = _;
        function* g(c, C) {
          for (const b of c) C(b) && (yield b);
        }
        M.filter = g;
        function* m(c, C) {
          let b = 0;
          for (const v of c) yield C(v, b++);
        }
        M.map = m;
        function* i(...c) {
          for (const C of c) for (const b of C) yield b;
        }
        M.concat = i;
        function* s(c) {
          for (const C of c) for (const b of C) yield b;
        }
        M.concatNested = s;
        function d(c, C, b) {
          let v = b;
          for (const w of c) v = C(v, w);
          return v;
        }
        M.reduce = d;
        function* S(c, C, b = c.length) {
          for (
            C < 0 && (C += c.length),
              b < 0 ? (b += c.length) : b > c.length && (b = c.length);
            C < b;
            C++
          )
            yield c[C];
        }
        M.slice = S;
        function n(c, C = Number.POSITIVE_INFINITY) {
          const b = [];
          if (C === 0) return [b, c];
          const v = c[Symbol.iterator]();
          for (let w = 0; w < C; w++) {
            const N = v.next();
            if (N.done) return [b, M.empty()];
            b.push(N.value);
          }
          return [
            b,
            {
              [Symbol.iterator]() {
                return v;
              }
            }
          ];
        }
        M.consume = n;
        function r(c, C, b = (v, w) => v === w) {
          const v = c[Symbol.iterator](),
            w = C[Symbol.iterator]();
          for (;;) {
            const N = v.next(),
              y = w.next();
            if (N.done !== y.done) return !1;
            if (N.done) return !0;
            if (!b(N.value, y.value)) return !1;
          }
        }
        M.equals = r;
      })((E = t.Iterable || (t.Iterable = {})));
    }),
    z(G[16], Q([0, 1, 4]), function(I, t, E) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.ResolvedKeybinding = t.ResolvedKeybindingPart = t.ChordKeybinding = t.SimpleKeybinding = t.createSimpleKeybinding = t.createKeybinding = t.KeyChord = t.KeyCodeUtils = void 0);
      class M {
        constructor() {
          (this._keyCodeToStr = []), (this._strToKeyCode = Object.create(null));
        }
        define(s, d) {
          (this._keyCodeToStr[s] = d),
            (this._strToKeyCode[d.toLowerCase()] = s);
        }
        keyCodeToStr(s) {
          return this._keyCodeToStr[s];
        }
        strToKeyCode(s) {
          return this._strToKeyCode[s.toLowerCase()] || 0;
        }
      }
      const p = new M(),
        o = new M(),
        h = new M();
      (function() {
        function i(s, d, S = d, n = S) {
          p.define(s, d), o.define(s, S), h.define(s, n);
        }
        i(0, "unknown"),
          i(1, "Backspace"),
          i(2, "Tab"),
          i(3, "Enter"),
          i(4, "Shift"),
          i(5, "Ctrl"),
          i(6, "Alt"),
          i(7, "PauseBreak"),
          i(8, "CapsLock"),
          i(9, "Escape"),
          i(10, "Space"),
          i(11, "PageUp"),
          i(12, "PageDown"),
          i(13, "End"),
          i(14, "Home"),
          i(15, "LeftArrow", "Left"),
          i(16, "UpArrow", "Up"),
          i(17, "RightArrow", "Right"),
          i(18, "DownArrow", "Down"),
          i(19, "Insert"),
          i(20, "Delete"),
          i(21, "0"),
          i(22, "1"),
          i(23, "2"),
          i(24, "3"),
          i(25, "4"),
          i(26, "5"),
          i(27, "6"),
          i(28, "7"),
          i(29, "8"),
          i(30, "9"),
          i(31, "A"),
          i(32, "B"),
          i(33, "C"),
          i(34, "D"),
          i(35, "E"),
          i(36, "F"),
          i(37, "G"),
          i(38, "H"),
          i(39, "I"),
          i(40, "J"),
          i(41, "K"),
          i(42, "L"),
          i(43, "M"),
          i(44, "N"),
          i(45, "O"),
          i(46, "P"),
          i(47, "Q"),
          i(48, "R"),
          i(49, "S"),
          i(50, "T"),
          i(51, "U"),
          i(52, "V"),
          i(53, "W"),
          i(54, "X"),
          i(55, "Y"),
          i(56, "Z"),
          i(57, "Meta"),
          i(58, "ContextMenu"),
          i(59, "F1"),
          i(60, "F2"),
          i(61, "F3"),
          i(62, "F4"),
          i(63, "F5"),
          i(64, "F6"),
          i(65, "F7"),
          i(66, "F8"),
          i(67, "F9"),
          i(68, "F10"),
          i(69, "F11"),
          i(70, "F12"),
          i(71, "F13"),
          i(72, "F14"),
          i(73, "F15"),
          i(74, "F16"),
          i(75, "F17"),
          i(76, "F18"),
          i(77, "F19"),
          i(78, "NumLock"),
          i(79, "ScrollLock"),
          i(80, ";", ";", "OEM_1"),
          i(81, "=", "=", "OEM_PLUS"),
          i(82, ",", ",", "OEM_COMMA"),
          i(83, "-", "-", "OEM_MINUS"),
          i(84, ".", ".", "OEM_PERIOD"),
          i(85, "/", "/", "OEM_2"),
          i(86, "`", "`", "OEM_3"),
          i(110, "ABNT_C1"),
          i(111, "ABNT_C2"),
          i(87, "[", "[", "OEM_4"),
          i(88, "\\", "\\", "OEM_5"),
          i(89, "]", "]", "OEM_6"),
          i(90, "'", "'", "OEM_7"),
          i(91, "OEM_8"),
          i(92, "OEM_102"),
          i(93, "NumPad0"),
          i(94, "NumPad1"),
          i(95, "NumPad2"),
          i(96, "NumPad3"),
          i(97, "NumPad4"),
          i(98, "NumPad5"),
          i(99, "NumPad6"),
          i(100, "NumPad7"),
          i(101, "NumPad8"),
          i(102, "NumPad9"),
          i(103, "NumPad_Multiply"),
          i(104, "NumPad_Add"),
          i(105, "NumPad_Separator"),
          i(106, "NumPad_Subtract"),
          i(107, "NumPad_Decimal"),
          i(108, "NumPad_Divide");
      })();
      var u;
      (function(i) {
        function s(c) {
          return p.keyCodeToStr(c);
        }
        i.toString = s;
        function d(c) {
          return p.strToKeyCode(c);
        }
        i.fromString = d;
        function S(c) {
          return o.keyCodeToStr(c);
        }
        i.toUserSettingsUS = S;
        function n(c) {
          return h.keyCodeToStr(c);
        }
        i.toUserSettingsGeneral = n;
        function r(c) {
          return o.strToKeyCode(c) || h.strToKeyCode(c);
        }
        i.fromUserSettings = r;
      })((u = t.KeyCodeUtils || (t.KeyCodeUtils = {})));
      function l(i, s) {
        const d = ((s & 65535) << 16) >>> 0;
        return (i | d) >>> 0;
      }
      t.KeyChord = l;
      function f(i, s) {
        if (i === 0) return null;
        const d = (i & 65535) >>> 0,
          S = (i & 4294901760) >>> 16;
        return S !== 0 ? new _([L(d, s), L(S, s)]) : new _([L(d, s)]);
      }
      t.createKeybinding = f;
      function L(i, s) {
        const d = !!(i & 2048),
          S = !!(i & 256),
          n = s === 2 ? S : d,
          r = !!(i & 1024),
          c = !!(i & 512),
          C = s === 2 ? d : S,
          b = i & 255;
        return new a(n, r, c, C, b);
      }
      t.createSimpleKeybinding = L;
      class a {
        constructor(s, d, S, n, r) {
          (this.ctrlKey = s),
            (this.shiftKey = d),
            (this.altKey = S),
            (this.metaKey = n),
            (this.keyCode = r);
        }
        equals(s) {
          return (
            this.ctrlKey === s.ctrlKey &&
            this.shiftKey === s.shiftKey &&
            this.altKey === s.altKey &&
            this.metaKey === s.metaKey &&
            this.keyCode === s.keyCode
          );
        }
        isModifierKey() {
          return (
            this.keyCode === 0 ||
            this.keyCode === 5 ||
            this.keyCode === 57 ||
            this.keyCode === 6 ||
            this.keyCode === 4
          );
        }
        toChord() {
          return new _([this]);
        }
        isDuplicateModifierCase() {
          return (
            (this.ctrlKey && this.keyCode === 5) ||
            (this.shiftKey && this.keyCode === 4) ||
            (this.altKey && this.keyCode === 6) ||
            (this.metaKey && this.keyCode === 57)
          );
        }
      }
      t.SimpleKeybinding = a;
      class _ {
        constructor(s) {
          if (s.length === 0) throw E.illegalArgument("parts");
          this.parts = s;
        }
      }
      t.ChordKeybinding = _;
      class g {
        constructor(s, d, S, n, r, c) {
          (this.ctrlKey = s),
            (this.shiftKey = d),
            (this.altKey = S),
            (this.metaKey = n),
            (this.keyLabel = r),
            (this.keyAriaLabel = c);
        }
      }
      t.ResolvedKeybindingPart = g;
      class m {}
      t.ResolvedKeybinding = m;
    }),
    z(G[7], Q([0, 1, 15]), function(I, t, E) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.ImmortalReference = t.MutableDisposable = t.Disposable = t.DisposableStore = t.toDisposable = t.combinedDisposable = t.dispose = t.isDisposable = t.MultiDisposeError = t.trackDisposable = void 0);
      const M = !1;
      let p = null;
      if (M) {
        const s = "__is_disposable_tracked__";
        p = new (class {
          trackDisposable(d) {
            const S = new Error("Potentially leaked disposable").stack;
            setTimeout(() => {
              d[s] || console.log(S);
            }, 3e3);
          }
          markTracked(d) {
            if (d && d !== g.None)
              try {
                d[s] = !0;
              } catch (S) {}
          }
        })();
      }
      function o(s) {
        !p || p.markTracked(s);
      }
      function h(s) {
        return p && p.trackDisposable(s), s;
      }
      t.trackDisposable = h;
      class u extends Error {
        constructor(d) {
          super(
            `Encountered errors while disposing of store. Errors: [${d.join(
              ", "
            )}]`
          );
          this.errors = d;
        }
      }
      t.MultiDisposeError = u;
      function l(s) {
        return typeof s.dispose == "function" && s.dispose.length === 0;
      }
      t.isDisposable = l;
      function f(s) {
        if (E.Iterable.is(s)) {
          let d = [];
          for (const S of s)
            if (S) {
              o(S);
              try {
                S.dispose();
              } catch (n) {
                d.push(n);
              }
            }
          if (d.length === 1) throw d[0];
          if (d.length > 1) throw new u(d);
          return Array.isArray(s) ? [] : s;
        } else if (s) return o(s), s.dispose(), s;
      }
      t.dispose = f;
      function L(...s) {
        return s.forEach(o), a(() => f(s));
      }
      t.combinedDisposable = L;
      function a(s) {
        const d = h({
          dispose: () => {
            o(d), s();
          }
        });
        return d;
      }
      t.toDisposable = a;
      class _ {
        constructor() {
          (this._toDispose = new Set()), (this._isDisposed = !1);
        }
        dispose() {
          this._isDisposed || (o(this), (this._isDisposed = !0), this.clear());
        }
        clear() {
          try {
            f(this._toDispose.values());
          } finally {
            this._toDispose.clear();
          }
        }
        add(d) {
          if (!d) return d;
          if (d === this)
            throw new Error("Cannot register a disposable on itself!");
          return (
            o(d),
            this._isDisposed
              ? _.DISABLE_DISPOSED_WARNING ||
                console.warn(
                  new Error(
                    "Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!"
                  ).stack
                )
              : this._toDispose.add(d),
            d
          );
        }
      }
      (t.DisposableStore = _), (_.DISABLE_DISPOSED_WARNING = !1);
      class g {
        constructor() {
          (this._store = new _()), h(this);
        }
        dispose() {
          o(this), this._store.dispose();
        }
        _register(d) {
          if (d === this)
            throw new Error("Cannot register a disposable on itself!");
          return this._store.add(d);
        }
      }
      (t.Disposable = g), (g.None = Object.freeze({ dispose() {} }));
      class m {
        constructor() {
          (this._isDisposed = !1), h(this);
        }
        get value() {
          return this._isDisposed ? void 0 : this._value;
        }
        set value(d) {
          var S;
          this._isDisposed ||
            d === this._value ||
            ((S = this._value) === null || S === void 0 || S.dispose(),
            d && o(d),
            (this._value = d));
        }
        clear() {
          this.value = void 0;
        }
        dispose() {
          var d;
          (this._isDisposed = !0),
            o(this),
            (d = this._value) === null || d === void 0 || d.dispose(),
            (this._value = void 0);
        }
      }
      t.MutableDisposable = m;
      class i {
        constructor(d) {
          this.object = d;
        }
        dispose() {}
      }
      t.ImmortalReference = i;
    }),
    z(G[17], Q([0, 1]), function(I, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.LinkedList = void 0);
      class E {
        constructor(o) {
          (this.element = o),
            (this.next = E.Undefined),
            (this.prev = E.Undefined);
        }
      }
      E.Undefined = new E(void 0);
      class M {
        constructor() {
          (this._first = E.Undefined),
            (this._last = E.Undefined),
            (this._size = 0);
        }
        get size() {
          return this._size;
        }
        isEmpty() {
          return this._first === E.Undefined;
        }
        clear() {
          let o = this._first;
          for (; o !== E.Undefined; ) {
            const h = o.next;
            (o.prev = E.Undefined), (o.next = E.Undefined), (o = h);
          }
          (this._first = E.Undefined),
            (this._last = E.Undefined),
            (this._size = 0);
        }
        unshift(o) {
          return this._insert(o, !1);
        }
        push(o) {
          return this._insert(o, !0);
        }
        _insert(o, h) {
          const u = new E(o);
          if (this._first === E.Undefined) (this._first = u), (this._last = u);
          else if (h) {
            const f = this._last;
            (this._last = u), (u.prev = f), (f.next = u);
          } else {
            const f = this._first;
            (this._first = u), (u.next = f), (f.prev = u);
          }
          this._size += 1;
          let l = !1;
          return () => {
            l || ((l = !0), this._remove(u));
          };
        }
        shift() {
          if (this._first !== E.Undefined) {
            const o = this._first.element;
            return this._remove(this._first), o;
          }
        }
        pop() {
          if (this._last !== E.Undefined) {
            const o = this._last.element;
            return this._remove(this._last), o;
          }
        }
        _remove(o) {
          if (o.prev !== E.Undefined && o.next !== E.Undefined) {
            const h = o.prev;
            (h.next = o.next), (o.next.prev = h);
          } else o.prev === E.Undefined && o.next === E.Undefined ? ((this._first = E.Undefined), (this._last = E.Undefined)) : o.next === E.Undefined ? ((this._last = this._last.prev), (this._last.next = E.Undefined)) : o.prev === E.Undefined && ((this._first = this._first.next), (this._first.prev = E.Undefined));
          this._size -= 1;
        }
        *[Symbol.iterator]() {
          let o = this._first;
          for (; o !== E.Undefined; ) yield o.element, (o = o.next);
        }
      }
      t.LinkedList = M;
    }),
    z(G[2], Q([0, 1]), function(I, t) {
      "use strict";
      var E;
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.isLittleEndian = t.OS = t.setImmediate = t.userAgent = t.isIOS = t.isWeb = t.isNative = t.isLinux = t.isMacintosh = t.isWindows = t.isPreferringBrowserCodeLoad = t.browserCodeLoadingCacheStrategy = t.isElectronSandboxed = t.globals = void 0);
      const M = "en";
      let p = !1,
        o = !1,
        h = !1,
        u = !1,
        l = !1,
        f = !1,
        L = !1,
        a,
        _ = M,
        g,
        m;
      t.globals =
        typeof self == "object"
          ? self
          : typeof global == "object"
          ? global
          : {};
      let i;
      typeof t.globals.vscode != "undefined" &&
      typeof t.globals.vscode.process != "undefined"
        ? (i = t.globals.vscode.process)
        : typeof process != "undefined" && (i = process);
      const s =
        typeof ((E = i == null ? void 0 : i.versions) === null || E === void 0
          ? void 0
          : E.electron) == "string" && i.type === "renderer";
      if (
        ((t.isElectronSandboxed = s && (i == null ? void 0 : i.sandboxed)),
        (t.browserCodeLoadingCacheStrategy = (() => {
          if (t.isElectronSandboxed) return "bypassHeatCheck";
          const c = i == null ? void 0 : i.env.VSCODE_BROWSER_CODE_LOADING;
          if (typeof c == "string")
            return c === "none" ||
              c === "code" ||
              c === "bypassHeatCheck" ||
              c === "bypassHeatCheckAndEagerCompile"
              ? c
              : "bypassHeatCheck";
        })()),
        (t.isPreferringBrowserCodeLoad =
          typeof t.browserCodeLoadingCacheStrategy == "string"),
        typeof navigator == "object" && !s)
      )
        (m = navigator.userAgent),
          (p = m.indexOf("Windows") >= 0),
          (o = m.indexOf("Macintosh") >= 0),
          (L =
            (m.indexOf("Macintosh") >= 0 ||
              m.indexOf("iPad") >= 0 ||
              m.indexOf("iPhone") >= 0) &&
            !!navigator.maxTouchPoints &&
            navigator.maxTouchPoints > 0),
          (h = m.indexOf("Linux") >= 0),
          (f = !0),
          (a = navigator.language),
          (_ = a);
      else if (typeof i == "object") {
        (p = i.platform === "win32"),
          (o = i.platform === "darwin"),
          (h = i.platform === "linux"),
          (u = h && !!i.env.SNAP && !!i.env.SNAP_REVISION),
          (a = M),
          (_ = M);
        const c = i.env.VSCODE_NLS_CONFIG;
        if (c)
          try {
            const C = JSON.parse(c),
              b = C.availableLanguages["*"];
            (a = C.locale), (_ = b || M), (g = C._translationsConfigFile);
          } catch (C) {}
        l = !0;
      } else console.error("Unable to resolve platform.");
      let d = 0;
      o ? (d = 1) : p ? (d = 3) : h && (d = 2),
        (t.isWindows = p),
        (t.isMacintosh = o),
        (t.isLinux = h),
        (t.isNative = l),
        (t.isWeb = f),
        (t.isIOS = L),
        (t.userAgent = m),
        (t.setImmediate = (function() {
          if (t.globals.setImmediate)
            return t.globals.setImmediate.bind(t.globals);
          if (
            typeof t.globals.postMessage == "function" &&
            !t.globals.importScripts
          ) {
            let b = [];
            t.globals.addEventListener("message", w => {
              if (w.data && w.data.vscodeSetImmediateId)
                for (let N = 0, y = b.length; N < y; N++) {
                  const P = b[N];
                  if (P.id === w.data.vscodeSetImmediateId) {
                    b.splice(N, 1), P.callback();
                    return;
                  }
                }
            });
            let v = 0;
            return w => {
              const N = ++v;
              b.push({ id: N, callback: w }),
                t.globals.postMessage({ vscodeSetImmediateId: N }, "*");
            };
          }
          if (typeof (i == null ? void 0 : i.nextTick) == "function")
            return i.nextTick.bind(i);
          const C = Promise.resolve();
          return b => C.then(b);
        })()),
        (t.OS = o || L ? 2 : p ? 1 : 3);
      let S = !0,
        n = !1;
      function r() {
        if (!n) {
          n = !0;
          const c = new Uint8Array(2);
          (c[0] = 1),
            (c[1] = 2),
            (S = new Uint16Array(c.buffer)[0] === (2 << 8) + 1);
        }
        return S;
      }
      t.isLittleEndian = r;
    }),
    z(G[18], Q([0, 1, 2]), function(I, t, E) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.platform = t.env = t.cwd = void 0);
      let M;
      if (
        typeof E.globals.vscode != "undefined" &&
        typeof E.globals.vscode.process != "undefined"
      ) {
        const p = E.globals.vscode.process;
        M = {
          get platform() {
            return p.platform;
          },
          get env() {
            return p.env;
          },
          cwd() {
            return p.cwd();
          },
          nextTick(o) {
            return E.setImmediate(o);
          }
        };
      } else
        typeof process != "undefined"
          ? (M = {
              get platform() {
                return process.platform;
              },
              get env() {
                return process.env;
              },
              cwd() {
                return process.env.VSCODE_CWD || process.cwd();
              },
              nextTick(p) {
                return process.nextTick(p);
              }
            })
          : (M = {
              get platform() {
                return E.isWindows
                  ? "win32"
                  : E.isMacintosh
                  ? "darwin"
                  : "linux";
              },
              nextTick(p) {
                return E.setImmediate(p);
              },
              get env() {
                return {};
              },
              cwd() {
                return "/";
              }
            });
      (t.cwd = M.cwd), (t.env = M.env), (t.platform = M.platform);
    }),
    z(G[19], Q([0, 1, 18]), function(I, t, E) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.sep = t.extname = t.basename = t.dirname = t.relative = t.resolve = t.normalize = t.posix = t.win32 = void 0);
      const M = 65,
        p = 97,
        o = 90,
        h = 122,
        u = 46,
        l = 47,
        f = 92,
        L = 58,
        a = 63;
      class _ extends Error {
        constructor(r, c, C) {
          let b;
          typeof c == "string" && c.indexOf("not ") === 0
            ? ((b = "must not be"), (c = c.replace(/^not /, "")))
            : (b = "must be");
          const v = r.indexOf(".") !== -1 ? "property" : "argument";
          let w = `The "${r}" ${v} ${b} of type ${c}`;
          (w += `. Received type ${typeof C}`),
            super(w),
            (this.code = "ERR_INVALID_ARG_TYPE");
        }
      }
      function g(n, r) {
        if (typeof n != "string") throw new _(r, "string", n);
      }
      function m(n) {
        return n === l || n === f;
      }
      function i(n) {
        return n === l;
      }
      function s(n) {
        return (n >= M && n <= o) || (n >= p && n <= h);
      }
      function d(n, r, c, C) {
        let b = "",
          v = 0,
          w = -1,
          N = 0,
          y = 0;
        for (let P = 0; P <= n.length; ++P) {
          if (P < n.length) y = n.charCodeAt(P);
          else {
            if (C(y)) break;
            y = l;
          }
          if (C(y)) {
            if (!(w === P - 1 || N === 1))
              if (N === 2) {
                if (
                  b.length < 2 ||
                  v !== 2 ||
                  b.charCodeAt(b.length - 1) !== u ||
                  b.charCodeAt(b.length - 2) !== u
                ) {
                  if (b.length > 2) {
                    const U = b.lastIndexOf(c);
                    U === -1
                      ? ((b = ""), (v = 0))
                      : ((b = b.slice(0, U)),
                        (v = b.length - 1 - b.lastIndexOf(c))),
                      (w = P),
                      (N = 0);
                    continue;
                  } else if (b.length !== 0) {
                    (b = ""), (v = 0), (w = P), (N = 0);
                    continue;
                  }
                }
                r && ((b += b.length > 0 ? `${c}..` : ".."), (v = 2));
              } else
                b.length > 0
                  ? (b += `${c}${n.slice(w + 1, P)}`)
                  : (b = n.slice(w + 1, P)),
                  (v = P - w - 1);
            (w = P), (N = 0);
          } else y === u && N !== -1 ? ++N : (N = -1);
        }
        return b;
      }
      function S(n, r) {
        if (r === null || typeof r != "object")
          throw new _("pathObject", "Object", r);
        const c = r.dir || r.root,
          C = r.base || `${r.name || ""}${r.ext || ""}`;
        return c ? (c === r.root ? `${c}${C}` : `${c}${n}${C}`) : C;
      }
      (t.win32 = {
        resolve(...n) {
          let r = "",
            c = "",
            C = !1;
          for (let b = n.length - 1; b >= -1; b--) {
            let v;
            if (b >= 0) {
              if (((v = n[b]), g(v, "path"), v.length === 0)) continue;
            } else
              r.length === 0
                ? (v = E.cwd())
                : ((v = E.env[`=${r}`] || E.cwd()),
                  (v === void 0 ||
                    (v.slice(0, 2).toLowerCase() !== r.toLowerCase() &&
                      v.charCodeAt(2) === f)) &&
                    (v = `${r}\\`));
            const w = v.length;
            let N = 0,
              y = "",
              P = !1;
            const U = v.charCodeAt(0);
            if (w === 1) m(U) && ((N = 1), (P = !0));
            else if (m(U))
              if (((P = !0), m(v.charCodeAt(1)))) {
                let R = 2,
                  q = R;
                for (; R < w && !m(v.charCodeAt(R)); ) R++;
                if (R < w && R !== q) {
                  const Y = v.slice(q, R);
                  for (q = R; R < w && m(v.charCodeAt(R)); ) R++;
                  if (R < w && R !== q) {
                    for (q = R; R < w && !m(v.charCodeAt(R)); ) R++;
                    (R === w || R !== q) &&
                      ((y = `\\\\${Y}\\${v.slice(q, R)}`), (N = R));
                  }
                }
              } else N = 1;
            else
              s(U) &&
                v.charCodeAt(1) === L &&
                ((y = v.slice(0, 2)),
                (N = 2),
                w > 2 && m(v.charCodeAt(2)) && ((P = !0), (N = 3)));
            if (y.length > 0)
              if (r.length > 0) {
                if (y.toLowerCase() !== r.toLowerCase()) continue;
              } else r = y;
            if (C) {
              if (r.length > 0) break;
            } else if (
              ((c = `${v.slice(N)}\\${c}`), (C = P), P && r.length > 0)
            )
              break;
          }
          return (c = d(c, !C, "\\", m)), C ? `${r}\\${c}` : `${r}${c}` || ".";
        },
        normalize(n) {
          g(n, "path");
          const r = n.length;
          if (r === 0) return ".";
          let c = 0,
            C,
            b = !1;
          const v = n.charCodeAt(0);
          if (r === 1) return i(v) ? "\\" : n;
          if (m(v))
            if (((b = !0), m(n.charCodeAt(1)))) {
              let N = 2,
                y = N;
              for (; N < r && !m(n.charCodeAt(N)); ) N++;
              if (N < r && N !== y) {
                const P = n.slice(y, N);
                for (y = N; N < r && m(n.charCodeAt(N)); ) N++;
                if (N < r && N !== y) {
                  for (y = N; N < r && !m(n.charCodeAt(N)); ) N++;
                  if (N === r) return `\\\\${P}\\${n.slice(y)}\\`;
                  N !== y && ((C = `\\\\${P}\\${n.slice(y, N)}`), (c = N));
                }
              }
            } else c = 1;
          else
            s(v) &&
              n.charCodeAt(1) === L &&
              ((C = n.slice(0, 2)),
              (c = 2),
              r > 2 && m(n.charCodeAt(2)) && ((b = !0), (c = 3)));
          let w = c < r ? d(n.slice(c), !b, "\\", m) : "";
          return (
            w.length === 0 && !b && (w = "."),
            w.length > 0 && m(n.charCodeAt(r - 1)) && (w += "\\"),
            C === void 0 ? (b ? `\\${w}` : w) : b ? `${C}\\${w}` : `${C}${w}`
          );
        },
        isAbsolute(n) {
          g(n, "path");
          const r = n.length;
          if (r === 0) return !1;
          const c = n.charCodeAt(0);
          return (
            m(c) ||
            (r > 2 && s(c) && n.charCodeAt(1) === L && m(n.charCodeAt(2)))
          );
        },
        join(...n) {
          if (n.length === 0) return ".";
          let r, c;
          for (let v = 0; v < n.length; ++v) {
            const w = n[v];
            g(w, "path"),
              w.length > 0 && (r === void 0 ? (r = c = w) : (r += `\\${w}`));
          }
          if (r === void 0) return ".";
          let C = !0,
            b = 0;
          if (typeof c == "string" && m(c.charCodeAt(0))) {
            ++b;
            const v = c.length;
            v > 1 &&
              m(c.charCodeAt(1)) &&
              (++b, v > 2 && (m(c.charCodeAt(2)) ? ++b : (C = !1)));
          }
          if (C) {
            for (; b < r.length && m(r.charCodeAt(b)); ) b++;
            b >= 2 && (r = `\\${r.slice(b)}`);
          }
          return t.win32.normalize(r);
        },
        relative(n, r) {
          if ((g(n, "from"), g(r, "to"), n === r)) return "";
          const c = t.win32.resolve(n),
            C = t.win32.resolve(r);
          if (
            c === C ||
            ((n = c.toLowerCase()), (r = C.toLowerCase()), n === r)
          )
            return "";
          let b = 0;
          for (; b < n.length && n.charCodeAt(b) === f; ) b++;
          let v = n.length;
          for (; v - 1 > b && n.charCodeAt(v - 1) === f; ) v--;
          const w = v - b;
          let N = 0;
          for (; N < r.length && r.charCodeAt(N) === f; ) N++;
          let y = r.length;
          for (; y - 1 > N && r.charCodeAt(y - 1) === f; ) y--;
          const P = y - N,
            U = w < P ? w : P;
          let R = -1,
            q = 0;
          for (; q < U; q++) {
            const j = n.charCodeAt(b + q);
            if (j !== r.charCodeAt(N + q)) break;
            j === f && (R = q);
          }
          if (q !== U) {
            if (R === -1) return C;
          } else {
            if (P > U) {
              if (r.charCodeAt(N + q) === f) return C.slice(N + q + 1);
              if (q === 2) return C.slice(N + q);
            }
            w > U && (n.charCodeAt(b + q) === f ? (R = q) : q === 2 && (R = 3)),
              R === -1 && (R = 0);
          }
          let Y = "";
          for (q = b + R + 1; q <= v; ++q)
            (q === v || n.charCodeAt(q) === f) &&
              (Y += Y.length === 0 ? ".." : "\\..");
          return (
            (N += R),
            Y.length > 0
              ? `${Y}${C.slice(N, y)}`
              : (C.charCodeAt(N) === f && ++N, C.slice(N, y))
          );
        },
        toNamespacedPath(n) {
          if (typeof n != "string") return n;
          if (n.length === 0) return "";
          const r = t.win32.resolve(n);
          if (r.length <= 2) return n;
          if (r.charCodeAt(0) === f) {
            if (r.charCodeAt(1) === f) {
              const c = r.charCodeAt(2);
              if (c !== a && c !== u) return `\\\\?\\UNC\\${r.slice(2)}`;
            }
          } else if (
            s(r.charCodeAt(0)) &&
            r.charCodeAt(1) === L &&
            r.charCodeAt(2) === f
          )
            return `\\\\?\\${r}`;
          return n;
        },
        dirname(n) {
          g(n, "path");
          const r = n.length;
          if (r === 0) return ".";
          let c = -1,
            C = 0;
          const b = n.charCodeAt(0);
          if (r === 1) return m(b) ? n : ".";
          if (m(b)) {
            if (((c = C = 1), m(n.charCodeAt(1)))) {
              let N = 2,
                y = N;
              for (; N < r && !m(n.charCodeAt(N)); ) N++;
              if (N < r && N !== y) {
                for (y = N; N < r && m(n.charCodeAt(N)); ) N++;
                if (N < r && N !== y) {
                  for (y = N; N < r && !m(n.charCodeAt(N)); ) N++;
                  if (N === r) return n;
                  N !== y && (c = C = N + 1);
                }
              }
            }
          } else
            s(b) &&
              n.charCodeAt(1) === L &&
              ((c = r > 2 && m(n.charCodeAt(2)) ? 3 : 2), (C = c));
          let v = -1,
            w = !0;
          for (let N = r - 1; N >= C; --N)
            if (m(n.charCodeAt(N))) {
              if (!w) {
                v = N;
                break;
              }
            } else w = !1;
          if (v === -1) {
            if (c === -1) return ".";
            v = c;
          }
          return n.slice(0, v);
        },
        basename(n, r) {
          r !== void 0 && g(r, "ext"), g(n, "path");
          let c = 0,
            C = -1,
            b = !0,
            v;
          if (
            (n.length >= 2 &&
              s(n.charCodeAt(0)) &&
              n.charCodeAt(1) === L &&
              (c = 2),
            r !== void 0 && r.length > 0 && r.length <= n.length)
          ) {
            if (r === n) return "";
            let w = r.length - 1,
              N = -1;
            for (v = n.length - 1; v >= c; --v) {
              const y = n.charCodeAt(v);
              if (m(y)) {
                if (!b) {
                  c = v + 1;
                  break;
                }
              } else
                N === -1 && ((b = !1), (N = v + 1)),
                  w >= 0 &&
                    (y === r.charCodeAt(w)
                      ? --w == -1 && (C = v)
                      : ((w = -1), (C = N)));
            }
            return (
              c === C ? (C = N) : C === -1 && (C = n.length), n.slice(c, C)
            );
          }
          for (v = n.length - 1; v >= c; --v)
            if (m(n.charCodeAt(v))) {
              if (!b) {
                c = v + 1;
                break;
              }
            } else C === -1 && ((b = !1), (C = v + 1));
          return C === -1 ? "" : n.slice(c, C);
        },
        extname(n) {
          g(n, "path");
          let r = 0,
            c = -1,
            C = 0,
            b = -1,
            v = !0,
            w = 0;
          n.length >= 2 &&
            n.charCodeAt(1) === L &&
            s(n.charCodeAt(0)) &&
            (r = C = 2);
          for (let N = n.length - 1; N >= r; --N) {
            const y = n.charCodeAt(N);
            if (m(y)) {
              if (!v) {
                C = N + 1;
                break;
              }
              continue;
            }
            b === -1 && ((v = !1), (b = N + 1)),
              y === u
                ? c === -1
                  ? (c = N)
                  : w !== 1 && (w = 1)
                : c !== -1 && (w = -1);
          }
          return c === -1 ||
            b === -1 ||
            w === 0 ||
            (w === 1 && c === b - 1 && c === C + 1)
            ? ""
            : n.slice(c, b);
        },
        format: S.bind(null, "\\"),
        parse(n) {
          g(n, "path");
          const r = { root: "", dir: "", base: "", ext: "", name: "" };
          if (n.length === 0) return r;
          const c = n.length;
          let C = 0,
            b = n.charCodeAt(0);
          if (c === 1)
            return m(b)
              ? ((r.root = r.dir = n), r)
              : ((r.base = r.name = n), r);
          if (m(b)) {
            if (((C = 1), m(n.charCodeAt(1)))) {
              let R = 2,
                q = R;
              for (; R < c && !m(n.charCodeAt(R)); ) R++;
              if (R < c && R !== q) {
                for (q = R; R < c && m(n.charCodeAt(R)); ) R++;
                if (R < c && R !== q) {
                  for (q = R; R < c && !m(n.charCodeAt(R)); ) R++;
                  R === c ? (C = R) : R !== q && (C = R + 1);
                }
              }
            }
          } else if (s(b) && n.charCodeAt(1) === L) {
            if (c <= 2) return (r.root = r.dir = n), r;
            if (((C = 2), m(n.charCodeAt(2)))) {
              if (c === 3) return (r.root = r.dir = n), r;
              C = 3;
            }
          }
          C > 0 && (r.root = n.slice(0, C));
          let v = -1,
            w = C,
            N = -1,
            y = !0,
            P = n.length - 1,
            U = 0;
          for (; P >= C; --P) {
            if (((b = n.charCodeAt(P)), m(b))) {
              if (!y) {
                w = P + 1;
                break;
              }
              continue;
            }
            N === -1 && ((y = !1), (N = P + 1)),
              b === u
                ? v === -1
                  ? (v = P)
                  : U !== 1 && (U = 1)
                : v !== -1 && (U = -1);
          }
          return (
            N !== -1 &&
              (v === -1 || U === 0 || (U === 1 && v === N - 1 && v === w + 1)
                ? (r.base = r.name = n.slice(w, N))
                : ((r.name = n.slice(w, v)),
                  (r.base = n.slice(w, N)),
                  (r.ext = n.slice(v, N)))),
            w > 0 && w !== C ? (r.dir = n.slice(0, w - 1)) : (r.dir = r.root),
            r
          );
        },
        sep: "\\",
        delimiter: ";",
        win32: null,
        posix: null
      }),
        (t.posix = {
          resolve(...n) {
            let r = "",
              c = !1;
            for (let C = n.length - 1; C >= -1 && !c; C--) {
              const b = C >= 0 ? n[C] : E.cwd();
              g(b, "path"),
                b.length !== 0 &&
                  ((r = `${b}/${r}`), (c = b.charCodeAt(0) === l));
            }
            return (r = d(r, !c, "/", i)), c ? `/${r}` : r.length > 0 ? r : ".";
          },
          normalize(n) {
            if ((g(n, "path"), n.length === 0)) return ".";
            const r = n.charCodeAt(0) === l,
              c = n.charCodeAt(n.length - 1) === l;
            return (
              (n = d(n, !r, "/", i)),
              n.length === 0
                ? r
                  ? "/"
                  : c
                  ? "./"
                  : "."
                : (c && (n += "/"), r ? `/${n}` : n)
            );
          },
          isAbsolute(n) {
            return g(n, "path"), n.length > 0 && n.charCodeAt(0) === l;
          },
          join(...n) {
            if (n.length === 0) return ".";
            let r;
            for (let c = 0; c < n.length; ++c) {
              const C = n[c];
              g(C, "path"),
                C.length > 0 && (r === void 0 ? (r = C) : (r += `/${C}`));
            }
            return r === void 0 ? "." : t.posix.normalize(r);
          },
          relative(n, r) {
            if (
              (g(n, "from"),
              g(r, "to"),
              n === r ||
                ((n = t.posix.resolve(n)), (r = t.posix.resolve(r)), n === r))
            )
              return "";
            const c = 1,
              C = n.length,
              b = C - c,
              v = 1,
              w = r.length - v,
              N = b < w ? b : w;
            let y = -1,
              P = 0;
            for (; P < N; P++) {
              const R = n.charCodeAt(c + P);
              if (R !== r.charCodeAt(v + P)) break;
              R === l && (y = P);
            }
            if (P === N)
              if (w > N) {
                if (r.charCodeAt(v + P) === l) return r.slice(v + P + 1);
                if (P === 0) return r.slice(v + P);
              } else
                b > N &&
                  (n.charCodeAt(c + P) === l ? (y = P) : P === 0 && (y = 0));
            let U = "";
            for (P = c + y + 1; P <= C; ++P)
              (P === C || n.charCodeAt(P) === l) &&
                (U += U.length === 0 ? ".." : "/..");
            return `${U}${r.slice(v + y)}`;
          },
          toNamespacedPath(n) {
            return n;
          },
          dirname(n) {
            if ((g(n, "path"), n.length === 0)) return ".";
            const r = n.charCodeAt(0) === l;
            let c = -1,
              C = !0;
            for (let b = n.length - 1; b >= 1; --b)
              if (n.charCodeAt(b) === l) {
                if (!C) {
                  c = b;
                  break;
                }
              } else C = !1;
            return c === -1
              ? r
                ? "/"
                : "."
              : r && c === 1
              ? "//"
              : n.slice(0, c);
          },
          basename(n, r) {
            r !== void 0 && g(r, "ext"), g(n, "path");
            let c = 0,
              C = -1,
              b = !0,
              v;
            if (r !== void 0 && r.length > 0 && r.length <= n.length) {
              if (r === n) return "";
              let w = r.length - 1,
                N = -1;
              for (v = n.length - 1; v >= 0; --v) {
                const y = n.charCodeAt(v);
                if (y === l) {
                  if (!b) {
                    c = v + 1;
                    break;
                  }
                } else
                  N === -1 && ((b = !1), (N = v + 1)),
                    w >= 0 &&
                      (y === r.charCodeAt(w)
                        ? --w == -1 && (C = v)
                        : ((w = -1), (C = N)));
              }
              return (
                c === C ? (C = N) : C === -1 && (C = n.length), n.slice(c, C)
              );
            }
            for (v = n.length - 1; v >= 0; --v)
              if (n.charCodeAt(v) === l) {
                if (!b) {
                  c = v + 1;
                  break;
                }
              } else C === -1 && ((b = !1), (C = v + 1));
            return C === -1 ? "" : n.slice(c, C);
          },
          extname(n) {
            g(n, "path");
            let r = -1,
              c = 0,
              C = -1,
              b = !0,
              v = 0;
            for (let w = n.length - 1; w >= 0; --w) {
              const N = n.charCodeAt(w);
              if (N === l) {
                if (!b) {
                  c = w + 1;
                  break;
                }
                continue;
              }
              C === -1 && ((b = !1), (C = w + 1)),
                N === u
                  ? r === -1
                    ? (r = w)
                    : v !== 1 && (v = 1)
                  : r !== -1 && (v = -1);
            }
            return r === -1 ||
              C === -1 ||
              v === 0 ||
              (v === 1 && r === C - 1 && r === c + 1)
              ? ""
              : n.slice(r, C);
          },
          format: S.bind(null, "/"),
          parse(n) {
            g(n, "path");
            const r = { root: "", dir: "", base: "", ext: "", name: "" };
            if (n.length === 0) return r;
            const c = n.charCodeAt(0) === l;
            let C;
            c ? ((r.root = "/"), (C = 1)) : (C = 0);
            let b = -1,
              v = 0,
              w = -1,
              N = !0,
              y = n.length - 1,
              P = 0;
            for (; y >= C; --y) {
              const U = n.charCodeAt(y);
              if (U === l) {
                if (!N) {
                  v = y + 1;
                  break;
                }
                continue;
              }
              w === -1 && ((N = !1), (w = y + 1)),
                U === u
                  ? b === -1
                    ? (b = y)
                    : P !== 1 && (P = 1)
                  : b !== -1 && (P = -1);
            }
            if (w !== -1) {
              const U = v === 0 && c ? 1 : v;
              b === -1 || P === 0 || (P === 1 && b === w - 1 && b === v + 1)
                ? (r.base = r.name = n.slice(U, w))
                : ((r.name = n.slice(U, b)),
                  (r.base = n.slice(U, w)),
                  (r.ext = n.slice(b, w)));
            }
            return v > 0 ? (r.dir = n.slice(0, v - 1)) : c && (r.dir = "/"), r;
          },
          sep: "/",
          delimiter: ":",
          win32: null,
          posix: null
        }),
        (t.posix.win32 = t.win32.win32 = t.win32),
        (t.posix.posix = t.win32.posix = t.posix),
        (t.normalize =
          E.platform === "win32" ? t.win32.normalize : t.posix.normalize),
        (t.resolve =
          E.platform === "win32" ? t.win32.resolve : t.posix.resolve),
        (t.relative =
          E.platform === "win32" ? t.win32.relative : t.posix.relative),
        (t.dirname =
          E.platform === "win32" ? t.win32.dirname : t.posix.dirname),
        (t.basename =
          E.platform === "win32" ? t.win32.basename : t.posix.basename),
        (t.extname =
          E.platform === "win32" ? t.win32.extname : t.posix.extname),
        (t.sep = E.platform === "win32" ? t.win32.sep : t.posix.sep);
    }),
    z(G[8], Q([0, 1, 2]), function(I, t, E) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.StopWatch = void 0);
      const M =
        E.globals.performance && typeof E.globals.performance.now == "function";
      class p {
        constructor(h) {
          (this._highResolution = M && h),
            (this._startTime = this._now()),
            (this._stopTime = -1);
        }
        static create(h = !0) {
          return new p(h);
        }
        stop() {
          this._stopTime = this._now();
        }
        elapsed() {
          return this._stopTime !== -1
            ? this._stopTime - this._startTime
            : this._now() - this._startTime;
        }
        _now() {
          return this._highResolution
            ? E.globals.performance.now()
            : Date.now();
        }
      }
      t.StopWatch = p;
    }),
    z(G[9], Q([0, 1, 4, 7, 17, 8]), function(I, t, E, M, p, o) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Relay = t.EventBufferer = t.PauseableEmitter = t.Emitter = t.Event = void 0);
      var h;
      (function(m) {
        m.None = () => M.Disposable.None;
        function i(T) {
          return (W, O = null, e) => {
            let B = !1,
              V;
            return (
              (V = T(
                X => {
                  if (!B) return V ? V.dispose() : (B = !0), W.call(O, X);
                },
                null,
                e
              )),
              B && V.dispose(),
              V
            );
          };
        }
        m.once = i;
        function s(T, W) {
          return C((O, e = null, B) => T(V => O.call(e, W(V)), null, B));
        }
        m.map = s;
        function d(T, W) {
          return C((O, e = null, B) =>
            T(
              V => {
                W(V), O.call(e, V);
              },
              null,
              B
            )
          );
        }
        m.forEach = d;
        function S(T, W) {
          return C((O, e = null, B) => T(V => W(V) && O.call(e, V), null, B));
        }
        m.filter = S;
        function n(T) {
          return T;
        }
        m.signal = n;
        function r(...T) {
          return (W, O = null, e) =>
            M.combinedDisposable(...T.map(B => B(V => W.call(O, V), null, e)));
        }
        m.any = r;
        function c(T, W, O) {
          let e = O;
          return s(T, B => ((e = W(e, B)), e));
        }
        m.reduce = c;
        function C(T) {
          let W;
          const O = new L({
            onFirstListenerAdd() {
              W = T(O.fire, O);
            },
            onLastListenerRemove() {
              W.dispose();
            }
          });
          return O.event;
        }
        m.snapshot = C;
        function b(T, W, O = 100, e = !1, B) {
          let V,
            X,
            J,
            re = 0;
          const se = new L({
            leakWarningThreshold: B,
            onFirstListenerAdd() {
              V = T(oe => {
                re++,
                  (X = W(X, oe)),
                  e && !J && (se.fire(X), (X = void 0)),
                  clearTimeout(J),
                  (J = setTimeout(() => {
                    const ue = X;
                    (X = void 0),
                      (J = void 0),
                      (!e || re > 1) && se.fire(ue),
                      (re = 0);
                  }, O));
              });
            },
            onLastListenerRemove() {
              V.dispose();
            }
          });
          return se.event;
        }
        m.debounce = b;
        function v(T) {
          const W = new Date().getTime();
          return s(i(T), O => new Date().getTime() - W);
        }
        m.stopwatch = v;
        function w(T, W = (O, e) => O === e) {
          let O = !0,
            e;
          return S(T, B => {
            const V = O || !W(B, e);
            return (O = !1), (e = B), V;
          });
        }
        m.latch = w;
        function N(T, W) {
          return [m.filter(T, W), m.filter(T, O => !W(O))];
        }
        m.split = N;
        function y(T, W = !1, O = []) {
          let e = O.slice(),
            B = T(J => {
              e ? e.push(J) : X.fire(J);
            });
          const V = () => {
              e && e.forEach(J => X.fire(J)), (e = null);
            },
            X = new L({
              onFirstListenerAdd() {
                B || (B = T(J => X.fire(J)));
              },
              onFirstListenerDidAdd() {
                e && (W ? setTimeout(V) : V());
              },
              onLastListenerRemove() {
                B && B.dispose(), (B = null);
              }
            });
          return X.event;
        }
        m.buffer = y;
        class P {
          constructor(W) {
            this.event = W;
          }
          map(W) {
            return new P(s(this.event, W));
          }
          forEach(W) {
            return new P(d(this.event, W));
          }
          filter(W) {
            return new P(S(this.event, W));
          }
          reduce(W, O) {
            return new P(c(this.event, W, O));
          }
          latch() {
            return new P(w(this.event));
          }
          debounce(W, O = 100, e = !1, B) {
            return new P(b(this.event, W, O, e, B));
          }
          on(W, O, e) {
            return this.event(W, O, e);
          }
          once(W, O, e) {
            return i(this.event)(W, O, e);
          }
        }
        function U(T) {
          return new P(T);
        }
        m.chain = U;
        function R(T, W, O = e => e) {
          const e = (...J) => X.fire(O(...J)),
            B = () => T.on(W, e),
            V = () => T.removeListener(W, e),
            X = new L({ onFirstListenerAdd: B, onLastListenerRemove: V });
          return X.event;
        }
        m.fromNodeEventEmitter = R;
        function q(T, W, O = e => e) {
          const e = (...J) => X.fire(O(...J)),
            B = () => T.addEventListener(W, e),
            V = () => T.removeEventListener(W, e),
            X = new L({ onFirstListenerAdd: B, onLastListenerRemove: V });
          return X.event;
        }
        m.fromDOMEventEmitter = q;
        function Y(T) {
          const W = new L();
          let O = !1;
          return (
            T.then(void 0, () => null).then(() => {
              O ? W.fire(void 0) : setTimeout(() => W.fire(void 0), 0);
            }),
            (O = !0),
            W.event
          );
        }
        m.fromPromise = Y;
        function j(T) {
          return new Promise(W => i(T)(W));
        }
        m.toPromise = j;
      })((h = t.Event || (t.Event = {})));
      class u {
        constructor(i) {
          (this._listenerCount = 0),
            (this._invocationCount = 0),
            (this._elapsedOverall = 0),
            (this._name = `${i}_${u._idPool++}`);
        }
        start(i) {
          (this._stopWatch = new o.StopWatch(!0)), (this._listenerCount = i);
        }
        stop() {
          if (this._stopWatch) {
            const i = this._stopWatch.elapsed();
            (this._elapsedOverall += i),
              (this._invocationCount += 1),
              console.info(
                `did FIRE ${this._name}: elapsed_ms: ${i.toFixed(
                  5
                )}, listener: ${
                  this._listenerCount
                } (elapsed_overall: ${this._elapsedOverall.toFixed(
                  2
                )}, invocations: ${this._invocationCount})`
              ),
              (this._stopWatch = void 0);
          }
        }
      }
      u._idPool = 0;
      let l = -1;
      class f {
        constructor(
          i,
          s = Math.random()
            .toString(18)
            .slice(2, 5)
        ) {
          (this.customThreshold = i),
            (this.name = s),
            (this._warnCountdown = 0);
        }
        dispose() {
          this._stacks && this._stacks.clear();
        }
        check(i) {
          let s = l;
          if (
            (typeof this.customThreshold == "number" &&
              (s = this.customThreshold),
            s <= 0 || i < s)
          )
            return;
          this._stacks || (this._stacks = new Map());
          const d = new Error().stack
              .split(
                `
`
              )
              .slice(3).join(`
`),
            S = this._stacks.get(d) || 0;
          if (
            (this._stacks.set(d, S + 1),
            (this._warnCountdown -= 1),
            this._warnCountdown <= 0)
          ) {
            this._warnCountdown = s * 0.5;
            let n,
              r = 0;
            for (const [c, C] of this._stacks)
              (!n || r < C) && ((n = c), (r = C));
            console.warn(
              `[${this.name}] potential listener LEAK detected, having ${i} listeners already. MOST frequent listener (${r}):`
            ),
              console.warn(n);
          }
          return () => {
            const n = this._stacks.get(d) || 0;
            this._stacks.set(d, n - 1);
          };
        }
      }
      class L {
        constructor(i) {
          var s;
          (this._disposed = !1),
            (this._options = i),
            (this._leakageMon =
              l > 0
                ? new f(this._options && this._options.leakWarningThreshold)
                : void 0),
            (this._perfMon = ((s = this._options) === null || s === void 0
            ? void 0
            : s._profName)
              ? new u(this._options._profName)
              : void 0);
        }
        get event() {
          return (
            this._event ||
              (this._event = (i, s, d) => {
                var S;
                this._listeners || (this._listeners = new p.LinkedList());
                const n = this._listeners.isEmpty();
                n &&
                  this._options &&
                  this._options.onFirstListenerAdd &&
                  this._options.onFirstListenerAdd(this);
                const r = this._listeners.push(s ? [i, s] : i);
                n &&
                  this._options &&
                  this._options.onFirstListenerDidAdd &&
                  this._options.onFirstListenerDidAdd(this),
                  this._options &&
                    this._options.onListenerDidAdd &&
                    this._options.onListenerDidAdd(this, i, s);
                const c =
                  (S = this._leakageMon) === null || S === void 0
                    ? void 0
                    : S.check(this._listeners.size);
                let C;
                return (
                  (C = {
                    dispose: () => {
                      c && c(),
                        (C.dispose = L._noop),
                        this._disposed ||
                          (r(),
                          this._options &&
                            this._options.onLastListenerRemove &&
                            ((this._listeners && !this._listeners.isEmpty()) ||
                              this._options.onLastListenerRemove(this)));
                    }
                  }),
                  d instanceof M.DisposableStore
                    ? d.add(C)
                    : Array.isArray(d) && d.push(C),
                  C
                );
              }),
            this._event
          );
        }
        fire(i) {
          var s, d;
          if (this._listeners) {
            this._deliveryQueue || (this._deliveryQueue = new p.LinkedList());
            for (let S of this._listeners) this._deliveryQueue.push([S, i]);
            for (
              (s = this._perfMon) === null ||
              s === void 0 ||
              s.start(this._deliveryQueue.size);
              this._deliveryQueue.size > 0;

            ) {
              const [S, n] = this._deliveryQueue.shift();
              try {
                typeof S == "function" ? S.call(void 0, n) : S[0].call(S[1], n);
              } catch (r) {
                E.onUnexpectedError(r);
              }
            }
            (d = this._perfMon) === null || d === void 0 || d.stop();
          }
        }
        dispose() {
          var i, s, d, S, n;
          this._disposed ||
            ((this._disposed = !0),
            (i = this._listeners) === null || i === void 0 || i.clear(),
            (s = this._deliveryQueue) === null || s === void 0 || s.clear(),
            (S =
              (d = this._options) === null || d === void 0
                ? void 0
                : d.onLastListenerRemove) === null ||
              S === void 0 ||
              S.call(d),
            (n = this._leakageMon) === null || n === void 0 || n.dispose());
        }
      }
      (t.Emitter = L), (L._noop = function() {});
      class a extends L {
        constructor(i) {
          super(i);
          (this._isPaused = 0),
            (this._eventQueue = new p.LinkedList()),
            (this._mergeFn = i == null ? void 0 : i.merge);
        }
        pause() {
          this._isPaused++;
        }
        resume() {
          if (this._isPaused !== 0 && --this._isPaused == 0)
            if (this._mergeFn) {
              const i = Array.from(this._eventQueue);
              this._eventQueue.clear(), super.fire(this._mergeFn(i));
            } else
              for (; !this._isPaused && this._eventQueue.size !== 0; )
                super.fire(this._eventQueue.shift());
        }
        fire(i) {
          this._listeners &&
            (this._isPaused !== 0 ? this._eventQueue.push(i) : super.fire(i));
        }
      }
      t.PauseableEmitter = a;
      class _ {
        constructor() {
          this.buffers = [];
        }
        wrapEvent(i) {
          return (s, d, S) =>
            i(
              n => {
                const r = this.buffers[this.buffers.length - 1];
                r ? r.push(() => s.call(d, n)) : s.call(d, n);
              },
              void 0,
              S
            );
        }
        bufferEvents(i) {
          const s = [];
          this.buffers.push(s);
          const d = i();
          return this.buffers.pop(), s.forEach(S => S()), d;
        }
      }
      t.EventBufferer = _;
      class g {
        constructor() {
          (this.listening = !1),
            (this.inputEvent = h.None),
            (this.inputEventListener = M.Disposable.None),
            (this.emitter = new L({
              onFirstListenerDidAdd: () => {
                (this.listening = !0),
                  (this.inputEventListener = this.inputEvent(
                    this.emitter.fire,
                    this.emitter
                  ));
              },
              onLastListenerRemove: () => {
                (this.listening = !1), this.inputEventListener.dispose();
              }
            })),
            (this.event = this.emitter.event);
        }
        set input(i) {
          (this.inputEvent = i),
            this.listening &&
              (this.inputEventListener.dispose(),
              (this.inputEventListener = i(this.emitter.fire, this.emitter)));
        }
        dispose() {
          this.inputEventListener.dispose(), this.emitter.dispose();
        }
      }
      t.Relay = g;
    }),
    z(G[20], Q([0, 1, 9]), function(I, t, E) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.CancellationTokenSource = t.CancellationToken = void 0);
      const M = Object.freeze(function(u, l) {
        const f = setTimeout(u.bind(l), 0);
        return {
          dispose() {
            clearTimeout(f);
          }
        };
      });
      var p;
      (function(u) {
        function l(f) {
          return f === u.None || f === u.Cancelled || f instanceof o
            ? !0
            : !f || typeof f != "object"
            ? !1
            : typeof f.isCancellationRequested == "boolean" &&
              typeof f.onCancellationRequested == "function";
        }
        (u.isCancellationToken = l),
          (u.None = Object.freeze({
            isCancellationRequested: !1,
            onCancellationRequested: E.Event.None
          })),
          (u.Cancelled = Object.freeze({
            isCancellationRequested: !0,
            onCancellationRequested: M
          }));
      })((p = t.CancellationToken || (t.CancellationToken = {})));
      class o {
        constructor() {
          (this._isCancelled = !1), (this._emitter = null);
        }
        cancel() {
          this._isCancelled ||
            ((this._isCancelled = !0),
            this._emitter && (this._emitter.fire(void 0), this.dispose()));
        }
        get isCancellationRequested() {
          return this._isCancelled;
        }
        get onCancellationRequested() {
          return this._isCancelled
            ? M
            : (this._emitter || (this._emitter = new E.Emitter()),
              this._emitter.event);
        }
        dispose() {
          this._emitter && (this._emitter.dispose(), (this._emitter = null));
        }
      }
      class h {
        constructor(l) {
          (this._token = void 0),
            (this._parentListener = void 0),
            (this._parentListener =
              l && l.onCancellationRequested(this.cancel, this));
        }
        get token() {
          return this._token || (this._token = new o()), this._token;
        }
        cancel() {
          this._token
            ? this._token instanceof o && this._token.cancel()
            : (this._token = p.Cancelled);
        }
        dispose(l = !1) {
          l && this.cancel(),
            this._parentListener && this._parentListener.dispose(),
            this._token
              ? this._token instanceof o && this._token.dispose()
              : (this._token = p.None);
        }
      }
      t.CancellationTokenSource = h;
    }),
    z(G[5], Q([0, 1]), function(I, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.getLeftDeleteOffset = t.breakBetweenGraphemeBreakType = t.getGraphemeBreakType = t.singleLetterHash = t.containsUppercaseCharacter = t.startsWithUTF8BOM = t.UTF8_BOM_CHARACTER = t.isEmojiImprecise = t.isFullWidthCharacter = t.containsFullWidthCharacter = t.containsUnusualLineTerminators = t.UNUSUAL_LINE_TERMINATORS = t.isBasicASCII = t.containsEmoji = t.containsRTL = t.decodeUTF8 = t.prevCharLength = t.nextCharLength = t.getNextCodePoint = t.computeCodePoint = t.isLowSurrogate = t.isHighSurrogate = t.commonSuffixLength = t.commonPrefixLength = t.startsWithIgnoreCase = t.equalsIgnoreCase = t.isUpperAsciiLetter = t.isLowerAsciiLetter = t.compareSubstringIgnoreCase = t.compareIgnoreCase = t.compareSubstring = t.compare = t.lastNonWhitespaceIndex = t.getLeadingWhitespace = t.firstNonWhitespaceIndex = t.splitLines = t.regExpFlags = t.regExpLeadsToEndlessLoop = t.createRegExp = t.stripWildcards = t.convertSimple2RegExpPattern = t.rtrim = t.ltrim = t.trim = t.escapeRegExpCharacters = t.escape = t.format = t.isFalsyOrWhitespace = void 0);
      function E(A) {
        return !A || typeof A != "string" ? !0 : A.trim().length === 0;
      }
      t.isFalsyOrWhitespace = E;
      const M = /{(\d+)}/g;
      function p(A, ...D) {
        return D.length === 0
          ? A
          : A.replace(M, function(F, k) {
              const H = parseInt(k, 10);
              return isNaN(H) || H < 0 || H >= D.length ? F : D[H];
            });
      }
      t.format = p;
      function o(A) {
        return A.replace(/[<>&]/g, function(D) {
          switch (D) {
            case "<":
              return "&lt;";
            case ">":
              return "&gt;";
            case "&":
              return "&amp;";
            default:
              return D;
          }
        });
      }
      t.escape = o;
      function h(A) {
        return A.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, "\\$&");
      }
      t.escapeRegExpCharacters = h;
      function u(A, D = " ") {
        const F = l(A, D);
        return f(F, D);
      }
      t.trim = u;
      function l(A, D) {
        if (!A || !D) return A;
        const F = D.length;
        if (F === 0 || A.length === 0) return A;
        let k = 0;
        for (; A.indexOf(D, k) === k; ) k = k + F;
        return A.substring(k);
      }
      t.ltrim = l;
      function f(A, D) {
        if (!A || !D) return A;
        const F = D.length,
          k = A.length;
        if (F === 0 || k === 0) return A;
        let H = k,
          $ = -1;
        for (; ($ = A.lastIndexOf(D, H - 1)), !($ === -1 || $ + F !== H); ) {
          if ($ === 0) return "";
          H = $;
        }
        return A.substring(0, H);
      }
      t.rtrim = f;
      function L(A) {
        return A.replace(
          /[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g,
          "\\$&"
        ).replace(/[\*]/g, ".*");
      }
      t.convertSimple2RegExpPattern = L;
      function a(A) {
        return A.replace(/\*/g, "");
      }
      t.stripWildcards = a;
      function _(A, D, F = {}) {
        if (!A) throw new Error("Cannot create regex from empty string");
        D || (A = h(A)),
          F.wholeWord &&
            (/\B/.test(A.charAt(0)) || (A = "\\b" + A),
            /\B/.test(A.charAt(A.length - 1)) || (A = A + "\\b"));
        let k = "";
        return (
          F.global && (k += "g"),
          F.matchCase || (k += "i"),
          F.multiline && (k += "m"),
          F.unicode && (k += "u"),
          new RegExp(A, k)
        );
      }
      t.createRegExp = _;
      function g(A) {
        return A.source === "^" ||
          A.source === "^$" ||
          A.source === "$" ||
          A.source === "^\\s*$"
          ? !1
          : !!(A.exec("") && A.lastIndex === 0);
      }
      t.regExpLeadsToEndlessLoop = g;
      function m(A) {
        return (
          (A.global ? "g" : "") +
          (A.ignoreCase ? "i" : "") +
          (A.multiline ? "m" : "") +
          (A.unicode ? "u" : "")
        );
      }
      t.regExpFlags = m;
      function i(A) {
        return A.split(/\r\n|\r|\n/);
      }
      t.splitLines = i;
      function s(A) {
        for (let D = 0, F = A.length; D < F; D++) {
          const k = A.charCodeAt(D);
          if (k !== 32 && k !== 9) return D;
        }
        return -1;
      }
      t.firstNonWhitespaceIndex = s;
      function d(A, D = 0, F = A.length) {
        for (let k = D; k < F; k++) {
          const H = A.charCodeAt(k);
          if (H !== 32 && H !== 9) return A.substring(D, k);
        }
        return A.substring(D, F);
      }
      t.getLeadingWhitespace = d;
      function S(A, D = A.length - 1) {
        for (let F = D; F >= 0; F--) {
          const k = A.charCodeAt(F);
          if (k !== 32 && k !== 9) return F;
        }
        return -1;
      }
      t.lastNonWhitespaceIndex = S;
      function n(A, D) {
        return A < D ? -1 : A > D ? 1 : 0;
      }
      t.compare = n;
      function r(A, D, F = 0, k = A.length, H = 0, $ = D.length) {
        for (; F < k && H < $; F++, H++) {
          let ee = A.charCodeAt(F),
            ne = D.charCodeAt(H);
          if (ee < ne) return -1;
          if (ee > ne) return 1;
        }
        const x = k - F,
          K = $ - H;
        return x < K ? -1 : x > K ? 1 : 0;
      }
      t.compareSubstring = r;
      function c(A, D) {
        return C(A, D, 0, A.length, 0, D.length);
      }
      t.compareIgnoreCase = c;
      function C(A, D, F = 0, k = A.length, H = 0, $ = D.length) {
        for (; F < k && H < $; F++, H++) {
          let ee = A.charCodeAt(F),
            ne = D.charCodeAt(H);
          if (ee === ne) continue;
          const ce = ee - ne;
          if (!(ce === 32 && v(ne)) && !(ce === -32 && v(ee)))
            return b(ee) && b(ne)
              ? ce
              : r(A.toLowerCase(), D.toLowerCase(), F, k, H, $);
        }
        const x = k - F,
          K = $ - H;
        return x < K ? -1 : x > K ? 1 : 0;
      }
      t.compareSubstringIgnoreCase = C;
      function b(A) {
        return A >= 97 && A <= 122;
      }
      t.isLowerAsciiLetter = b;
      function v(A) {
        return A >= 65 && A <= 90;
      }
      t.isUpperAsciiLetter = v;
      function w(A) {
        return b(A) || v(A);
      }
      function N(A, D) {
        return A.length === D.length && y(A, D);
      }
      t.equalsIgnoreCase = N;
      function y(A, D, F = A.length) {
        for (let k = 0; k < F; k++) {
          const H = A.charCodeAt(k),
            $ = D.charCodeAt(k);
          if (H !== $) {
            if (w(H) && w($)) {
              const x = Math.abs(H - $);
              if (x !== 0 && x !== 32) return !1;
            } else if (
              String.fromCharCode(H).toLowerCase() !==
              String.fromCharCode($).toLowerCase()
            )
              return !1;
          }
        }
        return !0;
      }
      function P(A, D) {
        const F = D.length;
        return D.length > A.length ? !1 : y(A, D, F);
      }
      t.startsWithIgnoreCase = P;
      function U(A, D) {
        let F,
          k = Math.min(A.length, D.length);
        for (F = 0; F < k; F++)
          if (A.charCodeAt(F) !== D.charCodeAt(F)) return F;
        return k;
      }
      t.commonPrefixLength = U;
      function R(A, D) {
        let F,
          k = Math.min(A.length, D.length);
        const H = A.length - 1,
          $ = D.length - 1;
        for (F = 0; F < k; F++)
          if (A.charCodeAt(H - F) !== D.charCodeAt($ - F)) return F;
        return k;
      }
      t.commonSuffixLength = R;
      function q(A) {
        return 55296 <= A && A <= 56319;
      }
      t.isHighSurrogate = q;
      function Y(A) {
        return 56320 <= A && A <= 57343;
      }
      t.isLowSurrogate = Y;
      function j(A, D) {
        return ((A - 55296) << 10) + (D - 56320) + 65536;
      }
      t.computeCodePoint = j;
      function T(A, D, F) {
        const k = A.charCodeAt(F);
        if (q(k) && F + 1 < D) {
          const H = A.charCodeAt(F + 1);
          if (Y(H)) return j(k, H);
        }
        return k;
      }
      t.getNextCodePoint = T;
      function W(A, D) {
        const F = A.charCodeAt(D - 1);
        if (Y(F) && D > 1) {
          const k = A.charCodeAt(D - 2);
          if (q(k)) return j(k, F);
        }
        return F;
      }
      function O(A, D) {
        const F = te.getInstance(),
          k = D,
          H = A.length,
          $ = T(A, H, D);
        D += $ >= 65536 ? 2 : 1;
        let x = F.getGraphemeBreakType($);
        for (; D < H; ) {
          const K = T(A, H, D),
            ee = F.getGraphemeBreakType(K);
          if (ae(x, ee)) break;
          (D += K >= 65536 ? 2 : 1), (x = ee);
        }
        return D - k;
      }
      t.nextCharLength = O;
      function e(A, D) {
        const F = te.getInstance(),
          k = D,
          H = W(A, D);
        D -= H >= 65536 ? 2 : 1;
        let $ = F.getGraphemeBreakType(H);
        for (; D > 0; ) {
          const x = W(A, D),
            K = F.getGraphemeBreakType(x);
          if (ae(K, $)) break;
          (D -= x >= 65536 ? 2 : 1), ($ = K);
        }
        return k - D;
      }
      t.prevCharLength = e;
      function B(A) {
        const D = A.byteLength,
          F = [];
        let k = 0;
        for (; k < D; ) {
          const H = A[k];
          let $;
          if (
            (H >= 240 && k + 3 < D
              ? ($ =
                  (((A[k++] & 7) << 18) >>> 0) |
                  (((A[k++] & 63) << 12) >>> 0) |
                  (((A[k++] & 63) << 6) >>> 0) |
                  (((A[k++] & 63) << 0) >>> 0))
              : H >= 224 && k + 2 < D
              ? ($ =
                  (((A[k++] & 15) << 12) >>> 0) |
                  (((A[k++] & 63) << 6) >>> 0) |
                  (((A[k++] & 63) << 0) >>> 0))
              : H >= 192 && k + 1 < D
              ? ($ =
                  (((A[k++] & 31) << 6) >>> 0) | (((A[k++] & 63) << 0) >>> 0))
              : ($ = A[k++]),
            ($ >= 0 && $ <= 55295) || ($ >= 57344 && $ <= 65535))
          )
            F.push(String.fromCharCode($));
          else if ($ >= 65536 && $ <= 1114111) {
            const x = $ - 65536,
              K = 55296 + ((x & 1047552) >>> 10),
              ee = 56320 + ((x & 1023) >>> 0);
            F.push(String.fromCharCode(K)), F.push(String.fromCharCode(ee));
          } else F.push(String.fromCharCode(65533));
        }
        return F.join("");
      }
      t.decodeUTF8 = B;
      const V = /(?:[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05F4\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u0710\u0712-\u072F\u074D-\u07A5\u07B1-\u07EA\u07F4\u07F5\u07FA-\u0815\u081A\u0824\u0828\u0830-\u0858\u085E-\u08BD\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFD3D\uFD50-\uFDFC\uFE70-\uFEFC]|\uD802[\uDC00-\uDD1B\uDD20-\uDE00\uDE10-\uDE33\uDE40-\uDEE4\uDEEB-\uDF35\uDF40-\uDFFF]|\uD803[\uDC00-\uDCFF]|\uD83A[\uDC00-\uDCCF\uDD00-\uDD43\uDD50-\uDFFF]|\uD83B[\uDC00-\uDEBB])/;
      function X(A) {
        return V.test(A);
      }
      t.containsRTL = X;
      const J = /(?:[\u231A\u231B\u23F0\u23F3\u2600-\u27BF\u2B50\u2B55]|\uD83C[\uDDE6-\uDDFF\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F\uDE80-\uDEFC\uDFE0-\uDFEB]|\uD83E[\uDD00-\uDDFF\uDE70-\uDED6])/;
      function re(A) {
        return J.test(A);
      }
      t.containsEmoji = re;
      const se = /^[\t\n\r\x20-\x7E]*$/;
      function oe(A) {
        return se.test(A);
      }
      (t.isBasicASCII = oe), (t.UNUSUAL_LINE_TERMINATORS = /[\u2028\u2029]/);
      function ue(A) {
        return t.UNUSUAL_LINE_TERMINATORS.test(A);
      }
      t.containsUnusualLineTerminators = ue;
      function ge(A) {
        for (let D = 0, F = A.length; D < F; D++)
          if (fe(A.charCodeAt(D))) return !0;
        return !1;
      }
      t.containsFullWidthCharacter = ge;
      function fe(A) {
        return (
          (A = +A),
          (A >= 11904 && A <= 55215) ||
            (A >= 63744 && A <= 64255) ||
            (A >= 65281 && A <= 65374)
        );
      }
      t.isFullWidthCharacter = fe;
      function he(A) {
        return (
          (A >= 127462 && A <= 127487) ||
          A === 8986 ||
          A === 8987 ||
          A === 9200 ||
          A === 9203 ||
          (A >= 9728 && A <= 10175) ||
          A === 11088 ||
          A === 11093 ||
          (A >= 127744 && A <= 128591) ||
          (A >= 128640 && A <= 128764) ||
          (A >= 128992 && A <= 129003) ||
          (A >= 129280 && A <= 129535) ||
          (A >= 129648 && A <= 129750)
        );
      }
      (t.isEmojiImprecise = he),
        (t.UTF8_BOM_CHARACTER = String.fromCharCode(65279));
      function _e(A) {
        return !!(A && A.length > 0 && A.charCodeAt(0) === 65279);
      }
      t.startsWithUTF8BOM = _e;
      function ve(A, D = !1) {
        return A
          ? (D && (A = A.replace(/\\./g, "")), A.toLowerCase() !== A)
          : !1;
      }
      t.containsUppercaseCharacter = ve;
      function Ce(A) {
        const D = 90 - 65 + 1;
        return (
          (A = A % (2 * D)),
          A < D ? String.fromCharCode(97 + A) : String.fromCharCode(65 + A - D)
        );
      }
      t.singleLetterHash = Ce;
      function be(A) {
        return te.getInstance().getGraphemeBreakType(A);
      }
      t.getGraphemeBreakType = be;
      function ae(A, D) {
        return A === 0
          ? D !== 5 && D !== 7
          : A === 2 && D === 3
          ? !1
          : A === 4 || A === 2 || A === 3 || D === 4 || D === 2 || D === 3
          ? !0
          : !(
              (A === 8 && (D === 8 || D === 9 || D === 11 || D === 12)) ||
              ((A === 11 || A === 9) && (D === 9 || D === 10)) ||
              ((A === 12 || A === 10) && D === 10) ||
              D === 5 ||
              D === 13 ||
              D === 7 ||
              A === 1 ||
              (A === 13 && D === 14) ||
              (A === 6 && D === 6)
            );
      }
      t.breakBetweenGraphemeBreakType = ae;
      class te {
        constructor() {
          this._data = Le();
        }
        static getInstance() {
          return te._INSTANCE || (te._INSTANCE = new te()), te._INSTANCE;
        }
        getGraphemeBreakType(D) {
          if (D < 32) return D === 10 ? 3 : D === 13 ? 2 : 4;
          if (D < 127) return 0;
          const F = this._data,
            k = F.length / 3;
          let H = 1;
          for (; H <= k; )
            if (D < F[3 * H]) H = 2 * H;
            else if (D > F[3 * H + 1]) H = 2 * H + 1;
            else return F[3 * H + 2];
          return 0;
        }
      }
      te._INSTANCE = null;
      function Le() {
        return JSON.parse(
          "[0,0,0,51592,51592,11,44424,44424,11,72251,72254,5,7150,7150,7,48008,48008,11,55176,55176,11,128420,128420,14,3276,3277,5,9979,9980,14,46216,46216,11,49800,49800,11,53384,53384,11,70726,70726,5,122915,122916,5,129320,129327,14,2558,2558,5,5906,5908,5,9762,9763,14,43360,43388,8,45320,45320,11,47112,47112,11,48904,48904,11,50696,50696,11,52488,52488,11,54280,54280,11,70082,70083,1,71350,71350,7,73111,73111,5,127892,127893,14,128726,128727,14,129473,129474,14,2027,2035,5,2901,2902,5,3784,3789,5,6754,6754,5,8418,8420,5,9877,9877,14,11088,11088,14,44008,44008,5,44872,44872,11,45768,45768,11,46664,46664,11,47560,47560,11,48456,48456,11,49352,49352,11,50248,50248,11,51144,51144,11,52040,52040,11,52936,52936,11,53832,53832,11,54728,54728,11,69811,69814,5,70459,70460,5,71096,71099,7,71998,71998,5,72874,72880,5,119149,119149,7,127374,127374,14,128335,128335,14,128482,128482,14,128765,128767,14,129399,129400,14,129680,129685,14,1476,1477,5,2377,2380,7,2759,2760,5,3137,3140,7,3458,3459,7,4153,4154,5,6432,6434,5,6978,6978,5,7675,7679,5,9723,9726,14,9823,9823,14,9919,9923,14,10035,10036,14,42736,42737,5,43596,43596,5,44200,44200,11,44648,44648,11,45096,45096,11,45544,45544,11,45992,45992,11,46440,46440,11,46888,46888,11,47336,47336,11,47784,47784,11,48232,48232,11,48680,48680,11,49128,49128,11,49576,49576,11,50024,50024,11,50472,50472,11,50920,50920,11,51368,51368,11,51816,51816,11,52264,52264,11,52712,52712,11,53160,53160,11,53608,53608,11,54056,54056,11,54504,54504,11,54952,54952,11,68108,68111,5,69933,69940,5,70197,70197,7,70498,70499,7,70845,70845,5,71229,71229,5,71727,71735,5,72154,72155,5,72344,72345,5,73023,73029,5,94095,94098,5,121403,121452,5,126981,127182,14,127538,127546,14,127990,127990,14,128391,128391,14,128445,128449,14,128500,128505,14,128752,128752,14,129160,129167,14,129356,129356,14,129432,129442,14,129648,129651,14,129751,131069,14,173,173,4,1757,1757,1,2274,2274,1,2494,2494,5,2641,2641,5,2876,2876,5,3014,3016,7,3262,3262,7,3393,3396,5,3570,3571,7,3968,3972,5,4228,4228,7,6086,6086,5,6679,6680,5,6912,6915,5,7080,7081,5,7380,7392,5,8252,8252,14,9096,9096,14,9748,9749,14,9784,9786,14,9833,9850,14,9890,9894,14,9938,9938,14,9999,9999,14,10085,10087,14,12349,12349,14,43136,43137,7,43454,43456,7,43755,43755,7,44088,44088,11,44312,44312,11,44536,44536,11,44760,44760,11,44984,44984,11,45208,45208,11,45432,45432,11,45656,45656,11,45880,45880,11,46104,46104,11,46328,46328,11,46552,46552,11,46776,46776,11,47000,47000,11,47224,47224,11,47448,47448,11,47672,47672,11,47896,47896,11,48120,48120,11,48344,48344,11,48568,48568,11,48792,48792,11,49016,49016,11,49240,49240,11,49464,49464,11,49688,49688,11,49912,49912,11,50136,50136,11,50360,50360,11,50584,50584,11,50808,50808,11,51032,51032,11,51256,51256,11,51480,51480,11,51704,51704,11,51928,51928,11,52152,52152,11,52376,52376,11,52600,52600,11,52824,52824,11,53048,53048,11,53272,53272,11,53496,53496,11,53720,53720,11,53944,53944,11,54168,54168,11,54392,54392,11,54616,54616,11,54840,54840,11,55064,55064,11,65438,65439,5,69633,69633,5,69837,69837,1,70018,70018,7,70188,70190,7,70368,70370,7,70465,70468,7,70712,70719,5,70835,70840,5,70850,70851,5,71132,71133,5,71340,71340,7,71458,71461,5,71985,71989,7,72002,72002,7,72193,72202,5,72281,72283,5,72766,72766,7,72885,72886,5,73104,73105,5,92912,92916,5,113824,113827,4,119173,119179,5,121505,121519,5,125136,125142,5,127279,127279,14,127489,127490,14,127570,127743,14,127900,127901,14,128254,128254,14,128369,128370,14,128400,128400,14,128425,128432,14,128468,128475,14,128489,128494,14,128715,128720,14,128745,128745,14,128759,128760,14,129004,129023,14,129296,129304,14,129340,129342,14,129388,129392,14,129404,129407,14,129454,129455,14,129485,129487,14,129659,129663,14,129719,129727,14,917536,917631,5,13,13,2,1160,1161,5,1564,1564,4,1807,1807,1,2085,2087,5,2363,2363,7,2402,2403,5,2507,2508,7,2622,2624,7,2691,2691,7,2786,2787,5,2881,2884,5,3006,3006,5,3072,3072,5,3170,3171,5,3267,3268,7,3330,3331,7,3406,3406,1,3538,3540,5,3655,3662,5,3897,3897,5,4038,4038,5,4184,4185,5,4352,4447,8,6068,6069,5,6155,6157,5,6448,6449,7,6742,6742,5,6783,6783,5,6966,6970,5,7042,7042,7,7143,7143,7,7212,7219,5,7412,7412,5,8206,8207,4,8294,8303,4,8596,8601,14,9410,9410,14,9742,9742,14,9757,9757,14,9770,9770,14,9794,9794,14,9828,9828,14,9855,9855,14,9882,9882,14,9900,9903,14,9929,9933,14,9963,9967,14,9987,9988,14,10006,10006,14,10062,10062,14,10175,10175,14,11744,11775,5,42607,42607,5,43043,43044,7,43263,43263,5,43444,43445,7,43569,43570,5,43698,43700,5,43766,43766,5,44032,44032,11,44144,44144,11,44256,44256,11,44368,44368,11,44480,44480,11,44592,44592,11,44704,44704,11,44816,44816,11,44928,44928,11,45040,45040,11,45152,45152,11,45264,45264,11,45376,45376,11,45488,45488,11,45600,45600,11,45712,45712,11,45824,45824,11,45936,45936,11,46048,46048,11,46160,46160,11,46272,46272,11,46384,46384,11,46496,46496,11,46608,46608,11,46720,46720,11,46832,46832,11,46944,46944,11,47056,47056,11,47168,47168,11,47280,47280,11,47392,47392,11,47504,47504,11,47616,47616,11,47728,47728,11,47840,47840,11,47952,47952,11,48064,48064,11,48176,48176,11,48288,48288,11,48400,48400,11,48512,48512,11,48624,48624,11,48736,48736,11,48848,48848,11,48960,48960,11,49072,49072,11,49184,49184,11,49296,49296,11,49408,49408,11,49520,49520,11,49632,49632,11,49744,49744,11,49856,49856,11,49968,49968,11,50080,50080,11,50192,50192,11,50304,50304,11,50416,50416,11,50528,50528,11,50640,50640,11,50752,50752,11,50864,50864,11,50976,50976,11,51088,51088,11,51200,51200,11,51312,51312,11,51424,51424,11,51536,51536,11,51648,51648,11,51760,51760,11,51872,51872,11,51984,51984,11,52096,52096,11,52208,52208,11,52320,52320,11,52432,52432,11,52544,52544,11,52656,52656,11,52768,52768,11,52880,52880,11,52992,52992,11,53104,53104,11,53216,53216,11,53328,53328,11,53440,53440,11,53552,53552,11,53664,53664,11,53776,53776,11,53888,53888,11,54000,54000,11,54112,54112,11,54224,54224,11,54336,54336,11,54448,54448,11,54560,54560,11,54672,54672,11,54784,54784,11,54896,54896,11,55008,55008,11,55120,55120,11,64286,64286,5,66272,66272,5,68900,68903,5,69762,69762,7,69817,69818,5,69927,69931,5,70003,70003,5,70070,70078,5,70094,70094,7,70194,70195,7,70206,70206,5,70400,70401,5,70463,70463,7,70475,70477,7,70512,70516,5,70722,70724,5,70832,70832,5,70842,70842,5,70847,70848,5,71088,71089,7,71102,71102,7,71219,71226,5,71231,71232,5,71342,71343,7,71453,71455,5,71463,71467,5,71737,71738,5,71995,71996,5,72000,72000,7,72145,72147,7,72160,72160,5,72249,72249,7,72273,72278,5,72330,72342,5,72752,72758,5,72850,72871,5,72882,72883,5,73018,73018,5,73031,73031,5,73109,73109,5,73461,73462,7,94031,94031,5,94192,94193,7,119142,119142,7,119155,119162,4,119362,119364,5,121476,121476,5,122888,122904,5,123184,123190,5,126976,126979,14,127184,127231,14,127344,127345,14,127405,127461,14,127514,127514,14,127561,127567,14,127778,127779,14,127896,127896,14,127985,127986,14,127995,127999,5,128326,128328,14,128360,128366,14,128378,128378,14,128394,128397,14,128405,128406,14,128422,128423,14,128435,128443,14,128453,128464,14,128479,128480,14,128484,128487,14,128496,128498,14,128640,128709,14,128723,128724,14,128736,128741,14,128747,128748,14,128755,128755,14,128762,128762,14,128981,128991,14,129096,129103,14,129292,129292,14,129311,129311,14,129329,129330,14,129344,129349,14,129360,129374,14,129394,129394,14,129402,129402,14,129413,129425,14,129445,129450,14,129466,129471,14,129483,129483,14,129511,129535,14,129653,129655,14,129667,129670,14,129705,129711,14,129731,129743,14,917505,917505,4,917760,917999,5,10,10,3,127,159,4,768,879,5,1471,1471,5,1536,1541,1,1648,1648,5,1767,1768,5,1840,1866,5,2070,2073,5,2137,2139,5,2307,2307,7,2366,2368,7,2382,2383,7,2434,2435,7,2497,2500,5,2519,2519,5,2563,2563,7,2631,2632,5,2677,2677,5,2750,2752,7,2763,2764,7,2817,2817,5,2879,2879,5,2891,2892,7,2914,2915,5,3008,3008,5,3021,3021,5,3076,3076,5,3146,3149,5,3202,3203,7,3264,3265,7,3271,3272,7,3298,3299,5,3390,3390,5,3402,3404,7,3426,3427,5,3535,3535,5,3544,3550,7,3635,3635,7,3763,3763,7,3893,3893,5,3953,3966,5,3981,3991,5,4145,4145,7,4157,4158,5,4209,4212,5,4237,4237,5,4520,4607,10,5970,5971,5,6071,6077,5,6089,6099,5,6277,6278,5,6439,6440,5,6451,6456,7,6683,6683,5,6744,6750,5,6765,6770,7,6846,6846,5,6964,6964,5,6972,6972,5,7019,7027,5,7074,7077,5,7083,7085,5,7146,7148,7,7154,7155,7,7222,7223,5,7394,7400,5,7416,7417,5,8204,8204,5,8233,8233,4,8288,8292,4,8413,8416,5,8482,8482,14,8986,8987,14,9193,9203,14,9654,9654,14,9733,9733,14,9745,9745,14,9752,9752,14,9760,9760,14,9766,9766,14,9774,9775,14,9792,9792,14,9800,9811,14,9825,9826,14,9831,9831,14,9852,9853,14,9872,9873,14,9880,9880,14,9885,9887,14,9896,9897,14,9906,9916,14,9926,9927,14,9936,9936,14,9941,9960,14,9974,9974,14,9982,9985,14,9992,9997,14,10002,10002,14,10017,10017,14,10055,10055,14,10071,10071,14,10145,10145,14,11013,11015,14,11503,11505,5,12334,12335,5,12951,12951,14,42612,42621,5,43014,43014,5,43047,43047,7,43204,43205,5,43335,43345,5,43395,43395,7,43450,43451,7,43561,43566,5,43573,43574,5,43644,43644,5,43710,43711,5,43758,43759,7,44005,44005,5,44012,44012,7,44060,44060,11,44116,44116,11,44172,44172,11,44228,44228,11,44284,44284,11,44340,44340,11,44396,44396,11,44452,44452,11,44508,44508,11,44564,44564,11,44620,44620,11,44676,44676,11,44732,44732,11,44788,44788,11,44844,44844,11,44900,44900,11,44956,44956,11,45012,45012,11,45068,45068,11,45124,45124,11,45180,45180,11,45236,45236,11,45292,45292,11,45348,45348,11,45404,45404,11,45460,45460,11,45516,45516,11,45572,45572,11,45628,45628,11,45684,45684,11,45740,45740,11,45796,45796,11,45852,45852,11,45908,45908,11,45964,45964,11,46020,46020,11,46076,46076,11,46132,46132,11,46188,46188,11,46244,46244,11,46300,46300,11,46356,46356,11,46412,46412,11,46468,46468,11,46524,46524,11,46580,46580,11,46636,46636,11,46692,46692,11,46748,46748,11,46804,46804,11,46860,46860,11,46916,46916,11,46972,46972,11,47028,47028,11,47084,47084,11,47140,47140,11,47196,47196,11,47252,47252,11,47308,47308,11,47364,47364,11,47420,47420,11,47476,47476,11,47532,47532,11,47588,47588,11,47644,47644,11,47700,47700,11,47756,47756,11,47812,47812,11,47868,47868,11,47924,47924,11,47980,47980,11,48036,48036,11,48092,48092,11,48148,48148,11,48204,48204,11,48260,48260,11,48316,48316,11,48372,48372,11,48428,48428,11,48484,48484,11,48540,48540,11,48596,48596,11,48652,48652,11,48708,48708,11,48764,48764,11,48820,48820,11,48876,48876,11,48932,48932,11,48988,48988,11,49044,49044,11,49100,49100,11,49156,49156,11,49212,49212,11,49268,49268,11,49324,49324,11,49380,49380,11,49436,49436,11,49492,49492,11,49548,49548,11,49604,49604,11,49660,49660,11,49716,49716,11,49772,49772,11,49828,49828,11,49884,49884,11,49940,49940,11,49996,49996,11,50052,50052,11,50108,50108,11,50164,50164,11,50220,50220,11,50276,50276,11,50332,50332,11,50388,50388,11,50444,50444,11,50500,50500,11,50556,50556,11,50612,50612,11,50668,50668,11,50724,50724,11,50780,50780,11,50836,50836,11,50892,50892,11,50948,50948,11,51004,51004,11,51060,51060,11,51116,51116,11,51172,51172,11,51228,51228,11,51284,51284,11,51340,51340,11,51396,51396,11,51452,51452,11,51508,51508,11,51564,51564,11,51620,51620,11,51676,51676,11,51732,51732,11,51788,51788,11,51844,51844,11,51900,51900,11,51956,51956,11,52012,52012,11,52068,52068,11,52124,52124,11,52180,52180,11,52236,52236,11,52292,52292,11,52348,52348,11,52404,52404,11,52460,52460,11,52516,52516,11,52572,52572,11,52628,52628,11,52684,52684,11,52740,52740,11,52796,52796,11,52852,52852,11,52908,52908,11,52964,52964,11,53020,53020,11,53076,53076,11,53132,53132,11,53188,53188,11,53244,53244,11,53300,53300,11,53356,53356,11,53412,53412,11,53468,53468,11,53524,53524,11,53580,53580,11,53636,53636,11,53692,53692,11,53748,53748,11,53804,53804,11,53860,53860,11,53916,53916,11,53972,53972,11,54028,54028,11,54084,54084,11,54140,54140,11,54196,54196,11,54252,54252,11,54308,54308,11,54364,54364,11,54420,54420,11,54476,54476,11,54532,54532,11,54588,54588,11,54644,54644,11,54700,54700,11,54756,54756,11,54812,54812,11,54868,54868,11,54924,54924,11,54980,54980,11,55036,55036,11,55092,55092,11,55148,55148,11,55216,55238,9,65056,65071,5,65529,65531,4,68097,68099,5,68159,68159,5,69446,69456,5,69688,69702,5,69808,69810,7,69815,69816,7,69821,69821,1,69888,69890,5,69932,69932,7,69957,69958,7,70016,70017,5,70067,70069,7,70079,70080,7,70089,70092,5,70095,70095,5,70191,70193,5,70196,70196,5,70198,70199,5,70367,70367,5,70371,70378,5,70402,70403,7,70462,70462,5,70464,70464,5,70471,70472,7,70487,70487,5,70502,70508,5,70709,70711,7,70720,70721,7,70725,70725,7,70750,70750,5,70833,70834,7,70841,70841,7,70843,70844,7,70846,70846,7,70849,70849,7,71087,71087,5,71090,71093,5,71100,71101,5,71103,71104,5,71216,71218,7,71227,71228,7,71230,71230,7,71339,71339,5,71341,71341,5,71344,71349,5,71351,71351,5,71456,71457,7,71462,71462,7,71724,71726,7,71736,71736,7,71984,71984,5,71991,71992,7,71997,71997,7,71999,71999,1,72001,72001,1,72003,72003,5,72148,72151,5,72156,72159,7,72164,72164,7,72243,72248,5,72250,72250,1,72263,72263,5,72279,72280,7,72324,72329,1,72343,72343,7,72751,72751,7,72760,72765,5,72767,72767,5,72873,72873,7,72881,72881,7,72884,72884,7,73009,73014,5,73020,73021,5,73030,73030,1,73098,73102,7,73107,73108,7,73110,73110,7,73459,73460,5,78896,78904,4,92976,92982,5,94033,94087,7,94180,94180,5,113821,113822,5,119141,119141,5,119143,119145,5,119150,119154,5,119163,119170,5,119210,119213,5,121344,121398,5,121461,121461,5,121499,121503,5,122880,122886,5,122907,122913,5,122918,122922,5,123628,123631,5,125252,125258,5,126980,126980,14,127183,127183,14,127245,127247,14,127340,127343,14,127358,127359,14,127377,127386,14,127462,127487,6,127491,127503,14,127535,127535,14,127548,127551,14,127568,127569,14,127744,127777,14,127780,127891,14,127894,127895,14,127897,127899,14,127902,127984,14,127987,127989,14,127991,127994,14,128000,128253,14,128255,128317,14,128329,128334,14,128336,128359,14,128367,128368,14,128371,128377,14,128379,128390,14,128392,128393,14,128398,128399,14,128401,128404,14,128407,128419,14,128421,128421,14,128424,128424,14,128433,128434,14,128444,128444,14,128450,128452,14,128465,128467,14,128476,128478,14,128481,128481,14,128483,128483,14,128488,128488,14,128495,128495,14,128499,128499,14,128506,128591,14,128710,128714,14,128721,128722,14,128725,128725,14,128728,128735,14,128742,128744,14,128746,128746,14,128749,128751,14,128753,128754,14,128756,128758,14,128761,128761,14,128763,128764,14,128884,128895,14,128992,129003,14,129036,129039,14,129114,129119,14,129198,129279,14,129293,129295,14,129305,129310,14,129312,129319,14,129328,129328,14,129331,129338,14,129343,129343,14,129351,129355,14,129357,129359,14,129375,129387,14,129393,129393,14,129395,129398,14,129401,129401,14,129403,129403,14,129408,129412,14,129426,129431,14,129443,129444,14,129451,129453,14,129456,129465,14,129472,129472,14,129475,129482,14,129484,129484,14,129488,129510,14,129536,129647,14,129652,129652,14,129656,129658,14,129664,129666,14,129671,129679,14,129686,129704,14,129712,129718,14,129728,129730,14,129744,129750,14,917504,917504,4,917506,917535,4,917632,917759,4,918000,921599,4,0,9,4,11,12,4,14,31,4,169,169,14,174,174,14,1155,1159,5,1425,1469,5,1473,1474,5,1479,1479,5,1552,1562,5,1611,1631,5,1750,1756,5,1759,1764,5,1770,1773,5,1809,1809,5,1958,1968,5,2045,2045,5,2075,2083,5,2089,2093,5,2259,2273,5,2275,2306,5,2362,2362,5,2364,2364,5,2369,2376,5,2381,2381,5,2385,2391,5,2433,2433,5,2492,2492,5,2495,2496,7,2503,2504,7,2509,2509,5,2530,2531,5,2561,2562,5,2620,2620,5,2625,2626,5,2635,2637,5,2672,2673,5,2689,2690,5,2748,2748,5,2753,2757,5,2761,2761,7,2765,2765,5,2810,2815,5,2818,2819,7,2878,2878,5,2880,2880,7,2887,2888,7,2893,2893,5,2903,2903,5,2946,2946,5,3007,3007,7,3009,3010,7,3018,3020,7,3031,3031,5,3073,3075,7,3134,3136,5,3142,3144,5,3157,3158,5,3201,3201,5,3260,3260,5,3263,3263,5,3266,3266,5,3270,3270,5,3274,3275,7,3285,3286,5,3328,3329,5,3387,3388,5,3391,3392,7,3398,3400,7,3405,3405,5,3415,3415,5,3457,3457,5,3530,3530,5,3536,3537,7,3542,3542,5,3551,3551,5,3633,3633,5,3636,3642,5,3761,3761,5,3764,3772,5,3864,3865,5,3895,3895,5,3902,3903,7,3967,3967,7,3974,3975,5,3993,4028,5,4141,4144,5,4146,4151,5,4155,4156,7,4182,4183,7,4190,4192,5,4226,4226,5,4229,4230,5,4253,4253,5,4448,4519,9,4957,4959,5,5938,5940,5,6002,6003,5,6070,6070,7,6078,6085,7,6087,6088,7,6109,6109,5,6158,6158,4,6313,6313,5,6435,6438,7,6441,6443,7,6450,6450,5,6457,6459,5,6681,6682,7,6741,6741,7,6743,6743,7,6752,6752,5,6757,6764,5,6771,6780,5,6832,6845,5,6847,6848,5,6916,6916,7,6965,6965,5,6971,6971,7,6973,6977,7,6979,6980,7,7040,7041,5,7073,7073,7,7078,7079,7,7082,7082,7,7142,7142,5,7144,7145,5,7149,7149,5,7151,7153,5,7204,7211,7,7220,7221,7,7376,7378,5,7393,7393,7,7405,7405,5,7415,7415,7,7616,7673,5,8203,8203,4,8205,8205,13,8232,8232,4,8234,8238,4,8265,8265,14,8293,8293,4,8400,8412,5,8417,8417,5,8421,8432,5,8505,8505,14,8617,8618,14,9000,9000,14,9167,9167,14,9208,9210,14,9642,9643,14,9664,9664,14,9728,9732,14,9735,9741,14,9743,9744,14,9746,9746,14,9750,9751,14,9753,9756,14,9758,9759,14,9761,9761,14,9764,9765,14,9767,9769,14,9771,9773,14,9776,9783,14,9787,9791,14,9793,9793,14,9795,9799,14,9812,9822,14,9824,9824,14,9827,9827,14,9829,9830,14,9832,9832,14,9851,9851,14,9854,9854,14,9856,9861,14,9874,9876,14,9878,9879,14,9881,9881,14,9883,9884,14,9888,9889,14,9895,9895,14,9898,9899,14,9904,9905,14,9917,9918,14,9924,9925,14,9928,9928,14,9934,9935,14,9937,9937,14,9939,9940,14,9961,9962,14,9968,9973,14,9975,9978,14,9981,9981,14,9986,9986,14,9989,9989,14,9998,9998,14,10000,10001,14,10004,10004,14,10013,10013,14,10024,10024,14,10052,10052,14,10060,10060,14,10067,10069,14,10083,10084,14,10133,10135,14,10160,10160,14,10548,10549,14,11035,11036,14,11093,11093,14,11647,11647,5,12330,12333,5,12336,12336,14,12441,12442,5,12953,12953,14,42608,42610,5,42654,42655,5,43010,43010,5,43019,43019,5,43045,43046,5,43052,43052,5,43188,43203,7,43232,43249,5,43302,43309,5,43346,43347,7,43392,43394,5,43443,43443,5,43446,43449,5,43452,43453,5,43493,43493,5,43567,43568,7,43571,43572,7,43587,43587,5,43597,43597,7,43696,43696,5,43703,43704,5,43713,43713,5,43756,43757,5,43765,43765,7,44003,44004,7,44006,44007,7,44009,44010,7,44013,44013,5,44033,44059,12,44061,44087,12,44089,44115,12,44117,44143,12,44145,44171,12,44173,44199,12,44201,44227,12,44229,44255,12,44257,44283,12,44285,44311,12,44313,44339,12,44341,44367,12,44369,44395,12,44397,44423,12,44425,44451,12,44453,44479,12,44481,44507,12,44509,44535,12,44537,44563,12,44565,44591,12,44593,44619,12,44621,44647,12,44649,44675,12,44677,44703,12,44705,44731,12,44733,44759,12,44761,44787,12,44789,44815,12,44817,44843,12,44845,44871,12,44873,44899,12,44901,44927,12,44929,44955,12,44957,44983,12,44985,45011,12,45013,45039,12,45041,45067,12,45069,45095,12,45097,45123,12,45125,45151,12,45153,45179,12,45181,45207,12,45209,45235,12,45237,45263,12,45265,45291,12,45293,45319,12,45321,45347,12,45349,45375,12,45377,45403,12,45405,45431,12,45433,45459,12,45461,45487,12,45489,45515,12,45517,45543,12,45545,45571,12,45573,45599,12,45601,45627,12,45629,45655,12,45657,45683,12,45685,45711,12,45713,45739,12,45741,45767,12,45769,45795,12,45797,45823,12,45825,45851,12,45853,45879,12,45881,45907,12,45909,45935,12,45937,45963,12,45965,45991,12,45993,46019,12,46021,46047,12,46049,46075,12,46077,46103,12,46105,46131,12,46133,46159,12,46161,46187,12,46189,46215,12,46217,46243,12,46245,46271,12,46273,46299,12,46301,46327,12,46329,46355,12,46357,46383,12,46385,46411,12,46413,46439,12,46441,46467,12,46469,46495,12,46497,46523,12,46525,46551,12,46553,46579,12,46581,46607,12,46609,46635,12,46637,46663,12,46665,46691,12,46693,46719,12,46721,46747,12,46749,46775,12,46777,46803,12,46805,46831,12,46833,46859,12,46861,46887,12,46889,46915,12,46917,46943,12,46945,46971,12,46973,46999,12,47001,47027,12,47029,47055,12,47057,47083,12,47085,47111,12,47113,47139,12,47141,47167,12,47169,47195,12,47197,47223,12,47225,47251,12,47253,47279,12,47281,47307,12,47309,47335,12,47337,47363,12,47365,47391,12,47393,47419,12,47421,47447,12,47449,47475,12,47477,47503,12,47505,47531,12,47533,47559,12,47561,47587,12,47589,47615,12,47617,47643,12,47645,47671,12,47673,47699,12,47701,47727,12,47729,47755,12,47757,47783,12,47785,47811,12,47813,47839,12,47841,47867,12,47869,47895,12,47897,47923,12,47925,47951,12,47953,47979,12,47981,48007,12,48009,48035,12,48037,48063,12,48065,48091,12,48093,48119,12,48121,48147,12,48149,48175,12,48177,48203,12,48205,48231,12,48233,48259,12,48261,48287,12,48289,48315,12,48317,48343,12,48345,48371,12,48373,48399,12,48401,48427,12,48429,48455,12,48457,48483,12,48485,48511,12,48513,48539,12,48541,48567,12,48569,48595,12,48597,48623,12,48625,48651,12,48653,48679,12,48681,48707,12,48709,48735,12,48737,48763,12,48765,48791,12,48793,48819,12,48821,48847,12,48849,48875,12,48877,48903,12,48905,48931,12,48933,48959,12,48961,48987,12,48989,49015,12,49017,49043,12,49045,49071,12,49073,49099,12,49101,49127,12,49129,49155,12,49157,49183,12,49185,49211,12,49213,49239,12,49241,49267,12,49269,49295,12,49297,49323,12,49325,49351,12,49353,49379,12,49381,49407,12,49409,49435,12,49437,49463,12,49465,49491,12,49493,49519,12,49521,49547,12,49549,49575,12,49577,49603,12,49605,49631,12,49633,49659,12,49661,49687,12,49689,49715,12,49717,49743,12,49745,49771,12,49773,49799,12,49801,49827,12,49829,49855,12,49857,49883,12,49885,49911,12,49913,49939,12,49941,49967,12,49969,49995,12,49997,50023,12,50025,50051,12,50053,50079,12,50081,50107,12,50109,50135,12,50137,50163,12,50165,50191,12,50193,50219,12,50221,50247,12,50249,50275,12,50277,50303,12,50305,50331,12,50333,50359,12,50361,50387,12,50389,50415,12,50417,50443,12,50445,50471,12,50473,50499,12,50501,50527,12,50529,50555,12,50557,50583,12,50585,50611,12,50613,50639,12,50641,50667,12,50669,50695,12,50697,50723,12,50725,50751,12,50753,50779,12,50781,50807,12,50809,50835,12,50837,50863,12,50865,50891,12,50893,50919,12,50921,50947,12,50949,50975,12,50977,51003,12,51005,51031,12,51033,51059,12,51061,51087,12,51089,51115,12,51117,51143,12,51145,51171,12,51173,51199,12,51201,51227,12,51229,51255,12,51257,51283,12,51285,51311,12,51313,51339,12,51341,51367,12,51369,51395,12,51397,51423,12,51425,51451,12,51453,51479,12,51481,51507,12,51509,51535,12,51537,51563,12,51565,51591,12,51593,51619,12,51621,51647,12,51649,51675,12,51677,51703,12,51705,51731,12,51733,51759,12,51761,51787,12,51789,51815,12,51817,51843,12,51845,51871,12,51873,51899,12,51901,51927,12,51929,51955,12,51957,51983,12,51985,52011,12,52013,52039,12,52041,52067,12,52069,52095,12,52097,52123,12,52125,52151,12,52153,52179,12,52181,52207,12,52209,52235,12,52237,52263,12,52265,52291,12,52293,52319,12,52321,52347,12,52349,52375,12,52377,52403,12,52405,52431,12,52433,52459,12,52461,52487,12,52489,52515,12,52517,52543,12,52545,52571,12,52573,52599,12,52601,52627,12,52629,52655,12,52657,52683,12,52685,52711,12,52713,52739,12,52741,52767,12,52769,52795,12,52797,52823,12,52825,52851,12,52853,52879,12,52881,52907,12,52909,52935,12,52937,52963,12,52965,52991,12,52993,53019,12,53021,53047,12,53049,53075,12,53077,53103,12,53105,53131,12,53133,53159,12,53161,53187,12,53189,53215,12,53217,53243,12,53245,53271,12,53273,53299,12,53301,53327,12,53329,53355,12,53357,53383,12,53385,53411,12,53413,53439,12,53441,53467,12,53469,53495,12,53497,53523,12,53525,53551,12,53553,53579,12,53581,53607,12,53609,53635,12,53637,53663,12,53665,53691,12,53693,53719,12,53721,53747,12,53749,53775,12,53777,53803,12,53805,53831,12,53833,53859,12,53861,53887,12,53889,53915,12,53917,53943,12,53945,53971,12,53973,53999,12,54001,54027,12,54029,54055,12,54057,54083,12,54085,54111,12,54113,54139,12,54141,54167,12,54169,54195,12,54197,54223,12,54225,54251,12,54253,54279,12,54281,54307,12,54309,54335,12,54337,54363,12,54365,54391,12,54393,54419,12,54421,54447,12,54449,54475,12,54477,54503,12,54505,54531,12,54533,54559,12,54561,54587,12,54589,54615,12,54617,54643,12,54645,54671,12,54673,54699,12,54701,54727,12,54729,54755,12,54757,54783,12,54785,54811,12,54813,54839,12,54841,54867,12,54869,54895,12,54897,54923,12,54925,54951,12,54953,54979,12,54981,55007,12,55009,55035,12,55037,55063,12,55065,55091,12,55093,55119,12,55121,55147,12,55149,55175,12,55177,55203,12,55243,55291,10,65024,65039,5,65279,65279,4,65520,65528,4,66045,66045,5,66422,66426,5,68101,68102,5,68152,68154,5,68325,68326,5,69291,69292,5,69632,69632,7,69634,69634,7,69759,69761,5]"
        );
      }
      function Se(A, D) {
        if (A === 0) return 0;
        const F = we(A, D);
        if (F !== void 0) return F;
        const k = W(D, A);
        return (A -= le(k)), A;
      }
      t.getLeftDeleteOffset = Se;
      function we(A, D) {
        let F = W(D, A);
        for (A -= le(F); Ne(F) || F === 65039 || F === 8419; ) {
          if (A === 0) return;
          (F = W(D, A)), (A -= le(F));
        }
        if (!!he(F)) {
          if (A >= 0) {
            const k = W(D, A);
            k === 8205 && (A -= le(k));
          }
          return A;
        }
      }
      function le(A) {
        return A >= 65536 ? 2 : 1;
      }
      function Ne(A) {
        return 127995 <= A && A <= 127999;
      }
    }),
    z(G[21], Q([0, 1, 5]), function(I, t, E) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.StringSHA1 = t.toHexString = t.stringHash = t.doHash = t.hash = void 0);
      function M(i) {
        return p(i, 0);
      }
      t.hash = M;
      function p(i, s) {
        switch (typeof i) {
          case "object":
            return i === null
              ? o(349, s)
              : Array.isArray(i)
              ? l(i, s)
              : f(i, s);
          case "string":
            return u(i, s);
          case "boolean":
            return h(i, s);
          case "number":
            return o(i, s);
          case "undefined":
            return o(937, s);
          default:
            return o(617, s);
        }
      }
      t.doHash = p;
      function o(i, s) {
        return ((s << 5) - s + i) | 0;
      }
      function h(i, s) {
        return o(i ? 433 : 863, s);
      }
      function u(i, s) {
        s = o(149417, s);
        for (let d = 0, S = i.length; d < S; d++) s = o(i.charCodeAt(d), s);
        return s;
      }
      t.stringHash = u;
      function l(i, s) {
        return (s = o(104579, s)), i.reduce((d, S) => p(S, d), s);
      }
      function f(i, s) {
        return (
          (s = o(181387, s)),
          Object.keys(i)
            .sort()
            .reduce((d, S) => ((d = u(S, d)), p(i[S], d)), s)
        );
      }
      function L(i, s, d = 32) {
        const S = d - s,
          n = ~((1 << S) - 1);
        return ((i << s) | ((n & i) >>> S)) >>> 0;
      }
      function a(i, s = 0, d = i.byteLength, S = 0) {
        for (let n = 0; n < d; n++) i[s + n] = S;
      }
      function _(i, s, d = "0") {
        for (; i.length < s; ) i = d + i;
        return i;
      }
      function g(i, s = 32) {
        return i instanceof ArrayBuffer
          ? Array.from(new Uint8Array(i))
              .map(d => d.toString(16).padStart(2, "0"))
              .join("")
          : _((i >>> 0).toString(16), s / 4);
      }
      t.toHexString = g;
      class m {
        constructor() {
          (this._h0 = 1732584193),
            (this._h1 = 4023233417),
            (this._h2 = 2562383102),
            (this._h3 = 271733878),
            (this._h4 = 3285377520),
            (this._buff = new Uint8Array(64 + 3)),
            (this._buffDV = new DataView(this._buff.buffer)),
            (this._buffLen = 0),
            (this._totalLen = 0),
            (this._leftoverHighSurrogate = 0),
            (this._finished = !1);
        }
        update(s) {
          const d = s.length;
          if (d === 0) return;
          const S = this._buff;
          let n = this._buffLen,
            r = this._leftoverHighSurrogate,
            c,
            C;
          for (
            r !== 0
              ? ((c = r), (C = -1), (r = 0))
              : ((c = s.charCodeAt(0)), (C = 0));
            ;

          ) {
            let b = c;
            if (E.isHighSurrogate(c))
              if (C + 1 < d) {
                const v = s.charCodeAt(C + 1);
                E.isLowSurrogate(v)
                  ? (C++, (b = E.computeCodePoint(c, v)))
                  : (b = 65533);
              } else {
                r = c;
                break;
              }
            else E.isLowSurrogate(c) && (b = 65533);
            if (((n = this._push(S, n, b)), C++, C < d)) c = s.charCodeAt(C);
            else break;
          }
          (this._buffLen = n), (this._leftoverHighSurrogate = r);
        }
        _push(s, d, S) {
          return (
            S < 128
              ? (s[d++] = S)
              : S < 2048
              ? ((s[d++] = 192 | ((S & 1984) >>> 6)),
                (s[d++] = 128 | ((S & 63) >>> 0)))
              : S < 65536
              ? ((s[d++] = 224 | ((S & 61440) >>> 12)),
                (s[d++] = 128 | ((S & 4032) >>> 6)),
                (s[d++] = 128 | ((S & 63) >>> 0)))
              : ((s[d++] = 240 | ((S & 1835008) >>> 18)),
                (s[d++] = 128 | ((S & 258048) >>> 12)),
                (s[d++] = 128 | ((S & 4032) >>> 6)),
                (s[d++] = 128 | ((S & 63) >>> 0))),
            d >= 64 &&
              (this._step(),
              (d -= 64),
              (this._totalLen += 64),
              (s[0] = s[64 + 0]),
              (s[1] = s[64 + 1]),
              (s[2] = s[64 + 2])),
            d
          );
        }
        digest() {
          return (
            this._finished ||
              ((this._finished = !0),
              this._leftoverHighSurrogate &&
                ((this._leftoverHighSurrogate = 0),
                (this._buffLen = this._push(this._buff, this._buffLen, 65533))),
              (this._totalLen += this._buffLen),
              this._wrapUp()),
            g(this._h0) + g(this._h1) + g(this._h2) + g(this._h3) + g(this._h4)
          );
        }
        _wrapUp() {
          (this._buff[this._buffLen++] = 128),
            a(this._buff, this._buffLen),
            this._buffLen > 56 && (this._step(), a(this._buff));
          const s = 8 * this._totalLen;
          this._buffDV.setUint32(56, Math.floor(s / 4294967296), !1),
            this._buffDV.setUint32(60, s % 4294967296, !1),
            this._step();
        }
        _step() {
          const s = m._bigBlock32,
            d = this._buffDV;
          for (let N = 0; N < 64; N += 4)
            s.setUint32(N, d.getUint32(N, !1), !1);
          for (let N = 64; N < 320; N += 4)
            s.setUint32(
              N,
              L(
                s.getUint32(N - 12, !1) ^
                  s.getUint32(N - 32, !1) ^
                  s.getUint32(N - 56, !1) ^
                  s.getUint32(N - 64, !1),
                1
              ),
              !1
            );
          let S = this._h0,
            n = this._h1,
            r = this._h2,
            c = this._h3,
            C = this._h4,
            b,
            v,
            w;
          for (let N = 0; N < 80; N++)
            N < 20
              ? ((b = (n & r) | (~n & c)), (v = 1518500249))
              : N < 40
              ? ((b = n ^ r ^ c), (v = 1859775393))
              : N < 60
              ? ((b = (n & r) | (n & c) | (r & c)), (v = 2400959708))
              : ((b = n ^ r ^ c), (v = 3395469782)),
              (w = (L(S, 5) + b + C + v + s.getUint32(N * 4, !1)) & 4294967295),
              (C = c),
              (c = r),
              (r = L(n, 30)),
              (n = S),
              (S = w);
          (this._h0 = (this._h0 + S) & 4294967295),
            (this._h1 = (this._h1 + n) & 4294967295),
            (this._h2 = (this._h2 + r) & 4294967295),
            (this._h3 = (this._h3 + c) & 4294967295),
            (this._h4 = (this._h4 + C) & 4294967295);
        }
      }
      (t.StringSHA1 = m), (m._bigBlock32 = new DataView(new ArrayBuffer(320)));
    }),
    z(G[10], Q([0, 1, 14, 21]), function(I, t, E, M) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.LcsDiff = t.MyArray = t.Debug = t.stringDiff = t.StringDiffSequence = void 0);
      class p {
        constructor(a) {
          this.source = a;
        }
        getElements() {
          const a = this.source,
            _ = new Int32Array(a.length);
          for (let g = 0, m = a.length; g < m; g++) _[g] = a.charCodeAt(g);
          return _;
        }
      }
      t.StringDiffSequence = p;
      function o(L, a, _) {
        return new f(new p(L), new p(a)).ComputeDiff(_).changes;
      }
      t.stringDiff = o;
      class h {
        static Assert(a, _) {
          if (!a) throw new Error(_);
        }
      }
      t.Debug = h;
      class u {
        static Copy(a, _, g, m, i) {
          for (let s = 0; s < i; s++) g[m + s] = a[_ + s];
        }
        static Copy2(a, _, g, m, i) {
          for (let s = 0; s < i; s++) g[m + s] = a[_ + s];
        }
      }
      t.MyArray = u;
      class l {
        constructor() {
          (this.m_changes = []),
            (this.m_originalStart = 1073741824),
            (this.m_modifiedStart = 1073741824),
            (this.m_originalCount = 0),
            (this.m_modifiedCount = 0);
        }
        MarkNextChange() {
          (this.m_originalCount > 0 || this.m_modifiedCount > 0) &&
            this.m_changes.push(
              new E.DiffChange(
                this.m_originalStart,
                this.m_originalCount,
                this.m_modifiedStart,
                this.m_modifiedCount
              )
            ),
            (this.m_originalCount = 0),
            (this.m_modifiedCount = 0),
            (this.m_originalStart = 1073741824),
            (this.m_modifiedStart = 1073741824);
        }
        AddOriginalElement(a, _) {
          (this.m_originalStart = Math.min(this.m_originalStart, a)),
            (this.m_modifiedStart = Math.min(this.m_modifiedStart, _)),
            this.m_originalCount++;
        }
        AddModifiedElement(a, _) {
          (this.m_originalStart = Math.min(this.m_originalStart, a)),
            (this.m_modifiedStart = Math.min(this.m_modifiedStart, _)),
            this.m_modifiedCount++;
        }
        getChanges() {
          return (
            (this.m_originalCount > 0 || this.m_modifiedCount > 0) &&
              this.MarkNextChange(),
            this.m_changes
          );
        }
        getReverseChanges() {
          return (
            (this.m_originalCount > 0 || this.m_modifiedCount > 0) &&
              this.MarkNextChange(),
            this.m_changes.reverse(),
            this.m_changes
          );
        }
      }
      class f {
        constructor(a, _, g = null) {
          this.ContinueProcessingPredicate = g;
          const [m, i, s] = f._getElements(a),
            [d, S, n] = f._getElements(_);
          (this._hasStrings = s && n),
            (this._originalStringElements = m),
            (this._originalElementsOrHash = i),
            (this._modifiedStringElements = d),
            (this._modifiedElementsOrHash = S),
            (this.m_forwardHistory = []),
            (this.m_reverseHistory = []);
        }
        static _isStringArray(a) {
          return a.length > 0 && typeof a[0] == "string";
        }
        static _getElements(a) {
          const _ = a.getElements();
          if (f._isStringArray(_)) {
            const g = new Int32Array(_.length);
            for (let m = 0, i = _.length; m < i; m++)
              g[m] = M.stringHash(_[m], 0);
            return [_, g, !0];
          }
          return _ instanceof Int32Array
            ? [[], _, !1]
            : [[], new Int32Array(_), !1];
        }
        ElementsAreEqual(a, _) {
          return this._originalElementsOrHash[a] !==
            this._modifiedElementsOrHash[_]
            ? !1
            : this._hasStrings
            ? this._originalStringElements[a] ===
              this._modifiedStringElements[_]
            : !0;
        }
        OriginalElementsAreEqual(a, _) {
          return this._originalElementsOrHash[a] !==
            this._originalElementsOrHash[_]
            ? !1
            : this._hasStrings
            ? this._originalStringElements[a] ===
              this._originalStringElements[_]
            : !0;
        }
        ModifiedElementsAreEqual(a, _) {
          return this._modifiedElementsOrHash[a] !==
            this._modifiedElementsOrHash[_]
            ? !1
            : this._hasStrings
            ? this._modifiedStringElements[a] ===
              this._modifiedStringElements[_]
            : !0;
        }
        ComputeDiff(a) {
          return this._ComputeDiff(
            0,
            this._originalElementsOrHash.length - 1,
            0,
            this._modifiedElementsOrHash.length - 1,
            a
          );
        }
        _ComputeDiff(a, _, g, m, i) {
          const s = [!1];
          let d = this.ComputeDiffRecursive(a, _, g, m, s);
          return (
            i && (d = this.PrettifyChanges(d)), { quitEarly: s[0], changes: d }
          );
        }
        ComputeDiffRecursive(a, _, g, m, i) {
          for (i[0] = !1; a <= _ && g <= m && this.ElementsAreEqual(a, g); )
            a++, g++;
          for (; _ >= a && m >= g && this.ElementsAreEqual(_, m); ) _--, m--;
          if (a > _ || g > m) {
            let c;
            return (
              g <= m
                ? (h.Assert(
                    a === _ + 1,
                    "originalStart should only be one more than originalEnd"
                  ),
                  (c = [new E.DiffChange(a, 0, g, m - g + 1)]))
                : a <= _
                ? (h.Assert(
                    g === m + 1,
                    "modifiedStart should only be one more than modifiedEnd"
                  ),
                  (c = [new E.DiffChange(a, _ - a + 1, g, 0)]))
                : (h.Assert(
                    a === _ + 1,
                    "originalStart should only be one more than originalEnd"
                  ),
                  h.Assert(
                    g === m + 1,
                    "modifiedStart should only be one more than modifiedEnd"
                  ),
                  (c = [])),
              c
            );
          }
          const s = [0],
            d = [0],
            S = this.ComputeRecursionPoint(a, _, g, m, s, d, i),
            n = s[0],
            r = d[0];
          if (S !== null) return S;
          if (!i[0]) {
            const c = this.ComputeDiffRecursive(a, n, g, r, i);
            let C = [];
            return (
              i[0]
                ? (C = [
                    new E.DiffChange(
                      n + 1,
                      _ - (n + 1) + 1,
                      r + 1,
                      m - (r + 1) + 1
                    )
                  ])
                : (C = this.ComputeDiffRecursive(n + 1, _, r + 1, m, i)),
              this.ConcatenateChanges(c, C)
            );
          }
          return [new E.DiffChange(a, _ - a + 1, g, m - g + 1)];
        }
        WALKTRACE(a, _, g, m, i, s, d, S, n, r, c, C, b, v, w, N, y, P) {
          let U = null,
            R = null,
            q = new l(),
            Y = _,
            j = g,
            T = b[0] - N[0] - m,
            W = -1073741824,
            O = this.m_forwardHistory.length - 1;
          do {
            const e = T + a;
            e === Y || (e < j && n[e - 1] < n[e + 1])
              ? ((c = n[e + 1]),
                (v = c - T - m),
                c < W && q.MarkNextChange(),
                (W = c),
                q.AddModifiedElement(c + 1, v),
                (T = e + 1 - a))
              : ((c = n[e - 1] + 1),
                (v = c - T - m),
                c < W && q.MarkNextChange(),
                (W = c - 1),
                q.AddOriginalElement(c, v + 1),
                (T = e - 1 - a)),
              O >= 0 &&
                ((n = this.m_forwardHistory[O]),
                (a = n[0]),
                (Y = 1),
                (j = n.length - 1));
          } while (--O >= -1);
          if (((U = q.getReverseChanges()), P[0])) {
            let e = b[0] + 1,
              B = N[0] + 1;
            if (U !== null && U.length > 0) {
              const V = U[U.length - 1];
              (e = Math.max(e, V.getOriginalEnd())),
                (B = Math.max(B, V.getModifiedEnd()));
            }
            R = [new E.DiffChange(e, C - e + 1, B, w - B + 1)];
          } else {
            (q = new l()),
              (Y = s),
              (j = d),
              (T = b[0] - N[0] - S),
              (W = 1073741824),
              (O = y
                ? this.m_reverseHistory.length - 1
                : this.m_reverseHistory.length - 2);
            do {
              const e = T + i;
              e === Y || (e < j && r[e - 1] >= r[e + 1])
                ? ((c = r[e + 1] - 1),
                  (v = c - T - S),
                  c > W && q.MarkNextChange(),
                  (W = c + 1),
                  q.AddOriginalElement(c + 1, v + 1),
                  (T = e + 1 - i))
                : ((c = r[e - 1]),
                  (v = c - T - S),
                  c > W && q.MarkNextChange(),
                  (W = c),
                  q.AddModifiedElement(c + 1, v + 1),
                  (T = e - 1 - i)),
                O >= 0 &&
                  ((r = this.m_reverseHistory[O]),
                  (i = r[0]),
                  (Y = 1),
                  (j = r.length - 1));
            } while (--O >= -1);
            R = q.getChanges();
          }
          return this.ConcatenateChanges(U, R);
        }
        ComputeRecursionPoint(a, _, g, m, i, s, d) {
          let S = 0,
            n = 0,
            r = 0,
            c = 0,
            C = 0,
            b = 0;
          a--,
            g--,
            (i[0] = 0),
            (s[0] = 0),
            (this.m_forwardHistory = []),
            (this.m_reverseHistory = []);
          const v = _ - a + (m - g),
            w = v + 1,
            N = new Int32Array(w),
            y = new Int32Array(w),
            P = m - g,
            U = _ - a,
            R = a - g,
            q = _ - m,
            j = (U - P) % 2 == 0;
          (N[P] = a), (y[U] = _), (d[0] = !1);
          for (let T = 1; T <= v / 2 + 1; T++) {
            let W = 0,
              O = 0;
            (r = this.ClipDiagonalBound(P - T, T, P, w)),
              (c = this.ClipDiagonalBound(P + T, T, P, w));
            for (let B = r; B <= c; B += 2) {
              B === r || (B < c && N[B - 1] < N[B + 1])
                ? (S = N[B + 1])
                : (S = N[B - 1] + 1),
                (n = S - (B - P) - R);
              const V = S;
              for (; S < _ && n < m && this.ElementsAreEqual(S + 1, n + 1); )
                S++, n++;
              if (
                ((N[B] = S),
                S + n > W + O && ((W = S), (O = n)),
                !j && Math.abs(B - U) <= T - 1 && S >= y[B])
              )
                return (
                  (i[0] = S),
                  (s[0] = n),
                  V <= y[B] && 1447 > 0 && T <= 1447 + 1
                    ? this.WALKTRACE(
                        P,
                        r,
                        c,
                        R,
                        U,
                        C,
                        b,
                        q,
                        N,
                        y,
                        S,
                        _,
                        i,
                        n,
                        m,
                        s,
                        j,
                        d
                      )
                    : null
                );
            }
            const e = (W - a + (O - g) - T) / 2;
            if (
              this.ContinueProcessingPredicate !== null &&
              !this.ContinueProcessingPredicate(W, e)
            )
              return (
                (d[0] = !0),
                (i[0] = W),
                (s[0] = O),
                e > 0 && 1447 > 0 && T <= 1447 + 1
                  ? this.WALKTRACE(
                      P,
                      r,
                      c,
                      R,
                      U,
                      C,
                      b,
                      q,
                      N,
                      y,
                      S,
                      _,
                      i,
                      n,
                      m,
                      s,
                      j,
                      d
                    )
                  : (a++, g++, [new E.DiffChange(a, _ - a + 1, g, m - g + 1)])
              );
            (C = this.ClipDiagonalBound(U - T, T, U, w)),
              (b = this.ClipDiagonalBound(U + T, T, U, w));
            for (let B = C; B <= b; B += 2) {
              B === C || (B < b && y[B - 1] >= y[B + 1])
                ? (S = y[B + 1] - 1)
                : (S = y[B - 1]),
                (n = S - (B - U) - q);
              const V = S;
              for (; S > a && n > g && this.ElementsAreEqual(S, n); ) S--, n--;
              if (((y[B] = S), j && Math.abs(B - P) <= T && S <= N[B]))
                return (
                  (i[0] = S),
                  (s[0] = n),
                  V >= N[B] && 1447 > 0 && T <= 1447 + 1
                    ? this.WALKTRACE(
                        P,
                        r,
                        c,
                        R,
                        U,
                        C,
                        b,
                        q,
                        N,
                        y,
                        S,
                        _,
                        i,
                        n,
                        m,
                        s,
                        j,
                        d
                      )
                    : null
                );
            }
            if (T <= 1447) {
              let B = new Int32Array(c - r + 2);
              (B[0] = P - r + 1),
                u.Copy2(N, r, B, 1, c - r + 1),
                this.m_forwardHistory.push(B),
                (B = new Int32Array(b - C + 2)),
                (B[0] = U - C + 1),
                u.Copy2(y, C, B, 1, b - C + 1),
                this.m_reverseHistory.push(B);
            }
          }
          return this.WALKTRACE(
            P,
            r,
            c,
            R,
            U,
            C,
            b,
            q,
            N,
            y,
            S,
            _,
            i,
            n,
            m,
            s,
            j,
            d
          );
        }
        PrettifyChanges(a) {
          for (let _ = 0; _ < a.length; _++) {
            const g = a[_],
              m =
                _ < a.length - 1
                  ? a[_ + 1].originalStart
                  : this._originalElementsOrHash.length,
              i =
                _ < a.length - 1
                  ? a[_ + 1].modifiedStart
                  : this._modifiedElementsOrHash.length,
              s = g.originalLength > 0,
              d = g.modifiedLength > 0;
            for (
              ;
              g.originalStart + g.originalLength < m &&
              g.modifiedStart + g.modifiedLength < i &&
              (!s ||
                this.OriginalElementsAreEqual(
                  g.originalStart,
                  g.originalStart + g.originalLength
                )) &&
              (!d ||
                this.ModifiedElementsAreEqual(
                  g.modifiedStart,
                  g.modifiedStart + g.modifiedLength
                ));

            )
              g.originalStart++, g.modifiedStart++;
            let S = [null];
            if (_ < a.length - 1 && this.ChangesOverlap(a[_], a[_ + 1], S)) {
              (a[_] = S[0]), a.splice(_ + 1, 1), _--;
              continue;
            }
          }
          for (let _ = a.length - 1; _ >= 0; _--) {
            const g = a[_];
            let m = 0,
              i = 0;
            if (_ > 0) {
              const c = a[_ - 1];
              (m = c.originalStart + c.originalLength),
                (i = c.modifiedStart + c.modifiedLength);
            }
            const s = g.originalLength > 0,
              d = g.modifiedLength > 0;
            let S = 0,
              n = this._boundaryScore(
                g.originalStart,
                g.originalLength,
                g.modifiedStart,
                g.modifiedLength
              );
            for (let c = 1; ; c++) {
              const C = g.originalStart - c,
                b = g.modifiedStart - c;
              if (
                C < m ||
                b < i ||
                (s &&
                  !this.OriginalElementsAreEqual(C, C + g.originalLength)) ||
                (d && !this.ModifiedElementsAreEqual(b, b + g.modifiedLength))
              )
                break;
              const w =
                (C === m && b === i ? 5 : 0) +
                this._boundaryScore(C, g.originalLength, b, g.modifiedLength);
              w > n && ((n = w), (S = c));
            }
            (g.originalStart -= S), (g.modifiedStart -= S);
            const r = [null];
            if (_ > 0 && this.ChangesOverlap(a[_ - 1], a[_], r)) {
              (a[_ - 1] = r[0]), a.splice(_, 1), _++;
              continue;
            }
          }
          if (this._hasStrings)
            for (let _ = 1, g = a.length; _ < g; _++) {
              const m = a[_ - 1],
                i = a[_],
                s = i.originalStart - m.originalStart - m.originalLength,
                d = m.originalStart,
                S = i.originalStart + i.originalLength,
                n = S - d,
                r = m.modifiedStart,
                c = i.modifiedStart + i.modifiedLength,
                C = c - r;
              if (s < 5 && n < 20 && C < 20) {
                const b = this._findBetterContiguousSequence(d, n, r, C, s);
                if (b) {
                  const [v, w] = b;
                  (v !== m.originalStart + m.originalLength ||
                    w !== m.modifiedStart + m.modifiedLength) &&
                    ((m.originalLength = v - m.originalStart),
                    (m.modifiedLength = w - m.modifiedStart),
                    (i.originalStart = v + s),
                    (i.modifiedStart = w + s),
                    (i.originalLength = S - i.originalStart),
                    (i.modifiedLength = c - i.modifiedStart));
                }
              }
            }
          return a;
        }
        _findBetterContiguousSequence(a, _, g, m, i) {
          if (_ < i || m < i) return null;
          const s = a + _ - i + 1,
            d = g + m - i + 1;
          let S = 0,
            n = 0,
            r = 0;
          for (let c = a; c < s; c++)
            for (let C = g; C < d; C++) {
              const b = this._contiguousSequenceScore(c, C, i);
              b > 0 && b > S && ((S = b), (n = c), (r = C));
            }
          return S > 0 ? [n, r] : null;
        }
        _contiguousSequenceScore(a, _, g) {
          let m = 0;
          for (let i = 0; i < g; i++) {
            if (!this.ElementsAreEqual(a + i, _ + i)) return 0;
            m += this._originalStringElements[a + i].length;
          }
          return m;
        }
        _OriginalIsBoundary(a) {
          return a <= 0 || a >= this._originalElementsOrHash.length - 1
            ? !0
            : this._hasStrings && /^\s*$/.test(this._originalStringElements[a]);
        }
        _OriginalRegionIsBoundary(a, _) {
          if (this._OriginalIsBoundary(a) || this._OriginalIsBoundary(a - 1))
            return !0;
          if (_ > 0) {
            const g = a + _;
            if (this._OriginalIsBoundary(g - 1) || this._OriginalIsBoundary(g))
              return !0;
          }
          return !1;
        }
        _ModifiedIsBoundary(a) {
          return a <= 0 || a >= this._modifiedElementsOrHash.length - 1
            ? !0
            : this._hasStrings && /^\s*$/.test(this._modifiedStringElements[a]);
        }
        _ModifiedRegionIsBoundary(a, _) {
          if (this._ModifiedIsBoundary(a) || this._ModifiedIsBoundary(a - 1))
            return !0;
          if (_ > 0) {
            const g = a + _;
            if (this._ModifiedIsBoundary(g - 1) || this._ModifiedIsBoundary(g))
              return !0;
          }
          return !1;
        }
        _boundaryScore(a, _, g, m) {
          const i = this._OriginalRegionIsBoundary(a, _) ? 1 : 0,
            s = this._ModifiedRegionIsBoundary(g, m) ? 1 : 0;
          return i + s;
        }
        ConcatenateChanges(a, _) {
          let g = [];
          if (a.length === 0 || _.length === 0) return _.length > 0 ? _ : a;
          if (this.ChangesOverlap(a[a.length - 1], _[0], g)) {
            const m = new Array(a.length + _.length - 1);
            return (
              u.Copy(a, 0, m, 0, a.length - 1),
              (m[a.length - 1] = g[0]),
              u.Copy(_, 1, m, a.length, _.length - 1),
              m
            );
          } else {
            const m = new Array(a.length + _.length);
            return (
              u.Copy(a, 0, m, 0, a.length),
              u.Copy(_, 0, m, a.length, _.length),
              m
            );
          }
        }
        ChangesOverlap(a, _, g) {
          if (
            (h.Assert(
              a.originalStart <= _.originalStart,
              "Left change is not less than or equal to right change"
            ),
            h.Assert(
              a.modifiedStart <= _.modifiedStart,
              "Left change is not less than or equal to right change"
            ),
            a.originalStart + a.originalLength >= _.originalStart ||
              a.modifiedStart + a.modifiedLength >= _.modifiedStart)
          ) {
            const m = a.originalStart;
            let i = a.originalLength;
            const s = a.modifiedStart;
            let d = a.modifiedLength;
            return (
              a.originalStart + a.originalLength >= _.originalStart &&
                (i = _.originalStart + _.originalLength - a.originalStart),
              a.modifiedStart + a.modifiedLength >= _.modifiedStart &&
                (d = _.modifiedStart + _.modifiedLength - a.modifiedStart),
              (g[0] = new E.DiffChange(m, i, s, d)),
              !0
            );
          } else return (g[0] = null), !1;
        }
        ClipDiagonalBound(a, _, g, m) {
          if (a >= 0 && a < m) return a;
          const i = g,
            s = m - g - 1,
            d = _ % 2 == 0;
          if (a < 0) {
            const S = i % 2 == 0;
            return d === S ? 0 : 1;
          } else {
            const S = s % 2 == 0;
            return d === S ? m - 1 : m - 2;
          }
        }
      }
      t.LcsDiff = f;
    }),
    z(G[11], Q([0, 1]), function(I, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.assertNever = t.withNullAsUndefined = t.createProxyObject = t.getAllMethodNames = t.getAllPropertyNames = t.validateConstraint = t.validateConstraints = t.isFunction = t.assertIsDefined = t.assertType = t.isUndefinedOrNull = t.isUndefined = t.isBoolean = t.isNumber = t.isObject = t.isString = t.isArray = void 0);
      function E(n) {
        return Array.isArray(n);
      }
      t.isArray = E;
      function M(n) {
        return typeof n == "string";
      }
      t.isString = M;
      function p(n) {
        return (
          typeof n == "object" &&
          n !== null &&
          !Array.isArray(n) &&
          !(n instanceof RegExp) &&
          !(n instanceof Date)
        );
      }
      t.isObject = p;
      function o(n) {
        return typeof n == "number" && !isNaN(n);
      }
      t.isNumber = o;
      function h(n) {
        return n === !0 || n === !1;
      }
      t.isBoolean = h;
      function u(n) {
        return typeof n == "undefined";
      }
      t.isUndefined = u;
      function l(n) {
        return u(n) || n === null;
      }
      t.isUndefinedOrNull = l;
      function f(n, r) {
        if (!n)
          throw new Error(
            r ? `Unexpected type, expected '${r}'` : "Unexpected type"
          );
      }
      t.assertType = f;
      function L(n) {
        if (l(n))
          throw new Error("Assertion Failed: argument is undefined or null");
        return n;
      }
      t.assertIsDefined = L;
      function a(n) {
        return typeof n == "function";
      }
      t.isFunction = a;
      function _(n, r) {
        const c = Math.min(n.length, r.length);
        for (let C = 0; C < c; C++) g(n[C], r[C]);
      }
      t.validateConstraints = _;
      function g(n, r) {
        if (M(r)) {
          if (typeof n !== r)
            throw new Error(`argument does not match constraint: typeof ${r}`);
        } else if (a(r)) {
          try {
            if (n instanceof r) return;
          } catch (c) {}
          if (
            (!l(n) && n.constructor === r) ||
            (r.length === 1 && r.call(void 0, n) === !0)
          )
            return;
          throw new Error(
            "argument does not match one of these constraints: arg instanceof constraint, arg.constructor === constraint, nor constraint(arg) === true"
          );
        }
      }
      t.validateConstraint = g;
      function m(n) {
        let r = [],
          c = Object.getPrototypeOf(n);
        for (; Object.prototype !== c; )
          (r = r.concat(Object.getOwnPropertyNames(c))),
            (c = Object.getPrototypeOf(c));
        return r;
      }
      t.getAllPropertyNames = m;
      function i(n) {
        const r = [];
        for (const c of m(n)) typeof n[c] == "function" && r.push(c);
        return r;
      }
      t.getAllMethodNames = i;
      function s(n, r) {
        const c = b =>
          function() {
            const v = Array.prototype.slice.call(arguments, 0);
            return r(b, v);
          };
        let C = {};
        for (const b of n) C[b] = c(b);
        return C;
      }
      t.createProxyObject = s;
      function d(n) {
        return n === null ? void 0 : n;
      }
      t.withNullAsUndefined = d;
      function S(n) {
        throw new Error("Unreachable");
      }
      t.assertNever = S;
    }),
    z(G[12], Q([0, 1]), function(I, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.toUint32 = t.toUint8 = void 0);
      function E(p) {
        return p < 0 ? 0 : p > 255 ? 255 : p | 0;
      }
      t.toUint8 = E;
      function M(p) {
        return p < 0 ? 0 : p > 4294967295 ? 4294967295 : p | 0;
      }
      t.toUint32 = M;
    }),
    z(G[13], Q([0, 1, 2, 19]), function(I, t, E, M) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.uriToFsPath = t.URI = void 0);
      const p = /^\w[\w\d+.-]*$/,
        o = /^\//,
        h = /^\/\//;
      function u(v, w) {
        if (!v.scheme && w)
          throw new Error(
            `[UriError]: Scheme is missing: {scheme: "", authority: "${v.authority}", path: "${v.path}", query: "${v.query}", fragment: "${v.fragment}"}`
          );
        if (v.scheme && !p.test(v.scheme))
          throw new Error("[UriError]: Scheme contains illegal characters.");
        if (v.path) {
          if (v.authority) {
            if (!o.test(v.path))
              throw new Error(
                '[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character'
              );
          } else if (h.test(v.path))
            throw new Error(
              '[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")'
            );
        }
      }
      function l(v, w) {
        return !v && !w ? "file" : v;
      }
      function f(v, w) {
        switch (v) {
          case "https":
          case "http":
          case "file":
            w ? w[0] !== a && (w = a + w) : (w = a);
            break;
        }
        return w;
      }
      const L = "",
        a = "/",
        _ = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
      class g {
        constructor(w, N, y, P, U, R = !1) {
          typeof w == "object"
            ? ((this.scheme = w.scheme || L),
              (this.authority = w.authority || L),
              (this.path = w.path || L),
              (this.query = w.query || L),
              (this.fragment = w.fragment || L))
            : ((this.scheme = l(w, R)),
              (this.authority = N || L),
              (this.path = f(this.scheme, y || L)),
              (this.query = P || L),
              (this.fragment = U || L),
              u(this, R));
        }
        static isUri(w) {
          return w instanceof g
            ? !0
            : w
            ? typeof w.authority == "string" &&
              typeof w.fragment == "string" &&
              typeof w.path == "string" &&
              typeof w.query == "string" &&
              typeof w.scheme == "string" &&
              typeof w.fsPath == "string" &&
              typeof w.with == "function" &&
              typeof w.toString == "function"
            : !1;
        }
        get fsPath() {
          return n(this, !1);
        }
        with(w) {
          if (!w) return this;
          let { scheme: N, authority: y, path: P, query: U, fragment: R } = w;
          return (
            N === void 0 ? (N = this.scheme) : N === null && (N = L),
            y === void 0 ? (y = this.authority) : y === null && (y = L),
            P === void 0 ? (P = this.path) : P === null && (P = L),
            U === void 0 ? (U = this.query) : U === null && (U = L),
            R === void 0 ? (R = this.fragment) : R === null && (R = L),
            N === this.scheme &&
            y === this.authority &&
            P === this.path &&
            U === this.query &&
            R === this.fragment
              ? this
              : new i(N, y, P, U, R)
          );
        }
        static parse(w, N = !1) {
          const y = _.exec(w);
          return y
            ? new i(
                y[2] || L,
                b(y[4] || L),
                b(y[5] || L),
                b(y[7] || L),
                b(y[9] || L),
                N
              )
            : new i(L, L, L, L, L);
        }
        static file(w) {
          let N = L;
          if (
            (E.isWindows && (w = w.replace(/\\/g, a)), w[0] === a && w[1] === a)
          ) {
            const y = w.indexOf(a, 2);
            y === -1
              ? ((N = w.substring(2)), (w = a))
              : ((N = w.substring(2, y)), (w = w.substring(y) || a));
          }
          return new i("file", N, w, L, L);
        }
        static from(w) {
          const N = new i(w.scheme, w.authority, w.path, w.query, w.fragment);
          return u(N, !0), N;
        }
        static joinPath(w, ...N) {
          if (!w.path)
            throw new Error(
              "[UriError]: cannot call joinPath on URI without path"
            );
          let y;
          return (
            E.isWindows && w.scheme === "file"
              ? (y = g.file(M.win32.join(n(w, !0), ...N)).path)
              : (y = M.posix.join(w.path, ...N)),
            w.with({ path: y })
          );
        }
        toString(w = !1) {
          return r(this, w);
        }
        toJSON() {
          return this;
        }
        static revive(w) {
          if (w) {
            if (w instanceof g) return w;
            {
              const N = new i(w);
              return (
                (N._formatted = w.external),
                (N._fsPath = w._sep === m ? w.fsPath : null),
                N
              );
            }
          } else return w;
        }
      }
      t.URI = g;
      const m = E.isWindows ? 1 : void 0;
      class i extends g {
        constructor() {
          super(...arguments);
          (this._formatted = null), (this._fsPath = null);
        }
        get fsPath() {
          return this._fsPath || (this._fsPath = n(this, !1)), this._fsPath;
        }
        toString(w = !1) {
          return w
            ? r(this, !0)
            : (this._formatted || (this._formatted = r(this, !1)),
              this._formatted);
        }
        toJSON() {
          const w = { $mid: 1 };
          return (
            this._fsPath && ((w.fsPath = this._fsPath), (w._sep = m)),
            this._formatted && (w.external = this._formatted),
            this.path && (w.path = this.path),
            this.scheme && (w.scheme = this.scheme),
            this.authority && (w.authority = this.authority),
            this.query && (w.query = this.query),
            this.fragment && (w.fragment = this.fragment),
            w
          );
        }
      }
      const s = {
        [58]: "%3A",
        [47]: "%2F",
        [63]: "%3F",
        [35]: "%23",
        [91]: "%5B",
        [93]: "%5D",
        [64]: "%40",
        [33]: "%21",
        [36]: "%24",
        [38]: "%26",
        [39]: "%27",
        [40]: "%28",
        [41]: "%29",
        [42]: "%2A",
        [43]: "%2B",
        [44]: "%2C",
        [59]: "%3B",
        [61]: "%3D",
        [32]: "%20"
      };
      function d(v, w) {
        let N,
          y = -1;
        for (let P = 0; P < v.length; P++) {
          const U = v.charCodeAt(P);
          if (
            (U >= 97 && U <= 122) ||
            (U >= 65 && U <= 90) ||
            (U >= 48 && U <= 57) ||
            U === 45 ||
            U === 46 ||
            U === 95 ||
            U === 126 ||
            (w && U === 47)
          )
            y !== -1 &&
              ((N += encodeURIComponent(v.substring(y, P))), (y = -1)),
              N !== void 0 && (N += v.charAt(P));
          else {
            N === void 0 && (N = v.substr(0, P));
            const R = s[U];
            R !== void 0
              ? (y !== -1 &&
                  ((N += encodeURIComponent(v.substring(y, P))), (y = -1)),
                (N += R))
              : y === -1 && (y = P);
          }
        }
        return (
          y !== -1 && (N += encodeURIComponent(v.substring(y))),
          N !== void 0 ? N : v
        );
      }
      function S(v) {
        let w;
        for (let N = 0; N < v.length; N++) {
          const y = v.charCodeAt(N);
          y === 35 || y === 63
            ? (w === void 0 && (w = v.substr(0, N)), (w += s[y]))
            : w !== void 0 && (w += v[N]);
        }
        return w !== void 0 ? w : v;
      }
      function n(v, w) {
        let N;
        return (
          v.authority && v.path.length > 1 && v.scheme === "file"
            ? (N = `//${v.authority}${v.path}`)
            : v.path.charCodeAt(0) === 47 &&
              ((v.path.charCodeAt(1) >= 65 && v.path.charCodeAt(1) <= 90) ||
                (v.path.charCodeAt(1) >= 97 && v.path.charCodeAt(1) <= 122)) &&
              v.path.charCodeAt(2) === 58
            ? w
              ? (N = v.path.substr(1))
              : (N = v.path[1].toLowerCase() + v.path.substr(2))
            : (N = v.path),
          E.isWindows && (N = N.replace(/\//g, "\\")),
          N
        );
      }
      t.uriToFsPath = n;
      function r(v, w) {
        const N = w ? S : d;
        let y = "",
          { scheme: P, authority: U, path: R, query: q, fragment: Y } = v;
        if (
          (P && ((y += P), (y += ":")),
          (U || P === "file") && ((y += a), (y += a)),
          U)
        ) {
          let j = U.indexOf("@");
          if (j !== -1) {
            const T = U.substr(0, j);
            (U = U.substr(j + 1)),
              (j = T.indexOf(":")),
              j === -1
                ? (y += N(T, !1))
                : ((y += N(T.substr(0, j), !1)),
                  (y += ":"),
                  (y += N(T.substr(j + 1), !1))),
              (y += "@");
          }
          (U = U.toLowerCase()),
            (j = U.indexOf(":")),
            j === -1
              ? (y += N(U, !1))
              : ((y += N(U.substr(0, j), !1)), (y += U.substr(j)));
        }
        if (R) {
          if (
            R.length >= 3 &&
            R.charCodeAt(0) === 47 &&
            R.charCodeAt(2) === 58
          ) {
            const j = R.charCodeAt(1);
            j >= 65 &&
              j <= 90 &&
              (R = `/${String.fromCharCode(j + 32)}:${R.substr(3)}`);
          } else if (R.length >= 2 && R.charCodeAt(1) === 58) {
            const j = R.charCodeAt(0);
            j >= 65 &&
              j <= 90 &&
              (R = `${String.fromCharCode(j + 32)}:${R.substr(2)}`);
          }
          y += N(R, !0);
        }
        return (
          q && ((y += "?"), (y += N(q, !1))),
          Y && ((y += "#"), (y += w ? Y : d(Y, !1))),
          y
        );
      }
      function c(v) {
        try {
          return decodeURIComponent(v);
        } catch (w) {
          return v.length > 3 ? v.substr(0, 3) + c(v.substr(3)) : v;
        }
      }
      const C = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
      function b(v) {
        return v.match(C) ? v.replace(C, w => c(w)) : v;
      }
    }),
    z(G[33], Q([0, 1, 4, 7, 2, 11]), function(I, t, E, M, p, o) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.create = t.SimpleWorkerServer = t.SimpleWorkerClient = t.logOnceWebWorkerWarning = void 0);
      const h = "$initialize";
      let u = !1;
      function l(g) {
        !p.isWeb ||
          (u ||
            ((u = !0),
            console.warn(
              "Could not create web worker(s). Falling back to loading web worker code in main thread, which might cause UI freezes. Please see https://github.com/microsoft/monaco-editor#faq"
            )),
          console.warn(g.message));
      }
      t.logOnceWebWorkerWarning = l;
      class f {
        constructor(m) {
          (this._workerId = -1),
            (this._handler = m),
            (this._lastSentReq = 0),
            (this._pendingReplies = Object.create(null));
        }
        setWorkerId(m) {
          this._workerId = m;
        }
        sendMessage(m, i) {
          let s = String(++this._lastSentReq);
          return new Promise((d, S) => {
            (this._pendingReplies[s] = { resolve: d, reject: S }),
              this._send({
                vsWorker: this._workerId,
                req: s,
                method: m,
                args: i
              });
          });
        }
        handleMessage(m) {
          !m ||
            !m.vsWorker ||
            (this._workerId !== -1 && m.vsWorker !== this._workerId) ||
            this._handleMessage(m);
        }
        _handleMessage(m) {
          if (m.seq) {
            let S = m;
            if (!this._pendingReplies[S.seq]) {
              console.warn("Got reply to unknown seq");
              return;
            }
            let n = this._pendingReplies[S.seq];
            if ((delete this._pendingReplies[S.seq], S.err)) {
              let r = S.err;
              S.err.$isError &&
                ((r = new Error()),
                (r.name = S.err.name),
                (r.message = S.err.message),
                (r.stack = S.err.stack)),
                n.reject(r);
              return;
            }
            n.resolve(S.res);
            return;
          }
          let i = m,
            s = i.req;
          this._handler.handleMessage(i.method, i.args).then(
            S => {
              this._send({
                vsWorker: this._workerId,
                seq: s,
                res: S,
                err: void 0
              });
            },
            S => {
              S.detail instanceof Error &&
                (S.detail = E.transformErrorForSerialization(S.detail)),
                this._send({
                  vsWorker: this._workerId,
                  seq: s,
                  res: void 0,
                  err: E.transformErrorForSerialization(S)
                });
            }
          );
        }
        _send(m) {
          let i = [];
          if (m.req) {
            const s = m;
            for (let d = 0; d < s.args.length; d++)
              s.args[d] instanceof ArrayBuffer && i.push(s.args[d]);
          } else {
            const s = m;
            s.res instanceof ArrayBuffer && i.push(s.res);
          }
          this._handler.sendMessage(m, i);
        }
      }
      class L extends M.Disposable {
        constructor(m, i, s) {
          super();
          let d = null;
          (this._worker = this._register(
            m.create(
              "vs/base/common/worker/simpleWorker",
              c => {
                this._protocol.handleMessage(c);
              },
              c => {
                d && d(c);
              }
            )
          )),
            (this._protocol = new f({
              sendMessage: (c, C) => {
                this._worker.postMessage(c, C);
              },
              handleMessage: (c, C) => {
                if (typeof s[c] != "function")
                  return Promise.reject(
                    new Error("Missing method " + c + " on main thread host.")
                  );
                try {
                  return Promise.resolve(s[c].apply(s, C));
                } catch (b) {
                  return Promise.reject(b);
                }
              }
            })),
            this._protocol.setWorkerId(this._worker.getId());
          let S = null;
          typeof self.require != "undefined" &&
          typeof self.require.getConfig == "function"
            ? (S = self.require.getConfig())
            : typeof self.requirejs != "undefined" &&
              (S = self.requirejs.s.contexts._.config);
          const n = o.getAllMethodNames(s);
          this._onModuleLoaded = this._protocol.sendMessage(h, [
            this._worker.getId(),
            JSON.parse(JSON.stringify(S)),
            i,
            n
          ]);
          const r = (c, C) => this._request(c, C);
          this._lazyProxy = new Promise((c, C) => {
            (d = C),
              this._onModuleLoaded.then(
                b => {
                  c(o.createProxyObject(b, r));
                },
                b => {
                  C(b), this._onError("Worker failed to load " + i, b);
                }
              );
          });
        }
        getProxyObject() {
          return this._lazyProxy;
        }
        _request(m, i) {
          return new Promise((s, d) => {
            this._onModuleLoaded.then(() => {
              this._protocol.sendMessage(m, i).then(s, d);
            }, d);
          });
        }
        _onError(m, i) {
          console.error(m), console.info(i);
        }
      }
      t.SimpleWorkerClient = L;
      class a {
        constructor(m, i) {
          (this._requestHandlerFactory = i),
            (this._requestHandler = null),
            (this._protocol = new f({
              sendMessage: (s, d) => {
                m(s, d);
              },
              handleMessage: (s, d) => this._handleMessage(s, d)
            }));
        }
        onmessage(m) {
          this._protocol.handleMessage(m);
        }
        _handleMessage(m, i) {
          if (m === h) return this.initialize(i[0], i[1], i[2], i[3]);
          if (
            !this._requestHandler ||
            typeof this._requestHandler[m] != "function"
          )
            return Promise.reject(
              new Error("Missing requestHandler or method: " + m)
            );
          try {
            return Promise.resolve(
              this._requestHandler[m].apply(this._requestHandler, i)
            );
          } catch (s) {
            return Promise.reject(s);
          }
        }
        initialize(m, i, s, d) {
          this._protocol.setWorkerId(m);
          const S = (r, c) => this._protocol.sendMessage(r, c),
            n = o.createProxyObject(d, S);
          return this._requestHandlerFactory
            ? ((this._requestHandler = this._requestHandlerFactory(n)),
              Promise.resolve(o.getAllMethodNames(this._requestHandler)))
            : (i &&
                (typeof i.baseUrl != "undefined" && delete i.baseUrl,
                typeof i.paths != "undefined" &&
                  typeof i.paths.vs != "undefined" &&
                  delete i.paths.vs,
                typeof i.trustedTypesPolicy !== void 0 &&
                  delete i.trustedTypesPolicy,
                (i.catchError = !0),
                self.require.config(i)),
              new Promise((r, c) => {
                self.require(
                  [s],
                  C => {
                    if (
                      ((this._requestHandler = C.create(n)),
                      !this._requestHandler)
                    ) {
                      c(new Error("No RequestHandler!"));
                      return;
                    }
                    r(o.getAllMethodNames(this._requestHandler));
                  },
                  c
                );
              }));
        }
      }
      t.SimpleWorkerServer = a;
      function _(g) {
        return new a(g, null);
      }
      t.create = _;
    }),
    z(G[22], Q([0, 1, 12]), function(I, t, E) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.CharacterSet = t.CharacterClassifier = void 0);
      class M {
        constructor(h) {
          let u = E.toUint8(h);
          (this._defaultValue = u),
            (this._asciiMap = M._createAsciiMap(u)),
            (this._map = new Map());
        }
        static _createAsciiMap(h) {
          let u = new Uint8Array(256);
          for (let l = 0; l < 256; l++) u[l] = h;
          return u;
        }
        set(h, u) {
          let l = E.toUint8(u);
          h >= 0 && h < 256 ? (this._asciiMap[h] = l) : this._map.set(h, l);
        }
        get(h) {
          return h >= 0 && h < 256
            ? this._asciiMap[h]
            : this._map.get(h) || this._defaultValue;
        }
      }
      t.CharacterClassifier = M;
      class p {
        constructor() {
          this._actual = new M(0);
        }
        add(h) {
          this._actual.set(h, 1);
        }
        has(h) {
          return this._actual.get(h) === 1;
        }
      }
      t.CharacterSet = p;
    }),
    z(G[3], Q([0, 1]), function(I, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Position = void 0);
      class E {
        constructor(p, o) {
          (this.lineNumber = p), (this.column = o);
        }
        with(p = this.lineNumber, o = this.column) {
          return p === this.lineNumber && o === this.column
            ? this
            : new E(p, o);
        }
        delta(p = 0, o = 0) {
          return this.with(this.lineNumber + p, this.column + o);
        }
        equals(p) {
          return E.equals(this, p);
        }
        static equals(p, o) {
          return !p && !o
            ? !0
            : !!p &&
                !!o &&
                p.lineNumber === o.lineNumber &&
                p.column === o.column;
        }
        isBefore(p) {
          return E.isBefore(this, p);
        }
        static isBefore(p, o) {
          return p.lineNumber < o.lineNumber
            ? !0
            : o.lineNumber < p.lineNumber
            ? !1
            : p.column < o.column;
        }
        isBeforeOrEqual(p) {
          return E.isBeforeOrEqual(this, p);
        }
        static isBeforeOrEqual(p, o) {
          return p.lineNumber < o.lineNumber
            ? !0
            : o.lineNumber < p.lineNumber
            ? !1
            : p.column <= o.column;
        }
        static compare(p, o) {
          let h = p.lineNumber | 0,
            u = o.lineNumber | 0;
          if (h === u) {
            let l = p.column | 0,
              f = o.column | 0;
            return l - f;
          }
          return h - u;
        }
        clone() {
          return new E(this.lineNumber, this.column);
        }
        toString() {
          return "(" + this.lineNumber + "," + this.column + ")";
        }
        static lift(p) {
          return new E(p.lineNumber, p.column);
        }
        static isIPosition(p) {
          return (
            p && typeof p.lineNumber == "number" && typeof p.column == "number"
          );
        }
      }
      t.Position = E;
    }),
    z(G[6], Q([0, 1, 3]), function(I, t, E) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }), (t.Range = void 0);
      class M {
        constructor(o, h, u, l) {
          o > u || (o === u && h > l)
            ? ((this.startLineNumber = u),
              (this.startColumn = l),
              (this.endLineNumber = o),
              (this.endColumn = h))
            : ((this.startLineNumber = o),
              (this.startColumn = h),
              (this.endLineNumber = u),
              (this.endColumn = l));
        }
        isEmpty() {
          return M.isEmpty(this);
        }
        static isEmpty(o) {
          return (
            o.startLineNumber === o.endLineNumber &&
            o.startColumn === o.endColumn
          );
        }
        containsPosition(o) {
          return M.containsPosition(this, o);
        }
        static containsPosition(o, h) {
          return !(
            h.lineNumber < o.startLineNumber ||
            h.lineNumber > o.endLineNumber ||
            (h.lineNumber === o.startLineNumber && h.column < o.startColumn) ||
            (h.lineNumber === o.endLineNumber && h.column > o.endColumn)
          );
        }
        containsRange(o) {
          return M.containsRange(this, o);
        }
        static containsRange(o, h) {
          return !(
            h.startLineNumber < o.startLineNumber ||
            h.endLineNumber < o.startLineNumber ||
            h.startLineNumber > o.endLineNumber ||
            h.endLineNumber > o.endLineNumber ||
            (h.startLineNumber === o.startLineNumber &&
              h.startColumn < o.startColumn) ||
            (h.endLineNumber === o.endLineNumber && h.endColumn > o.endColumn)
          );
        }
        strictContainsRange(o) {
          return M.strictContainsRange(this, o);
        }
        static strictContainsRange(o, h) {
          return !(
            h.startLineNumber < o.startLineNumber ||
            h.endLineNumber < o.startLineNumber ||
            h.startLineNumber > o.endLineNumber ||
            h.endLineNumber > o.endLineNumber ||
            (h.startLineNumber === o.startLineNumber &&
              h.startColumn <= o.startColumn) ||
            (h.endLineNumber === o.endLineNumber && h.endColumn >= o.endColumn)
          );
        }
        plusRange(o) {
          return M.plusRange(this, o);
        }
        static plusRange(o, h) {
          let u, l, f, L;
          return (
            h.startLineNumber < o.startLineNumber
              ? ((u = h.startLineNumber), (l = h.startColumn))
              : h.startLineNumber === o.startLineNumber
              ? ((u = h.startLineNumber),
                (l = Math.min(h.startColumn, o.startColumn)))
              : ((u = o.startLineNumber), (l = o.startColumn)),
            h.endLineNumber > o.endLineNumber
              ? ((f = h.endLineNumber), (L = h.endColumn))
              : h.endLineNumber === o.endLineNumber
              ? ((f = h.endLineNumber),
                (L = Math.max(h.endColumn, o.endColumn)))
              : ((f = o.endLineNumber), (L = o.endColumn)),
            new M(u, l, f, L)
          );
        }
        intersectRanges(o) {
          return M.intersectRanges(this, o);
        }
        static intersectRanges(o, h) {
          let u = o.startLineNumber,
            l = o.startColumn,
            f = o.endLineNumber,
            L = o.endColumn,
            a = h.startLineNumber,
            _ = h.startColumn,
            g = h.endLineNumber,
            m = h.endColumn;
          return (
            u < a ? ((u = a), (l = _)) : u === a && (l = Math.max(l, _)),
            f > g ? ((f = g), (L = m)) : f === g && (L = Math.min(L, m)),
            u > f || (u === f && l > L) ? null : new M(u, l, f, L)
          );
        }
        equalsRange(o) {
          return M.equalsRange(this, o);
        }
        static equalsRange(o, h) {
          return (
            !!o &&
            !!h &&
            o.startLineNumber === h.startLineNumber &&
            o.startColumn === h.startColumn &&
            o.endLineNumber === h.endLineNumber &&
            o.endColumn === h.endColumn
          );
        }
        getEndPosition() {
          return M.getEndPosition(this);
        }
        static getEndPosition(o) {
          return new E.Position(o.endLineNumber, o.endColumn);
        }
        getStartPosition() {
          return M.getStartPosition(this);
        }
        static getStartPosition(o) {
          return new E.Position(o.startLineNumber, o.startColumn);
        }
        toString() {
          return (
            "[" +
            this.startLineNumber +
            "," +
            this.startColumn +
            " -> " +
            this.endLineNumber +
            "," +
            this.endColumn +
            "]"
          );
        }
        setEndPosition(o, h) {
          return new M(this.startLineNumber, this.startColumn, o, h);
        }
        setStartPosition(o, h) {
          return new M(o, h, this.endLineNumber, this.endColumn);
        }
        collapseToStart() {
          return M.collapseToStart(this);
        }
        static collapseToStart(o) {
          return new M(
            o.startLineNumber,
            o.startColumn,
            o.startLineNumber,
            o.startColumn
          );
        }
        static fromPositions(o, h = o) {
          return new M(o.lineNumber, o.column, h.lineNumber, h.column);
        }
        static lift(o) {
          return o
            ? new M(
                o.startLineNumber,
                o.startColumn,
                o.endLineNumber,
                o.endColumn
              )
            : null;
        }
        static isIRange(o) {
          return (
            o &&
            typeof o.startLineNumber == "number" &&
            typeof o.startColumn == "number" &&
            typeof o.endLineNumber == "number" &&
            typeof o.endColumn == "number"
          );
        }
        static areIntersectingOrTouching(o, h) {
          return !(
            o.endLineNumber < h.startLineNumber ||
            (o.endLineNumber === h.startLineNumber &&
              o.endColumn < h.startColumn) ||
            h.endLineNumber < o.startLineNumber ||
            (h.endLineNumber === o.startLineNumber &&
              h.endColumn < o.startColumn)
          );
        }
        static areIntersecting(o, h) {
          return !(
            o.endLineNumber < h.startLineNumber ||
            (o.endLineNumber === h.startLineNumber &&
              o.endColumn <= h.startColumn) ||
            h.endLineNumber < o.startLineNumber ||
            (h.endLineNumber === o.startLineNumber &&
              h.endColumn <= o.startColumn)
          );
        }
        static compareRangesUsingStarts(o, h) {
          if (o && h) {
            const f = o.startLineNumber | 0,
              L = h.startLineNumber | 0;
            if (f === L) {
              const a = o.startColumn | 0,
                _ = h.startColumn | 0;
              if (a === _) {
                const g = o.endLineNumber | 0,
                  m = h.endLineNumber | 0;
                if (g === m) {
                  const i = o.endColumn | 0,
                    s = h.endColumn | 0;
                  return i - s;
                }
                return g - m;
              }
              return a - _;
            }
            return f - L;
          }
          return (o ? 1 : 0) - (h ? 1 : 0);
        }
        static compareRangesUsingEnds(o, h) {
          return o.endLineNumber === h.endLineNumber
            ? o.endColumn === h.endColumn
              ? o.startLineNumber === h.startLineNumber
                ? o.startColumn - h.startColumn
                : o.startLineNumber - h.startLineNumber
              : o.endColumn - h.endColumn
            : o.endLineNumber - h.endLineNumber;
        }
        static spansMultipleLines(o) {
          return o.endLineNumber > o.startLineNumber;
        }
      }
      t.Range = M;
    }),
    z(G[23], Q([0, 1, 3, 6]), function(I, t, E, M) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.Selection = void 0);
      class p extends M.Range {
        constructor(h, u, l, f) {
          super(h, u, l, f);
          (this.selectionStartLineNumber = h),
            (this.selectionStartColumn = u),
            (this.positionLineNumber = l),
            (this.positionColumn = f);
        }
        toString() {
          return (
            "[" +
            this.selectionStartLineNumber +
            "," +
            this.selectionStartColumn +
            " -> " +
            this.positionLineNumber +
            "," +
            this.positionColumn +
            "]"
          );
        }
        equalsSelection(h) {
          return p.selectionsEqual(this, h);
        }
        static selectionsEqual(h, u) {
          return (
            h.selectionStartLineNumber === u.selectionStartLineNumber &&
            h.selectionStartColumn === u.selectionStartColumn &&
            h.positionLineNumber === u.positionLineNumber &&
            h.positionColumn === u.positionColumn
          );
        }
        getDirection() {
          return this.selectionStartLineNumber === this.startLineNumber &&
            this.selectionStartColumn === this.startColumn
            ? 0
            : 1;
        }
        setEndPosition(h, u) {
          return this.getDirection() === 0
            ? new p(this.startLineNumber, this.startColumn, h, u)
            : new p(h, u, this.startLineNumber, this.startColumn);
        }
        getPosition() {
          return new E.Position(this.positionLineNumber, this.positionColumn);
        }
        setStartPosition(h, u) {
          return this.getDirection() === 0
            ? new p(h, u, this.endLineNumber, this.endColumn)
            : new p(this.endLineNumber, this.endColumn, h, u);
        }
        static fromPositions(h, u = h) {
          return new p(h.lineNumber, h.column, u.lineNumber, u.column);
        }
        static liftSelection(h) {
          return new p(
            h.selectionStartLineNumber,
            h.selectionStartColumn,
            h.positionLineNumber,
            h.positionColumn
          );
        }
        static selectionsArrEqual(h, u) {
          if ((h && !u) || (!h && u)) return !1;
          if (!h && !u) return !0;
          if (h.length !== u.length) return !1;
          for (let l = 0, f = h.length; l < f; l++)
            if (!this.selectionsEqual(h[l], u[l])) return !1;
          return !0;
        }
        static isISelection(h) {
          return (
            h &&
            typeof h.selectionStartLineNumber == "number" &&
            typeof h.selectionStartColumn == "number" &&
            typeof h.positionLineNumber == "number" &&
            typeof h.positionColumn == "number"
          );
        }
        static createWithDirection(h, u, l, f, L) {
          return L === 0 ? new p(h, u, l, f) : new p(l, f, h, u);
        }
      }
      t.Selection = p;
    }),
    z(G[24], Q([0, 1]), function(I, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.TokenizationResult2 = t.TokenizationResult = t.Token = void 0);
      class E {
        constructor(h, u, l) {
          (this.offset = h | 0), (this.type = u), (this.language = l);
        }
        toString() {
          return "(" + this.offset + ", " + this.type + ")";
        }
      }
      t.Token = E;
      class M {
        constructor(h, u) {
          (this.tokens = h), (this.endState = u);
        }
      }
      t.TokenizationResult = M;
      class p {
        constructor(h, u) {
          (this.tokens = h), (this.endState = u);
        }
      }
      t.TokenizationResult2 = p;
    }),
    z(G[25], Q([0, 1, 10, 5]), function(I, t, E, M) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.DiffComputer = void 0);
      const p = 3;
      function o(i, s, d, S) {
        return new E.LcsDiff(i, s, d).ComputeDiff(S);
      }
      class h {
        constructor(s) {
          const d = [],
            S = [];
          for (let n = 0, r = s.length; n < r; n++)
            (d[n] = _(s[n], 1)), (S[n] = g(s[n], 1));
          (this.lines = s), (this._startColumns = d), (this._endColumns = S);
        }
        getElements() {
          const s = [];
          for (let d = 0, S = this.lines.length; d < S; d++)
            s[d] = this.lines[d].substring(
              this._startColumns[d] - 1,
              this._endColumns[d] - 1
            );
          return s;
        }
        getStartLineNumber(s) {
          return s + 1;
        }
        getEndLineNumber(s) {
          return s + 1;
        }
        createCharSequence(s, d, S) {
          const n = [],
            r = [],
            c = [];
          let C = 0;
          for (let b = d; b <= S; b++) {
            const v = this.lines[b],
              w = s ? this._startColumns[b] : 1,
              N = s ? this._endColumns[b] : v.length + 1;
            for (let y = w; y < N; y++)
              (n[C] = v.charCodeAt(y - 1)), (r[C] = b + 1), (c[C] = y), C++;
          }
          return new u(n, r, c);
        }
      }
      class u {
        constructor(s, d, S) {
          (this._charCodes = s), (this._lineNumbers = d), (this._columns = S);
        }
        getElements() {
          return this._charCodes;
        }
        getStartLineNumber(s) {
          return this._lineNumbers[s];
        }
        getStartColumn(s) {
          return this._columns[s];
        }
        getEndLineNumber(s) {
          return this._lineNumbers[s];
        }
        getEndColumn(s) {
          return this._columns[s] + 1;
        }
      }
      class l {
        constructor(s, d, S, n, r, c, C, b) {
          (this.originalStartLineNumber = s),
            (this.originalStartColumn = d),
            (this.originalEndLineNumber = S),
            (this.originalEndColumn = n),
            (this.modifiedStartLineNumber = r),
            (this.modifiedStartColumn = c),
            (this.modifiedEndLineNumber = C),
            (this.modifiedEndColumn = b);
        }
        static createFromDiffChange(s, d, S) {
          let n, r, c, C, b, v, w, N;
          return (
            s.originalLength === 0
              ? ((n = 0), (r = 0), (c = 0), (C = 0))
              : ((n = d.getStartLineNumber(s.originalStart)),
                (r = d.getStartColumn(s.originalStart)),
                (c = d.getEndLineNumber(
                  s.originalStart + s.originalLength - 1
                )),
                (C = d.getEndColumn(s.originalStart + s.originalLength - 1))),
            s.modifiedLength === 0
              ? ((b = 0), (v = 0), (w = 0), (N = 0))
              : ((b = S.getStartLineNumber(s.modifiedStart)),
                (v = S.getStartColumn(s.modifiedStart)),
                (w = S.getEndLineNumber(
                  s.modifiedStart + s.modifiedLength - 1
                )),
                (N = S.getEndColumn(s.modifiedStart + s.modifiedLength - 1))),
            new l(n, r, c, C, b, v, w, N)
          );
        }
      }
      function f(i) {
        if (i.length <= 1) return i;
        const s = [i[0]];
        let d = s[0];
        for (let S = 1, n = i.length; S < n; S++) {
          const r = i[S],
            c = r.originalStart - (d.originalStart + d.originalLength),
            C = r.modifiedStart - (d.modifiedStart + d.modifiedLength);
          Math.min(c, C) < p
            ? ((d.originalLength =
                r.originalStart + r.originalLength - d.originalStart),
              (d.modifiedLength =
                r.modifiedStart + r.modifiedLength - d.modifiedStart))
            : (s.push(r), (d = r));
        }
        return s;
      }
      class L {
        constructor(s, d, S, n, r) {
          (this.originalStartLineNumber = s),
            (this.originalEndLineNumber = d),
            (this.modifiedStartLineNumber = S),
            (this.modifiedEndLineNumber = n),
            (this.charChanges = r);
        }
        static createFromDiffResult(s, d, S, n, r, c, C) {
          let b, v, w, N, y;
          if (
            (d.originalLength === 0
              ? ((b = S.getStartLineNumber(d.originalStart) - 1), (v = 0))
              : ((b = S.getStartLineNumber(d.originalStart)),
                (v = S.getEndLineNumber(
                  d.originalStart + d.originalLength - 1
                ))),
            d.modifiedLength === 0
              ? ((w = n.getStartLineNumber(d.modifiedStart) - 1), (N = 0))
              : ((w = n.getStartLineNumber(d.modifiedStart)),
                (N = n.getEndLineNumber(
                  d.modifiedStart + d.modifiedLength - 1
                ))),
            c &&
              d.originalLength > 0 &&
              d.originalLength < 20 &&
              d.modifiedLength > 0 &&
              d.modifiedLength < 20 &&
              r())
          ) {
            const P = S.createCharSequence(
                s,
                d.originalStart,
                d.originalStart + d.originalLength - 1
              ),
              U = n.createCharSequence(
                s,
                d.modifiedStart,
                d.modifiedStart + d.modifiedLength - 1
              );
            let R = o(P, U, r, !0).changes;
            C && (R = f(R)), (y = []);
            for (let q = 0, Y = R.length; q < Y; q++)
              y.push(l.createFromDiffChange(R[q], P, U));
          }
          return new L(b, v, w, N, y);
        }
      }
      class a {
        constructor(s, d, S) {
          (this.shouldComputeCharChanges = S.shouldComputeCharChanges),
            (this.shouldPostProcessCharChanges =
              S.shouldPostProcessCharChanges),
            (this.shouldIgnoreTrimWhitespace = S.shouldIgnoreTrimWhitespace),
            (this.shouldMakePrettyDiff = S.shouldMakePrettyDiff),
            (this.originalLines = s),
            (this.modifiedLines = d),
            (this.original = new h(s)),
            (this.modified = new h(d)),
            (this.continueLineDiff = m(S.maxComputationTime)),
            (this.continueCharDiff = m(
              S.maxComputationTime === 0
                ? 0
                : Math.min(S.maxComputationTime, 5e3)
            ));
        }
        computeDiff() {
          if (
            this.original.lines.length === 1 &&
            this.original.lines[0].length === 0
          )
            return this.modified.lines.length === 1 &&
              this.modified.lines[0].length === 0
              ? { quitEarly: !1, changes: [] }
              : {
                  quitEarly: !1,
                  changes: [
                    {
                      originalStartLineNumber: 1,
                      originalEndLineNumber: 1,
                      modifiedStartLineNumber: 1,
                      modifiedEndLineNumber: this.modified.lines.length,
                      charChanges: [
                        {
                          modifiedEndColumn: 0,
                          modifiedEndLineNumber: 0,
                          modifiedStartColumn: 0,
                          modifiedStartLineNumber: 0,
                          originalEndColumn: 0,
                          originalEndLineNumber: 0,
                          originalStartColumn: 0,
                          originalStartLineNumber: 0
                        }
                      ]
                    }
                  ]
                };
          if (
            this.modified.lines.length === 1 &&
            this.modified.lines[0].length === 0
          )
            return {
              quitEarly: !1,
              changes: [
                {
                  originalStartLineNumber: 1,
                  originalEndLineNumber: this.original.lines.length,
                  modifiedStartLineNumber: 1,
                  modifiedEndLineNumber: 1,
                  charChanges: [
                    {
                      modifiedEndColumn: 0,
                      modifiedEndLineNumber: 0,
                      modifiedStartColumn: 0,
                      modifiedStartLineNumber: 0,
                      originalEndColumn: 0,
                      originalEndLineNumber: 0,
                      originalStartColumn: 0,
                      originalStartLineNumber: 0
                    }
                  ]
                }
              ]
            };
          const s = o(
              this.original,
              this.modified,
              this.continueLineDiff,
              this.shouldMakePrettyDiff
            ),
            d = s.changes,
            S = s.quitEarly;
          if (this.shouldIgnoreTrimWhitespace) {
            const C = [];
            for (let b = 0, v = d.length; b < v; b++)
              C.push(
                L.createFromDiffResult(
                  this.shouldIgnoreTrimWhitespace,
                  d[b],
                  this.original,
                  this.modified,
                  this.continueCharDiff,
                  this.shouldComputeCharChanges,
                  this.shouldPostProcessCharChanges
                )
              );
            return { quitEarly: S, changes: C };
          }
          const n = [];
          let r = 0,
            c = 0;
          for (let C = -1, b = d.length; C < b; C++) {
            const v = C + 1 < b ? d[C + 1] : null,
              w = v ? v.originalStart : this.originalLines.length,
              N = v ? v.modifiedStart : this.modifiedLines.length;
            for (; r < w && c < N; ) {
              const y = this.originalLines[r],
                P = this.modifiedLines[c];
              if (y !== P) {
                {
                  let U = _(y, 1),
                    R = _(P, 1);
                  for (; U > 1 && R > 1; ) {
                    const q = y.charCodeAt(U - 2),
                      Y = P.charCodeAt(R - 2);
                    if (q !== Y) break;
                    U--, R--;
                  }
                  (U > 1 || R > 1) &&
                    this._pushTrimWhitespaceCharChange(
                      n,
                      r + 1,
                      1,
                      U,
                      c + 1,
                      1,
                      R
                    );
                }
                {
                  let U = g(y, 1),
                    R = g(P, 1);
                  const q = y.length + 1,
                    Y = P.length + 1;
                  for (; U < q && R < Y; ) {
                    const j = y.charCodeAt(U - 1),
                      T = y.charCodeAt(R - 1);
                    if (j !== T) break;
                    U++, R++;
                  }
                  (U < q || R < Y) &&
                    this._pushTrimWhitespaceCharChange(
                      n,
                      r + 1,
                      U,
                      q,
                      c + 1,
                      R,
                      Y
                    );
                }
              }
              r++, c++;
            }
            v &&
              (n.push(
                L.createFromDiffResult(
                  this.shouldIgnoreTrimWhitespace,
                  v,
                  this.original,
                  this.modified,
                  this.continueCharDiff,
                  this.shouldComputeCharChanges,
                  this.shouldPostProcessCharChanges
                )
              ),
              (r += v.originalLength),
              (c += v.modifiedLength));
          }
          return { quitEarly: S, changes: n };
        }
        _pushTrimWhitespaceCharChange(s, d, S, n, r, c, C) {
          if (this._mergeTrimWhitespaceCharChange(s, d, S, n, r, c, C)) return;
          let b;
          this.shouldComputeCharChanges &&
            (b = [new l(d, S, d, n, r, c, r, C)]),
            s.push(new L(d, d, r, r, b));
        }
        _mergeTrimWhitespaceCharChange(s, d, S, n, r, c, C) {
          const b = s.length;
          if (b === 0) return !1;
          const v = s[b - 1];
          return v.originalEndLineNumber === 0 || v.modifiedEndLineNumber === 0
            ? !1
            : v.originalEndLineNumber + 1 === d &&
              v.modifiedEndLineNumber + 1 === r
            ? ((v.originalEndLineNumber = d),
              (v.modifiedEndLineNumber = r),
              this.shouldComputeCharChanges &&
                v.charChanges &&
                v.charChanges.push(new l(d, S, d, n, r, c, r, C)),
              !0)
            : !1;
        }
      }
      t.DiffComputer = a;
      function _(i, s) {
        const d = M.firstNonWhitespaceIndex(i);
        return d === -1 ? s : d + 1;
      }
      function g(i, s) {
        const d = M.lastNonWhitespaceIndex(i);
        return d === -1 ? s : d + 2;
      }
      function m(i) {
        if (i === 0) return () => !0;
        const s = Date.now();
        return () => Date.now() - s < i;
      }
    }),
    z(G[26], Q([0, 1]), function(I, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.getWordAtText = t.ensureValidWordDefinition = t.DEFAULT_WORD_REGEXP = t.USUAL_WORD_SEPARATORS = void 0),
        (t.USUAL_WORD_SEPARATORS = "`~!@#$%^&*()-=+[{]}\\|;:'\",.<>/?");
      function E(u = "") {
        let l = "(-?\\d*\\.\\d\\w*)|([^";
        for (const f of t.USUAL_WORD_SEPARATORS)
          u.indexOf(f) >= 0 || (l += "\\" + f);
        return (l += "\\s]+)"), new RegExp(l, "g");
      }
      t.DEFAULT_WORD_REGEXP = E();
      function M(u) {
        let l = t.DEFAULT_WORD_REGEXP;
        if (u && u instanceof RegExp)
          if (u.global) l = u;
          else {
            let f = "g";
            u.ignoreCase && (f += "i"),
              u.multiline && (f += "m"),
              u.unicode && (f += "u"),
              (l = new RegExp(u.source, f));
          }
        return (l.lastIndex = 0), l;
      }
      t.ensureValidWordDefinition = M;
      const p = { maxLen: 1e3, windowSize: 15, timeBudget: 150 };
      function o(u, l, f, L, a = p) {
        if (f.length > a.maxLen) {
          let s = u - a.maxLen / 2;
          return (
            s < 0 ? (s = 0) : (L += s),
            (f = f.substring(s, u + a.maxLen / 2)),
            o(u, l, f, L, a)
          );
        }
        const _ = Date.now(),
          g = u - 1 - L;
        let m = -1,
          i = null;
        for (let s = 1; !(Date.now() - _ >= a.timeBudget); s++) {
          const d = g - a.windowSize * s;
          l.lastIndex = Math.max(0, d);
          const S = h(l, f, g, m);
          if ((!S && i) || ((i = S), d <= 0)) break;
          m = d;
        }
        if (i) {
          let s = {
            word: i[0],
            startColumn: L + 1 + i.index,
            endColumn: L + 1 + i.index + i[0].length
          };
          return (l.lastIndex = 0), s;
        }
        return null;
      }
      t.getWordAtText = o;
      function h(u, l, f, L) {
        let a;
        for (; (a = u.exec(l)); ) {
          const _ = a.index || 0;
          if (_ <= f && u.lastIndex >= f) return a;
          if (L > 0 && _ > L) return null;
        }
        return null;
      }
    }),
    z(G[27], Q([0, 1, 22]), function(I, t, E) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.computeLinks = t.LinkComputer = t.StateMachine = t.Uint8Matrix = void 0);
      class M {
        constructor(_, g, m) {
          const i = new Uint8Array(_ * g);
          for (let s = 0, d = _ * g; s < d; s++) i[s] = m;
          (this._data = i), (this.rows = _), (this.cols = g);
        }
        get(_, g) {
          return this._data[_ * this.cols + g];
        }
        set(_, g, m) {
          this._data[_ * this.cols + g] = m;
        }
      }
      t.Uint8Matrix = M;
      class p {
        constructor(_) {
          let g = 0,
            m = 0;
          for (let s = 0, d = _.length; s < d; s++) {
            let [S, n, r] = _[s];
            n > g && (g = n), S > m && (m = S), r > m && (m = r);
          }
          g++, m++;
          let i = new M(m, g, 0);
          for (let s = 0, d = _.length; s < d; s++) {
            let [S, n, r] = _[s];
            i.set(S, n, r);
          }
          (this._states = i), (this._maxCharCode = g);
        }
        nextState(_, g) {
          return g < 0 || g >= this._maxCharCode ? 0 : this._states.get(_, g);
        }
      }
      t.StateMachine = p;
      let o = null;
      function h() {
        return (
          o === null &&
            (o = new p([
              [1, 104, 2],
              [1, 72, 2],
              [1, 102, 6],
              [1, 70, 6],
              [2, 116, 3],
              [2, 84, 3],
              [3, 116, 4],
              [3, 84, 4],
              [4, 112, 5],
              [4, 80, 5],
              [5, 115, 9],
              [5, 83, 9],
              [5, 58, 10],
              [6, 105, 7],
              [6, 73, 7],
              [7, 108, 8],
              [7, 76, 8],
              [8, 101, 9],
              [8, 69, 9],
              [9, 58, 10],
              [10, 47, 11],
              [11, 47, 12]
            ])),
          o
        );
      }
      let u = null;
      function l() {
        if (u === null) {
          u = new E.CharacterClassifier(0);
          const a = ` 	<>'"\u3001\u3002\uFF61\uFF64\uFF0C\uFF0E\uFF1A\uFF1B\u2018\u3008\u300C\u300E\u3014\uFF08\uFF3B\uFF5B\uFF62\uFF63\uFF5D\uFF3D\uFF09\u3015\u300F\u300D\u3009\u2019\uFF40\uFF5E\u2026`;
          for (let g = 0; g < a.length; g++) u.set(a.charCodeAt(g), 1);
          const _ = ".,;";
          for (let g = 0; g < _.length; g++) u.set(_.charCodeAt(g), 2);
        }
        return u;
      }
      class f {
        static _createLink(_, g, m, i, s) {
          let d = s - 1;
          do {
            const S = g.charCodeAt(d);
            if (_.get(S) !== 2) break;
            d--;
          } while (d > i);
          if (i > 0) {
            const S = g.charCodeAt(i - 1),
              n = g.charCodeAt(d);
            ((S === 40 && n === 41) ||
              (S === 91 && n === 93) ||
              (S === 123 && n === 125)) &&
              d--;
          }
          return {
            range: {
              startLineNumber: m,
              startColumn: i + 1,
              endLineNumber: m,
              endColumn: d + 2
            },
            url: g.substring(i, d + 1)
          };
        }
        static computeLinks(_, g = h()) {
          const m = l();
          let i = [];
          for (let s = 1, d = _.getLineCount(); s <= d; s++) {
            const S = _.getLineContent(s),
              n = S.length;
            let r = 0,
              c = 0,
              C = 0,
              b = 1,
              v = !1,
              w = !1,
              N = !1,
              y = !1;
            for (; r < n; ) {
              let P = !1;
              const U = S.charCodeAt(r);
              if (b === 13) {
                let R;
                switch (U) {
                  case 40:
                    (v = !0), (R = 0);
                    break;
                  case 41:
                    R = v ? 0 : 1;
                    break;
                  case 91:
                    (N = !0), (w = !0), (R = 0);
                    break;
                  case 93:
                    (N = !1), (R = w ? 0 : 1);
                    break;
                  case 123:
                    (y = !0), (R = 0);
                    break;
                  case 125:
                    R = y ? 0 : 1;
                    break;
                  case 39:
                    R = C === 34 || C === 96 ? 0 : 1;
                    break;
                  case 34:
                    R = C === 39 || C === 96 ? 0 : 1;
                    break;
                  case 96:
                    R = C === 39 || C === 34 ? 0 : 1;
                    break;
                  case 42:
                    R = C === 42 ? 1 : 0;
                    break;
                  case 124:
                    R = C === 124 ? 1 : 0;
                    break;
                  case 32:
                    R = N ? 0 : 1;
                    break;
                  default:
                    R = m.get(U);
                }
                R === 1 && (i.push(f._createLink(m, S, s, c, r)), (P = !0));
              } else if (b === 12) {
                let R;
                U === 91 ? ((w = !0), (R = 0)) : (R = m.get(U)),
                  R === 1 ? (P = !0) : (b = 13);
              } else (b = g.nextState(b, U)), b === 0 && (P = !0);
              P &&
                ((b = 1), (v = !1), (w = !1), (y = !1), (c = r + 1), (C = U)),
                r++;
            }
            b === 13 && i.push(f._createLink(m, S, s, c, n));
          }
          return i;
        }
      }
      t.LinkComputer = f;
      function L(a) {
        return !a ||
          typeof a.getLineCount != "function" ||
          typeof a.getLineContent != "function"
          ? []
          : f.computeLinks(a);
      }
      t.computeLinks = L;
    }),
    z(G[28], Q([0, 1]), function(I, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.BasicInplaceReplace = void 0);
      class E {
        constructor() {
          this._defaultValueSet = [
            ["true", "false"],
            ["True", "False"],
            [
              "Private",
              "Public",
              "Friend",
              "ReadOnly",
              "Partial",
              "Protected",
              "WriteOnly"
            ],
            ["public", "protected", "private"]
          ];
        }
        navigateValueSet(p, o, h, u, l) {
          if (p && o) {
            let f = this.doNavigateValueSet(o, l);
            if (f) return { range: p, value: f };
          }
          if (h && u) {
            let f = this.doNavigateValueSet(u, l);
            if (f) return { range: h, value: f };
          }
          return null;
        }
        doNavigateValueSet(p, o) {
          let h = this.numberReplace(p, o);
          return h !== null ? h : this.textReplace(p, o);
        }
        numberReplace(p, o) {
          let h = Math.pow(10, p.length - (p.lastIndexOf(".") + 1)),
            u = Number(p),
            l = parseFloat(p);
          return !isNaN(u) && !isNaN(l) && u === l
            ? u === 0 && !o
              ? null
              : ((u = Math.floor(u * h)), (u += o ? h : -h), String(u / h))
            : null;
        }
        textReplace(p, o) {
          return this.valueSetsReplace(this._defaultValueSet, p, o);
        }
        valueSetsReplace(p, o, h) {
          let u = null;
          for (let l = 0, f = p.length; u === null && l < f; l++)
            u = this.valueSetReplace(p[l], o, h);
          return u;
        }
        valueSetReplace(p, o, h) {
          let u = p.indexOf(o);
          return u >= 0
            ? ((u += h ? 1 : -1),
              u < 0 ? (u = p.length - 1) : (u %= p.length),
              p[u])
            : null;
        }
      }
      (t.BasicInplaceReplace = E), (E.INSTANCE = new E());
    }),
    z(G[29], Q([0, 1]), function(I, t) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.WrappingIndent = t.TrackedRangeStickiness = t.TextEditorCursorStyle = t.TextEditorCursorBlinkingStyle = t.SymbolTag = t.SymbolKind = t.SignatureHelpTriggerKind = t.SelectionDirection = t.ScrollbarVisibility = t.ScrollType = t.RenderMinimap = t.RenderLineNumbersType = t.OverviewRulerLane = t.OverlayWidgetPositionPreference = t.MouseTargetType = t.MinimapPosition = t.MarkerTag = t.MarkerSeverity = t.KeyCode = t.InlineCompletionTriggerKind = t.InlayHintKind = t.IndentAction = t.EndOfLineSequence = t.EndOfLinePreference = t.EditorOption = t.EditorAutoIndentStrategy = t.DocumentHighlightKind = t.DefaultEndOfLine = t.CursorChangeReason = t.ContentWidgetPositionPreference = t.CompletionTriggerKind = t.CompletionItemTag = t.CompletionItemKind = t.CompletionItemInsertTextRule = t.AccessibilitySupport = void 0);
      var E;
      (function(e) {
        (e[(e.Unknown = 0)] = "Unknown"),
          (e[(e.Disabled = 1)] = "Disabled"),
          (e[(e.Enabled = 2)] = "Enabled");
      })((E = t.AccessibilitySupport || (t.AccessibilitySupport = {})));
      var M;
      (function(e) {
        (e[(e.KeepWhitespace = 1)] = "KeepWhitespace"),
          (e[(e.InsertAsSnippet = 4)] = "InsertAsSnippet");
      })(
        (M =
          t.CompletionItemInsertTextRule ||
          (t.CompletionItemInsertTextRule = {}))
      );
      var p;
      (function(e) {
        (e[(e.Method = 0)] = "Method"),
          (e[(e.Function = 1)] = "Function"),
          (e[(e.Constructor = 2)] = "Constructor"),
          (e[(e.Field = 3)] = "Field"),
          (e[(e.Variable = 4)] = "Variable"),
          (e[(e.Class = 5)] = "Class"),
          (e[(e.Struct = 6)] = "Struct"),
          (e[(e.Interface = 7)] = "Interface"),
          (e[(e.Module = 8)] = "Module"),
          (e[(e.Property = 9)] = "Property"),
          (e[(e.Event = 10)] = "Event"),
          (e[(e.Operator = 11)] = "Operator"),
          (e[(e.Unit = 12)] = "Unit"),
          (e[(e.Value = 13)] = "Value"),
          (e[(e.Constant = 14)] = "Constant"),
          (e[(e.Enum = 15)] = "Enum"),
          (e[(e.EnumMember = 16)] = "EnumMember"),
          (e[(e.Keyword = 17)] = "Keyword"),
          (e[(e.Text = 18)] = "Text"),
          (e[(e.Color = 19)] = "Color"),
          (e[(e.File = 20)] = "File"),
          (e[(e.Reference = 21)] = "Reference"),
          (e[(e.Customcolor = 22)] = "Customcolor"),
          (e[(e.Folder = 23)] = "Folder"),
          (e[(e.TypeParameter = 24)] = "TypeParameter"),
          (e[(e.User = 25)] = "User"),
          (e[(e.Issue = 26)] = "Issue"),
          (e[(e.Snippet = 27)] = "Snippet");
      })((p = t.CompletionItemKind || (t.CompletionItemKind = {})));
      var o;
      (function(e) {
        e[(e.Deprecated = 1)] = "Deprecated";
      })((o = t.CompletionItemTag || (t.CompletionItemTag = {})));
      var h;
      (function(e) {
        (e[(e.Invoke = 0)] = "Invoke"),
          (e[(e.TriggerCharacter = 1)] = "TriggerCharacter"),
          (e[(e.TriggerForIncompleteCompletions = 2)] =
            "TriggerForIncompleteCompletions");
      })((h = t.CompletionTriggerKind || (t.CompletionTriggerKind = {})));
      var u;
      (function(e) {
        (e[(e.EXACT = 0)] = "EXACT"),
          (e[(e.ABOVE = 1)] = "ABOVE"),
          (e[(e.BELOW = 2)] = "BELOW");
      })(
        (u =
          t.ContentWidgetPositionPreference ||
          (t.ContentWidgetPositionPreference = {}))
      );
      var l;
      (function(e) {
        (e[(e.NotSet = 0)] = "NotSet"),
          (e[(e.ContentFlush = 1)] = "ContentFlush"),
          (e[(e.RecoverFromMarkers = 2)] = "RecoverFromMarkers"),
          (e[(e.Explicit = 3)] = "Explicit"),
          (e[(e.Paste = 4)] = "Paste"),
          (e[(e.Undo = 5)] = "Undo"),
          (e[(e.Redo = 6)] = "Redo");
      })((l = t.CursorChangeReason || (t.CursorChangeReason = {})));
      var f;
      (function(e) {
        (e[(e.LF = 1)] = "LF"), (e[(e.CRLF = 2)] = "CRLF");
      })((f = t.DefaultEndOfLine || (t.DefaultEndOfLine = {})));
      var L;
      (function(e) {
        (e[(e.Text = 0)] = "Text"),
          (e[(e.Read = 1)] = "Read"),
          (e[(e.Write = 2)] = "Write");
      })((L = t.DocumentHighlightKind || (t.DocumentHighlightKind = {})));
      var a;
      (function(e) {
        (e[(e.None = 0)] = "None"),
          (e[(e.Keep = 1)] = "Keep"),
          (e[(e.Brackets = 2)] = "Brackets"),
          (e[(e.Advanced = 3)] = "Advanced"),
          (e[(e.Full = 4)] = "Full");
      })((a = t.EditorAutoIndentStrategy || (t.EditorAutoIndentStrategy = {})));
      var _;
      (function(e) {
        (e[(e.acceptSuggestionOnCommitCharacter = 0)] =
          "acceptSuggestionOnCommitCharacter"),
          (e[(e.acceptSuggestionOnEnter = 1)] = "acceptSuggestionOnEnter"),
          (e[(e.accessibilitySupport = 2)] = "accessibilitySupport"),
          (e[(e.accessibilityPageSize = 3)] = "accessibilityPageSize"),
          (e[(e.ariaLabel = 4)] = "ariaLabel"),
          (e[(e.autoClosingBrackets = 5)] = "autoClosingBrackets"),
          (e[(e.autoClosingDelete = 6)] = "autoClosingDelete"),
          (e[(e.autoClosingOvertype = 7)] = "autoClosingOvertype"),
          (e[(e.autoClosingQuotes = 8)] = "autoClosingQuotes"),
          (e[(e.autoIndent = 9)] = "autoIndent"),
          (e[(e.automaticLayout = 10)] = "automaticLayout"),
          (e[(e.autoSurround = 11)] = "autoSurround"),
          (e[(e.codeLens = 12)] = "codeLens"),
          (e[(e.codeLensFontFamily = 13)] = "codeLensFontFamily"),
          (e[(e.codeLensFontSize = 14)] = "codeLensFontSize"),
          (e[(e.colorDecorators = 15)] = "colorDecorators"),
          (e[(e.columnSelection = 16)] = "columnSelection"),
          (e[(e.comments = 17)] = "comments"),
          (e[(e.contextmenu = 18)] = "contextmenu"),
          (e[(e.copyWithSyntaxHighlighting = 19)] =
            "copyWithSyntaxHighlighting"),
          (e[(e.cursorBlinking = 20)] = "cursorBlinking"),
          (e[(e.cursorSmoothCaretAnimation = 21)] =
            "cursorSmoothCaretAnimation"),
          (e[(e.cursorStyle = 22)] = "cursorStyle"),
          (e[(e.cursorSurroundingLines = 23)] = "cursorSurroundingLines"),
          (e[(e.cursorSurroundingLinesStyle = 24)] =
            "cursorSurroundingLinesStyle"),
          (e[(e.cursorWidth = 25)] = "cursorWidth"),
          (e[(e.disableLayerHinting = 26)] = "disableLayerHinting"),
          (e[(e.disableMonospaceOptimizations = 27)] =
            "disableMonospaceOptimizations"),
          (e[(e.domReadOnly = 28)] = "domReadOnly"),
          (e[(e.dragAndDrop = 29)] = "dragAndDrop"),
          (e[(e.emptySelectionClipboard = 30)] = "emptySelectionClipboard"),
          (e[(e.extraEditorClassName = 31)] = "extraEditorClassName"),
          (e[(e.fastScrollSensitivity = 32)] = "fastScrollSensitivity"),
          (e[(e.find = 33)] = "find"),
          (e[(e.fixedOverflowWidgets = 34)] = "fixedOverflowWidgets"),
          (e[(e.folding = 35)] = "folding"),
          (e[(e.foldingStrategy = 36)] = "foldingStrategy"),
          (e[(e.foldingHighlight = 37)] = "foldingHighlight"),
          (e[(e.unfoldOnClickAfterEndOfLine = 38)] =
            "unfoldOnClickAfterEndOfLine"),
          (e[(e.fontFamily = 39)] = "fontFamily"),
          (e[(e.fontInfo = 40)] = "fontInfo"),
          (e[(e.fontLigatures = 41)] = "fontLigatures"),
          (e[(e.fontSize = 42)] = "fontSize"),
          (e[(e.fontWeight = 43)] = "fontWeight"),
          (e[(e.formatOnPaste = 44)] = "formatOnPaste"),
          (e[(e.formatOnType = 45)] = "formatOnType"),
          (e[(e.glyphMargin = 46)] = "glyphMargin"),
          (e[(e.gotoLocation = 47)] = "gotoLocation"),
          (e[(e.hideCursorInOverviewRuler = 48)] = "hideCursorInOverviewRuler"),
          (e[(e.highlightActiveIndentGuide = 49)] =
            "highlightActiveIndentGuide"),
          (e[(e.hover = 50)] = "hover"),
          (e[(e.inDiffEditor = 51)] = "inDiffEditor"),
          (e[(e.inlineSuggest = 52)] = "inlineSuggest"),
          (e[(e.letterSpacing = 53)] = "letterSpacing"),
          (e[(e.lightbulb = 54)] = "lightbulb"),
          (e[(e.lineDecorationsWidth = 55)] = "lineDecorationsWidth"),
          (e[(e.lineHeight = 56)] = "lineHeight"),
          (e[(e.lineNumbers = 57)] = "lineNumbers"),
          (e[(e.lineNumbersMinChars = 58)] = "lineNumbersMinChars"),
          (e[(e.linkedEditing = 59)] = "linkedEditing"),
          (e[(e.links = 60)] = "links"),
          (e[(e.matchBrackets = 61)] = "matchBrackets"),
          (e[(e.minimap = 62)] = "minimap"),
          (e[(e.mouseStyle = 63)] = "mouseStyle"),
          (e[(e.mouseWheelScrollSensitivity = 64)] =
            "mouseWheelScrollSensitivity"),
          (e[(e.mouseWheelZoom = 65)] = "mouseWheelZoom"),
          (e[(e.multiCursorMergeOverlapping = 66)] =
            "multiCursorMergeOverlapping"),
          (e[(e.multiCursorModifier = 67)] = "multiCursorModifier"),
          (e[(e.multiCursorPaste = 68)] = "multiCursorPaste"),
          (e[(e.occurrencesHighlight = 69)] = "occurrencesHighlight"),
          (e[(e.overviewRulerBorder = 70)] = "overviewRulerBorder"),
          (e[(e.overviewRulerLanes = 71)] = "overviewRulerLanes"),
          (e[(e.padding = 72)] = "padding"),
          (e[(e.parameterHints = 73)] = "parameterHints"),
          (e[(e.peekWidgetDefaultFocus = 74)] = "peekWidgetDefaultFocus"),
          (e[(e.definitionLinkOpensInPeek = 75)] = "definitionLinkOpensInPeek"),
          (e[(e.quickSuggestions = 76)] = "quickSuggestions"),
          (e[(e.quickSuggestionsDelay = 77)] = "quickSuggestionsDelay"),
          (e[(e.readOnly = 78)] = "readOnly"),
          (e[(e.renameOnType = 79)] = "renameOnType"),
          (e[(e.renderControlCharacters = 80)] = "renderControlCharacters"),
          (e[(e.renderIndentGuides = 81)] = "renderIndentGuides"),
          (e[(e.renderFinalNewline = 82)] = "renderFinalNewline"),
          (e[(e.renderLineHighlight = 83)] = "renderLineHighlight"),
          (e[(e.renderLineHighlightOnlyWhenFocus = 84)] =
            "renderLineHighlightOnlyWhenFocus"),
          (e[(e.renderValidationDecorations = 85)] =
            "renderValidationDecorations"),
          (e[(e.renderWhitespace = 86)] = "renderWhitespace"),
          (e[(e.revealHorizontalRightPadding = 87)] =
            "revealHorizontalRightPadding"),
          (e[(e.roundedSelection = 88)] = "roundedSelection"),
          (e[(e.rulers = 89)] = "rulers"),
          (e[(e.scrollbar = 90)] = "scrollbar"),
          (e[(e.scrollBeyondLastColumn = 91)] = "scrollBeyondLastColumn"),
          (e[(e.scrollBeyondLastLine = 92)] = "scrollBeyondLastLine"),
          (e[(e.scrollPredominantAxis = 93)] = "scrollPredominantAxis"),
          (e[(e.selectionClipboard = 94)] = "selectionClipboard"),
          (e[(e.selectionHighlight = 95)] = "selectionHighlight"),
          (e[(e.selectOnLineNumbers = 96)] = "selectOnLineNumbers"),
          (e[(e.showFoldingControls = 97)] = "showFoldingControls"),
          (e[(e.showUnused = 98)] = "showUnused"),
          (e[(e.snippetSuggestions = 99)] = "snippetSuggestions"),
          (e[(e.smartSelect = 100)] = "smartSelect"),
          (e[(e.smoothScrolling = 101)] = "smoothScrolling"),
          (e[(e.stickyTabStops = 102)] = "stickyTabStops"),
          (e[(e.stopRenderingLineAfter = 103)] = "stopRenderingLineAfter"),
          (e[(e.suggest = 104)] = "suggest"),
          (e[(e.suggestFontSize = 105)] = "suggestFontSize"),
          (e[(e.suggestLineHeight = 106)] = "suggestLineHeight"),
          (e[(e.suggestOnTriggerCharacters = 107)] =
            "suggestOnTriggerCharacters"),
          (e[(e.suggestSelection = 108)] = "suggestSelection"),
          (e[(e.tabCompletion = 109)] = "tabCompletion"),
          (e[(e.tabIndex = 110)] = "tabIndex"),
          (e[(e.unusualLineTerminators = 111)] = "unusualLineTerminators"),
          (e[(e.useShadowDOM = 112)] = "useShadowDOM"),
          (e[(e.useTabStops = 113)] = "useTabStops"),
          (e[(e.wordSeparators = 114)] = "wordSeparators"),
          (e[(e.wordWrap = 115)] = "wordWrap"),
          (e[(e.wordWrapBreakAfterCharacters = 116)] =
            "wordWrapBreakAfterCharacters"),
          (e[(e.wordWrapBreakBeforeCharacters = 117)] =
            "wordWrapBreakBeforeCharacters"),
          (e[(e.wordWrapColumn = 118)] = "wordWrapColumn"),
          (e[(e.wordWrapOverride1 = 119)] = "wordWrapOverride1"),
          (e[(e.wordWrapOverride2 = 120)] = "wordWrapOverride2"),
          (e[(e.wrappingIndent = 121)] = "wrappingIndent"),
          (e[(e.wrappingStrategy = 122)] = "wrappingStrategy"),
          (e[(e.showDeprecated = 123)] = "showDeprecated"),
          (e[(e.inlayHints = 124)] = "inlayHints"),
          (e[(e.editorClassName = 125)] = "editorClassName"),
          (e[(e.pixelRatio = 126)] = "pixelRatio"),
          (e[(e.tabFocusMode = 127)] = "tabFocusMode"),
          (e[(e.layoutInfo = 128)] = "layoutInfo"),
          (e[(e.wrappingInfo = 129)] = "wrappingInfo");
      })((_ = t.EditorOption || (t.EditorOption = {})));
      var g;
      (function(e) {
        (e[(e.TextDefined = 0)] = "TextDefined"),
          (e[(e.LF = 1)] = "LF"),
          (e[(e.CRLF = 2)] = "CRLF");
      })((g = t.EndOfLinePreference || (t.EndOfLinePreference = {})));
      var m;
      (function(e) {
        (e[(e.LF = 0)] = "LF"), (e[(e.CRLF = 1)] = "CRLF");
      })((m = t.EndOfLineSequence || (t.EndOfLineSequence = {})));
      var i;
      (function(e) {
        (e[(e.None = 0)] = "None"),
          (e[(e.Indent = 1)] = "Indent"),
          (e[(e.IndentOutdent = 2)] = "IndentOutdent"),
          (e[(e.Outdent = 3)] = "Outdent");
      })((i = t.IndentAction || (t.IndentAction = {})));
      var s;
      (function(e) {
        (e[(e.Other = 0)] = "Other"),
          (e[(e.Type = 1)] = "Type"),
          (e[(e.Parameter = 2)] = "Parameter");
      })((s = t.InlayHintKind || (t.InlayHintKind = {})));
      var d;
      (function(e) {
        (e[(e.Automatic = 0)] = "Automatic"),
          (e[(e.Explicit = 1)] = "Explicit");
      })(
        (d =
          t.InlineCompletionTriggerKind || (t.InlineCompletionTriggerKind = {}))
      );
      var S;
      (function(e) {
        (e[(e.DependsOnKbLayout = -1)] = "DependsOnKbLayout"),
          (e[(e.Unknown = 0)] = "Unknown"),
          (e[(e.Backspace = 1)] = "Backspace"),
          (e[(e.Tab = 2)] = "Tab"),
          (e[(e.Enter = 3)] = "Enter"),
          (e[(e.Shift = 4)] = "Shift"),
          (e[(e.Ctrl = 5)] = "Ctrl"),
          (e[(e.Alt = 6)] = "Alt"),
          (e[(e.PauseBreak = 7)] = "PauseBreak"),
          (e[(e.CapsLock = 8)] = "CapsLock"),
          (e[(e.Escape = 9)] = "Escape"),
          (e[(e.Space = 10)] = "Space"),
          (e[(e.PageUp = 11)] = "PageUp"),
          (e[(e.PageDown = 12)] = "PageDown"),
          (e[(e.End = 13)] = "End"),
          (e[(e.Home = 14)] = "Home"),
          (e[(e.LeftArrow = 15)] = "LeftArrow"),
          (e[(e.UpArrow = 16)] = "UpArrow"),
          (e[(e.RightArrow = 17)] = "RightArrow"),
          (e[(e.DownArrow = 18)] = "DownArrow"),
          (e[(e.Insert = 19)] = "Insert"),
          (e[(e.Delete = 20)] = "Delete"),
          (e[(e.KEY_0 = 21)] = "KEY_0"),
          (e[(e.KEY_1 = 22)] = "KEY_1"),
          (e[(e.KEY_2 = 23)] = "KEY_2"),
          (e[(e.KEY_3 = 24)] = "KEY_3"),
          (e[(e.KEY_4 = 25)] = "KEY_4"),
          (e[(e.KEY_5 = 26)] = "KEY_5"),
          (e[(e.KEY_6 = 27)] = "KEY_6"),
          (e[(e.KEY_7 = 28)] = "KEY_7"),
          (e[(e.KEY_8 = 29)] = "KEY_8"),
          (e[(e.KEY_9 = 30)] = "KEY_9"),
          (e[(e.KEY_A = 31)] = "KEY_A"),
          (e[(e.KEY_B = 32)] = "KEY_B"),
          (e[(e.KEY_C = 33)] = "KEY_C"),
          (e[(e.KEY_D = 34)] = "KEY_D"),
          (e[(e.KEY_E = 35)] = "KEY_E"),
          (e[(e.KEY_F = 36)] = "KEY_F"),
          (e[(e.KEY_G = 37)] = "KEY_G"),
          (e[(e.KEY_H = 38)] = "KEY_H"),
          (e[(e.KEY_I = 39)] = "KEY_I"),
          (e[(e.KEY_J = 40)] = "KEY_J"),
          (e[(e.KEY_K = 41)] = "KEY_K"),
          (e[(e.KEY_L = 42)] = "KEY_L"),
          (e[(e.KEY_M = 43)] = "KEY_M"),
          (e[(e.KEY_N = 44)] = "KEY_N"),
          (e[(e.KEY_O = 45)] = "KEY_O"),
          (e[(e.KEY_P = 46)] = "KEY_P"),
          (e[(e.KEY_Q = 47)] = "KEY_Q"),
          (e[(e.KEY_R = 48)] = "KEY_R"),
          (e[(e.KEY_S = 49)] = "KEY_S"),
          (e[(e.KEY_T = 50)] = "KEY_T"),
          (e[(e.KEY_U = 51)] = "KEY_U"),
          (e[(e.KEY_V = 52)] = "KEY_V"),
          (e[(e.KEY_W = 53)] = "KEY_W"),
          (e[(e.KEY_X = 54)] = "KEY_X"),
          (e[(e.KEY_Y = 55)] = "KEY_Y"),
          (e[(e.KEY_Z = 56)] = "KEY_Z"),
          (e[(e.Meta = 57)] = "Meta"),
          (e[(e.ContextMenu = 58)] = "ContextMenu"),
          (e[(e.F1 = 59)] = "F1"),
          (e[(e.F2 = 60)] = "F2"),
          (e[(e.F3 = 61)] = "F3"),
          (e[(e.F4 = 62)] = "F4"),
          (e[(e.F5 = 63)] = "F5"),
          (e[(e.F6 = 64)] = "F6"),
          (e[(e.F7 = 65)] = "F7"),
          (e[(e.F8 = 66)] = "F8"),
          (e[(e.F9 = 67)] = "F9"),
          (e[(e.F10 = 68)] = "F10"),
          (e[(e.F11 = 69)] = "F11"),
          (e[(e.F12 = 70)] = "F12"),
          (e[(e.F13 = 71)] = "F13"),
          (e[(e.F14 = 72)] = "F14"),
          (e[(e.F15 = 73)] = "F15"),
          (e[(e.F16 = 74)] = "F16"),
          (e[(e.F17 = 75)] = "F17"),
          (e[(e.F18 = 76)] = "F18"),
          (e[(e.F19 = 77)] = "F19"),
          (e[(e.NumLock = 78)] = "NumLock"),
          (e[(e.ScrollLock = 79)] = "ScrollLock"),
          (e[(e.US_SEMICOLON = 80)] = "US_SEMICOLON"),
          (e[(e.US_EQUAL = 81)] = "US_EQUAL"),
          (e[(e.US_COMMA = 82)] = "US_COMMA"),
          (e[(e.US_MINUS = 83)] = "US_MINUS"),
          (e[(e.US_DOT = 84)] = "US_DOT"),
          (e[(e.US_SLASH = 85)] = "US_SLASH"),
          (e[(e.US_BACKTICK = 86)] = "US_BACKTICK"),
          (e[(e.US_OPEN_SQUARE_BRACKET = 87)] = "US_OPEN_SQUARE_BRACKET"),
          (e[(e.US_BACKSLASH = 88)] = "US_BACKSLASH"),
          (e[(e.US_CLOSE_SQUARE_BRACKET = 89)] = "US_CLOSE_SQUARE_BRACKET"),
          (e[(e.US_QUOTE = 90)] = "US_QUOTE"),
          (e[(e.OEM_8 = 91)] = "OEM_8"),
          (e[(e.OEM_102 = 92)] = "OEM_102"),
          (e[(e.NUMPAD_0 = 93)] = "NUMPAD_0"),
          (e[(e.NUMPAD_1 = 94)] = "NUMPAD_1"),
          (e[(e.NUMPAD_2 = 95)] = "NUMPAD_2"),
          (e[(e.NUMPAD_3 = 96)] = "NUMPAD_3"),
          (e[(e.NUMPAD_4 = 97)] = "NUMPAD_4"),
          (e[(e.NUMPAD_5 = 98)] = "NUMPAD_5"),
          (e[(e.NUMPAD_6 = 99)] = "NUMPAD_6"),
          (e[(e.NUMPAD_7 = 100)] = "NUMPAD_7"),
          (e[(e.NUMPAD_8 = 101)] = "NUMPAD_8"),
          (e[(e.NUMPAD_9 = 102)] = "NUMPAD_9"),
          (e[(e.NUMPAD_MULTIPLY = 103)] = "NUMPAD_MULTIPLY"),
          (e[(e.NUMPAD_ADD = 104)] = "NUMPAD_ADD"),
          (e[(e.NUMPAD_SEPARATOR = 105)] = "NUMPAD_SEPARATOR"),
          (e[(e.NUMPAD_SUBTRACT = 106)] = "NUMPAD_SUBTRACT"),
          (e[(e.NUMPAD_DECIMAL = 107)] = "NUMPAD_DECIMAL"),
          (e[(e.NUMPAD_DIVIDE = 108)] = "NUMPAD_DIVIDE"),
          (e[(e.KEY_IN_COMPOSITION = 109)] = "KEY_IN_COMPOSITION"),
          (e[(e.ABNT_C1 = 110)] = "ABNT_C1"),
          (e[(e.ABNT_C2 = 111)] = "ABNT_C2"),
          (e[(e.MAX_VALUE = 112)] = "MAX_VALUE");
      })((S = t.KeyCode || (t.KeyCode = {})));
      var n;
      (function(e) {
        (e[(e.Hint = 1)] = "Hint"),
          (e[(e.Info = 2)] = "Info"),
          (e[(e.Warning = 4)] = "Warning"),
          (e[(e.Error = 8)] = "Error");
      })((n = t.MarkerSeverity || (t.MarkerSeverity = {})));
      var r;
      (function(e) {
        (e[(e.Unnecessary = 1)] = "Unnecessary"),
          (e[(e.Deprecated = 2)] = "Deprecated");
      })((r = t.MarkerTag || (t.MarkerTag = {})));
      var c;
      (function(e) {
        (e[(e.Inline = 1)] = "Inline"), (e[(e.Gutter = 2)] = "Gutter");
      })((c = t.MinimapPosition || (t.MinimapPosition = {})));
      var C;
      (function(e) {
        (e[(e.UNKNOWN = 0)] = "UNKNOWN"),
          (e[(e.TEXTAREA = 1)] = "TEXTAREA"),
          (e[(e.GUTTER_GLYPH_MARGIN = 2)] = "GUTTER_GLYPH_MARGIN"),
          (e[(e.GUTTER_LINE_NUMBERS = 3)] = "GUTTER_LINE_NUMBERS"),
          (e[(e.GUTTER_LINE_DECORATIONS = 4)] = "GUTTER_LINE_DECORATIONS"),
          (e[(e.GUTTER_VIEW_ZONE = 5)] = "GUTTER_VIEW_ZONE"),
          (e[(e.CONTENT_TEXT = 6)] = "CONTENT_TEXT"),
          (e[(e.CONTENT_EMPTY = 7)] = "CONTENT_EMPTY"),
          (e[(e.CONTENT_VIEW_ZONE = 8)] = "CONTENT_VIEW_ZONE"),
          (e[(e.CONTENT_WIDGET = 9)] = "CONTENT_WIDGET"),
          (e[(e.OVERVIEW_RULER = 10)] = "OVERVIEW_RULER"),
          (e[(e.SCROLLBAR = 11)] = "SCROLLBAR"),
          (e[(e.OVERLAY_WIDGET = 12)] = "OVERLAY_WIDGET"),
          (e[(e.OUTSIDE_EDITOR = 13)] = "OUTSIDE_EDITOR");
      })((C = t.MouseTargetType || (t.MouseTargetType = {})));
      var b;
      (function(e) {
        (e[(e.TOP_RIGHT_CORNER = 0)] = "TOP_RIGHT_CORNER"),
          (e[(e.BOTTOM_RIGHT_CORNER = 1)] = "BOTTOM_RIGHT_CORNER"),
          (e[(e.TOP_CENTER = 2)] = "TOP_CENTER");
      })(
        (b =
          t.OverlayWidgetPositionPreference ||
          (t.OverlayWidgetPositionPreference = {}))
      );
      var v;
      (function(e) {
        (e[(e.Left = 1)] = "Left"),
          (e[(e.Center = 2)] = "Center"),
          (e[(e.Right = 4)] = "Right"),
          (e[(e.Full = 7)] = "Full");
      })((v = t.OverviewRulerLane || (t.OverviewRulerLane = {})));
      var w;
      (function(e) {
        (e[(e.Off = 0)] = "Off"),
          (e[(e.On = 1)] = "On"),
          (e[(e.Relative = 2)] = "Relative"),
          (e[(e.Interval = 3)] = "Interval"),
          (e[(e.Custom = 4)] = "Custom");
      })((w = t.RenderLineNumbersType || (t.RenderLineNumbersType = {})));
      var N;
      (function(e) {
        (e[(e.None = 0)] = "None"),
          (e[(e.Text = 1)] = "Text"),
          (e[(e.Blocks = 2)] = "Blocks");
      })((N = t.RenderMinimap || (t.RenderMinimap = {})));
      var y;
      (function(e) {
        (e[(e.Smooth = 0)] = "Smooth"), (e[(e.Immediate = 1)] = "Immediate");
      })((y = t.ScrollType || (t.ScrollType = {})));
      var P;
      (function(e) {
        (e[(e.Auto = 1)] = "Auto"),
          (e[(e.Hidden = 2)] = "Hidden"),
          (e[(e.Visible = 3)] = "Visible");
      })((P = t.ScrollbarVisibility || (t.ScrollbarVisibility = {})));
      var U;
      (function(e) {
        (e[(e.LTR = 0)] = "LTR"), (e[(e.RTL = 1)] = "RTL");
      })((U = t.SelectionDirection || (t.SelectionDirection = {})));
      var R;
      (function(e) {
        (e[(e.Invoke = 1)] = "Invoke"),
          (e[(e.TriggerCharacter = 2)] = "TriggerCharacter"),
          (e[(e.ContentChange = 3)] = "ContentChange");
      })((R = t.SignatureHelpTriggerKind || (t.SignatureHelpTriggerKind = {})));
      var q;
      (function(e) {
        (e[(e.File = 0)] = "File"),
          (e[(e.Module = 1)] = "Module"),
          (e[(e.Namespace = 2)] = "Namespace"),
          (e[(e.Package = 3)] = "Package"),
          (e[(e.Class = 4)] = "Class"),
          (e[(e.Method = 5)] = "Method"),
          (e[(e.Property = 6)] = "Property"),
          (e[(e.Field = 7)] = "Field"),
          (e[(e.Constructor = 8)] = "Constructor"),
          (e[(e.Enum = 9)] = "Enum"),
          (e[(e.Interface = 10)] = "Interface"),
          (e[(e.Function = 11)] = "Function"),
          (e[(e.Variable = 12)] = "Variable"),
          (e[(e.Constant = 13)] = "Constant"),
          (e[(e.String = 14)] = "String"),
          (e[(e.Number = 15)] = "Number"),
          (e[(e.Boolean = 16)] = "Boolean"),
          (e[(e.Array = 17)] = "Array"),
          (e[(e.Object = 18)] = "Object"),
          (e[(e.Key = 19)] = "Key"),
          (e[(e.Null = 20)] = "Null"),
          (e[(e.EnumMember = 21)] = "EnumMember"),
          (e[(e.Struct = 22)] = "Struct"),
          (e[(e.Event = 23)] = "Event"),
          (e[(e.Operator = 24)] = "Operator"),
          (e[(e.TypeParameter = 25)] = "TypeParameter");
      })((q = t.SymbolKind || (t.SymbolKind = {})));
      var Y;
      (function(e) {
        e[(e.Deprecated = 1)] = "Deprecated";
      })((Y = t.SymbolTag || (t.SymbolTag = {})));
      var j;
      (function(e) {
        (e[(e.Hidden = 0)] = "Hidden"),
          (e[(e.Blink = 1)] = "Blink"),
          (e[(e.Smooth = 2)] = "Smooth"),
          (e[(e.Phase = 3)] = "Phase"),
          (e[(e.Expand = 4)] = "Expand"),
          (e[(e.Solid = 5)] = "Solid");
      })(
        (j =
          t.TextEditorCursorBlinkingStyle ||
          (t.TextEditorCursorBlinkingStyle = {}))
      );
      var T;
      (function(e) {
        (e[(e.Line = 1)] = "Line"),
          (e[(e.Block = 2)] = "Block"),
          (e[(e.Underline = 3)] = "Underline"),
          (e[(e.LineThin = 4)] = "LineThin"),
          (e[(e.BlockOutline = 5)] = "BlockOutline"),
          (e[(e.UnderlineThin = 6)] = "UnderlineThin");
      })((T = t.TextEditorCursorStyle || (t.TextEditorCursorStyle = {})));
      var W;
      (function(e) {
        (e[(e.AlwaysGrowsWhenTypingAtEdges = 0)] =
          "AlwaysGrowsWhenTypingAtEdges"),
          (e[(e.NeverGrowsWhenTypingAtEdges = 1)] =
            "NeverGrowsWhenTypingAtEdges"),
          (e[(e.GrowsOnlyWhenTypingBefore = 2)] = "GrowsOnlyWhenTypingBefore"),
          (e[(e.GrowsOnlyWhenTypingAfter = 3)] = "GrowsOnlyWhenTypingAfter");
      })((W = t.TrackedRangeStickiness || (t.TrackedRangeStickiness = {})));
      var O;
      (function(e) {
        (e[(e.None = 0)] = "None"),
          (e[(e.Same = 1)] = "Same"),
          (e[(e.Indent = 2)] = "Indent"),
          (e[(e.DeepIndent = 3)] = "DeepIndent");
      })((O = t.WrappingIndent || (t.WrappingIndent = {})));
    }),
    z(G[30], Q([0, 1, 20, 9, 16, 13, 3, 6, 23, 24, 29]), function(
      I,
      t,
      E,
      M,
      p,
      o,
      h,
      u,
      l,
      f,
      L
    ) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.createMonacoBaseAPI = t.KeyMod = void 0);
      class a {
        static chord(m, i) {
          return p.KeyChord(m, i);
        }
      }
      (t.KeyMod = a),
        (a.CtrlCmd = 2048),
        (a.Shift = 1024),
        (a.Alt = 512),
        (a.WinCtrl = 256);
      function _() {
        return {
          editor: void 0,
          languages: void 0,
          CancellationTokenSource: E.CancellationTokenSource,
          Emitter: M.Emitter,
          KeyCode: L.KeyCode,
          KeyMod: a,
          Position: h.Position,
          Range: u.Range,
          Selection: l.Selection,
          SelectionDirection: L.SelectionDirection,
          MarkerSeverity: L.MarkerSeverity,
          MarkerTag: L.MarkerTag,
          Uri: o.URI,
          Token: f.Token
        };
      }
      t.createMonacoBaseAPI = _;
    }),
    z(G[31], Q([0, 1, 12]), function(I, t, E) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.PrefixSumComputer = t.PrefixSumIndexOfResult = void 0);
      class M {
        constructor(h, u) {
          (this.index = h), (this.remainder = u);
        }
      }
      t.PrefixSumIndexOfResult = M;
      class p {
        constructor(h) {
          (this.values = h),
            (this.prefixSum = new Uint32Array(h.length)),
            (this.prefixSumValidIndex = new Int32Array(1)),
            (this.prefixSumValidIndex[0] = -1);
        }
        insertValues(h, u) {
          h = E.toUint32(h);
          const l = this.values,
            f = this.prefixSum,
            L = u.length;
          return L === 0
            ? !1
            : ((this.values = new Uint32Array(l.length + L)),
              this.values.set(l.subarray(0, h), 0),
              this.values.set(l.subarray(h), h + L),
              this.values.set(u, h),
              h - 1 < this.prefixSumValidIndex[0] &&
                (this.prefixSumValidIndex[0] = h - 1),
              (this.prefixSum = new Uint32Array(this.values.length)),
              this.prefixSumValidIndex[0] >= 0 &&
                this.prefixSum.set(
                  f.subarray(0, this.prefixSumValidIndex[0] + 1)
                ),
              !0);
        }
        changeValue(h, u) {
          return (
            (h = E.toUint32(h)),
            (u = E.toUint32(u)),
            this.values[h] === u
              ? !1
              : ((this.values[h] = u),
                h - 1 < this.prefixSumValidIndex[0] &&
                  (this.prefixSumValidIndex[0] = h - 1),
                !0)
          );
        }
        removeValues(h, u) {
          (h = E.toUint32(h)), (u = E.toUint32(u));
          const l = this.values,
            f = this.prefixSum;
          if (h >= l.length) return !1;
          let L = l.length - h;
          return (
            u >= L && (u = L),
            u === 0
              ? !1
              : ((this.values = new Uint32Array(l.length - u)),
                this.values.set(l.subarray(0, h), 0),
                this.values.set(l.subarray(h + u), h),
                (this.prefixSum = new Uint32Array(this.values.length)),
                h - 1 < this.prefixSumValidIndex[0] &&
                  (this.prefixSumValidIndex[0] = h - 1),
                this.prefixSumValidIndex[0] >= 0 &&
                  this.prefixSum.set(
                    f.subarray(0, this.prefixSumValidIndex[0] + 1)
                  ),
                !0)
          );
        }
        getTotalValue() {
          return this.values.length === 0
            ? 0
            : this._getAccumulatedValue(this.values.length - 1);
        }
        getAccumulatedValue(h) {
          return h < 0
            ? 0
            : ((h = E.toUint32(h)), this._getAccumulatedValue(h));
        }
        _getAccumulatedValue(h) {
          if (h <= this.prefixSumValidIndex[0]) return this.prefixSum[h];
          let u = this.prefixSumValidIndex[0] + 1;
          u === 0 && ((this.prefixSum[0] = this.values[0]), u++),
            h >= this.values.length && (h = this.values.length - 1);
          for (let l = u; l <= h; l++)
            this.prefixSum[l] = this.prefixSum[l - 1] + this.values[l];
          return (
            (this.prefixSumValidIndex[0] = Math.max(
              this.prefixSumValidIndex[0],
              h
            )),
            this.prefixSum[h]
          );
        }
        getIndexOf(h) {
          (h = Math.floor(h)), this.getTotalValue();
          let u = 0,
            l = this.values.length - 1,
            f = 0,
            L = 0,
            a = 0;
          for (; u <= l; )
            if (
              ((f = (u + (l - u) / 2) | 0),
              (L = this.prefixSum[f]),
              (a = L - this.values[f]),
              h < a)
            )
              l = f - 1;
            else if (h >= L) u = f + 1;
            else break;
          return new M(f, h - a);
        }
      }
      t.PrefixSumComputer = p;
    }),
    z(G[32], Q([0, 1, 5, 3, 31]), function(I, t, E, M, p) {
      "use strict";
      Object.defineProperty(t, "__esModule", { value: !0 }),
        (t.MirrorTextModel = void 0);
      class o {
        constructor(u, l, f, L) {
          (this._uri = u),
            (this._lines = l),
            (this._eol = f),
            (this._versionId = L),
            (this._lineStarts = null),
            (this._cachedTextValue = null);
        }
        dispose() {
          this._lines.length = 0;
        }
        get version() {
          return this._versionId;
        }
        getText() {
          return (
            this._cachedTextValue === null &&
              (this._cachedTextValue = this._lines.join(this._eol)),
            this._cachedTextValue
          );
        }
        onEvents(u) {
          u.eol &&
            u.eol !== this._eol &&
            ((this._eol = u.eol), (this._lineStarts = null));
          const l = u.changes;
          for (const f of l)
            this._acceptDeleteRange(f.range),
              this._acceptInsertText(
                new M.Position(f.range.startLineNumber, f.range.startColumn),
                f.text
              );
          (this._versionId = u.versionId), (this._cachedTextValue = null);
        }
        _ensureLineStarts() {
          if (!this._lineStarts) {
            const u = this._eol.length,
              l = this._lines.length,
              f = new Uint32Array(l);
            for (let L = 0; L < l; L++) f[L] = this._lines[L].length + u;
            this._lineStarts = new p.PrefixSumComputer(f);
          }
        }
        _setLineText(u, l) {
          (this._lines[u] = l),
            this._lineStarts &&
              this._lineStarts.changeValue(
                u,
                this._lines[u].length + this._eol.length
              );
        }
        _acceptDeleteRange(u) {
          if (u.startLineNumber === u.endLineNumber) {
            if (u.startColumn === u.endColumn) return;
            this._setLineText(
              u.startLineNumber - 1,
              this._lines[u.startLineNumber - 1].substring(
                0,
                u.startColumn - 1
              ) + this._lines[u.startLineNumber - 1].substring(u.endColumn - 1)
            );
            return;
          }
          this._setLineText(
            u.startLineNumber - 1,
            this._lines[u.startLineNumber - 1].substring(0, u.startColumn - 1) +
              this._lines[u.endLineNumber - 1].substring(u.endColumn - 1)
          ),
            this._lines.splice(
              u.startLineNumber,
              u.endLineNumber - u.startLineNumber
            ),
            this._lineStarts &&
              this._lineStarts.removeValues(
                u.startLineNumber,
                u.endLineNumber - u.startLineNumber
              );
        }
        _acceptInsertText(u, l) {
          if (l.length === 0) return;
          let f = E.splitLines(l);
          if (f.length === 1) {
            this._setLineText(
              u.lineNumber - 1,
              this._lines[u.lineNumber - 1].substring(0, u.column - 1) +
                f[0] +
                this._lines[u.lineNumber - 1].substring(u.column - 1)
            );
            return;
          }
          (f[f.length - 1] += this._lines[u.lineNumber - 1].substring(
            u.column - 1
          )),
            this._setLineText(
              u.lineNumber - 1,
              this._lines[u.lineNumber - 1].substring(0, u.column - 1) + f[0]
            );
          let L = new Uint32Array(f.length - 1);
          for (let a = 1; a < f.length; a++)
            this._lines.splice(u.lineNumber + a - 1, 0, f[a]),
              (L[a - 1] = f[a].length + this._eol.length);
          this._lineStarts && this._lineStarts.insertValues(u.lineNumber, L);
        }
      }
      t.MirrorTextModel = o;
    });
  var ie =
    (this && this.__awaiter) ||
    function(I, t, E, M) {
      function p(o) {
        return o instanceof E
          ? o
          : new E(function(h) {
              h(o);
            });
      }
      return new (E || (E = Promise))(function(o, h) {
        function u(L) {
          try {
            f(M.next(L));
          } catch (a) {
            h(a);
          }
        }
        function l(L) {
          try {
            f(M.throw(L));
          } catch (a) {
            h(a);
          }
        }
        function f(L) {
          L.done ? o(L.value) : p(L.value).then(u, l);
        }
        f((M = M.apply(I, t || [])).next());
      });
    };
  z(G[34], Q([0, 1, 10, 2, 13, 3, 6, 25, 32, 26, 27, 28, 30, 11, 8]), function(
    I,
    t,
    E,
    M,
    p,
    o,
    h,
    u,
    l,
    f,
    L,
    a,
    _,
    g,
    m
  ) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.create = t.EditorSimpleWorker = void 0);
    class i extends l.MirrorTextModel {
      get uri() {
        return this._uri;
      }
      get eol() {
        return this._eol;
      }
      getValue() {
        return this.getText();
      }
      getLinesContent() {
        return this._lines.slice(0);
      }
      getLineCount() {
        return this._lines.length;
      }
      getLineContent(n) {
        return this._lines[n - 1];
      }
      getWordAtPosition(n, r) {
        let c = f.getWordAtText(
          n.column,
          f.ensureValidWordDefinition(r),
          this._lines[n.lineNumber - 1],
          0
        );
        return c
          ? new h.Range(n.lineNumber, c.startColumn, n.lineNumber, c.endColumn)
          : null;
      }
      words(n) {
        const r = this._lines,
          c = this._wordenize.bind(this);
        let C = 0,
          b = "",
          v = 0,
          w = [];
        return {
          *[Symbol.iterator]() {
            for (;;)
              if (v < w.length) {
                const N = b.substring(w[v].start, w[v].end);
                (v += 1), yield N;
              } else if (C < r.length)
                (b = r[C]), (w = c(b, n)), (v = 0), (C += 1);
              else break;
          }
        };
      }
      getLineWords(n, r) {
        let c = this._lines[n - 1],
          C = this._wordenize(c, r),
          b = [];
        for (const v of C)
          b.push({
            word: c.substring(v.start, v.end),
            startColumn: v.start + 1,
            endColumn: v.end + 1
          });
        return b;
      }
      _wordenize(n, r) {
        const c = [];
        let C;
        for (r.lastIndex = 0; (C = r.exec(n)) && C[0].length !== 0; )
          c.push({ start: C.index, end: C.index + C[0].length });
        return c;
      }
      getValueInRange(n) {
        if (
          ((n = this._validateRange(n)), n.startLineNumber === n.endLineNumber)
        )
          return this._lines[n.startLineNumber - 1].substring(
            n.startColumn - 1,
            n.endColumn - 1
          );
        let r = this._eol,
          c = n.startLineNumber - 1,
          C = n.endLineNumber - 1,
          b = [];
        b.push(this._lines[c].substring(n.startColumn - 1));
        for (let v = c + 1; v < C; v++) b.push(this._lines[v]);
        return b.push(this._lines[C].substring(0, n.endColumn - 1)), b.join(r);
      }
      offsetAt(n) {
        return (
          (n = this._validatePosition(n)),
          this._ensureLineStarts(),
          this._lineStarts.getAccumulatedValue(n.lineNumber - 2) +
            (n.column - 1)
        );
      }
      positionAt(n) {
        (n = Math.floor(n)), (n = Math.max(0, n)), this._ensureLineStarts();
        let r = this._lineStarts.getIndexOf(n),
          c = this._lines[r.index].length;
        return {
          lineNumber: 1 + r.index,
          column: 1 + Math.min(r.remainder, c)
        };
      }
      _validateRange(n) {
        const r = this._validatePosition({
            lineNumber: n.startLineNumber,
            column: n.startColumn
          }),
          c = this._validatePosition({
            lineNumber: n.endLineNumber,
            column: n.endColumn
          });
        return r.lineNumber !== n.startLineNumber ||
          r.column !== n.startColumn ||
          c.lineNumber !== n.endLineNumber ||
          c.column !== n.endColumn
          ? {
              startLineNumber: r.lineNumber,
              startColumn: r.column,
              endLineNumber: c.lineNumber,
              endColumn: c.column
            }
          : n;
      }
      _validatePosition(n) {
        if (!o.Position.isIPosition(n)) throw new Error("bad position");
        let { lineNumber: r, column: c } = n,
          C = !1;
        if (r < 1) (r = 1), (c = 1), (C = !0);
        else if (r > this._lines.length)
          (r = this._lines.length),
            (c = this._lines[r - 1].length + 1),
            (C = !0);
        else {
          let b = this._lines[r - 1].length + 1;
          c < 1 ? ((c = 1), (C = !0)) : c > b && ((c = b), (C = !0));
        }
        return C ? { lineNumber: r, column: c } : n;
      }
    }
    class s {
      constructor(n, r) {
        (this._host = n),
          (this._models = Object.create(null)),
          (this._foreignModuleFactory = r),
          (this._foreignModule = null);
      }
      dispose() {
        this._models = Object.create(null);
      }
      _getModel(n) {
        return this._models[n];
      }
      _getModels() {
        let n = [];
        return (
          Object.keys(this._models).forEach(r => n.push(this._models[r])), n
        );
      }
      acceptNewModel(n) {
        this._models[n.url] = new i(
          p.URI.parse(n.url),
          n.lines,
          n.EOL,
          n.versionId
        );
      }
      acceptModelChanged(n, r) {
        if (!this._models[n]) return;
        this._models[n].onEvents(r);
      }
      acceptRemovedModel(n) {
        !this._models[n] || delete this._models[n];
      }
      computeDiff(n, r, c, C) {
        return ie(this, void 0, void 0, function*() {
          const b = this._getModel(n),
            v = this._getModel(r);
          if (!b || !v) return null;
          const w = b.getLinesContent(),
            N = v.getLinesContent(),
            P = new u.DiffComputer(w, N, {
              shouldComputeCharChanges: !0,
              shouldPostProcessCharChanges: !0,
              shouldIgnoreTrimWhitespace: c,
              shouldMakePrettyDiff: !0,
              maxComputationTime: C
            }).computeDiff(),
            U = P.changes.length > 0 ? !1 : this._modelsAreIdentical(b, v);
          return { quitEarly: P.quitEarly, identical: U, changes: P.changes };
        });
      }
      _modelsAreIdentical(n, r) {
        const c = n.getLineCount(),
          C = r.getLineCount();
        if (c !== C) return !1;
        for (let b = 1; b <= c; b++) {
          const v = n.getLineContent(b),
            w = r.getLineContent(b);
          if (v !== w) return !1;
        }
        return !0;
      }
      computeMoreMinimalEdits(n, r) {
        return ie(this, void 0, void 0, function*() {
          const c = this._getModel(n);
          if (!c) return r;
          const C = [];
          let b;
          r = r.slice(0).sort((v, w) => {
            if (v.range && w.range)
              return h.Range.compareRangesUsingStarts(v.range, w.range);
            let N = v.range ? 0 : 1,
              y = w.range ? 0 : 1;
            return N - y;
          });
          for (let { range: v, text: w, eol: N } of r) {
            if ((typeof N == "number" && (b = N), h.Range.isEmpty(v) && !w))
              continue;
            const y = c.getValueInRange(v);
            if (((w = w.replace(/\r\n|\n|\r/g, c.eol)), y === w)) continue;
            if (Math.max(w.length, y.length) > s._diffLimit) {
              C.push({ range: v, text: w });
              continue;
            }
            const P = E.stringDiff(y, w, !1),
              U = c.offsetAt(h.Range.lift(v).getStartPosition());
            for (const R of P) {
              const q = c.positionAt(U + R.originalStart),
                Y = c.positionAt(U + R.originalStart + R.originalLength),
                j = {
                  text: w.substr(R.modifiedStart, R.modifiedLength),
                  range: {
                    startLineNumber: q.lineNumber,
                    startColumn: q.column,
                    endLineNumber: Y.lineNumber,
                    endColumn: Y.column
                  }
                };
              c.getValueInRange(j.range) !== j.text && C.push(j);
            }
          }
          return (
            typeof b == "number" &&
              C.push({
                eol: b,
                text: "",
                range: {
                  startLineNumber: 0,
                  startColumn: 0,
                  endLineNumber: 0,
                  endColumn: 0
                }
              }),
            C
          );
        });
      }
      computeLinks(n) {
        return ie(this, void 0, void 0, function*() {
          let r = this._getModel(n);
          return r ? L.computeLinks(r) : null;
        });
      }
      textualSuggest(n, r, c, C) {
        return ie(this, void 0, void 0, function*() {
          const b = new m.StopWatch(!0),
            v = new RegExp(c, C),
            w = new Set();
          e: for (let N of n) {
            const y = this._getModel(N);
            if (!!y) {
              for (let P of y.words(v))
                if (
                  !(P === r || !isNaN(Number(P))) &&
                  (w.add(P), w.size > s._suggestionsLimit)
                )
                  break e;
            }
          }
          return { words: Array.from(w), duration: b.elapsed() };
        });
      }
      computeWordRanges(n, r, c, C) {
        return ie(this, void 0, void 0, function*() {
          let b = this._getModel(n);
          if (!b) return Object.create(null);
          const v = new RegExp(c, C),
            w = Object.create(null);
          for (let N = r.startLineNumber; N < r.endLineNumber; N++) {
            let y = b.getLineWords(N, v);
            for (const P of y) {
              if (!isNaN(Number(P.word))) continue;
              let U = w[P.word];
              U || ((U = []), (w[P.word] = U)),
                U.push({
                  startLineNumber: N,
                  startColumn: P.startColumn,
                  endLineNumber: N,
                  endColumn: P.endColumn
                });
            }
          }
          return w;
        });
      }
      navigateValueSet(n, r, c, C, b) {
        return ie(this, void 0, void 0, function*() {
          let v = this._getModel(n);
          if (!v) return null;
          let w = new RegExp(C, b);
          r.startColumn === r.endColumn &&
            (r = {
              startLineNumber: r.startLineNumber,
              startColumn: r.startColumn,
              endLineNumber: r.endLineNumber,
              endColumn: r.endColumn + 1
            });
          let N = v.getValueInRange(r),
            y = v.getWordAtPosition(
              { lineNumber: r.startLineNumber, column: r.startColumn },
              w
            );
          if (!y) return null;
          let P = v.getValueInRange(y);
          return a.BasicInplaceReplace.INSTANCE.navigateValueSet(r, N, y, P, c);
        });
      }
      loadForeignModule(n, r, c) {
        const C = (w, N) => this._host.fhr(w, N);
        let v = {
          host: g.createProxyObject(c, C),
          getMirrorModels: () => this._getModels()
        };
        return this._foreignModuleFactory
          ? ((this._foreignModule = this._foreignModuleFactory(v, r)),
            Promise.resolve(g.getAllMethodNames(this._foreignModule)))
          : new Promise((w, N) => {
              I(
                [n],
                y => {
                  (this._foreignModule = y.create(v, r)),
                    w(g.getAllMethodNames(this._foreignModule));
                },
                N
              );
            });
      }
      fmr(n, r) {
        if (!this._foreignModule || typeof this._foreignModule[n] != "function")
          return Promise.reject(
            new Error("Missing requestHandler or method: " + n)
          );
        try {
          return Promise.resolve(
            this._foreignModule[n].apply(this._foreignModule, r)
          );
        } catch (c) {
          return Promise.reject(c);
        }
      }
    }
    (t.EditorSimpleWorker = s),
      (s._diffLimit = 1e5),
      (s._suggestionsLimit = 1e4);
    function d(S) {
      return new s(S, null);
    }
    (t.create = d),
      typeof importScripts == "function" &&
        (M.globals.monaco = _.createMonacoBaseAPI());
  }),
    (function() {
      var I, t;
      const E = self.MonacoEnvironment,
        M = E && E.baseUrl ? E.baseUrl : "../../../",
        p =
          typeof ((I = self.trustedTypes) === null || I === void 0
            ? void 0
            : I.createPolicy) == "function"
            ? (t = self.trustedTypes) === null || t === void 0
              ? void 0
              : t.createPolicy("amdLoader", {
                  createScriptURL: f => f,
                  createScript: (f, ...L) => {
                    const a = L.slice(0, -1).join(","),
                      _ = L.pop().toString();
                    return `(function anonymous(${a}) {
${_}
})`;
                  }
                })
            : void 0;
      function o() {
        return new Promise((f, L) => {
          if (typeof self.define == "function" && self.define.amd) return f();
          const a = M + "vs/loader.js";
          if (
            !(
              /^((http:)|(https:)|(file:))/.test(a) &&
              a.substring(0, self.origin.length) !== self.origin
            )
          ) {
            fetch(a)
              .then(g => {
                if (g.status !== 200) throw new Error(g.statusText);
                return g.text();
              })
              .then(g => {
                (g = `${g}
//# sourceURL=${a}`),
                  (p ? self.eval(p.createScript("", g)) : new Function(g)).call(
                    self
                  ),
                  f();
              })
              .then(void 0, L);
            return;
          }
          p ? importScripts(p.createScriptURL(a)) : importScripts(a), f();
        });
      }
      const h = function(f) {
        o().then(() => {
          require.config({ baseUrl: M, catchError: !0, trustedTypesPolicy: p }),
            require([f], function(L) {
              setTimeout(function() {
                let a = L.create((_, g) => {
                  self.postMessage(_, g);
                }, null);
                for (self.onmessage = _ => a.onmessage(_.data); l.length > 0; )
                  self.onmessage(l.shift());
              }, 0);
            });
        });
      };
      let u = !0,
        l = [];
      self.onmessage = f => {
        if (!u) {
          l.push(f);
          return;
        }
        (u = !1), h(f.data);
      };
    })();
}.call(this));

//# sourceMappingURL=../../../../min-maps/vs/base/worker/workerMain.js.map
