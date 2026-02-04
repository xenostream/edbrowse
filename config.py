# C:\Users\PJKwon\AppData\Roaming\qutebrowser\config\config.py

config.load_autoconfig()

# ====================== UI / Appearance ==================== {{{
c.statusbar.show = "always"
c.tabs.show = "multiple"
c.tabs.title.format = "{audio}{current_title}"
c.fonts.web.size.default = 18


# Private Browsing   per session   :open -p
#c.content.private_browsing = True

# Dark mode (site-aware / time-based themes unaffected)
c.colors.webpage.darkmode.enabled = True
# }}}

# Exclude dark mode
config.set(
    "colors.webpage.darkmode.enabled",
    False,
    "https://blog.naver.com/*"
)

# ====================== User Agent ========================== {{{
c.content.headers.user_agent = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
    "AppleWebKit/537.36 (KHTML, like Gecko) "
    "Chrome/120.0.0.0 Safari/537.36"
)
# }}}

# ====================== Hardware Acceleration (Windows) ==== {{{
c.qt.args = [
    "ignore-gpu-blacklist",
    "enable-gpu-rasterization",
    "enable-native-gpu-memory-buffers",
    "num-raster-threads=4",
    "enable-zero-copy",
    "use-angle=d3d11",
    "enable-smooth-scrolling",
    "enable-features=CanvasOopRasterization",
]
# }}}

# config.bind('<Ctrl-d>', 'yank selection;; open -t https://deepl.com/translator', mode='caret')
config.bind('xx', 'config-cycle colors.webpage.darkmode.enabled')
