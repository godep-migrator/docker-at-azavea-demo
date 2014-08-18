{
  "variables": {
    "name": "azavea/hello",
    "version": "develop"
  },
  "builders": [
    {
      "name": "azavea/hello-develop",
      "type": "docker",
      "image": "ubuntu:14.04",
      "pull": false,
      "export_path": "image.tar"
    }
  ],
  "provisioners": [
    {
      "type": "shell",
      "inline": [
        "sudo apt-get update -qq",
        "sudo apt-get install software-properties-common -y",
        "sudo apt-add-repository ppa:rquillo/ansible -y",
        "sudo apt-get update -qq",
        "sudo apt-get install ansible -y",
        "sudo apt-get clean && sudo rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*"
      ]
    },
    {
      "type": "ansible-local",
      "playbook_file": "/vagrant/build/ansible/develop.yml",
      "playbook_dir": "/vagrant/build/ansible",
      "extra_arguments": "--sudo"
    }
  ],
  "post-processors": [
    {
      "type": "docker-import",
      "repository": "{{user `name`}}",
      "tag": "{{user `version`}}"
    }
  ]
}
