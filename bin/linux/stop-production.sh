#!/bin/bash
kubectl delete -f ../../production/my-ingress.yaml
kubectl delete -f ../../production/deployments/
kubectl delete -f ../../production/volumeclaims/
kubectl delete -f ../../production/volumes/
kubectl delete -f ../../production/services/
kubectl delete -f ../../production/configmaps/
kubectl delete -f ../../production/my-production-namespace.yaml
