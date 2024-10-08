!function (e) {
    var t = {}; // 缓存已加载模块
    function n(i) {
        if (t[i]) return t[i].exports; // 如果模块已加载，直接返回导出的内容
        var r = t[i] = { i: i, l: false, exports: {} }; // 创建模块实例
        e[i].call(r.exports, r, r.exports, n); // 执行模块函数
        r.l = true; // 标记模块为已加载
        return r.exports; // 返回模块导出的内容
    }
    n.m = e; // 保存模块列表
    n.c = t; // 保存缓存
    n.d = function (e, t, i) {
        if (!n.o(e, t)) {
            Object.defineProperty(e, t, { configurable: false, enumerable: true, get: i });
        }
    };
    n.n = function (e) {
        var t = e && e.__esModule ? function () { return e.default; } : function () { return e; };
        n.d(t, 'a', t);
        return t;
    };
    n.o = function (e, t) { return Object.prototype.hasOwnProperty.call(e, t); };
    n.p = ""; // 公共路径
    n(n.s = 0); // 入口点
}([
    function (e, t, n) {
        "use strict";
        n(1); // 引入第一个模块
        n(2); // 引入第二个模块
    },
    function (e, t) {
        // 第一个模块内容
    },
    function (e, t, n) {
        "use strict";
        var i = function () {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || false;
                    i.configurable = true;
                    if ("value" in i) i.writable = true;
                    Object.defineProperty(e, i.key, i);
                }
            }
            return function (t, n, i) {
                if (n) e(t.prototype, n);
                if (i) e(t, i);
                return t;
            };
        }();

        new (function () {
            function e() {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }(this, e);
                this.three = {
                    renderer: new THREE.WebGLRenderer(),
                    clock: new THREE.Clock(),
                    camera: new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .1, 1000),
                    scene: new THREE.Scene(),
                    light: new THREE.PointLight(16777215),
                    stats: new Stats(),
                    controls: null,
                    blocker: document.getElementById("blocker"),
                    instructions: document.getElementById("instructions")
                };
                this.state = {
                    controlsEnabled: false,
                    moveForward: false,
                    moveBackward: false,
                    moveLeft: false,
                    moveRight: false,
                    canJump: false,
                    spaceUp: true,
                    velocity: new THREE.Vector3(),
                    direction: new THREE.Vector3(),
                    rotation: new THREE.Vector3()
                };
                this.ray = {
                    upRaycaster: new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 1, 0), 0, .3),
                    horizontalRaycaster: new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(), 0, .3),
                    downRaycaster: new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, -1, 0), 0, .3)
                };
                this.help = {
                    up: new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(), .1, 65280),
                    horizontal: new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(), .1, 65535),
                    down: new THREE.ArrowHelper(new THREE.Vector3(0, -1, 0), new THREE.Vector3(), .1, 16776960),
                    group: new THREE.Group()
                };
                this.settings = {
                    speed: 40,
                    upSpeed: 0
                };
                this.dop = new Dop();
                this._draw();
            }

            i(e, [{
                key: "_initRender",
                value: function () {
                    var e = this.three.renderer;
                    e.setPixelRatio(window.devicePixelRatio);
                    e.setSize(window.innerWidth, window.innerHeight);
                    document.body.appendChild(e.domElement);
                }
            }, {
                key: "_initCamera",
                value: function () {
                    this.three.camera;
                }
            }, {
                key: "_initScene",
                value: function () {
                    this.three.scene;
                }
            }, {
                key: "_initLight",
                value: function () {
                    var e = this.three,
                        t = e.scene;
                    t.add(new THREE.AmbientLight(4473924));
                    var n = e.light;
                    n.position.set(0, 50, 0);
                    t.add(n);
                }
            }, {
                key: "_initStats",
                value: function () {
                    var e = this.three.stats;
                    document.body.appendChild(e.dom);
                }
            }, {
                key: "_initControls",
                value: function () {
                    var e = this.three,
                        t = e.scene,
                        n = e.camera;
                    e.controls = new THREE.PointerLockControls(n);
                    var i = e.controls,
                        r = this.state,
                        a = r.velocity,
                        o = this.settings;
                    t.add(i.getObject());
                    document.addEventListener("keydown", function (e) {
                        switch (e.keyCode) {
                            case 38: case 87:
                                r.moveForward = true;
                                break;
                            case 37: case 65:
                                r.moveLeft = true;
                                break;
                            case 40: case 83:
                                r.moveBackward = true;
                                break;
                            case 39: case 68:
                                r.moveRight = true;
                                break;
                            case 32:
                                if (r.canJump && r.spaceUp) {
                                    a.y += o.upSpeed;
                                }
                                r.canJump = false;
                                r.spaceUp = false;
                        }
                    }, false);
                    document.addEventListener("keyup", function (e) {
                        switch (e.keyCode) {
                            case 38: case 87:
                                r.moveForward = false;
                                break;
                            case 37: case 65:
                                r.moveLeft = false;
                                break;
                            case 40: case 83:
                                r.moveBackward = false;
                                break;
                            case 39: case 68:
                                r.moveRight = false;
                                break;
                            case 32:
                                r.spaceUp = true;
                        }
                    }, false);
                }
            }, {
                key: "_initModule",
                value: function () {
                    var e = this.help,
                        t = this.help.group;
                    new THREE.AxesHelper(50);
                    t.add(e.up);
                    t.add(e.horizontal);
                    t.add(e.down);
                    var i = n(3);
                    this.module = new i(this);
                }
            }, {
                key: "_initPointerLock",
                value: function () {
                    var e = this.three,
                        t = this.state,
                        n = e.blocker,
                        i = e.instructions;
                    if ("pointerLockElement" in document || "mozPointerLockElement" in document || "webkitPointerLockElement" in document) {
                        var r = document.body,
                            a = function (a) {
                                document.pointerLockElement === r || document.mozPointerLockElement === r || document.webkitPointerLockElement === r ? (t.controlsEnabled = true, e.controls.enabled = true, n.style.display = "none") : (e.controls.enabled = false, n.style.display = "block", i.style.display = "");
                            },
                            o = function (e) {
                                i.style.display = "";
                            };
                        document.addEventListener("pointerlockchange", a, false);
                        document.addEventListener("mozpointerlockchange", a, false);
                        document.addEventListener("webkitpointerlockchange", a, false);
                        document.addEventListener("pointerlockerror", o, false);
                        document.addEventListener("mozpointerlockerror", o, false);
                        document.addEventListener("webkitpointerlockerror", o, false);
                        i.addEventListener("click", function (e) {
                            i.style.display = "none";
                            r.requestPointerLock = r.requestPointerLock || r.mozRequestPointerLock || r.webkitRequestPointerLock;
                            r.requestPointerLock();
                        }, false);
                    } else {
                        i.innerHTML = "你的浏览器不支持相关操作，请更换浏览器";
                    }
                }
            }, {
                key: "_onWindowResize",
                value: function () {
                    var e = this.three,
                        t = e.camera,
                        n = e.renderer;
                    t.aspect = window.innerWidth / window.innerHeight;
                    t.updateProjectionMatrix();
                    n.setSize(window.innerWidth, window.innerHeight);
                }
            }, {
                key: "_animate",
                value: function () {
                    var e = this,
                        t = e.three,
                        n = t.stats,
                        i = e.state,
                        r = t.camera,
                        a = t.scene,
                        o = t.renderer,
                        s = e.settings,
                        c = e.module,
                        u = e.ray.horizontalRaycaster,
                        l = e.ray.downRaycaster,
                        d = s.speed,
                        h = t.controls.getObject();

                    !function () {
                        var n = i.moveForward,
                            r = i.moveBackward,
                            o = i.moveLeft,
                            s = i.moveRight,
                            m = i.velocity,
                            p = i.direction,
                            v = i.rotation,
                            w = t.clock.getDelta();

                        if (i.controlsEnabled) {
                            m.x -= 30 * m.x * w;
                            m.z -= 30 * m.z * w;
                            m.y -= 9.8 * w;
                            p.z = Number(n) - Number(r);
                            p.x = Number(o) - Number(s);
                            p.normalize();
                            v.copy(h.getWorldDirection().multiply(new THREE.Vector3(-1, 0, -1)));
                            var y = new THREE.Matrix4();
                            if (p.z > 0) {
                                if (p.x > 0) y.makeRotationY(Math.PI / 4);
                                else if (p.x < 0) y.makeRotationY(-Math.PI / 4);
                                else y.makeRotationY(0);
                            } else if (p.z < 0) {
                                if (p.x > 0) y.makeRotationY(Math.PI / 4 * 3);
                                else if (p.x < 0) y.makeRotationY(-Math.PI / 4 * 3);
                                else y.makeRotationY(Math.PI);
                            } else {
                                if (p.x > 0) y.makeRotationY(Math.PI / 2);
                                else if (p.x < 0) y.makeRotationY(-Math.PI / 2);
                            }
                            v.applyMatrix4(y);
                            u.set(h.position, v);
                            var E = !1;
                            if (c.mesh) E = u.intersectObject(c.mesh).length > 0;
                            if (c.end && u.intersectObject(c.end).length > 0) {
                                e.dop.msg("恭喜过关，等级+1！！！再接再厉");
                                e.data.level++;
                                c.update(e.data);
                                // 跳转到 index1.html
                                window.location.href = "index.html"
                            }
                            if (!E) {
                                if ((n || r) && (m.z -= p.z * d * w), (o || s) && (m.x -= p.x * d * w));
                                l.ray.origin.copy(h.position);
                                l.ray.origin.y -= .1;
                                if (l.intersectObjects(a.children, true).length > 0) {
                                    m.y = Math.max(0, m.y);
                                    i.canJump = true;
                                }
                                h.translateX(m.x * w);
                                h.translateY(m.y * w);
                                h.translateZ(m.z * w);
                                if (h.position.y < .1) {
                                    m.y = 0;
                                    h.position.y = .1;
                                    i.canJump = true;
                                }
                            }
                        }
                    }();
                    n.update();
                    o.render(a, r);
                    requestAnimationFrame(function () { e._animate(); });
                }
            }, {
                key: "_draw",
                value: function () {
                    var e = this;
                    Detector.webgl || Detector.addGetWebGLMessage();
                    e._initPointerLock();
                    e._initRender();
                    e._initScene();
                    e._initCamera();
                    e._initLight();
                    e._initControls();
                    e._initStats();
                    e._initModule();
                    e.updateModule("./index.json");
                    e._animate();
                    window.onresize = function () { e._onWindowResize(); };
                }
            }, {
                key: "launchFullScreen",
                value: function (e) {
                    e.requestFullscreen ? e.requestFullscreen() :
                        e.mozRequestFullScreen ? e.mozRequestFullScreen() :
                            e.webkitRequestFullscreen ? e.webkitRequestFullscreen() :
                                e.msRequestFullscreen && e.msRequestFullscreen();
                }
            }, {
                key: "updateModule",
                value: function (e) {
                    var t = this,
                        n = t.dop,
                        i = t.module;
                    n.get(e, function (e) {
                        t.data = JSON.parse(e);
                        i.update(t.data);
                    });
                }
            }]);
            return e;
        }());
    },
    function (e, t, n) {
        "use strict";
        var i = function () {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || false;
                    i.configurable = true;
                    if ("value" in i) i.writable = true;
                    Object.defineProperty(e, i.key, i);
                }
            }
            return function (t, n, i) {
                if (n) e(t.prototype, n);
                if (i) e(t, i);
                return t;
            };
        }();

        var r = function () {
            function e(t) {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }(this, e);
                this.main = t;
                var i = n(4);
                this.prim = new i();
            }

            i(e, [{
                key: "update",
                value: function (e) {
                    this._createWallpaper(e);
                    this._createMonster(e.monster);
                    this._updateBorn(e.born);
                }
            }, {
                key: "_updateBorn",
                value: function (e) {
                    var t = this.main.three.controls;
                    t.getObject().position.x = e[0];
                    t.getObject().position.y = e[1];
                    t.getObject().position.z = e[2];
                }
            }, {
                key: "_createWallpaper",
                value: function (e) {
                    var t = this.main,
                        n = t.three.scene,
                        i = t.three.clock,
                        r = e.level + 2,
                        a = this.prim.generate(r, r, [1, 1], [2 * r - 1, 2 * r - 1]),
                        o = e.image.wallpaper,
                        s = void 0,
                        c = (new THREE.TextureLoader()).load(o),
                        u = new THREE.MeshLambertMaterial({ map: c, side: THREE.DoubleSide });

                    this._updateEnd({ x: 2 * r - 1, y: 0, z: 2 * r - 1 });
                    if (this.mesh) {
                        this.mesh.geometry.dispose();
                        n.remove(this.mesh);
                    }
                    for (var l = 0; l < a.length; l++) {
                        var d = a[l],
                            h = new THREE.CubeGeometry(1, 1, 1),
                            m = new THREE.Mesh(h, u);
                        m.position.set(d.x, d.y + .5, d.z);
                        var p = new ThreeBSP(m);
                        s = 0 === l ? p : s.union(p);
                    }
                    this.mesh = s.toMesh();
                    this.mesh.geometry.computeFaceNormals();
                    this.mesh.geometry.computeVertexNormals();
                    this.mesh.material = u;
                    this.mesh.name = "wallpaper";
                    n.add(this.mesh);
                    i.getDelta();
                    document.getElementById("text").innerText = "第 5 关";
                }
            }, {
                key: "_createMonster",
                value: function () {
                    // 未实现
                }
            }, {
                key: "_updateEnd",
                value: function (e) {
                    if (!this.end) {
                        var t = this.main.three.scene;
                        this.end = new THREE.Mesh(new THREE.OctahedronGeometry(.3, 0), new THREE.MeshPhongMaterial({ color: 65535 }));
                        t.add(this.end);
                    }
                    this.end.position.set(e.x, e.y + .3, e.z);
                }
            }]);
            return e;
        }();
        e.exports = r;
    },
    function (e, t, n) {
        "use strict";
        var i = function () {
            function e(e, t) {
                for (var n = 0; n < t.length; n++) {
                    var i = t[n];
                    i.enumerable = i.enumerable || false;
                    i.configurable = true;
                    if ("value" in i) i.writable = true;
                    Object.defineProperty(e, i.key, i);
                }
            }
            return function (t, n, i) {
                if (n) e(t.prototype, n);
                if (i) e(t, i);
                return t;
            };
        }();

        var r = function () {
            function e() {
                !function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }(this, e);
            }

            i(e, [{
                key: "random",
                value: function (e) {
                    return Math.floor(Math.random() * e);
                }
            }, {
                key: "generate",
                value: function (e, t, n, i) {
                    var r = this;
                    this.col = t;
                    this.row = e;
                    this.start = n;
                    this.end = i;
                    this.mazeDataArray = [];
                    for (var a = 0; a < 2 * this.col + 1; a++) {
                        for (var o = [], s = 0; s < 2 * this.row + 1; s++) {
                            if (a % 2 == 0 || s % 2 == 0) o.push({ value: 0, i: a, j: s });
                            else o.push({ value: 1, isVisited: false, i: a, j: s });
                        }
                        this.mazeDataArray[a] = o;
                    }
                    var c = this.mazeDataArray[2 * this.random(this.row) + 1][2 * this.random(this.col) + 1];
                    c.isVisited = true;
                    var u = [];
                    u.push(c);
                    while (c.isVisited) {
                        var l = this.mazeDataArray[c.i - 2] ? this.mazeDataArray[c.i - 2][c.j] : { isVisited: true },
                            d = this.mazeDataArray[c.j + 2] ? this.mazeDataArray[c.i][c.j + 2] : { isVisited: true },
                            h = this.mazeDataArray[c.i + 2] ? this.mazeDataArray[c.i + 2][c.j] : { isVisited: true },
                            m = this.mazeDataArray[c.j - 2] ? this.mazeDataArray[c.i][c.j - 2] : { isVisited: true },
                            p = [];
                        if (l.isVisited || p.push(l), d.isVisited || p.push(d), h.isVisited || p.push(h), m.isVisited || p.push(m), p.length !== 0) {
                            var v = p[r.random(p.length)];
                            this.mazeDataArray[(v.j + c.j) / 2][(v.i + c.i) / 2].value = 1;
                            v.isVisited = true;
                            u.push(v);
                            c = v;
                        } else {
                            if ("break" === function () {
                                if (!(c = u[r.random(u.length)])) return "break";
                                c.isVisited = true;
                                var e = [];
                                u.forEach(function (t) {
                                    t !== c && e.push(t);
                                });
                                u = e;
                            }()) break;
                        }
                    }
                    this.mazeDataArray[this.start[0]][this.start[1]] = { i: this.start[0], j: this.start[1], value: 1 };
                    this.mazeDataArray[this.end[0]][this.end[1]] = { i: this.end[0], j: this.end[1], value: 1 };
                    var w = [];
                    for (var y = 0; y < this.mazeDataArray.length; y++) {
                        var E = this.mazeDataArray[y];
                        for (var f = 0; f < E.length; f++) {
                            if (E[f].value) w.push({ x: E[f].i, y: 0, z: E[f].j });
                        }
                    }
                    return w;
                }
            }]);
            return e;
        }();
        e.exports = r;
    }
]);
