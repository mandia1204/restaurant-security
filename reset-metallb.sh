#!/bin/bash

cd /c/Users/Marvin/Documents/Restaurant/restaurant-security/k8s/init
kubectl apply -f 02-metal-lb-config.yaml
kubectl delete pods -l=app=metallb -n=metallb-system
kubectl get svc -n=istio-system

#istioctl dashboard jaeger
