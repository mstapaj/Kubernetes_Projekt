#!/bin/bash
kubectl delete -f ../../development/my-ingress.yaml
kubectl delete -f ../../development/deployments/
kubectl delete -f ../../development/volumeclaims/
kubectl delete -f ../../development/volumes/
kubectl delete -f ../../development/services/
kubectl delete -f ../../development/configmaps/
kubectl delete -f ../../development/my-development-namespace.yaml
