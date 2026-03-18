terraform {
  required_version = ">= 1.5"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "ap-southeast-2"
}

module "vpc" {
  source = "../modules/vpc"

  cidr_block = "10.20.0.0/16"
}

module "eks" {
  source = "../modules/eks"

  cluster_name = "devops-demo"

  vpc_id     = module.vpc.vpc_id
  subnet_ids = module.vpc.public_subnets
}

module "ecr" {
  source = "../modules/ecr"
}

output "vpc_id" {
  value = module.vpc.vpc_id
}

output "public_subnets" {
  value = module.vpc.public_subnets
}

output "ecr_repository_url" {
  value = module.ecr.repository_url
}