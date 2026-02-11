# Arch Linux My System Step!!

```bash
archinstall
pjkwon add user / manual part - f2fs suggestion layout / Asia/Seoul => Install & reboot
 

# pacman -S intel-ucode linux-firmware base-devel git 



# curl -O http://www.edbrowse.org/static/edbrowse-x86_64
# mv edbrowse-x86_64 /usr/bin/edb
# chmod 755 /usr/bin/edb


# su - pjkwon
$ git clone https://aur.archlinux.org/yay
$ makepkg -si

$ yay -Syuu

$ yay -S libx11 libxft libxinerama xorg xorg-xinit noto-fonts-cjk terminus-font 
            moc-pulse bluez bluez-utils qutebrowser nvim neovide alsa-utils 
            zsh zsh-autosuggestions zsh-syntax-highlighting

~/.config/qutebrowser/config.py
~/.config/nvim/init.vim
~/.zshrc

$ chsh  => /usr/bin/zsh


$ yay -S kime-bin  ? (build failed...   kime-git OK but heavy package need)


$ yay -S dwm dmenu

$ git clone https://git.suckless.org/st, slstatus
$ cd {st, slstaus}; => mv config.def.h config.h

$ ed .build/st/config.h
$ static char *font = "xos4 Terminus:pixelsize=18:antialias=true:autohint=true";

ed .build/slstatus/config.h
/* function format          argument */
	{ cpu_perc, "CPU: %s %% | ", NULL },
	{ ram_used, "RAM: %s | ", NULL },
	{ netspeed_rx, "Net: %s | ", "enp3s0" },
	{ uptime, "Run: %s | ", NULL },
	{ datetime, "%s",           "%F %T" },

/st/slstatus => make && sudo make clean install

$ edb /home/pjkwon/.xinitrc

export XMODIFIERS=@im=kime    
export QT_IM_MODULE=kime      
export GTK_IM_MODULE=kime     

exec xrandr --rate 75 &
exec xset s off &
exec xset -dpms &
exec kime-xim &               
exec slstatus &

exec dwm


$ startx


▶  bluetooth:
# systemctl enable bluetooth
# systemctl start bluetooth (or reboot)
# bluetoothctl
power on
agent on
default-agent
scan on
pair XX:XX:XX
connect XX:XX:XX
trust XX:XX:XX

▶  Yaft FrameBuffer Terminal with Hangul key (working root)
# pacman -S libhangul
# git clone https://github.com/uobikiemukot/yaft.git
# cd yaft
# patch -p1 < hangul.patch
# edb tools/mkfont_bdf.c  -> 1st line added
#define _GNU_SOURCE
#include <wchar.h>
# make 
# make install

# cd /root
# dumpkeys > kmap
string F60 = "\200"  (add)

keycode 100 = AltGr
    alt	keycode 100 = AltGr
    shift keycode 57 = F60

# ed /etc/vconsole.conf
KMAP=/root/kmap

yaft -> Shift + Space (Han/Eng)
```
