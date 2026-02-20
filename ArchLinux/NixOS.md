
```
sudo -i
parted /dev/sda -- mklabel gpt
parted /dev/sda -- mkpart primary 512MB -8GB
parted /dev/sda -- mkpart primary linux-swap -8GB 100%
parted /dev/sda -- mkpart ESP fat32 1MB 512MB
parted /dev/sda -- set 3 esp on

mkfs.ext4 -L nixos /dev/sda1
mkswap -L swap /dev/sda2
mkfs.fat -F 32 -n boot /dev/sda3

mount /dev/disk/by-label/nixos /mnt
mkdir -p /mnt/boot
mount /dev/disk/by-label/boot /mnt/boot
swapon /dev/sda2
nixos-generate-config --root /mnt
vim /mnt/etc/nixos/configuration.nix
nixos-install
reboot


vi /etc/nixos/configuration.nix

networking.hostName = "nixos"; # Define your hostname.
time.timeZone = "Asia/Seoul";
i18n.defaultLocale = "en_US.UTF-8";

services.xserver.enable = true;
services.xserver.displayManager.lightdm.enable = false;
services.xserver.displayManager.startx.enable = true;
services.xserver.windowManager.dwm.enable = true;

  # NVIDIA 드라이버 설정 (GTX 1080 Ti)
  nixpkgs.config.allowUnfree = true;
  services.xserver.videoDrivers = [ "nvidia" ];
  hardware.nvidia.package = config.boot.kernelPackages.nvidiaPackages.stable;
  hardware.nvidia.open = false;
  hardware.opengl.enable = true;


i18n.inputMethod = {
    enabled = "fcitx5";
    fcitx5.addons = with pkgs; [ fcitx5-hangul ];
  };

fonts.fonts = with pkgs; [
	noto-fonts
	noto-fonts-cjk
	noto-fonts-emoji
];

services.httpd.enable = true;
services.httpd.adminAddr = "master@localhost.com";
services.httpd.virtualHosts."localhost" = {
  documentRoot  = "/var/www";
  extraConfig = ''
    ScriptAlias "/cgi-bin/" "/var/www/cgi-bin/"
   '';
};

hardware.bluetooth.enable = true;
services.blueman.enable = true;

sound.enable = true;

  environment.systemPackages = with pkgs; [
  #   vim # Do not forget to add an editor to edit configuration.nix! The Nano editor is also installed by default.
  #   wget
    ed dmenu st ntfs3g moc zathura btop
    (st.overrideAttrs (oldAttrs: rec {
      configFile = writeText "config.def.h" (builtins.readFile /root/Temp/st.h);
      postPatch = "${oldAttrs.postPatch}\n cp ${configFile} config.def.h";
    }))
  ];

services.openssh.enable = true;
services.openssh.settings.PermitRootLogin = "yes";


# Post Install & Configuration

cat .xinitrc
exec amixer set IEC958 unmute &

export XMODIFIERS=@im=fcitx
export QT_IM_MODULE=fcitx
export GTK_IM_MODULE=fcitx

exec xrandr --rate 75 &
exec xset s off &
exec xset -dpms &

exec fcitx5 &


exec dwm

chmod 755 .xinitrc


# Modify /etc/nixos/configuration.nix
nixos-rebuild switch


# Package MGMT
nix-env -i (install) -e (remove) -qa | grep pkg_name | q (installed list)
nix-collect-garbage



# mount /nix/store RW
mount -o remount,rw /nix/store 


# Bluetooth 
bluetoothctl
power on
agent on
default-agent
scan on
pair XX:YY
connect XX:YY
trust [XX:YY]


# fcitx5
fcitx5-configtool => "Input Method" => "Available Input Method" => Search Input Method => Korea => Hangul => "<"
한글 키 or Ctrl + Space
```





