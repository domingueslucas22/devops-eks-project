# 🚀 DevOps EKS Project

This project started as a simple Node.js app running locally… and ended up as a fully deployed cloud-native application on AWS.

The goal was to go beyond theory and actually build something close to a real-world setup using Terraform, Docker, Kubernetes (EKS), and CI/CD with GitHub Actions.

---

## 🧠 What this project does

It deploys a containerized Node.js application to AWS EKS, using:

- Terraform to provision infrastructure  
- Docker to package the app  
- Amazon ECR to store images  
- Kubernetes to run the application  
- GitHub Actions to automate everything  

At the end, the app is exposed to the internet through an AWS Load Balancer.

---

## 🏗️ Architecture (simple view)

Internet → Load Balancer → Kubernetes Service → Pods → Node.js App

---

## 📁 Project structure

app/        # Node.js application  
infra/      # Terraform (VPC, EKS, ECR)  
k8s/        # Kubernetes manifests  
.github/    # CI/CD pipeline  

---

## 🚀 How the pipeline works

Every time I push to `main`, the pipeline:

1. Builds a Docker image  
2. Tags it using the commit SHA  
3. Pushes it to Amazon ECR  
4. Connects to EKS  
5. Deploys using `kubectl apply`  

So the whole flow is automated end-to-end.

---

## 🌐 Application

Application running on AWS EKS:


https://github.com/domingueslucas22/devops-eks-project/blob/main/image/app.png?raw=true<img width="2940" height="1848" alt="image" src="https://github.com/user-attachments/assets/2de06645-9bc0-475e-9d29-ea1acf29bafd" />


---

## ⚙️ CI/CD Pipeline

GitHub Actions pipeline successfully building, pushing and deploying:

https://github.com/domingueslucas22/devops-eks-project/blob/main/image/pipeline.png?raw=true<img width="2940" height="1672" alt="image" src="https://github.com/user-attachments/assets/65031092-2290-40f6-ba03-d768ea0fbd50" />


---

## 🔧 Running manually (if needed)

Terraform:

cd infra/dev  
terraform init  
terraform apply  

Kubernetes:

kubectl apply -f k8s/  

---

## 💥 Challenges I faced

This project wasn’t just plug-and-play. Some real issues I had to solve:

- Kubernetes not connecting after recreating the cluster (kubeconfig mismatch)  
- Docker image architecture mismatch (ARM vs AMD64)  
- ECR repository issues during pipeline execution  
- AWS resources blocking `terraform destroy` (ENIs and Load Balancer dependencies)  

Each of these forced me to actually understand what was happening, not just follow tutorials.

---

## 🧠 What I learned

- How EKS works under the hood (nodes, networking, access)  
- How to structure Terraform using modules  
- The difference between NodePort and LoadBalancer in Kubernetes  
- How CI/CD connects everything together  
- How to debug real-world cloud issues  

---

## 🚧 Next steps

If I keep evolving this project, I’d like to:

- Remove `latest` completely and use full image versioning in Kubernetes  
- Add Ingress with a custom domain  
- Implement autoscaling (HPA)  
- Add monitoring (logs and metrics)  

---

## 👨‍💻 About me

Built by Lucas Domingues as part of a hands-on DevOps learning journey.
