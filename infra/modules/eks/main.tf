############################################
# EKS CLUSTER
############################################

module "eks" {
  source  = "terraform-aws-modules/eks/aws"
  version = "~> 20.0"

  cluster_name    = var.cluster_name
  cluster_version = "1.29"

  vpc_id     = var.vpc_id
  subnet_ids = var.subnet_ids

  cluster_endpoint_public_access  = true
  cluster_endpoint_private_access = true

  eks_managed_node_groups = {
    default = {
      desired_size = 2
      max_size     = 3
      min_size     = 1

      instance_types = ["t3.medium"]
    }
  }
}

############################################
# EKS ACCESS ENTRY (IAM → KUBERNETES)
############################################

resource "aws_eks_access_entry" "terraform_admin" {
  cluster_name  = module.eks.cluster_name
  principal_arn = "arn:aws:iam::869935080468:user/terraform"
  type          = "STANDARD"

  depends_on = [module.eks]
}

############################################
# ACCESS POLICY (ADMIN)
############################################

resource "aws_eks_access_policy_association" "terraform_admin" {
  cluster_name  = module.eks.cluster_name
  principal_arn = "arn:aws:iam::869935080468:user/terraform"

  policy_arn = "arn:aws:eks::aws:cluster-access-policy/AmazonEKSClusterAdminPolicy"

  access_scope {
    type = "cluster"
  }

  depends_on = [module.eks]
}