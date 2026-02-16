# Alpine Linux Installation Guide [2026.02]

```
login root
setup-alpine
[INSTALL NORMALY] pjkwon useradd
reboot

login pjkwon

su -

apk update; apk upgrade; apk add doas

doas apk add vim

vim /etc/apk/repositories (Remove community comment)

apk update

setup-xorg-base

vim /etc/doas.conf (Remove permit persiste : whell comment)

adduser pjkwon wheel

doas apk add rust cargo libx11-dev libxft-dev libxinerama-dev git dmenu st dillo qutebrowser xwallpaper


git clone https://github.com/tonybanters/oxwm
cd oxwm
cargo build --release
doas cp target/release/oxwm /usr/bin/oxwm

doas apk add picom font-terminus-nerd
fc-list |grep nerd   (Terminess Nerd Font Mono)

vim .config/oxwm/config.lua (Change bar_font = "Terminess Nerd Font Mono:~)

doas apk add pcmanfm


vim .xinitrc
xset r rate 200 35 &
picon &
xwallpaper --zoom ~/wall.jpg &
exec oxwm;


```
