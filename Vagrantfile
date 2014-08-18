# -*- mode: ruby -*-
# vi: set ft=ruby :

$deps = <<SCRIPT

export PACKER_VERSION="0.6.1"

# Install dependencies
if ! dpkg -s unzip > /dev/null 2>&1; then
  apt-get install -y unzip
fi

# Install Packer
if [ ! -e "${HOME}/${PACKER_VERSION}_linux_amd64.zip" ]; then
  wget -q -O "${HOME}/${PACKER_VERSION}_linux_amd64.zip" \
    "https://dl.bintray.com/mitchellh/packer/${PACKER_VERSION}_linux_amd64.zip"
fi
if [ ! -e "/usr/local/bin/packer" ]; then
  unzip "${HOME}/${PACKER_VERSION}_linux_amd64.zip" -d /usr/local/bin/
fi

SCRIPT

def local_ip
  `ipconfig getifaddr eth0 || ipconfig getifaddr en0`.strip
end

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  # Official Ubuntu 14.04 image on Vagrant Cloud
  config.vm.box = "ubuntu/trusty64"

  config.vm.hostname = "hello"
  config.vm.network "forwarded_port", guest: 3000, host: 3000

  # Wire up the proxy
  if Vagrant.has_plugin?("vagrant-proxyconf")
    config.proxy.http     = "http://#{local_ip}:8123/"
    config.proxy.https    = "http://#{local_ip}:8123/"
    config.proxy.no_proxy = "localhost,127.0.0.1"
  end

  # Install Docker
  config.vm.provision "docker"

  # Install Packer
  config.vm.provision "shell", inline: $deps
end
