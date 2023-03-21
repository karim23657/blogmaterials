
	function cookieCheck(e) {
		return document.cookie.split(";").filter((function(t) {
			return t.trim().startsWith(e)
		})).length > 0
	}

	function isMobile() {
		return /Mobi|Android/i.test(navigator.userAgent)
	}

	function isEmailSubscriber() {
		return cookieCheck("visited_subscribed") || cookieCheck("acuid")
	}

	function createCookie(e, t, o) {
		var n;
		if(o) {
			var i = new Date;
			i.setTime(i.getTime() + 24 * o * 60 * 60 * 1e3), n = "; expires=" + i.toGMTString()
		} else n = "";
		document.cookie = encodeURIComponent(e) + "=" + encodeURIComponent(t) + n + "; path=/"
	}

	function readCookie(e) {
		for(var t = encodeURIComponent(e) + "=", o = document.cookie.split(";"), n = 0; n < o.length; n++) {
			for(var i = o[n];
				" " === i.charAt(0);) i = i.substring(1, i.length);
			if(0 === i.indexOf(t)) return decodeURIComponent(i.substring(t.length, i.length))
		}
		return null
	}

	function showExitIntentModal() {
		readCookie("viewedExitIntentModal") || isEmailSubscriber() || (document.getElementById("exit-modal").style.display = "block", document.body.classList.add("modal-active"), createCookie("viewedExitIntentModal", "true", 365), sendGAPopupEvent())
	}

	function hideExitIntentModal() {
		document.getElementById("exit-modal").style.display = "none", document.body.classList.remove("modal-active")
	}

	function sendGAPopupEvent() {
		window.dataLayer = window.dataLayer || [], window.dataLayer.push({
			event: "showExitIntentModal"
		})
	}

	function hideOnClickOutside(e) {
		var t = function(t) {
				!e.contains(t.target) && isVisible(e) && (hideExitIntentModal(), o())
			},
			o = function() {
				document.removeEventListener("click", t)
			};
		document.addEventListener("click", t)
	}! function() {
		const e = document.getElementById("site-navigation");
		if(!e) return;
		const t = e.getElementsByTagName("button")[0];
		if(void 0 === t) return;
		const o = e.getElementsByTagName("ul")[0];
		if(void 0 === o) return void(t.style.display = "none");
		o.classList.contains("nav-menu") || o.classList.add("nav-menu"), t.addEventListener("click", (function() {
			e.classList.toggle("toggled"), document.body.classList.toggle("menu-toggled"), "true" === t.getAttribute("aria-expanded") ? t.setAttribute("aria-expanded", "false") : t.setAttribute("aria-expanded", "true")
		})), document.addEventListener("click", (function(o) {
			e.contains(o.target) || (e.classList.remove("toggled"), document.body.classList.remove("menu-toggled"), t.setAttribute("aria-expanded", "false"))
		}));
		const n = o.getElementsByTagName("a"),
			i = o.querySelectorAll(".menu-item-has-children > a, .page_item_has_children > a");
		for(var r of n) r.addEventListener("focus", a, !0), r.addEventListener("blur", a, !0);
		for(var r of i) r.addEventListener("touchstart", a, !1);

		function a() {
			if("focus" === event.type || "blur" === event.type) {
				let e = this;
				for(; !e.classList.contains("nav-menu");) "li" === e.tagName.toLowerCase() && e.classList.toggle("focus"), e = e.parentNode
			}
			if("touchstart" === event.type) {
				const t = this.parentNode;
				for(var e of(event.preventDefault(), t.parentNode.children)) t !== e && e.classList.remove("focus");
				t.classList.toggle("focus")
			}
		}
	}(),
	function(e, t) {
		"function" == typeof define && define.amd ? define(t) : "object" == typeof exports ? module.exports = t(require, exports, module) : e.ouibounce = t()
	}(this, (function() {
		return function(e, t) {
			function o(e, t) {
				return void 0 === e ? t : e
			}

			function n(e) {
				var t = 24 * e * 60 * 60 * 1e3,
					o = new Date;
				return o.setTime(o.getTime() + t), "; expires=" + o.toUTCString()
			}

			function i(e) {
				e.clientY > m || c(y, "true") && !s || (E = setTimeout(u, p))
			}

			function r() {
				E && (clearTimeout(E), E = null)
			}

			function a(e) {
				k || c(y, "true") && !s || e.metaKey && 76 === e.keyCode && (k = !0, E = setTimeout(u, p))
			}

			function c(e, t) {
				return function() {
					for(var e = document.cookie.split("; "), t = {}, o = e.length - 1; o >= 0; o--) {
						var n = e[o].split("=");
						t[n[0]] = n[1]
					}
					return t
				}()[e] === t
			}

			function u() {
				d(), v()
			}

			function d() {
				e && (e.style.display = "block"), l()
			}

			function l(e) {
				void 0 !== (e = e || {}).cookieExpire && (h = n(e.cookieExpire)), !0 === e.sitewide && (b = "https://markmanson.net/;path=/"), void 0 !== e.cookieDomain && (g = ";domain=" + e.cookieDomain), void 0 !== e.cookieName && (y = e.cookieName), document.cookie = y + "=true" + h + g + b, w.removeEventListener("mouseleave", i), w.removeEventListener("mouseenter", r), w.removeEventListener("keydown", a)
			}
			var s = (t = t || {}).aggressive || !1,
				m = o(t.sensitivity, 20),
				f = o(t.timer, 1e3),
				p = o(t.delay, 0),
				v = t.callback || function() {},
				h = n(t.cookieExpire) || "",
				g = t.cookieDomain ? ";domain=" + t.cookieDomain : "",
				y = t.cookieName ? t.cookieName : "viewedOuibounceModal",
				b = !0 === t.sitewide ? ";path=/" : "",
				E = null,
				w = document.documentElement;
			setTimeout((function() {
				w.addEventListener("mouseleave", i), w.addEventListener("mouseenter", r), w.addEventListener("keydown", a)
			}), f);
			var k = !1;
			return {
				fire: d,
				disable: l
			}
		}
	})), ouibounce(document.getElementById("exit-modal"), {
		timer: 2e4,
		cookieExpire: 365,
		cookieName: "viewedExitIntentModal",
		callback: function() {
			isEmailSubscriber() || (document.getElementById("exit-modal").style.display = "block", document.body.classList.add("modal-active"), sendGAPopupEvent())
		}
	});
	var isVisible = function(e) {
			return !!e && !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
		},
		modalContent = document.querySelector(".exit-modal__content");

	function scrollUpDetection() {
		var e = getScrollTop(),
			t = getDocumentHeight(),
			o = this;
		t > 0 && (this.interval = setInterval((function() {
			var n = e - getScrollTop();
			n < 0 && (n = 0, e = getScrollTop()), parseFloat(n) / parseFloat(t) > parseFloat(5) / 100 && (clearInterval(o.interval), o.interval = null, o.complete || (showExitIntentModal(), o.complete = !0))
		}), 250))
	}

	function getScrollTop() {
		return window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop || 0
	}

	function getDocumentHeight() {
		return document.documentElement.scrollHeight || document.body.scrollHeight
	}

	function setFormFeedback(e, t, o) {
		var n = o.target.closest(".ajax-form-container"),
			i = t ? ".form-success" : ".form-error",
			r = n.querySelector(i);
		r.innerHTML = e, r.style.display = "block", t && n.querySelectorAll(".hide-on-success").forEach((function(e) {
			e.style.display = "none"
		}))
	}
	hideOnClickOutside(modalContent), document.querySelector(".exit-modal__close-button").addEventListener("click", hideExitIntentModal), document.querySelector(".exit-modal__not-interested").addEventListener("click", hideExitIntentModal), !isMobile() || cookieCheck("viewedExitIntentModal") || isEmailSubscriber() || scrollUpDetection();
	var setButtonEnabled = function(e, t) {
			e ? (t.removeAttribute("disabled"), t.value = t.getAttribute("data-button-value") || "Sign Up") : (t.setAttribute("disabled", "disabled"), t.value = "Submitting...")
		},
		handleFormSubmit = function(e) {
			e.preventDefault();
			var t = e.target.querySelector("input[type=submit");
			if(!t.disabled) {
				setButtonEnabled(!1, t);
				var o = new FormData(e.target);
				fetch("https://markmanson.net/wp-content/plugins/active-campaign-api/opt-in-post.php", {
					method: "POST",
					body: o
				}).then((function(e) {
					return e.json()
				})).then((function(t) {
					"error" === t.status ? setFormFeedback(t.message, !1, e) : (setFormFeedback(t.data && t.data.confirmed ? "You subscribed! Check your inbox." : "Success! Now check your email inbox to confirm your email address.", !0, e), e.target.closest("#exit-modal") && (document.querySelector(".exit-modal__not-interested").innerHTML = "Close"), createCookie("acuid", t.data.contact_id, 365), window.dataLayer = window.dataLayer || [], window.dataLayer.push({
						event: "newsletterOptIn",
						eventAction: e.target.getAttribute("data-event-action") || "No event action specified",
						eventName: e.target.getAttribute("data-event-name"),
						email: e.target.querySelector("input[name=email]") && e.target.querySelector("input[name=email]").value
					}))
				})).catch((function(t) {
					setFormFeedback("Something went wrong.", !1, e)
				})).finally((function() {
					setButtonEnabled(!0, t)
				}))
			}
		};

	function getUrlParameter(e) {
		var t, o, n = window.location.search.substring(1).split("&");
		for(o = 0; o < n.length; o++)
			if((t = n[o].split("="))[0] === e) return void 0 === t[1] || decodeURIComponent(t[1])
	}
	document.querySelectorAll(".ajax-form").forEach((function(e) {
		e.addEventListener("submit", handleFormSubmit)
	})), document.querySelectorAll("a[href*='/subscribe']").forEach((function(e) {
		var t = window.location.pathname;
		"/" == t.charAt(0) && (t = t.substring(1)), "/" == t.charAt(t.length - 1) && (t = t.substring(0, t.length - 1)), "" == t && (t = "homepage"), t = encodeURIComponent(t), e.href.includes("from=") ? e.href += "&from-path=" + t : e.href.includes("?") ? e.href += "&from=" + t : e.href += "?from=" + t
	})), document.querySelectorAll("a[href*='/join/premium-subscription']").forEach((function(e) {
		var t = window.location.pathname;
		"/" == t.charAt(0) && (t = t.substring(1)), "/" == t.charAt(t.length - 1) && (t = t.substring(0, t.length - 1)), "" == t && (t = "homepage"), t = encodeURIComponent(t);
		var o = e.href + "?from=" + t,
			n = getUrlParameter("from"),
			i = getUrlParameter("from-path");
		n && (o = o += "&through=" + encodeURIComponent(n)), i && (o = o += "&through-path=" + encodeURIComponent(i)), e.href = o
	})), document.querySelectorAll("a[href$='/log-in']").forEach((function(e) {
		e.href += "?redirect_to=" + encodeURIComponent(window.location.href)
	})), "/courses" == window.location.pathname ? document.querySelectorAll('.menu-item [href*="/courses"]').forEach((function(e) {
		e.parentElement.classList.add("current-menu-item")
	})) : "/books" == window.location.pathname ? document.querySelectorAll('.menu-item [href*="/books"]').forEach((function(e) {
		e.parentElement.classList.add("current-menu-item")
	})) : "/articles" == window.location.pathname ? document.querySelectorAll('.menu-item [href*="/articles"]').forEach((function(e) {
		e.parentElement.classList.add("current-menu-item")
	})) : "/breakthrough" == window.location.pathname ? document.querySelectorAll('.menu-item [href*="/breakthrough"]').forEach((function(e) {
		e.parentElement.classList.add("current-menu-item")
	})) : "/about" == window.location.pathname && document.querySelectorAll('.menu-item [href*="/about"]').forEach((function(e) {
		e.parentElement.classList.add("current-menu-item")
	}));
	var footnoteTimeout = !1;

	function handleFootnoteClick(e) {
		e.preventDefault();
		var t = document.getElementById("footnotediv");
		t && (t.removeEventListener("mouseout", footnoteMouseout), t.removeEventListener("mouseover", divover), t.remove()), void 0 !== footnoteTimeout && clearTimeout(footnoteTimeout);
		var o = document.createElement("div");
		o.id = "footnotediv";
		var n = e.target.closest("a").getAttribute("href").split("#").pop(),
			i = document.getElementById(n);
		o.innerHTML = i.innerHTML, document.body.appendChild(o), o.addEventListener("mouseout", footnoteMouseout), o.addEventListener("mouseover", divover);
		var r = o.offsetWidth > "400" ? "400px" : "",
			a = "",
			c = "hidden";
		o.offsetHeight > "110" && (a = "150px", c = "auto"), o.style.width = r, o.style.height = a, o.style.overflow = c, document.body.appendChild(o);
		var u = getCoords(e.target),
			d = u.left;
		d + (r = "" === r ? o.offsetWidth : 400) + 30 > window.innerWidth + window.pageXOffset && (d = window.innerWidth - r - 60 + window.pageXOffset);
		var l = u.top + 20;
		l + o.offsetHeight > window.innerHeight + window.pageYOffset && (l = e.target.offsetTop - o.offsetHeight), d < 10 && (d = 10), o.style.top = l + "px", o.style.left = d + "px"
	}

	function footnoteMouseout() {
		var e = document.getElementById("footnotediv");
		e && (e.style.opacity = "0", footnoteTimeout = setTimeout((function() {
			e && e.remove()
		}), 600))
	}

	function divover() {
		var e = document.getElementById("footnotediv");
		e && (e.style.opacity = "1"), clearTimeout(footnoteTimeout)
	}

	function getCoords(e) {
		var t = e.getBoundingClientRect(),
			o = document.body,
			n = document.documentElement,
			i = window.pageYOffset || n.scrollTop || o.scrollTop,
			r = window.pageXOffset || n.scrollLeft || o.scrollLeft,
			a = n.clientTop || o.clientTop || 0,
			c = n.clientLeft || o.clientLeft || 0,
			u = t.top + i - a,
			d = t.left + r - c;
		return {
			top: Math.round(u),
			left: Math.round(d)
		}
	}

	function debounce(e) {
		var t;
		return function(o) {
			t && clearTimeout(t), t = setTimeout(e, 150, o)
		}
	}

	function onResize() {
		(window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) < 680 ? document.querySelectorAll(".fn-ref-mark").forEach((function(e) {
			e.style.pointerEvents = "initial"
		})) : (positionSidenotes(), window.onload = positionSidenotes)
	}

	function positionSidenotes() {
		document.querySelectorAll(".fn-ref-mark").forEach((function(e) {
			e.style.pointerEvents = "none"
		})), document.querySelectorAll(".sidenote-wrap").forEach((function(e) {
			var t = e.dataset.footnoteNum,
				o = document.querySelector("#refmark-" + t).offsetTop,
				n = e.offsetTop,
				i = isNaN(parseInt(e.style.marginTop)) ? 0 : parseInt(e.style.marginTop);
			if(n != o) {
				var r = o - n,
					a = Math.max(i + r, 0);
				e.style.marginTop = a + "px"
			}
		}))
	}
	document.querySelectorAll(".fn-ref-mark").forEach((function(e) {
		e.addEventListener("click", handleFootnoteClick), e.addEventListener("mouseout", footnoteMouseout)
	})), onResize(), window.addEventListener("resize", debounce((function(e) {
		onResize()
	}))), document.querySelector("#footnote-list") && (document.querySelector("#footnote-list").style.display = "none");
	var audio = document.querySelector("#audio-player");

	function playAudio() {
		audio.play(), document.querySelector(".article-audio-player-container").classList.add("article-audio-player-container--fixed"), document.querySelector(".audiojs").classList.add("playing"), document.querySelector(".audio-controls").classList.add("playing")
	}

	function pauseAudio() {
		audio.pause(), document.querySelector(".audio-controls").classList.remove("playing")
	}

	function toggleAudio() {
		audio.paused || audio.ended ? playAudio() : pauseAudio()
	}

	function updateTime() {
		var e = document.querySelector(".scrubber"),
			t = document.querySelector(".scrubber .progress"),
			o = document.querySelector(".time .played"),
			n = document.querySelector(".audio-controls__progress-circle circle");
		o.innerHTML = secondsToHhMmSs(audio.currentTime);
		var i = audio.currentTime / audio.duration;
		t.style.width = e.offsetWidth * i + "px", n.setAttribute("stroke-dashoffset", 157.08 - 157.08 * i)
	}

	function secondsToHhMmSs(e) {
		var t = e >= 3600 ? [11, 16] : [14, 19];
		return new Date(1e3 * e).toISOString().substring(t[0], t[1])
	}
	document.querySelector(".audio-controls__rewind").addEventListener("click", (function() {
		audio.currentTime -= 10
	})), document.querySelector(".pre-play__play-pause").addEventListener("click", toggleAudio), document.querySelector(".audio-controls__play-pause").addEventListener("click", toggleAudio), document.querySelector(".audio-controls__forward").addEventListener("click", (function() {
		audio.currentTime += 10
	})), document.querySelector(".scrubber").addEventListener("click", (function(e) {
		var t = document.querySelector(".scrubber"),
			o = (e.clientX - t.getBoundingClientRect().left) / t.offsetWidth * audio.duration;
		audio.currentTime = o, updateTime()
	})), audio.onended = pauseAudio, audio.ontimeupdate = updateTime, audio.onloadedmetadata = function() {
		document.querySelector(".time .duration").innerHTML = secondsToHhMmSs(audio.duration)
	};


