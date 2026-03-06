# Crux 3.8 on Gigabyte - WD12 UEFI

- [Ref](https://www.both.org/?p=9234)
- [Ref2](https://sudaraka.org/note-to-self/crux-installation-guide/)


```
cfdisk /dev/sda
512MB EFI / 4GB Swap / ALL

mkfs.fat -F32 /sda1
mkswap /dev/sda2
mkfs.ext4 /dev/sda3

mount /dev/sda3 /mnt
mkdir -p /mnt/boot/efi
mount /dev/sda1 /mnt/boot/efi
swapon /dev/sda2

setup

setup-chroot

passwd

vim /etc/fstab
sda1   /
sda2  swap
sda3  /boot/efi


vim /etc/rc.conf
HOSTNAME=crux
TIMEZONE=Asia/Seoul
SERVICES  (....~ dbus)

vim /etc/locale.gen
en_US.UTF-8

locale-gen

echo "crux" > /etc/hostname

vim /etc/hosts
127.0.0.1    crux

cd /usr/src/linux-6.12.23
vim .config
CONFIG_DRM=y
CONFIG_EXT4_FS=y
CONFIG_PCI_MMCONFIG=y
...
CONFIG_NOUVEAU=y
CONFIG_USB=y
CONFIG_USB_STORAGE=y
CONFIG_UAS=y 
CONFIG_SCSI=y 
CONFIG_BLK_DEV_SD=y
CONFIG_JBD2=y 
CONFIG_FS_MBCACHE=y
CONFIG_DEVTMPFS=y 
CONFIG_DEVTMPFS_MOUNT=y 


CONFIG_SND=y
CONFIG_SND_USB_AUDIO=y
CONFIG_SND_HDA_INTEL=n  
CONFIG_SND_HDA_NVEDIA=n 


make olddefconfig
make -j20 all
make modules_install
cp arch/x86/boot/bzImage /boot/vmlinuz-6.12.23
cp System.map /boot


grub-install /boot/efi
grub-mkconfig -o /boot/grub/grub.cfg

exit
umount -R /mnt
swapoff /dev/sda2
reboot
--------------------------------------------------------------------------------------------------------------------------------------------------

> root login

mv /etc/ports/contrib.rsync.inactive /etc/ports/contrib.rsync
vim /etc/prt-get.conf (remove comments)
prtdir /usr/ports/contrib

vim /etc/pkgmk.conf
export CFLAGS="-O2 -march=x86-64"     (remove -pipe)
export JOBS=#(nproc)
export MAKEFLAGS="-j $JOBS"
PKGMK_IGNORE_SIGNATURE="yes"
PKGMK_IGNORE_MD5SUM="yes"
PKGMK_IGNORE_NEW="yes"

ports -u

prt-get depinst git zsh htop


prt-get update alsa-lib
prt-get depinst alsa-utils
prt-get update gettext             (very long times...)
prt-get depinst moc

or 

cd /usr/ports/opt/git
pkgmk -d                             (download)
pkgadd git#2.53.0-1.pkg.tar.gz
git --version

mount /dev/nvme0n1p3 /mnt

cp -R /mnt/Alpine/Crux/Noto /usr/share/fonts
cp -R /mnt/Alpine/Crux/terminus /usr/share/fonts
cp -R /mnt/Alpine/Crux/JetBrains /usr/share/fonts
fc-cache -fv



useradd -m -G wheel,audio,video -s /usr/bin/zsh pjkwon
passwd pjkwon

visudo
%wheel ALL=(ALL:ALL) ALL


--------------------------------------------------------------------------------------------------------------------------------------------------
su pjkwon
cd

cp -R /mnt/Alpine/Crux .
cd Crux
cp -R .zsh .vim ~
cp .vimrc .zshrc .xinitrc ~


exit & re-login pjkwon

mkdir Build
cd Build
git clone https://git.suckless.org/dwm
sudo make clean install

git clone https://git.suckless.org/dmenu
sudo make clean install

git clone https://git.suckless.org/st
vim config.mk
CC = gcc                        (Last line)

sudo make clean install

git clone https://git.suckless.org/slstatus
vim slstatus/config.h
/* function format          argument */
	{ cpu_perc, "CPU: %s %% | ", NULL },
	{ ram_used, "RAM: %s | ", NULL },
	{ netspeed_rx, "Net: %s | ", "enp3s0" },
	{ uptime, "Run: %s | ", NULL },
	{ datetime, "%s",           "%F %T" },

sudo make clean install


setting fonts = Terminus - 16  or Noto Sans Mono CJK KR or JetBrainsMono Nerd Font Mono

startx



# cd /usr/ports/contrib/ntfs-3g
fix link
curl -O https://tuxera.com/opensource/ntfs-3g_ntfsprogs-2022.10.3.tgz
sudo prt-get depinst ntfs-3g

--------------------------------------------------------------------------------------------------------------------------------------------------
# Example Pkg
sudo mkdir -p /usr/ports/custom/xwallpaper
cd /usr/ports/custom/xwallpaper
vim Pkgfile
# Description Wallpaper setting tool
# URL: https://github.com/stoeckmann/xwallpaper
# maintainer: Tony
# Depends on: xorg-libxcb

name=xwallpaper
version=0.7.6
release=1
source=(https://github.com/stoeckmann/$name/releases/download/v$version/$name-$version.tar.xz)

build() {
  cd $name-$version
  ./configure --prefix=/usr
  make
  make DESTDIR=$PKG install
}


sudo pkgmk -d 
sudo pkgadd xwallpaper#0.7.6-1.pkg.tar.gz
which xwallpaper
xwallpaper --zoom walls/wall1.png
--------------------------------------------------------------------------------------------------------------------------------------------------

Use it!
```
