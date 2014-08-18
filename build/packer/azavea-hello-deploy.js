{
  "variables": {
    "name": "azavea/hello",
    "version": "0.1.0",
    "aws_access_key": "{{env `AWS_ACCESS_KEY_ID`}}",
    "aws_secret_key": "{{env `AWS_SECRET_ACCESS_KEY`}}"
  },
  "builders": [
    {
      "name": "azavea/hello-docker",
      "type": "docker",
      "image": "ubuntu:14.04",
      "pull": false,
      "export_path": "image.tar"
    },
    {
      "name": "azavea/hello-ami",
      "type": "amazon-ebs",
      "access_key": "{{user `aws_access_key`}}",
      "secret_key": "{{user `aws_secret_key` }}",
      "region": "us-east-1",
      "source_ami": "ami-a83eecc0",
      "instance_type": "t1.micro",
      "security_group_id": "sg-d110f4b8",
      "ssh_username": "ubuntu",
      "ami_name": "{{user `name`}}-{{user `version`}}-{{timestamp}}",
      "tags": {
        "name": "{{user `name`}}",
        "version": "{{user `version`}}"
      }
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
      "playbook_file": "/vagrant/build/ansible/deploy.yml",
      "playbook_dir": "/vagrant/build/ansible",
      "extra_arguments": "--sudo"
    }
  ],
  "post-processors": [
    {
      "type": "docker-import",
      "repository": "{{user `name`}}",
      "tag": "{{user `version`}}",
      "only": [
        "azavea/hello-docker"
      ]
    }
  ]
}
